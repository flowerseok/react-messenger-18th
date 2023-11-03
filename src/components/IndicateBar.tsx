import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Friends } from '../assets/images/Friends.svg';
import { ReactComponent as Friends_black } from '../assets/images/Friends-black.svg';
import { ReactComponent as Chat_black } from '../assets/images/Chat-black.svg';
import { ReactComponent as Chat } from '../assets/images/Chat.svg';
import { ReactComponent as User } from '../assets/images/User.svg';
import { ReactComponent as User_black } from '../assets/images/User-black.svg';
import { ReactComponent as Safari } from '../assets/images/Safari.svg';
import { ReactComponent as Safari_black } from '../assets/images/Safari-Black.svg';
import styled from 'styled-components';

interface IndicateBarProps {
    activeIcon: 'friends' | 'chat' | 'safari' | 'user';
  }
  
const IndicateBar: React.FC<IndicateBarProps> = ({ activeIcon }) => {

    const navigate = useNavigate();

    const goToFriendList = () => {
        navigate('/friends');
    };
    const goToChatList = () => {
        navigate('/chatlist');
    }
    const goToUserProfile = () => {
        navigate('/userprofile')
    }
    const goToGoogle = () => {
      if (window.confirm("구글")) {
        window.open("https://www.google.com", "_blank");
    }
    }
    return (
      <IconContainer>
        {activeIcon === 'friends' ? 
          <Friend_black /> : 
          <Friend onClick={goToFriendList} />}
        {activeIcon === 'chat' ? <Chat_black /> : <Chat onClick={goToChatList}/>}
        {activeIcon === 'safari' ? <Safari_black /> : <Safari onClick={goToGoogle} />}
        {activeIcon === 'user' ? <User_black /> : <User onClick={goToUserProfile}/>}
        
      </IconContainer>
    );
  }
export default IndicateBar;
const IconContainer = styled.div`
width: 100%;
height: 100%;
justify-content: space-between;
align-items: center;
display: flex;
gap: 10px;
padding: 10px 60px 10px 60px;
flex-direction: row;
border-top: 1px solid #e0e0e0;
`;

const Friend = styled(Friends)`
  width: 20px;
  height: 20px;
`;
const Friend_black = styled(Friends_black)`
  width: 20px;
  height: 20px;
`;
const more = styled(User)`
  width: 20px;
  height: 20px;
`;
const more_black = styled(User_black)`
  width: 20px;
  height: 20px;
`;
const chat = styled(Chat)`
  width: 20px;
  height: 20px;
`;
const chat_black = styled(Chat_black)`
  width: 20px;
  height: 20px;
`;
const safari = styled(Safari)`
  width: 20px;
  height: 20px;
`;
const safari_black = styled(Safari_black)`
  width: 20px;
  height: 20px;
`;