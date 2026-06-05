import { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const FieldRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
  animation: fadeIn 0.3s ease;
`;

const DeleteButton = styled(Button)`
  margin-top: 26px; /* Input의 Label 높이만큼 맞춤 */
  color: ${({ theme }) => theme.colors.error};
  border-color: ${({ theme }) => theme.colors.error};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
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

interface LinkField {
  id: string; // React 리스트 렌더링 최적화를 위한 고유 ID
  platform: string;
  url: string;
}

export default function DynamicArrayState() {
  const [links, setLinks] = useState<LinkField[]>([
    { id: '1', platform: 'GitHub', url: 'https://github.com' }
  ]);

  const addLink = () => {
    setLinks((prev) => [
      ...prev,
      { id: Date.now().toString(), platform: '', url: '' }
    ]);
  };

  const removeLink = (idToRemove: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== idToRemove));
  };

  const updateLink = (id: string, field: 'platform' | 'url', value: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  return (
    <SamplePageLayout
      title="동적 배열 상태 관리 (Array of Objects)"
      icon="ri-list-ordered-2"
      description="배열 내의 객체 요소들을 동적으로 추가, 수정, 삭제하는 상태 관리 패턴입니다."
      learningPoints={[
        'filter()를 이용한 불변성 배열 삭제',
        'map()을 이용한 특정 객체만 골라서 수정하는 업데이트 패턴',
        '배열 상태 렌더링 시 고유 식별자(id)를 key로 사용하는 중요성'
      ]}
      whyImportant="사용자가 항목을 원하는 만큼 추가할 수 있는 폼(이력서 경력 추가, 여러 개의 첨부 파일 링크 추가 등)은 배열 상태 관리의 이해도가 필수적입니다."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        <Card title="소셜 링크 등록">
          <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.9rem' }}>
            플랫폼 이름과 URL을 입력하고 추가/삭제 해보세요.
          </p>

          {links.map((link, i) => (
            <FieldRow key={link.id}>
              <div style={{ flex: 1 }}>
                <Input
                  label={`플랫폼 이름 ${i + 1}`}
                  value={link.platform}
                  placeholder="예: Twitter, LinkedIn"
                  onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                />
              </div>
              <div style={{ flex: 2 }}>
                <Input
                  label="프로필 URL"
                  value={link.url}
                  placeholder="https://..."
                  onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                />
              </div>
              <DeleteButton
                variant="outline"
                size="medium"
                icon="ri-delete-bin-line"
                onClick={() => removeLink(link.id)}
                disabled={links.length === 1} // 최소 1개는 유지
              >
                삭제
              </DeleteButton>
            </FieldRow>
          ))}

          <Button
            variant="primary"
            icon="ri-add-line"
            onClick={addLink}
            style={{ marginTop: '10px' }}
          >
            새로운 링크 필드 추가하기
          </Button>
        </Card>

        <Card title="상태(State) 모니터링">
          <PreformattedData>
            {JSON.stringify(links, null, 2)}
          </PreformattedData>
        </Card>
      </div>
    </SamplePageLayout>
  );
}
