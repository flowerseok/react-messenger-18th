// src/pages/UserProfile.tsx
import React from 'react';
import styled from 'styled-components';
import StatusBar from '../components/StatusBar';
import { ReactComponent as InstagramIcon } from '../assets/images/Instagram.svg';  // Assuming you have this icon
import { ReactComponent as GitHubIcon } from '../assets/images/Github.svg';        // Assuming you have this icon
import { ReactComponent as ProfileIcon } from '../assets/images/Profile-Icon.svg';        // Assuming you have this icon

const UserProfile: React.FC = () => {
  return (
    
    <ProfileContainer>
        <StatusBar />
      <ProfileDetails>
        <ProfileImage />  {/* Placeholder for user image */}
        <UserName>최유선</UserName>
        <UserEmail>yoonseor724@gmail.com</UserEmail>
      </ProfileDetails>

      <SocialLinks>
        <LinkItem>
          <InstagramIcon />
          <span>Instagram</span>
        </LinkItem>
        <LinkItem>
          <GitHubIcon />
          <span>GitHub</span>
        </LinkItem>
      </SocialLinks>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  max-width: 300px;  // Adjust based on your requirements
  margin: 20px auto;

`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.span`
  font-size: 16px;
  color: #101010;
  font-weight: bold;
`;

const UserEmail = styled.span`
  font-size: 14px;
  color: #909090;
`;

const ProfileImage = styled.div`
  width: 50px;  // Adjust based on your requirements
  height: 50px;
  border-radius: 50%;
  background-color: #f1f1f1;  // Placeholder color
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #101010;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
