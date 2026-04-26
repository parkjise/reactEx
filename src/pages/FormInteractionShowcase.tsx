import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldWrapper = styled.div`
  position: relative;
`;

const CharCount = styled.div<{ $isLimit: boolean }>`
  position: absolute;
  right: 12px;
  top: -24px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme, $isLimit }) => ($isLimit ? theme.colors.error : theme.colors.textMuted)};
`;

const EyeIcon = styled.i`
  position: absolute;
  right: 12px;
  top: 36px; /* label 공간 고려 */
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 0.95rem;
  }
`;

const SubFieldBox = styled.div`
  margin-top: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const INITIAL_STATE = {
  title: '',
  password: '',
  hasWebsite: 'no',
  websiteUrl: '',
};

export const FormInteractionShowcase: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);

  // Dirty Check: 초기 상태와 현재 상태가 다른지 비교
  const isDirty = JSON.stringify(formData) !== JSON.stringify(INITIAL_STATE);

  // 브라우저 탭을 닫거나 뒤로가기 할 때 경고 (BeforeUnload)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ''; // Chrome 표준
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 제목 길이 제한 로직
    if (name === 'title' && value.length > 50) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if (isDirty) {
      if (window.confirm('작성 중인 내용이 있습니다. 정말 초기화하시겠습니까?')) {
        setFormData(INITIAL_STATE);
      }
    }
  };

  return (
    <SamplePageLayout
      title="고급 폼 인터랙션 (Showcase)"
      icon="ri-magic-line"
      description="텍스트 길이 카운트, 비밀번호 보기/숨기기, 조건부 하위 필드 노출, 이탈 방지(Dirty Check) 등 고급 폼 UX를 모두 모았습니다."
      learningPoints={[
        '입력값 길이에 따른 실시간 카운트 표시 및 최대 길이 차단',
        'input type="password"와 "text"의 동적 전환을 통한 비밀번호 노출 제어',
        'Radio 버튼 값에 따른 애니메이션이 적용된 하위 입력창(Sub-field) 조건부 렌더링',
        'JSON.stringify를 활용한 폼 상태 변경(Dirty Check) 감지와 브라우저 이탈 방지(beforeunload)',
      ]}
      whyImportant="사용자가 폼을 작성하는 과정에서 겪는 사소한 불편함을 없애주는 디테일의 차이가 '좋은 프로덕트'를 만듭니다. 특히 실수로 창을 닫았을 때 데이터가 날아가는 것을 방지하는 Dirty Check는 필수입니다."
    >
      <Card title="포트폴리오 정보 입력">
        <FormGrid>
          {/* 1. 글자 수 카운트 */}
          <FieldWrapper>
            <CharCount $isLimit={formData.title.length >= 50}>
              {formData.title.length} / 50
            </CharCount>
            <Input
              label="프로젝트 제목"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="50자 이내로 입력하세요"
            />
          </FieldWrapper>

          {/* 2. 비밀번호 보기/숨기기 */}
          <FieldWrapper>
            <EyeIcon 
              className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} 
              onClick={() => setShowPassword(!showPassword)}
            />
            <Input
              label="접근 비밀번호"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </FieldWrapper>

          {/* 3. 조건부 하위 필드 */}
          <FieldWrapper>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>개인 웹사이트가 있으신가요?</label>
            <RadioGroup>
              <label>
                <input 
                  type="radio" 
                  name="hasWebsite" 
                  value="yes" 
                  checked={formData.hasWebsite === 'yes'}
                  onChange={handleChange}
                />
                네, 있습니다
              </label>
              <label>
                <input 
                  type="radio" 
                  name="hasWebsite" 
                  value="no" 
                  checked={formData.hasWebsite === 'no'}
                  onChange={handleChange}
                />
                아니요
              </label>
            </RadioGroup>

            {formData.hasWebsite === 'yes' && (
              <SubFieldBox>
                <Input
                  label="웹사이트 URL"
                  name="websiteUrl"
                  icon="ri-link"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </SubFieldBox>
            )}
          </FieldWrapper>

          {/* 4. Dirty Check & Action */}
          <ActionRow>
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={!isDirty}
            >
              초기화
            </Button>
            <Button 
              variant="primary" 
              icon="ri-save-line"
              disabled={!isDirty}
              onClick={() => alert('저장되었습니다.')}
            >
              {isDirty ? '변경사항 저장' : '저장 완료됨'}
            </Button>
          </ActionRow>
        </FormGrid>
      </Card>
    </SamplePageLayout>
  );
};

/*
[설명]
고급 폼 UX를 모두 합쳐놓은 종합 선물세트입니다.

실무 패턴:
- `window.addEventListener('beforeunload', ...)`: 사용자가 폼을 입력하던 도중 실수로 브라우저 탭을 닫거나 새로고침 할 때, 브라우저 기본 경고창을 띄워 데이터 유실을 막는 가장 확실한 방법입니다.
- 조건부 렌더링 영역(`SubFieldBox`)에는 CSS `@keyframes`를 이용해 위에서 아래로 부드럽게 펼쳐지는 애니메이션을 주어 시각적 거부감을 줄였습니다.
- 초기화 버튼을 누를 때 폼이 수정(Dirty)된 상태라면 `window.confirm`을 한 번 띄워 재확인하는 안전 장치를 마련했습니다.
*/
