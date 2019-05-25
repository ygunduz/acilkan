import React, { Component } from 'react';
import { KeyboardAvoidingView , Dimensions, Picker, ScrollView } from 'react-native';
import { Input, ThemeProvider, Text, Divider, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { requestFormUpdated } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class BloodRequestPage extends Component {

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

    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffe3d8' }}>
            <KeyboardAvoidingView style={styles.containerStyle} behavior="position" enabled>
                <ThemeProvider
                    theme={{
                        Input: {
                            containerStyle: {
                                width: SCREEN_WIDTH,
                            },
                            inputContainerStyle: {
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: '#9e0404',
                                height: 45,
                                marginTop: 5
                            },
                            placeholderTextColor: '#ce6b6b',
                            inputStyle: {
                                marginLeft: 10,
                                color: '#9e0404',
                            },
                            labelStyle: {
                                color: '#9e0404',
                                fontWeight: 'normal',
                                fontSize: 16
                            },
                            keyboardAppearance: 'light',
                            blurOnSubmit: false
                        },
                        Text: {
                            style: {
                                marginLeft: 12,
                                color: '#9e0404',
                                fontWeight: 'normal',
                                fontSize: 16
                            }
                        },
                        Divider: {
                            style: {
                                backgroundColor: '#9e0404',
                                height: 0.2,
                                marginTop: 3,
                                width: SCREEN_WIDTH
                            }
                        },
                        Button: {
                            buttonStyle: {
                                borderRadius: 8,
                                width: SCREEN_WIDTH - 20,
                                marginLeft: 10
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
                </ThemeProvider>
            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);

    return {
        districts: state.districts,
        bloodGroups: state.bloodGroups,
        bloodGroup: state.requestForm.bloodGroup,
        hospitals: state.hospitals,
        district: state.requestForm.district,
        hospital: state.requestForm.hospital,
        description: state.requestForm.description
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#ffe3d8',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    pickerStyle: {
        height: 50,
        width: SCREEN_WIDTH - 10,
        marginLeft: 5,
        color: '#000'
    },
    pickerContainerStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
}

export default connect(mapStateToProps, { requestFormUpdated })(BloodRequestPage);