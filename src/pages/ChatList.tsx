import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import usersData from '../assets/datas/dummy.json';
import StatusBar from '../components/StatusBar';
import IndicateBar from '../components/IndicateBar';
import { ReactComponent as ProfileIcon } from '../assets/images/Profile-Icon.svg';
import ChatHeader from '../components/ChatHeader';
import UserSearchBar from '../components/UserSearchBar';

interface ChatSummary {
  friendId: string;
  lastMessage: string;
  timestamp: string;
}

const ChatList: React.FC = () => {
  const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('chatMessages_'));
    const summaries = keys.map(key => {
      const messages = JSON.parse(localStorage.getItem(key) || '[]');
      const lastMessage = messages[messages.length - 1];
      return {
        friendId: key.split('_')[1],
        lastMessage: lastMessage?.content || '',
        timestamp: lastMessage?.timestamp || '',
      };
    })
    .filter(summary => summary.lastMessage);
    summaries.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    setChatSummaries(summaries);
  }, []);


  const getUserByFriendId = (friendId: string) => {
    return usersData.users.find(user => user.id.toString() === friendId);
  };

  const filteredSummaries = chatSummaries.filter(summary => {
    const user = getUserByFriendId(summary.friendId);
    return user?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <ChatListContainer>
      <StatusBar />
      <ChatHeader chatName="채팅"/>
      <UserSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ChatSummariesWrapper>
        {filteredSummaries.map((summary) => {
          const user = getUserByFriendId(summary.friendId);
          return (
            <StyledLink to={`/chat/${summary.friendId}`} key={summary.friendId}>
              <ChatListItem>
                {user?.profileImage === 'ProfileIcon' && <ProfileImageIcon />}
                <TextContent>
                  <UserName>{user?.name}</UserName>
                  <Message>{summary.lastMessage}</Message>
                </TextContent>
                <Timestamp>{summary.timestamp}</Timestamp>
              </ChatListItem>
            </StyledLink>
          );
        })}
      </ChatSummariesWrapper>
      <IndicateBar activeIcon="chat" />
    </ChatListContainer>
    
  );
};

const ChatSummariesWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const Message = styled.div`
  color: #606060;
  font-size: 12px;
  line-height: 15px;
  word-wrap: break-word;
`;
const UserName = styled.div`
  color: #101010;
  font-size: 13px;
  font-weight: 600;
  line-height: 13px;
  word-wrap: break-word;
`;

const ProfileImageIcon = styled(ProfileIcon)`
  width: 40px; 
  height: 40px;
  border-radius: 50%;
  margin-right: 10px; 
`;

const ChatListContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 50vh;  
max-height: 100vh;
margin: 0px auto;
background-color: #ffffff;
border-radius: 8px;
padding: 12px;
min-height: 100vh;
overflow-y: auto;
`;

const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  padding: 10px 0;
  cursor: pointer;
`;

const Timestamp = styled.div`
  font-size: 10px;
  color: #CCCCCC;
  align-self: flex-end;
  line-height: 10px;
  margin-bottom: 20px;
`;

export default ChatList;
