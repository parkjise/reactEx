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
    const mapped = initialUsers.map(user => ({
      이름: user.name,
      요약: `${user.age}세 (${user.role})`
    }));
    setResult(mapped);
    setDemoType('map() 결과');
  };

  const handleFilter = () => {
    const filtered = initialUsers.filter(user => user.isActive && user.age >= 30);
    setResult(filtered);
    setDemoType('filter() 결과 (isActive && 나이 30 이상)');
  };

  const handleFind = () => {
    const found = initialUsers.find(user => user.role === 'manager');
    setResult(found || '결과 없음');
    setDemoType('find() 결과 (role === "manager")');
  };

  const handleFindIndex = () => {
    const index = initialUsers.findIndex(user => user.name === '박지성');
    setResult({ "박지성의 인덱스": index });
    setDemoType('findIndex() 결과');
  };

  const handleReduce = () => {
    const totalAge = initialUsers.reduce((acc, user) => acc + user.age, 0);
    setResult({ "총 나이 합계": totalAge });
    setDemoType('reduce() 결과');
  };

  const handleSort = () => {
    const sorted = [...initialUsers].sort((a, b) => a.age - b.age);
    setResult(sorted);
    setDemoType('sort() 결과 (나이 오름차순)');
  };

  const handleSomeEvery = () => {
    const hasAdmin = initialUsers.some(user => user.role === 'admin');
    const allActive = initialUsers.every(user => user.isActive);
    setResult({ 
      "관리자가 한 명이라도 있는가? (some)": hasAdmin,
      "모든 유저가 활성 상태인가? (every)": allActive
    });
    setDemoType('some() / every() 결과');
  };

  const handleIncludes = () => {
    const roles = initialUsers.map(u => u.role);
    const hasGuest = roles.includes('guest');
    setResult({ "역할 목록": roles, "guest 포함 여부": hasGuest });
    setDemoType('includes() 결과');
  };

  const handleObjectMethods = () => {
    const obj = initialUsers[0];
    setResult({
      "Object.keys()": Object.keys(obj),
      "Object.values()": Object.values(obj),
      "Object.entries()": Object.entries(obj)
    });
    setDemoType('Object keys / values / entries 결과');
  };

  const resetData = () => {
    setResult(initialUsers);
    setDemoType('원본 데이터');
  };

  return (
    <SamplePageLayout
      title="자주 쓰는 JavaScript 기초 가이드"
      icon="ri-javascript-fill"
      description="React 개발 시 데이터를 가공하고 변환할 때 필수적으로 알아야 할 자바스크립트 배열, 객체, 최신 연산자를 알아봅니다."
      learningPoints={[
        '원본 데이터를 훼손하지 않는(Immutable) 배열 메서드 활용법',
        'Object 메서드를 이용한 객체 순회 및 변환',
        '?. (Optional Chaining)과 ?? (Nullish Coalescing)을 이용한 안전한 데이터 접근'
      ]}
      whyImportant="React에서 화면을 그릴 때 API로 받아온 원본 데이터를 입맛에 맞게 가공하는 작업이 필수적입니다. 이 메서드들을 자유자재로 다루면 코드가 훨씬 간결해지고 버그가 줄어듭니다."
    >
      <Grid>
        <Card title="메서드 인터랙티브 데모">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            버튼을 클릭하여 동일한 유저 배열/객체가 어떻게 변하는지 확인해 보세요.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            <Button size="small" variant="primary" onClick={handleMap}>map()</Button>
            <Button size="small" variant="primary" onClick={handleFilter}>filter()</Button>
            <Button size="small" variant="primary" onClick={handleFind}>find()</Button>
            <Button size="small" variant="primary" onClick={handleFindIndex}>findIndex()</Button>
            <Button size="small" variant="primary" onClick={handleIncludes}>includes()</Button>
            <Button size="small" variant="primary" onClick={handleSort}>sort()</Button>
            <Button size="small" variant="primary" onClick={handleReduce}>reduce()</Button>
            <Button size="small" variant="primary" onClick={handleSomeEvery}>some/every()</Button>
            <Button size="small" variant="secondary" onClick={handleObjectMethods}>Object 메서드</Button>
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

        <h3 style={{ fontSize: '1.2rem', marginTop: '10px', color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
          <i className="ri-list-check-2"></i> 필수 배열 메서드 (Array Methods)
        </h3>

        <MethodCard title="1. map() - 형태 변환하기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열의 <strong>모든 요소</strong>를 순회하면서, 내가 원하는 형태로 조작해 <strong>똑같은 길이의 새로운 배열</strong>을 만듭니다.<br/>
            (실무 예: API 리스트를 React <code>&lt;li&gt;</code> 컴포넌트로 변환할 때, 객체의 특정 필드만 뽑아낼 때)
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
            (실무 예: 삭제 버튼을 누른 아이템만 뺀 나머지 배열 만들기, 활성 유저만 걸러내기)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const users = [{ age: 20, active: true }, { age: 30, active: false }];\n\n// active가 true인 유저만 걸러냄\nconst activeUsers = users.filter(user => user.active === true);\n// 결과: [{ age: 20, active: true }]`} 
            filename="filter-example.js" 
          />
        </MethodCard>

        <MethodCard title="3. find() & findIndex() - 하나만 찾기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            <strong>find()</strong>는 조건을 만족하는 '첫 번째' 요소를 발견하면 즉시 요소 객체 자체를 반환합니다. 못 찾으면 <code>undefined</code>를 반환합니다.<br/>
            <strong>findIndex()</strong>는 요소 대신 '배열의 인덱스 번호'를 반환합니다. 못 찾으면 <code>-1</code>을 반환합니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const users = [{ id: 1, name: '김민수' }, { id: 2, name: '이영희' }];\n\nconst targetUser = users.find(user => user.id === 2); // { id: 2, name: '이영희' }\nconst targetIndex = users.findIndex(user => user.id === 2); // 1`} 
            filename="find-example.js" 
          />
        </MethodCard>

        <MethodCard title="4. reduce() - 하나로 뭉치기 (누적 계산)">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열의 모든 요소를 순회하면서 <strong>하나의 누적된(accumulator) 결과값</strong>을 만듭니다. 덧셈뿐만 아니라 배열을 객체로 변환할 때도 자주 쓰입니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const cart = [{ price: 1000 }, { price: 2000 }, { price: 3000 }];\n\n// acc(누적값)에 계속 더해나감, 마지막 '0'은 초기값 설정\nconst totalPrice = cart.reduce((acc, item) => acc + item.price, 0);\n// 결과: 6000\n\n// 배열을 객체(Map)로 변환하는 고급 기법\nconst users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];\nconst userMap = users.reduce((acc, user) => {\n  acc[user.id] = user.name;\n  return acc;\n}, {}); // { '1': 'A', '2': 'B' }`} 
            filename="reduce-example.js" 
          />
        </MethodCard>

        <MethodCard title="5. includes() & some() & every() - 포함 여부 확인">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열 안에 특정 값이 들어있는지 확인하여 <code>true</code> / <code>false</code>를 반환합니다.<br/>
            <strong>includes()</strong>: 원시값(string, number)이 배열에 있는지 단순 확인<br/>
            <strong>some()</strong>: 객체 배열에서 조건에 맞는 요소가 '하나라도' 있는지 확인<br/>
            <strong>every()</strong>: 객체 배열에서 '모든' 요소가 조건을 만족하는지 확인
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const roles = ['admin', 'manager', 'user'];\nconst hasAdmin = roles.includes('admin'); // true\n\nconst users = [{ age: 20 }, { age: 15 }];\nconst hasAdult = users.some(u => u.age >= 18); // true\nconst isAllAdults = users.every(u => u.age >= 18); // false`} 
            filename="includes-example.js" 
          />
        </MethodCard>

        <MethodCard title="6. sort() - 정렬하기 (⚠️ 원본 변경 주의)">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            데이터를 순서대로 정렬합니다. 단, <strong>원본 배열 자체를 바꿔버리므로(Mutable)</strong>, React에서 상태를 정렬할 때는 반드시 <code>[...array].sort()</code> 형태로 복사본을 만들어야 상태 업데이트가 감지됩니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const numbers = [3, 1, 4, 1, 5, 9];\n\n// 오름차순 (a - b)\nconst asc = [...numbers].sort((a, b) => a - b);\n// 내림차순 (b - a)\nconst desc = [...numbers].sort((a, b) => b - a);`} 
            filename="sort-example.js" 
          />
        </MethodCard>

        <h3 style={{ fontSize: '1.2rem', marginTop: '20px', color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
          <i className="ri-braces-line"></i> 필수 객체 메서드 & 최신 연산자
        </h3>

        <MethodCard title="7. Object.keys() / values() / entries()">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            객체는 기본적으로 <code>map</code>을 돌릴 수 없습니다. 객체를 배열로 변환해서 순회하고 싶을 때 사용합니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const user = { name: '민수', age: 28, role: 'admin' };\n\nObject.keys(user);    // ['name', 'age', 'role']\nObject.values(user);  // ['민수', 28, 'admin']\nObject.entries(user); // [['name', '민수'], ['age', 28], ['role', 'admin']]\n\n// 실무 사용 예 (객체를 돌면서 UI 렌더링)\nObject.entries(user).map(([key, value]) => {\n  console.log(key, value);\n});`} 
            filename="object-example.js" 
          />
        </MethodCard>

        <MethodCard title="8. 구조 분해 할당 (Destructuring) & 전개 연산자 (Spread)">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            객체나 배열에서 필요한 값만 쏙쏙 뽑아오거나, 기존 객체를 복사해서 새로운 객체를 만들 때 사용합니다. React 상태(State) 업데이트 시 필수 문법입니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`// 구조 분해 할당\nconst user = { name: '민수', age: 28, city: 'Seoul' };\nconst { name, age } = user;\n\n// 전개 연산자 (객체 복사 및 덮어쓰기)\nconst updatedUser = { ...user, age: 29 }; // 기존 user 값은 유지하되 age만 변경\n\n// 배열 병합\nconst arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst merged = [...arr1, ...arr2]; // [1, 2, 3, 4]`} 
            filename="spread-example.js" 
          />
        </MethodCard>

        <MethodCard title="9. Optional Chaining (?.) & Nullish Coalescing (??)">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            <strong>?. (Optional Chaining)</strong>: 중첩된 객체의 값이 <code>null</code> 이나 <code>undefined</code>여도 에러를 내지 않고 안전하게 멈춥니다.<br/>
            <strong>?? (Nullish Coalescing)</strong>: 값이 <code>null</code> 이나 <code>undefined</code> 일 때만 기본값을 대신 설정해줍니다. (<code>||</code> 연산자와 달리 <code>0</code> 이나 <code>""</code>는 정상 값으로 취급합니다.)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const response = {\n  data: {\n    user: null // user가 없는 상황\n  }\n};\n\n// 🚨 이전 방식: 런타임 에러 발생 가능성 (Cannot read properties of null)\nconst name1 = response.data.user.name;\n\n// ✅ 실무 방식: 에러 없이 undefined 반환\nconst name2 = response.data.user?.name;\n\n// ✅ 기본값 설정 (null 이나 undefined일 때만 '이름 없음' 적용)\nconst finalName = response.data.user?.name ?? '이름 없음';`} 
            filename="operator-example.js" 
          />
        </MethodCard>

        <h3 style={{ fontSize: '1.2rem', marginTop: '20px', color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
          <i className="ri-text-spacing"></i> 실무 문자열(String) & 배열 고급 기법
        </h3>

        <MethodCard title="10. split() / join() - 문자열 쪼개고 합치기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            <strong>split()</strong>은 특정 문자를 기준으로 문자열을 쪼개어 배열로 만들고, <strong>join()</strong>은 배열의 요소들을 특정 문자로 연결하여 하나의 문자열로 합칩니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`// split: 문자열 -> 배열\nconst emails = "user1@a.com, user2@b.com, user3@c.com";\nconst emailArray = emails.split(", "); // ['user1@a.com', 'user2@b.com', 'user3@c.com']\n\n// join: 배열 -> 문자열\nconst tags = ['React', 'TypeScript', 'Next.js'];\nconst tagString = tags.join(" #"); // "React #TypeScript #Next.js"\n\n// 응용: 전화번호 포맷팅 (01012345678 -> 010-1234-5678)\nconst phone = "01012345678";\n// 실무에서는 정규식을 더 많이 쓰지만, split/join으로도 문자를 제어할 수 있습니다.`} 
            filename="split-join-example.js" 
          />
        </MethodCard>

        <MethodCard title="11. replace() / replaceAll() - 문자열 치환">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            문자열 안의 특정 텍스트를 다른 텍스트로 바꿉니다. <code>replace()</code>는 처음 발견된 하나만 바꾸고, <code>replaceAll()</code>은 일치하는 모든 텍스트를 바꿉니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const text = "사과, 배, 사과, 포도";\n\nconst newText1 = text.replace("사과", "바나나");    // "바나나, 배, 사과, 포도"\nconst newText2 = text.replaceAll("사과", "바나나"); // "바나나, 배, 바나나, 포도"\n\n// 실무 예: 금액 콤마 제거\nconst priceStr = "1,000,000";\nconst num = Number(priceStr.replaceAll(",", "")); // 1000000`} 
            filename="replace-example.js" 
          />
        </MethodCard>

        <MethodCard title="12. Set 객체 - 배열 중복 제거">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            <code>Set</code>은 중복을 허용하지 않는 자료구조입니다. 배열을 Set으로 만들었다가 다시 배열로 돌리면 <strong>가장 빠르고 우아하게 중복을 제거</strong>할 수 있습니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const numbers = [1, 2, 2, 3, 4, 4, 5];\n\n// Set을 이용한 중복 제거 후 전개 연산자로 다시 배열화\nconst uniqueNumbers = [...new Set(numbers)]; \n// 결과: [1, 2, 3, 4, 5]\n\n// 실무 예: 게시글 목록에서 태그(Tag)들만 뽑아내서 중복 없는 태그 필터 목록 만들기\nconst posts = [{ tag: 'React' }, { tag: 'Vue' }, { tag: 'React' }];\nconst uniqueTags = [...new Set(posts.map(p => p.tag))]; // ['React', 'Vue']`} 
            filename="set-example.js" 
          />
        </MethodCard>

        <MethodCard title="13. Array.from() - 배열 만들기 & 조작하기">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            유사 배열(NodeList 등)을 진짜 배열로 바꾸거나, <strong>특정 길이의 초기화된 배열을 만들 때</strong> 매우 유용합니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`// 길이가 5이고 값이 모두 undefined인 배열 생성\nconst emptyArr = Array.from({ length: 5 }); // [undefined, undefined, ...]\n\n// 두 번째 인자로 map 함수를 전달하여 값 초기화\nconst arr = Array.from({ length: 5 }, (_, index) => index + 1);\n// 결과: [1, 2, 3, 4, 5]\n\n// 실무 예: 페이지네이션(Pagination) 페이지 번호 버튼 렌더링\nconst totalPages = 5;\nconst pages = Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5]\n// <button key={page}>{page}</button>`} 
            filename="array-from-example.js" 
          />
        </MethodCard>

        <h3 style={{ fontSize: '1.2rem', marginTop: '20px', color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
          <i className="ri-code-s-slash-line"></i> React 조건부 렌더링 핵심 (논리 연산자)
        </h3>

        <MethodCard title="14. 논리 연산자 (&&, ||) 단축 평가">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            React JSX 내부에서 <code>if</code>문을 쓸 수 없기 때문에 <strong>단축 평가(Short-circuit evaluation)</strong>를 이용해 조건부 렌더링을 합니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const user = { role: 'admin', point: 0 };\n\n// A && B : A가 참(Truthy)이면 B를 반환/실행\n// 활용: 조건이 참일 때만 컴포넌트 렌더링\nconst renderAdmin = user.role === 'admin' && <AdminPanel />;\n\n// A || B : A가 거짓(Falsy)이면 B를 반환/실행\n// 활용: 기본값 설정 (단, 0이나 ""도 Falsy로 취급되어 넘어감 주의)\nconst nickname = user.nickname || '익명';\n\n// ⚠️ 꿀팁 주의사항: 0 렌더링 이슈\n// length && <List /> 형태를 쓰면 length가 0일 때 화면에 '0'이 출력됩니다!\n// 올바른 방법: length > 0 && <List /> 또는 !!length && <List />`} 
            filename="logic-example.js" 
          />
        </MethodCard>

        <h3 style={{ fontSize: '1.2rem', marginTop: '20px', color: '#1E293B', borderBottom: '2px solid #E2E8F0', paddingBottom: '8px' }}>
          <i className="ri-timer-flash-line"></i> 비동기 처리 & 유틸리티
        </h3>

        <MethodCard title="15. Promise.all() - 병렬 비동기 처리">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            여러 개의 독립적인 API 요청을 보낼 때, <code>await</code>를 각각 쓰면 직렬로 처리되어 느려집니다. <strong>Promise.all()</strong>을 사용하면 여러 요청을 동시에(병렬로) 처리하고 모두 끝날 때까지 기다립니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`// 실무 예: 대시보드 진입 시 유저 정보와 통계 데이터를 동시에 불러올 때\nconst fetchDashboardData = async () => {\n  try {\n    // 두 요청이 동시에 출발합니다.\n    const [userRes, statsRes] = await Promise.all([\n      fetch('/api/user'),\n      fetch('/api/stats')\n    ]);\n\n    const user = await userRes.json();\n    const stats = await statsRes.json();\n    \n    return { user, stats };\n  } catch (error) {\n    // 하나라도 실패하면 바로 여기로 빠집니다.\n    console.error("데이터 로딩 실패:", error);\n  }\n};`} 
            filename="promise-all-example.js" 
          />
        </MethodCard>

        <MethodCard title="16. setTimeout() / setInterval() - 타이머와 클린업">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            React에서 타이머를 사용할 때는 컴포넌트가 사라질 때(Unmount) 타이머가 계속 돌아가지 않도록 <strong>반드시 clearTimeout / clearInterval로 정리(Cleanup)</strong> 해줘야 메모리 누수가 발생하지 않습니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`import { useEffect } from 'react';\n\nconst TimerComponent = () => {\n  useEffect(() => {\n    // 1초마다 실행되는 타이머 생성\n    const timerId = setInterval(() => {\n      console.log('1초 지남');\n    }, 1000);\n\n    // 🧹 클린업 함수: 컴포넌트가 사라지거나 재실행되기 직전에 타이머를 끕니다.\n    return () => clearInterval(timerId);\n  }, []);\n\n  return <div>타이머 실행 중...</div>;\n};`} 
            filename="timer-example.js" 
          />
        </MethodCard>

        <MethodCard title="17. slice() vs splice() - 불변성(Immutability)의 차이">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            배열의 일부를 잘라낼 때 쓰지만, React 상태 관리 관점에서는 하늘과 땅 차이입니다.<br/>
            <strong>slice()</strong>: 원본 배열은 가만히 두고 <strong>잘라낸 새로운 복사본을 반환</strong>합니다. (✅ React 상태 업데이트 시 안전)<br/>
            <strong>splice()</strong>: <strong>원본 배열 자체를 파괴(조작)</strong>합니다. (🚨 React 상태 원본에 쓰면 화면이 안 바뀔 수 있음)
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const items1 = ['A', 'B', 'C', 'D'];\n// slice: 인덱스 1부터 3 직전까지 복사 (원본 유지)\nconst sliced = items1.slice(1, 3); \n// sliced: ['B', 'C'] / items1: ['A', 'B', 'C', 'D']\n\nconst items2 = ['A', 'B', 'C', 'D'];\n// splice: 인덱스 1부터 2개를 원본에서 뜯어냄 (원본 파괴)\nconst spliced = items2.splice(1, 2);\n// spliced: ['B', 'C'] / items2: ['A', 'D']`} 
            filename="slice-splice-example.js" 
          />
        </MethodCard>

        <MethodCard title="18. Intl 객체 - 다국어 숫자/날짜 포맷팅">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            라이브러리(moment, dayjs) 없이도 자바스크립트 내장 객체인 <code>Intl</code>을 사용하면 <strong>숫자에 콤마를 찍거나 환율 표시, 날짜 포맷팅을 아주 쉽게</strong> 할 수 있습니다.
          </p>
          <CodeViewer 
            language="typescript"
            rawCode={`const amount = 1234567.89;\n\n// 1. 단순 콤마 찍기\nnew Intl.NumberFormat('ko-KR').format(amount); // "1,234,567.89"\n// (참고로 amount.toLocaleString() 도 동일한 기능입니다)\n\n// 2. 통화(원화) 표시\nnew Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount); // "₩1,234,568"\n\n// 3. 날짜 포맷팅\nconst date = new Date();\nnew Intl.DateTimeFormat('ko-KR', { \n  year: 'numeric', month: 'long', day: 'numeric' \n}).format(date); // "2023년 10월 25일"`} 
            filename="intl-example.js" 
          />
        </MethodCard>

      </Grid>
    </SamplePageLayout>
  );
};