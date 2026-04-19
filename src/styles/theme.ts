export const lightTheme = {
  colors: {
    background: '#F5F6FA',  // Gxon 스타일 오프화이트
    surface: '#FFFFFF',
    primary: '#316AFF',     // Gxon 메인 블루
    primaryHover: '#2558db',
    text: '#2B3674',        // 좀 더 깊은 네이비톤의 메인 텍스트
    textMuted: '#A3AED0',   // 가벼운 그레이
    border: '#E2E8F0',
    error: '#EE5D50',
    success: '#05CD99',
    sidebar: '#FFFFFF'
  },
  radius: {
    card: '10px',
    button: '10px'
  }
};

export const darkTheme = {
  colors: {
    background: '#0F172A',  // Gxon 딥 네이비
    surface: '#1E293B',
    primary: '#316AFF',
    primaryHover: '#4e7fff',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    border: '#334155',
    error: '#F87171',
    success: '#34D399',
    sidebar: '#1E293B'
  },
  radius: {
    card: '10px',
    button: '10px'
  }
};

export type Theme = typeof lightTheme;
