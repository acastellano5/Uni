import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const firebaseConfig = {
  clientid: '571895727465-ip6t1dtiqdmabqnlrp9brb2tc1uujg83.apps.googleusercontent.com',
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
export async function loginWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}