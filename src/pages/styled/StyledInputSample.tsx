// src/pages/styled/StyledInputSample.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledInput } from '../../components/styled/StyledInput';
import { StyledSelect } from '../../components/styled/StyledSelect';
import { StyledCheckbox } from '../../components/styled/StyledCheckbox';
import { CodeViewer } from '../../components/CodeViewer';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledInputSample: React.FC = () => {
  const [agree, setAgree] = useState(false);

  const codeString = `/* [설명]
입력 컴포넌트는 label, error, disabled 상태를 함께 다뤄야 실무 폼에서 재사용하기 좋습니다.
공통 Input, Select, Checkbox를 분리하면 회원가입, 검색 필터, 관리자 설정 폼에서 같은 UX를 유지할 수 있습니다.
*/
// 1. 기본 Input
<StyledInput label="이름" placeholder="이름을 입력하세요" fullWidth />

// 2. 에러 상태 Input
<StyledInput 
  label="이메일" 
  placeholder="example@email.com" 
  error="유효하지 않은 이메일 형식입니다." 
  fullWidth 
/>

// 3. Select 컴포넌트
<StyledSelect 
  label="부서 선택" 
  options={[
    { label: '개발팀', value: 'dev' },
    { label: '디자인팀', value: 'design' }
  ]} 
  fullWidth 
/>

// 4. Checkbox 컴포넌트
<StyledCheckbox 
  label="이용약관에 동의합니다." 
  checked={agree} 
  onChange={(e) => setAgree(e.target.checked)} 
/>`;

  return (
    <SamplePageLayout
      title="4. 공통 Form 컴포넌트 (Input, Select, Checkbox)"
      description="상태(Error, Disabled), 라벨(Label), 아이콘(Icon)을 일관성 있게 관리하는 Form Elements 컴포넌트 샘플입니다."
    >
      <StyledCard>
        <FormGrid>
          <StyledInput 
            label="이름 (기본)" 
            placeholder="홍길동" 
            fullWidth 
          />
          <StyledInput 
            label="비밀번호 (Disabled)" 
            type="password" 
            placeholder="비밀번호 입력불가" 
            disabled 
            fullWidth 
          />
          
          <StyledInput 
            label="이메일 주소 (Error State)" 
            type="email" 
            placeholder="example@email.com" 
            error="이미 가입된 이메일 주소입니다."
            defaultValue="wrong-email"
            fullWidth 
          />
          <StyledSelect 
            label="부서 선택" 
            options={[
              { label: '개발팀', value: 'dev' },
              { label: '디자인팀', value: 'design' },
              { label: '기획팀', value: 'pm' },
            ]}
            fullWidth
          />
        </FormGrid>

        <div style={{ marginBottom: '24px' }}>
          <StyledCheckbox 
            label="이용약관에 동의합니다. (클릭해보세요)" 
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
        </div>

        <CodeViewer rawCode={codeString} language="tsx" filename="Form Usage" />
      </StyledCard>
    </SamplePageLayout>
  );
};
