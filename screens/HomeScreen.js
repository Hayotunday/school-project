import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/app/appContext';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'

import SafeView from '../components/SafeView';
import Event from '../components/Event';
import Carousel from '../components/Carousel'
import Task from '../components/Task';

import { MaterialIcons, Octicons, AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const appContext = useContext(AppContext);

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => console.log(token))
      .catch(err => console.log(err))
  }, [])

  const {
    username,
    taskItems,
    eventItems,
    modalVisible,
    openModal,
    closeModal
  } = appContext;

  const renderCourse = ({ item, index }) => {
    return <Event key={index} data={item} index={index} />;
  };

  return (
    <SafeView style={{ paddingHorizontal: 15 }}>

      <StatusBar style="auto" />
      <View style={{ marginBottom: 10, marginTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 35, fontWeight: '900' }}>Hello {username}!</Text>
          {/* <ImageBackground source={require('../assets/profile.jpg')} style={{ height: 40, width: 40 }} imageStyle={{ borderRadius: 20 }} /> */}
        </View>
        <Text style={{ fontSize: 15 }}>Have a nice Day!</Text>
      </View>

      <View style={{ marginTop: 5 }}>
        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: '800' }}>Lectures</Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Event')}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#87CEEB' }}>See all</Text>
          </TouchableOpacity> */}
        </View>
        <View>
          <Carousel data={eventItems} renderItem={renderCourse} />
          {/* <TouchableOpacity style={{ borderRadius: 20, backgroundColor: '#ddd', height: 40, width: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, top: 70 }}>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 20, backgroundColor: '#ddd', height: 40, width: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 70 }}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: '800' }}>Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Task')}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#87CEEB' }}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          {
            eventItems.length == 0 ?
              taskItems.map((item, index) => {
                return (
                  <Task text={item} style={{ marginVertical: 10 }} key={index} index={index} />
                )
              })
              :
              taskItems.length !== 0 && <Task text={taskItems[0]} />
          }
        </View>
      </View>

      {/* Add new button */}
      <TouchableOpacity
        onPress={() => { openModal() }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#87CEEB',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>

      {/* Select Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { closeModal() }}
      >
        <StatusBar style="auto" />
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              height: 200,
              width: "100%",
              padding: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View style={{ height: "100%", justifyContent: "space-around" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Add New Activity
              </Text>
              <View style={{ justifyContent: "space-between" }}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('NewEvent'); closeModal() }}
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="event" size={24} color="black" />
                  <Text style={{ marginLeft: 10, fontSize: 18 }}>Event</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('NewTask'); closeModal() }}
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Octicons name="tasklist" size={24} color="black" />
                  <Text style={{ marginLeft: 10, fontSize: 18 }}>Task</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => { closeModal() }} style={{ backgroundColor: '#87CEEB', padding: 10, width: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                  <Text style={{ fontSize: 15 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

    </SafeView>
  )
}