import type { ComponentType } from 'react';
import { Dashboard } from '../pages/Dashboard';
import { LoginForm } from '../pages/LoginForm';
import { UserList } from '../pages/UserList';
import { SearchForm } from '../pages/SearchForm';
import { SortTable } from '../pages/SortTable';
import { CheckboxSelect } from '../pages/CheckboxSelect';
import { ModalSample } from '../pages/ModalSample';
import { TabMenu } from '../pages/TabMenu';
import { AccordionFaq } from '../pages/AccordionFaq';
import { DropdownSample } from '../pages/DropdownSample';
import { FormValidation } from '../pages/FormValidation';
import { CartQuantity } from '../pages/CartQuantity';
import { TodoList } from '../pages/TodoList';
import { ApiFetchSample } from '../pages/ApiFetchSample';
import { PaginationSample } from '../pages/PaginationSample';
import { DarkModeSample } from '../pages/DarkModeSample';
import { FileUpload } from '../pages/FileUpload';
import { ToastAlert } from '../pages/ToastAlert';
import { PermissionMenu } from '../pages/PermissionMenu';
import { DebouncedSearch } from '../pages/DebouncedSearch';
import { BulkActionTable } from '../pages/BulkActionTable';
import { EditableProfileForm } from '../pages/EditableProfileForm';
import { MultiStepCheckout } from '../pages/MultiStepCheckout';
import { InfiniteScrollFeed } from '../pages/InfiniteScrollFeed';
import { SkeletonList } from '../pages/SkeletonList';
import { OptimisticLike } from '../pages/OptimisticLike';
import { DateRangeFilter } from '../pages/DateRangeFilter';
import { TagInputField } from '../pages/TagInputField';
import { ApprovalWorkflow } from '../pages/ApprovalWorkflow';
import { DragDropList } from '../pages/DragDropList';
import { SignupForm } from '../pages/SignupForm';
import { FilterReset } from '../pages/FilterReset';
import { AdminDashboardCard } from '../pages/AdminDashboardCard';
import { AdminStatusSummary } from '../pages/AdminStatusSummary';
import { AdminRecentActivity } from '../pages/AdminRecentActivity';
import { AdminNoticeList } from '../pages/AdminNoticeList';
import { AdminUserManagement } from '../pages/AdminUserManagement';
import { AdminSearchAction } from '../pages/AdminSearchAction';
import { AdvancedModalInteraction } from '../pages/AdvancedModalInteraction';
import { FormInteractionShowcase } from '../pages/FormInteractionShowcase';
import { InteractiveTable } from '../pages/InteractiveTable';
import { FloatingInteractions } from '../pages/FloatingInteractions';
import { LayoutInteractions } from '../pages/LayoutInteractions';
import { ComponentShowcase } from '../pages/ComponentShowcase';
import { MultiStepWizard } from '../pages/MultiStepWizard';
import { GlobalCartSample } from '../pages/GlobalCartSample';
import { UndoRedoHistory } from '../pages/UndoRedoHistory';
import { LiveChartDashboard } from '../pages/LiveChartDashboard';
import { KpiGaugeChart } from '../pages/KpiGaugeChart';
import { DynamicPieChart } from '../pages/DynamicPieChart';
import { EchartsMixed } from '../pages/EchartsMixed';
import { EchartsRadar } from '../pages/EchartsRadar';
import { EchartsHeatmap } from '../pages/EchartsHeatmap';
import { EchartsBasic } from '../pages/EchartsBasic';
import { EchartsCompare } from '../pages/EchartsCompare';
import { EchartsDashboard } from '../pages/EchartsDashboard';
import { EchartsAdvanced } from '../pages/EchartsAdvanced';

export interface ExampleItem {
  path: string;
  label: string;
  icon: string;
  file: string;
  component: ComponentType;
  summary: string;
}

export interface ExampleCategory {
  key: string;
  title: string;
  icon: string;
  description: string;
  items: ExampleItem[];
}

export const EXAMPLE_CATEGORIES: ExampleCategory[] = [
  {
    key: 'overview',
    title: '시작하기',
    icon: 'ri-home-5-line',
    description: '앱 구조와 전체 예제 지형을 빠르게 파악합니다.',
    items: [
      {
        path: '/',
        label: '대시보드',
        icon: 'ri-dashboard-line',
        file: 'Dashboard.tsx',
        component: Dashboard,
        summary: '카테고리별 예제 수와 추천 학습 순서를 한 번에 보여줍니다.',
      },
    ],
  },
  {
    key: 'forms',
    title: '1. 폼(Form)',
    icon: 'ri-file-edit-line',
    description: '데이터 입력 및 검증을 위한 폼 패턴',
    items: [
      { path: '/login', label: '로그인 폼', icon: 'ri-login-box-line', file: 'LoginForm.tsx', component: LoginForm, summary: '공통 UI 적용 로그인' },
      { path: '/signup', label: '회원가입 폼', icon: 'ri-user-add-line', file: 'SignupForm.tsx', component: SignupForm, summary: '다수 필드 및 복합 상태 관리' },
      { path: '/validation', label: '유효성 검사', icon: 'ri-shield-check-line', file: 'FormValidation.tsx', component: FormValidation, summary: '실시간 조건 피드백 폼' },
      { path: '/search-form', label: '검색 폼', icon: 'ri-search-line', file: 'SearchForm.tsx', component: SearchForm, summary: '테이블 상단 검색바' },
      { path: '/filter-reset', label: '필터 초기화', icon: 'ri-filter-clear-line', file: 'FilterReset.tsx', component: FilterReset, summary: '다중 필터 일괄 리셋' },
    ],
  },
  {
    key: 'list',
    title: '2. 리스트(List)',
    icon: 'ri-list-check',
    description: '반복되는 목록 데이터 렌더링 패턴',
    items: [
      { path: '/users', label: '회원 일반 목록', icon: 'ri-user-line', file: 'UserList.tsx', component: UserList, summary: '배열 데이터를 리스트로 렌더링' },
      { path: '/infinite-feed', label: '무한 스크롤', icon: 'ri-align-vertically', file: 'InfiniteScrollFeed.tsx', component: InfiniteScrollFeed, summary: '다음 페이지 자동 불러오기' },
      { path: '/skeleton-list', label: '로딩 스켈레톤', icon: 'ri-layout-masonry-line', file: 'SkeletonList.tsx', component: SkeletonList, summary: '뼈대 UI를 통한 로딩 UX 개선' },
    ],
  },
  {
    key: 'table',
    title: '3. 테이블(Table)',
    icon: 'ri-table-2',
    description: '대량의 데이터를 효과적으로 보여주는 표',
    items: [
      { path: '/sort', label: '정렬 테이블', icon: 'ri-arrow-up-down-line', file: 'SortTable.tsx', component: SortTable, summary: '헤더 클릭으로 컬럼 정렬' },
      { path: '/checkbox', label: '체크박스 전체선택', icon: 'ri-checkbox-multiple-line', file: 'CheckboxSelect.tsx', component: CheckboxSelect, summary: '개별 행 선택 및 전체 선택 상태 관리' },
      { path: '/pagination', label: '페이지네이션', icon: 'ri-pages-line', file: 'PaginationSample.tsx', component: PaginationSample, summary: '긴 목록을 페이지 번호로 나누기' },
      { path: '/bulk-action', label: '테이블 일괄 액션', icon: 'ri-list-check-3', file: 'BulkActionTable.tsx', component: BulkActionTable, summary: '선택된 행들에 대해 일괄 작업 수행' },
    ],
  },
  {
    key: 'interaction',
    title: '4. UI 인터랙션',
    icon: 'ri-cursor-line',
    description: '사용자 반응에 맞춘 UI 조작',
    items: [
      { path: '/modal', label: '모달(Modal)', icon: 'ri-window-line', file: 'ModalSample.tsx', component: ModalSample, summary: '팝업 형태의 오버레이 창 제어' },
      { path: '/dropdown', label: '드롭다운 메뉴', icon: 'ri-arrow-down-s-line', file: 'DropdownSample.tsx', component: DropdownSample, summary: '선택 가능한 컨텍스트 메뉴' },
      { path: '/tabs', label: '탭 메뉴', icon: 'ri-layout-top-line', file: 'TabMenu.tsx', component: TabMenu, summary: '같은 화면에서 내용 전환' },
      { path: '/accordion', label: '아코디언 (FAQ)', icon: 'ri-question-answer-line', file: 'AccordionFaq.tsx', component: AccordionFaq, summary: '세로로 열고 닫히는 컨텐츠 블록' },
      { path: '/toast', label: '토스트 메시지', icon: 'ri-message-3-line', file: 'ToastAlert.tsx', component: ToastAlert, summary: '일정 시간 후 사라지는 비침투적 알림' },
      { path: '/darkmode', label: '다크모드 토글', icon: 'ri-moon-line', file: 'DarkModeSample.tsx', component: DarkModeSample, summary: '전역 테마 상태 변경' },
      { path: '/dnd-list', label: '드래그 앤 드롭', icon: 'ri-drag-drop-line', file: 'DragDropList.tsx', component: DragDropList, summary: '리스트 순서 변경 패턴' },
      { path: '/adv-modal', label: '고급 모달 (Stack & Lock)', icon: 'ri-window-2-line', file: 'AdvancedModalInteraction.tsx', component: AdvancedModalInteraction, summary: 'ESC 닫기, 스크롤 락, 다중 모달' },
      { path: '/adv-form', label: '폼 고급 인터랙션', icon: 'ri-keyboard-line', file: 'FormInteractionShowcase.tsx', component: FormInteractionShowcase, summary: '카운트, 조건부 노출, 이탈 방지' },
      { path: '/adv-table', label: '반응형 고급 테이블', icon: 'ri-table-line', file: 'InteractiveTable.tsx', component: InteractiveTable, summary: '인라인 수정, 호버 액션, 다중 선택' },
      { path: '/adv-floating', label: '플로팅 요소 모음', icon: 'ri-chat-3-line', file: 'FloatingInteractions.tsx', component: FloatingInteractions, summary: '툴팁, 우클릭 메뉴, 스낵바' },
      { path: '/adv-layout', label: '고급 레이아웃 제어', icon: 'ri-layout-row-line', file: 'LayoutInteractions.tsx', component: LayoutInteractions, summary: '축소 헤더, 탑버튼, 더보기 접기' },
    ],
  },
  {
    key: 'state',
    title: '5. 상태관리(State)',
    icon: 'ri-archive-line',
    description: '복잡한 데이터를 유지하고 제어하는 패턴',
    items: [
      { path: '/todo', label: 'CRUD 상태관리', icon: 'ri-list-check-2', file: 'TodoList.tsx', component: TodoList, summary: '아이템 추가/수정/삭제 로직 처리' },
      { path: '/global-cart', label: '글로벌 장바구니', icon: 'ri-shopping-cart-2-line', file: 'GlobalCartSample.tsx', component: GlobalCartSample, summary: 'Zustand 기반 전역 데이터 동기화' },
      { path: '/undo-redo', label: '실행 취소(Undo/Redo)', icon: 'ri-arrow-go-back-line', file: 'UndoRedoHistory.tsx', component: UndoRedoHistory, summary: '과거/현재/미래 상태 배열 관리 패턴' },
    ],
  },
  {
    key: 'async',
    title: '6. API / 비동기',
    icon: 'ri-exchange-funds-line',
    description: '서버 통신 및 비동기 상태 처리',
    items: [
      { path: '/api', label: '로딩 및 에러 처리', icon: 'ri-loader-4-line', file: 'ApiFetchSample.tsx', component: ApiFetchSample, summary: '데이터 Fetching 과정의 상태 세분화' },
      { path: '/debounced-search', label: '디바운스 검색 API', icon: 'ri-timer-flash-line', file: 'DebouncedSearch.tsx', component: DebouncedSearch, summary: '연속된 입력에 대한 API 호출 지연 최적화' },
      { path: '/upload', label: '파일 비동기 업로드', icon: 'ri-upload-cloud-line', file: 'FileUpload.tsx', component: FileUpload, summary: '파일 선택 및 업로드 진행 상태' },
      { path: '/optimistic-like', label: '낙관적 업데이트', icon: 'ri-thumb-up-line', file: 'OptimisticLike.tsx', component: OptimisticLike, summary: 'API 응답 전 화면부터 즉시 갱신하는 UX 패턴' },
    ],
  },
  {
    key: 'auth',
    title: '7. 인증 / 권한',
    icon: 'ri-shield-user-line',
    description: '사용자 식별 및 권한 제어',
    items: [
      { path: '/permission', label: '권한별 화면 제어', icon: 'ri-lock-line', file: 'PermissionMenu.tsx', component: PermissionMenu, summary: '일반/관리자 권한에 따른 컴포넌트 노출' },
    ],
  },
  {
    key: 'components',
    title: '8. 실무 컴포넌트',
    icon: 'ri-shape-2-line',
    description: '재사용성을 극대화한 컴포넌트 패턴',
    items: [
      { path: '/components-showcase', label: '공통 뼈대 컴포넌트', icon: 'ri-puzzle-line', file: 'ComponentShowcase.tsx', component: ComponentShowcase, summary: 'Breadcrumb, StepIndicator, StateWrapper' },
    ],
  },
  {
    key: 'admin',
    title: '9. 관리자 페이지',
    icon: 'ri-dashboard-3-line',
    description: 'B2B/백오피스 전용 패턴',
    items: [
      { path: '/admin-dashboard', label: '대시보드 KPI 카드', icon: 'ri-dashboard-2-line', file: 'AdminDashboardCard.tsx', component: AdminDashboardCard, summary: '주요 지표(KPI) 및 증감률 박스' },
      { path: '/admin-status', label: '상태 요약 박스', icon: 'ri-git-commit-line', file: 'AdminStatusSummary.tsx', component: AdminStatusSummary, summary: '프로세스 파이프라인 형태 요약' },
      { path: '/admin-activity', label: '최근 활동 타임라인', icon: 'ri-history-line', file: 'AdminRecentActivity.tsx', component: AdminRecentActivity, summary: '시스템 주요 로그를 타임라인으로 렌더링' },
      { path: '/admin-notice', label: '미니 공지사항 리스트', icon: 'ri-megaphone-line', file: 'AdminNoticeList.tsx', component: AdminNoticeList, summary: '공지사항 및 뱃지 처리' },
      { path: '/admin-users', label: '사용자 관리 테이블', icon: 'ri-group-line', file: 'AdminUserManagement.tsx', component: AdminUserManagement, summary: '아바타, 상태 뱃지, 액션 버튼 조합' },
      { path: '/admin-search', label: '검색바 + 액션버튼', icon: 'ri-search-eye-line', file: 'AdminSearchAction.tsx', component: AdminSearchAction, summary: '목록 상단의 필터 및 등록 버튼' },
    ],
  },
  {
    key: 'business',
    title: '10. 업무 로직 예제',
    icon: 'ri-briefcase-line',
    description: '실제 도메인 요구사항이 반영된 로직',
    items: [
      { path: '/cart', label: '장바구니 수량/금액 계산', icon: 'ri-shopping-cart-line', file: 'CartQuantity.tsx', component: CartQuantity, summary: '아이템별 수량 및 총액 실시간 계산' },
      { path: '/approval-workflow', label: '승인/반려 상태 처리', icon: 'ri-git-branch-line', file: 'ApprovalWorkflow.tsx', component: ApprovalWorkflow, summary: '문서 상태 기반 워크플로우 제어' },
      { path: '/multi-step', label: '다단계 마법사 (Wizard)', icon: 'ri-magic-line', file: 'MultiStepWizard.tsx', component: MultiStepWizard, summary: '단계별 폼 데이터 유지 및 유효성 검사' },
    ],
  },
  {
    key: 'charts',
    title: '11. 데이터 시각화(Charts)',
    icon: 'ri-pie-chart-2-line',
    description: 'Recharts 기반 고급 차트 패턴',
    items: [
      { path: '/chart-live', label: '실시간 꺾은선 차트', icon: 'ri-pulse-line', file: 'LiveChartDashboard.tsx', component: LiveChartDashboard, summary: '1초마다 갱신되는 큐 기반 라인 차트' },
      { path: '/chart-gauge', label: '목표 달성 게이지', icon: 'ri-dashboard-3-line', file: 'KpiGaugeChart.tsx', component: KpiGaugeChart, summary: '파이차트를 응용한 KPI 퍼센트 게이지' },
      { path: '/chart-dynamic', label: '동적 파이 차트', icon: 'ri-pie-chart-line', file: 'DynamicPieChart.tsx', component: DynamicPieChart, summary: '테이블 체크박스에 연동되는 실시간 파이' },
      { path: '/echarts-mixed', label: '이중 Y축 복합 차트', icon: 'ri-bar-chart-2-line', file: 'EchartsMixed.tsx', component: EchartsMixed, summary: 'ECharts: 막대(매출)와 꺾은선(성장률)' },
      { path: '/echarts-radar', label: '레이더 차트', icon: 'ri-radar-line', file: 'EchartsRadar.tsx', component: EchartsRadar, summary: 'ECharts: 다각도 역량/스펙 비교 거미줄' },
      { path: '/echarts-heatmap', label: '매트릭스 히트맵', icon: 'ri-grid-fill', file: 'EchartsHeatmap.tsx', component: EchartsHeatmap, summary: 'ECharts: 요일별 시간대 트래픽 분포 색상화' },
    ],
  },
  {
    key: 'echarts-guide',
    title: '12. ECharts 완벽 가이드',
    icon: 'ri-bar-chart-box-line',
    description: '실무에서 가장 많이 쓰는 ECharts 옵션과 패턴 총망라',
    items: [
      { path: '/echarts-basic', label: '기본 차트 (6종)', icon: 'ri-bar-chart-line', file: 'EchartsBasic.tsx', component: EchartsBasic, summary: 'Line, Bar, Pie 등 필수 6가지 기초 차트 모음' },
      { path: '/echarts-compare', label: '비교 차트 (5종)', icon: 'ri-bar-chart-grouped-line', file: 'EchartsCompare.tsx', component: EchartsCompare, summary: '다중 라인, 누적 막대, 면적 그래프 비교' },
      { path: '/echarts-dashboard-cards', label: '대시보드 차트 (5종)', icon: 'ri-dashboard-2-line', file: 'EchartsDashboard.tsx', component: EchartsDashboard, summary: 'KPI 스파크라인, 미니 차트, 게이지, 상태 도넛' },
      { path: '/echarts-advanced', label: '고급 기능 (7종)', icon: 'ri-tools-fill', file: 'EchartsAdvanced.tsx', component: EchartsAdvanced, summary: 'Tooltip, DataZoom, 마커 커스텀 및 실시간 렌더링' },
    ],
  },
];

export const EXAMPLE_LIST = EXAMPLE_CATEGORIES.flatMap((category) => category.items);
