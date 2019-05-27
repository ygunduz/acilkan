import { Alert } from 'react-native';
import firebase from 'firebase';
import RNFirebase from 'react-native-firebase';

export const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      { text: 'İptal', style: 'cancel' },
      { text: 'Tamam' }
    ],
    { cancelable: false },
  );
}

export const getCurrentUserData = () => {
  var userID = firebase.auth().currentUser.uid;

  var ref = firebase.database().ref('/users/' + userID);

  return new Promise((resolve, reject) => {
    ref.on('value' , (snapshot) => {
      if(snapshot.val() != null)
        resolve(snapshot.val());
      else
        reject('No User Found');
    })
  });
}

export const checkUserValidity = (user) => {
  return user.name && user.surname && user.phone && user.adress && user.bloodGroup && user.district;
}


export const getAvatarURL = (group) => {
  const bucketURL = 'https://firebasestorage.googleapis.com/v0/b/manager-2c613.appspot.com/o/';
  
  switch(group){
    case 'A+':
      return bucketURL + 'apozitif.png?alt=media&token=7d2b9d21-610d-47ff-8aec-2b3f9b8179d5';
    case 'A-':
      return bucketURL + 'anegatif.png?alt=media&token=b36552b5-7324-4c57-852d-55fa5b73b86a';
    case 'B+':
      return bucketURL + 'bpozitif.png?alt=media&token=25ff133c-630f-4636-a89c-e87ffff4f442';
    case 'B-':
      return bucketURL + 'bnegatif.png?alt=media&token=26c62557-cefc-42ef-be3a-adcdc7544424';
    case '0+':
      return bucketURL + 'sifirpozitif.png?alt=media&token=1ed2582e-614d-48f3-9ccd-e78f48e018eb';
    case '0-':
      return bucketURL + 'sifirnegatif.png?alt=media&token=274fd658-608e-4ca9-9578-c3a355c39c26';
    case 'AB+':
      return bucketURL + 'abpozitif.png?alt=media&token=72759e7f-7c2e-46a2-a953-a3c09cc8c3fd';
    case 'AB-':
      return bucketURL + 'abnegatif.png?alt=media&token=c6bb20bd-4932-4bf0-8a61-8689ef551aa9';
    default :
      return '';
  }
}

const map = {
  "A+" : "apozitif",
  "A-" : "anegatif",
  "B+" : "bpozitif",
  "B-" : "bnegatif",
  "0+" : "0pozitif",
  "0-" : "0negatif",
  "AB+": "ABpozitif",
  "AB-": "ABnegaitf"
}

export const subscribeTopic = (group) => {
  const groups = ['A+' , 'A-' , 'B+' , 'B-' , '0+' , '0-' , 'AB+' , 'AB-'];
  groups.map((thisGroup) => {
    if(thisGroup != group){
      RNFirebase.messaging().unsubscribeFromTopic(map[thisGroup]);
    }
    else{
      RNFirebase.messaging().subscribeToTopic(map[thisGroup]);
      console.log(map[thisGroup]);
    }
  })
}