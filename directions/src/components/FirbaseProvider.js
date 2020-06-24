import React, { useEffect, useState } from 'react';
import { UserContext } from '../helpers/contexts';
import { auth, firestore, getUser } from '../helpers/api';

export const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);

   

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                getUser(user.email)
                    .then(res => {
                        if (res.data.code === 200) {
                            setUser(res.data.data);
                        }
                    })
                    .catch(() => {
                        return;
                    }); 
            }
          });
    }, []);

    return (
        <UserContext.Provider value={{auth, firestore, user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};