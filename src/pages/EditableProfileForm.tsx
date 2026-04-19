import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const initialProfile = {
  name: '김가은',
  email: 'gaeun.kim@company.com',
  department: 'Product Design',
  bio: '디자인 시스템과 어드민 UX를 담당하고 있습니다.',
};

const Container = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  input,
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    padding: 12px 14px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    resize: vertical;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $primary }) => ($primary ? '#fff' : theme.colors.text)};
  font-weight: 700;
`;

const DirtyBadge = styled.span<{ $dirty: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: ${({ theme, $dirty }) => ($dirty ? `${theme.colors.primary}12` : theme.colors.background)};
  color: ${({ theme, $dirty }) => ($dirty ? theme.colors.primary : theme.colors.textMuted)};
  font-size: 0.88rem;
  font-weight: 700;
`;

export const EditableProfileForm: React.FC = () => {
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);

  const isDirty = useMemo(
    () => JSON.stringify(savedProfile) !== JSON.stringify(draft),
    [savedProfile, draft],
  );

  const updateField = (key: keyof typeof draft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container>
      <div>
        <h2>프로필 수정 폼</h2>
        <p>초기값과 현재 수정값을 분리해서 저장 가능 여부를 제어하는 실무형 패턴입니다.</p>
      </div>

      <Card>
        <Grid>
          <Field>
            이름
            <input value={draft.name} onChange={(e) => updateField('name', e.target.value)} />
          </Field>
          <Field>
            이메일
            <input value={draft.email} onChange={(e) => updateField('email', e.target.value)} />
          </Field>
          <Field>
            부서
            <input value={draft.department} onChange={(e) => updateField('department', e.target.value)} />
          </Field>
        </Grid>

        <Field style={{ marginTop: '16px' }}>
          소개
          <textarea rows={5} value={draft.bio} onChange={(e) => updateField('bio', e.target.value)} />
        </Field>

        <Footer>
          <DirtyBadge $dirty={isDirty}>
            <i className={isDirty ? 'ri-edit-2-line' : 'ri-check-line'}></i>
            {isDirty ? '저장되지 않은 변경사항이 있습니다.' : '모든 변경사항이 저장되었습니다.'}
          </DirtyBadge>

          <ButtonGroup>
            <Button onClick={() => setDraft(savedProfile)} disabled={!isDirty}>
              변경 취소
            </Button>
            <Button $primary onClick={() => setSavedProfile(draft)} disabled={!isDirty}>
              변경 저장
            </Button>
          </ButtonGroup>
        </Footer>
      </Card>
    </Container>
  );
};

/*
[설명]
실무에서 "수정 화면"은 단순 입력폼이 아니라, 현재 저장된 값과 사용자가 편집 중인 값을 명확히 분리해야 하는 경우가 많습니다. 그래야 저장 버튼을 언제 활성화할지, 변경 취소를 누르면 무엇으로 되돌릴지, 페이지 이탈 경고를 언제 띄울지 같은 UX를 정확하게 제어할 수 있습니다. 이 예제는 그 기본 구조를 `savedProfile`과 `draft` 두 상태로 나눠 보여줍니다.

핵심은 서버에서 마지막으로 확정된 값은 `savedProfile`, 사용자가 지금 입력 중인 값은 `draft`로 분리하는 것입니다. 두 값이 같으면 저장할 것이 없고, 다르면 저장 버튼을 켜면 됩니다. 실무에서는 이 상태를 흔히 `dirty state`라고 부르며, 수정 화면 대부분이 이 개념 위에 올라갑니다.

`isDirty`를 `useMemo`로 계산한 이유는 비교 의도를 분명하게 만들기 위해서입니다. 지금 예시는 간단한 객체라 `JSON.stringify` 비교를 써도 무방하지만, 실제 서비스에서는 필드 수가 많거나 날짜 객체, 배열, 중첩 구조가 섞일 수 있으므로 비교 함수를 따로 두는 편이 더 안전합니다. 중요한 점은 "현재 입력값과 저장 완료값을 비교한다"는 설계 자체입니다.

실무 확장 포인트는 아래와 같습니다.
- 저장 버튼 활성화 조건은 `dirty` 여부와 함께 유효성 검사 결과도 같이 봐야 합니다.
- 페이지 이탈 방지 모달은 `isDirty`가 true일 때만 띄우면 됩니다.
- 저장 성공 후에는 `savedProfile`을 갱신해서 다시 기준 상태를 맞춰줘야 다음 변경 감지가 정확해집니다.
*/
