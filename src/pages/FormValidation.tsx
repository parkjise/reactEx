import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 30px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
  }
  
  input {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    
    &.error {
      border-color: ${({ theme }) => theme.colors.error};
    }
  }
`;

const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
`;

export const FormValidation: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 타이핑 할 때 에러 메시지를 즉시 지워주는 사용성 향상 로직
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { username: '', password: '' };

    if (formData.username.length < 3) {
      newErrors.username = '아이디는 3글자 이상이어야 합니다.';
      hasError = true;
    }

    if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6글자 이상이어야 합니다.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    alert('회원가입 성공: ' + JSON.stringify(formData));
  };

  return (
    <div>
      <h2>복합 상태 폼 유효성 검사</h2>
      <p>하나의 객체 상태(formData)로 여러 입력란을 동시 관리하는 패턴입니다.</p>

      <Container>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>아이디</label>
            <input 
              name="username" 
              value={formData.username} 
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="최소 3글자"
            />
            {errors.username && <ErrorMsg>{errors.username}</ErrorMsg>}
          </FormGroup>

          <FormGroup>
            <label>비밀번호</label>
            <input 
              name="password" 
              type="password"
              value={formData.password} 
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="최소 6글자"
            />
            {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
          </FormGroup>

          <SubmitBtn type="submit">가입하기</SubmitBtn>
        </form>
      </Container>
    </div>
  );
};

/*
[설명]
여러 개의 Input을 하나의 State 객체로 관리하는 실무형 폼 패턴입니다.

실무 패턴:
- `name="..."` 특성을 활용하여 동적 속성 할당 `[name]: value` 문법으로 여러 줄의 체인지 핸들러를 하나로 통합합니다.
- (심화 적용) 폼 항목이 10개 이상 넘어가면 useState 대신 `react-hook-form` 라이브러리를 도입하는 것이 성능면에서나 코드량 면에서 권장됩니다.
*/
