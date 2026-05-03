import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const RevealContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 300px;
  overflow: hidden;
  border-radius: 16px;
  margin: 30px 0;
`;

const RevealImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2); /* 이미지 초깃값: 살짝 확대된 상태 */
`;

const RevealMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: 2;
  transform-origin: right; /* 마스크가 오른쪽으로 줄어들며 사라지게 설정 */
`;

export const Gsap10_ImageReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. 이미지를 가리고 있는 마스크 상자를 X축으로 스케일 0을 만들어 치워버립니다.
    tl.to('.reveal-mask', {
      scaleX: 0,
      duration: 1,
      ease: 'power3.inOut'
    })
    // 2. 그와 동시에 살짝 확대되어 있던 이미지를 원래 크기(scale 1)로 줄이며 자연스러움을 더합니다.
    .to('.reveal-img', {
      scale: 1,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=0.8'); // 마스크 애니메이션이 0.8초 남았을 때 (마스크가 치워지는 도중에) 시작

  }, { scope: containerRef, dependencies: [toggle] });

  const codeString = `const tl = gsap.timeline();

// 마스크 박스(배경색)가 오른쪽(transform-origin: right)으로 줄어들며 이미지가 공개됨
tl.to('.reveal-mask', {
  scaleX: 0,
  duration: 1,
  ease: 'power3.inOut'
})
// 이미지 줌아웃 효과 오버랩 (더 고급스러운 연출)
.to('.reveal-img', {
  scale: 1, // 초기 scale(1.2)에서 1로 줌아웃
  duration: 1.5,
  ease: 'power3.out'
}, '-=0.8');`;

  return (
    <SamplePageLayout
      title="10. 이미지 마스크 리빌 (Image Reveal)"
      description="이미지 위에 단색 블록(Mask)을 올려둔 뒤, 블록이 옆으로 스르륵 사라지면서 이미지가 공개되는 매우 고급스러운 연출 기법입니다."
      learningPoints={[
        '단순히 이미지의 opacity를 0에서 1로 올리는 Fade-in 효과보다 훨씬 모던하고 세련된 인상을 줍니다.',
        '마스크 요소에 transform-origin: right (혹은 left)를 주고 scaleX: 0 으로 애니메이션을 주어 구현합니다.',
        '마스크가 벗겨짐과 동시에 내부 이미지 요소는 살짝 확대된 상태(scale 1.2)에서 원래 크기(scale 1.0)로 축소되는 효과를 결합하면 시각적 몰입감이 극대화됩니다.'
      ]}
      whyImportant="Awwwards 등에서 수상하는 고급 웹 에이전시 포트폴리오 사이트에서 이미지 갤러리나 포트폴리오 썸네일을 띄울 때 사실상 표준(De facto standard)으로 쓰이는 필수 기법입니다."
    >
      <StyledCard>
        <StyledButton onClick={() => setToggle(!toggle)} variant="primary">
          리빌 애니메이션 재생 (Re-play)
        </StyledButton>

        <div ref={containerRef}>
          <RevealContainer>
            {/* 단색 마스크가 이미지를 완전히 덮고 있음 */}
            <RevealMask className="reveal-mask" />
            
            {/* 실제 보여질 이미지 */}
            <RevealImage 
              className="reveal-img" 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" 
              alt="Retro Setup" 
            />
          </RevealContainer>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="ImageReveal.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
