import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

type Status = 'all' | 'active' | 'pending' | 'blocked';
type Sort = 'none' | 'asc' | 'desc';

const itemsSeed = [
  { id: 1, title: '정산 자동화', owner: '이지훈', status: 'active', bookmarked: true, amount: 2840000 },
  { id: 2, title: '파트너 승인', owner: '김서연', status: 'pending', bookmarked: false, amount: 940000 },
  { id: 3, title: '휴면 고객 캠페인', owner: '박도윤', status: 'blocked', bookmarked: true, amount: 1320000 },
  { id: 4, title: '월간 리포트', owner: '최하린', status: 'active', bookmarked: false, amount: 4120000 },
];

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

const Table = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr 0.7fr auto;
  gap: 12px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
  font-weight: 800;
`;

const Row = styled.div<{ $selected?: boolean }>`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr 0.7fr auto;
  gap: 12px;
  align-items: center;
  padding: 13px 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $selected }) => ($selected ? `${theme.colors.primary}0f` : theme.colors.background)};
  cursor: pointer;

  .hover-actions {
    opacity: 0;
    transition: 0.2s;
  }

  &:hover .hover-actions {
    opacity: 1;
  }
`;

const IconButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}10` : theme.colors.surface)};
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
`;

const Empty = styled.div`
  padding: 48px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Detail = styled.div`
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
`;

const SkeletonLine = styled.div<{ $width?: string }>`
  height: 13px;
  width: ${({ $width }) => $width || '100%'};
  border-radius: 999px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 37%, #e2e8f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;

  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
  }
`;

export const ListTableFilterInteractions: React.FC = () => {
  const [items, setItems] = useState(itemsSeed);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [sort, setSort] = useState<Sort>('none');
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const result = items
      .filter((item) => item.title.includes(query) || item.owner.includes(query))
      .filter((item) => status === 'all' || item.status === status)
      .filter((item) => !onlyBookmarked || item.bookmarked);

    if (sort === 'none') return result;
    return [...result].sort((a, b) => (sort === 'asc' ? a.amount - b.amount : b.amount - a.amount));
  }, [items, onlyBookmarked, query, sort, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / 2));
  const pageItems = filtered.slice((page - 1) * 2, page * 2);
  const detail = items.find((item) => item.id === selectedId);

  const cycleSort = () => setSort((prev) => (prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'));

  const reload = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  return (
    <SamplePageLayout
      title="리스트/테이블 필터 인터랙션"
      icon="ri-table-line"
      description="검색 필터링, 상태 탭, hover 액션, 행 상세, 더블클릭 수정, 선택 개수, Empty UI, Skeleton UI, 즉시 삭제, 북마크만 보기, 다중 조건 필터, 정렬 반복, 페이지 active를 다룹니다."
      learningPoints={[
        '검색어, 상태 탭, 북마크, 정렬 조건을 조합한 목록 필터링',
        '행 클릭과 더블클릭을 분리해 상세 보기와 수정 모드 처리',
        '빈 데이터, 로딩 스켈레톤, 선택 개수, 현재 페이지 active 표시',
      ]}
      whyImportant="실무의 목록 화면은 필터, 정렬, 선택, 상세, 수정이 동시에 필요합니다. 여러 조건이 섞여도 화면 상태가 흔들리지 않게 관리하는 연습이 중요합니다."
    >
      <Toolbar>
        <Input placeholder="검색어 입력" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} fullWidth={false} />
        {(['all', 'active', 'pending', 'blocked'] as Status[]).map((nextStatus) => (
          <Button key={nextStatus} size="small" variant={status === nextStatus ? 'primary' : 'outline'} onClick={() => { setStatus(nextStatus); setPage(1); }}>
            {nextStatus}
          </Button>
        ))}
        <Button size="small" variant={onlyBookmarked ? 'primary' : 'outline'} onClick={() => setOnlyBookmarked((prev) => !prev)}>북마크만</Button>
        <Button size="small" variant="outline" onClick={cycleSort}>정렬 {sort}</Button>
        <Button size="small" variant="secondary" onClick={reload}>Skeleton 보기</Button>
      </Toolbar>

      <p style={{ color: '#64748b' }}>선택된 항목 {selectedIds.length}개</p>

      <Table>
        <Header>
          <span>프로젝트</span>
          <span>담당자</span>
          <span>금액</span>
          <span>액션</span>
        </Header>
        {loading ? (
          <Empty>
            <div style={{ display: 'grid', gap: 10 }}>
              <SkeletonLine />
              <SkeletonLine $width="72%" />
              <SkeletonLine $width="54%" />
            </div>
          </Empty>
        ) : pageItems.length === 0 ? (
          <Empty><i className="ri-inbox-line" /> 조회된 데이터가 없습니다.</Empty>
        ) : pageItems.map((item) => (
          <Row key={item.id} $selected={selectedId === item.id} onClick={() => setSelectedId(item.id)} onDoubleClick={() => setEditingId(item.id)}>
            <span>
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={(event) => {
                  event.stopPropagation();
                  setSelectedIds((prev) => prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]);
                }}
              />{' '}
              {editingId === item.id ? (
                <Input autoFocus value={item.title} onBlur={() => setEditingId(null)} onChange={(event) => setItems((prev) => prev.map((row) => row.id === item.id ? { ...row, title: event.target.value } : row))} />
              ) : item.title}
            </span>
            <span>{item.owner}</span>
            <span>{item.amount.toLocaleString()}원</span>
            <span className="hover-actions" style={{ display: 'flex', gap: 6 }}>
              <IconButton $active={item.bookmarked} onClick={(event) => { event.stopPropagation(); setItems((prev) => prev.map((row) => row.id === item.id ? { ...row, bookmarked: !row.bookmarked } : row)); }}>
                <i className={item.bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} />
              </IconButton>
              <IconButton onClick={(event) => { event.stopPropagation(); setItems((prev) => prev.filter((row) => row.id !== item.id)); }}>
                <i className="ri-delete-bin-line" />
              </IconButton>
            </span>
          </Row>
        ))}
      </Table>

      <Toolbar style={{ justifyContent: 'flex-end', marginTop: 14 }}>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <Button key={pageNumber} size="small" variant={page === pageNumber ? 'primary' : 'outline'} onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </Button>
        ))}
      </Toolbar>

      {detail && (
        <Detail>
          <strong>상세 패널</strong>
          <p>{detail.title} / {detail.owner} / {detail.status}</p>
        </Detail>
      )}
    </SamplePageLayout>
  );
};
