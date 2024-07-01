import firestore  from "@react-native-firebase/firestore";
import { sendPost } from "./useFirebase";
const db = firestore()
const groupDB = db.collection('Group')
function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const piece = (Math.random() * 16) | 0;
        const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
        return elem.toString(16);
    });
  }

export function seedGroups() {
    function getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const piece = (Math.random() * 16) | 0;
            const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
            return elem.toString(16);
        });
      }
    try {
        let UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Athletic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Athletic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Athletic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Athletic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Arts",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Arts",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Arts",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Arts",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Technology",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Technology",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Technology",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Technology",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Technology",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg",
            events: {"0":{eventId: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Service",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Academic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Academic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Academic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Academic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        UUID = getUUID()
        groupDB.add({
            orgId: 20030049,
            id: UUID,
            name: "Bobs Burgers Club",
            category: "Academic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: 'https://m.media-amazon.com/images/M/MV5BOWQ2ZjAwYTItZmZiNS00OWQ3LTk5OTEtNjJlMjJmZGRjMGY1XkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_.jpg',
            events: {"0":{id: 12012821},
                
            },
            moderators: '',
            members: '',          
        })
        
    } catch (error) {
        
    }
}
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
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    UUID = getUUID()
    firestore().collection('User').add({
        uid: UUID,
        personalEmail: "JOHNNNN",
        orgs: {20030049:
            {
            id: 20030049,
            email: "DAVEEE",
            secStatus: "Student",
            groups: [],
            classes: [],
            social: {
                following: [],
                followers: []
            }
            }
        },
        interests: ["Bowling", "Swimming", "Hiking"],
        firstName: "Jerry",
        lastName: "Smith",
    })
    sendPost("user", UUID, "", "Lorum Be Ipsuming")
    } catch (error) {
        console.log(error);
    }
    
}