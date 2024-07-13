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
import { el, fi, id, te } from "date-fns/locale";
const db = firestore();

const usersCollection = firestore().collection("User");
const groupCollection = firestore().collection("Group");
const postCollection = db.collection("Post");
const eventCollection = db.collection("Event");

export async function killUser() {}
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
    console.log(
      await (
        await groupCollection.where("id", "==", groupId).get()
      ).docs[0].ref.update({ moderators: firestore.FieldValue.arrayUnion(id) })
    );
  } catch (error) {
    console.log(error);
  }
}

// done
export async function joinGroup(orgId, groupId) {
  const uID = auth().currentUser.uid;
  if (ifGroupFollowed(groupId, orgId)) {
    unfollowGroup(groupId, orgId);
  }
  try {
    console.log(
      await (
        await usersCollection.where("id", "==", uID).get()
      ).docs[0].ref.update({
        [`orgs.${orgId}.groups`]: firestore.FieldValue.arrayUnion(groupId),
      })
    );
    console.log(
      await (
        await groupCollection.where("id", "==", groupId).get()
      ).docs[0].ref.update({ members: firestore.FieldValue.arrayUnion(uID) })
    );
  } catch (error) {
    console.log(error);
  }
}

// done
export async function leaveGroup(orgId, groupId) {
  const uID = auth().currentUser.uid;
  const groupDoc = (await groupCollection.where("id", "==", groupId).get())
    .docs[0];
  const userDoc = (await usersCollection.where("id", "==", uID).get()).docs[0];
  try {
    if (await ifGroupFollowed(groupId, orgId)) {
      await unfollowGroup(groupId, orgId);
    } else {
      await userDoc.ref.update({
        [`orgs.${orgId}.groups`]: firestore.FieldValue.arrayRemove(groupId),
      });
      if (isUserModerator(groupId, orgId) == true) {
        await groupDoc.ref.update({
          moderators: firestore.FieldValue.arrayRemove(groupId),
        });
      } else {
        console.log(uID);
        await groupDoc.ref.update({
          members: firestore.FieldValue.arrayRemove(uID),
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function isUserReal(id) {
  if ((await usersCollection.where("id", "==", id).get()).size > 0) {
    return true;
  }
  return false;
}
export async function ifGroupFollowed(followingId, orgId) {
  try {
    const curUser = auth().currentUser.uid;
    const followedDoc = (
      await usersCollection.where("id", "==", curUser).get()
    ).docs[0].data();
    const followersList = followedDoc.orgs[orgId].followGroups;
    for (const key in followersList) {
      if (followersList[key] == followingId) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
}
// to see if you follows someone
export async function ifUserFollowed(followingId, orgId) {
  try {
    const curUser = auth().currentUser.uid;
    const followedDoc = (
      await usersCollection.where("id", "==", curUser).get()
    ).docs[0].data();
    const followersList = followedDoc.orgs[orgId].social.following;
    for (const key in followersList) {
      if (followersList[key] == followingId) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
}
// to see if someone follows you
export async function filterUserByRole(orgId, role) {
  const returningArray = [];
  try {
    const filterSet = await usersCollection
      .where("orgIdList", "array-contains", orgId)
      .get();
    for (const key in filterSet.docs) {
      const data = filterSet.docs[key].data();
      if (data.orgs[orgId].role == role) {
        returningArray.push(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}

export async function ifUserFollowing(followingId, orgId) {
  try {
    const curUser = auth().currentUser.uid;
    const followedDoc = (
      await usersCollection.where("id", "==", curUser).get()
    ).docs[0].data();
    const followersList = followedDoc.orgs[orgId].social.followers;
    for (const key in followersList) {
      if (followersList[key] == followingId) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
}
export async function isUserInGroup(groupId, orgId) {
  const curUser = auth().currentUser.uid;
  try {
    const set = await groupCollection
      .where("orgId", "==", orgId)
      .where("id", "==", groupId)
      .where("members", "array-contains", curUser)
      .get();

    return set.size > 0;
  } catch (error) {
    console.error("Error checking user in group:", error);
    return false;
  }
}
export async function isUserModerator(groupId, orgId) {
  const curUser = auth().currentUser.uid;
  try {
    const set = await groupCollection
      .where("orgId", "==", orgId)
      .where("id", "==", groupId)
      .where("moderators", "array-contains", curUser)
      .get();

    if (set.size > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user in group:", error);
    return false;
  }
}
export async function getGroupsByUser(user, orgId, needData) {
  const returningArray = [];
  try {
    const userDoc = (
      await usersCollection.where("id", "==", user).get()
    ).docs[0].data();
    const groups = userDoc.orgs[orgId].groups;
    for (let index = 0; index < groups.length; index++) {
      const element = groups[index];
      if (needData) {
        returningArray.push(await getGroupById(element, orgId));
      } else {
        returningArray.push(element);
      }
    }
  } catch (error) {
    console.log("Error getGroupsByUser", error);
  }
  return returningArray;
}
export async function getFollowedGroupsByUser(user, orgId, needData) {
  const returningArray = [];
  try {
    const userDoc = (
      await usersCollection.where("id", "==", user).get()
    ).docs[0].data();
    const groups = userDoc.orgs[orgId].followGroups;
    for (let index = 0; index < groups.length; index++) {
      const element = groups[index];
      if (needData) {
        returningArray.push(await getGroupById(element, orgId));
      } else {
        returningArray.push(element);
      }
    }
  } catch (error) {
    console.log("Error getGroupsByUser", error);
  }
  return returningArray;
}

// done
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
    const curUser = auth().currentUser.uid;
    if (id) {
      const groupDoc = (
        await groupCollection
          .where("orgId", "==", orgId)
          .where("id", "==", id)
          .get()
      ).docs[0].ref;

      const user = await auth().currentUser.uid;

      const userDoc = (await usersCollection.where("id", "==", curUser).get())
        .docs[0].ref;
      const batch = db.batch();
      batch.update(userDoc, {
        [`orgs.${orgId}.followGroups`]: firestore.FieldValue.arrayUnion(id),
      });
      batch.update(groupDoc, {
        followers: firestore.FieldValue.arrayUnion(user),
      });
      try {
        await batch.commit();
      } catch (error) {
        console.log(error, "Batch Error");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getUnfollowed(uid, orgId) {
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
      [`orgs.${orgId}.social.following`]:
        firestore.FieldValue.arrayRemove(curUser),
    });
    batch.update(doc2, {
      [`orgs.${orgId}.social.followers`]: firestore.FieldValue.arrayRemove(uid),
    });
    batch.commit();
  } catch (error) {
    console.log(error);
  }
}
// need to implement
export async function unfollowGroup(id, orgId) {
  try {
    const curUser = auth().currentUser.uid;
    if (id) {
      const groupDoc = (
        await groupCollection
          .where("orgId", "==", orgId)
          .where("id", "==", id)
          .get()
      ).docs[0].ref;

      const user = await auth().currentUser.uid;

      const userDoc = (await usersCollection.where("id", "==", curUser).get())
        .docs[0].ref;
      const batch = db.batch();
      batch.update(userDoc, {
        [`orgs.${orgId}.followGroups`]: firestore.FieldValue.arrayRemove(id),
      });
      batch.update(groupDoc, {
        followers: firestore.FieldValue.arrayRemove(user),
      });
      try {
        await batch.commit();
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
    const authId = auth().currentUser.uid;
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: "user",
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
export async function createOrgPost(content, caption, orgId) {
  try {
    const authId = auth().currentUser.uid;
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: "org",
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
  const user = auth().currentUser.uid;
  try {
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: "group",
      author: groupId,
      writtenBy: user,
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
export async function delPost(orgId, postId) {
  try {
    (
      await postCollection
        .where("orgId", "==", orgId)
        .where("postId", "==", postId)
        .get()
    ).docs[0].ref.delete();
  } catch (error) {
    console.log(error);
  }
}
export async function getFollowingPosts(orgId) {
  const user = auth().currentUser.uid;
  const returningArray = [];
  try {
    const followingArray = [user];
    followingArray.concat(orgId);
    const groupArray = [];
    const userDoc = (await usersCollection.where("id", "==", user).get())
      .docs[0];
    try {
      const following = userDoc.data().orgs[orgId].social.following;
      for (const key of following) {
        followingArray.push(key);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const following = userDoc.data().orgs[orgId].groups;
      for (const key of following) {
        groupArray.push(key);
      }
      const followingG = userDoc.data().orgs[orgId].followGroups;
      for (const key of followingG) {
        groupArray.push(key);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const combinedArray = followingArray.concat(groupArray);
      for (let index = 0; index < combinedArray.length; index++) {
        const element = combinedArray[index];
        if (index < followingArray.length) {
          const returnSet = await getPostByAuthor(element, orgId);
          for (const key in returnSet) {
            returningArray.push(returnSet[key]);
          }
        } else {
          const returnSet = await getPostByGroup(element, orgId);
          for (const key in returnSet) {
            returningArray.push(returnSet[key]);
          }
        }
      }
    } catch (error) {}
  } catch (error) {
    console.log(error);
  }
  for (let index = 0; index < returningArray.length; index++) {
    const element = returningArray[index];
    returningArray.sort((a, b) => b.postedAt.seconds - a.postedAt.seconds);
  }
  return returningArray;
}

export async function getPostsByTime(orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = await postCollection
        .where("orgId", "==", orgId)
        .orderBy("postedAt", "desc")
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
        .where("authorType", "==", "group")
        .where("orgId", "==", orgId)
        .where("author", "==", id)
        .orderBy("postedAt", "desc")
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
        .where("authorType", "==", "user")
        .where("orgId", "==", orgId)
        .where("author", "==", id)
        .orderBy("postedAt", "desc")
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

export async function getPostById(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const querySnapshot = await postCollection
        .where("authorType", "==", "user")
        .where("orgId", "==", orgId)
        .where("postId", "==", id)
        .orderBy("postedAt", "desc")
        .get();

      querySnapshot.forEach((doc) => {
        returningArray.push(doc.data());
      });
    }
    return returningArray;
  } catch (error) {
    console.error("Error fetching post:", error);
    return []; // Return an empty array or handle the error as per your application's logic
  }
}


// need to implement
export async function likePost(id) {
  const user = auth().currentUser.uid;
  const postDoc = (await postCollection.where("postId", "==", id).get()).docs[0]
    .ref;
  postDoc.update({ likes: firestore.FieldValue.arrayUnion(user) });
}

// need to implement
export async function unlikePost(id) {
  const user = auth().currentUser.uid;
  const postDoc = (await postCollection.where("postId", "==", id).get()).docs[0]
    .ref;
  await postDoc.update({ likes: firestore.FieldValue.arrayRemove(user) });
}
export async function isPostLiked(postId) {
  const user = auth().currentUser.uid;
  try {
    const postDoc = (
      await postCollection
        .where("postId", "==", postId)
        .where("likes", "array-contains", user)
        .get()
    ).docs[0].ref;
    return true;
  } catch (error) {
    return false;
  }
}

// need to implement
export async function createComment(id, text) {
  const num = getUUID();
  const postDoc = (await postCollection.where("postId", "==", id).get()).docs[0]
    .ref;
  await postDoc.update({
    [`comments.${num}`]: {
      commentId: num,
      author: auth().currentUser.uid,
      text: text,
      postedAt: firestore.FieldValue.serverTimestamp(),
    },
  });
  await postDoc.update({ commentList: firestore.FieldValue.arrayUnion(num) });
}

// need to implement
export async function deleteComment(postId, commentId) {
  const postDoc = (await postCollection.where("postId", "==", postId).orderBy('commentList','asc').get())
    .docs[0].ref;
  await postDoc.update({ [`comments.${commentId}`]: { deleted: true } });
  await postDoc.update({
    commentList: firestore.FieldValue.arrayRemove(commentId),
  });
  await postDoc.update({
    comments: firestore.FieldValue.arrayRemove(commentId),
  });
}
export async function getComments(postId,orgId) {
  const returningArray = []
  try {
    const posts = (await postCollection.where('orgId', '==', orgId).where('postId','==',postId).get()).docs[0].data()
    const commentData = (posts.comments)
    return posts.comments


  } catch (error) {
    console.log(error);
    return null
  }
  return null
}
export async function getCommentByUser(user, orgId) {
  const returningArray = []
  try {
    const posts = (await postCollection.where('orgId', '==', orgId).get()).docs
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      console.log(element);
      const commentData = (element.data().comments)
      const comments = element.data().commentList
      const commentLength = comments.length
      for (let index = 0; index < commentLength; index++) {
        const WHYY = [commentData[comments[index]]];
        const author=(WHYY[0].author);
        if (author==user) {
          console.log('works');
          returningArray.push(WHYY)
        }
        
      }
      
    }
  } catch (error) {
    return returningArray
  }
  return returningArray
}
export async function getCommentById(id, orgId) {
  const returningArray = []
  try {
    const posts = (await postCollection.where('orgId', '==', orgId).where('commentList','array-contains',id).get()).docs
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      console.log(element);
      const commentData = (element.data().comments)
      const comments = element.data().commentList
      const commentLength = comments.length
      const WHYY = commentData[comments[index]]
      console.log(WHYY);
      returningArray.push(WHYY)  
    }
  } catch (error) {
    return returningArray
  }
  return returningArray
}
export async function getCommentByKeyword(keyword, orgId) {
  const returningArray = []
  try {
    const posts = (await postCollection.where('orgId', '==', orgId).get()).docs
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      console.log(element);
      const commentData = (element.data().comments)
      const comments = element.data().commentList
      const commentLength = comments.length
      for (let index = 0; index < commentLength; index++) {
        const WHYY = [commentData[comments[index]]];
        let text = ''
        text=(WHYY[0].text);
        if (text.includes(keyword)) {
          console.log(text);
          returningArray.push(WHYY)
        }
        
      }
      
    }
  } catch (error) {
    return returningArray
  }
  return returningArray
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
      const users = await usersCollection.where("id", "==", id).get();
      for (const key of users.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray[0];
  } catch (error) {
    console.log(error);
  }
}
export async function getUsers(orgId, name) {
  const returningArray = [];
  try {
    if (name) {
      const setDocs = (
        await usersCollection.where("orgIdList", "array-contains", orgId).get()
      ).docs;
      for (let index = 0; index < setDocs.length; index++) {
        const element = setDocs[index].data().fullName;
        let elementTwo = "";
        elementTwo = element;
        elementTwo = elementTwo.toLowerCase().toString();

        if (elementTwo.includes(name.toLowerCase())) {
          returningArray.push(setDocs[index].data());
        }
      }
    } else {
      const setDocs = (
        await usersCollection.where("orgIdList", "array-contains", orgId).get()
      ).docs;
      for (let index = 0; index < setDocs.length; index++) {
        returningArray.push(setDocs[index].data());
      }
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function finishSignUp() {
  const u1 = auth().currentUser.uid;
  const u2 = (
    await usersCollection.where(id, "==", u1).get()
  ).docs[0].ref.update({ accountSetUp: true });
}
//___________________________________
export async function createEvent(
  type,
  orgId,
  name,
  location,
  startTime,
  endTime,
  attendees,
  authorId,
  description
) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const uuid = getUUID();
  try {
    await eventCollection.add({
      eventId: uuid,
      name: name,
      authorType: type,
      orgId: orgId,
      description: description,
      attendees: authorId,
      authorId: authorId,
      location: location,
      startTime: start,
      endTime: end,
    });
    if (type == "user") {
      const docId = (
        await usersCollection.where("id", "==", authorId).get()
      ).docs[0].ref.update({ events: firestore.FieldValue.arrayUnion(uuid) });
    }
    if (type == "group") {
      const docId = (
        await groupCollection.where("id", "==", authorId).get()
      ).docs[0].ref.update({ events: firestore.FieldValue.arrayUnion(uuid) });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getEvents(orgId) {
  const user = auth().currentUser.uid;
  return getEventByUser(user, orgId);
}
export async function getEventById(id, orgId) {
  const returningArray = [];
  try {
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("eventId", "==", id)
      .orderBy("startTime", "asc")
      .get();
    for (const key of events.docs) {
      returningArray.push(key.data());
    }
    return returningArray[0];
  } catch (error) {
    console.log(error);
  }
}
export async function getEventByType(type, orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("authorType", "==", type)
      .orderBy("startTime", "asc")
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
export async function getEventByName(name, orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("name", "==", name)
      .orderBy("startTime", "asc")
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
export async function getEventByStartTime(startTime, orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("startTime", "==", startTime)
      .orderBy("startTime", "asc")
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
export async function getEventByEndTime(endTime, orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("endTime", "==", endTime)
      .orderBy("startTime", "asc")
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
export async function getEventByDesc(desc, orgId) {
  const returningArray = [];
  try {
    console.log("Hi");
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("description", "==", desc)
      .orderBy("startTime", "asc")
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
export async function getEventByUser(user, orgId) {
  const returningArray = [];
  try {
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("attendees", "array-contains", user)
      .orderBy("startTime", "asc")
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
export async function getEventByOrg(groupId, orgId) {
  const returningArray = [];
  try {
    const groups = await eventCollection
      .where("orgId", "==", orgId)
      .where("authorId", "==", groupId)
      .orderBy("startTime", "asc")
      .get();
    for (const key of groups.docs) {
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(groupId, "error getEventByOrg", error);
  }
}
export async function getCommunityEvents(orgId) {
  const user = auth().currentUser.uid;
  const returningArray = [];
  try {
    let groupsArray = [orgId];
    try {
      groupsArray = groupsArray.concat(await getGroupsByUser(user, orgId));
      for (let index = 0; index < groupsArray.length; index++) {
        const element = groupsArray[index];
        const test = await getEventByOrg(element, orgId);
        if (test.length > 0) {
          returningArray.push(await getEventByOrg(element, orgId));
        }
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function attendEvent(orgId, eventId) {
  const uID = auth().currentUser.uid;
  try {
    console.log(
      await (
        await usersCollection.where("id", "==", uID).get()
      ).docs[0].ref.update({ events: firestore.FieldValue.arrayUnion(groupId) })
    );
    console.log(
      await (
        await eventCollection.where("id", "==", eventId).get()
      ).docs[0].ref.update({ attendees: firestore.FieldValue.arrayUnion(uID) })
    );
  } catch (error) {
    console.log(error);
  }
}
export async function unAttendEvent(orgId, eventId) {
  const uID = auth().currentUser.uid;
  try {
    console.log(eventId);
    const event = await (
      await eventCollection.where("eventId", "==", eventId).get()
    ).docs[0].data().authorId;

    if (uID == event) {
      const event = await (
        await eventCollection.where("eventId", "==", eventId).get()
      ).docs[0].ref.delete();
      await (
        await usersCollection.where("id", "==", uID).get()
      ).docs[0].ref.update({
        events: firestore.FieldValue.arrayRemove(eventId),
      });
    } else {
      console.log(
        await (
          await eventCollection.where("eventId", "==", eventId).get()
        ).docs[0].ref.update({
          attendees: firestore.FieldValue.arrayRemove(uID),
        })
      );

      await (
        await usersCollection.where("id", "==", uID).get()
      ).docs[0].ref.update({
        events: firestore.FieldValue.arrayRemove(eventId),
      });
    }
  } catch (error) {
    console.log("eventerror");
  }
}
export async function isAttended(eventId, orgId) {
  const user = auth().currentUser.uid;
  try {
    if (
      (
        await eventCollection
          .where("eventId", "==", eventId)
          .where("attendees", "array-contains", user)
          .get()
      ).docs.length > 0
    ) {
      console.log("works");
    }
    return true;
  } catch (error) {
    return false;
  }
}
//_____________________________________________________________________
export async function getOrgs() {
  const returningArray = [];
  const userId = auth().currentUser.uid;
  try {
    const userDoc = (
      await usersCollection.where("id", "==", userId).get()
    ).docs[0].data().orgIdList;
    console.log(userDoc);
    for (let index = 0; index < userDoc.length; index++) {
      const element = userDoc[index];
      returningArray.push(element);
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function getFollowers(uid, orgId) {
  const returningArray = [];
  try {
    const userDoc = (
      await usersCollection.where("id", "==", uid).get()
    ).docs[0].data().orgs[orgId].social.followers;
    for (let index = 0; index < userDoc.length; index++) {
      const element = userDoc[index];
      console.log(element);
      returningArray.push(element);
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function getFollowing(uid, orgId) {
  const returningArray = [];
  try {
    const userDoc = (
      await usersCollection.where("id", "==", uid).get()
    ).docs[0].data().orgs[orgId].social.following;
    for (let index = 0; index < userDoc.length; index++) {
      const element = userDoc[index];
      console.log(element);
      returningArray.push(element);
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}

export async function leaveOrg(orgId) {
  const userId = auth().currentUser.uid;
  const groups = await getGroupsByUser(userId, orgId);
  await (
    await usersCollection.where("id", "==", userId).get()
  ).docs[0].ref.update({ orgIdList: firestore.FieldValue.arrayRemove(orgId) });
  for (let index = 0; index < groups.length; index++) {
    const element = groups[index];
    if (await isUserInGroup(element, orgId)) {
      await leaveGroup(orgId, element);
    }
  }
  const followedGroups = await getFollowedGroupsByUser(userId, orgId);
  for (let index = 0; index < followedGroups.length; index++) {
    const element = followedGroups[index];
    unfollowGroup(element, orgId);
  }
  const events = await getEventByUser(userId, orgId);
  for (let index = 0; index < events.length; index++) {
    const element = events[index];
    console.log(element);
    await unAttendEvent(orgId, element.eventId);
  }
  const posts = await getPostByAuthor(userId, orgId);
  for (let index = 0; index < posts.length; index++) {
    const element = posts[index];
    await delPost(orgId, element.postId);
  }
  const allPosts = await getPostsByTime(orgId);
  for (let index = 0; index < allPosts.length; index++) {
    const element = allPosts[index];
    if (isPostLiked(element.postId)) {
      unlikePost(element.postId);
    }
  }
  const following = await getFollowing(userId, orgId);
  for (let index = 0; index < following.length; index++) {
    const element = following[index];
    await unfollowUser(element, orgId);
  }
  const followers = await getFollowers(userId, orgId);
  for (let index = 0; index < followers.length; index++) {
    const element = followers[index];
    await getUnfollowed(element, orgId);
  }
  await (
    await usersCollection.where("id", "==", userId).get()
  ).docs[0].ref.update({ orgs: firestore.FieldValue.arrayRemove(orgId) });
}
