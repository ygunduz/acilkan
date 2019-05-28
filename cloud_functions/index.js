const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const map = {
    "A+": "apozitif",
    "A-": "anegatif",
    "B+": "bpozitif",
    "B-": "bnegatif",
    "0+": "0pozitif",
    "0-": "0negatif",
    "AB+": "ABpozitif",
    "AB-": "ABnegaitf"
}

exports.sendNotification =
    functions.database.ref('/requests/{id}').onCreate((snap, context) => {
        const val = snap.val();
        return admin.messaging().sendToTopic(map[val.bloodGroup] , {
            notification: {
                title: 'Kan Grubu ' + val.bloodGroup,
                body: val.district + ' - ' + val.hospital
            },
            data: {
                id: context.params.id,
                username: val.user.name + ' ' + val.user.surname,
                hospital: val.hospital,
                city: val.city,
                district: val.district,
                phone: val.user.phone,
                bloodGroup: val.bloodGroup,
                description: val.description
            }
        }).then(res => console.log(res))
        .catch(err => console.log(err))
    });