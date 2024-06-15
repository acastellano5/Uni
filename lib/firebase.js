import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";


import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('User');

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
  try {
    const task = await auth().signInWithEmailAndPassword(email, password);
    console.log("BWAH");
    console.log(task);
    const emailVerified = auth().currentUser.emailVerified
    console.log(task,"Is the idea");
    if (!emailVerified) {
      return "nV"
    }
    return task;
    

  } catch (error) {
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
    return null
    }
}
export async function loginWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
export async function signUpWithEmail(email,password) {
  try {
    console.log("Hello?");
    const task = await auth().createUserWithEmailAndPassword(email,password);
    await auth().currentUser.sendEmailVerification();
    usersCollection.add({
      email: email,
      password: password
    })
    

    return task;
    
  } catch (error) {
    console.log("LEE");
    console.log(error);

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
    const cUser = await auth().currentUser
    await cUser.reload();
    //console.log(cUser,"HEE");
    if (cUser) {
      console.log("Bibbity");
      if (!cUser.emailVerified) {
        console.log("Bobbity");

        return "nV";
      } else {
        console.log("Boo!");
        return cUser
      }

      
    }
    else{
      return null
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function isReal(user) {
}
// Find all Clubs(Given Something)
export async function getClubs(params) {
  const clubArray = []

  try {
    const getClubs = (await firestore().collection('Clubs').get());
    if (params) {
      const queryClub = await getClubs.query.orderBy('name', 'asc').startAt('Prog').get();
      if (!queryClub) {
        console.log("null");
        return null

      }
      for (const club of queryClub.docs) {
        console.log("Club,",club.data());
        clubArray.push(club.data())

      }

    } else {
      const queryClub = await getClubs.query.orderBy('name', 'asc').startAt(params).get();
      if (!queryClub) {
        console.log("null");
        return null
      }
      for (const club of queryClub.docs) {
        console.log("Club,",club.data());
        clubArray.push(club.data())

      }
    

    }
    console.log("WOO");
    

  } catch (error) {
    console.log(error);
  }
  return clubArray
}
// Find all Clubs

export async function SearchClub(name) {
  try {
    
  } catch (error) {
    return null
  }
}