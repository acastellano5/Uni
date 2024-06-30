import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('User');
const groupCollection = firestore().collection('Group')
const db = firestore()
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
    //console.log(task);
    const emailVerified = auth().currentUser.emailVerified
    //console.log(task,"Is the idea");
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
      emailVerified: "false",
      uid: task.user.uid,
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
    const cUser = auth().currentUser
    await cUser.reload();
    //console.log(cUser,"HEE");
    if (cUser) {
      //console.log("Bibbity");
      
      if (!cUser.emailVerified) {
        //console.log("Bobbity");

        return "nV";
      } else {
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

export async function getGroupById({id}) {
  const groupArray =[]
  try {
    if (id) {
      const getGroups = (await groupCollection.where('id', '==', id).get())
      const queryClub = await getGroups.query.orderBy('id', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())
        console.log(club.data());
      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('id', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())
        console.log(club.data());
      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}

export async function getGroupByCategory({category}) {
  const groupArray =[]
  try {
    if (category) {
      const getGroups = (await groupCollection.where('category', '==', category).get())
      const queryClub = await getGroups.query.orderBy('category', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('category', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}

export async function getGroupByDescription({description}) {
  const groupArray =[]
  try {
    if (description) {
      const getGroups = (await groupCollection.where('description', '==', description).get())
      const queryClub = await getGroups.query.orderBy('description', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('description', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}

export async function getGroupByEvents({events}) {
  const groupArray =[]
  try {
    if (events) {
      const getGroups = (await groupCollection.where('events', '==', events).get())
      const queryClub = await getGroups.query.orderBy('events', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('events', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}

export async function getGroupByModerators({moderators}) {
  const groupArray =[]
  try {
    if (moderators) {
      const getGroups = (await groupCollection.where('moderators', 'in', moderators).get())
      const queryClub = await getGroups.query.orderBy('moderators', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('moderators', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}

export async function getGroupByName({name}) {
  const groupArray =[]
  try {
    if (name) {
      const getGroups = (await groupCollection.where('name', '==', name).get())
      const queryClub = await getGroups.query.orderBy('name', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('name', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}
export async function getGroupByMembers({members}) {
  const groupArray =[]
  try {
    if (members) {
      const getGroups = (await groupCollection.where('members', 'in', members).get())
      const queryClub = await getGroups.query.orderBy('members', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    } else {
      const getGroups = (await groupCollection.get())
      const queryClub = await getGroups.query.orderBy('members', 'asc').get();
      for (const club of queryClub.docs) {
        groupArray.push(club.data())

      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
  return groupArray;
}













