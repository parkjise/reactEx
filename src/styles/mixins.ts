// src/styles/mixins.ts
import { css } from 'styled-components';
import { variables } from './variables';

// 1. Flex 박스 중앙 정렬
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 2. 텍스트 말줄임 (1줄)
export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 3. 텍스트 말줄임 (여러 줄)
export const textEllipsisMulti = (line: number = 2) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 4. 스크롤바 숨기기 (모바일 뷰 등에서 유용)
export const hideScrollbar = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
`;

// 5. 커스텀 스크롤바 디자인
export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

// 6. 반응형 미디어 쿼리 헬퍼
export const media = {
  mobile: (styles: any) => css`
    @media (max-width: ${variables.breakpoints.mobile}) {
      ${styles}
    }
  `,
  tablet: (styles: any) => css`
    @media (max-width: ${variables.breakpoints.tablet}) {
      ${styles}
    }
  `,
  desktop: (styles: any) => css`
    @media (max-width: ${variables.breakpoints.desktop}) {
      ${styles}
    }
  `
};
