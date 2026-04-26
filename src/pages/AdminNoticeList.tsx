import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }

  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`;

const CategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const Title = styled.div`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateText = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export const AdminNoticeList: React.FC = () => {
  return (
    <SamplePageLayout
      title="공지사항 목록 (미니 리스트)"
      icon="ri-megaphone-line"
      description="대시보드 한 켠에 자리잡는 텍스트 위주의 미니 공지사항/게시판 목록 패턴입니다."
      learningPoints={[
        'text-overflow: ellipsis를 활용한 긴 텍스트의 말줄임표(...) 처리',
        'Badge 컴포넌트를 이용한 [N] (새로운 글) 시각적 강조',
        'flex 레이아웃을 통해 제목 부분만 가변 길이(flex: 1)로 설정하는 기법',
      ]}
      whyImportant="공지사항이나 1:1 문의 내역을 대시보드에서 빠르게 훑어볼 때 사용합니다. 영역이 좁으므로 제목이 길어질 경우 레이아웃이 깨지지 않도록 CSS 말줄임 처리가 필수적입니다."
    >
      <Card 
        title="사내 공지사항" 
        extra={<a href="#" style={{ fontSize: '0.85rem', color: '#316AFF', textDecoration: 'none' }}>더보기 <i className="ri-arrow-right-s-line" /></a>}
      >
        <ListContainer>
          <ListItem>
            <CategoryBadge>시스템</CategoryBadge>
            <Title>
              10월 31일 (목) 정기 서버 점검 안내
              <Badge status="error" dot>NEW</Badge>
            </Title>
            <DateText>2026.10.28</DateText>
          </ListItem>
          
          <ListItem>
            <CategoryBadge>인사</CategoryBadge>
            <Title>
              [필독] 2026년 하반기 연차 사용 촉진 관련 안내 (반드시 확인 바랍니다)
              <Badge status="error" dot>NEW</Badge>
            </Title>
            <DateText>2026.10.25</DateText>
          </ListItem>

          <ListItem>
            <CategoryBadge>보안</CategoryBadge>
            <Title>비밀번호 변경 캠페인 및 휴면 계정 정리 결과 보고</Title>
            <DateText>2026.10.10</DateText>
          </ListItem>

          <ListItem>
            <CategoryBadge>행사</CategoryBadge>
            <Title>가을 체육대회 조편성 및 일정 안내</Title>
            <DateText>2026.09.28</DateText>
          </ListItem>
        </ListContainer>
      </Card>
    </SamplePageLayout>
  );
};

/*
[설명]
좁은 대시보드 카드 영역 내에서 게시판 형태를 렌더링하는 실무 UI입니다.

실무 패턴:
- 제목(`Title`)에 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` 속성을 부여하여 텍스트가 부모 컨테이너 폭을 넘어갈 때 말줄임(...) 처리를 합니다.
- 전체 리스트 컨테이너가 `display: flex;` 일 때, 말줄임을 원하는 요소에 반드시 `flex: 1;` 또는 `min-width: 0;`을 주어야 레이아웃이 터지는 현상을 막을 수 있습니다.
*/
