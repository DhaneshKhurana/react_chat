import { createContext, useContext, useEffect, useState } from 'react';
import { fireAuth, fireDB } from '../../data/firebase';
import { onValue, ref } from 'firebase/database';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const authUnsub = fireAuth.onAuthStateChanged(authObj => {
      if (authObj) {
        try {
          const userRef = ref(fireDB, `/users/${authObj.uid}`);
          onValue(userRef, snap => {
            const userInfo = snap.val();
            const data = {
              ...userInfo,
              uid: authObj.uid,
              email: authObj.email,
            };
            console.log('ProfileContext:: data recvd::', data);
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

    return authUnsub;
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
