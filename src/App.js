import React, { Component } from 'react';
import { YellowBox, View, ToastAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import RNFirebase from 'react-native-firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RequestModal from './components/RequestModal';
import Router from './Router';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale('tr');

YellowBox.ignoreWarnings(['Setting a timer']);

class App extends Component {

    state = { isModalVisible: false, item: null }

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
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    componentDidMount() {
        this.createNotificationListeners();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = RNFirebase.notifications().onNotification((notification) => {
            //const { data } = notification;
            //this.setState({ isModalVisible: true, item: data });
            ToastAndroid.show('Yeni Kan Talebi Mevcut Lütfen Talepler Ekranını Ziyaret Ediniz.', ToastAndroid.LONG);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = RNFirebase.notifications().onNotificationOpened((notificationOpen) => {
            const { data } = notificationOpen.notification;
            this.setState({ isModalVisible: true, item: data });
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await RNFirebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { data } = notificationOpen.notification;
            this.setState({ isModalVisible: true, item: data });
        }
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
                <View>
                    <RequestModal
                        isModalVisible={this.state.isModalVisible}
                        item={this.state.item}
                        onPressCancel={() => { this.setState({ isModalVisible: false, item: null }) }}
                    />
                </View>
            </Provider>
        );
    }
}

export default App;
