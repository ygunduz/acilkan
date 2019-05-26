import { ToastAndroid } from 'react-native';
import { PROFILE_UPDATED } from './types';
import firebase from 'firebase';
import { setUser } from './UserActions';

export const profileUpdated = ({ prop, value }) => {
    return {
        type: PROFILE_UPDATED,
        payload: { prop, value }
    }
}

export const updateProfile = ({ name, surname, phone, adress, district, bloodGroup }) => {
    return (dispatch) => {
        dispatch(profileUpdated({prop : 'loading' , value : true}));

        var userID = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userID).set({
            name, surname, phone, adress, district, bloodGroup
        }).then(() => {
            ToastAndroid.show('Güncelleme Başarılı', ToastAndroid.SHORT);
            const user = {
                name, surname, phone, adress, district, bloodGroup
            }
            dispatch(profileUpdated({prop : 'loading' , value : false}));
            dispatch(setUser(user));
        }).catch(() => {
            ToastAndroid.show('Güncelleme Başarısız', ToastAndroid.SHORT);
            dispatch(profileUpdated({prop : 'loading' , value : false}));
        })
    }
}