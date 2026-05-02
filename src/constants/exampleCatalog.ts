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

import { InfiniteScrollFeed } from '../pages/InfiniteScrollFeed';
import { SkeletonList } from '../pages/SkeletonList';
import { OptimisticLike } from '../pages/OptimisticLike';

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
import { TagInputField } from '../pages/TagInputField';
import { SelectionToggleInteractions } from '../pages/SelectionToggleInteractions';
import { LoadingFeedbackInteractions } from '../pages/LoadingFeedbackInteractions';
import { AdminControlInteractions } from '../pages/AdminControlInteractions';
import { ListTableFilterInteractions } from '../pages/ListTableFilterInteractions';
import { AdvancedPanelMediaInteractions } from '../pages/AdvancedPanelMediaInteractions';
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

// Styled-components Guide
import { StyledGlobalSample } from '../pages/styled/StyledGlobalSample';
import { StyledThemeSample } from '../pages/styled/StyledThemeSample';
import { StyledMixinsSample } from '../pages/styled/StyledMixinsSample';
import { StyledButtonSample } from '../pages/styled/StyledButtonSample';
import { StyledInputSample } from '../pages/styled/StyledInputSample';
import { StyledPropsSample } from '../pages/styled/StyledPropsSample';
import { StyledResponsiveSample } from '../pages/styled/StyledResponsiveSample';
import { StyledDarkModeSample } from '../pages/styled/StyledDarkModeSample';
import { StyledCardSample } from '../pages/styled/StyledCardSample';
import { StyledModalSample } from '../pages/styled/StyledModalSample';
import { StyledToastSample } from '../pages/styled/StyledToastSample';
import { StyledBadgeSample } from '../pages/styled/StyledBadgeSample';
import { StyledTableSample } from '../pages/styled/StyledTableSample';
import { StyledFormLayoutSample } from '../pages/styled/StyledFormLayoutSample';
import { StyledDashboardLayoutSample } from '../pages/styled/StyledDashboardLayoutSample';
import { StyledSidebarLayoutSample } from '../pages/styled/StyledSidebarLayoutSample';
import { StyledEllipsisSample } from '../pages/styled/StyledEllipsisSample';
import { StyledScrollbarSample } from '../pages/styled/StyledScrollbarSample';
import { StyledStatesSample } from '../pages/styled/StyledStatesSample';
import { StyledTipsSample } from '../pages/styled/StyledTipsSample';

// SCSS Guide
import {
  ScssAmpersandSample,
  ScssCardSample,
  ScssClassNameSample,
  ScssCompareSample,
  ScssComponentSelectorSample,
  ScssFormSample,
  ScssHelperMixinSample,
  ScssLayoutSample,
  ScssMediaMixinSample,
  ScssNestedSample,
  ScssPropsSample,
  ScssPseudoSample,
  ScssStateSample,
  ScssTableSample,
  ScssThemeMixinSample,
  ScssTipsSample,
} from '../pages/scss/ScssGuidePage';
import {
  TypescriptAdvancedSample,
  TypescriptApiSample,
  TypescriptBasicTypeSample,
  TypescriptFunctionSample,
  TypescriptGenericSample,
  TypescriptHookSample,
  TypescriptModelSample,
  TypescriptObjectSample,
  TypescriptReactSample,
  TypescriptSetupSample,
  TypescriptUnionSample,
  TypescriptUtilitySample,
} from '../pages/typescript/TypescriptGuidePage';

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
      { path: '/ui-modal-basic', label: '모달 열기/닫기', icon: 'ri-window-line', file: 'ModalSample.tsx', component: ModalSample, summary: '기본 모달 오버레이 제어' },
      { path: '/ui-modal-advanced', label: '모달 ESC/스크롤락', icon: 'ri-window-2-line', file: 'AdvancedModalInteraction.tsx', component: AdvancedModalInteraction, summary: 'ESC 닫기, 배경 스크롤 잠금, 다중 모달' },
      { path: '/ui-dropdown-outside', label: '외부 클릭 드롭다운', icon: 'ri-arrow-down-s-line', file: 'DropdownSample.tsx', component: DropdownSample, summary: '드롭다운 열기/닫기와 외부 클릭 닫기' },
      { path: '/ui-tooltip-copy', label: '툴팁/복사/스낵바', icon: 'ri-chat-3-line', file: 'FloatingInteractions.tsx', component: FloatingInteractions, summary: '툴팁 표시, 복사 완료 메시지, 우클릭 메뉴' },
      { path: '/ui-selection-toggle', label: '선택/토글/패널', icon: 'ri-toggle-line', file: 'SelectionToggleInteractions.tsx', component: SelectionToggleInteractions, summary: '사이드바, 라디오, 카드 선택, active 메뉴, 스위치, 좋아요, 알림/프로필 패널' },
      { path: '/ui-loading-feedback', label: '로딩/피드백 종합', icon: 'ri-loader-4-line', file: 'LoadingFeedbackInteractions.tsx', component: LoadingFeedbackInteractions, summary: '버튼 로딩, 비활성화, 저장 성공/실패, 자동 닫힘 알림' },
      { path: '/ui-loading-state', label: '로딩/에러 상태', icon: 'ri-loader-4-line', file: 'ApiFetchSample.tsx', component: ApiFetchSample, summary: '로딩 스피너와 실패 상태 메시지' },
      { path: '/ui-skeleton-state', label: '스켈레톤 표시', icon: 'ri-layout-masonry-line', file: 'SkeletonList.tsx', component: SkeletonList, summary: '목록 로딩 중 뼈대 UI 표시' },
      { path: '/ui-file-drag', label: '파일 드래그 업로드', icon: 'ri-upload-cloud-line', file: 'FileUpload.tsx', component: FileUpload, summary: '드래그 상태와 업로드 진행률 표시' },
      { path: '/ui-admin-controls', label: '관리자 제어 종합', icon: 'ri-dashboard-3-line', file: 'AdminControlInteractions.tsx', component: AdminControlInteractions, summary: '상세 검색, 확인 모달, 페이지 크기, 컬럼 설정, 공지/위젯 접기' },
      { path: '/ui-admin-search-filter', label: '검색 필터 펼침', icon: 'ri-search-eye-line', file: 'AdminSearchAction.tsx', component: AdminSearchAction, summary: '관리자 목록 상단 검색과 액션 버튼' },
      { path: '/ui-filter-reset', label: '필터 초기화', icon: 'ri-filter-clear-line', file: 'FilterReset.tsx', component: FilterReset, summary: '여러 조건 필터 조합과 초기화' },
      { path: '/ui-sort-toggle', label: '정렬 토글', icon: 'ri-arrow-up-down-line', file: 'SortTable.tsx', component: SortTable, summary: '오름차순/내림차순 반복 전환' },
      { path: '/ui-pagination-active', label: '페이지네이션 Active', icon: 'ri-pages-line', file: 'PaginationSample.tsx', component: PaginationSample, summary: '현재 페이지 active 처리' },
      { path: '/ui-list-table-filters', label: '리스트/테이블 필터 종합', icon: 'ri-filter-3-line', file: 'ListTableFilterInteractions.tsx', component: ListTableFilterInteractions, summary: '검색, 상태 탭, 북마크, Empty, Skeleton, 즉시 삭제, 현재 페이지 active' },
      { path: '/ui-table-detail-edit', label: '행 상세/수정/삭제', icon: 'ri-table-line', file: 'InteractiveTable.tsx', component: InteractiveTable, summary: '행 클릭 상세, 더블클릭 수정, hover 액션, Empty UI' },
      { path: '/ui-bulk-actionbar', label: '선택 액션바', icon: 'ri-list-check-3', file: 'BulkActionTable.tsx', component: BulkActionTable, summary: '행 선택 시 상단 액션바 노출' },
      { path: '/ui-infinite-scroll', label: '무한 스크롤 로딩', icon: 'ri-align-vertically', file: 'InfiniteScrollFeed.tsx', component: InfiniteScrollFeed, summary: '스크롤 하단 도달 시 추가 데이터 로딩' },
      { path: '/ui-drag-sort', label: '드래그 앤 드롭 정렬', icon: 'ri-drag-drop-line', file: 'DragDropList.tsx', component: DragDropList, summary: '아이템 순서 변경' },
      { path: '/ui-scroll-layout', label: '스크롤 레이아웃 제어', icon: 'ri-layout-row-line', file: 'LayoutInteractions.tsx', component: LayoutInteractions, summary: '텍스트 접기, sticky 헤더, Top 버튼' },
      { path: '/ui-tag-input', label: '복수 태그 입력', icon: 'ri-price-tag-3-line', file: 'TagInputField.tsx', component: TagInputField, summary: '태그 추가와 삭제' },
      { path: '/ui-advanced-panel-media', label: '고급 패널/미디어', icon: 'ri-sparkling-line', file: '', component: AdvancedPanelMediaInteractions, summary: '리사이즈, split view, 타이머, 이미지, 날짜, 컨텍스트 메뉴, 슬라이드 패널, 바텀시트' },
      { path: '/ui-step-progress', label: '스텝형 진행 UI', icon: 'ri-magic-line', file: 'MultiStepWizard.tsx', component: MultiStepWizard, summary: '단계별 입력 흐름과 진행 상태' },
      { path: '/ui-approval-confirm', label: '승인/반려 확인', icon: 'ri-git-branch-line', file: 'ApprovalWorkflow.tsx', component: ApprovalWorkflow, summary: '상태 변경 전 확인 흐름' },
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
  {
    key: 'styled-guide',
    title: '13. Styled-components 가이드',
    icon: 'ri-palette-line',
    description: '실무에서 바로 쓰는 Styled-components 구조와 20가지 핵심 패턴',
    items: [
      { path: '/styled-global', label: '1. GlobalStyle / Reset', icon: 'ri-global-line', file: 'StyledGlobalSample.tsx', component: StyledGlobalSample, summary: '전역 스타일 및 CSS 변수 셋업' },
      { path: '/styled-theme', label: '2. ThemeProvider', icon: 'ri-paint-brush-line', file: 'StyledThemeSample.tsx', component: StyledThemeSample, summary: '테마 토큰 주입 및 활용' },
      { path: '/styled-button', label: '3. 공통 Button', icon: 'ri-focus-2-line', file: 'StyledButtonSample.tsx', component: StyledButtonSample, summary: 'Props 기반 버튼 UI' },
      { path: '/styled-input', label: '4. 공통 Form 요소', icon: 'ri-input-cursor-move', file: 'StyledInputSample.tsx', component: StyledInputSample, summary: 'Input, Select, Checkbox' },
      { path: '/styled-props', label: '5. Props 동적 스타일', icon: 'ri-code-s-slash-line', file: 'StyledPropsSample.tsx', component: StyledPropsSample, summary: '상태(status)에 따른 다중 조건 분기' },
      { path: '/styled-mixins', label: '6. Mixins 공통 스타일', icon: 'ri-magic-line', file: 'StyledMixinsSample.tsx', component: StyledMixinsSample, summary: '중복 CSS를 제거하는 mixins 패턴' },
      { path: '/styled-responsive', label: '7. 반응형 레이아웃', icon: 'ri-smartphone-line', file: 'StyledResponsiveSample.tsx', component: StyledResponsiveSample, summary: '모바일/태블릿 분기 미디어 쿼리' },
      { path: '/styled-darkmode', label: '8. 다크모드', icon: 'ri-moon-clear-line', file: 'StyledDarkModeSample.tsx', component: StyledDarkModeSample, summary: '테마 스위칭으로 다크모드 구현' },
      { path: '/styled-card', label: '9. Card UI', icon: 'ri-layout-masonry-line', file: 'StyledCardSample.tsx', component: StyledCardSample, summary: '패딩과 그림자 제어 카드' },
      { path: '/styled-modal', label: '10. Modal UI', icon: 'ri-window-line', file: 'StyledModalSample.tsx', component: StyledModalSample, summary: 'Portal 기반 애니메이션 모달' },
      { path: '/styled-toast', label: '11. Toast 알림', icon: 'ri-message-3-line', file: 'StyledToastSample.tsx', component: StyledToastSample, summary: '타이머 애니메이션 알림' },
      { path: '/styled-badge', label: '12. Badge / Status', icon: 'ri-price-tag-3-line', file: 'StyledBadgeSample.tsx', component: StyledBadgeSample, summary: '투명도 기반 상태 뱃지' },
      { path: '/styled-table', label: '13. Table 스타일링', icon: 'ri-table-2', file: 'StyledTableSample.tsx', component: StyledTableSample, summary: '정렬 및 hover가 포함된 테이블' },
      { path: '/styled-form-layout', label: '14. Form Layout', icon: 'ri-layout-column-line', file: 'StyledFormLayoutSample.tsx', component: StyledFormLayoutSample, summary: 'Grid/Flex 기반 폼 구조' },
      { path: '/styled-dashboard', label: '15. Dashboard Layout', icon: 'ri-dashboard-2-line', file: 'StyledDashboardLayoutSample.tsx', component: StyledDashboardLayoutSample, summary: '12-Grid 시스템 레이아웃' },
      { path: '/styled-sidebar', label: '16. Sidebar Layout', icon: 'ri-layout-left-2-line', file: 'StyledSidebarLayoutSample.tsx', component: StyledSidebarLayoutSample, summary: '모바일 대응 토글 사이드바' },
      { path: '/styled-ellipsis', label: '17. 말줄임 처리', icon: 'ri-text-wrap', file: 'StyledEllipsisSample.tsx', component: StyledEllipsisSample, summary: '1줄 및 다중 라인 Ellipsis' },
      { path: '/styled-scrollbar', label: '18. 스크롤 커스텀', icon: 'ri-list-check-2', file: 'StyledScrollbarSample.tsx', component: StyledScrollbarSample, summary: '스크롤바 디자인 및 숨김' },
      { path: '/styled-states', label: '19. 상태 (Hover/Active)', icon: 'ri-cursor-line', file: 'StyledStatesSample.tsx', component: StyledStatesSample, summary: '인터랙션 및 disabled CSS' },
      { path: '/styled-tips', label: '20. 실무 팁 & 안티패턴', icon: 'ri-lightbulb-flash-line', file: 'StyledTipsSample.tsx', component: StyledTipsSample, summary: '최적화 및 흔한 실수 해결' },
    ],
  },
  {
    key: 'scss-guide',
    title: '14. SCSS 가이드',
    icon: 'ri-braces-line',
    description: 'SCSS와 styled-components를 함께 이해하는 실무 스타일링 핵심 패턴',
    items: [
      { path: '/scss-compare', label: '1. styled-components와 SCSS 차이', icon: 'ri-scales-3-line', file: 'ScssGuidePage.tsx', component: ScssCompareSample, summary: 'SCSS와 CSS-in-JS의 역할 분리' },
      { path: '/scss-nested', label: '2. 중첩 선택자', icon: 'ri-node-tree', file: 'ScssGuidePage.tsx', component: ScssNestedSample, summary: 'Card 구조 기반 안전한 중첩' },
      { path: '/scss-ampersand', label: '3. & 선택자', icon: 'ri-links-line', file: 'ScssGuidePage.tsx', component: ScssAmpersandSample, summary: '현재 선택자와 상태 패턴' },
      { path: '/scss-states', label: '4. hover / active / focus / disabled', icon: 'ri-cursor-line', file: 'ScssGuidePage.tsx', component: ScssStateSample, summary: '인터랙션 상태와 접근성' },
      { path: '/scss-pseudo', label: '5. ::before / ::after', icon: 'ri-asterisk', file: 'ScssGuidePage.tsx', component: ScssPseudoSample, summary: '장식 요소와 상태 dot 처리' },
      { path: '/scss-media-mixin', label: '6. media query mixin', icon: 'ri-smartphone-line', file: 'ScssGuidePage.tsx', component: ScssMediaMixinSample, summary: 'breakpoint helper 설계' },
      { path: '/scss-helper-mixin', label: '7. css helper mixin', icon: 'ri-tools-line', file: 'ScssGuidePage.tsx', component: ScssHelperMixinSample, summary: '반복 CSS helper 모음' },
      { path: '/scss-theme-mixin', label: '8. theme + mixin 조합', icon: 'ri-palette-line', file: 'ScssGuidePage.tsx', component: ScssThemeMixinSample, summary: '토큰과 mixin 결합' },
      { path: '/scss-props', label: '9. props 기반 스타일링', icon: 'ri-code-box-line', file: 'ScssGuidePage.tsx', component: ScssPropsSample, summary: 'variant/status/error/selected/columns' },
      { path: '/scss-classname', label: '10. className 상태 스타일링', icon: 'ri-price-tag-3-line', file: 'ScssGuidePage.tsx', component: ScssClassNameSample, summary: 'is-active 계열 상태 클래스' },
      { path: '/scss-component-selector', label: '11. 컴포넌트 선택자', icon: 'ri-parent-line', file: 'ScssGuidePage.tsx', component: ScssComponentSelectorSample, summary: '부모 hover와 내부 액션 표시' },
      { path: '/scss-form', label: '12. Form 스타일링', icon: 'ri-input-cursor-move', file: 'ScssGuidePage.tsx', component: ScssFormSample, summary: '라벨/에러/disabled 폼 구조' },
      { path: '/scss-table', label: '13. Table 스타일링', icon: 'ri-table-2', file: 'ScssGuidePage.tsx', component: ScssTableSample, summary: '헤더/행 hover/selected 처리' },
      { path: '/scss-card', label: '14. Card UI 스타일링', icon: 'ri-layout-masonry-line', file: 'ScssGuidePage.tsx', component: ScssCardSample, summary: '카드 구조와 상태 스타일' },
      { path: '/scss-layout', label: '15. Layout 스타일링', icon: 'ri-layout-2-line', file: 'ScssGuidePage.tsx', component: ScssLayoutSample, summary: 'Grid/Flex 반응형 레이아웃' },
      { path: '/scss-tips', label: '16. 실무 팁 정리', icon: 'ri-lightbulb-flash-line', file: 'ScssGuidePage.tsx', component: ScssTipsSample, summary: '안티패턴과 운영 체크리스트' },
    ],
  },
  {
    key: 'typescript-guide',
    title: '15. TypeScript 가이드',
    icon: 'ri-code-box-line',
    description: '기초 타입부터 React, API, 고급 타입 설계까지 실무 중심으로 익히는 TypeScript 패턴',
    items: [
      { path: '/ts-setup', label: '1. TypeScript 실무 셋업', icon: 'ri-settings-3-line', file: 'TypescriptGuidePage.tsx', component: TypescriptSetupSample, summary: 'strict 설정과 타입 작성 기준' },
      { path: '/ts-basic-types', label: '2. 기본 타입과 Literal Union', icon: 'ri-font-size', file: 'TypescriptGuidePage.tsx', component: TypescriptBasicTypeSample, summary: '상태값과 권한을 오타 없이 제한' },
      { path: '/ts-object-array', label: '3. 객체/배열/Optional', icon: 'ri-braces-line', file: 'TypescriptGuidePage.tsx', component: TypescriptObjectSample, summary: '실무 데이터 모델 작성법' },
      { path: '/ts-union-narrowing', label: '4. Union과 Narrowing', icon: 'ri-git-branch-line', file: 'TypescriptGuidePage.tsx', component: TypescriptUnionSample, summary: 'API 상태를 안전하게 분기' },
      { path: '/ts-function-callback', label: '5. 함수 타입과 Callback', icon: 'ri-function-line', file: 'TypescriptGuidePage.tsx', component: TypescriptFunctionSample, summary: 'validator, formatter 계약 고정' },
      { path: '/ts-interface-type', label: '6. interface와 type 설계', icon: 'ri-node-tree', file: 'TypescriptGuidePage.tsx', component: TypescriptModelSample, summary: '도메인 모델과 파생 타입 분리' },
      { path: '/ts-generics', label: '7. Generics', icon: 'ri-recycle-line', file: 'TypescriptGuidePage.tsx', component: TypescriptGenericSample, summary: '공통 API와 컴포넌트 재사용' },
      { path: '/ts-utility-types', label: '8. Utility Types', icon: 'ri-tools-line', file: 'TypescriptGuidePage.tsx', component: TypescriptUtilitySample, summary: 'Pick, Omit, Partial, Record' },
      { path: '/ts-api-dto', label: '9. API DTO와 화면 모델', icon: 'ri-exchange-funds-line', file: 'TypescriptGuidePage.tsx', component: TypescriptApiSample, summary: '서버 응답과 UI 모델 분리' },
      { path: '/ts-react-props-state', label: '10. React Props / State 타입', icon: 'ri-reactjs-line', file: 'TypescriptGuidePage.tsx', component: TypescriptReactSample, summary: 'props, state, event 타입 작성' },
      { path: '/ts-custom-hook', label: '11. Custom Hook 타입', icon: 'ri-links-line', file: 'TypescriptGuidePage.tsx', component: TypescriptHookSample, summary: '비동기 훅 반환 타입 설계' },
      { path: '/ts-advanced-patterns', label: '12. 고급 패턴과 Exhaustive Check', icon: 'ri-shield-check-line', file: 'TypescriptGuidePage.tsx', component: TypescriptAdvancedSample, summary: 'mapped type과 never 체크' },
    ],
  },
];

export const EXAMPLE_LIST = EXAMPLE_CATEGORIES.flatMap((category) => category.items);
