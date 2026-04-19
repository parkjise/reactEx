import React, { useState } from 'react';
import styled from 'styled-components';

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  max-width: 500px;
  margin-top: 20px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;

  button {
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    &:hover { background-color: ${({ theme }) => theme.colors.border}; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }

  span {
    padding: 0 15px;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
  }
`;

export const CartQuantity: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 15000;

  const handleDecrease = () => {
    // 이전 상태(prev)를 기반으로 안전하게 업데이트
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
  };

  return (
    <div>
      <h2>장바구니 수량 증감</h2>
      <p>상품 수량을 늘리거나 줄일 때 발생하는 상태 변경 및 파생 요금 계산 방법입니다.</p>

      <ProductCard>
        <div>
          <h3>프리미엄 원두 커피 500g</h3>
          <p>{pricePerItem.toLocaleString()} 원</p>
        </div>
        <QuantityControls>
          <button onClick={handleDecrease} disabled={quantity === 1}>
            <i className="ri-subtract-line" />
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} disabled={quantity === 99}>
            <i className="ri-add-line" />
          </button>
        </QuantityControls>
      </ProductCard>

      <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        <strong>총 합계:</strong> {(pricePerItem * quantity).toLocaleString()} 원
      </div>
    </div>
  );
};

/*
[설명]
상태값을 기반으로 UI 요소에 제약을 주고, 파생된 산술 연산을 수행하는 패턴입니다.

실무 패턴:
- setter 안에서 콜백 함수 `setQuantity(prev => ...)`를 사용했습니다. 컴포넌트가 급격히 재렌더링되더라도 "이전 값"을 확실히 보장받아 버그를 줄이는 실무 필수 패턴입니다.
- 총 가격을 별도의 state로 두지 않았습니다. (`quantity` * 단가)를 렌더링 시점에 단순히 계산하는 것이 "단일 진실의 근원(Single Source of Truth)" 법칙에 부합합니다.
*/
