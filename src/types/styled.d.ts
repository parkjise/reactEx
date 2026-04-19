import 'styled-components';
import { Theme } from '../styles/theme';

declare module 'styled-components' {
  // 우리가 만든 Theme 타입으로 DefaultTheme을 덮어씁니다.
  // 빈 인터페이스에 속성을 추가하는 선언 병합(Declaration Merging) 기법입니다.
  export interface DefaultTheme extends Theme {}
}
