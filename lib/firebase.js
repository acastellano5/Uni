import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


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


























// Find all Clubs(Given Something)
export async function getClubs(params) {
  const clubArray = []

  try {
    const getClubs = (await firestore().collection('Clubs').get());
    if (params) {
      const queryClub = await getClubs.query.orderBy('name', 'asc').startAt('Prog').get();
      if (!queryClub) {
        return null

      }
      for (const club of queryClub.docs) {
        clubArray.push(club.data())

      }

    } else {
      const queryClub = await getClubs.query.orderBy('name', 'asc').startAt(params).get();
      if (!queryClub) {
        return null
      }
      for (const club of queryClub.docs) {
        clubArray.push(club.data())

      }
    

    }
    

  } catch (error) {
    console.log(error);
  }
  console.log(clubArray)
  return clubArray
}
// Find all Clubs









//__________CLUB_ROUTES________________________________


export async function getClubsByType(typeClub) {
  try {
    if (typeClub.length==0) {
      return getClubs();
    }
    const clubCollection = firestore().collection('Clubs')
    const results = await clubCollection.where('type','==',typeClub).get()
    const clubArray = []
    for (const club of results.docs) {
      clubArray.push({
        id: club.id,
        ...club.data()
      })

    }
    return clubArray;

  } catch (error) {
    return null
  }
}


export async function getClubsByName(clubName) {
  try {
    const clubCollection = firestore().collection('Clubs')
    const results = await clubCollection.where('name','==',clubName).get()
    const clubArray = []
    for (const club of results.docs) {
      // console.log("Club,",club.data());
      clubArray.push({
        id: club.id,
        ...club.data()
      })

    }
    return clubArray;
  } catch (error) {
    return null
  }
  
}




export async function getClubById(clubId) {
  try {
    const clubDocument = await firestore().collection('Clubs').doc(clubId).get();
    
    if (clubDocument.exists) {
      const clubData = clubDocument.data();
      clubData.id = clubDocument.id;  // Add the document ID to the data object
      return clubData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}






//__________USER_ROUTES________________________________
export async function getUserByGrade(gradeNum) {
  try {
    const usersCollection = firestore().collection('Users')
    const results = await usersCollection.where('grade', '==', gradeNum).get()
    const userArray = []
    for (const club of results.docs) {
      console.log("Club,",club.data());
      userArray.push(club.data())

    }
    return userArray;
  } catch (error) {
    return null
  }
}
export async function getUserByName(userName) {
  try {
    const usersCollection = firestore().collection('Users')
    const results = await usersCollection.where('name', '==', userName).get()
    const userArray = []
    for (const club of results.docs) {
      console.log("Club,",club.data());
      userArray.push(club.data())

    }
    return userArray;
  } catch (error) {
    return null
  }
}

export async function getUserByEmail(userEmail) {
  try {
    const usersCollection = firestore().collection('Users')
    const results = await usersCollection.where('email', '==', userEmail).get()
    const userArray = []
    for (const club of results.docs) {
      console.log("Club,",club.data());
      userArray.push(club.data())

    }
    return userArray;
  } catch (error) {
    return null
  }
}

export async function getUserAttributes(uid) {
  try {
    const userCollect = firestore().collection('Users')
    const results = await usersCollection.where('uid','==',uid).get()
    const userAtt = []
    for (const club of results.docs) {
      console.log("USER: ",club.data());
      userAtt.push(club.data())
    }
  } catch (error) {
    
  }
  
}










export async function sendPost(caption, photoId, uid) {
  try {
    const timeOfPost = new Date()
    timeOfPost.getTime()
    console.log(timeOfPost.toTimeString());

    const collect = firestore().collection('Post')
    let user = "";
    if (uid) {
      user = uid
    } else {
      user = auth().currentUser.uid
    }
    
    const req =collect.add({
      caption: caption,
      comments: [],
      likes: [],
      postUrl: photoId,
      uid: user,
      postedAt: firestore.FieldValue.serverTimestamp()
    })
     console.log(await req);
  } catch (error) {
    console.log(error);
  }
  
}