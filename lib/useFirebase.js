import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useGlobalContext } from "../context/globalProvider";

import firestore, { Timestamp, query } from "@react-native-firebase/firestore";
const db = firestore();
import firestore, { Filter, Timestamp, query } from '@react-native-firebase/firestore';
const db = firestore()

const usersCollection = firestore().collection("User");
const groupCollection = firestore().collection("Group");
const postCollection = db.collection("Post");
function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const piece = (Math.random() * 16) | 0;
    const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
    return elem.toString(16);
  });
}
//_______________________________________________________________
export async function getGroupById(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("id", "==", id)
        .get();
      for (const key of groups.docs) {
        // console.log(key.data());
        returningArray.push(key.data());
      }
      return returningArray[0];
    }
  } catch (error) {
    console.log(error);
  }
export async function getUserByGroup(id, orgId) {
    const returningArray = []
    try {
        if (id) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("id", '==', id)
            .get()
                for(const key of groups.docs)
                {
                    console.log(key.data().members);
                    returningArray.push(key.data().members)
                }
        }
        return returningArray
    } catch (error) {
        console.log(error);
    }
}
export async function getGroupById(id, orgId) {
    const returningArray = []
    try {
        if (id) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("id", '==', id)
            .get()
                for(const key of groups.docs)
                {
                    console.log(key.data());
                    returningArray.push(key.data())
                }
                return returningArray

        }
return returningArray
    } catch (error) {
        console.log(error);
    }
}

export async function getGroupsByName(name, orgId) {
  const returningArray = [];
  try {
    if (name) {
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("name", "==", name)
        .get();
      for (const key of groups.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
export async function getGroupByName(name, orgId) {
    const returningArray = []
    try {
        if (name) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("name", '==', name)
            .get()
for(const key of groups.docs)
                {
                    console.log(key.data());
                    returningArray.push(key.data())
                }
        }
return returningArray
    } catch (error) {
        console.log(error);
    }
}

export async function getAllGroups() {
  const { orgId } = useGlobalContext();
  const returningArray = [];
  try {
    console.log("Hi");
    const groups = await groupCollection.where("orgId", "==", orgId).get();
    for (const key of groups.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
export async function getAllGroups(orgId) {
    const returningArray = []
    try {
        
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .get()
for(const key of groups.docs)
                {
                    console.log(key.data());
                    returningArray.push(key.data())
                }
        return returningArray
        

    } catch (error) {
        console.log(error);
    }
}

export async function getGroupsByCategory(category, orgId) {
  const returningArray = [];
  try {
    if (category) {
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("category", "==", category)
        .get();
      for (const key of groups.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
export async function getGroupByCategory(category, orgId) {
    const returningArray = []
    try {
        if (category) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("category", '==', category)
            .get()
for(const key of groups.docs)
                {
                    console.log(key.data());
                    returningArray.push(key.data())
                }
        }
return returningArray
    } catch (error) {
        console.log(error);
    }
}

export async function getGroupByDescription(id) {
  const { orgId } = useGlobalContext();
  const returningArray = [];
  try {
    if (id) {
      console.log("Hi");
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("description", "in", id)
        .get();
      for (const key of groups.docs) {
        console.log(key.data());
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
export async function getGroupByDescription(id, orgId) {
    const returningArray = []
    try {
        if (id) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("description", '==', id)
            .get()
            for(const key of groups.docs)
                {
                    console.log(key.data());
                    returningArray.push(key.data())
                }
        }
return returningArray
    } catch (error) {
        console.log(error);
    }
}
//_______________________________________________________________
export async function sendPost(authorType, authId, content, caption) {
  try {
    const docRef = await postCollection.add({
      postId: getUUID(),
      authorType: authorType,
      author: authId,
      content: content,
      caption: caption,
      postedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getPostByCaption(id, orgId) {
    const returningArray = []
    try {
        if (id) {
            console.log("Hi");
            const groups = await postCollection
            .where('orgId','==', orgId)
            .where("caption", '==', id)
            .get()
                for(const key of groups.docs)
                {
                    console.log(key.data());
                    returningArray.push(key.data())
                }
        }
return returningArray
    } catch (error) {
        console.log(error);
    }
export async function getPostByCaption(id) {
  const { orgId } = useGlobalContext();
  const returningArray = [];
  try {
    if (id) {
      console.log("Hi");
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("caption", "in", id)
        .get();
      for (const key of groups.docs) {
        console.log(key.data());
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
//_____________________________________
export async function followUser(uid, orgId) {
    try {
        const curUser = auth().currentUser.uid
        const curUserDoc = usersCollection
        .where('uid', '==', curUser)
        .get()
        const userToFollow = uid
        const userToFollowDoc = usersCollection
        .where('uid', '==', uid)
        .get()
        console.log((await userToFollowDoc).docs[0]);
        const doc1 = usersCollection.doc((await userToFollowDoc).docs[0].id)
        const doc2 = usersCollection.doc((await curUserDoc).docs[0].id)

        const batch = db.batch()
        batch.update(doc1,
            {
                [`orgs.${orgId}.social.followers`]: firestore.FieldValue.arrayUnion(curUser)
            }
        )
        batch.update(doc2,
            {
                [`orgs.${orgId}.social.following`]: firestore.FieldValue.arrayUnion(uid)
            }
        )
        batch.commit()
        


    } catch (error) {
        console.log(error);
    }
}