import React, {createContext, useContext, useEffect, useState} from "react";
import auth from '@react-native-firebase/auth'
const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [orgId, setOrgId] = useState(20030049);


    

    function onAuthStateChanged(user) {
        setLoading(false)
        setUser(user);
        if (initializing) setInitializing(false);
        if (user) {
            setIsVerified(true)
            setIsLogged(true)
            setLoading(false)
            if (user.emailVerified) {
                setIsVerified(true)
            } else {
                setIsLogged(true)
                setIsVerified(false)
            }        
        }
        else{
            setIsVerified(false)
            setIsLogged(false)
            setLoading(false)
            setUser(user)
        }
      }
    
      useEffect(() => {
        console.log("WHYY");
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
            setIsVerified
        }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;