import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

type PreviewType = 'compare' | 'nested' | 'states' | 'pseudo' | 'responsive' | 'helpers' | 'props' | 'className' | 'selector' | 'form' | 'table' | 'card' | 'layout' | 'tips';

interface ScssGuide {
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
`;

const Section = styled.section`
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
`;

const PreviewCard = styled.div<{ $selected?: boolean }>`
  padding: 18px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ $selected }) => ($selected ? '0 10px 24px rgba(49, 106, 255, 0.16)' : 'none')};

  h4 {
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const DemoButton = styled.button`
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &.is-active,
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const DotBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(5, 205, 153, 0.12);
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const FormPreview = styled.div`
  display: grid;
  gap: 12px;

  label {
    font-weight: 700;
  }

  input {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 11px 12px;
  }

  input.is-error {
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

const TablePreview = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 8px;

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const LayoutPreview = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  min-height: 180px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;

  aside {
    padding: 16px;
    background: ${({ theme }) => theme.colors.text};
    color: white;
  }

  main {
    display: grid;
    gap: 12px;
    padding: 16px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const renderPreview = (type: PreviewType) => {
  if (type === 'table') {
    return (
      <TablePreview>
        <thead><tr><th>이름</th><th>상태</th><th>역할</th></tr></thead>
        <tbody><tr><td>김민수</td><td>Active</td><td>Admin</td></tr><tr><td>이지연</td><td>Pending</td><td>Editor</td></tr></tbody>
      </TablePreview>
    );
  }

  if (type === 'form') {
    return (
      <FormPreview>
        <label>이메일 <DotBadge>required</DotBadge></label>
        <input value="user@example.com" readOnly />
        <input className="is-error" value="잘못된 값" readOnly />
      </FormPreview>
    );
  }

  if (type === 'layout') {
    return (
      <LayoutPreview>
        <aside>Sidebar</aside>
        <main>
          <PreviewCard><h4>Dashboard</h4><p>Grid, gap, breakpoint를 레이아웃 토큰으로 관리합니다.</p></PreviewCard>
          <PreviewCard $selected><h4>Selected panel</h4><p>상태 클래스와 mixin을 조합합니다.</p></PreviewCard>
        </main>
      </LayoutPreview>
    );
  }

  if (type === 'pseudo') {
    return (
      <>
        <Section><h3>포인트 라인 제목</h3><p>제목, 필수값, 상태 배지를 실제 DOM 추가 없이 표현합니다.</p></Section>
        <DotBadge>online</DotBadge>
      </>
    );
  }

  if (type === 'states') {
    return (
      <ButtonRow>
        <DemoButton>hover</DemoButton>
        <DemoButton className="is-active">is-active</DemoButton>
        <DemoButton disabled>disabled</DemoButton>
      </ButtonRow>
    );
  }

  return (
    <>
      <PreviewCard $selected={type === 'props' || type === 'className' || type === 'selector'}>
        <h4>{type === 'compare' ? 'SCSS module + styled-components 비교' : 'UI Preview'}</h4>
        <p>실무 UI 조각을 기준으로 선택자, mixin, 상태 스타일을 작게 분리해 확인합니다.</p>
      </PreviewCard>
      <ButtonRow>
        <DemoButton className="is-active">Primary</DemoButton>
        <DemoButton>Secondary</DemoButton>
      </ButtonRow>
    </>
  );
};

const comparisonGood = withExplanation('SCSS와 styled-components를 같은 프로젝트에서 쓸 때는 역할을 분리합니다. 구조적인 페이지 스타일은 SCSS, props와 런타임 테마가 필요한 컴포넌트는 styled-components가 잘 맞습니다.', [
  '// Good',
  '// ProductCard.module.scss',
  '.card {',
  '  padding: 24px;',
  '  border: 1px solid var(--border);',
  '}',
  '',
  '// Button.tsx',
  'const Button = styled.button<{ $variant: "primary" | "ghost" }>`',
  '  background: ${({ theme, $variant }) =>',
  '    $variant === "primary" ? theme.colors.primary : "transparent"};',
  '`;',
]);

const comparisonBad = lines([
  '// Bad: 한 컴포넌트에서 전역 SCSS, inline style, props style을 무질서하게 섞음',
  '<button className="primary-button" style={{ color: themeColor }} data-active={active}>',
  '  저장',
  '</button>',
]);

const requiredExamples = {
  nested: withExplanation('Card 안의 header/body/footer처럼 가까운 구조는 중첩 선택자가 읽기 좋습니다. 다만 3단계 이상 깊어지면 재사용과 override가 어려워지므로 BEM 클래스나 컴포넌트 분리를 우선합니다.', [
    'const Card = styled.article`',
    '  padding: 24px;',
    '  border: 1px solid ${({ theme }) => theme.colors.border};',
    '  border-radius: 12px;',
    '',
    '  .card__header {',
    '    margin-bottom: 16px;',
    '  }',
    '',
    '  .card__body {',
    '    display: grid;',
    '    gap: 10px;',
    '  }',
    '',
    '  .card__footer {',
    '    margin-top: 20px;',
    '    display: flex;',
    '    justify-content: flex-end;',
    '  }',
    '',
    '  .card__title {',
    '    font-size: 1.1rem;',
    '    font-weight: 800;',
    '  }',
    '',
    '  .card__description {',
    '    color: ${({ theme }) => theme.colors.textMuted};',
    '  }',
    '`;',
  ]),
  ampersand: withExplanation('&는 현재 선택자를 다시 참조합니다. hover, active, focus-visible, disabled, 상태 클래스, 형제 간격, 부모 hover 반응까지 한 위치에서 관리할 수 있습니다.', [
    'const Parent = styled.div``;',
    '',
    'const ActionButton = styled.button`',
    '  &:hover { transform: translateY(-1px); }',
    '  &:active { transform: translateY(0); }',
    '  &:focus-visible { outline: 3px solid rgba(49, 106, 255, 0.35); }',
    '  &[disabled] { opacity: 0.45; cursor: not-allowed; }',
    '  &.is-active { background: ${({ theme }) => theme.colors.primary}; color: white; }',
    '  & + & { margin-left: 8px; }',
    '',
    '  ${Parent}:hover & {',
    '    border-color: ${({ theme }) => theme.colors.primary};',
    '  }',
    '`;',
  ]),
  pseudo: withExplanation('pseudo element는 장식용 DOM을 늘리지 않고 시각 요소를 추가할 때 좋습니다. 제목 라인, required 별표, 상태 dot처럼 의미보다 표현에 가까운 요소에 사용합니다.', [
    '.section-title::before {',
    '  content: "";',
    '  display: inline-block;',
    '  width: 4px;',
    '  height: 18px;',
    '  margin-right: 8px;',
    '  background: var(--primary);',
    '}',
    '',
    '.field-label.is-required::after {',
    '  content: "*";',
    '  margin-left: 4px;',
    '  color: var(--error);',
    '}',
    '',
    '.badge--online::before {',
    '  content: "";',
    '  width: 8px;',
    '  height: 8px;',
    '  border-radius: 50%;',
    '  background: currentColor;',
    '}',
  ]),
  media: withExplanation('breakpoint를 media.ts에 모아두면 화면 크기 기준이 프로젝트 전체에서 흔들리지 않습니다. styled-components에서는 tagged template helper로 ${media.mobile`...`} 형태를 만들 수 있습니다.', [
    '// media.ts',
    'import { css } from "styled-components";',
    '',
    'export const breakpoints = {',
    '  mobile: 576,',
    '  tablet: 768,',
    '  desktop: 1024,',
    '};',
    '',
    'export const media = {',
    '  mobile: (styles: TemplateStringsArray) => css`',
    '    @media (max-width: ${breakpoints.mobile}px) { ${styles} }',
    '  `,',
    '  tablet: (styles: TemplateStringsArray) => css`',
    '    @media (max-width: ${breakpoints.tablet}px) { ${styles} }',
    '  `,',
    '  desktop: (styles: TemplateStringsArray) => css`',
    '    @media (min-width: ${breakpoints.desktop}px) { ${styles} }',
    '  `,',
    '};',
    '',
    'const Grid = styled.div`',
    '  display: grid;',
    '  grid-template-columns: repeat(3, 1fr);',
    '',
    '  ${media.mobile`',
    '    grid-template-columns: 1fr;',
    '  `}',
    '`;',
  ]),
  helpers: withExplanation('실무 SCSS mixin은 반복을 줄이는 도구이면서 팀의 UI 규칙을 고정하는 장치입니다. 레이아웃, 말줄임, 접근성, 포커스, disabled, 카드/폼/버튼 기본값처럼 자주 반복되고 실수 비용이 큰 스타일을 우선 mixin으로 만듭니다.', [
    '// styles/_mixins.scss',
    '$breakpoints: (',
    '  mobile: 576px,',
    '  tablet: 768px,',
    '  desktop: 1024px,',
    '  wide: 1440px,',
    ');',
    '',
    '@mixin respond($key) {',
    '  @media (max-width: map-get($breakpoints, $key)) {',
    '    @content;',
    '  }',
    '}',
    '',
    '@mixin flex($align: center, $justify: center, $gap: 0) {',
    '  display: flex;',
    '  align-items: $align;',
    '  justify-content: $justify;',
    '  gap: $gap;',
    '}',
    '',
    '@mixin inline-flex($align: center, $justify: center, $gap: 6px) {',
    '  display: inline-flex;',
    '  align-items: $align;',
    '  justify-content: $justify;',
    '  gap: $gap;',
    '}',
    '',
    '@mixin grid($columns: 1, $gap: 16px) {',
    '  display: grid;',
    '  grid-template-columns: repeat($columns, minmax(0, 1fr));',
    '  gap: $gap;',
    '}',
    '',
    '@mixin absolute-center {',
    '  position: absolute;',
    '  top: 50%;',
    '  left: 50%;',
    '  transform: translate(-50%, -50%);',
    '}',
    '',
    '@mixin size($width, $height: $width) {',
    '  width: $width;',
    '  height: $height;',
    '}',
    '',
    '@mixin ellipsis {',
    '  overflow: hidden;',
    '  white-space: nowrap;',
    '  text-overflow: ellipsis;',
    '}',
    '',
    '@mixin multi-line-ellipsis($line: 2) {',
    '  display: -webkit-box;',
    '  -webkit-line-clamp: $line;',
    '  -webkit-box-orient: vertical;',
    '  overflow: hidden;',
    '}',
    '',
    '@mixin visually-hidden {',
    '  position: absolute;',
    '  width: 1px;',
    '  height: 1px;',
    '  margin: -1px;',
    '  overflow: hidden;',
    '  clip: rect(0 0 0 0);',
    '  clip-path: inset(50%);',
    '  white-space: nowrap;',
    '}',
    '',
    '@mixin button-reset {',
    '  border: 0;',
    '  padding: 0;',
    '  background: none;',
    '  color: inherit;',
    '  font: inherit;',
    '  cursor: pointer;',
    '}',
    '',
    '@mixin focus-ring($color: rgba(49, 106, 255, 0.35)) {',
    '  &:focus-visible {',
    '    outline: 3px solid $color;',
    '    outline-offset: 2px;',
    '  }',
    '}',
    '',
    '@mixin disabled {',
    '  &:disabled,',
    '  &.is-disabled {',
    '    opacity: 0.45;',
    '    cursor: not-allowed;',
    '    pointer-events: none;',
    '  }',
    '}',
    '',
    '@mixin hover-supported {',
    '  @media (hover: hover) and (pointer: fine) {',
    '    &:hover {',
    '      @content;',
    '    }',
    '  }',
    '}',
    '',
    '@mixin custom-scrollbar($thumb: #cbd5e1, $track: transparent) {',
    '  scrollbar-width: thin;',
    '  scrollbar-color: $thumb $track;',
    '',
    '  &::-webkit-scrollbar { width: 8px; height: 8px; }',
    '  &::-webkit-scrollbar-track { background: $track; }',
    '  &::-webkit-scrollbar-thumb {',
    '    background: $thumb;',
    '    border-radius: 999px;',
    '  }',
    '}',
    '',
    '@mixin card-base {',
    '  border: 1px solid var(--border);',
    '  border-radius: 12px;',
    '  background: var(--surface);',
    '  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);',
    '}',
    '',
    '@mixin input-base {',
    '  width: 100%;',
    '  border: 1px solid var(--border);',
    '  border-radius: 8px;',
    '  padding: 11px 12px;',
    '  background: var(--surface);',
    '  color: var(--text);',
    '  @include focus-ring;',
    '}',
    '',
    '@mixin status-dot($color) {',
    '  &::before {',
    '    content: "";',
    '    @include size(8px);',
    '    border-radius: 50%;',
    '    background: $color;',
    '  }',
    '}',
    '',
    '@mixin aspect-ratio($width, $height) {',
    '  aspect-ratio: #{$width} / #{$height};',
    '  overflow: hidden;',
    '}',
    '',
    '@mixin fluid-type($min, $max) {',
    '  font-size: clamp($min, 2vw, $max);',
    '}',
    '',
    '// 사용 예시',
    '.dashboard-grid {',
    '  @include grid(3, 20px);',
    '',
    '  @include respond(tablet) {',
    '    grid-template-columns: 1fr;',
    '  }',
    '}',
    '',
    '.card {',
    '  @include card-base;',
    '  padding: 24px;',
    '}',
    '',
    '.card__title { @include ellipsis; }',
    '.card__description { @include multi-line-ellipsis(3); }',
    '',
    '.icon-button {',
    '  @include button-reset;',
    '  @include flex;',
    '  @include size(40px);',
    '  @include focus-ring;',
    '  @include disabled;',
    '}',
    '',
    '.scroll-panel {',
    '  max-height: 320px;',
    '  overflow: auto;',
    '  @include custom-scrollbar;',
    '}',
  ]),
  props: withExplanation('props 기반 스타일링은 variant, status, error, selected, columns처럼 React 상태가 곧 스타일 결정값일 때 적합합니다. DOM에 내려갈 필요 없는 값은 transient prop($)으로 받습니다.', [
    'const Button = styled.button<{ $variant: "primary" | "ghost" }>`',
    '  background: ${({ theme, $variant }) => $variant === "primary" ? theme.colors.primary : "transparent"};',
    '`;',
    '',
    'const Badge = styled.span<{ $status: "success" | "warning" | "error" }>`',
    '  color: ${({ $status }) => ({ success: "#05CD99", warning: "#FFB547", error: "#EE5D50" }[$status])};',
    '`;',
    '',
    'const Input = styled.input<{ $error?: boolean }>`',
    '  border-color: ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.border};',
    '`;',
    '',
    'const Card = styled.div<{ $selected?: boolean }>`',
    '  box-shadow: ${({ $selected }) => $selected ? "0 0 0 3px rgba(49,106,255,.18)" : "none"};',
    '`;',
    '',
    'const Grid = styled.div<{ $columns: number }>`',
    '  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));',
    '`;',
  ]),
  className: withExplanation('className 상태 스타일링은 외부 라이브러리, 라우터 active class, 서버 렌더링된 마크업처럼 props를 직접 전달하기 어려운 상황에서 유용합니다.', [
    '.menu-item {',
    '  color: var(--text);',
    '',
    '  &.is-active { color: var(--primary); font-weight: 800; }',
    '  &.is-open { background: rgba(49, 106, 255, 0.08); }',
    '  &.is-error { color: var(--error); }',
    '  &.is-disabled { opacity: 0.45; pointer-events: none; }',
    '  &.is-selected { box-shadow: inset 3px 0 0 var(--primary); }',
    '}',
  ]),
  selector: withExplanation('컴포넌트 선택자는 관계형 UI에 강합니다. 부모 hover 때 자식 변경, active 메뉴 강조, 카드 hover 때 내부 버튼 표시처럼 DOM 구조가 스타일 의미를 가질 때 사용합니다.', [
    'const Child = styled.div`opacity: 0.6; transition: opacity .2s;`;',
    'const Parent = styled.div`',
    '  &:hover ${Child} { opacity: 1; }',
    '`;',
    '',
    'const MenuItem = styled.a`',
    '  &.is-active { color: ${({ theme }) => theme.colors.primary}; }',
    '`;',
    '',
    'const HiddenButton = styled.button`opacity: 0;`;',
    'const Card = styled.article`',
    '  &:hover ${HiddenButton} { opacity: 1; }',
    '`;',
  ]),
};

const genericGood = (name: string) => withExplanation(`${name}에서는 스타일 규칙을 역할별로 작게 나누고, 상태 이름을 예측 가능하게 유지하는 것이 핵심입니다.`, [
  '.component {',
  '  display: grid;',
  '  gap: 12px;',
  '}',
  '',
  '.component.is-active {',
  '  border-color: var(--primary);',
  '}',
]);

const genericBad = lines([
  '// Bad',
  '.page .wrap div div ul li button.active:hover span {',
  '  color: blue !important;',
  '}',
]);

const guides: ScssGuide[] = [
  {
    title: '1. styled-components와 SCSS 차이',
    description: '두 스타일링 방식의 역할, 장단점, 함께 쓰는 기준을 정리합니다.',
    concept: 'SCSS는 CSS 확장 문법으로 정적 스타일, 파일 단위 구조, 중첩/mixin에 강합니다. styled-components는 React 컴포넌트와 props, theme, 런타임 상태를 직접 연결하는 데 강합니다.',
    usage: '디자인 시스템 컴포넌트와 상태 기반 UI는 styled-components, 페이지 단위 레거시 스타일이나 퍼블리싱 산출물은 SCSS로 관리하면 경계가 선명합니다.',
    preview: 'compare',
    exampleTitle: '역할 분리 예제',
    exampleCode: comparisonGood,
    goodCode: comparisonGood,
    badCode: comparisonBad,
    mistake: '한 컴포넌트 안에서 SCSS 클래스, inline style, props 기반 스타일을 기준 없이 섞으면 변경 이유를 추적하기 어렵습니다.',
    solution: '상태 기반 스타일은 props, 문서 구조 스타일은 className, 전역 토큰은 CSS 변수나 theme처럼 역할을 나눕니다.',
  },
  {
    title: '2. 중첩 선택자',
    description: 'Card 내부 구조를 기준으로 안전한 중첩 범위를 익힙니다.',
    concept: '중첩 선택자는 부모 컨텍스트 안에 관련 하위 요소 스타일을 묶는 문법입니다.',
    usage: 'Card 안의 header, body, footer처럼 한 컴포넌트 내부에서만 의미 있는 구조에 사용합니다.',
    preview: 'nested',
    exampleTitle: 'Card header/body/footer 중첩',
    exampleCode: requiredExamples.nested,
    goodCode: requiredExamples.nested,
    badCode: lines(['.card {', '  .header {', '    .title {', '      span {', '        strong { color: red; }', '      }', '    }', '  }', '}']),
    mistake: 'SCSS 중첩을 DOM 구조 그대로 4~5단계까지 따라가면 작은 마크업 변경에도 스타일이 깨집니다.',
    solution: '2단계 내외로 유지하고, `.card__title` 같은 명확한 클래스나 하위 컴포넌트로 분리합니다.',
  },
  {
    title: '3. & 선택자',
    description: '현재 선택자를 재사용해 상태, 형제, 부모 반응 패턴을 작성합니다.',
    concept: '&는 현재 선택자 자신을 의미합니다.',
    usage: 'hover, active, focus-visible, disabled, 상태 클래스, 형제 간격, 부모 hover에 반응하는 자식 스타일에 사용합니다.',
    preview: 'states',
    exampleTitle: '& 필수 패턴 모음',
    exampleCode: requiredExamples.ampersand,
    goodCode: requiredExamples.ampersand,
    badCode: lines(['button:hover {}', 'button:active {}', '.button.is-active {}', '.parent:hover .child {}', '// 관련 스타일이 흩어져 관리 포인트가 늘어남']),
    mistake: '&를 과도하게 조합해 `.a.b.c:hover:not(:disabled)`처럼 읽기 어려운 선택자를 만듭니다.',
    solution: '상태 이름은 1~2개로 제한하고, 복잡해지면 props나 별도 컴포넌트로 의미를 올립니다.',
  },
  {
    title: '4. hover / active / focus / disabled',
    description: '인터랙션 상태를 접근성과 함께 설계합니다.',
    concept: '상태 pseudo-class는 사용자의 입력 방식에 따라 UI 반응을 보여주는 CSS 기본 장치입니다.',
    usage: '버튼, 링크, 입력창, 카드 선택 UI처럼 클릭 가능하거나 포커스 가능한 요소에 사용합니다.',
    preview: 'states',
    exampleTitle: '상태 스타일링',
    exampleCode: requiredExamples.ampersand,
    goodCode: lines(['.button {', '  &:hover { background: var(--primary-hover); }', '  &:active { transform: translateY(1px); }', '  &:focus-visible { outline: 3px solid rgba(49,106,255,.35); }', '  &:disabled { opacity: .45; cursor: not-allowed; }', '}']),
    badCode: lines(['.button:focus { outline: none; }', '.button.disabled { opacity: .4; }']),
    mistake: 'focus outline을 제거만 하고 대체 스타일을 제공하지 않으면 키보드 사용자가 현재 위치를 잃습니다.',
    solution: ':focus-visible에 명확한 focusRing을 제공하고 실제 disabled 속성과 스타일을 함께 사용합니다.',
  },
  {
    title: '5. ::before / ::after',
    description: '추가 DOM 없이 장식 요소를 구현합니다.',
    concept: 'pseudo element는 요소 앞뒤에 가상 박스를 만들어 장식과 보조 시각 요소를 표현합니다.',
    usage: '제목 왼쪽 포인트 라인, 필수 입력값 별표, 배지 dot처럼 의미보다 표현에 가까운 요소에 사용합니다.',
    preview: 'pseudo',
    exampleTitle: '포인트 라인 / required / dot',
    exampleCode: requiredExamples.pseudo,
    goodCode: requiredExamples.pseudo,
    badCode: lines(['<h3><span className="line" />제목</h3>', '<label>이름<span>*</span></label>', '<span><i className="dot" />온라인</span>']),
    mistake: '스크린리더가 읽어야 하는 중요한 텍스트를 pseudo element의 content에만 넣습니다.',
    solution: '의미 있는 정보는 실제 DOM 텍스트로 두고, pseudo element는 장식에만 사용합니다.',
  },
  {
    title: '6. media query mixin',
    description: 'breakpoint와 미디어 쿼리 helper를 한 곳에서 관리합니다.',
    concept: 'media mixin은 반복되는 @media 규칙을 짧고 일관된 helper로 감싸는 방식입니다.',
    usage: '모바일/태블릿/데스크톱 기준이 여러 파일에 반복될 때 사용합니다.',
    preview: 'responsive',
    exampleTitle: 'media.ts helper',
    exampleCode: requiredExamples.media,
    goodCode: requiredExamples.media,
    badCode: lines(['@media (max-width: 575px) {}', '@media (max-width: 600px) {}', '@media (max-width: 768px) {}', '// 파일마다 기준이 달라짐']),
    mistake: '페이지마다 breakpoint 숫자를 직접 쓰면 디자인 기준이 조금씩 어긋납니다.',
    solution: 'breakpoints와 media helper를 만들고 모든 반응형 코드는 helper를 통해 작성합니다.',
  },
  {
    title: '7. css helper mixin',
    description: '반복 스타일을 재사용 가능한 helper로 정리합니다.',
    concept: 'helper mixin은 자주 반복되는 CSS 선언 묶음을 이름 붙여 재사용하는 패턴입니다.',
    usage: 'flexCenter, ellipsis, visuallyHidden, focusRing처럼 팀 전체에서 반복되는 규칙에 사용합니다.',
    preview: 'helpers',
    exampleTitle: '실무 helper mixin 모음',
    exampleCode: requiredExamples.helpers,
    goodCode: requiredExamples.helpers,
    badCode: lines(['.a { display:flex; align-items:center; justify-content:center; }', '.b { display:flex; align-items:center; justify-content:center; }', '.c { display:flex; align-items:center; justify-content:center; }']),
    mistake: '모든 CSS를 mixin으로 만들면 오히려 선언 위치를 찾아다녀야 합니다.',
    solution: '3회 이상 반복되거나 접근성/브라우저 대응처럼 실수 비용이 큰 규칙만 helper로 분리합니다.',
  },
  {
    title: '8. theme + mixin 조합',
    description: '디자인 토큰과 helper를 결합해 일관된 UI를 만듭니다.',
    concept: 'theme은 색상/간격/반경 같은 값이고, mixin은 그 값을 사용하는 스타일 패턴입니다.',
    usage: '카드, 버튼, 포커스 링, 상태 배지처럼 브랜드 토큰을 반복 사용하는 컴포넌트에 적합합니다.',
    preview: 'helpers',
    exampleTitle: 'theme 기반 cardBase',
    exampleCode: withExplanation('theme과 mixin을 함께 쓰면 값은 theme에서 바꾸고 구조는 mixin에서 재사용할 수 있습니다.', ['export const cardBase = css`', '  background: ${({ theme }) => theme.colors.surface};', '  border: 1px solid ${({ theme }) => theme.colors.border};', '  border-radius: ${({ theme }) => theme.radius.card};', '`;', '', 'const Panel = styled.section`', '  ${cardBase}', '  padding: ${({ theme }) => theme.spacing.lg};', '`;']),
    goodCode: genericGood('theme + mixin'),
    badCode: lines(['border-radius: 10px;', 'border-radius: 12px;', 'border-radius: 8px;', '// 토큰 없이 감으로 값이 늘어남']),
    mistake: 'mixin 내부에 고정 색상과 px 값을 많이 넣으면 theme 교체가 어려워집니다.',
    solution: 'mixin은 구조를, theme은 값을 담당하게 나눕니다.',
  },
  {
    title: '9. props 기반 스타일링',
    description: 'React 상태를 스타일 값으로 안전하게 연결합니다.',
    concept: 'props 기반 스타일링은 컴포넌트 props로 variant, status, selected 같은 시각 상태를 결정합니다.',
    usage: 'Button variant, Badge status, Input error, Card selected, Grid columns처럼 상태 값이 명확할 때 사용합니다.',
    preview: 'props',
    exampleTitle: 'props 스타일링 필수 패턴',
    exampleCode: requiredExamples.props,
    goodCode: requiredExamples.props,
    badCode: lines(['<button className={variant === "primary" ? "btn-blue" : "btn-gray"}>', '  저장', '</button>', '// 상태가 늘어날수록 className 조건식이 커짐']),
    mistake: '스타일 전용 props를 그대로 DOM에 내려 React unknown prop 경고를 만듭니다.',
    solution: 'styled-components에서는 `$variant`처럼 transient prop을 사용합니다.',
  },
  {
    title: '10. className 상태 스타일링',
    description: 'is-active 계열 상태 클래스를 일관되게 관리합니다.',
    concept: '상태 className은 DOM 클래스만으로 UI 상태를 표현하는 방식입니다.',
    usage: '라우터 active class, 외부 UI 라이브러리, 서버 렌더링 마크업, 단순 토글 상태에 사용합니다.',
    preview: 'className',
    exampleTitle: 'is-* 상태 클래스',
    exampleCode: requiredExamples.className,
    goodCode: requiredExamples.className,
    badCode: lines(['.on {}', '.opened {}', '.red {}', '.no-click {}', '// 이름만 보고 상태 의미를 알기 어려움']),
    mistake: '상태 이름이 `on`, `red`, `big`처럼 구현이나 색상 중심이면 유지보수가 어렵습니다.',
    solution: '`is-active`, `is-open`, `is-error`, `is-disabled`, `is-selected`처럼 의미 중심 이름을 사용합니다.',
  },
  {
    title: '11. 컴포넌트 선택자',
    description: '부모와 자식 컴포넌트의 관계형 스타일을 작성합니다.',
    concept: '컴포넌트 선택자는 styled-components 컴포넌트를 선택자처럼 참조하는 패턴입니다.',
    usage: 'Parent hover 시 Child 스타일 변경, Sidebar active 메뉴, Card hover 시 내부 Button 표시 같은 관계형 UI에 사용합니다.',
    preview: 'selector',
    exampleTitle: 'Parent hover / Sidebar / Card action',
    exampleCode: requiredExamples.selector,
    goodCode: requiredExamples.selector,
    badCode: lines(['.card:hover .random-button-name { opacity: 1; }', '// 내부 클래스 이름 변경에 취약함']),
    mistake: '멀리 떨어진 컴포넌트까지 선택자로 제어하면 컴포넌트 캡슐화가 깨집니다.',
    solution: '부모-자식 관계가 가까운 UI에만 쓰고, 멀어지면 props나 상태 전달로 표현합니다.',
  },
  {
    title: '12. Form 스타일링',
    description: '입력 필드, 라벨, 에러 메시지 구조를 안정적으로 만듭니다.',
    concept: 'Form 스타일은 라벨, 입력, 힌트, 에러, disabled 상태를 한 세트로 다룹니다.',
    usage: '회원가입, 검색 필터, 관리자 설정 폼처럼 입력 품질과 접근성이 중요한 화면에 사용합니다.',
    preview: 'form',
    exampleTitle: 'Form field SCSS',
    exampleCode: withExplanation('Form은 field 단위 클래스를 만들고 error/disabled 상태를 명확히 분리합니다.', ['.field { display: grid; gap: 8px; }', '.field__label.is-required::after { content: "*"; color: var(--error); }', '.field__input { border: 1px solid var(--border); border-radius: 8px; padding: 12px; }', '.field__input.is-error { border-color: var(--error); }', '.field__message { color: var(--error); font-size: 0.875rem; }']),
    goodCode: genericGood('Form'),
    badCode: genericBad,
    mistake: '에러 색상만 바꾸고 메시지나 aria-invalid를 연결하지 않습니다.',
    solution: '시각 스타일, 에러 텍스트, aria 속성을 함께 처리합니다.',
  },
  {
    title: '13. Table 스타일링',
    description: '표 헤더, 행 hover, 상태 셀을 읽기 좋게 구성합니다.',
    concept: 'Table 스타일은 정보 밀도와 스캔 가능성을 높이는 데 초점을 둡니다.',
    usage: '관리자 목록, 결제 내역, 로그 테이블처럼 반복 데이터를 비교하는 화면에 사용합니다.',
    preview: 'table',
    exampleTitle: 'Table SCSS',
    exampleCode: withExplanation('Table은 셀 padding, sticky header, hover, selected 행을 분리하면 대량 데이터 UI에서 읽기 쉽습니다.', ['.data-table { width: 100%; border-collapse: collapse; }', '.data-table th { position: sticky; top: 0; background: var(--surface); }', '.data-table td, .data-table th { padding: 12px 16px; border-bottom: 1px solid var(--border); }', '.data-table tbody tr:hover { background: rgba(49, 106, 255, 0.06); }', '.data-table tbody tr.is-selected { background: rgba(49, 106, 255, 0.1); }']),
    goodCode: genericGood('Table'),
    badCode: genericBad,
    mistake: '행 hover와 selected 색상이 비슷해 현재 선택 상태를 구분하기 어렵습니다.',
    solution: 'hover는 약하게, selected는 border나 background로 더 명확히 구분합니다.',
  },
  {
    title: '14. Card UI 스타일링',
    description: '카드의 구조, 상태, 액션 영역을 재사용 가능하게 만듭니다.',
    concept: 'Card는 표면, 경계, 제목, 본문, 액션을 묶는 가장 흔한 컨테이너 패턴입니다.',
    usage: '대시보드 KPI, 프로필, 상품, 설정 패널처럼 정보를 작은 단위로 묶을 때 사용합니다.',
    preview: 'card',
    exampleTitle: 'Card SCSS',
    exampleCode: requiredExamples.nested,
    goodCode: genericGood('Card'),
    badCode: genericBad,
    mistake: '카드마다 padding, radius, shadow 값을 새로 정해 화면 전체 리듬이 흔들립니다.',
    solution: 'cardBase helper와 spacing token을 기준으로 variant만 추가합니다.',
  },
  {
    title: '15. Layout 스타일링',
    description: 'Grid/Flex와 breakpoint를 조합해 화면 뼈대를 만듭니다.',
    concept: 'Layout 스타일은 개별 컴포넌트보다 화면의 영역 배치와 반응형 흐름을 담당합니다.',
    usage: '사이드바, 대시보드, 폼 2열 배치, 콘텐츠/aside 구조에 사용합니다.',
    preview: 'layout',
    exampleTitle: 'Layout SCSS',
    exampleCode: withExplanation('Layout은 grid template과 breakpoint를 명확히 두고, 내부 컴포넌트 스타일과 섞지 않는 것이 좋습니다.', ['.app-layout {', '  display: grid;', '  grid-template-columns: 240px minmax(0, 1fr);', '  min-height: 100vh;', '}', '', '@media (max-width: 768px) {', '  .app-layout { grid-template-columns: 1fr; }', '}']),
    goodCode: genericGood('Layout'),
    badCode: genericBad,
    mistake: '레이아웃 파일에서 버튼, 카드, 폼 세부 스타일까지 모두 제어합니다.',
    solution: '레이아웃은 영역 배치만 담당하고, 세부 UI는 각 컴포넌트 스타일로 이동합니다.',
  },
  {
    title: '16. 실무 팁 정리',
    description: 'SCSS와 CSS-in-JS를 함께 다룰 때의 기준과 안티패턴을 정리합니다.',
    concept: '좋은 스타일 코드는 선택자 깊이, 상태 이름, 토큰 사용, 접근성, 파일 책임이 예측 가능합니다.',
    usage: '프로젝트 스타일 규칙을 정하거나 기존 CSS를 정리할 때 체크리스트로 사용합니다.',
    preview: 'tips',
    exampleTitle: '실무 체크리스트',
    exampleCode: withExplanation('팀 규칙은 짧고 반복 가능해야 합니다. 아래 기준만 지켜도 대부분의 스타일 부채를 줄일 수 있습니다.', ['// 1. 선택자 중첩은 2단계 내외', '// 2. 상태 클래스는 is-* 네이밍', '// 3. 색상/간격은 token 사용', '// 4. focus-visible 제거 금지', '// 5. 반복 규칙은 mixin/helper로 승격', '// 6. props 스타일과 className 스타일의 역할 분리']),
    goodCode: genericGood('Tips'),
    badCode: genericBad,
    mistake: '눈앞의 화면만 맞추려고 !important와 깊은 선택자를 계속 추가합니다.',
    solution: '토큰, helper, 상태 네이밍, 컴포넌트 경계를 먼저 정하고 화면별 예외는 최소화합니다.',
  },
];

const getCodeLanguage = (code: string) => {
  if (
    code.includes('@mixin') ||
    code.includes('@include') ||
    code.includes('.scss') ||
    code.includes('::before') ||
    code.includes('&:') ||
    code.trim().startsWith('.')
  ) {
    return 'scss';
  }

  return 'tsx';
};

const createScssGuidePage = (index: number) => {
  const guide = guides[index];

  const ScssGuidePage: React.FC = () => (
    <SamplePageLayout title={guide.title} description={guide.description}>
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
            <h3>UI 미리보기</h3>
            <PreviewPanel>{renderPreview(guide.preview)}</PreviewPanel>
          </Section>

          <Section>
            <h3>좋은 코드 / 안 좋은 코드 비교</h3>
            <CodeViewer rawCode={guide.goodCode} language={getCodeLanguage(guide.goodCode)} filename="Good Code" />
            <CodeViewer rawCode={guide.badCode} language="scss" filename="Bad Code" />
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
            <CodeViewer rawCode={guide.exampleCode} language={getCodeLanguage(guide.exampleCode)} filename={guide.exampleTitle} />
          </Section>
        </PageGrid>
      </StyledCard>
    </SamplePageLayout>
  );

  return ScssGuidePage;
};

export const ScssCompareSample = createScssGuidePage(0);
export const ScssNestedSample = createScssGuidePage(1);
export const ScssAmpersandSample = createScssGuidePage(2);
export const ScssStateSample = createScssGuidePage(3);
export const ScssPseudoSample = createScssGuidePage(4);
export const ScssMediaMixinSample = createScssGuidePage(5);
export const ScssHelperMixinSample = createScssGuidePage(6);
export const ScssThemeMixinSample = createScssGuidePage(7);
export const ScssPropsSample = createScssGuidePage(8);
export const ScssClassNameSample = createScssGuidePage(9);
export const ScssComponentSelectorSample = createScssGuidePage(10);
export const ScssFormSample = createScssGuidePage(11);
export const ScssTableSample = createScssGuidePage(12);
export const ScssCardSample = createScssGuidePage(13);
export const ScssLayoutSample = createScssGuidePage(14);
export const ScssTipsSample = createScssGuidePage(15);
