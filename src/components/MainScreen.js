import React, { Component } from 'react';
import { View, StatusBar, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MainScreen extends Component {
    componentWillMount() {
        StatusBar.setBackgroundColor('#9e0404');
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Button
                    icon={
                        <Icon
                            name="user"
                            size={20}
                            color="white"
                        />
                    }
                    title="Profil"
                    titleStyle={styles.buttonTitleStyle}
                    containerStyle={styles.buttonContainerStyle}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => Actions.profilePage()}
                />
                <Button
                    icon={
                        <Icon
                            name="list"
                            size={20}
                            color="white"
                        />
                    }
                    title="Talepler"
                    titleStyle={styles.buttonTitleStyle}
                    containerStyle={styles.buttonContainerStyle}
                    buttonStyle={styles.buttonStyle}
                />
                <Button
                    icon={
                        <Icon
                            name="paper-plane"
                            size={20}
                            color="white"
                        />
                    }
                    title="Kan Talep Et"
                    titleStyle={styles.buttonTitleStyle}
                    containerStyle={styles.buttonContainerStyle}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => Actions.bloodRequest()}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#ffe3d8',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        width: SCREEN_WIDTH - 50,
        height: 80
    },
    buttonStyle: {
        height: 50,
        backgroundColor: '#B91E25',
        borderRadius: 12
    },
    buttonTitleStyle: {
        marginLeft: 20
    }
}

export default MainScreen;