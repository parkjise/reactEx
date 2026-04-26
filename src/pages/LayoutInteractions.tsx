import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';

// --- Styled Components ---

// 1. Expandable Text
const ExpandableContainer = styled.div`
  margin-bottom: 40px;
`;

const TextParagraph = styled.p<{ $expanded: boolean }>`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  /* 접혀있을 때는 3줄, 펴졌을 때는 아주 큰 줄 수(예: 100)를 주어 자연스럽게 보이도록 함 */
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 100 : 3)};
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0;
  margin-top: 8px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

// 2. Sticky & Shrink Header
// 부모 컨테이너 내에서만 스크롤 되도록 임의의 스크롤 박스를 만듭니다.
const ScrollBox = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StickyHeader = styled.div<{ $isShrunk: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ $isShrunk }) => ($isShrunk ? '10px 20px' : '24px 20px')};
  font-size: ${({ $isShrunk }) => ($isShrunk ? '1rem' : '1.4rem')};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ $isShrunk }) => ($isShrunk ? '0 4px 12px rgba(0,0,0,0.05)' : 'none')};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DummyContent = styled.div`
  padding: 20px;
  height: 1000px; /* 강제 스크롤 생성 */
  background-image: linear-gradient(#f8f9fa 1px, transparent 1px);
  background-size: 100% 40px;
`;

// 3. Scroll to Top Button
const ScrollToTopBtn = styled.button<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(49, 106, 255, 0.4);
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '20px')});
  transition: all 0.3s ease;
  z-index: 20;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const LONG_TEXT = `UI 인터랙션은 사용자가 제품과 상호작용하는 모든 방식을 의미합니다. 좋은 UI 인터랙션은 사용자가 다음에 무엇을 해야 할지 직관적으로 알 수 있게 해주며, 에러를 방지하고, 시각적인 즐거움까지 제공합니다. 특히 B2B 솔루션이나 관리자 페이지에서는 '데이터가 손실되지 않는 것', '현재 상태를 명확히 인지하는 것'이 가장 중요합니다. 애니메이션은 과하지 않게, 꼭 필요한 피드백(저장 성공, 데이터 로딩 등)에만 절제하여 사용하는 것이 모던 웹 디자인의 핵심입니다. 스크롤에 반응하는 헤더나 더보기 버튼 등은 제한된 화면 공간을 효율적으로 사용하기 위한 필수 테크닉입니다. 

뿐만 아니라, 컴포넌트의 상태가 변경될 때 부드러운 전환(Transition)을 제공하면 사용자는 맥락을 잃지 않습니다. 화면이 좁은 모바일 환경에서는 긴 텍스트를 모두 노출하면 가독성이 크게 떨어지므로, 처음에는 3줄 정도만 보여주고 사용자가 스스로 원할 때 전체 내용을 읽을 수 있게 통제권을 넘겨주는 '더보기/접기(Expand/Collapse)' 패턴이 매우 널리 쓰입니다. 이 방식은 DOM 크기를 무리하게 확장하지 않아 성능 최적화에도 기여하며, 전체적인 디자인의 여백과 밀도를 아름답게 유지할 수 있도록 도와주는 필수적인 프론트엔드 기법 중 하나입니다.`;

export const LayoutInteractions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // ScrollBox 관련 상태
  const [isShrunk, setIsShrunk] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollBoxRef.current) return;
    const scrollTop = scrollBoxRef.current.scrollTop;
    
    // 1. 헤더 축소 로직 (50px 이상 스크롤 시)
    setIsShrunk(scrollTop > 50);
    
    // 2. Top 버튼 표시 로직 (200px 이상 스크롤 시)
    setShowTopBtn(scrollTop > 200);
  };

  const scrollToTop = () => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SamplePageLayout
      title="고급 레이아웃 인터랙션"
      icon="ri-layout-row-line"
      description="스크롤 위치에 따라 헤더가 줄어들고(Sticky+Shrink), 텍스트가 접히며, Top 버튼이 나타나는 페이지 레벨의 상호작용입니다."
      learningPoints={[
        'CSS -webkit-line-clamp를 활용한 다중 행(Multi-line) 텍스트 말줄임 및 펼치기',
        '요소의 scrollTop 값을 감지하여 Header 컴포넌트의 padding과 font-size를 동적으로 조작(Shrink)',
        'scrollTo({ behavior: "smooth" })를 활용한 부드러운 스크롤 이동',
        '특정 스크롤 위치를 넘었을 때만 나타나는 Floating Action Button (FAB) 구현',
      ]}
      whyImportant="스크롤은 사용자가 웹에서 가장 많이 하는 행동입니다. 스크롤을 내릴 때 커다란 헤더가 화면을 가리지 않게 줄여주거나, 긴 글을 접어두고 필요할 때만 보게 하는 것은 스크롤 경험(UX)을 극대화하는 기본기입니다."
    >
      <Card title="1. 텍스트 더보기 / 접기 (Expandable Text)">
        <ExpandableContainer>
          <TextParagraph $expanded={isExpanded}>
            {LONG_TEXT}
          </TextParagraph>
          <ToggleBtn onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '접기' : '더보기'}
          </ToggleBtn>
        </ExpandableContainer>
      </Card>

      <div style={{ marginTop: '24px' }} />

      <Card title="2. 스크롤 반응형 헤더 & Top 버튼">
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px' }}>
          아래 박스 내부를 아래로 스크롤 해보세요.
        </p>
        
        {/* 스크롤 이벤트 감지 영역 */}
        <ScrollBox ref={scrollBoxRef} onScroll={handleScroll}>
          
          <StickyHeader $isShrunk={isShrunk}>
            <i className="ri-apple-line" style={{ color: isShrunk ? '#316AFF' : '#2B3674', transition: 'color 0.3s' }} />
            Sticky Header
          </StickyHeader>
          
          <DummyContent>
            <p style={{ color: '#A3AED0', fontSize: '0.9rem' }}>아래로 쭉 스크롤 하세요 ↓</p>
          </DummyContent>

          <ScrollToTopBtn $isVisible={showTopBtn} onClick={scrollToTop}>
            <i className="ri-arrow-up-line" />
          </ScrollToTopBtn>
          
        </ScrollBox>
      </Card>

    </SamplePageLayout>
  );
};

/*
[설명]
페이지 레이아웃과 스크롤에 반응하는 고급 인터랙션 묶음입니다.

실무 패턴:
- 다중 행 말줄임: 구형 브라우저에서는 JS로 글자 수를 자르기도 하지만, 현대 웹에서는 `-webkit-line-clamp` 속성으로 제어하는 것이 성능도 좋고 창 크기 변화에도 완벽하게 대응합니다.
- Shrink Header: `onScroll` 이벤트로 `scrollTop`을 체크한 뒤, 기준선(예: 50px)을 넘으면 상태(`isShrunk`)를 변경하여 헤더의 CSS 패딩과 크기를 줄입니다.
- 최적화 주의: 실무에서 `window` 전역 스크롤에 이벤트를 걸 때는 성능 저하를 막기 위해 반드시 `Lodash`의 `throttle` 함수 등을 적용하여 이벤트 발생 주기를 제한해야 합니다.
*/
