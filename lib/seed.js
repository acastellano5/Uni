import firestore  from "@react-native-firebase/firestore";
import { sendPost } from "./firebase";
export function seedDatabase() {
    function getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const piece = (Math.random() * 16) | 0;
          const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
          return elem.toString(16);
      });
    }
    try {
        console.log("HMMM");       
    let UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
    firestore().collection('User').add({
        
        uid: UUID,
        orgs: [{
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
        }],
        following: [],
        followers: [],
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("SupBro", "", UUID)
    UUID = getUUID()
   
    } catch (error) {
        console.log(error);
    }
    
}