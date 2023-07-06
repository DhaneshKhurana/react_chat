import { createContext, useContext, useEffect, useState } from 'react';
import { fireAuth, fireDB } from '../../firebase/firebase';
import { onValue, ref, refFromURL } from 'firebase/database';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const authUnsub = fireAuth.onAuthStateChanged(authObj => {
      console.log('Auth Object', authObj);
      if (authObj) {
        try {
          const userRef = ref(fireDB, `/users/${authObj.uid}`);
          console.log('userRef::', userRef);
          onValue(userRef, snap => {
            const { name, createdAt } = snap.val();
            const data = {
              name,
              createdAt,
              uid: authObj.uid,
              email: authObj.email,
            };
            console.log('data recvd::', data);
            setProfile(data);
            setLoading(false);
          });
        } catch (error) {
          console.log('Error occured:: ', error);
        }
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
