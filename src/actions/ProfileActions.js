import { ToastAndroid } from 'react-native';
import { PROFILE_UPDATED } from './types';
import firebase from 'firebase';

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
            dispatch(profileUpdated({prop : 'loading' , value : false}));
        }).catch(() => {
            ToastAndroid.show('Güncelleme Başarısız', ToastAndroid.SHORT);
            dispatch(profileUpdated({prop : 'loading' , value : false}));
        })
    }
}