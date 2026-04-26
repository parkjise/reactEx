import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

// 히스토리 관리를 위한 커스텀 훅
function useHistoryState<T>(initialState: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialState);
  const [future, setFuture] = useState<T[]>([]);

  const set = (newState: T) => {
    setPast((prev) => [...prev, present]);
    setPresent(newState);
    setFuture([]); // 새로운 액션이 발생하면 미래는 지워집니다.
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  };

  return { state: present, set, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 };
}

// --- Styled Components ---
const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

const EditorArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: monospace;
  font-size: 1rem;
  resize: none;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UndoRedoHistory: React.FC = () => {
  const { state: text, set: setText, undo, redo, canUndo, canRedo } = useHistoryState<string>('');

  return (
    <SamplePageLayout
      title="실행 취소 & 다시 실행 (Undo/Redo)"
      icon="ri-arrow-go-back-line"
      description="상태의 과거(Past), 현재(Present), 미래(Future)를 추적하여 Ctrl+Z 기능을 구현하는 아키텍처 패턴입니다."
      learningPoints={[
        '히스토리 관리를 위한 useHistoryState 커스텀 훅 설계 기법',
        '상태를 3개의 배열(past, present, future)로 나누어 관리하는 원리',
        '새로운 입력 시 future 배열을 초기화하는 무효화(Invalidation) 로직',
      ]}
      whyImportant="웹 에디터, 캔버스 그리기 도구, 복잡한 설정 관리 화면 등에서 사용자의 실수를 되돌려주는 Undo/Redo 기능은 필수적입니다. 이 로직을 이해하면 리액트 상태관리의 본질을 깨닫게 됩니다."
    >
      <Card>
        <Toolbar>
          <Button 
            variant="secondary" 
            size="small" 
            onClick={undo} 
            disabled={!canUndo}
            icon="ri-arrow-go-back-line"
          >
            Undo (실행 취소)
          </Button>
          <Button 
            variant="secondary" 
            size="small" 
            onClick={redo} 
            disabled={!canRedo}
            icon="ri-arrow-go-forward-line"
          >
            Redo (다시 실행)
          </Button>
        </Toolbar>
        
        <EditorArea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 텍스트를 입력해 보세요. 단어 단위가 아닌 글자 단위로 히스토리가 저장됩니다."
        />

        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#666' }}>
          * 테스트 팁: 글자를 몇 개 입력하고 지운 뒤, Undo 버튼을 계속 눌러보세요.
        </div>
      </Card>
    </SamplePageLayout>
  );
};
