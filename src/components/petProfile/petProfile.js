import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import styles from './petProfile.style'



export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      messages: [
        {id:1, sent: true,  msg: 'Lorem ipsum dolor',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:2, sent: true,  msg: 'sit amet, consectetuer',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:3, sent: false, msg: 'adipiscing elit. Aenean ', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:4, sent: true,  msg: 'commodo ligula eget dolor.',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:5, sent: false, msg: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:6, sent: true,  msg: 'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:7, sent: false, msg: 'rhoncus ut, imperdiet', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:8, sent: false, msg: 'a, venenatis vitae', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:9, sent: true,  msg: 'Lorem ipsum dolor',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:10, sent: true,  msg: 'sit amet, consectetuer',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:11, sent: false, msg: 'adipiscing elit. Aenean ', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:12, sent: true,  msg: 'commodo ligula eget dolor.',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:13, sent: false, msg: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:14, sent: true,  msg: 'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:15, sent: false, msg: 'rhoncus ut, imperdiet', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:16, sent: false, msg: 'a, venenatis vitae', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
      ]
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
    this.renderItem   = this._renderItem.bind(this);
  }

  reply() {
    var messages = this.state.messages;
    messages.push({
      id:Math.floor((Math.random() * 99999999999999999) + 1),
      sent: false,
      msg: this.state.msg,
      image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'
    });
    this.setState({msg:'', messages:messages});
  }

  send() {
    if (this.state.msg.length > 0) {
      var messages = this.state.messages;
      messages.push({
        id:Math.floor((Math.random() * 99999999999999999) + 1),
        sent: true,
        msg: this.state.msg,
        image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'
      });
      this.setState({messages:messages});
      setTimeout(() => {
        this.reply();
      }, 2000);
    }
  }

  _renderItem = ({item}) => {
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{ uri: item.image}} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.rightMsg} >
          <View style={styles.rightBlock} >
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          <Image source={{uri: item.image}} style={styles.userPic} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
            <FlatList 
              style={styles.list}
              extraData={this.state}
              data={this.state.messages}
              keyExtractor = {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}/>
            <View style={styles.input}>
              <TextInput
                style={{flex: 1 }}
                value={this.state.msg}
                placeholderTextColor = "#696969"
                onChangeText={msg => this.setState({ msg })}
                blurOnSubmit={false}
                onSubmitEditing={() => this.send()}
                placeholder="Type a message"
                returnKeyType="send"/>
            </View>
          </KeyboardAvoidingView>
      </View>
    );
  }
}
