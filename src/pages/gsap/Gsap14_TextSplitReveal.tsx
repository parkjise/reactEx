import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const TitleContainer = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 40px;
`;

// Line을 나누는 컨테이너 (overflow hidden으로 밖으로 나간 텍스트를 자름)
const LineWrapper = styled.div`
  overflow: hidden;
  line-height: 1.2;
`;

// 실제 단어(Word) 텍스트가 들어가는 요소
const WordSpan = styled.span`
  display: inline-block;
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre; /* 공백 유지 */
  transform-origin: 0% 50%; /* 회전 축을 왼쪽 중앙으로 */
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Gsap14_TextSplitReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);

  // 무료 환경에서 프리미엄 SplitText 플러그인 없이 React로 텍스트 분리 구현
  const text = "Transform Your Digital Experience";
  const words = text.split(' ');

  useGSAP(() => {
    // '.split-word'를 찾아 한 번에 위로 튕기듯 나타나는 애니메이션 적용
    gsap.from('.split-word', {
      y: '120%',        // 아래로 완전히 숨어있는 상태에서 시작
      rotationZ: 10,    // 약간 틀어진 상태에서
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)',
      stagger: 0.08,    // 0.08초 간격으로 단어마다 차례대로 애니메이션
    });
  }, { scope: containerRef, dependencies: [toggle] });

  const codeString = `// 1. 순수 React 코드로 텍스트를 단어(Word) 단위로 쪼갭니다.
const text = "Transform Your Digital Experience";
const words = text.split(' ');

// 2. 단어를 감싸는 부모(LineWrapper)에 overflow: hidden을 주어 마스크 영역을 만듭니다.
// 3. 자식인 단어(WordSpan)를 translateY('120%')로 내려 숨긴 뒤 스태거로 밀어 올립니다.
useGSAP(() => {
  gsap.from('.split-word', {
    y: '120%',       // 마스크 영역 아래로 120% 숨김
    rotationZ: 10,   // 살짝 회전된 상태에서 정자세로
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.5)',
    stagger: 0.08,   // 단어별 0.08초 시차
  });
});

return (
  <LineWrapper>
    {words.map((word, i) => (
      <WordSpan key={i} className="split-word">
        {word}{' '}
      </WordSpan>
    ))}
  </LineWrapper>
);`;

  return (
    <SamplePageLayout
      title="14. 텍스트 스플릿 리빌 (Text Split Reveal)"
      description="텍스트를 단어(Word)나 글자(Char) 단위로 쪼개어, 보이지 않는 마스크 영역 아래에서 하나씩 솟아오르는(Stagger) 고급 타이포그래피 애니메이션입니다."
      learningPoints={[
        '유료 플러그인인 SplitText가 없어도 React의 문자열 조작(text.split)과 Array.map을 이용해 완벽한 커스텀 텍스트 스플리터를 만들 수 있습니다.',
        'overflow: hidden 속성을 가진 부모 요소(마스크) 안에서 자식 텍스트를 y축으로 이동시키면, 선을 그은 듯이 글자가 잘려있다가 올라오며 나타나는 세련된 효과를 줍니다.',
        '단순히 y축 이동만 하는 것보다 rotation(회전)이나 scale을 10% 정도 살짝 섞으면 모션이 훨씬 다이나믹해집니다.'
      ]}
      whyImportant="최신 포트폴리오 사이트에서 큰 헤드라인 텍스트가 페이지 진입 시 한 글자씩 춤추듯 나타나는 텍스트 등장 연출의 필수 구현 공식입니다."
    >
      <StyledCard>
        <div style={{ marginBottom: '20px' }}>
          <StyledButton onClick={() => setToggle(!toggle)} variant="primary">
            텍스트 다시 재생 (Re-play)
          </StyledButton>
        </div>

        <div ref={containerRef}>
          <TitleContainer>
            {/* 단어를 감싸는 부모 (마스크 역할) */}
            <LineWrapper>
              {words.map((word, i) => (
                <WordSpan key={i} className="split-word">
                  {word}{' '}
                </WordSpan>
              ))}
            </LineWrapper>
          </TitleContainer>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap14_TextSplitReveal.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
