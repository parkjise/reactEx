import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ActionGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      isValid = false;
    } else if (!email.includes('@')) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('비밀번호는 6자리 이상이어야 합니다.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(`로그인 성공: ${email}`);
    }
  };

  return (
    <SamplePageLayout
      title="기본 로그인 폼"
      icon="ri-login-box-line"
      description="제어 컴포넌트(useState)와 공통 UI 컴포넌트(Input, Button)를 결합한 실무 표준 로그인 폼입니다."
      learningPoints={[
        '공통 컴포넌트를 활용하여 일관된 디자인 시스템 유지',
        '개별 필드에 대한 실시간/제출 시점 에러 메시지 렌더링',
        '에러 상태에 따른 UI 자동 변경 (빨간색 테두리 등)',
      ]}
      whyImportant="관리자/ERP 시스템의 모든 시작점입니다. 자체 구축한 공통 Input과 Button을 사용하면 추후 디자인 변경이 있을 때 모든 페이지를 일일이 수정할 필요 없이 한 번에 반영할 수 있습니다."
    >
      <FormContainer>
        <Form onSubmit={handleSubmit} noValidate>
          <Input
            label="이메일"
            type="email"
            icon="ri-mail-line"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <Input
            label="비밀번호"
            type="password"
            icon="ri-lock-password-line"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          
          <ActionGroup>
            <Button type="submit" variant="primary" fullWidth size="large" icon="ri-login-circle-line">
              로그인
            </Button>
            <Button type="button" variant="ghost" fullWidth>
              비밀번호 찾기
            </Button>
          </ActionGroup>
        </Form>
      </FormContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
자체 제작한 `Input`과 `Button` 공통 컴포넌트를 사용한 로그인 페이지입니다.

실무 패턴:
- 순수 `<input>` 태그 대신 `icon`, `error`, `label` 속성을 한 번에 관리해주는 `<Input>` 컴포넌트를 사용합니다.
- `noValidate` 속성을 폼에 주어 브라우저 기본 툴팁 대신 커스텀 에러 메시지(빨간 글씨)를 렌더링합니다.
- 비밀번호 찾기와 같은 보조 버튼은 `variant="ghost"`로 배치하여 시각적 위계를 낮췄습니다.
*/
