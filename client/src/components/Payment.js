import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "./Input";

const Payment = () => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({});

  const closeModal = (ev) => {
      setVisible(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange = (data, key) => {
    setFormData({ ...formData, [key]: data });
  };

  console.log(formData);

  return (
    <Wrapper visible={visible}>
      <Overlay onKeyDown={closeModal}>
        <Content>
          <ExitButton onClick={closeModal}>
            <AiOutlineCloseCircle size={35} />
          </ExitButton>

          <FormContent>
            <h1>Order Form</h1>
            <h2>Provide your information</h2>
            <FormGroup>
              <Input
                name="givenName"
                type="text"
                placeholder="First name"
                handleChange={handleChange}
              />
              <Input
                name="surname"
                type="text"
                placeholder="Last name"
                handleChange={handleChange}
              />
            </FormGroup>
            <Input
              name="email"
              type="text"
              placeholder="Email"
              handleChange={handleChange}
            />
            <h2>Shipping Address</h2>
            <Input
              name="address"
              type="address"
              placeholder="Address"
              handleChange={handleChange}
            />
            <FormGroup>
              <Input
                name="city"
                type="text"
                placeholder="City"
                handleChange={handleChange}
              />
              <Input
                name="province"
                type="text"
                placeholder="Province"
                handleChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="postcode"
                type="text"
                placeholder="Postal Code"
                handleChange={handleChange}
              />
              <Input
                name="country"
                type="text"
                placeholder="Country"
                handleChange={handleChange}
              />
            </FormGroup>
          </FormContent>

          <button onClick={handleSubmit} type="submit" disabled={disabled}>
            Submit
          </button>
        </Content>
      </Overlay>
    </Wrapper>
  );
};

export default Payment;

const Wrapper = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: white;
  width: 50%;
  height: 80%;
`;

const ExitButton = styled.button`
  border: 0;
  position: relative;
  cursor: pointer;
  padding: 5px;
`;

const FormContent = styled.div`
  margin: 0 16px 0;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > div {
    flex: 1 0 auto;
    width: 48%;
    &:first-child {
      margin-right: 6px;
    }
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  margin-top: -20px;
  > div {
    max-width: inherit;
    &:first-child {
      flex: 1;
      margin-right: 6px;
    }
  }
`;
