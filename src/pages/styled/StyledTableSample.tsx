// src/pages/styled/StyledTableSample.tsx
import React from 'react';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledTable } from '../../components/styled/StyledTable';
import { StyledBadge } from '../../components/styled/StyledBadge';
import { CodeViewer } from '../../components/CodeViewer';

const tableColumns = [
  { key: 'id', header: '주문번호', width: '100px' },
  { key: 'product', header: '상품명', width: '250px' },
  { key: 'customer', header: '고객명' },
  { key: 'status', header: '상태', align: 'center' as const },
  { key: 'price', header: '결제금액', align: 'right' as const },
];

const tableData = [
  {
    id: 'ORD-001',
    product: '애플 맥북 프로 16인치 M3 Max (SSD 1TB)',
    customer: '홍길동',
    status: <StyledBadge variant="success">결제완료</StyledBadge>,
    price: '₩4,500,000'
  },
  {
    id: 'ORD-002',
    product: '로지텍 MX Master 3S 무선 마우스 (매우 긴 상품명 테스트용 데이터입니다 자동으로 말줄임 처리가 되어야 합니다)',
    customer: '김철수',
    status: <StyledBadge variant="primary">배송중</StyledBadge>,
    price: '₩129,000'
  },
  {
    id: 'ORD-003',
    product: 'LG 울트라기어 게이밍 모니터 32인치',
    customer: '이영희',
    status: <StyledBadge variant="warning">승인대기</StyledBadge>,
    price: '₩850,000'
  },
  {
    id: 'ORD-004',
    product: '키크론 K8 Pro 알루미늄 기계식 키보드',
    customer: '박민수',
    status: <StyledBadge variant="error">취소됨</StyledBadge>,
    price: '₩180,000'
  }
];

export const StyledTableSample: React.FC = () => {
  const codeString = `const columns = [
  { key: 'id', header: '주문번호', width: '100px' },
  { key: 'product', header: '상품명', width: '250px' },
  { key: 'status', header: '상태', align: 'center' },
  { key: 'price', header: '결제금액', align: 'right' },
];

const data = [
  {
    id: 'ORD-001',
    product: '애플 맥북 프로 16인치',
    status: <StyledBadge variant="success">결제완료</StyledBadge>,
    price: '₩4,500,000'
  }
];

<StyledTable columns={columns} data={data} />`;

  return (
    <SamplePageLayout
      title="13. Table 스타일링"
      description="말줄임(Ellipsis), 정렬(Align), Hover Effect가 모두 포함된 실무형 데이터 테이블 컴포넌트입니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>
          실무에서는 <code>&lt;table&gt;</code> 요소의 <code>border-collapse</code> 처리와
          컴포넌트 내부에 React Node(예: Badge 컴포넌트)를 렌더링하는 패턴이 자주 쓰입니다.
          또한 내용이 길어질 경우를 대비해 <code>max-width</code>와 <code>text-overflow: ellipsis</code>를 적용합니다.
        </p>

        <div style={{ marginBottom: '30px' }}>
          <StyledTable columns={tableColumns} data={tableData} />
        </div>

        <CodeViewer rawCode={codeString} language="tsx" filename="Table Usage" />
      </StyledCard>
    </SamplePageLayout>
  );
};
