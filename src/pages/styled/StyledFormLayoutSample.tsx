// src/pages/styled/StyledFormLayoutSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledInput } from '../../components/styled/StyledInput';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;

  /* 모바일에서는 세로 배치 */
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledFormLayoutSample: React.FC = () => {
  const codeString = `const FormRow = styled.div\`
  display: flex;
  gap: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0;
  }
\`;

<FormContainer>
  <FormRow>
    <StyledInput label="이름" fullWidth />
    <StyledInput label="연락처" fullWidth />
  </FormRow>
  <StyledInput label="이메일" fullWidth />
  <StyledInput label="주소" fullWidth />
  
  <FormFooter>
    <StyledButton variant="outline">취소</StyledButton>
    <StyledButton variant="primary">저장하기</StyledButton>
  </FormFooter>
</FormContainer>`;

  return (
    <SamplePageLayout
      title="14. Form Layout"
      description="입력 폼 요소들을 Grid나 Flex를 사용하여 정렬하고, 모바일에서는 자동으로 세로 배치되도록 구성하는 실무 폼 레이아웃 패턴입니다."
    >
      <StyledCard>
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <FormRow>
            <StyledInput label="이름 (First Name)" placeholder="길동" fullWidth />
            <StyledInput label="성 (Last Name)" placeholder="홍" fullWidth />
          </FormRow>
          
          <StyledInput label="이메일 주소" type="email" placeholder="hong@example.com" fullWidth />
          
          <FormRow>
            <StyledInput label="비밀번호" type="password" fullWidth />
            <StyledInput label="비밀번호 확인" type="password" fullWidth />
          </FormRow>

          <StyledInput label="상세 주소" placeholder="서울특별시 강남구..." fullWidth />

          <FormFooter>
            <StyledButton variant="outline">초기화</StyledButton>
            <StyledButton variant="primary" type="submit">회원가입 완료</StyledButton>
          </FormFooter>
        </FormContainer>

        <div style={{ marginTop: '40px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Form Layout Structure" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
