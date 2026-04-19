import React, { useState } from 'react';
import styled from 'styled-components';

const steps = ['배송 정보', '결제 정보', '최종 확인'];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 820px;
`;

const StepBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StepItem = styled.div<{ $active: boolean; $done: boolean }>`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $active, $done }) => (
    $active ? `${theme.colors.primary}12` : $done ? theme.colors.background : theme.colors.surface
  )};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: 700;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  font-weight: 600;

  input,
  select {
    padding: 12px 14px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $primary }) => ($primary ? '#fff' : theme.colors.text)};
  font-weight: 700;
`;

export const MultiStepCheckout: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    receiver: '',
    address: '',
    payment: 'card',
    installment: '일시불',
  });

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canGoNext =
    step === 0 ? Boolean(formData.receiver && formData.address) :
    step === 1 ? Boolean(formData.payment && formData.installment) :
    true;

  return (
    <Container>
      <div>
        <h2>다단계 주문서</h2>
        <p>입력 필드를 단계별로 끊어서 복잡한 폼을 관리하는 패턴입니다.</p>
      </div>

      <StepBar>
        {steps.map((label, index) => (
          <StepItem key={label} $active={step === index} $done={step > index}>
            {index + 1}. {label}
          </StepItem>
        ))}
      </StepBar>

      <Card>
        {step === 0 && (
          <>
            <Field>
              받는 사람
              <input value={formData.receiver} onChange={(e) => updateField('receiver', e.target.value)} />
            </Field>
            <Field>
              배송 주소
              <input value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field>
              결제 수단
              <select value={formData.payment} onChange={(e) => updateField('payment', e.target.value)}>
                <option value="card">카드 결제</option>
                <option value="bank">계좌 이체</option>
                <option value="kakaopay">간편 결제</option>
              </select>
            </Field>
            <Field>
              할부 개월
              <select value={formData.installment} onChange={(e) => updateField('installment', e.target.value)}>
                <option>일시불</option>
                <option>2개월</option>
                <option>3개월</option>
                <option>6개월</option>
              </select>
            </Field>
          </>
        )}

        {step === 2 && (
          <div style={{ lineHeight: 1.8 }}>
            <div><strong>받는 사람:</strong> {formData.receiver}</div>
            <div><strong>배송 주소:</strong> {formData.address}</div>
            <div><strong>결제 수단:</strong> {formData.payment}</div>
            <div><strong>할부 개월:</strong> {formData.installment}</div>
          </div>
        )}

        <Footer>
          <Button onClick={() => setStep((prev) => Math.max(prev - 1, 0))} disabled={step === 0}>
            이전
          </Button>
          <Button
            $primary
            onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
            disabled={!canGoNext || step === steps.length - 1}
          >
            다음
          </Button>
        </Footer>
      </Card>
    </Container>
  );
};

/*
[설명]
입력 항목이 많아질수록 사용자는 한 화면에 모든 필드를 보는 것을 부담스러워합니다. 주문서, 회원가입, 사내 신청서처럼 단계가 분명한 폼은 화면을 여러 단계로 나누는 것이 훨씬 읽기 쉽고 이탈도 줄입니다. 이 예제는 그런 다단계 폼에서 가장 기본이 되는 `현재 단계(step)` 상태와 `전체 폼 데이터(formData)` 상태의 분리 방식을 보여줍니다.

중요한 점은 단계별로 화면은 나뉘어도, 데이터는 하나의 객체에 계속 쌓인다는 것입니다. 그래야 마지막 검토 단계에서 전체 값을 한 번에 보여줄 수 있고, 서버 전송 시에도 단일 payload로 묶기 쉽습니다. 즉 화면 분리와 데이터 분리를 혼동하지 않는 것이 핵심입니다.

`canGoNext` 같은 조건 변수를 따로 둔 이유도 실무적입니다. 각 단계마다 다음 버튼 활성화 조건이 다르기 때문입니다. 배송 단계는 이름과 주소가 필요하고, 결제 단계는 수단 선택이 필요합니다. 이 조건을 JSX 안에 직접 길게 쓰기보다 변수로 빼두면 단계별 정책을 추적하기가 쉬워집니다.

실무에서 이 구조는 아래처럼 확장됩니다.
- 단계가 많아지면 각 스텝을 별도 컴포넌트로 분리해도 중심 상태 구조는 유지됩니다.
- 단계 이동 시 서버 임시 저장(draft save)을 붙이면 긴 입력폼도 안정적으로 운영할 수 있습니다.
- 마지막 제출 직전에는 전체 검증을 한 번 더 수행해 누락된 필드가 없는지 확인하는 것이 안전합니다.
*/
