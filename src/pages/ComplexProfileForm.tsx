import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const FormGrid = styled.div`
  display: grid;
  gap: 20px;
  max-width: 600px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`;

const PreformattedData = styled.pre`
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  overflow-x: auto;
`;

interface ProfileState {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  settings: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    theme: 'light' | 'dark';
  };
}

export default function ComplexProfileForm() {
  const [profile, setProfile] = useState<ProfileState>({
    user: {
      firstName: '길동',
      lastName: '홍',
      email: 'hong@example.com',
    },
    settings: {
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      theme: 'light',
    },
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        notifications: {
          ...prev.settings.notifications,
          [name]: checked,
        },
      },
    }));
  };

  const toggleTheme = () => {
    setProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme === 'light' ? 'dark' : 'light',
      },
    }));
  };

  return (
    <SamplePageLayout
      title="복잡한 객체 상태 관리 (Nested Object State)"
      icon="ri-profile-line"
      description="useState를 사용하여 중첩된(Nested) 객체 구조를 안전하게 업데이트하는 방법을 알아봅니다."
      learningPoints={[
        '전개 연산자(...)를 사용한 불변성(Immutability) 유지 방법',
        'e.target.name을 활용한 동적 상태 업데이트 패턴',
        '중첩된 뎁스(depth)가 깊어질 때의 상태 변경 전략'
      ]}
      whyImportant="실무에서 폼(Form) 데이터나 사용자 설정은 대부분 복잡한 중첩 객체 형태로 백엔드와 통신합니다. 원본 데이터를 직접 수정하지 않고 올바르게 복사해서 렌더링을 트리거하는 패턴은 React의 기본기 중 핵심입니다."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card title="프로필 설정 폼">
          <FormGrid>
            <div>
              <SectionTitle>개인 정보</SectionTitle>
              <div style={{ display: 'grid', gap: '12px' }}>
                <Input
                  label="이름 (First Name)"
                  name="firstName"
                  value={profile.user.firstName}
                  onChange={handleUserChange}
                />
                <Input
                  label="성 (Last Name)"
                  name="lastName"
                  value={profile.user.lastName}
                  onChange={handleUserChange}
                />
                <Input
                  label="이메일 (Email)"
                  name="email"
                  type="email"
                  value={profile.user.email}
                  onChange={handleUserChange}
                />
              </div>
            </div>

            <div>
              <SectionTitle>알림 설정</SectionTitle>
              <div style={{ display: 'grid', gap: '12px' }}>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    name="email"
                    checked={profile.settings.notifications.email}
                    onChange={handleNotificationChange}
                  />
                  이메일 알림 수신
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    name="sms"
                    checked={profile.settings.notifications.sms}
                    onChange={handleNotificationChange}
                  />
                  SMS 알림 수신
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    name="push"
                    checked={profile.settings.notifications.push}
                    onChange={handleNotificationChange}
                  />
                  앱 푸시 알림 수신
                </CheckboxLabel>
              </div>
            </div>

            <div>
              <SectionTitle>기타 설정</SectionTitle>
              <Button onClick={toggleTheme} variant="outline">
                {profile.settings.theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
              </Button>
            </div>
          </FormGrid>
        </Card>

        <Card title="현재 상태 (State) 데이터">
          <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#64748B' }}>
            좌측 폼을 수정하면 아래 JSON 데이터가 실시간으로 안전하게 업데이트됩니다.
          </p>
          <PreformattedData>
            {JSON.stringify(profile, null, 2)}
          </PreformattedData>
        </Card>
      </div>
    </SamplePageLayout>
  );
}
