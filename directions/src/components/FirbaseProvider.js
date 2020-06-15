import React, { useEffect, useState } from 'react';
import { UserContext } from '../helpers/contexts';
import { auth, firestore } from '../helpers/firebase';


export const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);

   

    useEffect(() => {
        auth.onAuthStateChanged(({user}) => {
            setUser({user});
          });
    }, []);

    return (
        <UserContext.Provider value={{auth, firestore, user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};