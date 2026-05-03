// src/pages/styled/StyledStatesSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

const InteractiveBox = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  /* Hover 상태 */
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(49, 106, 255, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 106, 255, 0.15);
  }

  /* Active (클릭하는 순간) 상태 */
  &:active {
    transform: translateY(0);
    background-color: rgba(49, 106, 255, 0.1);
    box-shadow: none;
  }
`;

const DisabledBox = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textMuted};
  
  /* 비활성화 상태 표현 */
  cursor: not-allowed;
  opacity: 0.6;

  /* 호버 효과 원천 차단 */
  &:hover {
    /* 변화 없음 */
  }
`;

export const StyledStatesSample: React.FC = () => {
  const codeString = `/* [설명]
Hover, active, focus, disabled 상태는 버튼과 카드의 사용 가능 여부와 현재 상호작용을 알려주는 기본 피드백입니다.
특히 focus-visible은 키보드 사용자를 위한 접근성 표시이므로 제거하지 않고 디자인에 맞게 조정합니다.
*/
const InteractiveBox = styled.div\`
  cursor: pointer;
  transition: all 0.2s ease;

  /* Hover (마우스 올림) */
  &:hover {
    border-color: \${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  /* Active (클릭하는 순간) */
  &:active {
    transform: translateY(0);
    background-color: rgba(49, 106, 255, 0.1);
  }
\`;

const DisabledBox = styled.div\`
  cursor: not-allowed;
  opacity: 0.6;
\`;`;

  return (
    <SamplePageLayout
      title="19. 상태 (Hover/Active/Disabled) 처리"
      description="의사 클래스(Pseudo-class)를 활용하여 마우스 인터랙션과 컴포넌트 비활성화 상태를 세련되게 스타일링하는 패턴입니다."
    >
      <StyledCard>
        <h3>1. Interactive State (Hover & Active)</h3>
        <p style={{ color: 'gray', marginBottom: '20px' }}>마우스를 올리고 클릭(꾹 누르기)해 보세요. 부드러운 트랜지션과 액션 피드백이 적용되어 있습니다.</p>
        
        <InteractiveBox>
          Hover and Click Me!
        </InteractiveBox>

        <h3 style={{ marginTop: '40px' }}>2. Disabled State</h3>
        <p style={{ color: 'gray', marginBottom: '20px' }}>인터랙션이 비활성화된 상태입니다. 커서가 금지 표시로 바뀌고 색상이 옅어집니다.</p>

        <DisabledBox>
          Disabled Element
        </DisabledBox>

        <div style={{ marginTop: '40px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="States Styling" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
