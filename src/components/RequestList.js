import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import RequestModal from './RequestModal';
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
        const newItem = {...item , username: item.user.name + ' ' + item.user.surname, phone: item.user.phone }
        this.setState({ isModalVisible: true, item: newItem })
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
                <RequestModal 
                    isModalVisible={this.state.isModalVisible}
                    item={this.state.item}
                    onPressCancel={() => { this.setState({isModalVisible : false , item: null}) }}
                />
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
    }
}

export default connect(mapStateToProps)(RequestList);