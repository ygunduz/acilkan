import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { Actions } from 'react-native-router-flux';

class SplashScreen extends Component {
    componentDidMount(){
        AsyncStorage.multiGet(['email' , 'password'])
            .then(data => {
                const email = data[0][1];
                const password = data[1][1];
                if(null == email || null == password){
                    Actions.auth();
                }else{
                    this.props.loginUser({
                        email,password
                    });
                }
            })
            .catch(err => {
                Actions.auth();
            })
    }
    
    render () {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>Splash Screen</Text>
            </View>
        );
    }
}

export default connect(null , {loginUser})(SplashScreen);