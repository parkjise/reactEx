import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
`;

const DemoShell = styled.div<{ $sidebarOpen: boolean }>`
  min-height: 170px;
  display: grid;
  grid-template-columns: ${({ $sidebarOpen }) => ($sidebarOpen ? '150px 1fr' : '0 1fr')};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: grid-template-columns 0.2s ease;
`;

const SideNav = styled.nav`
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 10px;
`;

const MenuButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  font-weight: 700;
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.primaryHover : theme.colors.background)};
    color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.text)};
  }
`;

const ContentPane = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Switch = styled.button<{ $on: boolean }>`
  width: 50px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  padding: 3px;
  cursor: pointer;
  background: ${({ theme, $on }) => ($on ? theme.colors.primary : theme.colors.border)};
  display: inline-flex;
  justify-content: ${({ $on }) => ($on ? 'flex-end' : 'flex-start')};

  span {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
  }
`;

const IconButton = styled.button<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  display: inline-grid;
  place-items: center;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}12` : theme.colors.surface)};
`;

const SelectCard = styled.button<{ $selected: boolean }>`
  width: 100%;
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 14px;
  cursor: pointer;
  text-align: left;
  font-weight: 700;
`;

const FloatingPanel = styled.div`
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SelectionToggleInteractions: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [screen, setScreen] = useState('personal');
  const [activeMenu, setActiveMenu] = useState('리포트');
  const [switchOn, setSwitchOn] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);
  const [selectedCard, setSelectedCard] = useState('basic');
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <SamplePageLayout
      title="선택/토글/패널 인터랙션"
      icon="ri-toggle-line"
      description="사이드바 열기/닫기, 라디오 화면 전환, 카드 선택 강조, active 메뉴, 스위치, 좋아요/북마크, 알림/프로필 패널을 한 화면에서 비교합니다."
      learningPoints={[
        'boolean 상태로 사이드바와 패널 열림/닫힘 제어',
        '선택값에 따라 라디오 화면과 active 메뉴 분기',
        '카드 선택, 스위치, 좋아요, 북마크 같은 토글 UI 상태 표현',
      ]}
      whyImportant="실무 화면은 대부분 선택 상태를 명확히 보여주는 일의 반복입니다. 사용자가 현재 무엇을 선택했고 어떤 패널이 열려 있는지 즉시 알 수 있어야 합니다."
    >
      <Grid>
        <Card title="사이드바 열기 / 닫기" padding="16px">
          <Button size="small" variant="outline" onClick={() => setSidebarOpen((prev) => !prev)}>
            {sidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          </Button>
          <DemoShell $sidebarOpen={sidebarOpen} style={{ marginTop: 12 }}>
            <SideNav>
              {['홈', '리포트', '설정'].map((menu) => (
                <MenuButton key={menu} $active={activeMenu === menu} onClick={() => setActiveMenu(menu)}>
                  {menu}
                </MenuButton>
              ))}
            </SideNav>
            <ContentPane>선택된 메뉴: {activeMenu}</ContentPane>
          </DemoShell>
        </Card>

        <Card title="라디오 선택에 따른 화면 전환" padding="16px">
          <div style={{ display: 'flex', gap: 12 }}>
            <label><input type="radio" checked={screen === 'personal'} onChange={() => setScreen('personal')} /> 개인</label>
            <label><input type="radio" checked={screen === 'company'} onChange={() => setScreen('company')} /> 회사</label>
          </div>
          <Panel style={{ marginTop: 12 }}>
            {screen === 'personal' ? '개인 프로필 입력 화면입니다.' : '회사 정보와 사업자 입력 화면입니다.'}
          </Panel>
        </Card>

        <Card title="카드 선택 상태 강조" padding="16px">
          <Grid>
            {['basic', 'pro'].map((plan) => (
              <SelectCard key={plan} $selected={selectedCard === plan} onClick={() => setSelectedCard(plan)}>
                {plan === 'basic' ? 'Basic 플랜' : 'Pro 플랜'}
              </SelectCard>
            ))}
          </Grid>
        </Card>

        <Card title="스위치 / 좋아요 / 북마크" padding="16px">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Switch $on={switchOn} onClick={() => setSwitchOn((prev) => !prev)} aria-label="스위치 토글"><span /></Switch>
            <IconButton $active={liked} onClick={() => setLiked((prev) => !prev)} aria-label="좋아요">
              <i className={liked ? 'ri-heart-fill' : 'ri-heart-line'} />
            </IconButton>
            <IconButton $active={bookmarked} onClick={() => setBookmarked((prev) => !prev)} aria-label="북마크">
              <i className={bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} />
            </IconButton>
          </div>
        </Card>

        <Card title="알림 / 프로필 메뉴" padding="16px">
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="small" variant="outline" onClick={() => setNoticeOpen((prev) => !prev)}>알림</Button>
            <Button size="small" variant="outline" onClick={() => setProfileOpen((prev) => !prev)}>프로필</Button>
          </div>
          {noticeOpen && <FloatingPanel>새 승인 요청 3건, 실패한 배치 1건</FloatingPanel>}
          {profileOpen && <FloatingPanel>내 정보, 계정 설정, 로그아웃</FloatingPanel>}
        </Card>
      </Grid>
    </SamplePageLayout>
  );
};
