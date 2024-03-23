import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyA8GqHLAShg1JyQyoHDTNZp7z3vVvOctpg",
    authDomain: "olxcopy-7dc44.firebaseapp.com",
    projectId: "olxcopy-7dc44",
    storageBucket: "olxcopy-7dc44.appspot.com",
    messagingSenderId: "808817250984",
    appId: "1:808817250984:web:b240799befef17ea96289d",
    measurementId: "G-98JDSWKB0B"
  };

  export const Firebase= firebase.initializeApp(firebaseConfig)//named export