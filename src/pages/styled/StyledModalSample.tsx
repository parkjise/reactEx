// src/pages/styled/StyledModalSample.tsx
import React, { useState } from 'react';

import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { StyledModal } from '../../components/styled/StyledModal';
import { CodeViewer } from '../../components/CodeViewer';

export const StyledModalSample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const codeString = `// 모달 사용 예시
<StyledButton onClick={() => setIsModalOpen(true)}>
  모달 열기
</StyledButton>

<StyledModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  title="사용자 권한 승인"
  width="500px"
  footer={
    <>
      <StyledButton variant="secondary" onClick={() => setIsModalOpen(false)}>
        취소
      </StyledButton>
      <StyledButton variant="primary" onClick={() => setIsModalOpen(false)}>
        승인
      </StyledButton>
    </>
  }
>
  <p>홍길동 사용자의 관리자 권한을 승인하시겠습니까?</p>
  <p style={{ marginTop: '10px', color: 'gray' }}>
    승인 후 즉시 시스템의 모든 설정 권한을 가지게 됩니다.
  </p>
</StyledModal>`;

  return (
    <SamplePageLayout
      title="10. Modal UI"
      description="createPortal을 사용하여 DOM 최상단에 렌더링되며, 애니메이션과 오버레이 기능을 포함한 모달 컴포넌트입니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>
          실무에서 모달은 z-index 꼬임을 방지하기 위해 <code>React.createPortal</code>을 사용하여 body 끝에 렌더링하는 패턴을 주로 사용합니다.
        </p>

        <StyledButton onClick={() => setIsModalOpen(true)}>
          모달 띄우기
        </StyledButton>

        <StyledModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="결제 확인"
          width="400px"
          footer={
            <>
              <StyledButton variant="ghost" onClick={() => setIsModalOpen(false)}>취소</StyledButton>
              <StyledButton variant="primary" onClick={() => setIsModalOpen(false)}>결제하기</StyledButton>
            </>
          }
        >
          <p>정말 결제를 진행하시겠습니까?</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
            <li>상품명: 최고급 마우스</li>
            <li>결제 금액: 99,000원</li>
          </ul>
        </StyledModal>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Modal Usage" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
