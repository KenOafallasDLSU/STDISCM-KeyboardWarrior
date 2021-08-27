import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5luqWg4EjgEeEjiNTnyrskgaf3i0TzDI',
  authDomain: 'stdiscm-keyboardwarrior.firebaseapp.com',
  projectId: 'stdiscm-keyboardwarrior',
  storageBucket: 'stdiscm-keyboardwarrior.appspot.com',
  messagingSenderId: '723217552596',
  appId: '1:723217552596:web:fe3eaa01a435ad94cbd741',
  measurementId: 'G-LF1P73WDFX'
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export default db;
