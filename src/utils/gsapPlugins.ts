import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 전역 플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger };
