import './app.css'
import App from './App.svelte'
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {firebaseConfig} from '../public/credentials.js';

const credentials = firebaseConfig;

const myApp= initializeApp(credentials);
export const db = getFirestore(myApp);

//console.log(db);


const app = new App({
  target: document.getElementById('app')
})

export default app
