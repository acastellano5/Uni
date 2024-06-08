import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore, { or } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from "expo-router";
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

export async function createUserWithEmailAndPassword(email, password, username) {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password
    )
    const usr = response.user
    await auth().currentUser.sendEmailVerification(usr.email)
    if (response.user) {
     console.log(response); 
     return(response)
     
    }
  } catch (error) {
    return(
      "Error",error
    )
  }  
}
export async function loginWithEmail(email,password) {
  try {
    const response = await auth().signInWithEmailAndPassword(
      email,
      password
    )
    const usr = response.user
    if (usr) {
     console.log(response); 
     return(response)
     
    }
  } catch (error) {
    return(
      "Error",error
    )
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
export async function getCurrentUser() {
  try {
    auth().currentUser.reload();
    const curUser =  auth().currentUser;

    //console.log(curUser);
    if (!isReal(curUser)) {
      return null
    }
    try {
      if (curUser) {
        if (curUser.emailVerified) {
          return curUser
        } else {
          return "nV"
        }
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  } catch (error) {
    return null
  }

  
}
export async function isReal(user) {
  
  try {
    const real = await user.getIdToken(true)
  if (real) {
    //console.log("Keep it up");
    return false
  } else {
    //console.log("SSS");
    return true
  }
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        console.log("Dude");
        break;
    
      default:

      console.log(error.code);

        break;
    }
  }

}
export async function resetPass(email) {
  await auth().sendPasswordResetEmail(email).catch(console.error())
}