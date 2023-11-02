import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import usersData from '../assets/datas/dummy.json'; 
import StatusBar from '../components/StatusBar';
import { ReactComponent as ProfileIcon } from '../assets/images/Profile-Icon.svg';
import IndicateBar from '../components/IndicateBar';
import { Link } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import UserSearchBar from '../components/UserSearchBar';

export interface Friend {
  id: number;
  name: string;
  profileImage: string;
}

interface FriendsListProps {
  onSelectFriend: (friend: Friend) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ onSelectFriend }) => {
  const [users, setUsers] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setUsers(usersData.users);
  }, []);

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <FriendListContainer>
      <StatusBar />
      <ChatHeader chatName="친구" />
      <UserSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FriendsWrapper>
        {filteredUsers.map((friend, index) => (
          <StyledLink to={`/chat/${friend.id}`} key={friend.id}>
            {index === 0 ? (
              <MyItem onClick={() => onSelectFriend(friend)}>
                {friend.profileImage === 'ProfileIcon' ? <ProfileImage as={ProfileIcon} /> : <ProfileImageStyled src={friend.profileImage} />}
                {friend.name}
              </MyItem>
            ) : (
              <FriendItem onClick={() => onSelectFriend(friend)}>
                {friend.profileImage === 'ProfileIcon' ? <ProfileImage as={ProfileIcon} /> : <ProfileImageStyled src={friend.profileImage} />}
                {friend.name}
              </FriendItem>
            )}
          </StyledLink>
        ))}
      </FriendsWrapper>
      <IndicateBar activeIcon="friends" />
    </FriendListContainer>
  );
};

const MyItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 0px;
  cursor: pointer;
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
`;
const FriendsWrapper = styled.div`
  flex-grow: 1; 
  overflow-y: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;  
  &:visited {
    color: inherit; 
`;

const FriendListContainer = styled.div`
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


const FriendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
  height: 40px;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;

const ProfileImageStyled = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;


export default FriendsList;
