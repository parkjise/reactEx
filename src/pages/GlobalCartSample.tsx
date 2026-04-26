import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useCartStore } from '../store/cartStore';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ProductCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  
  h4 {
    margin: 0 0 8px 0;
  }
  
  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

const CartContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 24px;
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const PRODUCTS = [
  { id: 101, name: '프리미엄 기계식 키보드', price: 145000 },
  { id: 102, name: '에르고노믹 마우스', price: 89000 },
  { id: 103, name: '27인치 4K 모니터', price: 450000 },
];

export const GlobalCartSample: React.FC = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();

  return (
    <SamplePageLayout
      title="글로벌 장바구니 (Zustand 전역 상태)"
      icon="ri-shopping-cart-2-line"
      description="Zustand를 활용해 여러 컴포넌트 간에 장바구니 데이터를 동기화하는 패턴입니다."
      learningPoints={[
        'Zustand를 이용한 보일러플레이트 없는 빠르고 직관적인 전역 상태 설계',
        '스토어 내에 데이터 변경 로직(Action)을 캡슐화하여 UI 컴포넌트를 가볍게 유지',
        'get()을 활용하여 스토어 내부에서 상태 기반 계산값(Derived State) 추출하기',
      ]}
      whyImportant="이 페이지에서 상품을 담고 다른 페이지(예: 대시보드)로 이동했다 돌아와도 장바구니 데이터는 유지됩니다. 상태를 컴포넌트 종속에서 벗어나 글로벌하게 관리하는 앱 아키텍처의 핵심입니다."
    >
      <h3 style={{ marginBottom: '16px' }}>상품 목록</h3>
      <ProductGrid>
        {PRODUCTS.map(product => (
          <ProductCard key={product.id}>
            <h4>{product.name}</h4>
            <div className="price">₩{product.price.toLocaleString()}</div>
            <Button variant="outline" size="small" onClick={() => addItem(product)} fullWidth>
              장바구니 담기
            </Button>
          </ProductCard>
        ))}
      </ProductGrid>

      <Card title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="ri-shopping-basket-line" />
          내 장바구니 ({totalItems()}개)
        </div>
      }>
        <CartContainer>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px 0' }}>
              장바구니가 비어 있습니다.
            </div>
          ) : (
            <>
              {items.map(item => (
                <CartItemRow key={item.id}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      단가: ₩{item.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="controls">
                    <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                    <span style={{ width: '20px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
                    <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    <Button variant="ghost" size="small" style={{ color: '#EE5D50' }} onClick={() => removeItem(item.id)}>
                      <i className="ri-delete-bin-line" />
                    </Button>
                  </div>
                </CartItemRow>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
                <Button variant="secondary" onClick={clearCart}>전체 비우기</Button>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  총 결제 금액: <span style={{ color: '#316AFF' }}>₩{totalPrice().toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </CartContainer>
      </Card>
    </SamplePageLayout>
  );
};
