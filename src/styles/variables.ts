// src/styles/variables.ts
export const variables = {
  // 브레이크포인트 (반응형)
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px'
  },
  
  // Z-Index 관리 (실무에서 꼬임 방지)
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080
  },

  // 여백 (Spacing)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },

  // 트랜지션 (Animation Timing)
  transition: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  }
};
