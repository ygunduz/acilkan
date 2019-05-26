import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getAvatarURL, constants } from '../util';
import moment from 'moment'

class RequestList extends Component {
    state = { requests: null }

    componentWillMount() {
        firebase.database().ref('requests').on('value', (snapshot) => {
            this.setState({ requests: snapshot.val() })
        })
    }

    filterItems() {
        var result = [];

        if (this.state.requests != null) {
            const { requests } = this.state;

            Object.keys(requests).forEach(function (key) {
                const request = requests[key];
                request.id = key;
                result.push(request);
            });

            result = result.reverse();
        }

        return result;
    }

    renderItem({item}) {

        return (
            <View>
                <ListItem
                    leftAvatar={{ source: { uri: getAvatarURL(item.bloodGroup) } }}
                    title={item.district + ' / ' + item.hospital}
                    subtitle={moment(new Date(item.created)).fromNow(true)}
                />
                <Divider />
            </View>
        )
    }

    render() {
        return (
            <FlatList
                style={styles.containerStyle}
                keyExtractor={request => request.id}
                data={this.filterItems()}
                renderItem={this.renderItem}
            />
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