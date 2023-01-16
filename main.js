import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as PIXI from 'pixi.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,doc,setDoc,onSnapshot, query, collection, QuerySnapshot } from "firebase/firestore";
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

//Get Update
const q = query(collection(db,"testBoard"));
const unsub = onSnapshot(q,(querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
    console.log(doc.id + " "+doc.data().color);
  });

})

//Pixi APP
const size = 600;

const nb = 50;
const tile_size = size/nb;
let pixi_app = new PIXI.Application({ width: size, height: size });
document.body.appendChild(pixi_app.view);


for(let y=0;y<nb;y++){
  for(let x=0;x<nb;x++){
    createTile(x,y);
  }
}

function createTile(x,y){
  const tile = new PIXI.Graphics();

  tile.interactive =true;
  tile.on('pointerover',onPointerHover,tile)
  tile.on('pointerout',onPointerOut,tile)
  tile.on('pointertap',()=>{onPointerTap(x,y)},tile)
  //Draw tile
  tile.beginFill(0xFFFFFF);
  tile.drawRect(x*tile_size,y*tile_size,tile_size,tile_size);
  tile.endFill();
  pixi_app.stage.addChild(tile);
}



function onPointerHover() {
  this.tint = 0x666666;
}

function onPointerOut() {
  this.tint = 0xFFFFFF;
}

function onPointerTap(x,y) {
  let doc_id = x+ ":"+y;
  console.log(doc_id);
  const cityRef = doc(db, 'testBoard', doc_id);
  setDoc(cityRef, { color: 0x32a852});
}