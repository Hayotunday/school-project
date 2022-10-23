import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { MaterialIcons } from '@expo/vector-icons'


export default function Event(props) {
  return (
    <View style={{
      borderRadius: 20, height: 180, width: 155, backgroundColor: '#87CEEB', padding: 15, justifyContent: 'space-evenly',
    }}>
      <Text style={{
        color: '#333',
        fontSize: 20,
        fontWeight: "500",
      }}>{props.data.day}</Text>
      <Text style={{
        color: '#333',
        fontSize: 25,
        textTransform: "uppercase",
        fontWeight: "bold",
      }}>{props.data.code}</Text>
      <Text style={{ fontSize: 15, color: '#333', }} numberOfLines={4} ellipsizeMode={"tail"}>
        {props.data.title}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{
          color: '#333',
          fontSize: 20,
          fontWeight: "700",
        }}>
          {props.data.time}
        </Text>
        <TouchableOpacity onPress={() => { }}>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}