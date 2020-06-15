import React, { useEffect, useState } from 'react';
import { UserContext } from '../helpers/contexts';
import { auth, firestore } from '../helpers/api';


export const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);

   

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log('checking: ', user);
            
            setUser({user});
          });
    }, []);

    return (
        <UserContext.Provider value={{auth, firestore, user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};