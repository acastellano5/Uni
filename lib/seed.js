import firestore from '@react-native-firebase/firestore'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { createEvent, getUserByGroup, joinGroup } from './useFirebase'
let groupIdArray=[]
let userIdArray =[]
const db = firestore()
const usersCollection = db.collection('User')
const groupCollection = db.collection('Group')
const eventCollection = db.collection('Event')
const postCollection = db.collection('Post')

function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const piece = (Math.random() * 16) | 0;
        const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
        return elem.toString(16);
    });
}
export async function runSeed() {
    groupIdArray = []
    userIdArray = []
    seedGroups().then(()=>{
        seedUsers().then(()=>{
            seedEvents()
        })
    })
}
export async function seedGroups() {
    let uuid = getUUID()
    for (let index = 0; index < 5; index++) {
        groupCollection.add({
            id: uuid,
            orgId: 20030049,
            name: "Bobs Burgers Club",
            category: "Athletic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg",
            events: [],
            moderators: [],
            members: [],
            following: [],
            isOrgCertified: true
        })
        groupIdArray.push(uuid)

        uuid = getUUID()  
    }
    for (let index = 0; index < 5; index++) {
        groupCollection.add({
            id: uuid,
            orgId: 20030049,
            name: "Bobs Burgers Club",
            category: "Academic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg",
            events: [],
            moderators: [],
            members: [],
            following: [],
            isOrgCertified: true
        })
        groupIdArray.push(uuid)

        uuid = getUUID()  
    }
}
export async function seedEvents() {
    for (let index = 0; index < (groupIdArray.length); index++) {
        const element = groupIdArray[index];
        const attendees = await getUserByGroup(element,20030049)
        if (attendees.length>0) {
            createEvent("group",20030049,"Watch Party","Salesianum",'2023-01-04', '2023-01-05',attendees,groupIdArray[index],"We go and Watch")  
        }
    }
    for (let index = 0; index < (groupIdArray.length); index++) {
        const element = userIdArray[index];
        createEvent("user",20030049,"Watch Party","Salesianum",'2023-01-04', '2023-01-05',element,element,"We go and Watch")  
    }
}
export async function seedUsers() {
    let uuid = getUUID()
    for (let index = 0; index < 10; index++) {
        usersCollection.add({
            id: uuid,
            orgId: 20030049,
            gender: "Male",
            email: 'scott@Notification.botty',
            bio: "I came from the stretz",
            interests: ["Hiking", "Biking", "Coding"],
            profilePicture: "",
            orgList: [20030049],
            orgs:  {20030049:
                {
                    email: "dallas@salesianum.org",
                    id: 20030049,
                    role: "Student",
                    class: [],
                    groups: [],
                    followGroups: [],
                    //alumni
                    state: "N/A",
                    jobField: "N/A",
                    college: "N/A",
                    //faculty/staff
                    dept: "N/A",
                    social: {
                        followers: [],
                        following: []
                    }
                }
            }
        })
        userIdArray.push(uuid)
        console.log(groupIdArray.length);
        let num =  Math.floor(Math.random() * groupIdArray.length);
        console.log(num);
        console.log(groupIdArray[2]);
        console.log(uuid);
        await joinGroup(uuid,20030049,groupIdArray[num])
        console.log("Run");

        uuid = getUUID()  
    }
}