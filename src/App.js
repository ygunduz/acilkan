import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

YellowBox.ignoreWarnings(['Setting a timer']);

class App extends Component {
    componentWillMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyBKvCZ6U1Afqpgx0H1NL2MMHrX8pldu0gY",
            authDomain: "manager-2c613.firebaseapp.com",
            databaseURL: "https://manager-2c613.firebaseio.com",
            projectId: "manager-2c613",
            storageBucket: "manager-2c613.appspot.com",
            messagingSenderId: "513705462205",
            appId: "1:513705462205:web:f2094697b402af6a"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
