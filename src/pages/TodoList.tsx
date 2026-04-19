import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const TodoContainer = styled.div`
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 20px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    padding: 10px 15px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 4px;
    white-space: nowrap;
  }
`;

const List = styled.ul`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-bottom: none;
    }

    .text {
      flex: 1;
      margin-left: 10px;
      cursor: pointer;
      &.done {
        text-decoration: line-through;
        color: ${({ theme }) => theme.colors.textMuted};
      }
    }

    button {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '리액트 실무 패턴 공부하기', done: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // 렌더링에 영향을 주지 않으면서 값을 유지해야 하는 ID 채번 용도
  const nextId = useRef(2);

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = { id: nextId.current, text: inputValue, done: false };
    setTodos([...todos, newTodo]);
    setInputValue('');
    nextId.current += 1;
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo 리스트 (CRUD)</h2>
      <p>배열 상태 객체를 추가, 수정, 삭제하는 프론트엔드 불변성(Immutability) 패턴입니다.</p>

      <TodoContainer>
        <InputRow>
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={handleAdd}>추가</button>
        </InputRow>

        <List>
          {todos.map(todo => (
            <li key={todo.id}>
              <i 
                className={todo.done ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line"} 
                style={{ color: todo.done ? '#4caf50' : '#888', cursor: 'pointer' }}
                onClick={() => handleToggle(todo.id)}
              />
              <span 
                className={`text ${todo.done ? 'done' : ''}`}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.text}
              </span>
              <button onClick={() => handleRemove(todo.id)}>
                <i className="ri-delete-bin-line" />
              </button>
            </li>
          ))}
          {todos.length === 0 && <div style={{ textAlign: 'center', padding: '20px' }}>할 일이 없습니다.</div>}
        </List>
      </TodoContainer>
    </div>
  );
};

/*
[설명]
리액트 배열 상태의 CRUD(Create, Read, Update, Delete) 정석 패턴입니다.

실무 패턴:
- `push()` 대신 `[...prev, newItem]` 으로 새 객체를 만들어 요소 추가(Create)를 합니다.
- 수정(Update) 시에는 `map`을 돌면서 클릭한 ID와 일치할 때만 스프레드 `{...todo, 변경값}` 할당을 합니다.
- 삭제(Delete) 시에는 `filter`를 사용하여 조건에 맞지 않는 항목만 날려버린 새 배열을 할당합니다.
- 컴포넌트 라이프사이클 내내 값을 보존해야 하지만, "값이 바뀐다고 해서 화면이 다시 렌더되지 않아도 되는" 변수는 `useRef`로 관리합니다 (`nextId`).
*/
