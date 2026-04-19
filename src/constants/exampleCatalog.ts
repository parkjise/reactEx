import type { ComponentType } from 'react';
import { Dashboard } from '../pages/Dashboard';
import { LoginForm } from '../pages/LoginForm';
import { UserList } from '../pages/UserList';
import { SearchFilter } from '../pages/SearchFilter';
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
    title: '폼 · 입력 처리',
    icon: 'ri-file-edit-line',
    description: '로그인, 검증, 다단계 입력처럼 폼 중심 패턴을 모았습니다.',
    items: [
      { path: '/login', label: '로그인 폼', icon: 'ri-login-box-line', file: 'LoginForm.tsx', component: LoginForm, summary: '아이디와 비밀번호 입력 흐름의 기본 패턴입니다.' },
      { path: '/validation', label: '폼 유효성검사', icon: 'ri-file-warning-line', file: 'FormValidation.tsx', component: FormValidation, summary: '복합 상태와 에러 메시지를 함께 다루는 폼 패턴입니다.' },
      { path: '/profile-edit', label: '프로필 수정 폼', icon: 'ri-user-settings-line', file: 'EditableProfileForm.tsx', component: EditableProfileForm, summary: 'dirty check와 저장 가능 여부를 제어하는 실무형 편집 폼입니다.' },
      { path: '/checkout-step', label: '다단계 주문서', icon: 'ri-route-line', file: 'MultiStepCheckout.tsx', component: MultiStepCheckout, summary: '여러 단계의 입력을 끊어서 관리하는 스텝 폼입니다.' },
      { path: '/tag-input', label: '태그 입력 필드', icon: 'ri-price-tag-3-line', file: 'TagInputField.tsx', component: TagInputField, summary: '키워드, 태그, 수신자 입력에서 자주 쓰는 입력 패턴입니다.' },
      { path: '/date-range', label: '기간 필터', icon: 'ri-calendar-event-line', file: 'DateRangeFilter.tsx', component: DateRangeFilter, summary: '조회 조건에서 흔한 시작일/종료일 검증 흐름입니다.' },
    ],
  },
  {
    key: 'data',
    title: '목록 · 검색 · 테이블',
    icon: 'ri-table-2',
    description: '조회성 화면에서 가장 자주 등장하는 리스트 패턴입니다.',
    items: [
      { path: '/users', label: '회원 목록', icon: 'ri-user-line', file: 'UserList.tsx', component: UserList, summary: '배열 데이터를 표로 안전하게 렌더링합니다.' },
      { path: '/search', label: '검색/필터', icon: 'ri-search-line', file: 'SearchFilter.tsx', component: SearchFilter, summary: '검색어와 카테고리 조합 필터의 기본 형태입니다.' },
      { path: '/sort', label: '정렬 테이블', icon: 'ri-table-line', file: 'SortTable.tsx', component: SortTable, summary: '컬럼 정렬이 붙은 관리용 테이블 패턴입니다.' },
      { path: '/pagination', label: '페이지네이션', icon: 'ri-pages-line', file: 'PaginationSample.tsx', component: PaginationSample, summary: '긴 목록을 페이지 단위로 나누는 방식입니다.' },
      { path: '/debounced-search', label: '디바운스 검색', icon: 'ri-timer-flash-line', file: 'DebouncedSearch.tsx', component: DebouncedSearch, summary: '입력마다 API를 치지 않도록 지연 검색을 적용합니다.' },
      { path: '/bulk-action', label: '일괄 처리 테이블', icon: 'ri-list-check-3', file: 'BulkActionTable.tsx', component: BulkActionTable, summary: '선택 행과 일괄 작업 버튼을 함께 관리합니다.' },
      { path: '/skeleton-list', label: '스켈레톤 로딩 리스트', icon: 'ri-layout-masonry-line', file: 'SkeletonList.tsx', component: SkeletonList, summary: '로딩 중 자리 흔들림을 줄이는 스켈레톤 UX 패턴입니다.' },
    ],
  },
  {
    key: 'interaction',
    title: '상태 · 인터랙션',
    icon: 'ri-cursor-line',
    description: '체크, 탭, 드롭다운처럼 화면 반응을 다루는 예제입니다.',
    items: [
      { path: '/checkbox', label: '전체선택', icon: 'ri-checkbox-line', file: 'CheckboxSelect.tsx', component: CheckboxSelect, summary: '테이블과 리스트에서 반복되는 선택 상태 패턴입니다.' },
      { path: '/modal', label: '모달', icon: 'ri-window-line', file: 'ModalSample.tsx', component: ModalSample, summary: '열기/닫기와 배경 오버레이 처리를 보여줍니다.' },
      { path: '/tabs', label: '탭 메뉴', icon: 'ri-layout-top-line', file: 'TabMenu.tsx', component: TabMenu, summary: '같은 영역 안에서 컨텍스트를 전환하는 UI입니다.' },
      { path: '/accordion', label: '아코디언 FAQ', icon: 'ri-question-answer-line', file: 'AccordionFaq.tsx', component: AccordionFaq, summary: '열림 상태를 제어하는 전형적인 패턴입니다.' },
      { path: '/dropdown', label: '드롭다운', icon: 'ri-arrow-down-s-line', file: 'DropdownSample.tsx', component: DropdownSample, summary: '선택형 옵션 메뉴의 기본 구조입니다.' },
      { path: '/cart', label: '장바구니 수량', icon: 'ri-shopping-cart-line', file: 'CartQuantity.tsx', component: CartQuantity, summary: '수량 증가/감소처럼 이전 값 기반 업데이트를 다룹니다.' },
      { path: '/todo', label: 'Todo 리스트', icon: 'ri-list-check-2', file: 'TodoList.tsx', component: TodoList, summary: '추가, 완료, 삭제가 섞인 CRUD 기본형입니다.' },
      { path: '/toast', label: '토스트 알림', icon: 'ri-message-3-line', file: 'ToastAlert.tsx', component: ToastAlert, summary: '사용자 액션 후 피드백을 짧게 전달합니다.' },
      { path: '/darkmode', label: '다크모드 관리', icon: 'ri-moon-line', file: 'DarkModeSample.tsx', component: DarkModeSample, summary: '전역 UI 상태가 화면 전체에 반영되는 예제입니다.' },
    ],
  },
  {
    key: 'async',
    title: '비동기 · 네트워크',
    icon: 'ri-exchange-funds-line',
    description: '데이터 요청, 업로드, 낙관적 UI처럼 서버 연동 중심 예제입니다.',
    items: [
      { path: '/api', label: 'API 로딩처리', icon: 'ri-loader-4-line', file: 'ApiFetchSample.tsx', component: ApiFetchSample, summary: 'data/loading/error 3상태를 분리합니다.' },
      { path: '/upload', label: '파일 업로드', icon: 'ri-upload-cloud-line', file: 'FileUpload.tsx', component: FileUpload, summary: '파일 선택, 검증, 업로드 준비 흐름입니다.' },
      { path: '/infinite-feed', label: '무한 스크롤 피드', icon: 'ri-align-vertically', file: 'InfiniteScrollFeed.tsx', component: InfiniteScrollFeed, summary: '다음 페이지를 이어 붙이는 피드형 로딩 방식입니다.' },
      { path: '/optimistic-like', label: '낙관적 좋아요', icon: 'ri-thumb-up-line', file: 'OptimisticLike.tsx', component: OptimisticLike, summary: '서버 응답 전 UI를 먼저 갱신하는 패턴입니다.' },
    ],
  },
  {
    key: 'ops',
    title: '운영 · 권한',
    icon: 'ri-shield-user-line',
    description: '백오피스와 협업 도구에서 자주 쓰는 운영성 예제입니다.',
    items: [
      { path: '/permission', label: '권한별 메뉴', icon: 'ri-lock-line', file: 'PermissionMenu.tsx', component: PermissionMenu, summary: '권한에 따라 노출 메뉴를 달리하는 패턴입니다.' },
      { path: '/approval-workflow', label: '승인 워크플로우', icon: 'ri-git-branch-line', file: 'ApprovalWorkflow.tsx', component: ApprovalWorkflow, summary: '상태 전환과 승인 이력을 한 화면에서 관리합니다.' },
    ],
  },
];

export const EXAMPLE_LIST = EXAMPLE_CATEGORIES.flatMap((category) => category.items);

