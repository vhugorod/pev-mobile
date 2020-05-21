import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.text}>
      Pontos de Entrega
    </Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#288B45',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 19
  }
})

export default Header;