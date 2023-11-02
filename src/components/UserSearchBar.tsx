import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Magnifer } from '../assets/images/Magnifer.svg';

interface UserSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchContainer>
      <SearchBarWrapper>
        <SearchIcon />
        <SearchInput 
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="검색"
        />
      </SearchBarWrapper>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  background: white;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-bottom: 10px;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: 35px;
  background: #F1F1F1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 0px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #909090;
`;

const SearchIcon = styled(Magnifer)`
  width: 30px;
  height: 17px;
`;

export default UserSearchBar;
