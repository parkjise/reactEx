import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { StepIndicator } from '../components/common/StepIndicator';

const WizardContainer = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const StepContent = styled.div`
  flex: 1;
  padding: 30px 0;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 20px;
`;

export const MultiStepWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // 폼 상태를 하나의 객체로 관리하여 모든 스텝 간 데이터를 유지합니다.
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    managerName: '',
    managerPhone: '',
    plan: 'basic'
  });

  const steps = [
    { title: '회사 정보' },
    { title: '담당자 정보' },
    { title: '요금제 선택' },
    { title: '가입 완료' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // 1단계 유효성 검사
    if (currentStep === 0 && (!formData.companyName || !formData.businessNumber)) {
      alert('모든 회사 정보를 입력해주세요.');
      return;
    }
    // 2단계 유효성 검사
    if (currentStep === 1 && (!formData.managerName || !formData.managerPhone)) {
      alert('담당자 정보를 모두 입력해주세요.');
      return;
    }
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <SamplePageLayout
      title="다단계 마법사 (Multi-step Wizard)"
      icon="ri-magic-line"
      description="여러 페이지에 걸쳐 입력받아야 하는 복잡한 폼을 단계별로 나누어 처리하는 B2B 필수 패턴입니다."
      learningPoints={[
        '상위 컴포넌트(Wizard)에서 단일 폼 상태(State)를 쥐고 있어 스텝을 앞뒤로 이동해도 데이터가 보존됨',
        '다음 단계로 넘어가기 전(handleNext)에 실행되는 단계별 유효성 검사 분기 처리',
        '공통 컴포넌트인 StepIndicator와의 매끄러운 연동'
      ]}
      whyImportant="가입 절차가 10개가 넘는 항목을 한 페이지에 요구하면 사용자는 이탈합니다. 정보를 의미 단위로 쪼개고 시각적 진행 상태(Progress)를 보여주면 작성 완료율을 크게 높일 수 있습니다."
    >
      <Card>
        <WizardContainer>
          <StepIndicator steps={steps} currentStep={currentStep} style={{ marginBottom: '20px' }} />
          
          <StepContent>
            {currentStep === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0 }}>Step 1. 회사 기본 정보를 입력해주세요</h4>
                <Input 
                  label="회사명 (상호)" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                  placeholder="(주)지엑스온" 
                />
                <Input 
                  label="사업자 등록번호" 
                  name="businessNumber" 
                  value={formData.businessNumber} 
                  onChange={handleChange} 
                  placeholder="000-00-00000" 
                />
              </div>
            )}

            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0 }}>Step 2. 시스템 관리 담당자를 지정해주세요</h4>
                <Input 
                  label="담당자 이름" 
                  name="managerName" 
                  value={formData.managerName} 
                  onChange={handleChange} 
                  placeholder="홍길동" 
                />
                <Input 
                  label="담당자 연락처" 
                  name="managerPhone" 
                  value={formData.managerPhone} 
                  onChange={handleChange} 
                  placeholder="010-0000-0000" 
                />
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ margin: 0 }}>Step 3. 이용하실 요금제를 선택해주세요</h4>
                <select 
                  name="plan" 
                  value={formData.plan} 
                  onChange={handleChange}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                >
                  <option value="basic">베이직 플랜 (월 ₩29,000)</option>
                  <option value="pro">프로 플랜 (월 ₩99,000)</option>
                  <option value="enterprise">엔터프라이즈 (별도 문의)</option>
                </select>
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <i className="ri-checkbox-circle-fill" style={{ fontSize: '4rem', color: '#05CD99' }} />
                <h3>가입 절차가 모두 완료되었습니다!</h3>
                <p style={{ color: '#666' }}>{formData.companyName}님, 환영합니다.<br/>선택하신 요금제는 <strong>{formData.plan}</strong> 입니다.</p>
              </div>
            )}
          </StepContent>

          <FooterActions>
            {currentStep > 0 && currentStep < 3 ? (
              <Button variant="outline" onClick={handlePrev}>이전 단계</Button>
            ) : (
              <div></div> // 빈 공간 채우기 (flex-between 유지)
            )}
            
            {currentStep < 2 ? (
              <Button variant="primary" onClick={handleNext}>다음 단계</Button>
            ) : currentStep === 2 ? (
              <Button variant="primary" onClick={handleNext}>가입 완료하기</Button>
            ) : (
              <Button variant="secondary" onClick={() => setCurrentStep(0)}>처음으로 돌아가기</Button>
            )}
          </FooterActions>
        </WizardContainer>
      </Card>
    </SamplePageLayout>
  );
};
