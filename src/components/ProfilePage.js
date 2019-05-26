import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Picker, Dimensions, Platform, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Input, ThemeProvider, Text, Divider, Button } from 'react-native-elements';
import { logoutUser, profileUpdated, updateProfile, setUser } from '../actions';
import { getCurrentUserData, showAlert, constants } from '../util';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfilePage extends Component {

    state = { loading: false }

    componentWillMount() {
        this.setState({loading: true})

        getCurrentUserData().then((user) => {
            Object.keys(user).forEach(e => {
                this.props.profileUpdated({prop : e , value: user[e]});
            });
            this.props.setUser(user);
            this.setState({loading : false});
        }).catch((err) => this.setState({loading : false}))
    }

    renderPickerDistricts() {
        return this.props.districts.map(district =>
            <Picker.Item
                key={district.name}
                label={district.name}
                value={district.name}
            />
        )
    }

    renderPickerBloods() {
        return this.props.bloodGroups.map(blood =>
            <Picker.Item
                key={blood.name}
                label={blood.name}
                value={blood.name}
            />
        )
    }

    updateProfile() {
        const { name, surname, phone, adress, bloodGroup, district } = this.props;

        const isValid = name && surname && phone && adress && bloodGroup && district;

        if(isValid && !this.state.loading && !this.props.loading){
            this.props.updateProfile({ name, surname, phone, adress, district, bloodGroup })
        }else{
            showAlert('Hata' , 'Lütfen Tüm Alanları Doldurunuz.');
        }
    }

    

    render() {
        return (
            <ScrollView style={{backgroundColor: constants.colors.viewBackgroundColor }}>
            <KeyboardAvoidingView 
                style={styles.containerStyle} 
                behavior={Platform.OS === "ios" ? "padding" : null}
                enabled
            >
                <Spinner
                    visible={this.state.loading}
                    textContent={'Lütfen Bekleyiniz'}
                    textStyle={{color: '#fff'}}
                />
                <ThemeProvider
                    theme={{
                        Input: {
                            containerStyle: {
                                width: SCREEN_WIDTH,
                            },
                            inputContainerStyle: {
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: constants.colors.inputBorderColor,
                                height: 45,
                                marginTop: 5
                            },
                            placeholderTextColor: constants.colors.placeholderTextColor,
                            inputStyle: {
                                marginLeft: 10,
                                color: constants.colors.inputColor,
                            },
                            labelStyle: {
                                color: constants.colors.labelColor,
                                fontWeight: 'normal',
                                fontSize: 16
                            },
                            keyboardAppearance: 'light',
                            blurOnSubmit: false
                        },
                        Text: {
                            style: {
                                marginLeft : 12,
                                color: constants.colors.textColor,
                                fontWeight: 'normal',
                                fontSize: 16
                            }
                        },
                        Divider: {
                            style: {
                                backgroundColor: constants.colors.dividerColor,
                                height: 0.2,
                                marginTop: 3,
                                width: SCREEN_WIDTH
                            }
                        },
                        Button : {
                            buttonStyle: {
                                borderRadius: 8,
                                width: SCREEN_WIDTH - 20,
                                marginLeft: 10
                            }
                        }
                    }}
                >
                    <Input
                        label="Ad"
                        placeholder="İsim"
                        value={this.props.name}
                        onChangeText={(text) => {
                            this.props.profileUpdated({ prop: 'name' , value: text})
                        }}
                    />
                    <Divider />
                    <Input
                        label="Soyad"
                        placeholder="Soyisim"
                        value={this.props.surname}
                        onChangeText={(text) => {
                            this.props.profileUpdated({ prop: 'surname' , value: text})
                        }}
                    />
                    <Divider />
                    <Input
                        label="Telefon"
                        placeholder="Telefon"
                        value={this.props.phone}
                        onChangeText={(text) => {
                            this.props.profileUpdated({ prop: 'phone' , value: text})
                        }}
                    />
                    <Divider />
                    <Input
                        label="Adres"
                        placeholder="Adres"
                        multiline={true}
                        numberOfLines={2}
                        inputContainerStyle={{ height: 70 }}
                        value={this.props.adress}
                        onChangeText={(text) => {
                            this.props.profileUpdated({ prop: 'adress' , value: text})
                        }}
                    />
                    <View style={styles.pickerContainerStyle}>
                        <Picker 
                            style={styles.districtPickerStyle}
                            selectedValue={this.props.district}
                            onValueChange={value => {
                                this.props.profileUpdated({ prop: 'district', value: value })
                            }}
                        >
                            {this.renderPickerDistricts()}
                        </Picker>
                        <Input
                            value={'İstanbul'}
                            editable={false}
                            inputContainerStyle={{
                                width: SCREEN_WIDTH / 2 - 10
                            }}
                        />
                    </View>
                    <Divider />
                    <Text>Kan Grubu</Text>
                    <Picker 
                        style={styles.bloodPickerStyle}
                        selectedValue={this.props.bloodGroup}
                        onValueChange={value => {
                            this.props.profileUpdated({ prop: 'bloodGroup', value: value })
                        }}
                    >
                        {this.renderPickerBloods()}
                    </Picker>
                    <Divider />
                    <Button
                        loading={ this.state.loading || this.props.loading }
                        buttonStyle={{backgroundColor: constants.colors.defaultButtonColor}}
                        title="Kaydet"
                        onPress={ this.updateProfile.bind(this) }
                    /> 
                    <Button
                        loading={ this.state.loading || this.props.loading }
                        containerStyle={{marginTop:10}}
                        title="Çıkış Yap"
                        onPress={() => {
                            if(!this.state.loading && !this.props.loading){
                                this.setState({loading:true})
                                this.props.logoutUser()
                            }
                        }}
                    />
                </ThemeProvider>
            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: constants.colors.viewBackgroundColor,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    districtPickerStyle: {
        height: 50,
        width: SCREEN_WIDTH / 2 - 15,
        marginLeft: 5,
        color: constants.colors.pickerColor
    },
    bloodPickerStyle: {
        height: 50,
        width: SCREEN_WIDTH - 10,
        marginLeft: 5,
        color: constants.colors.pickerColor
    },
    pickerContainerStyle: {
        flexDirection: 'row',
    }
}

const mapStateToProps = state => {
    return {
        districts: state.districts,
        bloodGroups: state.bloodGroups,
        name: state.profileForm.name,
        surname: state.profileForm.surname,
        phone: state.profileForm.phone,
        adress: state.profileForm.adress,
        district: state.profileForm.district,
        bloodGroup: state.profileForm.bloodGroup,
        loading: state.profileForm.loading,
        user: state.user.user
    }
}

export default connect(mapStateToProps, { logoutUser, profileUpdated, updateProfile, setUser })(ProfilePage);