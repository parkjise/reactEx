import React from 'react';
import styled from 'styled-components';
import { useStore } from '../store/useStore';

const HeaderContainer = styled.header`
  height: 80px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  flex-shrink: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px 16px;
  border-radius: 30px; /* 둥근 검색창 패턴 */
  gap: 10px;
  width: 250px;

  i {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  input {
    border: none;
    background: none;
    outline: none;
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    font-size: 0.95rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

const IconButton = styled.button`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 10px;
  cursor: pointer;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    
    .name {
      font-weight: 700;
      font-size: 0.95rem;
      color: ${({ theme }) => theme.colors.text};
    }
    .role {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

export const Header: React.FC = () => {
  const { toggleSidebar, isDarkMode, toggleDarkMode } = useStore();

  return (
    <HeaderContainer>
      <LeftSection>
        <IconButton onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <i className="ri-menu-2-line"></i>
        </IconButton>
        <SearchBox>
          <i className="ri-search-line"></i>
          <input type="text" placeholder="Search here..." />
        </SearchBox>
      </LeftSection>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconButton onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          <i className={isDarkMode ? 'ri-sun-line' : 'ri-moon-clear-line'}></i>
        </IconButton>
        <IconButton aria-label="Notifications">
          <i className="ri-notification-3-line"></i>
        </IconButton>

        <ProfileSection>
          <div className="avatar">A</div>
          <div className="info">
            <span className="name">Admin User</span>
            <span className="role">Super Admin</span>
          </div>
          <i className="ri-arrow-down-s-line" style={{ color: '#94A3B8' }}></i>
        </ProfileSection>
      </div>
    </HeaderContainer>
  );
};
