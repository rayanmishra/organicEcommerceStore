// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZKdQpCWgt9M4VApxTg1R3qiPgpoXjigY',
  authDomain: 'organic-ecomm.firebaseapp.com',
  databaseURL: 'https://organic-ecomm-default-rtdb.firebaseio.com',
  projectId: 'organic-ecomm',
  storageBucket: 'organic-ecomm.appspot.com',
  messagingSenderId: '825058543066',
  appId: '1:825058543066:web:ac90b0b1840ca08639ece3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
