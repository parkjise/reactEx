import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
`;

const StatusBox = styled.div<{ $type: 'idle' | 'success' | 'error' }>`
  margin-top: 14px;
  border: 1px solid ${({ theme, $type }) => ($type === 'error' ? theme.colors.error : $type === 'success' ? theme.colors.success : theme.colors.border)};
  background: ${({ theme, $type }) => ($type === 'error' ? `${theme.colors.error}10` : $type === 'success' ? `${theme.colors.success}10` : theme.colors.background)};
  color: ${({ theme, $type }) => ($type === 'error' ? theme.colors.error : $type === 'success' ? theme.colors.success : theme.colors.textMuted)};
  border-radius: 8px;
  padding: 12px;
  font-weight: 700;
`;

const SkeletonLine = styled.div<{ $width?: string }>`
  height: 13px;
  width: ${({ $width }) => $width || '100%'};
  border-radius: 999px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 37%, #e2e8f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;

  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
  }
`;

const Spinner = styled.i`
  display: inline-block;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Toast = styled.div<{ $visible: boolean; $type: 'success' | 'error' }>`
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 2000;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : 18)}px);
  transition: 0.2s ease;
  color: #fff;
  background: ${({ $type }) => ($type === 'success' ? '#059669' : '#dc2626')};
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 800;
  pointer-events: none;
`;

export const LoadingFeedbackInteractions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });
  const timerRef = useRef<number | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setToast({ visible: true, message, type });
    timerRef.current = window.setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2200);
  };

  const handleSave = () => {
    setLoading(true);
    setSaveState('idle');
    window.setTimeout(() => {
      const nextState = Math.random() > 0.35 ? 'success' : 'error';
      setLoading(false);
      setSaveState(nextState);
      showToast(nextState === 'success' ? '저장 완료' : '저장 실패', nextState);
    }, 900);
  };

  return (
    <SamplePageLayout
      title="로딩/피드백 인터랙션"
      icon="ri-loader-4-line"
      description="로딩 스피너, 스켈레톤, 버튼 클릭 후 로딩 상태, 비활성화 버튼, 저장 완료/실패 메시지, 자동 닫히는 알림창을 다룹니다."
      learningPoints={[
        '비동기 처리 중 버튼 disabled와 spinner 상태 동기화',
        '작업 결과를 success/error 상태 박스와 토스트로 표현',
        'setTimeout 기반 자동 닫힘 알림 구현',
      ]}
      whyImportant="사용자는 클릭이 처리되고 있는지 즉시 알아야 합니다. 로딩과 결과 피드백이 없으면 같은 버튼을 여러 번 누르거나 저장 여부를 오해하게 됩니다."
    >
      <Grid>
        <Card title="버튼 클릭 후 로딩 상태" padding="16px">
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? <><Spinner className="ri-loader-4-line" /> 저장 중</> : '저장하기'}
            </Button>
            <Button variant="secondary" disabled>비활성화</Button>
          </div>
          <StatusBox $type={saveState}>
            {saveState === 'idle' ? '아직 저장 전입니다.' : saveState === 'success' ? '저장 완료 상태입니다.' : '저장 실패 상태입니다.'}
          </StatusBox>
        </Card>

        <Card title="로딩 스피너 / 스켈레톤 표시" padding="16px">
          {loading ? (
            <div style={{ display: 'grid', gap: 10 }}>
              <SkeletonLine />
              <SkeletonLine $width="78%" />
              <SkeletonLine $width="55%" />
            </div>
          ) : (
            <StatusBox $type="idle">저장 버튼을 누르면 이 영역이 스켈레톤으로 바뀝니다.</StatusBox>
          )}
        </Card>

        <Card title="자동 닫히는 알림창" padding="16px">
          <Button variant="outline" onClick={() => showToast('자동으로 닫히는 알림입니다.', 'success')}>
            알림 띄우기
          </Button>
        </Card>
      </Grid>

      <Toast $visible={toast.visible} $type={toast.type}>
        <i className={toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} /> {toast.message}
      </Toast>
    </SamplePageLayout>
  );
};
