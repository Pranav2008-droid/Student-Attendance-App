import * as firebase from 'firebase';
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCxap05RWkVzmQuUoWgCsG0unSWXLAi4ng",
    authDomain: "student-attendance-app-c2e38.firebaseapp.com",
    databaseURL: "https://student-attendance-app-c2e38.firebaseio.com",
    projectId: "student-attendance-app-c2e38",
    storageBucket: "student-attendance-app-c2e38.appspot.com",
    messagingSenderId: "818987866357",
    appId: "1:818987866357:web:a802c7c2750e7067f2cdbc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.database();
