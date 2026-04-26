import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';

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



// Item Component
const SortableItemContainer = styled.li<{ $isDragging: boolean }>`
  padding: 16px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $isDragging }) => ($isDragging ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: ${({ $isDragging }) => ($isDragging ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none')};
  z-index: ${({ $isDragging }) => ($isDragging ? 1 : 'auto')};
  position: relative;
  
  /* prevent text selection while dragging */
  user-select: none;
`;

const DragHandle = styled.div`
  cursor: grab;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  
  &:active {
    cursor: grabbing;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

function SortableItem({ id, content }: { id: string; content: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SortableItemContainer ref={setNodeRef} style={style} $isDragging={isDragging}>
      {/* Handlers specifically on the icon, so only the icon acts as the drag handle */}
      <DragHandle {...attributes} {...listeners}>
        <i className="ri-draggable"></i>
      </DragHandle>
      <ItemContent>{content}</ItemContent>
    </SortableItemContainer>
  );
}

// Main Component
const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 500px;
`;

const initialItems = [
  { id: '1', content: '대시보드 기획안 작성' },
  { id: '2', content: '백오피스 API 연동' },
  { id: '3', content: 'QA 버그 리포트 검토' },
  { id: '4', content: '사내 디자인 시스템 회의' },
  { id: '5', content: '월간 주간 보고서 작성' },
];

export const DragDropList: React.FC = () => {
  const [items, setItems] = useState(initialItems);

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
      title="드래그 앤 드롭 (순서 변경)"
      icon="ri-drag-drop-line"
      description="@dnd-kit 라이브러리를 활용하여 모바일 터치와 키보드 접근성(a11y)까지 지원하는 실무형 드래그 앤 드롭 리스트입니다."
      learningPoints={[
        '@dnd-kit를 활용한 SortableContext와 useSortable의 기본 구조',
        'arrayMove 함수를 이용한 배열 요소의 안전한 위치 교환',
        '특정 영역(Handle)을 통해서만 드래그가 시작되도록 제어하는 패턴',
        '드래그 중인 아이템의 시각적 피드백(CSS Transform, Box Shadow) 처리'
      ]}
      whyImportant="우선순위 변경, 테이블 컬럼 순서 변경, 칸반 보드 등 실무에서 데이터의 '순서'를 사용자가 직관적으로 조작하게 만들어야 하는 상황에서 필수적으로 사용됩니다. 네이티브 HTML5 API보다 훨씬 안정적이며 모바일 환경을 완벽하게 지원합니다."
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <ListContainer>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
          </ListContainer>
        </SortableContext>
      </DndContext>
    </SamplePageLayout>
  );
};

/*
[설명]
@dnd-kit를 사용한 모던 React 드래그 앤 드롭 예제입니다.

실무 패턴:
- `useSortable` 훅을 개별 아이템 컴포넌트(\`SortableItem\`)에서 호출하여 각각의 위치 정보(transform)와 트랜지션 애니메이션을 부여합니다.
- \`<DragHandle {...attributes} {...listeners}>\` 처럼 드래그 이벤트를 아이템 전체가 아닌 특정 아이콘 영역에만 부여함으로써, 리스트 항목 내부의 텍스트를 드래그로 복사할 수 있도록 사용성을 보장합니다.
- \`arrayMove\` 함수는 기존 배열을 직접 수정(mutate)하지 않고 새로운 배열 객체를 반환하여 React의 불변성을 안전하게 지켜줍니다.
*/
