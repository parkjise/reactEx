// src/pages/styled/StyledToastSample.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { StyledToast, type ToastType } from '../../components/styled/StyledToast';
import { CodeViewer } from '../../components/CodeViewer';

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const StyledToastSample: React.FC = () => {
  const [toastConfig, setToastConfig] = useState<{ isVisible: boolean; message: string; type: ToastType }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const showToast = (message: string, type: ToastType) => {
    // 기존 토스트를 숨기고 짧은 지연 후 다시 띄움 (애니메이션 리셋 목적)
    setToastConfig({ ...toastConfig, isVisible: false });
    setTimeout(() => {
      setToastConfig({ isVisible: true, message, type });
    }, 100);
  };

  const codeString = `// 토스트 상태 관리
const [isVisible, setIsVisible] = useState(false);

<StyledButton onClick={() => setIsVisible(true)}>
  저장하기
</StyledButton>

// 전역 또는 최상단 레이아웃에 위치
<StyledToast 
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  message="성공적으로 저장되었습니다!"
  type="success" // 'success' | 'error' | 'info'
  duration={3000} // 3초 뒤 자동 사라짐
/>`;

  return (
    <SamplePageLayout
      title="11. Toast 알림"
      description="우측 하단에서 부드럽게 나타나고 일정 시간 후 자동으로 사라지는 Toast 메시지 패턴입니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>
          Toast는 <code>@keyframes</code> 애니메이션과 <code>setTimeout</code>을 결합하여 구현합니다.
          보통 Context API나 Zustand와 결합하여 전역 함수로 호출하는 것이 실무 표준입니다.
        </p>

        <ButtonRow>
          <StyledButton 
            variant="primary" 
            onClick={() => showToast('새로운 메시지가 도착했습니다.', 'info')}
          >
            Info Toast
          </StyledButton>
          
          <StyledButton 
            style={{ backgroundColor: 'var(--success)' }}
            onClick={() => showToast('성공적으로 저장되었습니다!', 'success')}
          >
            Success Toast
          </StyledButton>
          
          <StyledButton 
            variant="danger" 
            onClick={() => showToast('서버 통신 중 오류가 발생했습니다.', 'error')}
          >
            Error Toast
          </StyledButton>
        </ButtonRow>

        <StyledToast 
          isVisible={toastConfig.isVisible}
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => setToastConfig({ ...toastConfig, isVisible: false })}
        />

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Toast Usage" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
