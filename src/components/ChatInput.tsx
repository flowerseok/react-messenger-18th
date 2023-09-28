import React, { useState } from 'react';
import styled from 'styled-components';

import Camera from '../assets/images/Camera.svg'; // Replace 'image1.svg' with the actual name of your image.
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
        <CameraIcon />
        <GalleryIcon />
  
        <TextInputContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your message..."
          />
        </TextInputContainer>
  
        <MicIcon />
        <SmileIcon />
      </StyledInputBar>
    );
  };
  
  
  export default ChatInput;
  
  
const StyledInputBar = styled.form`
  display: flex; // set to flex
  align-items: center; // vertically align items in the center
  padding: 0 10px; // some padding to give some space
  width: 100%;
  background: white;
  gap: 10px; // space between items in the flex container
`;

const TextInputContainer = styled.div`
  flex-grow: 1; // this makes sure it takes up all available space
  height: 44px;
  background: #F1F1F1;
  border-radius: 22px;
  border: 1px #CCCCCC solid;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding-left: 15px; // Adjust padding so text doesn't start at the very edge
  border-radius: 22px;
  background: #F1F1F1;
  &:focus {
    box-shadow: none;
  }
`;

const CameraIcon = styled.img.attrs({ src: Camera })`
  width: 24px;
  height: 24px;
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
`;

// ... Rest of the code remains unchanged.
