import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

/*
[설명]
Zustand를 활용하여 다크모드 상태와 사이드바 열림/닫힘 전역 상태를 관리합니다.

실무 패턴:
- Redux나 Context API 등 보다 보일러플레이트가 훨씬 적어 최근 실무에서 각광받습니다.
- Context Provider 헬퍼 없이도 훅(Hook) 형태로 어디서든 값과 함수를 꺼내다 쓸 수 있습니다.
- 앱 전체에서 즉각적으로 반응해야 하는 UI 상태(테마, 사이드바 토글)를 관리하기에 적합합니다.
*/
