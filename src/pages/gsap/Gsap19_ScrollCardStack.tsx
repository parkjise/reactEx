import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const LocalScroller = styled.div`
  height: 600px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Spacer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: gray;
`;

// 카드가 쌓이는 영역
const StackContainer = styled.div`
  height: 600px; /* 데모 뷰포트와 동일하게 세팅 */
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// 각 카드의 컨테이너. absolute로 겹쳐 둠
const CardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 60%;
  will-change: transform;
`;

const Card = styled.div<{ $bg: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ $bg }) => $bg};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  font-weight: 800;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  /* 3D 깊이감을 주기 위한 초기 설정 */
  transform-origin: center top;
`;

export const Gsap19_ScrollCardStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const cards = [
    { id: 1, color: '#316AFF', title: 'Card 1' },
    { id: 2, color: '#05CD99', title: 'Card 2' },
    { id: 3, color: '#EE5D50', title: 'Card 3' },
    { id: 4, color: '#FFB800', title: 'Card 4' },
  ];

  useGSAP(() => {
    // 1. 카드를 모두 선택
    const cardElements = gsap.utils.toArray('.stack-card') as HTMLElement[];

    // 2. 전체 스택 영역을 고정(Pin)시킵니다.
    ScrollTrigger.create({
      trigger: stackRef.current,
      scroller: scrollerRef.current,
      start: 'top top',
      end: '+=2000', // 2000px 스크롤 내리는 동안 고정
      pin: true,
    });

    // 3. 각 카드별로 시간차를 두고 크기가 줄어들면서 겹쳐지는 효과
    //    마지막 카드는 그대로 둡니다. (length - 1)
    cardElements.forEach((card, index) => {
      if (index === cardElements.length - 1) return;

      gsap.to(card, {
        scale: 0.9 - (cardElements.length - index) * 0.05, // 뒤로 갈수록 작아짐
        yPercent: -15, // 살짝 위로 밀려남
        opacity: 0,    // 투명해짐
        ease: 'none',
        scrollTrigger: {
          trigger: stackRef.current,
          scroller: scrollerRef.current,
          start: `top top-=${index * 500}`, // 각 카드별로 스크롤 시작점을 500px씩 늦춤
          end: `top top-=${(index + 1) * 500}`, // 500px 동안 축소 애니메이션 진행
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  const codeString = `useGSAP(() => {
  const cards = gsap.utils.toArray('.stack-card');

  // 1. 섹션 전체를 화면에 고정 (Pin)
  ScrollTrigger.create({
    trigger: stackRef.current,
    start: 'top top',
    end: '+=2000', // 카드가 4장이므로 약 2000px 스크롤 공간 확보
    pin: true,
  });

  // 2. 마지막 카드를 제외한 이전 카드들을 순차적으로 축소 및 페이드아웃 (Stack)
  cards.forEach((card, index) => {
    if (index === cards.length - 1) return;

    gsap.to(card, {
      scale: 0.8, // 스크롤 시 카드가 작아짐
      yPercent: -10, // 살짝 위로 이동하여 깊이감 추가
      opacity: 0,
      scrollTrigger: {
        trigger: stackRef.current,
        // 각 카드마다 스크롤 트리거 구간을 분리 (index * 500)
        start: \`top top-=\${index * 500}\`, 
        end: \`top top-=\${(index + 1) * 500}\`,
        scrub: true,
      }
    });
  });
});`;

  return (
    <SamplePageLayout
      title="19. 스크롤 카드 스택 (Scroll Card Stack)"
      description="세로 스크롤 시 화면이 고정(Pin)되고, 중앙에 겹쳐져 있는 카드들이 종이가 한 장씩 뒤로 넘어가듯 축소되며 다음 카드가 등장하는 2.5D 인터랙션입니다."
      learningPoints={[
        '섹션의 pin 속성을 이용하여 부모 영역을 뷰포트 최상단(top top)에 묶어둡니다.',
        '각 카드들에 개별 ScrollTrigger 인스턴스를 부착하되, start 값을 `top top-=${index * 500}` 처럼 주어 스크롤 구간을 수동으로 분할합니다.',
        '이전 카드는 scale과 opacity를 줄이면서 약간 위로(yPercent) 올리면 뒷공간으로 멀어지는 듯한 착시를 만들어냅니다.'
      ]}
      whyImportant="제품의 주요 기능 3~4가지를 소개할 때 흔한 슬라이더(캐러셀) 대신 카드 스택을 사용하면 사용자의 체류 시간과 스크롤 경험이 비약적으로 향상됩니다."
    >
      <StyledCard>
        <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          * 박스 내부 스크롤을 끝까지 천천히 내려보세요.
        </p>

        <div ref={containerRef}>
          <LocalScroller ref={scrollerRef}>
            <Spacer>스크롤 진입 대기 영역</Spacer>
            
            <StackContainer ref={stackRef}>
              {cards.map((c, idx) => (
                // zIndex를 역순으로 주어 1번 카드가 가장 위에 오도록 세팅
                <CardWrapper key={c.id} style={{ zIndex: cards.length - idx }}>
                  <Card className="stack-card" $bg={c.color}>
                    {c.title}
                  </Card>
                </CardWrapper>
              ))}
            </StackContainer>

            <Spacer>스크롤 종료 영역</Spacer>
          </LocalScroller>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap19_ScrollCardStack.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
