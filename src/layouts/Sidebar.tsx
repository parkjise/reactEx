import React, { useState, useEffect } from 'react';
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    width: 280px;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    box-shadow: ${({ $isOpen }) => ($isOpen ? '10px 0 30px rgba(0,0,0,0.1)' : 'none')};
  }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 999;
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

const CategoryTitle = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  .title-left {
    display: flex;
    align-items: center;
    gap: 8px;
    
    i {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .chevron {
    color: ${({ theme }) => theme.colors.textMuted};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    transition: transform 0.3s ease;
  }
`;

const MenuListWrapper = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;

  > ul {
    overflow: hidden;
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
  const { isSidebarOpen, toggleSidebar } = useStore();
  const location = useLocation();

  const findCurrentCategory = () => {
    const category = EXAMPLE_CATEGORIES.find(c => c.items.some(i => i.path === location.pathname));
    return category ? category.key : EXAMPLE_CATEGORIES[0]?.key;
  };

  const [openCategory, setOpenCategory] = useState<string | null>(findCurrentCategory());

  useEffect(() => {
    const currentKey = findCurrentCategory();
    if (currentKey && currentKey !== openCategory) {
      setOpenCategory(currentKey);
    }
  }, [location.pathname]);

  const toggleCategory = (key: string) => {
    setOpenCategory(prev => (prev === key ? null : key));
  };

  return (
    <>
      <Backdrop $isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <SidebarContainer $isOpen={isSidebarOpen}>
        <SidebarTitle>
          <i className="ri-dashboard-3-fill"></i>
          GXON Pro
        </SidebarTitle>
        {EXAMPLE_CATEGORIES.map((category) => {
          const isOpen = openCategory === category.key;
          return (
            <CategoryBlock key={category.key}>
              <CategoryTitle $isOpen={isOpen} onClick={() => toggleCategory(category.key)}>
                <div className="title-left">
                  <i className={category.icon}></i>
                  <span>{category.title}</span>
                </div>
                <i className="ri-arrow-down-s-line chevron"></i>
              </CategoryTitle>
              <MenuListWrapper $isOpen={isOpen}>
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
              </MenuListWrapper>
            </CategoryBlock>
          );
        })}
      </SidebarContainer>
    </>
  );
};

/*
[설명]
Gxon 테마 특유의 "패딩이 넉넉하고, 둥근 버튼 형태(radius 10px)의 Active 메뉴" 패턴을 적용했습니다.

실무 포인트:
- 메뉴 자체에 margin이나 하드한 border 대신, 컨테이너 양옆에 여백(`padding: 0 16px;`)을 주고 아이템에 둥근 `border-radius`를 지정하면 트렌디한 Saas 형태의 사이드바가 완성됩니다.
*/
