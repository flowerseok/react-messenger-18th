import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import usersData from '../assets/datas/dummy.json';
import StatusBar from './StatusBar'
import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from '../assets/images/Profile-Icon.svg';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  displayTime: boolean;
}

const ChatRoom: React.FC = () => {

  const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
  const [messages, setMessages] = useState<Message[]>(savedMessages);

  const [currentUser, setCurrentUser] = useState(usersData.users[0]);//초기엔 유저 1로 세팅
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
//스크롤바 언제나 하단 고정
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  // localStorage.clear();
//메시지별 id에 시간을 부여해, 기존의 시간과 같으면 시간표시와 프로필 사진을 보이지 않게 하고, 시간이 바뀔 때만 시간표시와 프로필 사진 출력
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
    setCurrentUser(prev => (prev.name === usersData.users[0].name ? usersData.users[1] : usersData.users[0]));
  };
  const oppositeUser = currentUser.name === usersData.users[0].name ? usersData.users[1] : usersData.users[0];
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
      {/* <div>
        <Username>{msg.sender}</Username>
      </div> */}
      <ProfileImage as={ProfileIcon} />
    </ProfileContainer>
  )}
<MessageBubble 
  sender={msg.sender} 
  currentUser={currentUser.name} 
  shouldDisplayProfile={shouldDisplayProfile}>
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
  height: 60vh; 
  scrollbar-width: none;
`;

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  max-width: 50vh;
  max-height: 90vh;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 5px;
  min-height: 90vh;
`;

const MessageWrapper = styled.div<{ sender: string; currentUser: string }>`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.sender === props.currentUser ? "row-reverse" : "row")};
  gap: 12px;
  margin: 12px 0;
  max-width: 100%;
  align-self: ${props => (props.sender === props.currentUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div<{ sender: string; currentUser: string; shouldDisplayProfile: boolean; }>`
  padding: 10px 16px;
  border-radius: 20px;
  background-color: ${props => (props.sender === props.currentUser ? "#101010" : "#F1F1F1")};
  color: ${props => (props.sender === props.currentUser ? "#F1F1F1" : "#101010")};
  margin-left: ${props => (!props.shouldDisplayProfile && props.sender !== props.currentUser) ? "44px" : "0"};
  font-size: 14px;
  font-weight: 400;
  line-height: 19.60px;
  box-sizing: border-box;
  max-width: fit-content;
  word-break: break-all;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const Time = styled.div`
  color: #909090;
  font-size: 7px;
  font-weight: 500;
  line-height: 10px;
  margin-top: 12px;
`;
