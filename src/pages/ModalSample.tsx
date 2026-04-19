import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 20px;
`;

// [Dimmer 배경] 모달 뒷 배경을 어둡게 하고, 모달 바깥쪽 클릭을 감지할 수 있습니다.
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 30px;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    margin: 0;
  }
`;

export const ModalSample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 모달 내부 내용(예: 인풋창 입력 등) 클릭 시 모달이 닫히지 않도록 이벤트 전파 막기
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div>
      <h2>팝업 모달 만들기</h2>
      <p>가장 고전적이고 확실한 모달 컴포넌트 렌더링 방식입니다.</p>

      <Button onClick={openModal}>모달 열기</Button>

      {isModalOpen && (
        <Overlay onClick={closeModal}>
          <ModalContent onClick={stopPropagation}>
            <h3>알림</h3>
            <p>정말로 이 항목을 삭제하시겠습니까?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button style={{ backgroundColor: '#aaa' }} onClick={closeModal}>취소</Button>
              <Button style={{ backgroundColor: '#f44336' }} onClick={closeModal}>삭제</Button>
            </div>
          </ModalContent>
        </Overlay>
      )}
    </div>
  );
};

/*
[설명]
가장 단순한 Inline 상태에 기반한 모달창입니다.

실무 패턴:
- `isModalOpen` 이라는 boolean 상태로 조건부 렌더링 (`&&`)을 수행합니다.
- 뒷 배경 Overlay에는 `onClick={closeModal}`을 달아주어 바깥 영역 클릭시 모달이 꺼지게 합니다.
- **중요**: ModalContent에 `e.stopPropagation()`을 주지 않으면 모달 안의 흰색 공간을 클릭해도 오버레이로 클릭 이벤트가 타고 올라가 창이 닫혀버립니다(이벤트 버블링).
- (심화 적용) 실무의 복잡한 프로젝트에서는 이를 확장해 `React Portal`을 이용해 최상단 DOM에 주입시키거나 전역 State로 모달을 관리하기도 합니다.
*/
