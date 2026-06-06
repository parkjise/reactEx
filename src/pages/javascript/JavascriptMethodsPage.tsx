import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { CodeViewer } from '../../components/CodeViewer';

const Grid = styled.div`
  display: grid;
  gap: 24px;
`;

const MethodCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DemoArea = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResultBox = styled.pre`
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  margin: 0;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
`;

const initialUsers = [
  { id: 1, name: '김민수', role: 'admin', age: 28, isActive: true },
  { id: 2, name: '이영희', role: 'user', age: 24, isActive: true },
  { id: 3, name: '박지성', role: 'user', age: 32, isActive: false },
  { id: 4, name: '최동원', role: 'manager', age: 45, isActive: true },
];

export const JavascriptMethodsPage: React.FC = () => {
  const [result, setResult] = useState<any>(initialUsers);
  const [demoType, setDemoType] = useState<string>('원본 데이터');

  // --- Array Methods ---
  const handleMap = () => {
    // map: 배열의 각 요소를 변환하여 새로운 배열 반환
    const mapped = initialUsers.map(user => ({
      이름: user.name,
      요약: `${user.age}세 (${user.role})`
    }));
    setResult(mapped);
    setDemoType('map() 결과');
  };

  const handleFilter = () => {
    // filter: 조건에 맞는 요소만 걸러내어 새로운 배열 반환
    const filtered = initialUsers.filter(user => user.isActive && user.age >= 30);
    setResult(filtered);
    setDemoType('filter() 결과 (isActive && 나이 30 이상)');
  };

  const handleFind = () => {
    // find: 조건에 맞는 '첫 번째' 요소 하나만 반환
    const found = initialUsers.find(user => user.role === 'manager');
    setResult(found || '결과 없음');
    setDemoType('find() 결과 (role === "manager")');
  };

  const handleReduce = () => {
    // reduce: 배열을 순회하며 누적값을 계산하여 단일 값 반환
    const totalAge = initialUsers.reduce((acc, user) => acc + user.age, 0);
    setResult({ "활성/비활성 무관 총 나이 합계": totalAge });
    setDemoType('reduce() 결과');
  };

  const handleSort = () => {
    // sort: 원본 배열을 정렬 (React 상태 업데이트 시 불변성 유지를 위해 복사 후 정렬)
    const sorted = [...initialUsers].sort((a, b) => a.age - b.age);
    setResult(sorted);
    setDemoType('sort() 결과 (나이 오름차순)');
  };

  const handleSomeEvery = () => {
    // some: 하나라도 조건을 만족하면 true
    const hasAdmin = initialUsers.some(user => user.role === 'admin');
    // every: 모두가 조건을 만족해야 true
    const allActive = initialUsers.every(user => user.isActive);
    
    setResult({ 
      "관리자가 한 명이라도 있는가? (some)": hasAdmin,
      "모든 유저가 활성 상태인가? (every)": allActive
    });
    setDemoType('some() / every() 결과');
  };

  const resetData = () => {
    setResult(initialUsers);
    setDemoType('원본 데이터');
  };

  return (
    <SamplePageLayout
      title="자주 쓰는 JavaScript 메서드"
      icon="ri-javascript-fill"
      description="React 개발 시 데이터를 가공하고 변환할 때 숨쉬듯이 사용하는 필수 배열 메서드들을 알아봅니다."
      learningPoints={[
        '원본 배열을 훼손하지 않는(Immutable) 메서드 활용법',
        'map, filter, reduce의 개념과 실무 활용 사례',
        '조건 검색과 정렬 로직 작성법'
      ]}
      whyImportant="React에서 화면을 그릴 때 API로 받아온 원본 데이터를 입맛에 맞게 가공하는 작업이 필수적입니다. 이 메서드들을 자유자재로 다루면 코드가 훨씬 간결해집니다."
    >
      <Grid>
        <Card title="배열 메서드 인터랙티브 데모">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            버튼을 클릭하여 동일한 원본 데이터가 각 메서드를 거친 후 어떻게 변하는지 확인해 보세요.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            <Button size="small" variant="primary" onClick={handleMap}>map()</Button>
            <Button size="small" variant="primary" onClick={handleFilter}>filter()</Button>
            <Button size="small" variant="primary" onClick={handleFind}>find()</Button>
            <Button size="small" variant="primary" onClick={handleSort}>sort()</Button>
            <Button size="small" variant="primary" onClick={handleReduce}>reduce()</Button>
            <Button size="small" variant="primary" onClick={handleSomeEvery}>some() / every()</Button>
            <Button size="small" variant="outline" onClick={resetData} style={{ marginLeft: 'auto' }}>초기화</Button>
          </div>

          <DemoArea>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#316AFF' }}>
              <i className="ri-terminal-box-line"></i> {demoType}
            </h4>
            <ResultBox>
              {JSON.stringify(result, null, 2)}
            </ResultBox>
          </DemoArea>
        </Card>

        <MethodCard title="1. map() - 형태 변환하기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열의 <strong>모든 요소</strong>를 순회하면서, 내가 원하는 형태로 조작해 <strong>똑같은 길이의 새로운 배열</strong>을 만듭니다.<br/>
            (실무 예: API에서 받아온 리스트를 React <code>&lt;li&gt;</code> 태그 리스트로 변환할 때)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const users = [{ id: 1, name: '김민수' }, { id: 2, name: '이영희' }];\n\n// 이름만 추출하여 새로운 배열 생성\nconst names = users.map(user => user.name);\n// 결과: ['김민수', '이영희']`} 
            filename="map-example.js" 
          />
        </MethodCard>

        <MethodCard title="2. filter() - 조건에 맞는 것만 걸러내기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열을 순회하며 <strong>조건문(return 값이 true)을 만족하는 요소만 모아서 새로운 배열</strong>을 만듭니다.<br/>
            (실무 예: 삭제 버튼을 누른 아이템만 뺀 나머지 배열을 만들거나, 탭에서 특정 카테고리만 골라낼 때)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const users = [{ age: 20, active: true }, { age: 30, active: false }];\n\n// active가 true인 유저만 걸러냄\nconst activeUsers = users.filter(user => user.active === true);\n// 결과: [{ age: 20, active: true }]`} 
            filename="filter-example.js" 
          />
        </MethodCard>

        <MethodCard title="3. find() - 딱 하나만 찾기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열을 순회하다가 <strong>조건을 만족하는 '첫 번째' 요소를 발견하면 즉시 순회를 멈추고 그 요소 자체를 반환</strong>합니다. 못 찾으면 <code>undefined</code>를 반환합니다.<br/>
            (실무 예: 수많은 리스트 중 내가 클릭한 ID값을 가진 객체의 상세 정보를 가져올 때)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const users = [{ id: 1, name: '김민수' }, { id: 2, name: '이영희' }];\n\n// id가 2인 유저 객체를 찾음\nconst targetUser = users.find(user => user.id === 2);\n// 결과: { id: 2, name: '이영희' } (배열이 아니라 객체 자체)`} 
            filename="find-example.js" 
          />
        </MethodCard>

        <MethodCard title="4. reduce() - 하나로 뭉치기 (누적 계산)">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열의 모든 요소를 순회하면서 <strong>하나의 누적된(누적기, accumulator) 결과값</strong>을 만듭니다. 덧셈뿐만 아니라 배열을 객체로 변환할 때도 씁니다.<br/>
            (실무 예: 장바구니에 담긴 상품들의 총 결제 금액을 계산할 때)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const cart = [{ price: 1000 }, { price: 2000 }, { price: 3000 }];\n\n// acc(누적값)에 계속 더해나감, 마지막 '0'은 초기값 설정\nconst totalPrice = cart.reduce((acc, item) => acc + item.price, 0);\n// 결과: 6000`} 
            filename="reduce-example.js" 
          />
        </MethodCard>

        <MethodCard title="5. sort() - 정렬하기 (⚠️ 원본 변경 주의)">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            데이터를 순서대로 정렬합니다. 단, <strong>원본 배열 자체를 바꿔버리므로(Mutable)</strong>, React에서 상태를 정렬할 때는 반드시 <code>[...array].sort()</code> 형태로 복사본을 만들어야 합니다.<br/>
            (실무 예: 가격 오름차순/내림차순, 최신순 정렬 시)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const numbers = [3, 1, 4, 1, 5, 9];\n\n// 오름차순 (a - b)\nconst asc = [...numbers].sort((a, b) => a - b);\n// 내림차순 (b - a)\nconst desc = [...numbers].sort((a, b) => b - a);`} 
            filename="sort-example.js" 
          />
        </MethodCard>

      </Grid>
    </SamplePageLayout>
  );
};