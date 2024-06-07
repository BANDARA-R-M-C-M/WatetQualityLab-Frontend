import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA-ReYGVnRIFuSqj28Ypj4q8Diw_oOM2m8",
  authDomain: "system-development-e2712.firebaseapp.com",
  projectId: "system-development-e2712",
  storageBucket: "system-development-e2712.appspot.com",
  messagingSenderId: "377229235029",
  appId: "1:377229235029:web:c3633179f16fb0d9a395dc",
  measurementId: "G-VQ9MP54YK3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };