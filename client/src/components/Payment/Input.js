import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { RiAlertFill } from "react-icons/ri";

const FInput = ({ name, type, placeholder, errors, ref }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Wrapper>
      <FormGroup>
        <InputDiv>
          <Input
            ref={register({ required: true, minLength: 2 })}
            name={name}
            type={type}
            placeholder={placeholder}
          />
          {errors[name] && (
            <FormError>
              <RiAlertFill /> This is a required field
            </FormError>
          )}
        </InputDiv>
      </FormGroup>
    </Wrapper>
  );
};

export default FInput;

const Wrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;
  label {
    display: none;
  }
  input {
    border-radius: 3px;
    border: 1px solid #e4e8eb;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 15px;
    font-weight: 300;
    height: 36px;
    padding: 8px 12px 10px 12px;
    width: 100%;
    &::placeholder {
      color: #999;
    }
  }
`;

const FormContent = styled.div`
  margin: 25px;

  h2 {
    padding-bottom: 10px;
  }
`;
const FormGroup = styled.div`
  position: relative;
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

const DropDown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #464a5c;

  select {
    border-radius: 3px;
    border: 1px solid #e4e8eb;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 15px;
    font-weight: 300;
    height: 36px;
    padding: 8px 12px 10px 12px;
    width: 75%;
  }

  label {
    margin-left: 5px;
  }
`;

const IWrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  margin: 5px;
  border-radius: 3px;
  border: 1px solid #e4e8eb;
  box-sizing: border-box;
  color: #464a5c;
  font-size: 15px;
  font-weight: 300;
  height: 36px;
  padding: 8px 12px 10px 12px;
  width: 100%;
  &::placeholder {
    color: #999;
  }
`;

const FormError = styled.p`
  color: red;
  margin: 5px 0px 5px 10px;
  font-size: 14px;
  font-style: italic;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
