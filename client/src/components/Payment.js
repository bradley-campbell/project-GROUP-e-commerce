import React from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Payment = ({ closeModal }) => {
  return (
    <Overlay>
      <button onClick={closeModal}>
        <AiOutlineCloseCircle />
      </button>
      <Content></Content>
    </Overlay>
  );
};

export default Payment;

const Overlay = styled.div`
  position: fixed;
  display: block;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
`;

const Content = styled.div`
  margin: 15% auto;
  background-color: white;
`;

const ExitButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border: 0;
  position: absolute;
  top: 0.3rem;
  right: 0.5 rem;
`;
