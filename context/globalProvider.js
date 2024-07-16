import React, {createContext, useContext, useEffect, useState} from "react";
import auth from '@react-native-firebase/auth'
import firestore, {
    Filter,
    Timestamp,
    query,
} from "@react-native-firebase/firestore";
const GlobalContext = createContext()
const db = firestore();

const usersCollection = firestore().collection("User");
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider =  ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [needsReload, setNeedsReload] = useState(false);
    const [orgId, setOrgId] = useState(20030049);




    async function onAuthStateChanged(user) {

        setLoading(false)
        setUser(user);

        if (initializing) setInitializing(false);
        if (user) {
            setIsVerified(true)
            setIsLogged(true)
            setLoading(false)
            setOrgId(20030049)

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
    }}
    >
    {children}
    </GlobalContext.Provider>
);
}

export default GlobalProvider;