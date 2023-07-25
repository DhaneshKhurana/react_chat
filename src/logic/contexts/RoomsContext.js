import { off, onValue } from 'firebase/database';
import { createContext, useEffect, useState } from 'react';
import { getRoomsRef } from '../../data/dbController';
import { getObjectArrayFromData } from '../helper';

export const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const roomsRef = getRoomsRef();
    onValue(roomsRef, snapshot => {
      console.log('Chatroom list received ', snapshot.val());
      setRooms(getObjectArrayFromData(snapshot.val()));
    });

    return () => {
      off(roomsRef);
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

//export const useChatRooms = () => useContext(RoomsContext);
