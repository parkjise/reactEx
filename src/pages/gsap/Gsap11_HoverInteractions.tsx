import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const InteractionWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const HoverButton = styled.button`
  position: relative;
  overflow: hidden;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  z-index: 1;

  .fill-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    z-index: -1;
    transform: scaleY(0); /* 처음엔 Y축 스케일 0 (숨김) */
    transform-origin: bottom; /* 아래에서부터 차오르도록 */
  }
`;

const HoverCard = styled.div`
  width: 250px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(49, 106, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    /* 초기 위치: 밖으로 빼둠 */
    transform: translateY(100%);
  }

  .overlay-text {
    font-size: 1.5rem;
    font-weight: bold;
    transform: translateY(20px);
    opacity: 0;
  }
`;

export const Gsap11_HoverInteractions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  // 1. 버튼 호버 이벤트 핸들러
  const handleBtnEnter = contextSafe((e: React.MouseEvent) => {
    const btn = e.currentTarget;
    gsap.to(btn, { color: 'white', duration: 0.3 });
    gsap.to(btn.querySelector('.fill-bg'), { scaleY: 1, duration: 0.4, ease: 'power2.out' });
  });

  const handleBtnLeave = contextSafe((e: React.MouseEvent) => {
    const btn = e.currentTarget;
    // 테마 색상을 직접 가져오지 않고 강제 주입 (데모용)
    gsap.to(btn, { color: '#316AFF', duration: 0.3 }); 
    gsap.to(btn.querySelector('.fill-bg'), { scaleY: 0, duration: 0.4, ease: 'power2.inOut' });
  });

  // 2. 카드 호버 이벤트 핸들러 (타임라인 활용)
  const handleCardEnter = contextSafe((e: React.MouseEvent) => {
    const card = e.currentTarget;
    const tl = gsap.timeline();
    
    tl.to(card.querySelector('.card-overlay'), {
      y: 0, // translateY(0)
      duration: 0.4,
      ease: 'power3.out'
    })
    .to(card.querySelector('.overlay-text'), {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'back.out(2)'
    }, '-=0.2');
  });

  const handleCardLeave = contextSafe((e: React.MouseEvent) => {
    const card = e.currentTarget;
    const tl = gsap.timeline();

    tl.to(card.querySelector('.overlay-text'), {
      y: 20,
      opacity: 0,
      duration: 0.2
    })
    .to(card.querySelector('.card-overlay'), {
      y: '100%', // 원래 위치로 숨김
      duration: 0.4,
      ease: 'power3.in'
    }, '-=0.1');
  });

  const codeString = `// React 이벤트 객체(e.currentTarget)를 활용한 GSAP 마우스 이벤트 바인딩
const handleBtnEnter = contextSafe((e) => {
  const btn = e.currentTarget;
  gsap.to(btn, { color: 'white', duration: 0.3 });
  gsap.to(btn.querySelector('.fill-bg'), { scaleY: 1, duration: 0.4, ease: 'power2.out' });
});

const handleBtnLeave = contextSafe((e) => {
  const btn = e.currentTarget;
  gsap.to(btn, { color: 'var(--primary)', duration: 0.3 }); 
  gsap.to(btn.querySelector('.fill-bg'), { scaleY: 0, duration: 0.4, ease: 'power2.inOut' });
});

return (
  <HoverButton onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}>
    <div className="fill-bg" />
    Hover Me
  </HoverButton>
);`;

  return (
    <SamplePageLayout
      title="11. Hover 기반 UI 인터랙션 (Buttons & Cards)"
      description="순수 CSS의 :hover 만으로는 구현하기 힘든, 마우스 호버 시 발생하는 복합적이고 다이나믹한 시퀀스 인터랙션 기법입니다."
      learningPoints={[
        'React의 onMouseEnter, onMouseLeave 이벤트 핸들러 내부에 gsap.to()를 선언하여 구현합니다.',
        'React 이벤트 핸들러에서 gsap을 호출하므로 반드시 contextSafe로 감싸야 런타임 메모리 누수가 발생하지 않습니다.',
        '이벤트 객체(e.currentTarget)를 사용하여, 수십 개의 카드가 있더라도 현재 마우스를 올린 정확히 그 카드에만 애니메이션을 부여할 수 있습니다. (따로 ref를 배열로 짤 필요 없음)'
      ]}
      whyImportant="복잡한 애니메이션을 CSS의 hover transition, 지연(delay)으로만 억지로 구현하려다 보면 코드가 스파게티가 됩니다. GSAP 타임라인과 마우스 이벤트를 결합하면 유지보수가 100배 쉬워집니다."
    >
      <StyledCard>
        <InteractionWrapper ref={containerRef}>
          
          {/* Button Interaction */}
          <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #eee' }}>
            <h4 style={{ marginBottom: '20px' }}>1. 배경 채우기 버튼 (Fill Hover)</h4>
            <HoverButton onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}>
              {/* 스케일 되는 배경 블록 */}
              <div className="fill-bg" />
              Hover & Fill Background
            </HoverButton>
          </div>

          {/* Card Interaction */}
          <div style={{ flex: 1, padding: '20px' }}>
            <h4 style={{ marginBottom: '20px' }}>2. 오버레이 카드 (Overlay Hover)</h4>
            <HoverCard onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" alt="Abstract" />
              <div className="card-overlay">
                <span className="overlay-text">Explore More</span>
              </div>
            </HoverCard>
          </div>

        </InteractionWrapper>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="HoverInteractions.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
