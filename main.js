import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as PIXI from 'pixi.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGyspt19fpqk8mn1RfK8RB0wdyFbf9WB0",
  authDomain: "pixels-57340.firebaseapp.com",
  projectId: "pixels-57340",
  storageBucket: "pixels-57340.appspot.com",
  messagingSenderId: "272702483005",
  appId: "1:272702483005:web:1d15f79c58f6132ba61854"
};

// Initialize Firebase
const fire_app = initializeApp(firebaseConfig);
const db = getFirestore(fire_app);

let pixi_app = new PIXI.Application({ width: 480, height: 854 });
document.body.appendChild(pixi_app.view);
