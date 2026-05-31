import React from 'react';
import styled from 'styled-components';
import { CodeViewer } from '../../components/CodeViewer';
import { StyledCard } from '../../components/styled/StyledCard';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';

type PreviewType = 'setup' | 'types' | 'object' | 'union' | 'function' | 'model' | 'generic' | 'utility' | 'api' | 'react' | 'hook' | 'advanced' | 'reactEvent' | 'reactState' | 'reactProps' | 'reactRef' | 'reactHoverTip';

interface TypescriptGuide {
  title: string;
  description: string;
  concept: string;
  usage: string;
  preview: PreviewType;
  exampleTitle: string;
  exampleCode: string;
  goodCode: string;
  badCode: string;
  mistake: string;
  solution: string;
}

const lines = (items: string[]) => items.join('\n');

const withExplanation = (explanation: string, items: string[]) =>
  lines(['/* [설명]', explanation, '*/', ...items]);

const PageGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Section = styled.section`
  min-width: 0; /* 중요: Grid 자식이 내부 컨텐츠(CodeViewer 등)에 의해 늘어나는 것을 방지 */

  h3 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PreviewPanel = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
  }
`;

const PreviewCard = styled.div<{ $tone?: 'primary' | 'success' | 'warning' | 'danger' }>`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid
    ${({ $tone, theme }) => {
      if ($tone === 'success') return theme.colors.success;
      if ($tone === 'warning') return theme.colors.primaryHover;
      if ($tone === 'danger') return theme.colors.error;
      return theme.colors.primary;
    }};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};

  strong {
    display: block;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TypeTag = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: 999px;
  padding: 7px 10px;
  background: ${({ $active, theme }) => ($active ? `${theme.colors.primary}12` : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: 0.86rem;
  font-weight: 700;
`;

const Flow = styled.div`
  display: grid;
  gap: 10px;
`;

const FlowItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};

  i {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const renderPreview = (type: PreviewType) => {
  if (type === 'setup') {
    return (
      <Flow>
        <FlowItem><i className="ri-settings-3-line"></i> strict 옵션으로 런타임 버그를 컴파일 단계에서 차단</FlowItem>
        <FlowItem><i className="ri-file-code-line"></i> tsconfig, ESLint, API 타입을 프로젝트 규칙으로 고정</FlowItem>
      </Flow>
    );
  }

  if (type === 'api' || type === 'react' || type === 'hook' || type === 'reactEvent' || type === 'reactState' || type === 'reactProps' || type === 'reactRef' || type === 'reactHoverTip') {
    return (
      <PreviewGrid>
        <PreviewCard><strong>React Types</strong><span>React 전용 제네릭과 타입을 활용합니다.</span></PreviewCard>
        <PreviewCard $tone="success"><strong>Type Inference</strong><span>컴파일러의 자동 추론을 최대한 믿습니다.</span></PreviewCard>
        <PreviewCard $tone="warning"><strong>Safety</strong><span>컴포넌트 간 데이터 전달 사고를 막습니다.</span></PreviewCard>
      </PreviewGrid>
    );
  }

  if (type === 'union' || type === 'advanced') {
    return (
      <TagRow>
        <TypeTag $active>idle</TypeTag>
        <TypeTag>loading</TypeTag>
        <TypeTag>success</TypeTag>
        <TypeTag>error</TypeTag>
        <TypeTag>exhaustive check</TypeTag>
      </TagRow>
    );
  }

  return (
    <PreviewGrid>
      <PreviewCard><strong>Type</strong><span>값의 모양을 먼저 약속합니다.</span></PreviewCard>
      <PreviewCard $tone="success"><strong>Narrowing</strong><span>조건문으로 안전하게 좁힙니다.</span></PreviewCard>
      <PreviewCard $tone="warning"><strong>Reuse</strong><span>generic과 utility로 반복을 줄입니다.</span></PreviewCard>
    </PreviewGrid>
  );
};

const genericBad = withExplanation('any는 급한 오류를 숨기지만 이후 자동완성, 리팩토링, API 변경 감지를 모두 약하게 만듭니다.', [
  'const data: any = await response.json();',
  'setUserName(data.user.name);',
  '',
  '// 서버 응답이 { profile: { name: string } }로 바뀌어도 컴파일러가 알려주지 못합니다.',
]);

const examples = {
  setup: withExplanation('실무 TypeScript는 타입 문법보다 프로젝트 규칙이 먼저입니다. strict를 켜고, 암묵적 any와 null 처리 누락을 초기에 잡아야 팀 코드의 품질이 일정해집니다.', [
    '// tsconfig.app.json',
    '{',
    '  "compilerOptions": {',
    '    "strict": true,',
    '    "noImplicitAny": true,',
    '    "noUncheckedIndexedAccess": true,',
    '    "exactOptionalPropertyTypes": true',
    '  }',
    '}',
    '',
    '// 값이 없을 수 있는 경우를 타입으로 드러냅니다.',
    'type User = { id: number; name: string; email?: string };',
    '',
    'const getEmailLabel = (user: User) => user.email ?? "이메일 미등록";',
  ]),
  basic: withExplanation('기본 타입은 변수에 붙이는 장식이 아니라 함수 입출력 계약입니다. 특히 string literal union을 쓰면 status, role, variant 같은 값을 오타 없이 제한할 수 있습니다.', [
    'type Role = "admin" | "manager" | "member";',
    'type UserStatus = "active" | "pending" | "blocked";',
    '',
    'interface UserSummary {',
    '  id: number;',
    '  name: string;',
    '  role: Role;',
    '  status: UserStatus;',
    '  lastLoginAt: string | null;',
    '}',
    '',
    'const isAdmin = (user: UserSummary) => user.role === "admin";',
  ]),
  object: withExplanation('객체와 배열은 실무 데이터의 대부분입니다. 읽기 전용 배열, optional property, Record를 함께 쓰면 목록/상태/설정 타입을 안정적으로 표현할 수 있습니다.', [
    'type Product = {',
    '  readonly id: number;',
    '  name: string;',
    '  price: number;',
    '  tags: readonly string[];',
    '  discountRate?: number;',
    '};',
    '',
    'type ProductMap = Record<number, Product>;',
    '',
    'const getFinalPrice = (product: Product) => {',
    '  const rate = product.discountRate ?? 0;',
    '  return product.price * (1 - rate);',
    '};',
  ]),
  union: withExplanation('union은 여러 가능성을 표현하고 narrowing은 현재 안전한 가능성만 남기는 과정입니다. API 상태, 폼 상태, 권한 분기에 가장 자주 사용합니다.', [
    'type RequestState<T> =',
    '  | { status: "idle" }',
    '  | { status: "loading" }',
    '  | { status: "success"; data: T }',
    '  | { status: "error"; message: string };',
    '',
    'const getStateLabel = <T,>(state: RequestState<T>) => {',
    '  switch (state.status) {',
    '    case "idle": return "대기";',
    '    case "loading": return "불러오는 중";',
    '    case "success": return "완료";',
    '    case "error": return state.message;',
    '  }',
    '};',
  ]),
  function: withExplanation('함수 타입은 인자와 반환값의 약속입니다. 콜백, 이벤트 핸들러, formatter, validator처럼 재사용되는 로직은 타입 별칭으로 분리하면 읽기 쉽습니다.', [
    'type Validator<T> = (value: T) => string | null;',
    'type Formatter<T> = (value: T) => string;',
    '',
    'const required: Validator<string> = (value) =>',
    '  value.trim() ? null : "필수 입력값입니다.";',
    '',
    'const currency: Formatter<number> = (value) =>',
    '  value.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });',
  ]),
  model: withExplanation('interface와 type은 둘 다 객체 모델링에 쓸 수 있습니다. 확장될 공개 객체는 interface, union/utility 조합은 type을 많이 씁니다.', [
    'interface BaseEntity {',
    '  id: number;',
    '  createdAt: string;',
    '}',
    '',
    'interface Customer extends BaseEntity {',
    '  name: string;',
    '  grade: "basic" | "vip";',
    '}',
    '',
    'type CustomerFilter = Partial<Pick<Customer, "name" | "grade">>;',
  ]),
  generic: withExplanation('generic은 타입을 인자로 받는 함수입니다. fetcher, table, select, form field처럼 데이터 모양은 다르지만 처리 방식이 같은 코드를 재사용할 때 씁니다.', [
    'interface ApiResponse<T> {',
    '  data: T;',
    '  message: string;',
    '  requestedAt: string;',
    '}',
    '',
    'const unwrap = <T,>(response: ApiResponse<T>): T => response.data;',
    '',
    'const users = unwrap<{ id: number; name: string }[]>({',
    '  data: [{ id: 1, name: "김민수" }],',
    '  message: "ok",',
    '  requestedAt: new Date().toISOString(),',
    '});',
  ]),
  utility: withExplanation('Utility Type은 이미 만든 타입을 변형하는 도구입니다. 생성 요청, 수정 요청, 화면 전용 타입을 원본 모델에서 파생하면 중복과 누락이 줄어듭니다.', [
    'interface Product {',
    '  id: number;',
    '  name: string;',
    '  price: number;',
    '  stock: number;',
    '  createdAt: string;',
    '}',
    '',
    'type CreateProductRequest = Omit<Product, "id" | "createdAt">;',
    'type UpdateProductRequest = Partial<CreateProductRequest>;',
    'type ProductSummary = Pick<Product, "id" | "name" | "price">;',
    'type ProductFormErrors = Partial<Record<keyof CreateProductRequest, string>>;',
  ]),
  api: withExplanation('서버 DTO를 그대로 화면에서 쓰지 말고 UI 모델로 변환하면 날짜, 금액, optional 값 처리가 한곳에 모입니다. API 변경도 mapper에서 먼저 감지됩니다.', [
    'interface UserDto {',
    '  user_id: number;',
    '  user_name: string;',
    '  last_login_at: string | null;',
    '}',
    '',
    'interface UserViewModel {',
    '  id: number;',
    '  name: string;',
    '  lastLoginLabel: string;',
    '}',
    '',
    'const toUserViewModel = (dto: UserDto): UserViewModel => ({',
    '  id: dto.user_id,',
    '  name: dto.user_name,',
    '  lastLoginLabel: dto.last_login_at',
    '    ? new Date(dto.last_login_at).toLocaleDateString("ko-KR")',
    '    : "로그인 기록 없음",',
    '});',
  ]),
  react: withExplanation('React에서는 props, state, event 타입을 명확히 잡으면 컴포넌트를 바꿀 때 영향 범위를 빨리 알 수 있습니다. children은 React.ReactNode, 이벤트는 React.ChangeEvent처럼 구체적으로 씁니다.', [
    'interface SearchBoxProps {',
    '  value: string;',
    '  placeholder?: string;',
    '  onChange: (value: string) => void;',
    '  onSubmit: () => void;',
    '}',
    '',
    'const SearchBox: React.FC<SearchBoxProps> = ({ value, placeholder, onChange, onSubmit }) => {',
    '  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {',
    '    onChange(event.target.value);',
    '  };',
    '',
    '  return (',
    '    <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>',
    '      <input value={value} placeholder={placeholder} onChange={handleChange} />',
    '      <button type="submit">검색</button>',
    '    </form>',
    '  );',
    '};',
  ]),
  hook: withExplanation('커스텀 훅은 반환 타입을 명확히 하면 사용하는 컴포넌트에서 상태 분기가 쉬워집니다. 데이터, 로딩, 에러, 명령 함수를 한 타입으로 묶어 반환합니다.', [
    'type AsyncResult<T> = {',
    '  data: T | null;',
    '  isLoading: boolean;',
    '  errorMessage: string | null;',
    '  refetch: () => Promise<void>;',
    '};',
    '',
    'const useAsyncResource = <T,>(fetcher: () => Promise<T>): AsyncResult<T> => {',
    '  const [data, setData] = React.useState<T | null>(null);',
    '  const [isLoading, setIsLoading] = React.useState(false);',
    '  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);',
    '',
    '  const refetch = React.useCallback(async () => {',
    '    setIsLoading(true);',
    '    setErrorMessage(null);',
    '    try { setData(await fetcher()); }',
    '    catch { setErrorMessage("데이터를 불러오지 못했습니다."); }',
    '    finally { setIsLoading(false); }',
    '  }, [fetcher]);',
    '',
    '  return { data, isLoading, errorMessage, refetch };',
    '};',
  ]),
  advanced: withExplanation('고급 TypeScript는 복잡하게 쓰는 것이 목표가 아닙니다. 상태를 빠짐없이 처리하게 만들고, 타입에서 도메인 규칙을 표현할 때만 mapped type, conditional type, never 체크를 사용합니다.', [
    'type PaymentStatus = "ready" | "paid" | "failed" | "refunded";',
    '',
    'type StatusMeta = {',
    '  [Key in PaymentStatus]: { label: string; color: "gray" | "green" | "red" | "blue" };',
    '};',
    '',
    'const statusMeta: StatusMeta = {',
    '  ready: { label: "결제 대기", color: "gray" },',
    '  paid: { label: "결제 완료", color: "green" },',
    '  failed: { label: "결제 실패", color: "red" },',
    '  refunded: { label: "환불 완료", color: "blue" },',
    '};',
    '',
    'const assertNever = (value: never): never => {',
    '  throw new Error(`처리하지 않은 상태: ${value}`);',
    '};',
  ]),
  reactEvent: withExplanation('이벤트 핸들러를 인라인으로 작성하면 타입이 추론되지만, 별도 함수로 분리하려면 정확한 이벤트 타입과 HTML 제네릭을 넘겨야 합니다.', [
    'import React, { useState } from "react";',
    '',
    'export const EventExample = () => {',
    '  const [text, setText] = useState("");',
    '',
    '  // 1. input onChange 이벤트 (ChangeEvent)',
    '  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {',
    '    setText(e.target.value);',
    '  };',
    '',
    '  // 2. button onClick 이벤트 (MouseEvent)',
    '  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {',
    '    console.log("버튼 클릭 좌표:", e.clientX, e.clientY);',
    '  };',
    '',
    '  // 3. form onSubmit 이벤트 (FormEvent)',
    '  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {',
    '    e.preventDefault(); // 기본 새로고침 방지',
    '    console.log("제출된 텍스트:", text);',
    '  };',
    '',
    '  return (',
    '    <form onSubmit={handleSubmit}>',
    '      <input type="text" value={text} onChange={handleChange} />',
    '      <button type="button" onClick={handleClick}>그냥 버튼</button>',
    '      <button type="submit">제출 버튼</button>',
    '    </form>',
    '  );',
    '};',
  ]),
  reactState: withExplanation('초기값이 빈 배열이나 null일 때, 또는 복잡한 객체 배열일 때는 제네릭을 사용해 상태의 모양을 알려줘야 합니다.', [
    'import { useState } from "react";',
    '',
    'interface User {',
    '  id: number;',
    '  name: string;',
    '}',
    '',
    'export const StateExample = () => {',
    '  // 1. 원시 타입: 제네릭 생략 (자동 추론됨)',
    '  const [count, setCount] = useState(0);',
    '  const [isOpen, setIsOpen] = useState(false);',
    '',
    '  // 2. 빈 배열, null 초기값: 제네릭 필수',
    '  const [users, setUsers] = useState<User[]>([]); // 안 하면 never[] 됨',
    '  const [selectedUser, setSelectedUser] = useState<User | null>(null);',
    '',
    '  // 3. 유니온 타입을 활용한 상태',
    '  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");',
    '',
    '  return <div>{count}</div>;',
    '};',
  ]),
  reactProps: withExplanation('컴포넌트가 받는 데이터, 이벤트 콜백, 자식 요소(children), 그리고 스타일(style) 타입을 지정합니다.', [
    'import React from "react";',
    '',
    'interface ButtonProps {',
    '  // 1. 일반적인 데이터',
    '  variant?: "primary" | "secondary";',
    '  size?: "sm" | "md" | "lg";',
    '  ',
    '  // 2. 이벤트 콜백 함수 (반환값이 없으므로 void)',
    '  onClick: () => void;',
    '  ',
    '  // 3. 자식 요소 (모든 렌더링 가능한 React 요소)',
    '  children: React.ReactNode;',
    '  ',
    '  // 4. 인라인 스타일',
    '  style?: React.CSSProperties;',
    '}',
    '',
    'export const CustomButton = ({ variant = "primary", size = "md", onClick, children, style }: ButtonProps) => {',
    '  return (',
    '    <button className={`btn-\${variant} btn-\${size}`} onClick={onClick} style={style}>',
    '      {children}',
    '    </button>',
    '  );',
    '};',
  ]),
  reactRef: withExplanation('useRef는 DOM에 접근할 때와 값을 기억할 때 타입 작성법이 다릅니다. DOM 접근 시에는 반드시 초기값 null을 넣어야 합니다.', [
    'import { useRef, useEffect } from "react";',
    '',
    'export const RefExample = () => {',
    '  // 1. DOM 요소 접근: 구체적인 HTML 요소 타입 명시 + 초기값 null 필수!',
    '  const inputRef = useRef<HTMLInputElement>(null);',
    '  ',
    '  // 2. 렌더링과 무관한 값 기억: 변경 가능한 MutableRef',
    '  const timerId = useRef<number | null>(null);',
    '',
    '  useEffect(() => {',
    '    // inputRef.current가 null인지 확인 후 접근 (Optional Chaining 권장)',
    '    inputRef.current?.focus();',
    '',
    '    timerId.current = window.setInterval(() => console.log("tick"), 1000);',
    '    return () => clearInterval(timerId.current!);',
    '  }, []);',
    '',
    '  return <input ref={inputRef} placeholder="자동 포커스" />;',
    '};',
  ]),
  reactHoverTip: withExplanation('가장 빠르고 확실한 팁: 이벤트 타입이 기억나지 않으면 일단 인라인(JSX 내부)으로 함수를 쓰고, 매개변수 e에 마우스를 올리세요. TS가 친절하게 타입을 알려줍니다.', [
    '// 💡 이벤트 타입(React.ChangeEvent<HTMLInputElement> 등)을 모두 외울 필요가 없습니다!',
    '// 1. 먼저 HTML 태그 안에서 인라인 함수를 작성합니다.',
    '// 2. (e) => {} 에서 e 위에 마우스 커서를 올립니다.',
    '// 3. 툴팁으로 뜨는 타입을 복사해서 외부 함수로 빼냅니다.',
    '',
    'export const HoverTipExample = () => {',
    '  // 복사해온 타입 적용!',
    '  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {',
    '     console.log("드래그 중!");',
    '  };',
    '',
    '  return (',
    '    <div',
    '      // 여기에 먼저 적고 e에 마우스 올리기!',
    '      onDrag={(e) => {}}',
    '      onDragStart={handleDrag}',
    '    >',
    '      Drag Me',
    '    </div>',
    '  );',
    '};',
  ]),
};

const guides: TypescriptGuide[] = [
  {
    title: '1. TypeScript 실무 셋업',
    description: 'strict 설정과 타입 작성 기준을 먼저 잡아 프로젝트의 기본 안전망을 만듭니다.',
    concept: 'TypeScript는 JavaScript에 타입 시스템을 얹어 실행 전에 오류 가능성을 발견하는 도구입니다.',
    usage: '신규 프로젝트 시작, JS 프로젝트의 TS 전환, 팀 컨벤션 정리에 가장 먼저 적용합니다.',
    preview: 'setup',
    exampleTitle: 'Strict tsconfig',
    exampleCode: examples.setup,
    goodCode: examples.setup,
    badCode: genericBad,
    mistake: '오류가 귀찮아서 strict를 끄거나 any로 덮어 프로젝트 초반의 안전망을 없앱니다.',
    solution: 'strict를 기본값으로 두고, 타입을 모르는 외부 데이터는 unknown에서 검증 후 좁힙니다.',
  },
  {
    title: '2. 기본 타입과 Literal Union',
    description: 'string, number, boolean, null과 실무에서 자주 쓰는 문자열 제한 타입을 익힙니다.',
    concept: '기본 타입은 값의 종류를 제한하고 literal union은 허용 가능한 문자열/숫자 후보를 제한합니다.',
    usage: '상태값, 권한, 버튼 variant, 주문 단계처럼 선택지가 고정된 값에 사용합니다.',
    preview: 'types',
    exampleTitle: 'Role and Status',
    exampleCode: examples.basic,
    goodCode: examples.basic,
    badCode: withExplanation('string으로만 두면 오타와 허용되지 않은 값이 컴파일을 통과합니다.', ['type User = { role: string; status: string };', 'const role = "admn";']),
    mistake: '모든 상태값을 string으로 처리해 오타가 런타임까지 숨어 있습니다.',
    solution: '고정 선택지는 string literal union으로 만들고 UI 옵션도 같은 타입에서 파생합니다.',
  },
  {
    title: '3. 객체, 배열, Optional Property',
    description: '실무 데이터 모델의 대부분을 차지하는 객체와 목록 타입을 안정적으로 작성합니다.',
    concept: '객체 타입은 필드의 존재 여부와 읽기 전용 여부를 표현하고 배열 타입은 같은 구조의 반복 데이터를 표현합니다.',
    usage: '상품 목록, 사용자 상세, 검색 필터, 관리자 테이블 데이터에 사용합니다.',
    preview: 'object',
    exampleTitle: 'Product Model',
    exampleCode: examples.object,
    goodCode: examples.object,
    badCode: genericBad,
    mistake: 'optional 값을 바로 계산에 사용해 undefined가 섞인 NaN이나 화면 오류가 생깁니다.',
    solution: '?? 기본값, early return, 타입 가드로 값의 부재를 먼저 처리합니다.',
  },
  {
    title: '4. Union과 Narrowing',
    description: '여러 가능성을 안전하게 분기하고 상태별로 접근 가능한 필드를 좁힙니다.',
    concept: 'union은 가능한 상태 전체를 표현하고 narrowing은 조건문을 통해 현재 상태를 하나로 좁히는 기법입니다.',
    usage: 'API 요청 상태, 폼 제출 상태, 권한별 UI, 결제 상태 분기에 사용합니다.',
    preview: 'union',
    exampleTitle: 'Request State',
    exampleCode: examples.union,
    goodCode: examples.union,
    badCode: withExplanation('상태와 데이터를 따로 두면 불가능한 조합이 생깁니다. 예를 들어 loading인데 data가 있는 상태를 타입이 막지 못합니다.', ['type State<T> = {', '  status: string;', '  data?: T;', '  error?: string;', '};']),
    mistake: 'status, data, error를 모두 optional로 두어 불가능한 상태 조합이 만들어집니다.',
    solution: 'discriminated union으로 상태별 필드를 분리합니다.',
  },
  {
    title: '5. 함수 타입과 Callback',
    description: 'validator, formatter, event handler처럼 재사용되는 함수 계약을 타입으로 고정합니다.',
    concept: '함수 타입은 입력값과 반환값을 명시해 함수 조립 과정의 실수를 줄입니다.',
    usage: '폼 검증, 테이블 formatter, 콜백 props, 비동기 command 함수에 사용합니다.',
    preview: 'function',
    exampleTitle: 'Validator and Formatter',
    exampleCode: examples.function,
    goodCode: examples.function,
    badCode: withExplanation('함수 인자와 반환을 any로 두면 호출하는 쪽에서 잘못된 값을 넘겨도 알 수 없습니다.', ['const validate = (value: any): any => value ? null : false;']),
    mistake: '검증 함수가 어떤 값을 반환하는지 호출부마다 다르게 가정합니다.',
    solution: 'Validator, Formatter, Command처럼 반복되는 함수 모양을 타입 별칭으로 분리합니다.',
  },
  {
    title: '6. interface와 type 설계',
    description: '도메인 모델, 필터, 요청 타입을 interface와 type으로 알맞게 나눕니다.',
    concept: 'interface는 객체 확장에 강하고 type은 union, intersection, utility 조합에 강합니다.',
    usage: '공개 도메인 모델은 interface, 화면 전용 파생 타입은 type으로 두는 방식이 실무에서 읽기 좋습니다.',
    preview: 'model',
    exampleTitle: 'Customer Model',
    exampleCode: examples.model,
    goodCode: examples.model,
    badCode: genericBad,
    mistake: '서버 모델, 폼 모델, 화면 모델을 하나의 거대한 타입으로 처리합니다.',
    solution: '원본 모델을 기준으로 Pick, Omit, Partial을 사용해 목적별 타입을 파생합니다.',
  },
  {
    title: '7. Generics',
    description: '데이터 모양은 다르지만 처리 방식이 같은 코드를 타입 안전하게 재사용합니다.',
    concept: 'generic은 타입을 함수나 컴포넌트의 인자로 받아 재사용성과 타입 안정성을 함께 얻는 문법입니다.',
    usage: 'API 응답 래퍼, 공통 Select, Table, Pagination, 커스텀 훅에 사용합니다.',
    preview: 'generic',
    exampleTitle: 'Generic ApiResponse',
    exampleCode: examples.generic,
    goodCode: examples.generic,
    badCode: genericBad,
    mistake: '재사용 컴포넌트를 만들면서 내부 데이터를 any[]로 받아 컬럼 키 오타를 놓칩니다.',
    solution: '<T,> generic과 keyof T를 조합해 데이터와 설정의 관계를 타입으로 연결합니다.',
  },
  {
    title: '8. Utility Types',
    description: 'Pick, Omit, Partial, Record로 중복 타입을 줄이고 원본 모델과 동기화합니다.',
    concept: 'Utility Type은 이미 있는 타입을 목적에 맞게 변형하는 TypeScript 내장 도구입니다.',
    usage: '생성/수정 요청 DTO, 폼 에러 맵, 테이블 요약 타입, 권한 맵에 사용합니다.',
    preview: 'utility',
    exampleTitle: 'Product Request Types',
    exampleCode: examples.utility,
    goodCode: examples.utility,
    badCode: withExplanation('원본 타입과 요청 타입을 따로 복붙하면 필드 변경 시 한쪽만 수정되는 문제가 생깁니다.', ['interface Product { id: number; name: string; price: number; stock: number; }', 'interface CreateProductRequest { name: string; price: number; }']),
    mistake: '비슷한 타입을 계속 복사해 필드 변경 누락이 생깁니다.',
    solution: '원본 타입에서 파생 가능한 타입은 Utility Type으로 만듭니다.',
  },
  {
    title: '9. API DTO와 화면 모델',
    description: '서버 응답 타입과 화면에서 쓰는 타입을 분리해 변경에 강한 데이터 흐름을 만듭니다.',
    concept: 'DTO는 서버 계약이고 ViewModel은 UI 계약입니다. 둘을 mapper로 연결하면 책임이 분리됩니다.',
    usage: '백엔드 필드명이 snake_case이거나 날짜/금액/nullable 값을 화면에서 가공해야 할 때 사용합니다.',
    preview: 'api',
    exampleTitle: 'DTO to ViewModel',
    exampleCode: examples.api,
    goodCode: examples.api,
    badCode: withExplanation('서버 응답을 JSX에서 바로 파고들면 필드 변경과 null 처리 누락이 화면 곳곳에 퍼집니다.', ['<span>{user.user_name}</span>', '<span>{new Date(user.last_login_at).toLocaleDateString()}</span>']),
    mistake: 'API 응답을 그대로 컴포넌트 여러 곳에서 사용합니다.',
    solution: 'fetch 이후 mapper에서 화면 모델로 변환하고 컴포넌트는 UI 모델만 받게 합니다.',
  },
  {
    title: '10. React Props / State 타입',
    description: '컴포넌트 props, 이벤트, 상태 타입을 명확히 작성해 리팩토링에 강하게 만듭니다.',
    concept: 'React 타입은 컴포넌트의 외부 계약(props)과 내부 상태(state)를 구분해 표현합니다.',
    usage: '공통 컴포넌트, 폼 입력, 리스트 아이템, 모달, 검색 UI에 사용합니다.',
    preview: 'react',
    exampleTitle: 'Typed SearchBox',
    exampleCode: examples.react,
    goodCode: examples.react,
    badCode: withExplanation('props를 any로 받으면 부모 컴포넌트에서 잘못된 콜백을 넘겨도 알 수 없습니다.', ['const SearchBox = (props: any) => <input onChange={props.onChange} />;']),
    mistake: 'React.FC<any> 또는 props: any로 컴포넌트 계약을 없앱니다.',
    solution: 'Props interface를 만들고 이벤트 타입은 React.ChangeEvent처럼 구체적으로 지정합니다.',
  },
  {
    title: '11. Custom Hook 타입',
    description: '비동기 데이터 훅의 반환 타입을 고정해 사용하는 컴포넌트의 분기 처리를 단순하게 만듭니다.',
    concept: '커스텀 훅 타입은 데이터, 상태, 액션 함수의 묶음을 재사용 가능한 계약으로 만듭니다.',
    usage: '목록 조회, 상세 조회, 저장/삭제 command, localStorage, debounce 훅에 사용합니다.',
    preview: 'hook',
    exampleTitle: 'useAsyncResource',
    exampleCode: examples.hook,
    goodCode: examples.hook,
    badCode: genericBad,
    mistake: '훅이 배열을 반환하면서 각 위치의 의미가 커져 사용할 때 헷갈립니다.',
    solution: '반환값이 많아지면 객체로 반환하고 명시적인 타입을 붙입니다.',
  },
  {
    title: '12. 고급 패턴과 Exhaustive Check',
    description: 'mapped type과 never 체크로 도메인 상태를 빠짐없이 처리합니다.',
    concept: '고급 타입은 복잡한 문법을 과시하기보다 빠진 상태를 컴파일러가 알려주게 만드는 데 사용합니다.',
    usage: '결제/주문/승인 상태 메타데이터, 권한 매트릭스, reducer action 처리에 사용합니다.',
    preview: 'advanced',
    exampleTitle: 'Mapped Type Status Meta',
    exampleCode: examples.advanced,
    goodCode: examples.advanced,
    badCode: withExplanation('상태 메타데이터를 Partial로 두면 새 상태가 추가되어도 누락을 알아차리기 어렵습니다.', ['type PaymentStatus = "ready" | "paid" | "failed";', 'const statusMeta: Partial<Record<PaymentStatus, string>> = { paid: "결제 완료" };']),
    mistake: '상태가 추가됐는데 label, color, reducer 분기를 일부 파일에서 빠뜨립니다.',
    solution: 'Record, mapped type, assertNever로 모든 상태를 반드시 처리하게 만듭니다.',
  },
  {
    title: '13. 이벤트 객체와 핸들러 타입',
    description: 'React에서 가장 자주 쓰이는 이벤트 객체의 타입을 지정하는 방법입니다.',
    concept: '마우스, 키보드, 폼 이벤트 등 각 DOM 이벤트에 맞는 React 고유의 합성 이벤트(SyntheticEvent) 타입을 사용합니다.',
    usage: 'onClick, onChange, onSubmit 등의 이벤트 핸들러를 별도 함수로 분리할 때 필수적으로 사용합니다.',
    preview: 'reactEvent',
    exampleTitle: 'Event Handler Types',
    exampleCode: examples.reactEvent,
    goodCode: examples.reactEvent,
    badCode: withExplanation('이벤트 객체를 any로 지정하면 자동완성이 되지 않고 오타로 인한 런타임 오류가 발생할 수 있습니다.', ['const handleChange = (e: any) => {', '  console.log(e.taget.value); // target 오타를 못 잡음', '}']),
    mistake: '이벤트 객체 타입을 e: any 나 e: Event (순수 JS 이벤트)로 잘못 지정합니다.',
    solution: 'React.ChangeEvent<HTMLInputElement> 처럼 React.가 붙은 구체적인 제네릭 타입을 사용합니다.',
  },
  {
    title: '14. 상태 관리 (useState) 타입 지정',
    description: '초기값이 없거나 배열/객체일 때 useState의 타입을 명시적으로 지정합니다.',
    concept: 'useState에 제네릭을 넘겨주면 상태 변수가 가질 수 있는 값의 형태를 컴파일러에게 명확히 알려줄 수 있습니다.',
    usage: 'API에서 받아올 데이터 배열 초기화, 모달에서 선택된 아이템 상태, Union 타입을 활용한 상태 관리에 씁니다.',
    preview: 'reactState',
    exampleTitle: 'useState Generics',
    exampleCode: examples.reactState,
    goodCode: examples.reactState,
    badCode: withExplanation('빈 배열로 초기화하면 never[] 타입이 되어 나중에 값을 넣을 수 없습니다.', ['const [users, setUsers] = useState([]);', 'setUsers([{ id: 1 }]); // 에러 발생']),
    mistake: '초기값만 넘겨주고 제네릭을 생략하여 빈 배열이나 null이 영원히 never 타입으로 굳어집니다.',
    solution: 'useState<User[]>([]) 처럼 제네릭 괄호 안에 명확한 모델 타입을 적어줍니다.',
  },
  {
    title: '15. 컴포넌트 프롭스 (Props) 타입 지정',
    description: 'React 컴포넌트가 부모로부터 전달받는 데이터와 함수의 계약을 정의합니다.',
    concept: 'Props는 컴포넌트의 API입니다. 일반 데이터, 이벤트 콜백, React 노드 등을 명시하여 오용을 막습니다.',
    usage: '모든 커스텀 컴포넌트 제작 시 (특히 Button, Modal, Card 등 공통 컴포넌트) 사용합니다.',
    preview: 'reactProps',
    exampleTitle: 'Component Props',
    exampleCode: examples.reactProps,
    goodCode: examples.reactProps,
    badCode: withExplanation('props를 통째로 any로 처리하면 부모에서 실수로 오타를 내거나 잘못된 값을 넘겨도 오류를 뿜지 않습니다.', ['const CustomButton = (props: any) => <button onClick={props.onClcik}>{props.child}</button>;']),
    mistake: 'children의 타입을 any나 JSX.Element 등으로 협소하게 적어 문자열이나 배열을 넣지 못하게 만듭니다.',
    solution: 'Props 전용 인터페이스를 만들고, 자식 요소는 React.ReactNode 타입을 사용합니다.',
  },
  {
    title: '16. DOM 요소 직접 접근 (useRef) 타입 지정',
    description: '특정 HTML 요소에 포커스를 주거나 스크롤을 이동할 때 사용하는 useRef의 타입입니다.',
    concept: 'DOM 요소 접근용 ref는 컴포넌트 마운트 전까지 null이므로 반드시 초기값 null과 함께 엘리먼트 타입을 지정해야 합니다.',
    usage: 'input 자동 포커스, 스크롤 위치 계산, 외부 라이브러리(ECharts 등) 렌더링 컨테이너 지정에 사용합니다.',
    preview: 'reactRef',
    exampleTitle: 'useRef for DOM Elements',
    exampleCode: examples.reactRef,
    goodCode: examples.reactRef,
    badCode: withExplanation('제네릭과 초기값을 생략하면 DOM 요소 대신 일반 값을 저장하는 MutableRef로 인식되어 ref 속성에 넣을 수 없습니다.', ['const inputRef = useRef(); // MutableRefObject<undefined>', '<input ref={inputRef} /> // 타입 에러']),
    mistake: 'useRef() 안에 null을 넣지 않거나, <HTMLDivElement> 제네릭을 빼먹습니다.',
    solution: 'useRef<HTMLInputElement>(null) 처럼 제네릭과 null을 세트로 명시하고, 접근 시 옵셔널 체이닝(?.)을 사용합니다.',
  },
  {
    title: '17. 꿀팁: 기억 안 날 땐 "마우스 올리기"',
    description: '어려운 React 이벤트 타입을 외우지 않고 IDE의 타입 추론을 빌려오는 실무 요령입니다.',
    concept: 'TypeScript 컴파일러는 JSX 요소 내부의 인라인 콜백에 어떤 타입이 들어와야 하는지 이미 완벽하게 알고 있습니다.',
    usage: 'onDrag, onScroll, onWheel 등 자주 쓰지 않아 이벤트 타입이 헷갈리는 모든 상황에서 사용합니다.',
    preview: 'reactHoverTip',
    exampleTitle: 'Infer Type via Hover',
    exampleCode: examples.reactHoverTip,
    goodCode: examples.reactHoverTip,
    badCode: withExplanation('구글이나 스택오버플로우에서 구버전이나 잘못된 타입을 복사해와서 억지로 타입 캐스팅을 합니다.', ['const handleDrag = (e: any) => {};']),
    mistake: '모든 이벤트 타입을 달달 외우려다 지쳐서 any를 남발합니다.',
    solution: '인라인 함수 (e) => {} 를 임시로 작성하고, 매개변수 e에 마우스를 올려 타입을 컨닝(?)한 뒤 복사해 씁니다.',
  },
];

const createTypescriptGuidePage = (index: number) => {
  const guide = guides[index];

  const TypescriptGuidePage: React.FC = () => (
    <SamplePageLayout
      title={guide.title}
      icon="ri-code-box-line"
      description={guide.description}
      learningPoints={[
        '타입을 문법 암기가 아니라 실무 데이터 계약으로 이해합니다.',
        'API, React 컴포넌트, 상태 분기에서 실제로 쓰는 패턴을 익힙니다.',
        'any를 줄이고 변경에 강한 타입 설계를 연습합니다.',
      ]}
      whyImportant="TypeScript를 잘 쓰면 오류를 늦게 발견하는 시간이 줄고, 자동완성과 리팩토링 신뢰도가 높아져 팀 단위 개발 속도가 안정됩니다."
    >
      <StyledCard>
        <PageGrid>
          <Section>
            <h3>개념 설명</h3>
            <p>{guide.concept}</p>
          </Section>

          <Section>
            <h3>실무에서 언제 사용하는지</h3>
            <p>{guide.usage}</p>
          </Section>

          <Section>
            <h3>패턴 미리보기</h3>
            <PreviewPanel>{renderPreview(guide.preview)}</PreviewPanel>
          </Section>

          <Section>
            <h3>좋은 코드 / 안 좋은 코드 비교</h3>
            <CodeViewer rawCode={guide.goodCode} language="tsx" filename="Good Code" />
            <CodeViewer rawCode={guide.badCode} language="tsx" filename="Bad Code" />
          </Section>

          <Section>
            <h3>자주 하는 실수</h3>
            <p>{guide.mistake}</p>
          </Section>

          <Section>
            <h3>해결 방법</h3>
            <p>{guide.solution}</p>
          </Section>

          <Section>
            <h3>코드 예제</h3>
            <CodeViewer rawCode={guide.exampleCode} language="tsx" filename={guide.exampleTitle} />
          </Section>
        </PageGrid>
      </StyledCard>
    </SamplePageLayout>
  );

  return TypescriptGuidePage;
};

export const TypescriptSetupSample = createTypescriptGuidePage(0);
export const TypescriptBasicTypeSample = createTypescriptGuidePage(1);
export const TypescriptObjectSample = createTypescriptGuidePage(2);
export const TypescriptUnionSample = createTypescriptGuidePage(3);
export const TypescriptFunctionSample = createTypescriptGuidePage(4);
export const TypescriptModelSample = createTypescriptGuidePage(5);
export const TypescriptGenericSample = createTypescriptGuidePage(6);
export const TypescriptUtilitySample = createTypescriptGuidePage(7);
export const TypescriptApiSample = createTypescriptGuidePage(8);
export const TypescriptReactSample = createTypescriptGuidePage(9);
export const TypescriptHookSample = createTypescriptGuidePage(10);
export const TypescriptAdvancedSample = createTypescriptGuidePage(11);
export const TypescriptReactEventSample = createTypescriptGuidePage(12);
export const TypescriptReactStateSample = createTypescriptGuidePage(13);
export const TypescriptReactPropsSample = createTypescriptGuidePage(14);
export const TypescriptReactRefSample = createTypescriptGuidePage(15);
export const TypescriptReactHoverTipSample = createTypescriptGuidePage(16);
