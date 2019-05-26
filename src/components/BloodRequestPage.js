import React, { Component } from 'react';
import { KeyboardAvoidingView , Dimensions, Picker, ScrollView } from 'react-native';
import { Input, ThemeProvider, Text, Divider, Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { requestFormUpdated, setUser } from '../actions';
import { showAlert, checkUserValidity, constants } from '../util';
import firebase from 'firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;

class BloodRequestPage extends Component {

    state = { loading : false }

    renderPickerBloods() {
        return this.props.bloodGroups.map(blood =>
            <Picker.Item
                key={blood.name}
                label={blood.name}
                value={blood.name}
            />
        )
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

    renderPickerHospitals() {
        const { district,hospitals } = this.props;  
        const result = hospitals.filter(hospital => hospital.district == district);

        return result.map(hospital =>
            <Picker.Item
                key={hospital.name}
                label={hospital.name}
                value={hospital.name}
            />
        )
    }

    sendRequest() {
        if(!this.props.description || !this.props.hospital){
            showAlert('Hata' , 'Lütfen Tüm Alanları Doldurunuz!');
        }else if(!checkUserValidity(this.props.user)) {
            showAlert('Hata' , 'Lütfen Kullanıcı Bilgilerinizi Doldurunuz!');
        }else {
            this.setState({ loading: true });
            const { user , hospital , description , district , bloodGroup } = this.props;
            var reqsRef = firebase.database().ref('/requests');
            const newReqRef = reqsRef.push({
                user,
                hospital,
                description,
                district,
                bloodGroup,
                city: 'İstanbul',
                created: firebase.database.ServerValue.TIMESTAMP
            });

            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: constants.colors.viewBackgroundColor }}>
            <KeyboardAvoidingView style={styles.containerStyle} behavior="position" enabled>
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
                                marginLeft: 12,
                                color: constants.colors.labelColor,
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
                        Button: {
                            buttonStyle: {
                                borderRadius: 8,
                                width: SCREEN_WIDTH - 20,
                                marginLeft: 10,
                                backgroundColor: constants.colors.defaultButtonColor
                            }
                        }
                    }}
                >
                    <Text>İhtiyaç Duyulan Kan Grubu</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.props.bloodGroup}
                        onValueChange={value => {
                            this.props.requestFormUpdated({ prop: 'bloodGroup', value: value })
                        }}
                    >
                        {this.renderPickerBloods()}
                    </Picker>
                    <Divider />
                    <Input
                        value={'İstanbul'}
                        label={'Hastanın Bulunduğu İl'}
                        editable={false}
                    />
                    <Divider />
                    <Text>Hastanın Bulunduğu İlçe</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.props.district}
                        onValueChange={value => {
                            this.props.requestFormUpdated({ prop: 'district', value: value })
                        }}
                    >
                        {this.renderPickerDistricts()}
                    </Picker>
                    <Divider />
                    <Text>Hastanın Bulunduğu Hastane</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.props.hospital}
                        onValueChange={value => {
                            this.props.requestFormUpdated({ prop: 'hospital', value: value })
                        }}
                    >
                        <Picker.Item label='Hastane Seçiniz' value='' />
                        {this.renderPickerHospitals()}
                    </Picker>
                    <Divider />
                    <Input
                        label="Acil Kan İhtiyacı ile İlgili Açıklama"
                        placeholder="Açıklama Giriniz"
                        multiline={true}
                        numberOfLines={3}
                        inputContainerStyle={{ height: 90 }}
                        value={this.props.description}
                        onChangeText={(text) => {
                            this.props.requestFormUpdated({ prop: 'description' , value: text})
                        }}
                    />
                    <Divider />
                    <Button
                        title="Kaydet"
                        onPress={ this.sendRequest.bind(this) }
                    /> 
                </ThemeProvider>
            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        districts: state.districts,
        bloodGroups: state.bloodGroups,
        bloodGroup: state.requestForm.bloodGroup,
        hospitals: state.hospitals,
        district: state.requestForm.district,
        hospital: state.requestForm.hospital,
        description: state.requestForm.description,
        user: state.user.user
    }
}

const styles = {
    containerStyle: {
        backgroundColor: constants.colors.viewBackgroundColor,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    pickerStyle: {
        height: 50,
        width: SCREEN_WIDTH - 10,
        marginLeft: 5,
        color: constants.colors.pickerColor
    },
    pickerContainerStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
}

export default connect(mapStateToProps, { requestFormUpdated, setUser })(BloodRequestPage);