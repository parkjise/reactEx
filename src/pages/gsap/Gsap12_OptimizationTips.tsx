import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

const TipSection = styled.div`
  margin-bottom: 40px;
  
  h3 {
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '🚨';
    }
  }

  p {
    line-height: 1.6;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Gsap12_OptimizationTips: React.FC = () => {
  const codeTip1 = `// ❌ 최악의 방식: React 생태계 파괴 (메모리 누수 폭발)
useEffect(() => {
  gsap.to('.box', { x: 100 });
}, []);

// ⚠️ 좋지 않은 방식: 수동 Cleanup (코드량 증가, 실수 여지 많음)
useEffect(() => {
  let ctx = gsap.context(() => {
    gsap.to('.box', { x: 100 });
  });
  return () => ctx.revert(); // 꼭 클린업을 해줘야 함
}, []);

// ✅ 완벽한 방식: @gsap/react의 useGSAP 활용
useGSAP(() => {
  gsap.to('.box', { x: 100 });
}); // 내부적으로 알아서 cleanup 해줌`;

  const codeTip2 = `// ❌ 성능 깎아먹는 안티패턴 (Layout Thrashing 발생)
gsap.to('.box', {
  top: 100,      // CPU 연산: 레이아웃 재계산 (Reflow)
  left: 200,     // CPU 연산: 레이아웃 재계산 (Reflow)
  width: 500,    // CPU 연산: 레이아웃 재계산 (Reflow)
  height: 300    // CPU 연산: 레이아웃 재계산 (Reflow)
});

// ✅ 최적화된 하드웨어 가속 패턴 (GPU 사용)
gsap.to('.box', {
  y: 100,        // GPU 연산: Composite (빠름)
  x: 200,        // GPU 연산: Composite (빠름)
  scaleX: 2.5,   // GPU 연산: Composite (빠름)
  scaleY: 1.5    // GPU 연산: Composite (빠름)
});`;

  const codeTip3 = `useGSAP(() => {
  // ❌ 무작정 body, document 전체에서 탐색 (타 컴포넌트 클래스와 충돌)
  gsap.to('.header-title', { opacity: 1 });

}, []);

// ✅ 컴포넌트 내부 DOM 영역(scope)으로 한정하여 안전하게 탐색
const containerRef = useRef(null);

useGSAP(() => {
  gsap.to('.header-title', { opacity: 1 });
}, { scope: containerRef }); // containerRef.current.querySelectorAll() 과 동일한 효과`;

  return (
    <SamplePageLayout
      title="12. 성능 최적화 및 자주 하는 실수 (실무 팁)"
      description="GSAP을 실무에 적용할 때 렌더링 퍼포먼스를 극대화하고, 버그를 예방하기 위해 반드시 알아야 할 모범 사례 모음입니다."
    >
      <StyledCard>
        <TipSection>
          <h3>React StrictMode 대응 및 Cleanup 누락 방지</h3>
          <p>
            React 18의 StrictMode 환경에서는 컴포넌트가 마운트, 언마운트, 다시 마운트 되는 과정을 거칩니다.<br/>
            이 때 일반적인 <code>useEffect</code> 안에서 GSAP 애니메이션을 호출하면, 이전에 생성된 애니메이션이 메모리에 남아 애니메이션이 두 번 겹쳐서 실행(글자가 흔들림, 박스가 왔다갔다 함)되는 심각한 버그가 발생합니다.<br/>
            반드시 <b>@gsap/react</b> 라이브러리의 <code>useGSAP</code> 훅을 사용하여 내부적인 자동 클린업의 이점을 취해야 합니다.
          </p>
          <CodeViewer rawCode={codeTip1} language="tsx" filename="AntiPattern_1.tsx" />
        </TipSection>

        <TipSection>
          <h3>Top, Left, Width, Height 애니메이션 절대 지양</h3>
          <p>
            CSS에서 위치(top/left)와 크기(width/height) 속성을 변경하면 브라우저는 화면 전체의 레이아웃을 다시 계산(Reflow/Layout Thrashing)해야 하므로 프레임 드랍(버벅임)이 발생합니다.<br/>
            애니메이션 성능을 60fps로 부드럽게 유지하려면, 반드시 브라우저의 GPU(그래픽 카드)를 활용할 수 있는 <b>transform 계열(x, y, scale, rotation)</b>과 <b>opacity</b> 속성만으로 구현해야 합니다.
          </p>
          <CodeViewer rawCode={codeTip2} language="tsx" filename="Optimization_2.tsx" />
        </TipSection>

        <TipSection>
          <h3>document.querySelector 남발 및 Scope 충돌</h3>
          <p>
            GSAP의 기본 타겟 문자열 선택자(예: <code>'.box'</code>)는 내부적으로 <code>document.querySelectorAll</code>을 사용합니다.<br/>
            A 컴포넌트와 B 컴포넌트에 똑같이 <code>.box</code> 클래스가 있을 경우, A 컴포넌트의 애니메이션이 B 컴포넌트의 엘리먼트까지 움직이게 만드는 참사가 일어납니다.<br/>
            <code>useGSAP</code>의 <b>scope</b> 옵션을 컴포넌트 최상단 컨테이너 ref로 할당하면, 이 문제를 완벽하게 차단할 수 있습니다.
          </p>
          <CodeViewer rawCode={codeTip3} language="tsx" filename="Scope_3.tsx" />
        </TipSection>
      </StyledCard>
    </SamplePageLayout>
  );
};
