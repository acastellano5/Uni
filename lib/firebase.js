import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore, { or } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from "expo-router";
import { Alert } from "react-native";
export const firebaseConfig = {
  clientid: '571895727465-ip6t1dtiqdmabqnlrp9brb2tc1uujg83.apps.googleusercontent.com',
  apiKey: "AIzaSyCBLF3JYaw83flv7LONOIBUEspOlpSUGOI",
  authDomain: "uniapp-6c7b4.firebaseapp.com",
  databaseURL: "https://uniapp-6c7b4-default-rtdb.firebaseio.com",
  projectId: "uniapp-6c7b4",
  storageBucket: "uniapp-6c7b4.appspot.com",
  messagingSenderId: "571895727465",
  appId: "1:571895727465:web:b9a3be078f8149207a29f8",
  measurementId: "G-41914J811Z"
};

GoogleSignin.configure({
  webClientId: '571895727465-ip6t1dtiqdmabqnlrp9brb2tc1uujg83.apps.googleusercontent.com',
});

export async function loginWithEmail(email,password) {
  const fails = 0;
  try {
    const task = await auth().signInWithEmailAndPassword(email, password);
    console.log("BWAH");

  } catch (error) {
    fails++;

    switch (error.code) {
      case "auth/invalid-email":
        console.log("Invalid Email");
        break;
      case "auth/user-not-found":
        console.log("Not Found");
        break;
      case "auth/wrong-password":
        console.log("Wrong Password");

        break;
      default:
        console.log("Other");
        break;
    }


    }
}

export async function signUpWithEmail(email,password) {
  try {
    const task = await auth().createUserWithEmailAndPassword(email,password);
    await auth().currentUser.sendEmailVerification();
    

    return task;
    
  } catch (error) {
    console.log("LEE");
    console.log(error.code);

    switch (error.code) {
      case "auth/email-already-in-use":
        console.log("Email found in databas");
      break;
      case "auth/invalid-email":
        console.log("invalid-email");
        break;
      case "auth/operation-not-allowed":
        console.log("Op-Not-Allowed");
        break;
      case "auth/weak-password":
        console.log("Weak Password");
        break;    
      default:
        break;
    }
  }
  
  return null;
}

export async function getCurrentUser() {
  try {
    const cUser = await auth().currentUser.reload()
    console.log(cUser);
    if (cUser) {
      return cUser
    }
    else{
      return null
    }
  } catch (error) {
    
  }
}