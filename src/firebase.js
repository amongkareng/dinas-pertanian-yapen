  // src/firebase.js
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyAKp8y_lZHXGsuL84r3ciWbCRpnaL8umSo",
    authDomain: "dinasyapen-admin.firebaseapp.com",
    projectId: "dinasyapen-admin",
    storageBucket: "dinasyapen-admin.appspot.com", // ✅ PENTING: gunakan .appspot.com
    messagingSenderId: "674761985399",
    appId: "1:674761985399:web:b2d6b22da03a0ef98ba572",
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app); // ✅ export jika ingin digunakan langsung
  export { app }; // ✅ untuk getStorage(app)
