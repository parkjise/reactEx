import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';

// -- Styled Components for UI --
const SectionGrid = styled.div`
  display: grid;
  gap: 24px;
`;

const GuidePanel = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .bem-definition {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;

    .def-card {
      padding: 16px;
      border-radius: 6px;
      background-color: ${({ theme }) => theme.colors.background};
      border-left: 4px solid;
      
      h4 {
        margin-bottom: 8px;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      p {
        font-size: 0.9rem;
        color: ${({ theme }) => theme.colors.textMuted};
        line-height: 1.5;
        margin-bottom: 8px;
      }
      
      code {
        background-color: rgba(0,0,0,0.05);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.85rem;
        color: ${({ theme }) => theme.colors.text};
      }
    }

    .def-block { border-color: #3b82f6; h4 { color: #3b82f6; } }
    .def-element { border-color: #10b981; h4 { color: #10b981; } }
    .def-modifier { border-color: #f59e0b; h4 { color: #f59e0b; } }
  }
`;

const GeneratorSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const InputPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 6px;
  }

  input {
    padding: 10px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-family: monospace;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
    }
  }

  .help-text {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const PresetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const PresetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const OutputPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OutputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h4 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const CopyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}30;
  }
`;

const CodeOutput = styled.pre`
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 0;
  height: 100%;
  max-height: 400px;

  .block { color: #569cd6; } /* Light Blue */
  .element { color: #4ec9b0; } /* Light Green */
  .modifier { color: #dcdcaa; } /* Light Orange/Yellow */
  .comment { color: #6a9955; } /* Green */
  .punct { color: #d4d4d4; } /* White/Grey */
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.85rem;
  margin-top: -4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ScssBemGenerator: React.FC = () => {
  const [blockName, setBlockName] = useState('card');
  const [elements, setElements] = useState('header, title, image, body, footer');
  const [modifiers, setModifiers] = useState('active, disabled, primary');
  
  const [copiedScss, setCopiedScss] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Validation: Only lowercase letters, numbers, and hyphens allowed.
  const isValidFormat = (str: string) => /^[a-z0-9\-,\s]+$/.test(str) || str === '';
  const blockError = !isValidFormat(blockName) ? '소문자, 숫자, 하이픈(-)만 사용 가능합니다.' : null;

  // Process inputs
  const parsedBlock = blockName.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '');
  const parsedElements = elements.split(',').map(e => e.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '')).filter(Boolean);
  const parsedModifiers = modifiers.split(',').map(m => m.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '')).filter(Boolean);

  // Generate SCSS
  const generatedScss = useMemo(() => {
    if (!parsedBlock) return '/* Block 이름이 필요합니다 */';
    
    let scss = `.${parsedBlock} {\n`;
    scss += `  // Base styles for Block\n\n`;

    if (parsedModifiers.length > 0) {
      scss += `  // --- Modifiers ---\n`;
      parsedModifiers.forEach(mod => {
        scss += `  &--${mod} {\n    \n  }\n`;
      });
      scss += `\n`;
    }

    if (parsedElements.length > 0) {
      scss += `  // --- Elements ---\n`;
      parsedElements.forEach(el => {
        scss += `  &__${el} {\n    \n  }\n`;
      });
    }

    scss += `}`;
    return scss;
  }, [parsedBlock, parsedElements, parsedModifiers]);

  // Generate HTML Boilerplate
  const generatedHtml = useMemo(() => {
    if (!parsedBlock) return '<!-- Block 이름이 필요합니다 -->';
    
    let html = `<!-- BEM Component: ${parsedBlock} -->\n`;
    
    const modifierClass = parsedModifiers.length > 0 ? ` ${parsedBlock}--${parsedModifiers[0]}` : '';
    
    html += `<div class="${parsedBlock}${modifierClass}">\n`;
    
    parsedElements.forEach(el => {
      // Guessing semantic tags based on common element names
      let tag = 'div';
      if (el.includes('title') || el.includes('heading')) tag = 'h3';
      else if (el.includes('image') || el.includes('img') || el.includes('thumb')) tag = 'img';
      else if (el.includes('list')) tag = 'ul';
      else if (el.includes('item')) tag = 'li';
      else if (el.includes('button') || el.includes('btn')) tag = 'button';
      else if (el.includes('link')) tag = 'a';
      else if (el.includes('text') || el.includes('desc')) tag = 'p';

      if (tag === 'img') {
        html += `  <${tag} class="${parsedBlock}__${el}" src="..." alt="..." />\n`;
      } else if (tag === 'button') {
        html += `  <${tag} type="button" class="${parsedBlock}__${el}">Button</${tag}>\n`;
      } else if (tag === 'a') {
        html += `  <${tag} href="#" class="${parsedBlock}__${el}">Link</${tag}>\n`;
      } else {
        html += `  <${tag} class="${parsedBlock}__${el}"></${tag}>\n`;
      }
    });

    html += `</div>`;
    return html;
  }, [parsedBlock, parsedElements, parsedModifiers]);

  const handleCopy = (text: string, type: 'scss' | 'html') => {
    navigator.clipboard.writeText(text);
    if (type === 'scss') {
      setCopiedScss(true);
      setTimeout(() => setCopiedScss(false), 2000);
    } else {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  const applyPreset = (b: string, e: string, m: string) => {
    setBlockName(b);
    setElements(e);
    setModifiers(m);
  };

  return (
    <SamplePageLayout
      title="BEM 가이드 & SCSS 제너레이터"
      icon="ri-text-wrap"
      description="SCSS의 & (Ampersand)와 BEM 방법론을 결합하여, 독립적이고 충돌 없는 컴포넌트를 설계하는 방법을 배웁니다."
      learningPoints={[
        'Block(독립적인 컴포넌트), Element(블록의 부속품), Modifier(상태나 외형 변화)의 개념',
        'SCSS에서 &__ (Element) 와 &-- (Modifier) 를 이용한 안전한 중첩(Nesting)',
        '클래스명 충돌을 원천 차단하는 네이밍 컨벤션 적용'
      ]}
      whyImportant="클래스 이름만 보고도 HTML 구조와 컴포넌트 관계를 파악할 수 있으며, 전역 스코프인 CSS 환경에서 사이드 이펙트(Side-Effect)를 가장 안전하게 막아주는 실무 표준 컨벤션입니다."
    >
      <SectionGrid>
        <h2 style={{ fontSize: '1.4rem' }}>1. BEM 핵심 개념</h2>
        <GuidePanel>
          <div className="bem-definition">
            <div className="def-card def-block">
              <h4><i className="ri-box-3-fill"></i> Block (블록)</h4>
              <p>재사용 가능한 독립적인 컴포넌트 단위입니다. 형태가 아닌 목적을 설명해야 합니다.</p>
              <code>.header</code> <code>.user-card</code> <code>.search-form</code>
            </div>
            <div className="def-card def-element">
              <h4><i className="ri-puzzle-fill"></i> Element (엘리먼트)</h4>
              <p>블록을 구성하는 부속품입니다. 블록 안에서만 의미를 가지며 <code>__</code> (밑줄 두 개)로 연결합니다.</p>
              <code>.user-card__avatar</code> <code>.search-form__input</code>
            </div>
            <div className="def-card def-modifier">
              <h4><i className="ri-paint-brush-fill"></i> Modifier (모디파이어)</h4>
              <p>블록이나 엘리먼트의 외형, 상태 변화를 나타냅니다. <code>--</code> (하이픈 두 개)로 연결합니다.</p>
              <code>.user-card--active</code> <code>.btn--primary</code>
            </div>
          </div>
        </GuidePanel>

        <h2 style={{ fontSize: '1.4rem', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
          2. 실무 BEM + SCSS 보일러플레이트 생성기
        </h2>
        <p style={{ color: '#64748B', marginBottom: '8px' }}>자동 완성 템플릿을 선택하거나, 직접 컴포넌트의 구성 요소를 입력하여 SCSS 뼈대와 시맨틱 HTML 마크업을 생성해보세요.</p>
        
        <GeneratorSection>
          <InputPanel>
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
                <i className="ri-magic-line"></i> 추천 자동 완성 템플릿 (클릭 시 자동 입력)
              </label>
              <PresetRow>
                <PresetButton onClick={() => applyPreset('product-card', 'image, title, price, desc, button', 'featured, sold-out')}>
                  <i className="ri-layout-masonry-line"></i> 카드 (Card)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('navbar', 'logo, menu, item, link, action', 'fixed, dark')}>
                  <i className="ri-layout-top-line"></i> 네비게이션 (Navbar)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('login-form', 'group, label, input, submit, error-msg', 'loading, error')}>
                  <i className="ri-keyboard-line"></i> 폼 (Form)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('dialog', 'overlay, content, header, title, body, footer, close-btn', 'open, full-screen')}>
                  <i className="ri-window-line"></i> 모달 (Modal)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('data-list', 'item, avatar, info, title, desc, action', 'striped, hoverable, compact')}>
                  <i className="ri-list-check-2"></i> 리스트 (List)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('accordion', 'item, header, title, icon, body, content', 'flush, bordered')}>
                  <i className="ri-question-answer-line"></i> 아코디언 (Accordion)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('tab-menu', 'list, item, link, content, pane', 'vertical, pills, centered')}>
                  <i className="ri-folder-add-line"></i> 탭 (Tabs)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('pagination', 'list, item, link, icon', 'rounded, lg, sm')}>
                  <i className="ri-pages-line"></i> 페이지네이션 (Pagination)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('btn', 'icon, text, spinner', 'primary, outline, ghost, lg, sm, block')}>
                  <i className="ri-mouse-line"></i> 버튼 (Button)
                </PresetButton>
                <PresetButton onClick={() => applyPreset('status-badge', 'icon, text, close', 'success, warning, error, rounded, soft')}>
                  <i className="ri-price-tag-3-line"></i> 뱃지 (Badge)
                </PresetButton>
              </PresetRow>
            </div>

            <InputGroup>
              <label><i className="ri-box-3-line"></i> Block Name (블록 이름)</label>
              <input 
                type="text" 
                value={blockName} 
                onChange={(e) => setBlockName(e.target.value)} 
                placeholder="예: product-card"
              />
              {blockError ? <ErrorMessage><i className="ri-error-warning-line"></i> {blockError}</ErrorMessage> : <span className="help-text">독립적인 컴포넌트의 최상위 이름입니다.</span>}
            </InputGroup>

            <InputGroup>
              <label><i className="ri-puzzle-line"></i> Elements (엘리먼트 요소들)</label>
              <input 
                type="text" 
                value={elements} 
                onChange={(e) => setElements(e.target.value)} 
                placeholder="예: image, title, price, button"
              />
              <span className="help-text">콤마(,)로 구분하여 입력하세요. 이름에 따라 적절한 HTML 태그가 유추됩니다.</span>
            </InputGroup>

            <InputGroup>
              <label><i className="ri-paint-brush-line"></i> Modifiers (모디파이어 상태들)</label>
              <input 
                type="text" 
                value={modifiers} 
                onChange={(e) => setModifiers(e.target.value)} 
                placeholder="예: featured, sold-out, active"
              />
              <span className="help-text">콤마(,)로 구분하여 입력하세요. (상태나 색상 등)</span>
            </InputGroup>
          </InputPanel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <OutputPanel>
              <OutputHeader>
                <h4><i className="ri-braces-line"></i> 생성된 SCSS 코드</h4>
                <CopyButton onClick={() => handleCopy(generatedScss, 'scss')}>
                  <i className={copiedScss ? "ri-check-line" : "ri-file-copy-line"}></i>
                  {copiedScss ? '복사됨!' : 'SCSS 복사'}
                </CopyButton>
              </OutputHeader>
              <CodeOutput>
                {generatedScss}
              </CodeOutput>
            </OutputPanel>

            <OutputPanel>
              <OutputHeader>
                <h4><i className="ri-html5-line"></i> 생성된 HTML 템플릿</h4>
                <CopyButton onClick={() => handleCopy(generatedHtml, 'html')}>
                  <i className={copiedHtml ? "ri-check-line" : "ri-file-copy-line"}></i>
                  {copiedHtml ? '복사됨!' : 'HTML 복사'}
                </CopyButton>
              </OutputHeader>
              <CodeOutput>
                {generatedHtml}
              </CodeOutput>
            </OutputPanel>
          </div>
        </GeneratorSection>
      </SectionGrid>
    </SamplePageLayout>
  );
};