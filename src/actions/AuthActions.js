import firebase from 'firebase';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { setUser } from './UserActions';
import { getCurrentUserData } from '../util';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(user => loginUserSuccess(dispatch,user,email,password))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(user => loginUserSuccess(dispatch,user,email,password))
                    .catch(() => loginUserFail(dispatch))
            });
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                AsyncStorage.multiRemove(['email' , 'password'])
                .then(() => {
                    dispatch({
                        type: LOGOUT_USER
                    })

                    ToastAndroid.show('Başarıyla Çıkış Yapıldı' , ToastAndroid.SHORT);

                    Actions.auth();
                })
            })
    }
}

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    })
}

const loginUserSuccess = (dispatch, user , email , password) => {
    AsyncStorage.multiSet([['email' , email] , ['password' , password]])
        .then(data => {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user
            })

            ToastAndroid.show('Giriş Başarılı' , ToastAndroid.SHORT);
            
            Actions.main();
        })
        .catch(err => {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user
            })

            ToastAndroid.show('Kullanıcı Adı ve Şifre Kaydedilemedi!');

            Actions.main();
        })
    
    getCurrentUserData().then(user => {
        dispatch(setUser(user));
    })
}