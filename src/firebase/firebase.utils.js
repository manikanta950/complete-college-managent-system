import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDO_yPgvJlgwprKac39rgQPtAHHNXrYQQM",
    authDomain: "aseb-management-system.firebaseapp.com",
    databaseURL: "https://aseb-management-system.firebaseio.com",
    projectId: "aseb-management-system",
    storageBucket: "aseb-management-system.appspot.com",
    messagingSenderId: "542505136888",
    appId: "1:542505136888:web:21f28a8924b968ef90410d",
    measurementId: "G-XSMP46E4CJ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;