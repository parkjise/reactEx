import React, { useState, useEffect } from 'react';
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

const ValidationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ValidationItem = styled.li<{ $isValid: boolean }>`
  font-size: 0.85rem;
  color: ${({ theme, $isValid }) => ($isValid ? theme.colors.success : theme.colors.textMuted)};
  display: flex;
  align-items: center;
  gap: 6px;

  i {
    font-size: 1.1rem;
    color: ${({ theme, $isValid }) => ($isValid ? theme.colors.success : theme.colors.textMuted)};
  }
`;

export const FormValidation: React.FC = () => {
  const [password, setPassword] = useState('');
  
  // 비밀번호 복잡도 조건 상태
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    specialChar: false,
  });

  // 실시간 유효성 검사 (Real-time Validation)
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isAllValid = Object.values(validations).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAllValid) {
      alert('비밀번호가 안전하게 설정되었습니다.');
    }
  };

  return (
    <SamplePageLayout
      title="실시간 유효성 검사 (Real-time Validation)"
      icon="ri-shield-check-line"
      description="사용자가 타이핑하는 즉시 조건 충족 여부를 시각적으로 피드백해주는 고급 폼 검증 예제입니다."
      learningPoints={[
        'useEffect를 활용한 입력값 변화 실시간 감지',
        '정규표현식(Regex)을 이용한 복잡도 검증 (숫자, 특수문자 포함 여부)',
        '조건 충족 시 초록색 체크마크로 즉각적인 성공 시각 피드백 제공',
      ]}
      whyImportant="비밀번호 변경이나 회원가입 시, 폼을 제출하고 나서야 '특수문자를 포함하세요'라는 에러를 보여주는 것은 매우 나쁜 UX입니다. 실시간 피드백은 사용자의 이탈률을 획기적으로 낮춥니다."
    >
      <FormContainer>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="새 비밀번호 설정"
            type="password"
            icon="ri-lock-password-line"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ValidationList>
            <ValidationItem $isValid={validations.length}>
              <i className={validations.length ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line"}></i>
              8자 이상 입력
            </ValidationItem>
            <ValidationItem $isValid={validations.number}>
              <i className={validations.number ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line"}></i>
              숫자 포함
            </ValidationItem>
            <ValidationItem $isValid={validations.specialChar}>
              <i className={validations.specialChar ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line"}></i>
              특수문자 포함
            </ValidationItem>
          </ValidationList>
          
          <Button type="submit" variant="primary" fullWidth size="large" disabled={!isAllValid}>
            비밀번호 변경
          </Button>
        </form>
      </FormContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
사용자가 입력하는 즉시(Real-time) 검증 상태를 업데이트하는 패턴입니다.

실무 패턴:
- `useEffect`의 의존성 배열에 검사할 상태(`password`)를 넣고, 변경될 때마다 정규식을 돌려 검증 객체를 갱신합니다.
- 복잡한 회원가입 폼에서는 개별 필드 에러(`Input` 컴포넌트의 error 속성)뿐만 아니라, 이처럼 필수 충족 조건 목록을 하단에 나열하여 체크 마크를 켜주는 방식이 많이 사용됩니다.
- 모든 조건이 `true`가 되기 전까지는 `Button`의 `disabled` 속성을 이용해 제출을 원천 차단합니다.
*/
