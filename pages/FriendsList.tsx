import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import usersData from '../assets/datas/dummy.json'; 
import { ReactComponent as ProfileIcon } from '../assets/images/Profile-Icon.svg';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    // 사용자 데이터를 설정
    setUsers(usersData.users);
  }, []);

  return (
    <FriendListContainer>
      {users.map((friend) => (
        <Link to={`/chat/${friend.id}`} key={friend.id}>
          <FriendItem onClick={() => onSelectFriend(friend)}>
            {friend.profileImage === 'ProfileIcon' ? <ProfileImage as={ProfileIcon} /> : <ProfileImageStyled src={friend.profileImage} />}
            {friend.name}
          </FriendItem>
        </Link>
      ))}
    </FriendListContainer>
  );
};

const FriendListContainer = styled.div`
  width: 30%; // Adjust based on preference
  padding: 20px;
  overflow-y: auto;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
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
