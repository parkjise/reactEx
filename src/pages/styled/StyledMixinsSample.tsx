// src/pages/styled/StyledMixinsSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { flexCenter, textEllipsis, customScrollbar } from '../../styles/mixins';

const FlexBox = styled.div`
  ${flexCenter} /* 중앙 정렬 믹스인 적용 */
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const EllipsisText = styled.p`
  ${textEllipsis} /* 말줄임 믹스인 적용 */
  width: 250px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin-bottom: 20px;
`;

const ScrollBox = styled.div`
  ${customScrollbar} /* 커스텀 스크롤바 믹스인 적용 */
  width: 100%;
  height: 120px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};

  p { margin-bottom: 20px; }
`;

export const StyledMixinsSample: React.FC = () => {
  const codeString = `/* [설명]
mixins는 반복되는 CSS 조각을 함수처럼 재사용하기 위한 styled-components helper입니다.
flexCenter, textEllipsis, media query처럼 자주 쓰는 규칙을 모아두면 스타일 중복과 오타를 줄일 수 있습니다.
*/
// src/styles/mixins.ts
import { css } from 'styled-components';

export const flexCenter = css\`
  display: flex;
  justify-content: center;
  align-items: center;
\`;

export const textEllipsis = css\`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
\`;

export const customScrollbar = css\`
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    background: \${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
\`;

// 컴포넌트 적용
const Box = styled.div\`
  \${flexCenter}
\`;`;

  return (
    <SamplePageLayout
      title="6. mixins 공통 스타일 관리"
      description="자주 쓰이는 CSS 패턴들(중앙 정렬, 말줄임, 스크롤바 디자인 등)을 mixin으로 추출하여 중복 코드를 방지하는 패턴입니다."
    >
      <StyledCard>
        <h3>1. flexCenter 믹스인</h3>
        <FlexBox>이 박스는 flexCenter 믹스인으로 완벽하게 중앙 정렬되었습니다.</FlexBox>

        <h3>2. textEllipsis 믹스인 (1줄 말줄임)</h3>
        <EllipsisText>이 텍스트는 길이가 너무 길어서 부모 박스의 너비(250px)를 넘어가면 자동으로 말줄임표(...) 처리가 됩니다. 끝까지 보이지 않죠?</EllipsisText>

        <h3>3. customScrollbar 믹스인</h3>
        <ScrollBox>
          <p>여기를 스크롤 해보세요.</p>
          <p>커스텀 디자인된 얇은 스크롤바가 보입니다.</p>
          <p>브라우저 기본 스크롤바 대신 테마와 어울리는 스크롤바를 믹스인 단 한 줄로 적용했습니다.</p>
          <p>내용 내용 내용</p>
          <p>내용 내용 내용</p>
          <p>내용 내용 내용</p>
        </ScrollBox>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="typescript" filename="Mixins Example" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
