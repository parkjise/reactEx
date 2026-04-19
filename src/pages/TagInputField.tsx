import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 720px;
`;

const InputBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.primary}12;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;

  button {
    display: flex;
    align-items: center;
    color: inherit;
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 220px;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export const TagInputField: React.FC = () => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState(['React', 'TypeScript', 'Admin']);

  const addTag = (rawValue: string) => {
    const value = rawValue.trim();
    if (!value || tags.includes(value)) {
      return;
    }

    setTags((prev) => [...prev, value]);
    setInput('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag(input);
    }

    if (event.key === 'Backspace' && !input && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  return (
    <Container>
      <div>
        <h2>태그 입력 필드</h2>
        <p>검색 키워드, 수신자, 라벨 입력처럼 여러 값을 한 번에 관리할 때 자주 쓰는 패턴입니다.</p>
      </div>

      <InputBox onClick={() => document.getElementById('tag-input')?.focus()}>
        {tags.map((tag) => (
          <Tag key={tag}>
            <span>{tag}</span>
            <button onClick={() => setTags((prev) => prev.filter((item) => item !== tag))}>
              <i className="ri-close-line"></i>
            </button>
          </Tag>
        ))}
        <Input
          id="tag-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그를 입력하고 Enter를 누르세요"
        />
      </InputBox>

      <Hint>
        현재 태그: {tags.join(', ')}
      </Hint>
    </Container>
  );
};

/*
[설명]
태그 입력은 단일 문자열 입력처럼 보여도 내부적으로는 "여러 개의 개별 값"을 다뤄야 해서 일반 input보다 상태 설계가 조금 다릅니다. 받는 사람 이메일 입력, 검색 키워드 저장, 문서 라벨 편집, 해시태그 입력 등에서 이 패턴이 자주 등장합니다. 이 예제는 `input`과 `tags`를 분리해서 그 구조를 보여줍니다.

핵심은 현재 타이핑 중인 값은 `input`, 확정된 값 목록은 `tags`라는 점입니다. 사용자가 Enter나 쉼표를 누르면 현재 input을 하나의 확정 태그로 승격시키고, 입력창은 다시 비워줍니다. 이렇게 상태를 둘로 나누면 "아직 확정되지 않은 값"과 "이미 저장된 값"이 섞이지 않아 로직이 명확해집니다.

Backspace 동작도 실무에서 자주 넣는 UX입니다. 입력창이 비어 있을 때 Backspace를 누르면 마지막 태그를 삭제하도록 하면 사용감이 훨씬 자연스러워집니다. 이런 세부 동작이 실제 제품 완성도를 많이 좌우합니다.

실무에서는 아래 항목도 자주 추가됩니다.
- 중복 태그 방지, 최대 개수 제한, 금지 문자 검증
- 자동완성 목록과 결합한 추천 태그 선택
- 삭제 버튼 접근성과 키보드 포커스 이동 처리
*/
