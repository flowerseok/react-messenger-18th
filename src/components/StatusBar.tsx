import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Indicators } from '../assets/images/indicators.svg';

const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StatusBarContainer>
      <TimeContainer>
        <TimeText>{currentTime}</TimeText>
      </TimeContainer>

      <IconContainer>
        <Indicator />
      </IconContainer>
    </StatusBarContainer>
  );
};

export default StatusBar;

function getCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
}

const StatusBarContainer = styled.div`
  padding: 10px 0px 10px 1px;
  background: #ffffff;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const TimeText = styled.div`
  text-align: center;
  color: #101010;
  font-size: 17px;
  font-weight: 600;
  line-height: 17px;
  word-wrap: break-word;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
`;

const Indicator = styled(Indicators)`
  width: 76px;
  height: 17px;
`;