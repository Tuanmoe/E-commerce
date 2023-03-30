import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyBEgme7jLM7cI53-x13jZeZmN1QNnizyDY",
  authDomain: "my-ecommerce-web-791a1.firebaseapp.com",
  projectId: "my-ecommerce-web-791a1",
  storageBucket: "my-ecommerce-web-791a1.appspot.com",
  messagingSenderId: "198829967152",
  appId: "1:198829967152:web:b6041050ef53edb231eaf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);