import React, { useState } from 'react';
import styled from 'styled-components';

const TabHeader = styled.ul`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  margin-top: 20px;
`;

const TabItem = styled.li<{ $active: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  border-bottom: 3px solid ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  margin-bottom: -2px; /* border 겹침 처리 */
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabContent = styled.div`
  padding: 20px 0;
  line-height: 1.6;
`;

// 탭 정보와 출력할 내용을 매핑한 배열
const tabData = [
  { id: 1, title: '상품 상세정보', content: '여기는 상품 상세정보 탭입니다. 상품의 스펙, 재질, 주의사항 등이 들어갑니다.' },
  { id: 2, title: '상품 후기 (120)', content: '여기는 구매자들의 리뷰를 보여주는 탭입니다. 리뷰 목록 컴포넌트가 올 수 있습니다.' },
  { id: 3, title: 'Q&A (15)', content: '상품에 대한 질문과 답변 게시판입니다.' },
];

export const TabMenu: React.FC = () => {
  // 현재 어떤 탭이 선택되어 있는지 인덱스를 저장
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h2>탭 메뉴 (Tab Menu)</h2>
      <p>active 인덱스 상태만 교체하면서 내용을 갈아끼우는 패턴입니다.</p>

      <TabHeader>
        {tabData.map((tab, index) => (
          <TabItem 
            key={tab.id} 
            $active={activeTab === index} 
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </TabItem>
        ))}
      </TabHeader>

      <TabContent>
        {/* 현재 activeTab 인덱스와 일치하는 데이터의 content만 렌더링 */}
        {tabData[activeTab].content}
      </TabContent>
    </div>
  );
};

/*
[설명]
탭 메뉴를 구성하는 상태 머신 패턴입니다.

실무 패턴:
- 탭 안쪽의 본문이 복잡하다면 `<TabContent>{activeTab === 0 ? <DetailComponent/> : <ReviewComponent/>}</TabContent>` 형태로 확장합니다.
- `activeTab`을 인덱스 혹은 식별 문자열('detail', 'review')로 저장합니다. 
- 복잡하게 여러 상태를 만들 필요 없이, 오직 하나의 state 숫자값으로 선택 탭과 보여줄 콘텐츠가 동시에 결정됩니다.
*/
