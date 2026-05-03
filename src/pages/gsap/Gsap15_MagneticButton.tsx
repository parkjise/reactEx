import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const DemoSpace = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

const MagneticWrapper = styled.div`
  /* 자석 효과를 받을 범위를 정합니다 (마우스가 이 영역에 들어오면 반응) */
  padding: 40px;
  display: inline-block;
`;

const MagneticBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  /* GSAP 애니메이션 충돌 방지를 위해 css transition은 넣지 않습니다 */
`;

const MagneticText = styled.span`
  display: inline-block;
  pointer-events: none; /* 텍스트는 이벤트의 중심에 방해되지 않도록 */
`;

export const Gsap15_MagneticButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { contextSafe } = useGSAP({ scope: containerRef });

  // 마우스 이동 시 자석 효과
  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = e.currentTarget;
    const btn = wrapper.querySelector('.magnetic-btn');
    const text = wrapper.querySelector('.magnetic-text');

    if (!btn || !text) return;

    // getBoundingClientRect()를 통해 래퍼의 화면상 위치와 크기 계산
    const rect = wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 중심점에서 마우스까지의 거리를 계산 (당기는 힘 계수)
    // 버튼은 마우스 방향으로 크게, 텍스트는 약간 적게 이동시켜 시차(Parallax) 생성
    const distanceX = (e.clientX - centerX) * 0.4;
    const distanceY = (e.clientY - centerY) * 0.4;

    gsap.to(btn, {
      x: distanceX,
      y: distanceY,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(text, {
      x: distanceX * 0.5, // 텍스트는 버튼 이동량의 절반만
      y: distanceY * 0.5,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  // 마우스 아웃 시 원래 위치로 복귀 (용수철 효과)
  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = e.currentTarget;
    const btn = wrapper.querySelector('.magnetic-btn');
    const text = wrapper.querySelector('.magnetic-text');

    gsap.to([btn, text], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)', // 띠용~ 하고 제자리로 돌아오는 탄성 이징
    });
  });

  const codeString = `const handleMouseMove = contextSafe((e) => {
  const wrapper = e.currentTarget;
  const btn = wrapper.querySelector('.magnetic-btn');
  const text = wrapper.querySelector('.magnetic-text');

  // 요소의 정중앙 좌표 찾기
  const rect = wrapper.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 마우스와 중앙 간의 거리에 0.4(텐션 값)를 곱해 목표 이동 위치 계산
  const distanceX = (e.clientX - centerX) * 0.4;
  const distanceY = (e.clientY - centerY) * 0.4;

  gsap.to(btn, { x: distanceX, y: distanceY, duration: 0.3, ease: 'power2.out' });
  // 텍스트는 거리를 0.5배만 주어 버튼 배경과 텍스트 사이의 패럴랙스(시차) 부여
  gsap.to(text, { x: distanceX * 0.5, y: distanceY * 0.5, duration: 0.3, ease: 'power2.out' });
});

const handleMouseLeave = contextSafe((e) => {
  // 마우스가 영역을 벗어나면 제자리(x:0, y:0)로 띠용(elastic) 하고 돌아옴
  gsap.to([btn, text], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
});

return (
  <MagneticWrapper onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
    <MagneticBtn className="magnetic-btn">
      <MagneticText className="magnetic-text">Hover Me</MagneticText>
    </MagneticBtn>
  </MagneticWrapper>
);`;

  return (
    <SamplePageLayout
      title="15. 물리 기반 자석 버튼 (Magnetic Button)"
      description="마우스 커서 근처로 버튼이 자석처럼 끌려오고, 버튼 안의 텍스트는 조금 덜 끌려오게 만들어 입체감과 탄성(Elastic)을 부여하는 트렌디한 마이크로 인터랙션입니다."
      learningPoints={[
        '요소를 감싸는 큰 부모 영역(MagneticWrapper)에 onMouseMove 이벤트를 걸어 마우스가 근처에 왔을 때부터 반응하도록 만듭니다.',
        '마우스 커서의 브라우저 좌표(clientX/Y)와 요소의 중심 좌표 간의 거리 편차를 구해 gsap.to()의 x, y 값으로 변환합니다.',
        'onMouseLeave 이벤트 발생 시 x:0, y:0 으로 되돌리며 ease: "elastic.out" 속성을 주면 물리적으로 튕기는 용수철 느낌을 완벽하게 구현할 수 있습니다.'
      ]}
      whyImportant="해외 어워드 웹사이트에서 CTA(Call To Action) 버튼의 클릭 전환율을 높이기 위해 사용자에게 '빨리 클릭하고 싶어지는 손맛'을 제공하는 일급 기법입니다."
    >
      <StyledCard>
        <div ref={containerRef}>
          <DemoSpace>
            {/* 호버 감지 범위를 넓히기 위한 Wrapper */}
            <MagneticWrapper 
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseLeave}
            >
              <MagneticBtn className="magnetic-btn">
                <MagneticText className="magnetic-text">Magnetic Hover</MagneticText>
              </MagneticBtn>
            </MagneticWrapper>
          </DemoSpace>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap15_MagneticButton.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
