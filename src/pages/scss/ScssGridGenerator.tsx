import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { Card } from '../../components/common/Card';

// -- Styled Components for Samples --
const SampleGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin-bottom: 40px;
  min-width: 0; /* 중요 */
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

// 1. Holy Grail Layout
const HolyGrailGrid = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 80px 1fr 80px;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  height: 200px;

  > div {
    background-color: ${({ theme }) => theme.colors.primary}20;
    border: 1px dashed ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  .header { grid-area: header; height: 40px; }
  .nav { grid-area: nav; }
  .main { grid-area: main; }
  .aside { grid-area: aside; }
  .footer { grid-area: footer; height: 40px; }

  @media (max-width: 768px) {
    grid-template-areas:
      "header"
      "nav"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto auto;
    height: auto;
    min-height: 300px;
  }
`;

// 2. Auto-Fit Card Grid
const AutoFitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;

  > div {
    background-color: ${({ theme }) => theme.colors.success}20;
    border: 1px dashed ${({ theme }) => theme.colors.success};
    border-radius: 4px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.success};
  }
`;

// -- Styled Components for Generator --
const GeneratorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0; /* 중요: 자식(CodeOutput 등)이 넘쳐도 부모를 뚫지 않게 함 */
  overflow: hidden;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  min-width: 0; /* 중요 */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
    
    i {
      color: ${({ theme }) => theme.colors.primary};
    }
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

const GeneratorPreview = styled.div<{ $cols: string; $rows: string; $gap: string; $justifyItems: string; $alignItems: string }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols || '1fr'};
  grid-template-rows: ${({ $rows }) => $rows || '1fr'};
  gap: ${({ $gap }) => $gap || '0px'};
  justify-items: ${({ $justifyItems }) => $justifyItems};
  align-items: ${({ $alignItems }) => $alignItems};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
  resize: vertical;
  overflow: auto;
`;

const GridItem = styled.div<{ $colSpan: number; $rowSpan: number; $isSelected: boolean }>`
  background-color: ${({ theme, $isSelected }) => $isSelected ? theme.colors.primaryHover : theme.colors.primary};
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  min-height: 40px;
  grid-column: span ${({ $colSpan }) => $colSpan};
  grid-row: span ${({ $rowSpan }) => $rowSpan};
  cursor: pointer;
  border: ${({ $isSelected }) => $isSelected ? '2px dashed white' : 'none'};
  transition: all 0.2s ease;
  box-shadow: ${({ $isSelected }) => $isSelected ? '0 0 0 2px #316AFF' : 'none'};
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const SelectGroup = styled(InputGroup)`
  select {
    padding: 10px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ItemPanel = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary}10;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  .panel-title {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    min-width: 100px;
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

  .prop { color: #9cdcfe; }
  .val { color: #ce9178; }
  .comment { color: #6a9955; }
`;

export const ScssGridGenerator: React.FC = () => {
  // Generator State
  const [columns, setColumns] = useState('1fr 2fr 1fr');
  const [rows, setRows] = useState('100px 100px');
  const [gap, setGap] = useState('16px');
  const [itemCount, setItemCount] = useState(6);
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignItems, setAlignItems] = useState('stretch');
  
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [itemSpans, setItemSpans] = useState<Record<number, { col: number, row: number }>>({});

  const handleSpanChange = (type: 'col' | 'row', value: number) => {
    if (selectedItemId === null) return;
    setItemSpans(prev => ({
      ...prev,
      [selectedItemId]: {
        ...prev[selectedItemId] || { col: 1, row: 1 },
        [type]: Math.max(1, value)
      }
    }));
  };

  const hasCustomItems = Object.keys(itemSpans).length > 0;

  return (
    <SamplePageLayout
      title="SCSS Grid 레이아웃 & 제너레이터"
      icon="ri-layout-grid-fill"
      description="실무에서 자주 쓰이는 Grid 패턴을 확인하고, 직접 트랙 크기와 정렬을 입력하여 레이아웃을 생성해 봅니다."
      learningPoints={[
        'grid-template-columns / rows의 fr 단위 이해',
        'auto-fit과 minmax를 활용한 반응형 카드 그리드',
        '아이템 셀 병합 (grid-column/row span)',
        'justify-items, align-items 정렬 속성'
      ]}
      whyImportant="복잡한 2차원 레이아웃을 만들 때 Flexbox보다 Grid가 훨씬 직관적이고 코드가 간결해집니다. 반응형 설계에도 매우 강력합니다."
    >
      <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>1. 실무 Grid 패턴 샘플</h2>
      <SampleGrid>
        <Card title="Holy Grail Layout">
          <PreviewWrapper>
            <HolyGrailGrid>
              <div className="header">Header</div>
              <div className="nav">Nav</div>
              <div className="main">Main Content</div>
              <div className="aside">Aside</div>
              <div className="footer">Footer</div>
            </HolyGrailGrid>
          </PreviewWrapper>
          <CodeOutput style={{ padding: '12px', fontSize: '0.8rem' }}>
{`display: grid;
grid-template-areas:
  "header header header"
  "nav main aside"
  "footer footer footer";
grid-template-columns: 80px 1fr 80px;
grid-template-rows: auto 1fr auto;`}
          </CodeOutput>
        </Card>

        <Card title="반응형 카드 (auto-fit)">
          <PreviewWrapper>
            <AutoFitGrid>
              <div>Card 1</div>
              <div>Card 2</div>
              <div>Card 3</div>
              <div>Card 4</div>
              <div>Card 5</div>
            </AutoFitGrid>
          </PreviewWrapper>
          <CodeOutput style={{ padding: '12px', fontSize: '0.8rem' }}>
{`display: grid;
/* 공간이 남으면 카드를 채우고, 
   모자라면 다음 줄로 넘김 */
grid-template-columns: 
  repeat(auto-fit, minmax(80px, 1fr));
gap: 8px;`}
          </CodeOutput>
        </Card>
      </SampleGrid>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
        2. 인터랙티브 Grid 제너레이터
      </h2>
      <Card>
        <GeneratorSection>
          <Controls>
            <InputGroup>
              <label><i className="ri-layout-column-line"></i> 열 (Columns) 너비</label>
              <input 
                type="text" 
                value={columns} 
                onChange={(e) => setColumns(e.target.value)} 
                placeholder="예: 1fr 2fr 1fr 또는 repeat(3, 1fr)"
              />
              <span className="help-text">단위: fr, px, %, auto. 띄어쓰기로 구분</span>
            </InputGroup>
            
            <InputGroup>
              <label><i className="ri-layout-row-line"></i> 행 (Rows) 높이</label>
              <input 
                type="text" 
                value={rows} 
                onChange={(e) => setRows(e.target.value)} 
                placeholder="예: 100px auto 100px"
              />
              <span className="help-text">생략 시 내용물만큼(auto) 높이가 잡힙니다.</span>
            </InputGroup>

            <InputGroup>
              <label><i className="ri-space"></i> 간격 (Gap)</label>
              <input 
                type="text" 
                value={gap} 
                onChange={(e) => setGap(e.target.value)} 
                placeholder="예: 16px 20px"
              />
            </InputGroup>

            <InputGroup>
              <label><i className="ri-apps-2-line"></i> 아이템 개수</label>
              <input 
                type="number" 
                value={itemCount} 
                onChange={(e) => {
                  setItemCount(Math.max(1, parseInt(e.target.value) || 1));
                  if (selectedItemId !== null && selectedItemId >= parseInt(e.target.value)) setSelectedItemId(null);
                }} 
                min="1"
                max="20"
              />
            </InputGroup>

            <SelectGroup>
              <label><i className="ri-align-justify"></i> 가로 정렬 (justify-items)</label>
              <select value={justifyItems} onChange={(e) => setJustifyItems(e.target.value)}>
                <option value="stretch">stretch (기본, 채우기)</option>
                <option value="start">start (시작점)</option>
                <option value="center">center (중앙)</option>
                <option value="end">end (끝점)</option>
              </select>
            </SelectGroup>

            <SelectGroup>
              <label><i className="ri-align-vertically"></i> 세로 정렬 (align-items)</label>
              <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)}>
                <option value="stretch">stretch (기본, 채우기)</option>
                <option value="start">start (시작점)</option>
                <option value="center">center (중앙)</option>
                <option value="end">end (끝점)</option>
              </select>
            </SelectGroup>
          </Controls>

          {selectedItemId !== null && (
            <ItemPanel>
              <div className="panel-title">
                <i className="ri-drag-move-line"></i> 선택된 아이템 {selectedItemId + 1}
              </div>
              <InputGroup style={{ flexDirection: 'row', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem' }}>가로 셀 병합 (col span):</label>
                <input 
                  type="number" 
                  value={itemSpans[selectedItemId]?.col || 1} 
                  onChange={(e) => handleSpanChange('col', parseInt(e.target.value))} 
                  min="1"
                  style={{ width: '60px', padding: '6px' }}
                />
              </InputGroup>
              <InputGroup style={{ flexDirection: 'row', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem' }}>세로 셀 병합 (row span):</label>
                <input 
                  type="number" 
                  value={itemSpans[selectedItemId]?.row || 1} 
                  onChange={(e) => handleSpanChange('row', parseInt(e.target.value))} 
                  min="1"
                  style={{ width: '60px', padding: '6px' }}
                />
              </InputGroup>
              <button 
                onClick={() => setSelectedItemId(null)}
                style={{ marginLeft: 'auto', color: '#64748B', fontSize: '0.85rem' }}
              >
                선택 해제 <i className="ri-close-line"></i>
              </button>
            </ItemPanel>
          )}

          <div>
            <h4 style={{ marginBottom: '10px' }}>실시간 미리보기 <span style={{fontSize: '0.8rem', color: '#64748B', fontWeight: 'normal'}}>(아이템을 클릭하여 셀 병합)</span></h4>
            <GeneratorPreview 
              $cols={columns} 
              $rows={rows} 
              $gap={gap} 
              $justifyItems={justifyItems} 
              $alignItems={alignItems}
            >
              {Array.from({ length: itemCount }).map((_, i) => (
                <GridItem 
                  key={i} 
                  onClick={() => setSelectedItemId(i)}
                  $isSelected={selectedItemId === i}
                  $colSpan={itemSpans[i]?.col || 1}
                  $rowSpan={itemSpans[i]?.row || 1}
                >
                  {i + 1}
                </GridItem>
              ))}
            </GeneratorPreview>
          </div>

          <div>
            <h4 style={{ marginBottom: '10px' }}>생성된 CSS 코드</h4>
            <CodeOutput>
              <span className="prop">.grid-container</span> {'{\n'}
              {'  '}display: <span className="val">grid</span>;\n
              {'  '}grid-template-columns: <span className="val">{columns}</span>;\n
              {'  '}grid-template-rows: <span className="val">{rows}</span>;\n
              {'  '}gap: <span className="val">{gap}</span>;\n
              {justifyItems !== 'stretch' && <>{'  '}justify-items: <span className="val">{justifyItems}</span>;\n</>}
              {alignItems !== 'stretch' && <>{'  '}align-items: <span className="val">{alignItems}</span>;\n</>}
              {'}\n'}
              {hasCustomItems && '\n'}
              {Object.entries(itemSpans).map(([idx, span]) => {
                if (span.col === 1 && span.row === 1) return null;
                return (
                  <React.Fragment key={idx}>
                    <span className="prop">.grid-item-{parseInt(idx) + 1}</span> {'{\n'}
                    {span.col > 1 && <>{'  '}grid-column: <span className="val">span {span.col}</span>;\n</>}
                    {span.row > 1 && <>{'  '}grid-row: <span className="val">span {span.row}</span>;\n</>}
                    {'}\n'}
                  </React.Fragment>
                );
              })}
            </CodeOutput>
          </div>
        </GeneratorSection>
      </Card>
    </SamplePageLayout>
  );
};
