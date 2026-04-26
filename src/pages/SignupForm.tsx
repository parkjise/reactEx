import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.85rem;
  margin-top: -16px;
`;

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    termsAgreed: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // 입력 시 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.termsAgreed) {
      newErrors.termsAgreed = '이용약관에 동의해야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(`회원가입 완료: ${formData.name}님 환영합니다!`);
    }
  };

  return (
    <SamplePageLayout
      title="회원가입 폼"
      icon="ri-user-add-line"
      description="다수의 입력 필드와 약관 동의 체크박스가 포함된 복합 상태 폼 예제입니다."
      learningPoints={[
        '객체 형태의 상태(formData)로 다수의 입력 필드 관리',
        '비밀번호 확인 등 서로 다른 필드 간의 교차 검증(Cross Validation)',
        '체크박스 상태(boolean)와 텍스트 상태(string)의 통합 핸들링',
      ]}
      whyImportant="신규 사용자 유입의 핵심 병목 지점입니다. 각 필드별로 명확한 에러를 보여주고, 입력 시 실시간으로 피드백을 주어 사용자가 포기하지 않도록 설계하는 것이 중요합니다."
    >
      <FormContainer>
        <Form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Input
              label="이름"
              name="name"
              icon="ri-user-line"
              placeholder="홍길동"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              label="이메일"
              name="email"
              type="email"
              icon="ri-mail-line"
              placeholder="hong@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="비밀번호"
              name="password"
              type="password"
              icon="ri-lock-line"
              placeholder="8자 이상"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Input
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              icon="ri-lock-check-line"
              placeholder="비밀번호 다시 입력"
              value={formData.passwordConfirm}
              onChange={handleChange}
              error={errors.passwordConfirm}
            />
          </FieldGroup>

          <CheckboxLabel>
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
            />
            [필수] 서비스 이용약관 및 개인정보 처리방침 동의
          </CheckboxLabel>
          {errors.termsAgreed && <ErrorText>{errors.termsAgreed}</ErrorText>}

          <Button type="submit" size="large" icon="ri-check-line">
            회원가입 완료
          </Button>
        </Form>
      </FormContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
여러 개의 입력 필드를 하나의 객체 상태(`formData`)로 통합 관리하는 회원가입 폼입니다.

실무 패턴:
- 필드가 3개를 넘어가면 개별 useState를 쓰지 않고 객체 형태로 모아서 관리합니다.
- `<input name="email" />`의 name 속성과 `e.target.name`을 활용해 단 하나의 `handleChange` 함수로 모든 입력을 처리합니다.
- 사용자가 에러가 난 필드를 다시 수정하려고 키보드를 누르는 순간(`onChange`), 해당 필드의 에러만 선별적으로 지워주어 UX를 높입니다.
*/
