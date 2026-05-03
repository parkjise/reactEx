import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

// === Styled Components for Modal ===
const ModalDim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 30px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1001;
`;

// === Component ===
export const Gsap04_ModalToast: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 모달 영역 전체를 묶을 참조
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  
  // GSAP 타임라인 인스턴스를 보관하기 위한 상태 (역재생을 위함)
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 Timeline 생성 (시작 시 일시정지 상태)
    const timeline = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        // 애니메이션이 완전히 역재생되어 닫히면 실제 React 상태 변경 (Unmount)
        setIsOpen(false);
      }
    });

    // Dim 배경은 opacity 페이드 인
    timeline.from('.modal-dim', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    })
    // 팝업 컨텐츠는 크기가 커지면서 살짝 올라옴
    .from('.modal-box', {
      scale: 0.8,
      y: 30,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.5)'
    }, '-=0.1');

    setTl(timeline);
    
    // 컴포넌트 마운트 후 즉시 플레이
    timeline.play();
  }, { scope: modalWrapperRef, dependencies: [isOpen] });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = contextSafe(() => {
    // 닫기 버튼 클릭 시, 상태를 바로 false로 바꾸지 않고 타임라인을 역재생(Reverse)시킵니다.
    // onReverseComplete 콜백에서 setIsOpen(false)가 호출되어 최종적으로 언마운트됩니다.
    if (tl) {
      tl.reverse();
    }
  });

  const codeString = `// 상태가 true일 때 타임라인을 생성하고 play() 합니다.
useGSAP(() => {
  if (!isOpen) return;

  const timeline = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      // 3. 역재생이 끝난 시점에 React State를 변경하여 DOM에서 완전히 언마운트!
      setIsOpen(false);
    }
  });

  timeline.from('.modal-dim', { opacity: 0, duration: 0.3 })
          .from('.modal-box', { scale: 0.8, y: 30, opacity: 0, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.1');

  setTl(timeline);
  timeline.play(); // 1. 모달 열릴 때 정방향 재생
}, { scope: modalWrapperRef, dependencies: [isOpen] });

const handleClose = contextSafe(() => {
  if (tl) {
    tl.reverse(); // 2. 닫기 버튼 클릭 시 역방향 재생 시작
  }
});`;

  return (
    <SamplePageLayout
      title="4. 모달 역재생 (Reverse) 애니메이션"
      description="React 조건부 렌더링(isOpen) 환경에서, 모달이 닫힐 때 상태를 바로 false로 바꾸지 않고 애니메이션 역재생(Reverse)이 완료된 후 언마운트하는 기법입니다."
      learningPoints={[
        'React에서 닫기 버튼을 누르자마자 setIsOpen(false)를 호출하면 닫히는 애니메이션을 볼 새도 없이 돔이 날아갑니다.',
        '타임라인의 onReverseComplete 콜백을 활용하여, 역재생 애니메이션이 시각적으로 끝난 후에 상태를 변경하여 DOM을 안전하게 제거합니다.',
        '이러한 패턴은 모달, 토스트 팝업, 드롭다운 메뉴, 햄버거 메뉴 등 열림/닫힘 상태를 가지는 모든 UI에 공통적으로 적용됩니다.'
      ]}
      whyImportant="Framer Motion 같은 라이브러리의 <AnimatePresence> 기능 없이도 GSAP 타임라인의 reverse() 기능을 활용해 우아한 퇴장 애니메이션을 구현하는 완벽한 실무 패턴입니다."
    >
      <StyledCard>
        <StyledButton onClick={handleOpen} variant="primary">
          모달 열기 (Play Animation)
        </StyledButton>

        {/* Portal을 사용하지 않고 화면 내에 시연하기 위해 위치 조정 */}
        <div ref={modalWrapperRef}>
          {isOpen && (
            <ModalDim className="modal-dim" onClick={handleClose}>
              <ModalContent className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginBottom: '15px' }}>GSAP Animated Modal</h3>
                <p style={{ color: 'gray', marginBottom: '25px', lineHeight: '1.5' }}>
                  이 모달은 나타날 때 GSAP 타임라인을 통해 Dim 배경과 Box가 순차적으로 부드럽게 렌더링됩니다.
                  닫기 버튼을 누르면 즉시 사라지지 않고, 애니메이션이 거꾸로 재생된 후 DOM 트리에서 삭제됩니다.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <StyledButton variant="outline" onClick={handleClose}>취소 (Reverse)</StyledButton>
                  <StyledButton variant="primary" onClick={handleClose}>확인 (Reverse)</StyledButton>
                </div>
              </ModalContent>
            </ModalDim>
          )}
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="ModalAnimation.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
