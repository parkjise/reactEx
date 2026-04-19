import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  input {
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    outline: none;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }
    setError('');
    alert(`로그인 시도: ${email}`);
  };

  return (
    <>
      <h2>로그인 폼 (제어 컴포넌트)</h2>
      <p>이 예제는 리액트의 useState를 활용해 입력값을 통제하는 제어(Controlled) 컴포넌트 패턴입니다.</p>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label>이메일</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@example.com"
            />
          </InputGroup>
          <InputGroup>
            <label>비밀번호</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="******"
            />
          </InputGroup>
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton type="submit" disabled={!email || !password}>
            로그인
          </SubmitButton>
        </form>
      </FormContainer>
    </>
  );
};

/*
[설명]
React의 기초이면서 핵심인 "제어 컴포넌트(Controlled Component)" 로그인 폼입니다.

실무 패턴:
- input의 value 속성을 React의 상태(`useState`)와 동기화시킵니다.
- submit 시점에 상태값을 확인하여 유효성 에러 메시지를 렌더링하도록 처리합니다.
- 제출 버튼은 email과 password가 입력되지 않았을 경우 CSS와 HTML disabled 속성을 이용해 방어(의도치 않은 클릭 방지)를 합니다.
*/
