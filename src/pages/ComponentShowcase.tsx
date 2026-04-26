import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { StepIndicator } from '../components/common/StepIndicator';
import { StateWrapper } from '../components/common/StateWrapper';
import { Button } from '../components/common/Button';

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ComponentShowcase: React.FC = () => {
  // StepIndicator 상태
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { title: '장바구니', description: '상품 확인' },
    { title: '결제 정보', description: '카드 및 배송지' },
    { title: '주문 완료', description: '감사합니다' }
  ];

  // StateWrapper 상태
  const [wrapperState, setWrapperState] = useState<'loading' | 'empty' | 'error' | 'success'>('loading');

  return (
    <SamplePageLayout
      title="실무 공통 뼈대 컴포넌트 모음"
      icon="ri-shape-2-line"
      description="앱 전체에서 재사용되는 핵심 네비게이션 및 상태 처리(Wrapper) 컴포넌트들을 소개합니다."
      learningPoints={[
        'React Router의 Link와 연동 가능한 Breadcrumb 컴포넌트',
        'CSS 가상 요소(::after)를 활용한 Step 연결선 및 동적 색상 처리',
        'API 로딩/에러/빈 데이터를 한 곳에서 처리해주는 StateWrapper HOC 패턴'
      ]}
      whyImportant="실무에서는 '데이터 로딩 중', '에러 발생', '데이터 없음' 처리를 각 페이지마다 따로 만들지 않습니다. StateWrapper 같은 공통 컴포넌트를 설계해 두면 앱 전체의 UI 일관성을 지키고 코드 중복을 획기적으로 줄일 수 있습니다."
    >
      <Section>
        <SectionTitle>1. Breadcrumb (경로 탐색기)</SectionTitle>
        <Card padding="16px 24px">
          <Breadcrumb 
            items={[
              { label: '홈', path: '/' },
              { label: '설정', path: '/settings' },
              { label: '사용자 관리' } // 마지막 요소는 path를 넣지 않음
            ]} 
          />
        </Card>
      </Section>

      <Section>
        <SectionTitle>2. Step Indicator (단계 표시기)</SectionTitle>
        <Card>
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              이전 단계
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
            >
              다음 단계
            </Button>
          </div>
        </Card>
      </Section>

      <Section style={{ marginBottom: 0 }}>
        <SectionTitle>3. State Wrapper (상태 처리 컨테이너)</SectionTitle>
        <ButtonGroup>
          <Button variant={wrapperState === 'loading' ? 'primary' : 'outline'} onClick={() => setWrapperState('loading')}>Loading</Button>
          <Button variant={wrapperState === 'empty' ? 'primary' : 'outline'} onClick={() => setWrapperState('empty')}>Empty</Button>
          <Button variant={wrapperState === 'error' ? 'primary' : 'outline'} onClick={() => setWrapperState('error')}>Error</Button>
          <Button variant={wrapperState === 'success' ? 'primary' : 'outline'} onClick={() => setWrapperState('success')}>Success (Content)</Button>
        </ButtonGroup>

        <Card>
          <StateWrapper 
            isLoading={wrapperState === 'loading'}
            isEmpty={wrapperState === 'empty'}
            isError={wrapperState === 'error'}
            onRetry={() => setWrapperState('loading')}
          >
            <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>🎉 데이터를 성공적으로 불러왔습니다!</h4>
              <p style={{ margin: 0, color: '#666' }}>여기에 실제 컴포넌트 내용이 렌더링됩니다.</p>
            </div>
          </StateWrapper>
        </Card>
      </Section>

    </SamplePageLayout>
  );
};

/*
[설명]
현업에서 가장 많이 쓰이는 공통 컴포넌트 3대장을 한 곳에 모아두었습니다.

실무 패턴:
- `Breadcrumb`: 뎁스(Depth)가 깊은 어드민 페이지에서 필수입니다. 마지막 아이템인지 여부(`isLast`)에 따라 링크를 걸지, 텍스트만 보여줄지 결정합니다.
- `StepIndicator`: 각 스텝 사이의 선(Line)은 `::after` 가상 요소를 `flex: 1` 상태의 부모 컨테이너 너비(100%)만큼 뻗게 하여 구현합니다.
- `StateWrapper`: API 호출 결과를 렌더링할 때 가장 바깥에 감싸주는(Wrapping) 패턴입니다. 컴포넌트 내부에서 잡다한 `if (loading) return ...` 로직을 제거해 줍니다.
*/
