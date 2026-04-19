import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const AccordionTitle = styled.button`
  width: 100%;
  text-align: left;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  padding: ${({ $isOpen }) => ($isOpen ? '15px 20px' : '0 20px')};
  max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: all 0.3s ease-in-out;
`;

const faqs = [
  { id: 1, q: '배송은 얼마나 걸리나요?', a: '평일 기준 2~3일 소요됩니다.' },
  { id: 2, q: '교환/반품은 어떻게 하나요?', a: '마이페이지의 주문 상세 내역에서 신청 가능합니다.' },
  { id: 3, q: '회원가입시 혜택이 있나요?', a: '신규 가입 즉시 사용 가능한 5천원 쿠폰이 발급됩니다.' },
];

export const AccordionFaq: React.FC = () => {
  // 여러 개가 열리게 할지, 하나만 열리게 할지에 따라 state 설계가 달라집니다.
  // 여기서는 하나만 열리는 패턴(ID 저장)을 적용합니다.
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    // 이미 열려있는 상태라면 null로 만들어 닫고, 아니면 해당 아이디 부여
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (
    <div>
      <h2>아코디언 (FAQ)</h2>
      <p>클릭 시 부드럽게 내용이 펼쳐지는 Accordion UI 입니다.</p>
      
      <AccordionContainer>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id}>
            <AccordionTitle onClick={() => handleToggle(faq.id)}>
              <span>Q. {faq.q}</span>
              <i className={activeId === faq.id ? 'ri-subtract-line' : 'ri-add-line'} />
            </AccordionTitle>
            <AccordionContent $isOpen={activeId === faq.id}>
              A. {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionContainer>
    </div>
  );
};

/*
[설명]
자주 묻는 질문(FAQ) UI에서 주로 쓰이는 아코디언 컴포넌트입니다.

실무 패턴:
- 탭 메뉴와 마찬가지로 `activeId` 상태 한 가지만 사용합니다.
- CSS의 `max-height`와 `transition`을 활용하여 내용이 스스륵 열리고 닫히는 애니메이션을 구현합니다 (`max-height: 0` -> `max-height: 300px`).
- 만약 **동시에 여러 개가 펼쳐져도 되는 사양**이라면 `set()[]` 배열 형태로 수정하여 포함여부를 체크하게끔 설계합니다.
*/
