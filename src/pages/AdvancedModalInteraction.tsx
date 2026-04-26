import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';

// --- Styled Components ---
const Overlay = styled.div<{ $isOpen: boolean; $zIndex: number }>`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: ${({ $zIndex }) => $zIndex};
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;

  .close-btn {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.2rem;
    &:hover { color: ${({ theme }) => theme.colors.error}; }
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// --- Reusable Modal Component ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  zIndex?: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, zIndex = 1000 }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 1. ESC 키로 닫기
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 2. 배경 스크롤 막기 (Body Lock)
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // 3. 외부 영역 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <Overlay $isOpen={isOpen} $zIndex={zIndex} onClick={handleOverlayClick}>
      <ModalBox ref={modalRef}>
        <ModalHeader>
          {title}
          <i className="ri-close-line close-btn" onClick={onClose} />
        </ModalHeader>
        {children}
      </ModalBox>
    </Overlay>
  );
};

// --- Page Component ---
export const AdvancedModalInteraction: React.FC = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  return (
    <SamplePageLayout
      title="고급 모달 (Modal) 인터랙션"
      icon="ri-window-line"
      description="ESC 키 닫기, 외부 영역 클릭, 배경 스크롤 잠금, 다중 모달(Stack) 등 실무에서 요구하는 모달의 모든 예외 처리를 담았습니다."
      learningPoints={[
        'useEffect를 활용한 body overflow: hidden 제어로 배경 스크롤 원천 차단',
        'document keydown 이벤트 리스너를 통한 ESC 키 닫기 지원',
        'Overlay 클릭과 ModalBox 클릭을 구분(contains)하여 외부 영역 클릭 감지',
        'z-index를 다르게 부여하여 여러 개의 모달이 겹쳤을 때(Stack)의 자연스러운 처리',
      ]}
      whyImportant="단순히 열고 닫히는 모달은 쉽지만, '모달이 열렸는데 뒤에 있는 페이지가 스크롤 된다거나', '모달 위에 뜬 두 번째 모달을 닫으려다 첫 번째 모달까지 닫혀버리는' 등의 UX 결함은 치명적입니다. 이를 방지하는 표준 패턴입니다."
    >
      <Button onClick={() => setIsFirstModalOpen(true)} variant="primary" size="large">
        첫 번째 모달 열기
      </Button>

      {/* 첫 번째 모달 */}
      <Modal 
        isOpen={isFirstModalOpen} 
        onClose={() => setIsFirstModalOpen(false)} 
        title="기본 설정 모달"
      >
        <ModalBody>
          <p>이 모달은 바깥 영역을 클릭하거나 ESC 키를 누르면 닫힙니다.</p>
          <p>모달이 떠 있는 동안 뒤쪽 배경은 스크롤되지 않습니다.</p>
          <div style={{ marginTop: '20px' }}>
            <Button onClick={() => setIsSecondModalOpen(true)} variant="outline">
              두 번째 모달 띄우기 (Stack)
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsFirstModalOpen(false)}>취소</Button>
          <Button variant="primary" onClick={() => setIsFirstModalOpen(false)}>저장</Button>
        </ModalFooter>
      </Modal>

      {/* 두 번째 모달 (z-index가 더 높음) */}
      <Modal 
        isOpen={isSecondModalOpen} 
        onClose={() => setIsSecondModalOpen(false)} 
        title="확인 다이얼로그"
        zIndex={1010}
      >
        <ModalBody>
          <p>정말로 이 설정을 적용하시겠습니까?</p>
          <p style={{ color: '#EE5D50', fontSize: '0.85rem', marginTop: '10px' }}>
            * 두 번째 모달을 ESC로 닫으면 첫 번째 모달은 유지됩니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsSecondModalOpen(false)}>아니오</Button>
          <Button variant="primary" onClick={() => {
            setIsSecondModalOpen(false);
            setIsFirstModalOpen(false);
            alert('설정이 모두 저장되었습니다.');
          }}>
            네, 모두 저장합니다
          </Button>
        </ModalFooter>
      </Modal>

    </SamplePageLayout>
  );
};

/*
[설명]
고급 모달 제어 패턴의 핵심입니다.

실무 패턴:
- `document.body.style.overflow = 'hidden';`을 통해 모달이 열렸을 때 배경 스크롤을 막고, 컴포넌트 언마운트 시 반드시 클린업(`unset`) 해줍니다.
- 다중 모달(Stack)의 경우, 이벤트 전파(Event Bubbling)나 상태 관리의 꼬임 현상을 막기 위해 각 모달을 독립적인 렌더 트리와 각각 다른 `z-index` 값으로 띄워 관리합니다.
*/
