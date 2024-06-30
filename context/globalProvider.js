import React, {createContext, useContext, useEffect, useState} from "react";

import {getCurrentUser} from "../lib/firebase";
const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [orgId, setOrgId] = useState(20030049);


    

    useEffect(() => {
        getCurrentUser().then((res) => {
            //console.log(res);

            if (res) {
                

                //console.log(res);
                if (!res.emailVerified) {
                    setIsLogged(false)
                    setIsVerified(false)
                    setUser(res)

                }
                else
                {
                    setIsLogged(true)
                    setIsVerified(true)
                    setUser(res)
                    /*console.log('====================================');
                    console.log("ATT");
                    console.log('====================================');
                    */
                }
                
            } 
            
            else {
                setIsLogged(false)
                setUser(res)
            }
        }).catch((error)=> {
            console.log(error);
        }).finally(()=> {
            setLoading(false);
        })
    })
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