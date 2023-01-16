import './style.css'
import * as PIXI from 'pixi.js';
import { initializeApp } from "firebase/app";
import { getFirestore,doc,setDoc,onSnapshot, query, collection, QuerySnapshot } from "firebase/firestore";

//COLOR BUTTONS

let current_color="#ffffff";
const palette=["#000000","#7e7e7e","#bebebe","#ffffff","#7e0000","#fe0000","#047e00","#06ff04","#7e7e00","#ffff04",
"#00007e","#0000ff","#7e007e","#fe00ff","#047e7e","#06ffff"];
let pal = document.getElementById("palette");
palette.forEach((value,index)=>{
  let color_picker = document.createElement("div");
  color_picker.className = "select";
  color_picker.style = "background: "+value;
  color_picker.addEventListener("click",()=>{_changeColor(value)})
  pal.appendChild(color_picker);
});

function _changeColor(value){
  console.log(value)
  document.getElementById("selected").style="background:" +value;
  current_color=value;
}



// FIREBASE
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGyspt19fpqk8mn1RfK8RB0wdyFbf9WB0",
  authDomain: "pixels-57340.firebaseapp.com",
  projectId: "pixels-57340",
  storageBucket: "pixels-57340.appspot.com",
  messagingSenderId: "272702483005",
  appId: "1:272702483005:web:1d15f79c58f6132ba61854"
};
const fire_app = initializeApp(firebaseConfig);
const db = getFirestore(fire_app);

//PIXI APP
const size = 600;

const nb = 60;
const tile_size = size/nb;
const tiles_refs = {};
let pixi_app = new PIXI.Application({ width: size, height: size });
document.getElementById("app").appendChild(pixi_app.view);


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
  console.log(id +" "+current_color);
  const cityRef = doc(db, 'testBoard', id);
  setDoc(cityRef, { color: current_color});
  tiles_refs[id].tint =  PIXI.utils.string2hex(current_color);
}

//Get Update

const q = query(collection(db,"testBoard"));
const unsub = onSnapshot(q,(querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
    console.log(doc.id + " "+doc.data().color);
    tiles_refs[doc.id].tint = PIXI.utils.string2hex(doc.data().color);
  });

})
