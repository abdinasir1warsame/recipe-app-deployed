import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBbK3BmqP7J9Kpa_JKiHT_IVywhMko03P0',
  authDomain: 'flavor-layer.firebaseapp.com',
  projectId: 'flavor-layer',
  storageBucket: 'flavor-layer.firebasestorage.app',
  messagingSenderId: '351122826467',
  appId: '1:351122826467:web:5a39ae3511af0439aa51d6',
  measurementId: 'G-SWF96DQD4L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { auth, database };
