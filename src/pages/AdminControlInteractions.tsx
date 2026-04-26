import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 16px;
`;

const ActionBar = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.primary}12`};
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Row = styled.label<{ $selected?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 0;
  background: ${({ theme, $selected }) => ($selected ? `${theme.colors.primary}0f` : 'transparent')};
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.45);
  padding: 20px;
`;

const ModalBox = styled.div`
  width: min(420px, 100%);
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.28);
  padding: 20px;
`;

const MenuButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  padding: 9px 12px;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}12` : theme.colors.surface)};
  font-weight: 700;
`;

const Widget = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  padding: 14px;
  margin-top: 12px;
`;

export const AdminControlInteractions: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [confirm, setConfirm] = useState<'status' | 'delete' | 'approve' | 'reject' | 'reset' | null>(null);
  const [pageSize, setPageSize] = useState(20);
  const [columns, setColumns] = useState({ owner: true, status: true, date: false });
  const [pinnedMenu, setPinnedMenu] = useState('매출');
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(true);

  const rows = [
    { id: 1, name: '정산 승인 요청' },
    { id: 2, name: '파트너 삭제 요청' },
    { id: 3, name: '상태 변경 대상' },
  ];

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <SamplePageLayout
      title="관리자 제어 인터랙션"
      icon="ri-dashboard-3-line"
      description="검색 필터, 상세 검색, 선택 액션바, 상태 변경/삭제/승인/반려 확인, 페이지 크기, 컬럼 설정, 즐겨찾기, 브레드크럼, 사이드 메뉴, 공지/위젯 접기를 다룹니다."
      learningPoints={[
        '관리자 화면에서 자주 나오는 접기/펼치기와 확인 모달 패턴',
        '선택된 행이 있을 때만 상단 액션바 노출',
        '페이지 사이즈, 컬럼 보이기/숨기기, 메뉴 고정 같은 설정성 UI 상태 관리',
      ]}
      whyImportant="백오피스는 실수 방지와 상태 인지가 핵심입니다. 위험한 작업은 확인 모달을 거치고, 선택된 데이터와 적용된 설정은 화면에 분명히 보여줘야 합니다."
    >
      <Grid>
        <Card title="검색 필터 / 상세 검색 / 초기화" padding="16px">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button size="small" variant="outline" onClick={() => setFilterOpen((prev) => !prev)}>필터 {filterOpen ? '접기' : '펼치기'}</Button>
            <Button size="small" variant="outline" onClick={() => setAdvancedOpen((prev) => !prev)}>상세 검색</Button>
            <Button size="small" variant="secondary" onClick={() => setConfirm('reset')}>필터 초기화</Button>
          </div>
          {filterOpen && <Input placeholder="검색어" icon="ri-search-line" style={{ marginTop: 12 }} />}
          {advancedOpen && <Widget>상태, 담당자, 금액, 기간 조건을 추가로 설정합니다.</Widget>}
        </Card>

        <Card title="행 선택 액션바 / 확인 모달" padding="16px">
          {selectedIds.length > 0 && (
            <ActionBar>
              <strong>{selectedIds.length}개 선택됨</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                <Button size="small" variant="outline" onClick={() => setConfirm('status')}>상태 변경</Button>
                <Button size="small" variant="outline" onClick={() => setConfirm('delete')}>삭제</Button>
              </div>
            </ActionBar>
          )}
          {rows.map((row) => (
            <Row key={row.id} $selected={selectedIds.includes(row.id)}>
              <input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleRow(row.id)} />
              <span>{row.name}</span>
              <i className="ri-arrow-right-s-line" />
            </Row>
          ))}
        </Card>

        <Card title="승인 / 반려 확인 팝업" padding="16px">
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="small" onClick={() => setConfirm('approve')}>승인</Button>
            <Button size="small" variant="outline" onClick={() => setConfirm('reject')}>반려</Button>
          </div>
        </Card>

        <Card title="페이지 크기 / 컬럼 설정" padding="16px">
          <label>
            페이지 크기{' '}
            <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
              {[10, 20, 50].map((size) => <option key={size} value={size}>{size}개</option>)}
            </select>
          </label>
          {Object.entries(columns).map(([key, value]) => (
            <label key={key} style={{ display: 'block', marginTop: 10 }}>
              <input type="checkbox" checked={value} onChange={() => setColumns((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))} /> {key} 컬럼 표시
            </label>
          ))}
        </Card>

        <Card title="즐겨찾기 / 브레드크럼 / 사이드 메뉴" padding="16px">
          <p style={{ color: '#64748b' }}>홈 / 관리자 / <button onClick={() => setPinnedMenu('사용자')}>사용자</button></p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['매출', '고객', '운영'].map((menu) => (
              <MenuButton key={menu} $active={pinnedMenu === menu} onClick={() => setPinnedMenu(menu)}>
                <i className={pinnedMenu === menu ? 'ri-pushpin-fill' : 'ri-pushpin-line'} /> {menu}
              </MenuButton>
            ))}
          </div>
          <Button size="small" variant="outline" style={{ marginTop: 12 }} onClick={() => setSideCollapsed((prev) => !prev)}>
            사이드 메뉴 {sideCollapsed ? '펼침' : '접힘'}
          </Button>
          <Widget>{sideCollapsed ? '아이콘만 보이는 사이드 메뉴' : '전체 메뉴명이 보이는 사이드 메뉴'}</Widget>
        </Card>

        <Card title="공지사항 / 대시보드 위젯" padding="16px">
          <Button size="small" variant="outline" onClick={() => setNoticeOpen((prev) => !prev)}>공지사항 {noticeOpen ? '접기' : '더보기'}</Button>
          {noticeOpen && <Widget>정기 점검, 정책 변경, 신규 기능 안내</Widget>}
          <Button size="small" variant="outline" style={{ marginTop: 12 }} onClick={() => setWidgetOpen((prev) => !prev)}>위젯 {widgetOpen ? '접기' : '펼치기'}</Button>
          {widgetOpen && <Widget>오늘 승인 대기 12건 / 실패 작업 2건</Widget>}
        </Card>
      </Grid>

      {confirm && (
        <ModalBackdrop>
          <ModalBox>
            <h3>{confirm === 'delete' ? '삭제 확인' : confirm === 'approve' ? '승인 확인' : confirm === 'reject' ? '반려 확인' : confirm === 'reset' ? '초기화 확인' : '상태 변경 확인'}</h3>
            <p>실행 전에 한 번 더 확인합니다.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="small" onClick={() => setConfirm(null)}>확인</Button>
              <Button size="small" variant="outline" onClick={() => setConfirm(null)}>취소</Button>
            </div>
          </ModalBox>
        </ModalBackdrop>
      )}
    </SamplePageLayout>
  );
};
