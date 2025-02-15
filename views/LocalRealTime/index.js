import React, {useState, useEffect} from 'react';
import {
  PermissionsAndroid,
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LocalRealTime = () => {
  const [position, setPosition] = useState({
    latitude: -20.4782762,
    longitude: -54.6265839,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const request_location_runtime_permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        // ,{
        //   title: 'Permissão de Localização',
        //   message: 'A aplicação precisa da permissão de localização.',
        //   buttonNeutral: "Pergunte-me depois",
        //   buttonNegative: "Cancelar",
        //   buttonPositive: "OK"
        // },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();

      } else {
        Alert.alert('Permissão de localização não concedida');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        ...position,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0321,
      });  

    }, (err) => {
        console.log('error');
        console.log(err)

    })

  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={position}
        onPress={e =>
          setPosition({
            ...position,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }>
        <Marker
          coordinate={position}
          title={'Marcador'}
          description={'Testando o marcador no mapa'}
        />
      </MapView>
      <View style={styles.positonBox}>
        <Text style={styles.positonBoxTitle}>Sua Localização</Text>
        <View style={styles.positonBoxLatLon}>
          <Text style={{fontSize: 18}}>Lat.</Text>
          <Text style={{fontSize: 18}}>{position.latitude}</Text>
        </View>
        <View style={styles.positonBoxLatLon}>
          <Text style={{fontSize: 18}}>Lon.</Text>
          <Text style={{fontSize: 18}}>{position.longitude}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => {
          request_location_runtime_permission();
        }}>
        <Icon name="my-location" color={'#fff'} size={30} />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Testando</Text>
        <Text style={[styles.logoText, {color: '#e74c3c'}]}>Map</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  logo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 5,
    marginTop: -730,
    alignSelf: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  positonBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  positonBoxTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  positonBoxLatLon: {flexDirection: 'row', justifyContent: 'space-between'},
  locationButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});

export default LocalRealTime;