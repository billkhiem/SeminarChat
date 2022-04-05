

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { io } from 'socket.io-client';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      message:"",
      messages:[]
    }
  }

  componentDidMount(){
    this.socket=io("http://192.168.1.8:3000");
    this.socket.on("add message",msg => {
      console.log("Received "+msg);
      this.setState({messages:[...this.state.messages,msg]})
    });
  }

  sendMessage(){
    this.socket.emit("Message sent",this.state.message);
    this.setState({message:""});
  }

  render(){
    const messages=this.state.messages.map(function(message,index){
      return <Text key={index} style={{fontSize:16, padding:10}}>{message}</Text>
    })
    return (
      <View>
        <TextInput
          style={{borderWidth:1, margin:20}}
          autoCorrect={false}
          value={this.state.message}
          onSubmitEditing={()=>this.sendMessage()}
          onChangeText={message=>this.setState({message})}
          
        />
        <View style={{padding:10}}>
        {messages}
        </View>
        
      </View>
      
    );
  }
}

