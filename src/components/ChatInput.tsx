import React, { useState } from 'react';
import styled from 'styled-components';

import Camera from '../assets/images/Camera.svg'; 
import Gallery from '../assets/images/Gallery.svg';
import Mic from '../assets/images/Microphone.svg';
import Smile from '../assets/images/Sticker-Smile.svg';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');
  
    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSend(inputValue);
        setInputValue('');
      }
    };
  
    return (
      <StyledInputBar onSubmit={handleSendMessage}>
        <TextInputContainer>
          <CameraIcon />
          <GalleryIcon />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}

          />
          <MicIcon />
          <SmileIcon />
        </TextInputContainer>
      </StyledInputBar>
    );
  };
    
  
  export default ChatInput;
  
  const StyledInputBar = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  background: white;
`;

const TextInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%; 
  height: 44px;
  padding: 0 10px; 
  background: #F1F1F1;
  border-radius: 22px;
  border: 1px #CCCCCC solid;
`;

const Input = styled.input`
  flex-grow: 1;
  margin: 0 10px;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 22px;
  background: transparent; 
  &:focus {
    box-shadow: none;
  }
`;

const CameraIcon = styled.img.attrs({ src: Camera })`
  width: 24px;
  height: 24px;
  margin-right:12px
`;

const GalleryIcon = styled.img.attrs({ src: Gallery })`
  width: 24px;
  height: 24px;
`;

const MicIcon = styled.img.attrs({ src: Mic })`
  width: 24px;
  height: 24px;
`;

const SmileIcon = styled.img.attrs({ src: Smile })`
  width: 24px;
  height: 24px;
  margin-left:12px

`;


