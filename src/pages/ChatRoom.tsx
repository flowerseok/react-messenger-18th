import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import usersData from '../assets/datas/dummy.json';
import StatusBar from '../components/StatusBar';
import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from '../assets/images/Profile-Icon.svg';
import { useParams } from 'react-router-dom';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  displayTime: boolean;
}
interface ChatRoomParams {
  friendId: string;
  [key: string]: string | undefined;
}

const ChatRoom: React.FC = () => {

  const getLocalStorageKey = () => {
    return `chatMessages_${friendId}`;
  }  

  const { friendId } = useParams<ChatRoomParams>();
  const selectedFriend = usersData.users.find(user => user.id.toString() === friendId) || usersData.users[0];
  const [currentUser, setCurrentUser] = useState(usersData.users[0]);
  
  const savedMessages = JSON.parse(localStorage.getItem(getLocalStorageKey()) || '[]');
  const friendMessages = savedMessages.filter((msg: Message) => msg.sender === selectedFriend.name || msg.sender === currentUser.name);
  const [messages, setMessages] = useState<Message[]>(friendMessages);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(messages));
  }, [messages, friendId]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      sender: currentUser.name,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
      displayTime: true
    };

    if (messages.length > 0) {
      const lastSenderMessage = messages[messages.length - 1];
      if (lastSenderMessage.sender === newMessage.sender) {
        const lastMessageDate = new Date(lastSenderMessage.id);
        const newMessageDate = new Date(newMessage.id);
        if (lastMessageDate.getMinutes() === newMessageDate.getMinutes()) {
          lastSenderMessage.displayTime = false;
        }
      }
    }

    setMessages(prev => [...prev, newMessage]);
  };

  const handleSwitchPosition = () => {
    setCurrentUser(prev => (prev.name === usersData.users[0].name ? selectedFriend : usersData.users[0]));
  };

  const oppositeUser = currentUser.name === usersData.users[0].name ? selectedFriend : usersData.users[0];

  return (
    <ChatRoomContainer>
      <StatusBar />
      <ChatHeader chatName={oppositeUser.name} onSwitchPosition={handleSwitchPosition} />
      <MessageList ref={messagesEndRef}>
        {messages.map((msg, index) => {
          const shouldDisplayProfile = index === 0 || messages[index - 1].timestamp !== msg.timestamp || messages[index - 1].sender !== msg.sender;
          const isCurrentUser = msg.sender === currentUser.name;

          return (
            <MessageWrapper key={msg.id} sender={msg.sender} currentUser={currentUser.name}>
              {!isCurrentUser && shouldDisplayProfile && (
                <ProfileContainer>
                  <ProfileImage as={ProfileIcon} />
                </ProfileContainer>
              )}
              <MessageBubble 
                sender={msg.sender} 
                currentUser={currentUser.name} 
                shouldDisplayProfile={shouldDisplayProfile}
              >
                <span>{msg.content}</span>
              </MessageBubble>
              {msg.displayTime && <Time>{msg.timestamp}</Time>}
            </MessageWrapper>
          );
        })}
      </MessageList>
      <ChatInput onSend={handleSendMessage} />
    </ChatRoomContainer>
  );
};

export default ChatRoom;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const MessageList = styled.div`
  overflow-y: auto;
  flex: 1;
  margin: 10px 0;
  scrollbar-width: none;
`;

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vh;
  max-height: 100vh;
  margin: 0px auto;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  min-height: 100vh;
`;

const MessageWrapper = styled.div<{ sender: string; currentUser: string }>`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.sender === props.currentUser ? "row-reverse" : "row")};
  gap: 4px;
  margin: 4px 0;
  max-width: 100%;
  align-self: ${props => (props.sender === props.currentUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div<{ sender: string; currentUser: string; shouldDisplayProfile: boolean }>`
  padding: 10px 16px;
  border-radius: 20px;
  background-color: ${props => (props.sender === props.currentUser ? "#101010" : "#F1F1F1")};
  color: ${props => (props.sender === props.currentUser ? "#F1F1F1" : "#101010")};
  margin-left: ${props => (!props.shouldDisplayProfile && props.sender !== props.currentUser) ? "36px" : "0"};
  font-size: 14px;
  font-weight: 400;
  line-height: 19.60px;
  box-sizing: border-box;
  max-width: fit-content;
  word-break: break-all;
  white-space: pre-wrap;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const Time = styled.div`
  color: #909090;
  font-size: 7px;
  font-weight: 500;
  line-height: 10px;
  margin-top: 30px;
`;