import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { constants } from '../util';

class RequestModal extends Component {

    constructor(props) {
        super(props);
    }

    renderModalContent() {
        if (this.props.item) {
            const { item } = this.props;

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
                            onPress={this.props.onPressCancel}
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
                            flex: 1
                        }}
                        onPress={this.props.onPressCancel}
                        title="Kapat"
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <Modal
                isVisible={this.props.isModalVisible}
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
        )
    }

}

const styles = {
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

export default RequestModal;