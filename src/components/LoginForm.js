import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    componentWillMount() {
        StatusBar.setBackgroundColor('#9e0404');
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        return (
            <Button
                loading={this.props.loading}
                buttonStyle={{
                    backgroundColor: '#B91E25'
                }}
                containerStyle={{
                    marginTop: 20
                }}
                title="Giriş Yap"
                onPress={this.onButtonPress.bind(this)}
            />
        );
    }

    render() {
        return (
            <View>
                <Card>
                    <Input
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={24}
                                color='black'
                                style={{ paddingRight: 10 }}
                            />
                        }
                        placeholder="mail@ornek.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                    <Input
                        secureTextEntry
                        leftIcon={
                            <Icon
                                name='lock'
                                size={32}
                                color='black'
                                style={{ paddingRight: 14 }}
                            />
                        }
                        placeholder="şifre"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                    {this.renderError()}
                    {this.renderButton()}
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);
