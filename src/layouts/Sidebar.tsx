import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { EXAMPLE_CATEGORIES } from '../constants/exampleCatalog';
import { useStore } from '../store/useStore';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? '280px' : '0px')};
  background-color: ${({ theme }) => theme.colors.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  height: 100vh;
  overflow-y: auto;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

const SidebarTitle = styled.div`
  padding: 30px 24px;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  i {
    font-size: 1.8rem;
  }
`;

const MenuList = styled.ul`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CategoryBlock = styled.section`
  padding-bottom: 18px;
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;

  i {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuItem = styled.li<{ $active: boolean }>`
  a {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    color: ${({ theme, $active }) => ($active ? '#ffffff' : theme.colors.textMuted)};
    background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
    border-radius: ${({ theme }) => theme.radius.button};
    font-weight: ${({ $active }) => ($active ? '600' : '500')};
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background-color: ${({ theme, $active }) => ($active ? theme.colors.primaryHover : theme.colors.background)};
      color: ${({ theme, $active }) => ($active ? '#ffffff' : theme.colors.text)};
    }

    i {
      margin-right: 14px;
      font-size: 1.4rem;
      /* 아이콘 색상도 동기화 */
      color: ${({ theme, $active }) => ($active ? '#ffffff' : theme.colors.textMuted)};
    }
  }
`;

export const Sidebar: React.FC = () => {
  const { isSidebarOpen } = useStore();
  const location = useLocation();

  return (
    <SidebarContainer $isOpen={isSidebarOpen}>
      <SidebarTitle>
        <i className="ri-dashboard-3-fill"></i>
        GXON Pro
      </SidebarTitle>
      {EXAMPLE_CATEGORIES.map((category) => (
        <CategoryBlock key={category.key}>
          <CategoryTitle>
            <i className={category.icon}></i>
            <span>{category.title}</span>
          </CategoryTitle>
          <MenuList>
            {category.items.map((menu) => (
              <MenuItem
                key={menu.path}
                $active={location.pathname === menu.path}
              >
                <Link to={menu.path}>
                  <i className={menu.icon}></i>
                  <span>{menu.label}</span>
                </Link>
              </MenuItem>
            ))}
          </MenuList>
        </CategoryBlock>
      ))}
    </SidebarContainer>
  );
};

/*
[설명]
Gxon 테마 특유의 "패딩이 넉넉하고, 둥근 버튼 형태(radius 10px)의 Active 메뉴" 패턴을 적용했습니다.

실무 포인트:
- 메뉴 자체에 margin이나 하드한 border 대신, 컨테이너 양옆에 여백(`padding: 0 16px;`)을 주고 아이템에 둥근 `border-radius`를 지정하면 트렌디한 Saas 형태의 사이드바가 완성됩니다.
*/
