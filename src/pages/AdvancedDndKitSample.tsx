import React, { useState } from 'react';
import styled from 'styled-components';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { CodeViewer } from '../components/CodeViewer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SortableListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ItemWrapper = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 8px;
  background-color: ${({ theme, $isDragging }) => 
    $isDragging ? theme.colors.background : theme.colors.surface};
  border: 1px solid ${({ theme, $isDragging }) => 
    $isDragging ? theme.colors.primary : theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ $isDragging }) => 
    $isDragging ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.02)'};
  opacity: ${({ $isDragging }) => ($isDragging ? 0.8 : 1)};
  z-index: ${({ $isDragging }) => ($isDragging ? 10 : 1)};
  position: relative;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DragHandle = styled.div`
  cursor: grab;
  padding: 8px;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    cursor: grabbing;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .info {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
    }
    .role {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

interface SortableItemProps {
  id: string;
  item: { name: string; role: string; initial: string };
}

function SortableItem({ id, item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ItemWrapper ref={setNodeRef} style={style} $isDragging={isDragging}>
      <ItemContent>
        <DragHandle {...attributes} {...listeners}>
          <i className="ri-draggable"></i>
        </DragHandle>
        <div className="avatar">{item.initial}</div>
        <div className="info">
          <span className="name">{item.name}</span>
          <span className="role">{item.role}</span>
        </div>
      </ItemContent>
      <i className="ri-more-2-fill" style={{ color: '#94A3B8' }}></i>
    </ItemWrapper>
  );
}

export const AdvancedDndKitSample: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', name: '김민수 (개발팀)', role: 'Frontend Engineer', initial: '김' },
    { id: '2', name: '이영희 (디자인팀)', role: 'UI/UX Designer', initial: '이' },
    { id: '3', name: '박지성 (기획팀)', role: 'Product Manager', initial: '박' },
    { id: '4', name: '최동원 (운영팀)', role: 'Operations', initial: '최' },
    { id: '5', name: '홍길동 (개발팀)', role: 'Backend Engineer', initial: '홍' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <SamplePageLayout
      title="@dnd-kit 고급 드래그 앤 드롭"
      icon="ri-drag-drop-line"
      description="최신 React 드래그 앤 드롭 라이브러리인 @dnd-kit을 활용하여 부드럽고 접근성이 뛰어난 정렬 가능(Sortable) 리스트를 구현합니다."
      learningPoints={[
        'HTML5 네이티브 Drag API의 한계를 극복한 현대적인 DND 구현',
        'SortableContext와 arrayMove를 활용한 간편한 리스트 순서 변경',
        '키보드 센서(KeyboardSensor) 지원을 통한 완벽한 웹 접근성(a11y) 확보'
      ]}
      whyImportant="실무에서 칸반 보드(Kanban), 우선순위 설정 리스트, 파일 업로드 순서 변경 등 복잡한 상호작용을 요구하는 UI를 만들 때 react-beautiful-dnd의 훌륭한 대안으로 사용됩니다."
    >
      <Container>
        <Card title="팀원 우선순위 정렬 (Sortable List)">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            왼쪽의 <i className="ri-draggable"></i> 아이콘을 잡고 위아래로 드래그하여 순서를 변경해 보세요.
          </p>
          <SortableListContainer>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map(item => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <SortableItem key={item.id} id={item.id} item={item} />
                ))}
              </SortableContext>
            </DndContext>
          </SortableListContainer>
        </Card>

        <Card title="현재 데이터 순서 모니터링">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            드래그 앤 드롭으로 순서를 변경하면 React의 상태(State) 배열도 함께 실시간으로 변경됩니다.
          </p>
          <pre style={{ 
            backgroundColor: '#1e1e1e', 
            color: '#d4d4d4', 
            padding: '16px', 
            borderRadius: '8px', 
            fontFamily: 'monospace', 
            fontSize: '0.85rem',
            overflowX: 'auto' 
          }}>
            {JSON.stringify(items.map(i => ({ id: i.id, name: i.name })), null, 2)}
          </pre>
        </Card>
      </Container>

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#1E293B' }}>구현 핵심 코드</h3>
        <CodeViewer 
          language="tsx"
          filename="AdvancedDndKitSample.tsx"
          rawCode={`import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 1. SortableItem 컴포넌트: 개별 아이템 래퍼
function SortableItem({ id, item }) {
  // useSortable 훅으로 드래그에 필요한 속성들을 가져옵니다.
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1, // 드래그 중인 아이템을 맨 위로
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* DragHandle에만 listeners를 부여하여 특정 영역(핸들)만 잡고 끌 수 있게 합니다. */}
      <div {...attributes} {...listeners}>:: 드래그 핸들 ::</div>
      {item.name}
    </div>
  );
}

// 2. 메인 컨테이너 (DndContext + SortableContext 설정)
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  
  // 제자리에서 놓은게 아니고 위치가 변경되었다면 배열 재배치
  if (over && active.id !== over.id) {
    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      // arrayMove: @dnd-kit/sortable에서 제공하는 배열 순서 변경 유틸 함수
      return arrayMove(items, oldIndex, newIndex);
    });
  }
};

<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  {/* strategy: 세로 리스트, 가로 리스트, 그리드 등 정렬 전략 설정 */}
  <SortableContext items={items} strategy={verticalListSortingStrategy}>
    {items.map((item) => (
      <SortableItem key={item.id} id={item.id} item={item} />
    ))}
  </SortableContext>
</DndContext>`}
        />
      </div>
    </SamplePageLayout>
  );
};