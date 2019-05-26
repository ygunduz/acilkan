import React, { Component } from 'react';
import { View, StatusBar, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { constants }  from '../util';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MainScreen extends Component {
    componentWillMount() {
        StatusBar.setBackgroundColor(constants.colors.statusBarColor);
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
                    onPress={() => Actions.requestList()}
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
        backgroundColor: constants.colors.viewBackgroundColor,
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
        backgroundColor: constants.colors.defaultButtonColor,
        borderRadius: 12
    },
    buttonTitleStyle: {
        marginLeft: 20
    }
}

export default MainScreen;