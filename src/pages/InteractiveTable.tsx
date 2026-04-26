import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const TableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  overflow-x: auto;
  position: relative;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.primary}10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SelectedCount = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th, td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: ${({ theme }) => theme.colors.surface};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }

  /* Hover 효과 및 액션 아이콘 제어 */
  tbody tr {
    transition: background-color 0.2s;
    
    .hover-actions {
      opacity: 0;
      transition: opacity 0.2s;
      display: flex;
      gap: 8px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
      .hover-actions {
        opacity: 1; /* 마우스 오버 시에만 버튼 노출 */
      }
    }

    /* 선택된 Row 강조 */
    &.selected {
      background-color: ${({ theme }) => theme.colors.primary}05;
    }
  }
`;

const EmptyUI = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  
  i {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.border};
    margin-bottom: 16px;
    display: block;
  }
`;

const ActionIconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

// 샘플 데이터
const INITIAL_DATA = [
  { id: 1, name: '맥북 프로 16인치', price: 3500000, stock: 12 },
  { id: 2, name: '로지텍 MX Master 3S', price: 139000, stock: 45 },
  { id: 3, name: '아이패드 프로 12.9', price: 1750000, stock: 5 },
];

export const InteractiveTable: React.FC = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) setSelectedIds([]);
    else setSelectedIds(data.map(item => item.id));
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleClearData = () => {
    setData([]);
    setSelectedIds([]);
  };

  const handleRestoreData = () => setData(INITIAL_DATA);

  // 인라인 편집 시작
  const startEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  // 인라인 편집 완료
  const finishEdit = () => {
    if (editingId) {
      setData(prev => prev.map(item => item.id === editingId ? { ...item, name: editValue } : item));
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') finishEdit();
    if (e.key === 'Escape') setEditingId(null);
  };

  return (
    <SamplePageLayout
      title="반응형 고급 테이블 (Interactive Table)"
      icon="ri-table-line"
      description="마우스 호버 액션, 더블클릭 인라인 수정, 다중 선택 툴바, 빈 데이터(Empty) UI 등 테이블 조작의 끝판왕입니다."
      learningPoints={[
        'CSS :hover 와 자식 선택자를 이용한 우측 액션 버튼 숨김/노출 기법',
        '조건부 렌더링을 통한 Empty UI 구현',
        '행(Row) 더블클릭 시 텍스트가 <Input>으로 전환되는 인라인 수정 로직',
        '선택된 항목이 있을 때만 최상단에 나타나는 벌크 액션(Bulk Action) 툴바 패턴',
      ]}
      whyImportant="단순히 데이터를 나열하는 테이블은 의미가 없습니다. 사용자가 테이블 내에서 즉시 데이터를 수정하고(인라인 편집), 불필요한 버튼으로 화면을 가리지 않으며(호버 노출), 선택된 항목에 대한 맥락(툴바)을 제공하는 것이 모던 SaaS의 핵심입니다."
    >
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <Button variant="outline" size="small" onClick={handleClearData}>데이터 모두 지우기</Button>
        <Button variant="outline" size="small" onClick={handleRestoreData}>초기 데이터 복구</Button>
      </div>

      <TableContainer>
        {/* 선택 항목이 있을 때만 나타나는 Toolbar */}
        {selectedIds.length > 0 && (
          <Toolbar>
            <SelectedCount>{selectedIds.length}개 항목 선택됨</SelectedCount>
            <Button variant="outline" size="small" style={{ color: '#EE5D50', borderColor: '#EE5D50' }}>
              선택 삭제
            </Button>
          </Toolbar>
        )}

        <StyledTable>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={toggleSelectAll}
                  disabled={data.length === 0}
                />
              </th>
              <th>상품명 (더블클릭하여 수정)</th>
              <th>단가</th>
              <th>재고</th>
              <th style={{ width: '100px' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyUI>
                    <i className="ri-inbox-archive-line"></i>
                    <div>조회된 데이터가 없습니다.</div>
                  </EmptyUI>
                </td>
              </tr>
            ) : (
              data.map(item => (
                <tr key={item.id} className={selectedIds.includes(item.id) ? 'selected' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td onDoubleClick={() => startEdit(item.id, item.name)}>
                    {editingId === item.id ? (
                      <Input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={finishEdit}
                        onKeyDown={handleKeyDown}
                        fullWidth={false}
                        style={{ padding: '6px 12px' }}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>₩{item.price.toLocaleString()}</td>
                  <td>{item.stock}개</td>
                  <td>
                    <div className="hover-actions">
                      <ActionIconButton onClick={() => startEdit(item.id, item.name)} title="수정">
                        <i className="ri-edit-2-line"></i>
                      </ActionIconButton>
                      <ActionIconButton onClick={() => handleDelete(item.id)} title="삭제">
                        <i className="ri-delete-bin-line"></i>
                      </ActionIconButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
현대적인 B2B 어드민/SaaS에서 요구하는 테이블 인터랙션을 하나로 뭉쳤습니다.

실무 패턴:
- `hover-actions`: CSS에서 평소에는 `opacity: 0`으로 숨겨두었다가 `tr:hover` 시에만 `opacity: 1`로 보여줍니다. 지저분한 버튼들로 테이블이 꽉 차는 것을 방지합니다.
- `onDoubleClick`: 행이나 셀을 더블클릭하면 해당 행의 id를 `editingId` 상태에 넣고 조건부 렌더링으로 `<Input>`을 띄웁니다.
- `onBlur`: 인풋에서 포커스가 벗어나면 즉시 `finishEdit()`를 호출해 텍스트 모드로 되돌아갑니다. (엔터키와 동일한 효과)
- `EmptyUI`: 데이터 배열의 `length`가 0일 때 `colSpan`을 100%로 주어 중앙에 큰 안내 메시지를 보여주는 패턴은 필수입니다.
*/
