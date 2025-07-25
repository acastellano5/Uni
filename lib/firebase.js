import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


import firestore from '@react-native-firebase/firestore';
import { getOrgs, leaveOrg } from "./useFirebase";
const db = firestore()

const usersCollection = firestore().collection('User');
const groupCollection = firestore().collection('Group')
export async function getUserDoc(id) {
  return (await usersCollection.where('id','==',id).get()).docs[0].ref
}
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
    console.log(task);
    console.log(task.user.displayName,"NAME");

    const doc = (await usersCollection.where('id', '==', task.user.uid).get()).docs[0]
    console.log(doc.data());
    const isNew = doc.data().accountSetUp
    console.log(isNew);
    console.log(doc.data().orgIdList);
    if (!task.user.emailVerified) {
      return "nV"
    }
    else {
      if (!task.user.displayName) {
        console.log("WORK");
        return "Setup"
      } 
      if (!doc.data().orgIdList) {
        return "NoOrgs"
      }
      else {
        console.log("Brack");
        return task
      }
    }
    
    

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
        console.log("Other", error);
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
      fullName: '',
      email: email,
      accountSetUp: false,
      emailVerified: false,
      id: task.user.uid,
      orgIdList: [],
      interests: [],
      chats: []
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
export async function resetPass(email) {
  auth().sendPasswordResetEmail(email)
}
export async function getCurrentUser() {
  try {
    const cUser = auth().currentUser
    await cUser.reload();
    //console.log(cUser,"HEE");
    if (cUser) {
      //console.log("Bibbity");
      
      if (!cUser.emailVerified) {
        //console.log("Bobbity");

        return "nV";
      } else {
        const userQuery = (await usersCollection.where('id','==',cUser.uid).get()).docs[0]
        userQuery.ref.update({
          emailVerified: true,
        })
        //console.log("Boo!");
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
export async function signOut() {
  auth().signOut()
}
export async function delUser() {
  
  const user = auth().currentUser
  const docFind =  (await firestore().collection('User').where('id','==',user.uid).get()).docs[0].id
  const orgs = await getOrgs()
  for (let index = 0; index < orgs.length; index++) {
    const element = orgs[index];
    await leaveOrg(element)
    
  }
  await firestore().collection('User').doc(docFind).delete()
  await auth().currentUser.delete()
}
export async function setAccountName(first, last, gender) {
  auth().currentUser.updateProfile({
    displayName: first+" "+last
  })
  const docRef = await getUserDoc(auth().currentUser.uid)
  console.log(docRef);
  await docRef.update({fullName: first+" "+last})
  await docRef.update({gender: gender})

}
export async function setAccountBio(bio, interests) {

  const docRef = await getUserDoc(auth().currentUser.uid)
  await docRef.update({bio: bio})
  await docRef.update({interests: interests})
  await docRef.update({accountSetUp: true})
}