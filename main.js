import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as PIXI from 'pixi.js';

let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);
