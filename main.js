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

//Pixi APP
const size = 600;

const nb = 50;
const tile_size = size/nb;
const tiles_refs = {};
let pixi_app = new PIXI.Application({ width: size, height: size });
document.body.appendChild(pixi_app.view);


for(let y=0;y<nb;y++){
  for(let x=0;x<nb;x++){
    createTile(x,y);
  }
}

function createTile(x,y){
  const tile = new PIXI.Graphics();
  const _id = x+":"+y;

  // Init
  tile.interactive =true;
  tile.on('pointerover',onPointerHover,tile)
  tile.on('pointerout',onPointerOut,tile)
  tile.on('pointertap',()=>{onPointerTap(_id)},tile)
  tiles_refs[_id]=tile;

  //Draw tile
  tile.beginFill(0xFFFFFF);
  tile.drawRect(x*tile_size,y*tile_size,tile_size,tile_size);
  tile.endFill();
  pixi_app.stage.addChild(tile);
}



function onPointerHover() {
  this.alpha = 0.5;
}

function onPointerOut() {
  this.alpha = 1;
}

function onPointerTap(id) {
  console.log(id);
  const cityRef = doc(db, 'testBoard', id);
  setDoc(cityRef, { color: 0x32a852});
}

//Get Update
const q = query(collection(db,"testBoard"));
const unsub = onSnapshot(q,(querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
    console.log(doc.id + " "+doc.data().color);
    tiles_refs[doc.id].tint = doc.data().color;
  });

})
