import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import SafeView from '../components/SafeView'
import AppContext from '../context/app/appContext'

export default function NewTaskScreen({ navigation }) {
  const appContext = useContext(AppContext);

  const { addTask } = appContext

  const [text, setText] = useState('')

  return (
    <SafeView style={{ paddingHorizontal: 15 }}>
      {/* , justifyContent: 'flex-end' */}
      <View>
        <View style={{ marginBottom: 25 }}>
          <TextInput
            style={{
              borderColor: '#87CEEB',
              borderWidth: 2,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: 150,
              fontSize: 15
            }}
            placeholder='Enter task'
            value={text}
            onChangeText={(text) => { setText(text) }}
            keyboardType={'default'}
            multiline={true}
            numberOfLines={10}
            textAlignVertical={'top'}
            autoCapitalize={'sentences'}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#87CEEB',
              padding: 8,
              height: 45,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '800'
            }}
            onPress={() => { setText('') }}
          >
            <Text style={{ fontSize: 20, fontWeight: '800' }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#87CEEB',
              padding: 8,
              height: 45,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '800'
            }}
            onPress={() => { setText(''); navigation.goBack(); }}
          >
            <Text style={{ fontSize: 20, fontWeight: '800' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#87CEEB',
              padding: 8,
              height: 45,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '800'
            }}
            onPress={() => { addTask(text, setText, navigation) }}
          >
            <Text style={{ fontSize: 20, fontWeight: '800' }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView >
  )
}