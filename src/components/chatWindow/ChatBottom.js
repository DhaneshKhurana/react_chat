import { useContextSelector } from 'use-context-selector';
import { CurrentRoomContext } from '../../logic/contexts/CurrentRoomContext';
import { InputGroup } from 'rsuite';
import { useState } from 'react';
import { useCallback } from 'react';
import { Icon } from '@rsuite/icons';
import { IoSend } from 'react-icons/io5';
import { serverTimestamp } from 'firebase/database';
import { useProfile } from '../../logic/contexts/ProfileContext';
import { sendMessage } from '../../data/dbController';

function assembleMessage(userProfile) {
  return {
    author: {
      name: userProfile.name,
      uid: userProfile.uid,
      createdAt: userProfile.createdAt,
      ...(userProfile.avatar ? { avatar: userProfile.avatar } : {}),
    },
    createdAt: serverTimestamp(),
    likeCount: 0,
  };
}

export default function ChatBottom() {
  const chatRoomId = useContextSelector(
    CurrentRoomContext,
    room => room.roomKey
  );
  const [msg, setMsg] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { profile } = useProfile();
  console.log('ChatBottom:: Profile Received', profile);
  const onMessageChange = useCallback(ev => {
    setMsg(ev.target.value);
  }, []);

  const onSendMessage = () => {
    console.log('The message being sent is ::', msg);
    setLoading(true);
    if (msg.trim() === '') return;

    const msgToStore = assembleMessage(profile);
    msgToStore.text = msg;
    sendMessage(msgToStore, chatRoomId);

    setMsg('');
    setLoading(false);
  };

  const onEnterPressed = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendMessage();
    }
  };

  return (
    <InputGroup>
      <input
        placeholder="Enter a new message..."
        value={msg}
        onInput={onMessageChange}
        onKeyDown={onEnterPressed}
      />
      <InputGroup.Button
        appearance="primary"
        color="blue"
        block
        onClick={onSendMessage}
        disabled={isLoading}
      >
        <Icon as={IoSend} color="blue"></Icon>
      </InputGroup.Button>
    </InputGroup>
  );
}
