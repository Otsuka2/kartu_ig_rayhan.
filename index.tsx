import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Catatan from '@/components/Project_GET_Sifat/Catatan'

const utama = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Catatan />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,

  },

  background: {
    width: 400,
    height: 800,
    position: 'absolute',
    backgroundColor: '#F0F0F0',
    padding: 5,
    top: 0
  },


});

export default utama;