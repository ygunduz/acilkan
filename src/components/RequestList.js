import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight, Linking } from 'react-native';
import { ListItem, Button, Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getAvatarURL, constants } from '../util';
import moment from 'moment'

class RequestList extends Component {
    constructor(props) {
        super(props);
        this.state = { requests: null, isModalVisible: false, item: null };
    }

    componentWillMount() {
        firebase.database().ref('requests').on('value', (snapshot) => {
            this.setState({ requests: snapshot.val() })
        })
    }

    componentWillUnmount(){
        firebase.database().ref('requests').off();
    }

    filterItems() {
        var result = [];

        if (this.state.requests != null) {
            const { requests } = this.state;
            const { user } = this.props;

            Object.keys(requests).forEach(function (key) {
                const request = requests[key];
                request.id = key;
                if (user.bloodGroup == request.bloodGroup)
                    result.push(request);
            });

            result = result.reverse();
        }

        return result;
    }

    listItemClicked(item) {
        this.setState({ isModalVisible: true, item })
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
                    <Text>İsim Soyisim:  {item.user.name + ' ' + item.user.surname}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text>Telefon Numarası:  {item.user.phone}</Text>
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
                        <View style={{flex:1}}/>
                        <Button
                            containerStyle={{
                                flex: 3
                            }}
                            buttonStyle={{
                                backgroundColor: constants.colors.defaultButtonColor
                            }}
                            onPress={() => Linking.openURL(`tel:${item.user.phone}`)}
                            title="İletişime Geç"
                        />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{alignItems:'center', justifyContent:'center'}}>
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

    renderItem({ item }) {

        return (
            <TouchableHighlight onPress={() => this.listItemClicked(item)}>
                <ListItem
                    leftAvatar={{ source: { uri: getAvatarURL(item.bloodGroup) } }}
                    title={item.district + ' / ' + item.hospital}
                    subtitle={moment(new Date(item.created)).fromNow(true)}
                    bottomDivider={true}
                />
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    style={styles.containerStyle}
                    keyExtractor={request => request.id}
                    data={this.filterItems()}
                    renderItem={this.renderItem.bind(this)}
                />
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
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

export default connect(mapStateToProps)(RequestList);