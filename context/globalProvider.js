import React, {createContext, useContext, useEffect, useState} from "react";
import auth from '@react-native-firebase/auth'
import firestore, {
    Filter,
    Timestamp,
    query,
} from "@react-native-firebase/firestore";
import { getUserOrgs, initializeVars, isUserSetup } from "../lib/useFirebase";
const GlobalContext = createContext()
const db = firestore();
// const recheck = auth().currentUser.reload()

const usersCollection = firestore().collection("User");
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider =  ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [needsReload, setNeedsReload] = useState(false);
    const [orgId, setOrgId] = useState();
    const [isSetup, setIsSetUp] = useState(false);




    async function onAuthStateChanged(user) {
        setLoading(false)
        setUser(user);
        console.log(user,"WEE");
        if (user) {
            setOrgId(await getUserOrgs(user.uid))
            setIsSetUp(await isUserSetup(user.uid))
        }


        if (initializing) setInitializing(false);
        if (user) {
            setIsVerified(auth().currentUser.emailVerified)
            setIsLogged(true)
            setLoading(false)
            setIsSetUp(await isUserSetup(user.uid))
            setOrgId(await getUserOrgs(user.uid))
            initializeVars()

            if (user.emailVerified) {
                setIsVerified(true)
            } else {
                setIsLogged(true)
                setIsVerified(false)
            }        
        }
        else{
            console.log("MEEMMEME");
            setIsVerified(false)
            setIsLogged(false)
            setLoading(false)
            setUser(user)
            setOrgId(null)
        }
    }
    useEffect(() => {
        
        const subscriber = auth().onUserChanged(onAuthStateChanged);

        return subscriber; // unsubscribe on unmount
    }, []);


    return (
        <GlobalContext.Provider
    value={{
        orgId,
        setOrgId,
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        isVerified,
        setIsVerified,
        needsReload,
        setNeedsReload,
        isSetup,
        setIsSetUp
    }}
    >
    {children}
    </GlobalContext.Provider>
);
}

export default GlobalProvider;