import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import storage from "@react-native-firebase/storage";
import firestore, {
  FieldPath,
  Filter,
  Timestamp,
  collection,
  or,
  query,
  where,
  orderBy,
  limit,
  doc,
  onSnapshot,
} from "@react-native-firebase/firestore";
import { el, fi, id, te } from "date-fns/locale";
import { useEffect } from "react";
import { useGlobalContext } from "../context/globalProvider";
const db = firestore();
let CURRuser = null;
try {
  CURRuser = auth().currentUser.uid;
} catch (error) {}
export async function initializeVars() {
  try {
    CURRuser = auth().currentUser.uid;
  } catch (error) {}
}
const usersCollection = firestore().collection("User");
const groupCollection = firestore().collection("Group");
const postCollection = db.collection("Post");
const eventCollection = db.collection("Event");
const messagesCollection = db.collection("Messages");
const requestsCollection = db.collection("Requests");
const orgsCollection = db.collection("Orgs");
const jobsCollection = db.collection("Jobs");
const companyCollection = db.collection("Company");
// Assuming you're using Firebase Firestore and have already initialized Firebase
export async function addCompany(body, orgId) {
  try {
    

  if (body.isAlumniOwned) {
    console.log('====================================');
    console.log("Bleep");
    console.log('====================================');
    console.log('====================================');
    console.log(body);
    console.log('====================================');
    const logo = await uploadToFirebase(body.companyLogo)
    const id = getUUID()
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    const uid = auth().currentUser.uid
    console.log('====================================');
    console.log(uid);
    console.log('====================================');
    return await companyCollection
      .add({
        companyID: id,
        companyName: body.companyName,
        owner: uid,
        description: body.description,
        isAlumniOwned: body.isAlumniOwned,
        jobs: [],
        location: body.location,
        industry: body.industry,
        logo: logo,
        orgId: orgId,
      })
      .then((docRef) => {
        return id
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    console.log('====================================');
    console.log("Bleeper");
    console.log('====================================');
    console.log('====================================');
    console.log(body);
    console.log('====================================');
    console.log('====================================');
    console.log(body.companyName);
    console.log(body.description);
    console.log(body.isAlumniOwned);
    console.log(body.location);
    console.log(body.industry);
    
    
    
    
    console.log('====================================');
    const compID = getUUID()
    const uid = auth().currentUser.uid
    return await companyCollection
      .add({
        companyID: compID,
        companyName: body.companyName,
        owner: uid,
        description: body.description,
        isAlumniOwned: body.isAlumniOwned,
        jobs: [],
        location: body.location,
        industry: body.industry,
        orgId: orgId,
      })
      .then((docRef) => {
        console.log("EEEE");
        
        return docRef
      })
      .catch((error) => {
        console.log("EEEE");

        console.error("Error adding document: ", error);
      });
  }
} catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
}
}
export async function editCompany(id, body, orgId) {
  console.log(body);
  
  const curLogo = (
    await companyCollection.where("companyID", "==", id).get()
  ).docs[0].data().logo
  console.log(curLogo);
  console.log(body.companyLogo);
  
  
  if (curLogo != body.companyLogo) {
    return await (
      await companyCollection.where("companyID", "==", id).get()
    ).docs[0].ref
      .update({
        companyName: body.companyName,
        description: body.description,
        location: body.location,
        industry: body.industry,
        logo: await uploadToFirebase(body.companyLogo),
        orgId: orgId,
      })
      .then((docRef) => {
        console.log("Job document successfully written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    console.log("HEEE");
    
    return await (
      await companyCollection.where("companyID", "==", id).get()
    ).docs[0].ref
      .update({
        companyName: body.companyName,
        description: body.description,
        location: body.location,
        industry: body.industry,
        logo: body.companyLogo,
        orgId: orgId,
      })
      .then((docRef) => {
        console.log("Job document successfully written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}
export async function deleteCompany(id) {
  return await (
    await companyCollection.where("companyID", "==", id).get()
  ).docs[0].ref.delete();
}
export async function getCompanyByOrg(orgId) {
  const returningArray = [];
  const reference = await companyCollection.where("orgId", "==", orgId).get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray;
}
export async function getCompanyByOwner(uid, orgId) {
  const returningArray = [];
  const reference = await companyCollection.where("orgId", "==", orgId).where('owner','==',uid).get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray;
}
export async function getCompanyByIndustry(orgId, industryType) {
  const returningArray = [];
  const reference = await companyCollection
    .where("industry", "==", industryType)
    .where("orgId", "==", orgId)
    .get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray;
}
export async function getCompanyByName(orgId, name) {
  const returningArray = [];
  const reference = await companyCollection
    .where("companyName", "==", name)
    .where("orgId", "==", orgId)
    .get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray;
}
export async function getCompanyById(id) {
  const returningArray = [];
  const reference = await companyCollection
    .where("companyID", '==', id)
    .get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray[0];
}
export async function getJobById(id) {
  const returningArray = [];
  const reference = await jobsCollection
    .where("jobID", '==', id)
    .get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray[0];
}

export async function getJobsByTitle(orgId, title) {
  const returningArray = [];
  const reference = await jobsCollection
    .where("jobRole", "==", title)
    .where("orgId", "==", orgId)
    .get();
  for (let index = 0; index < reference.size; index++) {
    const element = reference.docs[index].data();
    returningArray.push(element);
  }
  return returningArray;
}

export async function getJobsByIndustry(orgId, industryType) {
  const returningArray = [];
  
  // Step 1: Get all companies in the specified industry
  const companyReference = await companyCollection
    .where("industry", "==", industryType)
    .where("orgId", "==", orgId)
    .get();
    
  const companyIds = companyReference.docs.map(doc => doc.data().companyID);
  
  if (companyIds.length === 0) {
    // No companies found in the specified industry
    return returningArray;
  }

  // Step 2: Get all jobs from the matching companies
  const jobsReference = await jobsCollection
    .where("companyID", "in", companyIds)
    .get();

  for (let index = 0; index < jobsReference.size; index++) {
    const job = jobsReference.docs[index].data();
    returningArray.push(job);
  }

  return returningArray;
}

export async function editJob(
  jobID,
  role,
  location,
  description,
  method,
  email,
  website,
  deadline,
  companyID,
  companyName
) {
  try {
    const querySnapshot = await jobsCollection.where("jobID", "==", jobID).get();
    if (querySnapshot.empty) {
      throw new Error("No job found with the specified ID");
    }

    const docRef = querySnapshot.docs[0].ref;
    const batch = firestore().batch();

    // Update all fields, including company details
    batch.update(docRef, {
      jobRole: role,
      location: location,
      description: description,
      method: method,
      email: email || null, // Clear if not provided
      website: website || null, // Clear if not provided
      deadline: Timestamp.fromDate(new Date(deadline)), // Ensure correct format
      companyID: companyID || null, // Update to selected company ID or clear
      companyName: companyName || null, // Update company name or clear
    });

    await batch.commit();
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
}


export async function createJob(orgId, body) {
  try {
    if (body.company) {
      const company = await getCompanyById(body.company);
      const ref = (await companyCollection.where('companyID', '==', body.company).get()).docs[0].ref;
      const jobID = getUUID();

      console.log(auth().currentUser.uid);

      const jobRef = await jobsCollection.add({
        jobRole: body.role,
        companyID: body.company,
        companyName: company.companyName,
        location: body.location,
        industry: body.industry,
        jobID: jobID,
        postedBy: auth().currentUser.uid,
        description: body.description,
        orgId: orgId,
        method: body.method, // New property
        email: body.method === "Email" ? body.email : null, // New property
        website: body.method === "Website" ? body.website : null, // New property
        deadline: body.deadline, // New property
        postedAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log('====================================');
      console.log("Over 3");
      console.log('====================================');
      await ref.update({
        jobs: firestore.FieldValue.arrayUnion(jobID),
      });
      return jobID;
    } else {
      const ref = await addCompany(
        {
          companyName: body.companyName,
          owner: auth().currentUser.uid,
          description: body.description,
          isAlumniOwned: false,
          location: body.location,
          industry: body.industry,
          orgId: orgId,
        },
        orgId
      );

      const comptr = (await ref.id);
      const compId = (await companyCollection.doc(comptr).get()).data().companyID;
      const uid = auth().currentUser.uid;

      const jobID = getUUID();
      const jobRef = await jobsCollection.add({
        jobRole: body.role,
        companyID: compId,
        location: body.location,
        companyName: body.companyName,
        industry: body.industry,
        jobID: jobID,
        postedBy: uid,
        description: body.description,
        orgId: orgId,
        method: body.method, // New property
        email: body.method === "Email" ? body.email : null, // New property
        website: body.method === "Website" ? body.website : null, // New property
        deadline: body.deadline, // New property
        postedAt: firestore.FieldValue.serverTimestamp(),

      });

      console.log("Worked bozo");

      await ref.update({
        jobs: firestore.FieldValue.arrayUnion(jobID),
      });
      return jobID;
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
}




export async function deleteJobs(id) {
  try {
    // Step 1: Get the job document by jobID
    const jobSnapshot = await jobsCollection.where("jobID", "==", id).get();
    if (jobSnapshot.empty) {
      throw new Error("Job not found");
    }

    const jobRef = jobSnapshot.docs[0].ref;
    const jobData = (await jobRef.get()).data();

    // Step 2: Remove the job from the company's jobs array
    const companyID = jobData.companyID; // Extract companyID
    const companySnapshot = await companyCollection
      .where("companyID", "==", companyID)
      .get();
    if (!companySnapshot.empty) {
      const companyRef = companySnapshot.docs[0].ref;
      await companyRef.update({
        jobs: firestore.FieldValue.arrayRemove(id), // Remove jobID from the array
      });
    }

    // Step 3: Delete the job document
    await jobRef.delete();
    console.log(`Job with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}

export async function getAllJobs(orgId) {
  returningArray = [];
  const select = (await jobsCollection.where("orgId", "==", orgId).get()).docs;
  for (const key in select) {
    returningArray.push(select[key].data());
  }
  for (let index = 0; index < returningArray.length; index++) {
    const element = returningArray[index];
    returningArray.sort((a, b) => b.postedAt.seconds - a.postedAt.seconds);
  }
  return returningArray;
}
export async function getAllCompanies(orgId) {
  returningArray = [];
  const select = (await companyCollection.where("orgId", "==", orgId).get()).docs;
  for (const key in select) {
    returningArray.push(select[key].data());
  }
  return returningArray;
}

export async function getAllOrgs() {
  const returningArray = [];
  try {
    const orgs = await orgsCollection.get();
    console.log("====================================");
    console.log(orgs.size);
    console.log("====================================");
    for (let index = 0; index < orgs.size; index++) {
      const element = orgs.docs[index].data();
      returningArray.push(element);
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function sendAlumniRequest(uid, body, orgId) {
  console.log(body.stateValue);
  console.log(body.classValue);
  console.log(body.employmentValue);
  console.log(body);

  try {
    await requestsCollection.add({
      orgId: orgId,
      code: getUUID(),
      uid: CURRuser,
      role: "Alumni",
      reqType: "Join",
      reqDate: firestore.FieldValue.serverTimestamp(),
      alumniClass: body.class,
      alumniEmployment: body.employment,
      alumniEmploymentValue: body.employmentValue,
      alumniClassValue: body.classValue,
      alumniStateValue: body.stateValue,
      alumniState: body.state,
      alumniCollege: body.college,
      alumniCollegeValue: body.college,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getUserRole(orgId) {
  try {
    const docRef = (
      await usersCollection.where("id", "==", CURRuser).get()
    ).docs[0].data().orgs[orgId].role;
    console.log(docRef);

    return docRef;
  } catch (error) {
    console.log(error);
    return null;
  }

  return docRef;
}
export async function getUserPerms(orgId) {
  try {
    const docRef = (
      await usersCollection.where("id", "==", CURRuser).get()
    ).docs[0].data().orgs[orgId].perms;
    return docRef;
  } catch (error) {
    console.log(error);
    return null;
  }

  return docRef;
}
export function getUUID() {
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

export async function joinGroup(orgId, groupId, userId) {
  let uID = CURRuser;
  if (userId) {
    uID = userId;
  }
  const role = getUserRole(orgId);
  if (ifGroupFollowed(groupId, orgId)) {
    console.log("Following");
    unfollowGroup(groupId, orgId);
  }
  try {
    if (
      (await groupCollection.where("id", "==", groupId).count().get()).data()
        .count > 0
    ) {
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
    } else {
      return "[user/roleillegal]";
    }
  } catch (error) {
    console.log(error);
  }
}

// done
export async function leaveGroup(orgId, groupId, userId) {
  let uID = CURRuser;
  if (userId) {
    uID = userId;
  }

  try {
    const groupDoc = (await groupCollection.where("id", "==", groupId).get())
      .docs[0];

    const userDoc = (await usersCollection.where("id", "==", uID).get())
      .docs[0];
    if ((await ifGroupFollowed(groupId, orgId, userId)) == true) {
      console.log("HERE");

      await unfollowGroup(groupId, orgId, userId);
    } else {
      console.log("REE");
      await userDoc.ref.update({
        [`orgs.${orgId}.groups`]: firestore.FieldValue.arrayRemove(groupId),
      });

      if ((await isUserModerator(groupId, orgId, userId)) == true) {
        console.log("mod");

        await groupDoc.ref.update({
          moderators: firestore.FieldValue.arrayRemove(uID),
        });
        console.log("deleted Mod");
      } else {
        console.log("member");
        await groupDoc.ref.update({
          members: firestore.FieldValue.arrayRemove(uID),
        });
      }
    }
  } catch (error) {
    console.log("Err", error);
  }
}

export async function isUserReal(id) {
  if ((await usersCollection.where("id", "==", id).get()).size > 0) {
    return true;
  }
  return false;
}
export async function getFollowers(uid, orgId, needData) {
  const returningArray = [];
  try {
    const userDoc = (
      await usersCollection.where("id", "==", uid).get()
    ).docs[0].data().orgs[orgId].social.followers;
    for (let index = 0; index < userDoc.length; index++) {
      if (needData) {
        const element = userDoc[index];
        returningArray.push(await getUserAttributes(element));
      } else {
        const element = userDoc[index];
        returningArray.push(element);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function getFollowing(uid, orgId, needData) {
  const returningArray = [];
  try {
    const userDoc = (
      await usersCollection.where("id", "==", uid).get()
    ).docs[0].data().orgs[orgId].social.following;
    for (let index = 0; index < userDoc.length; index++) {
      if (needData) {
        const element = userDoc[index];
        returningArray.push(await getUserAttributes(element));
      } else {
        const element = userDoc[index];
        returningArray.push(element);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function ifGroupFollowed(followingId, orgId) {
  try {
    const curUser = CURRuser;
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
    console.log("error ", error);
    return false;
  }
  return false;
}
// to see if you follows someone
export async function ifUserFollowed(followingId, orgId) {
  try {
    const curUser = CURRuser;
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
    const curUser = CURRuser;
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
export async function isUserInGroup(groupId, orgId, userId) {
  let curUser = CURRuser;
  if (userId) {
    curUser = userId;
  }
  try {
    const set = await groupCollection
      .where("orgId", "==", orgId)
      .where("id", "==", groupId)
      .where("members", "array-contains", curUser)
      .get();
    const setTwo = await groupCollection
      .where("orgId", "==", orgId)
      .where("id", "==", groupId)
      .where("moderators", "array-contains", curUser)
      .get();
    if (set.size > 0 || setTwo.size > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user in group:", error);
    return false;
  }
}
export async function isUserModerator(groupId, orgId, userId) {
  let curUser = CURRuser;
  if (userId) {
    curUser = userId;
  }
  try {
    const set = await groupCollection
      .where("orgId", "==", orgId)
      .where("id", "==", groupId)
      .where("moderators", "array-contains", curUser)
      .get();
    console.log(set.size);
    if (set.size == 0) {
      return false;
    } else {
      console.log("WORKS");
      return true;
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

export async function createGroup(
  orgId,
  name,
  category,
  description,
  image,
  roles,
  perms
) {
  const id = getUUID();

  try {
    await groupCollection.add({
      id: id,
      orgId: orgId,
      name: name,
      category: category,
      description: description,
      image: await uploadToFirebase(image),
      roles: roles,
      perms: perms,
    });
    await becomeMod(CURRuser, orgId, id);
  } catch (error) {
    console.log(error);
  }
  return id;
}
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
        const map = key.data();
        map.canJoin = false;
        map.canSee = false;
        const userRole = await getUserRole(orgId);
        const groupRoles = map.roles;
        const perms = map.relation;
        const roles = await getUserPerms(orgId);

        if (groupRoles.includes(userRole)) {
          map.canSee = true;
        }
        if (roles.includes(perms)) {
          map.canJoin = true;
        }
        returningArray.push(map);
      }
      return returningArray[0];
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
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

export async function getAllGroups(orgId, userRole) {
  const returningArray = [];

  try {
    console.log("Hi");
    const groups = await groupCollection
      .where("orgId", "==", orgId)
      .where("roles", "array-contains-any", [userRole])
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

// done
export async function getGroupsByCategory(category, orgId) {
  const returningArray = [];
  const userPerms = await getUserPerms(orgId);
  console.log(userPerms);

  try {
    if (category) {
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("category", "==", category)
        .where("roles", "array-contains-any", userPerms)
        .get();
      for (const key of groups.docs) {
        returningArray.push(key.data());
      }
    }
    return returningArray;
  } catch (error) {
    console.log(error);
    return returningArray;
  }
  return returningArray;
}

// done
export async function getGroupByCategory(category, orgId) {
  const returningArray = [];
  const userRole = await getUserRole(orgId);

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
  const userRole = await getUserRole(orgId);
  try {
    if (id) {
      console.log("Hi");
      const groups = await groupCollection
        .where("orgId", "==", orgId)
        .where("description", "==", id)
        .where("roles", "array-contains", userRole)
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
    const userRole = await getUserRole(orgId);

    const curUser = CURRuser;
    if (id) {
      const groupDoc = (
        await groupCollection
          .where("orgId", "==", orgId)
          .where("id", "==", id)
          .get()
      ).docs[0].ref;

      const user = CURRuser;

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
    const curUser = CURRuser;
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
export async function unfollowGroup(id, orgId, userId) {
  try {
    let curUser = CURRuser;
    if (userId) {
      curUser = userId;
    }
    if (id) {
      const groupDoc = (
        await groupCollection
          .where("orgId", "==", orgId)
          .where("id", "==", id)
          .get()
      ).docs[0].ref;

      const userDoc = (await usersCollection.where("id", "==", curUser).get())
        .docs[0].ref;
      const batch = db.batch();
      batch.update(userDoc, {
        [`orgs.${orgId}.followGroups`]: firestore.FieldValue.arrayRemove(id),
      });
      batch.update(groupDoc, {
        followers: firestore.FieldValue.arrayRemove(curUser),
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
  let roleset = [];
  const userRole = await getUserRole(orgId);

  if (userRole == "Student") {
    roleset = ["student", "Faculty/Staff", "Alumni"];
  }
  if (userRole == "Faculty/Staff") {
    roleset = ["Student", "Faculty/Staff", "Alumni", "Parent"];
  }
  if (userRole == "Parent") {
    roleset = ["Parent", "Faculty/Staff", "Alumni"];
  }
  if (userRole == "Alumni") {
    roleset = ["Student", "Faculty/Staff", "Alumni", "Parent"];
  }
  try {
    const authId = CURRuser;
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: "user",
      author: authId,
      roles: roleset,
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
export async function isUserSetup(id) {
  try {
    const docRef = (
      await usersCollection.where("id", "==", id).get()
    ).docs[0].data().accountSetUp;
    return docRef;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function createOrgPost(content, caption, orgId) {
  try {
    const authId = CURRuser;
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
  const user = CURRuser;
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
export async function createCompanyPost(companyId, content, caption, orgId) {
  const user = CURRuser;
  try {
    const docRef = await postCollection.add({
      postId: getUUID(),
      orgId: orgId,
      authorType: "company",
      author: companyId,
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
  const userRole = await getUserRole(orgId);
  const companies = await getCompanyByOwner(CURRuser,orgId)
  console.log(companies);
  
  console.log(userRole);
  const user = CURRuser;
  const returningArray = [];
  try {
    
    for (let index = 0; index < companies.length; index++) {
      const element = companies[index];
      const data = await getPostByCompany(element.companyID,orgId)
      console.log(data);
      
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element);
        
        returningArray.push(element)
      }

    }
  } catch (error) {
    console.log(error);
    
  }
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


export async function getPostByCompany(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groups = await postCollection
        .where("authorType", "==", "company")
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


export async function getGroupPostByAuthor(id, orgId) {
  const returningArray = [];
  try {
    if (id) {
      const groupAuthor = await postCollection
        .where("authorType", "==", "group")
        .where("orgId", "==", orgId)
        .where("writtenBy", "==", id)
        .orderBy("postedAt", "desc")
        .get();
      for (const key of groupAuthor.docs) {
        returningArray.push(key.data());
      }
    }
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

export async function getPostById(id) {
  const returningArray = [];
  try {
    if (id) {
      const querySnapshot = await postCollection
        .where("authorType", "==", "user")
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
  const user = CURRuser;
  const postDoc = (await postCollection.where("postId", "==", id).get()).docs[0]
    .ref;
  postDoc.update({ likes: firestore.FieldValue.arrayUnion(user) });
}

// need to implement
export async function unlikePost(id) {
  const user = CURRuser;
  const postDoc = (await postCollection.where("postId", "==", id).get()).docs[0]
    .ref;
  await postDoc.update({ likes: firestore.FieldValue.arrayRemove(user) });
}
export async function isPostLiked(postId) {
  const user = CURRuser;
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
      commentedAt: id,
      commentId: num,
      author: CURRuser,
      text: text,
      postedAt: firestore.FieldValue.serverTimestamp(),
    },
  });
  await postDoc.update({ commentList: firestore.FieldValue.arrayUnion(num) });
}

// need to implement
export async function deleteComment(postId, commentId) {
  try {
    const postDoc = (
      await postCollection
        .where("postId", "==", postId)
        .orderBy("commentList", "asc")
        .get()
    ).docs[0].ref;
    await postDoc.update({
      commentList: firestore.FieldValue.arrayRemove(commentId),
    });

    postDoc.set(
      {
        comments: {
          [commentId]: firestore.FieldValue.delete(),
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function getComments(postId, orgId) {
  const returningArray = [];
  try {
    const posts = (
      await postCollection
        .where("orgId", "==", orgId)
        .where("postId", "==", postId)
        .get()
    ).docs[0].data();
    const commentData = posts.comments;
    return posts.comments;
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
}
export async function getCommentByUser(user, orgId) {
  const returningArray = [];
  try {
    const posts = (await postCollection.where("orgId", "==", orgId).get()).docs;
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      console.log(element);
      const commentData = element.data().comments;
      const comments = element.data().commentList;
      const commentLength = comments.length;
      for (let index = 0; index < commentLength; index++) {
        const WHYY = [commentData[comments[index]]];
        const author = WHYY[0].author;
        if (author == user) {
          console.log("works");
          returningArray.push(WHYY);
        }
      }
    }
  } catch (error) {
    return returningArray;
  }
  return returningArray;
}
export async function getCommentById(id, orgId) {
  const returningArray = [];
  try {
    const posts = (
      await postCollection
        .where("orgId", "==", orgId)
        .where("commentList", "array-contains", id)
        .get()
    ).docs;
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      console.log(element);
      const commentData = element.data().comments;
      const comments = element.data().commentList;
      const commentLength = comments.length;
      const WHYY = commentData[comments[index]];
      console.log(WHYY);
      returningArray.push(WHYY);
    }
  } catch (error) {
    return returningArray;
  }
  return returningArray;
}
export async function getCommentByKeyword(keyword, orgId) {
  const returningArray = [];
  try {
    const posts = (await postCollection.where("orgId", "==", orgId).get()).docs;
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      console.log(element);
      const commentData = element.data().comments;
      const comments = element.data().commentList;
      const commentLength = comments.length;
      for (let index = 0; index < commentLength; index++) {
        const WHYY = [commentData[comments[index]]];
        let text = "";
        text = WHYY[0].text;
        if (text.includes(keyword)) {
          console.log(text);
          returningArray.push(WHYY);
        }
      }
    }
  } catch (error) {
    return returningArray;
  }
  return returningArray;
}

//_____________________________________

// need to implement
export async function followUser(uid, orgId) {
  try {
    const curUser = CURRuser;
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
    const curUser = CURRuser;
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
      console.log(id);
      const users = await usersCollection.where("id", "==", id).get();
      console.log(users.size);

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
export async function getUsersFollowing(orgId, name, userId) {
  let nameString = "";
  nameString = name;
  const returningArray = [];
  try {
    if (name) {
      const setDocs = (await usersCollection.where("id", "==", userId).get())
        .docs;
      for (let index = 0; index < setDocs.length; index++) {
        const element = setDocs[index].data().orgs[orgId].social.following;
        for (let index = 0; index < element.length; index++) {
          const test = element[index];
          const key = await getUserAttributes(test, orgId);
          const checkingKey = key.fullName;

          if (checkingKey.includes(nameString)) {
            returningArray.push(key);
          }
        }
      }
    } else {
    }
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function finishSignUp() {
  const u1 = CURRuser;
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
  const uuid = getUUID();
  try {
    await eventCollection.add({
      eventId: uuid,
      name: name,
      authorType: type,
      orgId: orgId,
      description: description,
      attendees: [attendees],
      authorId: authorId,
      location: location,
      startTime: startTime,
      endTime: endTime,
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

    const newEventDoc = await eventCollection
      .where("eventId", "==", uuid)
      .get();
    const newEvent = newEventDoc.docs[0].data();

    return newEvent;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEvents(orgId) {
  const user = CURRuser;
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
      returningArray.push(key.data());
    }
    return returningArray;
  } catch (error) {
    console.log(error);
  }
}
export async function getUpcomingGroupEvents(groupId, orgId) {
  const returningArray = [];
  // console.log(new Date().getSeconds);
  try {
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("authorId", "==", groupId)
      //.where("startTime.seconds",'<=', new Date().getSeconds)
      .orderBy("startTime", "asc")
      .get();
    for (const key of events.docs) {
      var d = new Date();
      var seconds = Math.round(d.getTime() / 1000);
      if (key.data().endTime.seconds >= seconds) {
        // console.log(key.data().startTime.seconds);
        returningArray.push(key.data());
      }
    }
    // console.log(returningArray);
    return returningArray;
  } catch (error) {
    console.log(error);
  }
  return returningArray;
}
export async function getPastGroupEvents(groupId, orgId) {
  const returningArray = [];
  // console.log(new Date().getSeconds);
  try {
    const events = await eventCollection
      .where("orgId", "==", orgId)
      .where("authorId", "==", groupId)
      //.where("startTime.seconds",'<=', new Date().getSeconds)
      .orderBy("startTime", "asc")
      .get();
    for (const key of events.docs) {
      var d = new Date();
      var seconds = Math.round(d.getTime() / 1000);
      if (key.data().endTime.seconds <= seconds) {
        // console.log(key.data().startTime.seconds);
        returningArray.push(key.data());
      }
    }
    // console.log(returningArray);
    return returningArray;
  } catch (error) {
    console.log(error);
  }
  return returningArray;
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
  const user = CURRuser;
  const returningArray = [];
  try {
    let groupsArray = [orgId];
    try {
      groupsArray = groupsArray.concat(await getGroupsByUser(user, orgId));
      for (let index = 0; index < groupsArray.length; index++) {
        const element = groupsArray[index];
        const test = await getEventByOrg(element, orgId);
        if (test.length > 0) {
          for (const event of test) {
            returningArray.push(event);
          }
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
export async function filterUsers(roleFilter, conditions, orgId) {
  // console.log(conditions.class);
  const returningArray = [];
  const queryArray = [];
  try {
    queryArray.push(where(`orgs.${orgId}.role`, "==", roleFilter));
    console.log(conditions);

    if (roleFilter == "Faculty/Staff") {
      if (conditions.department) {
        console.log(conditions.class);

        queryArray.push(
          where(`orgs.${orgId}.department`, "==", conditions.department)
        );
      }

      if (conditions.interests.length > 0) {
        console.log(conditions.interests);
        queryArray.push(
          where(`interests`, "array-contains-any", conditions.interests)
        );
      }
      if (conditions.group) {
        console.log(conditions.group);
        queryArray.push(
          where(`orgs.${orgId}.groups`, "array-contains-any", [
            conditions.group,
          ])
        );
      }
    }
    if (roleFilter == "Student") {
      console.log(conditions);
      if (conditions.class) {
        console.log(conditions.class);

        queryArray.push(where(`orgs.${orgId}.class`, "==", conditions.class));
      }

      if (conditions.interests.length > 0) {
        console.log(conditions.interests);
        queryArray.push(
          where(`interests`, "array-contains-any", conditions.interests)
        );
      }
      if (conditions.group) {
        console.log(conditions.group);
        queryArray.push(
          where(`orgs.${orgId}.groups`, "array-contains-any", [
            conditions.group,
          ])
        );
      }
    }

    if (roleFilter == "Alumni") {
      // console.log("He");

      if (conditions.class) {
        // console.log("Class: ",conditions.class);

        queryArray.push(where(`orgs.${orgId}.class`, "==", conditions.class));
      }
      if (conditions.group) {
        // console.log("Class: ",conditions.class);

        queryArray.push(
          where(`orgs.${orgId}.groups`, "array-contains-any", [
            conditions.group,
          ])
        );
      }
      if (conditions.college) {
        // console.log("College: ",conditions.college);
        queryArray.push(
          where(`orgs.${orgId}.college`, "==", conditions.college)
        );
      }
      if (conditions.field) {
        // console.log("Field: ",conditions.field);
        queryArray.push(where(`orgs.${orgId}.field`, "==", conditions.field));
      }
      if (conditions.interests.length > 0) {
        // console.log("Interests: ",conditions.interests);
        queryArray.push(
          where(`interests`, "array-contains-any", conditions.interests)
        );
      }
      if (conditions.state) {
        // console.log("State: ",conditions.state);
        queryArray.push(where(`orgs.${orgId}.state`, "==", conditions.state));
      }
    }
    // console.log(queryArray);
    const q = await query(usersCollection, ...queryArray).get();
    for (let index = 0; index < q.size; index++) {
      const element = q.docs[index].data();
      returningArray.push(element);
    }
  } catch (error) {
    // console.log(error);
    return returningArray;
  }
  console.log(returningArray);
  return returningArray;
}
export async function attendEvent(orgId, eventId) {
  const uID = CURRuser;
  try {
    console.log(
      await (
        await usersCollection.where("id", "==", uID).get()
      ).docs[0].ref.update({ events: firestore.FieldValue.arrayUnion(eventId) })
    );
    console.log(
      await (
        await eventCollection.where("eventId", "==", eventId).get()
      ).docs[0].ref.update({ attendees: firestore.FieldValue.arrayUnion(uID) })
    );
  } catch (error) {
    console.log(error);
  }
}
export async function unAttendEvent(orgId, eventId, optionalUser) {
  let uID = CURRuser;
  if (optionalUser) {
    uID = optionalUser;
  }
  try {
    console.log(eventId);
    const event = await (
      await eventCollection.where("eventId", "==", eventId).get()
    ).docs[0].data();

    if (event.attendees.length == 1 && event.authorType == "user") {
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
    console.log(error);
  }
}
export async function reverifyEmail(email) {
  auth().currentUser.verifyBeforeUpdateEmail(email, {
    handleCodeInApp: true,
  });
}
export async function deleteUserEvent(eventId, orgId) {
  try {
    const eventDoc = (
      await eventCollection.where("eventId", "==", eventId).get()
    ).docs[0];
    const attendees = eventDoc.data().attendees;
    for (let index = 0; index < attendees.length; index++) {
      const element = attendees[index];
      console.log(element);
      unAttendEvent(orgId, eventId, element);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteGroupEvent(groupId, eventId, orgId) {
  console.log(eventId);
  try {
    const eventDoc = (
      await eventCollection.where("eventId", "==", eventId).get()
    ).docs[0];
    const attendees = eventDoc.data().attendees;
    for (let index = 0; index < attendees.length; index++) {
      const element = attendees[index];
      console.log(element);
      unAttendEvent(orgId, eventId, element);
    }
    const groupDoc = (await groupCollection.where("id", "==", groupId).get())
      .docs[0];
    await groupDoc.ref.update({
      events: firestore.FieldValue.arrayRemove(eventId),
    });
    await eventDoc.ref.delete();
  } catch (error) {
    console.log(error);
  }
}
export async function isAttended(eventId, orgId) {
  const user = CURRuser;
  try {
    const eventSnapshot = await eventCollection
      .where("eventId", "==", eventId)
      .where("attendees", "array-contains", user)
      .get();

    if (eventSnapshot.docs.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking attendance:", error);
    return false;
  }
}
export async function editProfile(fullName, bio, interests, image) {
  let imageVar;
  if (image) {
    imageVar = await uploadToFirebase(image);
  } 
  const curUser = CURRuser;
  const docRef = (await usersCollection.where("id", "==", curUser).get())
    .docs[0].ref;
  const batch = firestore().batch();
  batch.update(docRef, { fullName: fullName });
  batch.update(docRef, { bio: bio });
  batch.update(docRef, { interests: interests });
  if (image) {
    batch.update(docRef, { profilePicture: imageVar });
  }
  await batch.commit();
}

export async function addGroupMember(groupId, userId, orgId, makeMod) {
  if (makeMod) {
    await becomeMod(userId, orgId, groupId);
  } else {
    await joinGroup(orgId, groupId, userId);
  }
}
export async function removeGroupMember(orgId, groupId, userId) {
  await leaveGroup(orgId, groupId, userId);
}
export async function editGroup(groupDB, groupInfo) {
  try {
    const curUser = CURRuser;
    const docRefD = (
      await groupCollection.where("id", "==", groupDB.id).get()
    ).docs[0].data();
    const docRef = (await groupCollection.where("id", "==", groupDB.id).get())
      .docs[0].ref;
    const batch = firestore().batch();
    batch.update(docRef, { category: groupInfo.category });
    batch.update(docRef, { description: groupInfo.description });

    if (docRefD.image != groupInfo.image) {
      batch.update(docRef, { image: await uploadToFirebase(groupInfo.image) });
    }
    batch.update(docRef, { name: groupInfo.name });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}
//_____________________________________________________________________
export async function getOrgs() {
  const returningArray = [];
  const userId = CURRuser;
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
export async function getUserOrgs(id) {
  try {
    const set = (
      await usersCollection.where("id", "==", id).get()
    ).docs[0].data().orgIdList;
    if (set) {
      console.log(set);
      return set[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function leaveOrg(orgId) {
  const userId = CURRuser;
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
  const postsGroup = await getPostByAuthor(userId, orgId);
  for (let index = 0; index < postsGroup.length; index++) {
    const element = postsGroup[index];
    await delPost(orgId, element.postId);
  }
  const allPosts = await getPostsByTime(orgId);
  for (let index = 0; index < allPosts.length; index++) {
    const element = allPosts[index];
    if (isPostLiked(element.postId)) {
      unlikePost(element.postId);
    }
  }
  const comments = await getCommentByUser(CURRuser, orgId);
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
export async function uploadToFirebase(uri) {
  const uuid = getUUID();
  console.log(uuid);
  const reference = storage().ref(`postImages/${uuid}`);
  await reference.putFile(uri);
  console.log(await reference.getDownloadURL());
  return await reference.getDownloadURL();
}
export async function getDownloadURL(post) {
  console.log("====================================");
  console.log(post);
  console.log("====================================");
  const postObj = (
    await postCollection.where("postId", "==", post).get()
  ).docs[0].data();
  const reference = postObj.content;

  return reference;
}
// == MESSAGING ==

export async function getCleanName(user) {
  if (user == auth().currentUser.uid) {
    return "You";
  }
  var userRef = await usersCollection.where("id", "==", user).get();
  return userRef.empty ? "Deleted" : userRef.docs[0].data().fullName;
}

export async function getUserChatList() {
  var userData = (
    await usersCollection.where("id", "==", CURRuser).get()
  ).docs[0].data();

  return userData.chats || [];
}

export async function getChatPreview(chatID, reloadFunc) {
  var chatRef = await messagesCollection.where("id", "==", chatID).get();
  if (chatRef.empty) return null;
  var chatDoc = chatRef.docs[0];
  var chat = chatDoc.data();

  for (var i in chat.users) chat.users[i] = await getCleanName(chat.users[i]);
  var lastMsgRef = await chatDoc.ref
    .collection("Messages")
    .orderBy("timestamp", "desc")
    .limit(1)
    .get();

  chat.lastMsg = lastMsgRef.docs[0].data();
  chat.lastMsg.author = await getCleanName(chat.lastMsg.author);

  // onSnapshot for lastMsg
  chat.unsubscribe = chatDoc.ref
    .collection("Messages")
    .orderBy("timestamp", "desc")
    .limit(1)
    .onSnapshot(async (snapshot) => {
      if (snapshot.metadata.hasPendingWrites) return;

      var msgDoc = snapshot.docChanges()[0].doc;
      var msg = msgDoc.data();
      if (chat.lastMsg.id === msg.id) return;

      msg.author = await getCleanName(msg.author);

      reloadFunc(chat.id, msg);
    });

  return chat;
}

export async function getChatPreviews(chatList, reloadFunc) {
  var chats = [];

  for (var chatID of chatList) {
    var chat = await getChatPreview(chatID, reloadFunc);
    if (chat) chats.push(chat);
  }

  return chats;
}

export async function getChat(chatID, addMessage) {
  var chatRef = await messagesCollection.where("id", "==", chatID).get();
  if (chatRef.empty) return null;
  var chatDoc = chatRef.docs[0];
  var chat = chatDoc.data();

  // get user details rather than just id
  chat.userIDs = JSON.parse(JSON.stringify(chat.users)); // this must be a deep copy
  for (var i in chat.users) chat.users[i] = await getCleanName(chat.users[i]);

  // set up onSnapshot
  chat.messages = [];
  var messagesRef = await chatDoc.ref
    .collection("Messages")
    .orderBy("timestamp", "asc")
    .get();
  chat.initMessages = messagesRef.docs.length;

  chat.unsubscribe = chatDoc.ref
    .collection("Messages")
    .orderBy("timestamp", "asc")
    .onSnapshot(async (snapshot) => {
      if (snapshot.metadata.hasPendingWrites) return;

      for (var msgDoc of snapshot.docChanges()) {
        var msg = msgDoc.doc.data();
        if (chat.messages.includes(msg)) continue;

        msg.author = await getCleanName(msg.author);
        addMessage(msg);
      }
    });

  return chat;
}

export async function sendChatMessage(chatID, msg) {
  // use only if chat already exists
  var chatRef = await messagesCollection.where("id", "==", chatID).get();
  if (chatRef.empty) return false;
  var chatDoc = chatRef.docs[0];

  var message = {
    author: auth().currentUser.uid,
    id: getUUID(),
    msg: msg,
    timestamp: firestore.FieldValue.serverTimestamp(),
  };

  var messageRef = chatDoc.ref.collection("Messages").doc(message.id);
  await messageRef.set(message);

  return message;
}

// ALL messaging code above this point is clean and reviewed... probably 👍

var sendMessageUserCache = [];

export async function getUserNameMatches(name) {
  /*
    User will type in the beginning of a name (either first or last) and this function will return the closest match
  */

  // get all users
  if (sendMessageUserCache.length === 0) {
    var usersRef = await usersCollection.get();
    sendMessageUserCache = usersRef.docs.map((doc) => doc.data());
    // sort alphabetically
    sendMessageUserCache.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  // get closest match
  var matches = [];
  for (var user of sendMessageUserCache) {
    if (user.fullName.toLowerCase().includes(name.toLowerCase()))
      matches.push(user);
  }

  return matches;
}

export async function createChat(users, message) {
  /*
    conditions that must be met:
    - there must be more than one user
    - message must not be empty
    - all users must exist
    - a chat with those users must not already exist (only check curernt user's chatlist, as they can only make one containing themselves)
    - if it's a DM, students can only communicate with other students
  */
  console.log("  == START createChat ==  ");
  console.log(`Message: "${message}", Users len: ${users.length}`);

  // there must be more than one user
  if (users.length < 2) return "You must have at least 2 users.";
  // message must not be empty
  if (message.trim().length == 0) return "Message must not be empty.";

  // all users must exist
  // users = users.map(val => { return val.id });
  for (var user of users) {
    // check if user with same ID exists in cache
    if (!sendMessageUserCache.find((val) => val.id === user.id))
      return "One or more users on the list do not exist.";
  }

  // a chat containing those users must not already exist
  var userChatList = await getUserChatList();
  for (var chatID of userChatList) {
    var chatRef = await messagesCollection.where("id", "==", chatID).get();
    if (chatRef.empty) continue;
    var chat = chatRef.docs[0].data();

    // check if chat contains all users
    var users1 = users
      .map((val) => val.id)
      .slice()
      .sort();
    var users2 = chat.users.slice().sort();
    if (users1.join() == users2.join())
      return "A chat with these users already exists.";
  }

  // if it's a DM, students can only communicate with other students (use user.role)
  if (users.length == 2) {
    //// this will have to be figured out later
  }

  /*
    All good, create a new chat with the following structure and take the user there

    /Messages/<auto id>:
      id: <random uuid>
      type: <DMs if 1 person, Groups if 2>
      users: [<all user IDs>]

      Messages (sub-collection):
        {new uuid}:
          author: <user id>
          id: {same uuid as chat name}
          msg: <msg>
          timestamp: <server timestamp>
  */

  var chatID = getUUID();
  await messagesCollection.add({
    id: chatID,
    type: users.length == 2 ? "DMs" : "Groups",
    users: users.map((val) => val.id),
  });
  // add to each user's chatlist
  for (var user of users) {
    var userRef = await usersCollection.where("id", "==", user.id).get();

    userRef.docs[0].ref.update({
      chats: firestore.FieldValue.arrayUnion(chatID),
    });
  }

  // add the new subcollection
  await sendChatMessage(chatID, message);

  console.log("  == END createChat ==  ");
  return {
    id: chatID,
  };
}
