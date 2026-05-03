import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const KPICard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .label {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 10px;
  }

  .number {
    font-size: 3rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Gsap09_NumberCounter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);

  useGSAP(() => {
    // 1. 숫자가 들어갈 요소들을 가져옵니다.
    const counters = gsap.utils.toArray('.number') as HTMLElement[];

    counters.forEach((counter) => {
      // DOM에 저장해둔 목표값(data-target)을 숫자로 변환
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      
      // 초기값을 0으로 세팅
      counter.innerText = '0';

      // 2. 가상의 객체({ val: 0 })를 만들고, 이 객체의 val 속성을 target 값까지 애니메이션 시킵니다.
      // onUpdate 콜백에서 매 프레임마다 변경되는 val 값을 DOM에 업데이트합니다.
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function () {
          // this.targets()[0]은 현재 애니메이션 중인 가상 객체 { val: ... }
          const currentVal = this.targets()[0].val;
          // 소수점이 있는 경우(달러 등)와 없는 경우를 분기 처리 (간단히 Math.floor 사용)
          // 여기서는 천 단위 콤마(toLocaleString)를 추가하여 포맷팅
          counter.innerText = Math.floor(currentVal).toLocaleString();
        }
      });
    });
  }, { scope: containerRef, dependencies: [toggle] });

  const codeString = `useGSAP(() => {
  const counters = gsap.utils.toArray('.number') as HTMLElement[];

  counters.forEach((counter) => {
    const target = parseFloat(counter.dataset.target || '0');
    
    // GSAP은 DOM 요소뿐만 아니라 일반 JS 객체의 속성값도 애니메이션 시킬 수 있습니다.
    gsap.to({ val: 0 }, { // 가상의 시작 객체
      val: target,        // 목표 값
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        // 매 프레임마다 실행되는 콜백
        const currentVal = this.targets()[0].val;
        // 반올림 및 콤마 포맷팅 적용 후 DOM 업데이트
        counter.innerText = Math.floor(currentVal).toLocaleString();
      }
    });
  });
});

return (
  <div className="number" data-target="15200">0</div>
);`;

  return (
    <SamplePageLayout
      title="9. 대시보드 숫자 카운터 (Number Counting)"
      description="0에서부터 특정 목표 숫자까지 빠르게 올라가는 숫자 카운팅 애니메이션 패턴입니다."
      learningPoints={[
        'GSAP은 DOM 요소의 css 속성뿐만 아니라, 일반 자바스크립트 객체({ val: 0 })의 프로퍼티 값도 애니메이션 시킬 수 있습니다.',
        'onUpdate 훅을 사용하면 매 프레임(보통 1초에 60번)마다 변경되는 중간값을 가로채서 DOM(innerText)에 업데이트할 수 있습니다.',
        '단순 숫자 증가 외에도 toLocaleString() 을 섞어 천 단위 콤마를 표현하거나 통화 단위 기호를 붙이는 등 자유로운 커스텀이 가능합니다.'
      ]}
      whyImportant="대시보드 KPI, 앱 다운로드 수, 누적 결제액 등 랜딩 페이지에서 수치(Data)를 강조할 때 무조건 들어가는 약방의 감초 같은 애니메이션입니다."
    >
      <StyledCard>
        <div style={{ marginBottom: '20px' }}>
          <StyledButton onClick={() => setToggle(!toggle)} variant="primary">
            다시 카운트 (Re-run)
          </StyledButton>
        </div>

        <div ref={containerRef}>
          <DashboardGrid>
            <KPICard>
              <div className="label">Total Users</div>
              <div className="number" data-target="125400">0</div>
            </KPICard>
            <KPICard>
              <div className="label">Monthly Revenue ($)</div>
              <div className="number" data-target="48500">0</div>
            </KPICard>
            <KPICard>
              <div className="label">Daily Active Users</div>
              <div className="number" data-target="8420">0</div>
            </KPICard>
          </DashboardGrid>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="NumberCounter.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
