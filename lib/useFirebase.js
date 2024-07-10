import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useGlobalContext } from "../context/globalProvider";

import firestore, {
  Filter,
  Timestamp,
  query,
} from "@react-native-firebase/firestore";
import { fi, id } from "date-fns/locale";
const db = firestore();

const usersCollection = firestore().collection("User");
const groupCollection = firestore().collection("Group");
const postCollection = db.collection("Post");
const eventCollection = db.collection('Event')


export async function killUser() {
  
}
function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const piece = (Math.random() * 16) | 0;
    const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
    return elem.toString(16);
  });
}
//_______________________________________________________________
export async function becomeMod(id, orgId, groupId) {
  try {
    console.log(await (await groupCollection.where('id','==',groupId).get()).docs[0].ref.update({moderators: firestore.FieldValue.arrayUnion(id)}));
  } catch (error) {
    console.log(error);
  }
}

// done
export async function joinGroup(orgId, groupId) {
  const uID = auth().currentUser.uid
  if (ifGroupFollowed(groupId,orgId)) {
    unfollowGroup(groupId,orgId)
  }
  try {
    console.log(await (await usersCollection.where('id','==',uID).get()).docs[0].ref.update({[`orgs.${orgId}.groups`]: firestore.FieldValue.arrayUnion(groupId)}))
    console.log(await (await groupCollection.where('id','==',groupId).get()).docs[0].ref.update({members: firestore.FieldValue.arrayUnion(uID)}));
    }

  catch (error) {
    console.log(error);

  }
  
  
}

// done
export async function leaveGroup(orgId, groupId) {
  const uID = auth().currentUser.uid
  try {
    console.log(await (await usersCollection.where('id','==',uID).get()).docs[0].ref.update({[`orgs.${orgId}.groups`]: firestore.FieldValue.arrayRemove(groupId)}))
    console.log(await (await groupCollection.where('id','==',groupId).get()).docs[0].ref.update({members: firestore.FieldValue.arrayRemove(uID)}));
    }

  catch (error) {
    console.log(error);

  }
  
  
}

export async function isUserReal(id) {
  if ((await usersCollection.where('id', '==', id).get()).size>0) {
    return true
  }
  return false
}
export async function ifGroupFollowed(followingId, orgId) {
  try {
    const curUser = auth().currentUser.uid
    const followedDoc = (await usersCollection.where('id', '==', curUser).get()).docs[0].data()
    const followersList= followedDoc.orgs[orgId].followGroups
    for (const key in followersList) {
      if (followersList[key]==followingId) {
        return true
      }

  }
  } catch (error) {
    console.log(error);
    return false
  }
  return false
}
// to see if you follows someone
export async function ifUserFollowed(followingId, orgId) {
  try {
    const curUser = auth().currentUser.uid
    const followedDoc = (await usersCollection.where('id', '==', curUser).get()).docs[0].data()
    const followersList= followedDoc.orgs[orgId].social.following
    for (const key in followersList) {
      if (followersList[key]==followingId) {
        return true
      }

  }
  } catch (error) {
    console.log(error);
    return false
  }
  return false
}
// to see if someone follows you
export async function filterUserByRole(orgId,role) {
  const returningArray = []
  try {
    const filterSet = (await usersCollection.where('orgList','array-contains',orgId).get())
    for (const key in filterSet.docs) {
      const data = (filterSet.docs[key].data());
      if(data.orgs[orgId].role==role)
        {
          returningArray.push(data)
        }
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray
}
export async function ifUserFollowing(followingId, orgId) {
  try {
    const curUser = auth().currentUser.uid
    const followedDoc = (await usersCollection.where('id', '==', curUser).get()).docs[0].data()
    const followersList= followedDoc.orgs[orgId].social.followers
    for (const key in followersList) {
      if (followersList[key]==followingId) {
        return true
      }

  }
  } catch (error) {
    console.log(error);
    return false
  }
  return false
}
export async function isUserInGroup(groupId, orgId) {
  const curUser = auth().currentUser.uid;
  try {
    const set = await groupCollection
      .where('orgId', '==', orgId)
      .where('id', '==', groupId)
      .where('members', 'array-contains', curUser)
      .get();

    return set.size > 0;
  } catch (error) {
    console.error('Error checking user in group:', error);
    return false;
  }
}


// done
export async function getGroupById(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = (await groupCollection
        .where("orgId", "==", orgId)
        .where("id", "==", id)
        .get());
      for (const key of groups.docs) {
        // console.log(key.data());
        returningArray.push(key.data());
      }
      return returningArray[0];
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getUserByGroup(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("id", "==", id)
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

// done
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
}

export async function getAllGroups(orgId) {
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
}


// done
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
}

// done
export async function getGroupByCategory(category, orgId) {
  const returningArray = [];
  try {
    if (category) {
      console.log("Hi");
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("category", "==", category)
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

export async function getGroupByDescription(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      console.log("Hi");
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("description", "==", id)
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

// need to implement
export async function followGroup(id, orgId) {
  try {
    const curUser = auth().currentUser.uid
    if (id) {

      const groupDoc = (await groupCollection
      .where('orgId', '==', orgId)
      .where('id', '==', id)
      .get()).docs[0].ref

      const user = await auth().currentUser.uid

      const userDoc = (await usersCollection
        .where('id','==',curUser)
        .get()
      ).docs[0].ref
      const batch = db.batch()
      batch.update(userDoc, {[`orgs.${orgId}.followGroups`]: firestore.FieldValue.arrayUnion(id)})
      batch.update(groupDoc,{followers: firestore.FieldValue.arrayUnion(user)})
      try {
        await batch.commit()
      } catch (error) {
        console.log(error, "Batch Error");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// need to implement
export async function unfollowGroup(id, orgId) {
  try {
    const curUser = auth().currentUser.uid
    if (id) {
      const groupDoc = (await groupCollection
      .where('orgId', '==', orgId)
      .where('id', '==', id)
      .get()).docs[0].ref

      const user = await auth().currentUser.uid

      const userDoc = (await usersCollection
        .where('id','==',curUser)
        .get()
      ).docs[0].ref
      const batch = db.batch()
      batch.update(userDoc, {[`orgs.${orgId}.followGroups`]: firestore.FieldValue.arrayRemove(id)})
      batch.update(groupDoc,{followers: firestore.FieldValue.arrayRemove(user)})
      try {
        await batch.commit()
      } catch (error) {
        console.log(error, "Batch Error");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
//_______________________________________________________________

export async function createUserPost(content, caption, orgId) {
  try {
    const authId = auth().currentUser.uid
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: 'user',
      author: authId,
      content: content,
      likes: [],
      comments: [],
      caption: caption,
      postedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
}
export async function createGroupPost(groupId, content, caption, orgId) {
  try {
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: 'group',
      author: groupId,
      content: content,
      likes: [],
      comments: [],
      caption: caption,
      postedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
}
export async function delPost(orgId,postId) {
  try {
    (await postCollection.where('orgId', '==', orgId).where('postId', '==', postId).get()).docs[0].ref.delete();
  } catch (error) {
    console.log(error);
  }
}
export async function getFollowingPosts(orgId) {
  const user = auth().currentUser.uid
  const returningArray = [];
  try {
    const followingArray = [user]
    const groupArray = []
    const userDoc = (await usersCollection.where('id', '==', user).get()).docs[0]
    try {
      const following = (userDoc.data().orgs[orgId].social.following);
      for (const key of following) {
        followingArray.push(key)
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const following = (userDoc.data().orgs[orgId].groups);
      for (const key of following) {
        groupArray.push(key)
      }
      const followingG = (userDoc.data().orgs[orgId].followGroups);
      for (const key of followingG) {
        groupArray.push(key)
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const combinedArray = followingArray.concat(groupArray)
      for (let index = 0; index < combinedArray.length-1; index++) {
        const element = combinedArray[index];
        if (index<(followingArray.length)) {
          const returnSet =(await getPostByAuthor(element,orgId))
          for (const key in returnSet) {
            returningArray.push(returnSet[key])
          }
        }
        else{
          const returnSet =(await getPostByGroup(element,orgId))
          for (const key in returnSet) {
            returningArray.push(returnSet[key])
          }
        }
        
      }

    } catch (error) {
      
    }


  } catch (error) {
    console.log(error);
  }
  for (let index = 0; index < returningArray.length; index++) {
    const element = returningArray[index];
    returningArray.sort((a,b)=> b.postedAt.seconds - a.postedAt.seconds)
  }
  return returningArray
}

export async function getPostsByTime(orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = await postCollection
        .where("orgId", "==", orgId)
        .orderBy("postedAt", 'desc')
        .get();
      for (const key of groups.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostByCaption(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      console.log("Hi");
      const groups = await postCollection
        .where("orgId", "==", orgId)
        .where("caption", "==", id)
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

// need to implement
export async function getPostByGroup(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = await postCollection
        .where('authorType','==','group')
        .where('orgId', '==', orgId)
        .where("author", "==", id)
        .orderBy('postedAt', 'desc')
        .get();
      for (const key of groups.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}

// need to implement
export async function getPostByAuthor(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const author = await postCollection
        .where('authorType','==','user')
        .where('orgId', '==', orgId)
        .where("author", "==", id)
        .orderBy('postedAt', 'desc')
        .get();
      for (const key of author.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}

// need to implement
export async function likePost(id) {
  const user = auth().currentUser.uid
  const postDoc = (await postCollection.where('postId', '==', id).get()).docs[0].ref
  postDoc.update({likes: firestore.FieldValue.arrayUnion(user)})
}

// need to implement
export async function unlikePost(id) {
  const user = auth().currentUser.uid
  const postDoc = (await postCollection.where('postId', '==', id).get()).docs[0].ref
  await postDoc.update({likes: firestore.FieldValue.arrayRemove(user)})
}

// need to implement
export async function createComment(id, content,text) {
  const num = getUUID()
  const postDoc = (await postCollection.where('postId', '==', id).get()).docs[0].ref
  await postDoc.update({[`comments.${num}`]: {author: auth().currentUser.uid, content: content, text: text,       postedAt: firestore.FieldValue.serverTimestamp()  }})
  await postDoc.update({'commentList': firestore.FieldValue.arrayUnion(num)})
}

// need to implement
export async function deleteComment(postId, commentId) {
  const postDoc = (await postCollection.where('postId', '==', postId).get()).docs[0].ref
  await postDoc.update({[`comments.${commentId}`]: {deleted: true}})
  await postDoc.update({'commentList': firestore.FieldValue.arrayRemove(commentId)})
}
//_____________________________________


// need to implement
export async function followUser(uid, orgId) {
  try {
    const curUser = auth().currentUser.uid;
    const curUserDoc = usersCollection.where("id", "==", curUser).get();
    const userToFollow = uid;
    const userToFollowDoc = usersCollection.where("id", "==", uid).get();
    console.log((await userToFollowDoc).docs[0]);
    const doc1 = usersCollection.doc((await userToFollowDoc).docs[0].id);
    const doc2 = usersCollection.doc((await curUserDoc).docs[0].id);

    const batch = db.batch();
    batch.update(doc1, {
      [`orgs.${orgId}.social.followers`]:
        firestore.FieldValue.arrayUnion(curUser),
    });
    batch.update(doc2, {
      [`orgs.${orgId}.social.following`]: firestore.FieldValue.arrayUnion(uid),
    });
    batch.commit();
  } catch (error) {
    console.log(error);
  }
}
export async function unfollowUser(uid, orgId) {
  try {
    const curUser = auth().currentUser.uid;
    const curUserDoc = usersCollection.where("id", "==", curUser).get();
    const userToFollow = uid;
    const userToFollowDoc = usersCollection.where("id", "==", uid).get();
    console.log((await userToFollowDoc).docs[0]);
    const doc1 = usersCollection.doc((await userToFollowDoc).docs[0].id);
    const doc2 = usersCollection.doc((await curUserDoc).docs[0].id);

    const batch = db.batch();
    batch.update(doc1, {
      [`orgs.${orgId}.social.followers`]:
        firestore.FieldValue.arrayRemove(curUser),
    });
    batch.update(doc2, {
      [`orgs.${orgId}.social.following`]: firestore.FieldValue.arrayRemove(uid),
    });
    batch.commit();
  } catch (error) {
    console.log(error);
  }
}
export async function getUserAttributes(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const users = await usersCollection.where('id', "==", id).get();
      for (const key of users.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray[0];
  } catch (error) {
    console.log(error);
  }
}
export async function finishSignUp() {
  const u1 = auth().currentUser.uid
  const u2 =  (await usersCollection.where(id, '==', u1).get()).docs[0].ref.update({accountSetUp: true})
}
//___________________________________
export async function createEvent(type, orgId, name, location, startTime, endTime, attendees, authorId, description) {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const uuid = getUUID()
  try {
    await eventCollection.add({
      eventId: uuid,
      name:  name,
      authorType: type,
      orgId: orgId,
      description: description,
      attendees: authorId,
      authorId: authorId,
      location: location,
      startTime: start,
      endTime: end

    })
    if (type=="user") {
      const docId = (await usersCollection.where('id', '==', authorId).get()).docs[0].ref.update({events: firestore.FieldValue.arrayUnion(uuid)})
    }
    if (type=="group") {
      const docId = (await groupCollection.where('id', '==', authorId).get()).docs[0].ref.update({events: firestore.FieldValue.arrayUnion(uuid)})
    }
  } catch (error) {
    console.log(error);
  }

}
export async function getEvents(orgId) {
  const user = auth().currentUser.uid
  return getEventByUser(user,orgId)

}
export async function getEventById(id,orgId) {
  const returningArray = [];
  try {
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('eventId', '==', id)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      returningArray.push(key.data());
    }
    return returningArray[0];
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByType(type,orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('authorType', '==', type)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByName(name,orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('name', '==', name)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByStartTime(startTime,orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('startTime', '==', startTime)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByEndTime(endTime,orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('endTime', '==', endTime)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByDesc(desc,orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('description', '==', desc)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByUser(user,orgId) {
  const returningArray = [];
  try {
    const events = await eventCollection
    .where("orgId", "==", orgId)
    .where('attendees','array-contains',user)
    .orderBy('startTime','asc')
    .get();
    for (const key of events.docs) {
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByOrg(groupId, orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const groups = await eventCollection
    .where("orgId", "==", orgId)
    .where('id','==',groupId)
    .orderBy('startTime','asc')
    .get();
    for (const key of groups.docs) {
      console.log(key.data());
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
  
}

export async function attendEvent(orgId, eventId) {
  const uID = auth().currentUser.uid
  try {
    console.log(await (await usersCollection.where('id','==',uID).get()).docs[0].ref.update({events: firestore.FieldValue.arrayUnion(groupId)}))
    console.log(await (await eventCollection.where('id','==',eventId).get()).docs[0].ref.update({attendees: firestore.FieldValue.arrayUnion(uID)}));
    }

  catch (error) {
    console.log(error);

  }
  
  
}
export async function unAttendEvent(orgId, eventId) {
  const uID = auth().currentUser.uid
  try {
    console.log(await (await usersCollection.where('id','==',uID).get()).docs[0].ref.update({events: firestore.FieldValue.arrayRemove(groupId)}))
    console.log(await (await eventCollection.where('id','==',eventId).get()).docs[0].ref.update({attendees: firestore.FieldValue.arrayRemove(uID)}));
    }

  catch (error) {
    console.log(error);

  }
  
  
}
