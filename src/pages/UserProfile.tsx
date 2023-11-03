import React from 'react';
import styled from 'styled-components';
import StatusBar from '../components/StatusBar';
import IndicateBar from '../components/IndicateBar';
import { ReactComponent as ProfileIconSrc } from '../assets/images/Profile-Icon.svg';
import { ReactComponent as LinkIconSrc } from '../assets/images/Link.svg';
import ChatHeader from '../components/ChatHeader';
import instagramIconSrc from '../assets/images/Instagram1.svg';
import githubIconSrc from '../assets/images/Github1.svg';
const UserProfile: React.FC = () => {
  const goToGithub = () => {
    if (window.confirm("깃허브")) {
      window.open("https://www.github.com", "_blank");
  }
  }
  const goToinsta = () => {
    if (window.confirm("인스타")) {
      window.open("https://www.instagram.com", "_blank");
  }
  }
  return (
    <ProfileContainer>
        <StatusBar />
        <ChatHeader chatName="내 프로필" />
      <ProfileDetails>
        <ProfileIconStyled/>
        <UserName>최윤서</UserName>
        <UserEmail>yoonseor724@gmail.com</UserEmail>
      </ProfileDetails>
      <ProfileWrapper>
        <SocialLinks>
          <LinkItem>
            <LinkContent>
            <img src={instagramIconSrc} alt="Instagram" />
            <LinkName>Instagram</LinkName>
            </LinkContent>
            <LinkIconStyled onClick={goToinsta} />
          </LinkItem>
          <LinkItem>
            <LinkContent>
            <img src={githubIconSrc} alt="Github" />
            <LinkName>
            GitHub
            </LinkName>
            </LinkContent>
            <LinkIconStyled onClick={goToGithub} />
          </LinkItem>
        </SocialLinks>
      </ProfileWrapper>
      <IndicateBar activeIcon="user"/>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ProfileIconStyled = styled(ProfileIconSrc)`
  width: 84px;
  height: 84px;
`;

const LinkIconStyled = styled(LinkIconSrc)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #909090;
`;

const ProfileContainer = styled.div`
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

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 24px 0;
`;

const UserName = styled.div`
  font-size: 18px;
  color: #101010;
  font-weight: bold;
`;
const LinkName = styled.div`
  font-size: 14px;
  color: #101010;
  font-weight: bold;
`;
const UserEmail = styled.span`
  font-size: 14px;
  color: #909090;
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
  justify-content: space-between;
  font-size: 14px;
  margin: 14px 0;
  color: #101010;
`;
const LinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
