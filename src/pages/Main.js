import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text , TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; 

import api from '../services/api';
import { connect, disconnect, subscribeToNewCompanies } from '../services/socket';

function Main({ navigation }) {
  const [companies, setCompanies] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [materials, setMaterials] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }
  
    loadInitialPosition();
  }, []);

  useEffect(() => {
    subscribeToNewCompanies(company => setCompanies([...companies, company]));
  }, [companies]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      materials,
    );
  }

  async function loadAllCompanies() {
    const { latitude, longitude } = currentRegion;
    
    const response = await api.get('/companies', {
      params: {
        latitude,
        longitude,
        materials
      }
    });
    
    setCompanies(response.data);
    setupWebsocket();
  }

  async function loadCompanies() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        materials
      }
    });
    
    setCompanies(response.data.companies);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onMapReady={loadAllCompanies}
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion}
        style={styles.map}
      >
        {companies.map(company => (
          <Marker
            key={company._id}
            coordinate={{
              longitude: company.location.coordinates[0],
              latitude: company.location.coordinates[1],
              }}
            >

            <Callout onPress={() => {
              navigation.navigate('Profile', { company_name: company.company_name });
              navigation.navigate('Profile', { materials: company.materials });
              navigation.navigate('Profile', { address: company.address });
              navigation.navigate('Profile', { expedient: company.expedient });
              navigation.navigate('Profile', { phone: company.phone });
              navigation.navigate('Profile', { recommendations: company.recommendations });
              navigation.navigate('Profile', { coordinates: company.location.coordinates });
            }}>
              <View style={styles.callout}>
                <Text style={styles.companyName}>{company.company_name}</Text>
                <Text style={styles.companyInfo}>{company.materials.join(', ')}</Text>
                <MaterialIcons name="add-circle-outline" size={25} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Filtro. Ex: Metal, Vidro, Papel..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={materials}
          onChangeText={setMaterials}
        />

        <TouchableOpacity onPress={loadCompanies} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  callout: {
    width: 260,
    alignItems: 'center',
  },

  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  companyInfo: {
    marginTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    borderColor: '#288B45',
    borderWidth: 2,
    paddingHorizontal: 20,
    fontSize: 16,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#288B45',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
})

export default Main;
