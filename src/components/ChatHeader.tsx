import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CallIcons } from '../assets/images/Phone.svg';
import { ReactComponent as VideoIcons } from '../assets/images/Videocamera.svg';
import { ReactComponent as LeftArrowIcon } from '../assets/images/Arrow-Left.svg';
import { useNavigate, useLocation } from 'react-router-dom';  

interface ChatHeaderProps {
  chatName: string;
  onSwitchPosition?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatName, onSwitchPosition }) => {
    
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToFriendList = () => {
      // navigate("/chatlist");
      navigate(-1);
  };
  const isChatPage = location.pathname.startsWith('/chat/');
  return (
    <ChatHeaderContainer>
        <Wrapper>
          {isChatPage && <ArrowLeftIcon onClick={navigateToFriendList} />}
          <UserName onClick={onSwitchPosition}>{chatName}</UserName>
        </Wrapper>
        {isChatPage && (
          <Icons>
            <IconWrapper>
              <CallIcon />
            </IconWrapper>
            <IconWrapper>
              <VideoIcon />
            </IconWrapper>
          </Icons>
        )}
    </ChatHeaderContainer>
  );
};

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 3px;
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(4px);
  gap: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px; 
`;

const UserName = styled.div`
  color: #101010;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  word-wrap: break-word;
`;

const Icons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

const CallIcon = styled(CallIcons)`
  width: 24px;
  height: 24px;
`;

const VideoIcon = styled(VideoIcons)`
  width: 24px;
  height: 24px;
`;

const ArrowLeftIcon = styled(LeftArrowIcon)`
  width: 24px;
  height: 24px;
`;

export default ChatHeader;
