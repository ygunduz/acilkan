import React, { Component } from 'react';
import { YellowBox, View, Text, Linking } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import RNFirebase from 'react-native-firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import { constants } from './util';
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
            const { data } = notification;
            this.setState({ isModalVisible: true, item: data });
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

    renderModalContent() {
        if (this.state.item) {
            const { item } = this.state;

            return (
                <View style={styles.content}>
                    <Text>İhtiyaç Duyulan Kan Grubu:  {item.bloodGroup}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>Hastane:  {item.hospital}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>İlçe:  {item.district}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>İl:  {item.city}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>İsim Soyisim:  {item.username}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>Telefon Numarası:  {item.phone}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>Açıklama:  {item.description}</Text>
                    <Divider style={styles.dividerStyle} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: 5
                    }}>
                        <Button
                            containerStyle={{
                                flex: 2
                            }}
                            onPress={() => this.setState({ isModalVisible: false })}
                            title="Kapat"
                        />
                        <View style={{ flex: 1 }} />
                        <Button
                            containerStyle={{
                                flex: 3
                            }}
                            buttonStyle={{
                                backgroundColor: constants.colors.defaultButtonColor
                            }}
                            onPress={() => Linking.openURL(`tel:${item.phone}`)}
                            title="İletişime Geç"
                        />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{
                            flex: 2
                        }}
                        onPress={() => this.setState({ isModalVisible: false })}
                        title="Kapat"
                    />
                </View>
            )
        }
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
                <View>
                    <Modal
                        isVisible={this.state.isModalVisible}
                        backdropColor="#B4B3DB"
                        backdropOpacity={0.8}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={600}
                        animationOutTiming={600}
                        backdropTransitionInTiming={600}
                        backdropTransitionOutTiming={600}
                    >
                        {this.renderModalContent()}
                    </Modal>
                </View>
            </Provider>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: constants.colors.viewBackgroundColor,
    },
    dividerStyle: {
        marginTop: 5
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
}

export default App;
