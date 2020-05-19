import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import logo from '../../assets/logo.png';

function Profile({ navigation }) {
  const company_name = navigation.getParam('company_name');
  const materials = navigation.getParam('materials');
  const address = navigation.getParam('address');
  const expedient = navigation.getParam('expedient');
  const phone = navigation.getParam('phone');
  const recommendations = navigation.getParam('recommendations');
  const coordinates = navigation.getParam('coordinates');

  return (
    <>
      <View style={styles.info}>
        <MaterialIcons name="place" size={40} color="#FFF" style={{textAlign: 'center'}}/>
        <Text style={styles.companyName}>{company_name}</Text>
        
        <View style={styles.box}>
          <ScrollView style={styles.boxScrool} showsVerticalScrollIndicator={false} show>
          <View style={styles.boxInfoTop}>
            <Text style={styles.title}>Materiais de descarte</Text>
            <Text style={styles.companyInfo}>{materials.join(', ')}</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.title}>Endereço</Text>
            <Text style={styles.companyInfo}>{address}</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.title}>Dia e horário de entrega</Text>
            <Text style={styles.companyInfo}>{expedient}</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.title}>Telefone</Text>
            <Text style={styles.companyInfo}>{phone}</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.title}>Higienização para descarte</Text>
            <Text style={styles.companyInfo}>{recommendations}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.action} onPress={() => Linking.openURL(`google.navigation:q=${coordinates[1]},${coordinates[0]}`)}>
              <Text style={styles.actionText}>COMO CHEGAR</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>

          <View style={styles.footer}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.version}>Versão 1.0.0</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    backgroundColor: '#288B45',
  },

  box: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#083f44',
  },

  boxScrool: {
    marginTop: 20,
  },

  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'center',
  },

  boxInfoTop: {
    margin: 15,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  boxInfo: {
    marginTop: 5,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  title: {
    fontSize: 19,
    marginHorizontal: 15,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  companyInfo: {
    fontSize: 18,
    marginTop: 5,
    margin: 10,
    textAlign: 'center',
  },

  action: {
    backgroundColor: '#288B45',
    borderRadius: 8,
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  actionText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    backgroundColor: '#186975',
    paddingHorizontal: 70,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  version: {
    color: '#fff',
    fontSize: 15,
  },

  logo: {
    height:50,
    width:60,
  }
})

export default Profile;
