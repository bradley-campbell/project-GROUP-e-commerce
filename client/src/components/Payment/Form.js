import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const provinces = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NT",
  "NS",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

const Form = ({ handleChange, disabled }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <IWrapper>
      <FormContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Bill to:</h2>
          <FormGroup>
            <Input
              ref={register}
              name="givenName"
              type="text"
              placeholder="First name"
            />
            <Input
              ref={register}
              name="surname"
              type="text"
              placeholder="Last name"
              handleChange={handleChange}
            />
          </FormGroup>
          <Input
            ref={register}
            name="email"
            type="email"
            placeholder="Email"
            handleChange={handleChange}
          />
          <Input
            ref={register}
            name="address"
            type="address"
            placeholder="Address"
            handleChange={handleChange}
          />
          <FormGroup>
            <Input
              ref={register}
              name="city"
              type="text"
              placeholder="City"
              handleChange={handleChange}
            />
            <DropDown>
              <label for="province">Province:</label>
              <select name="province" onChange={handleChange} ref={register}>
                <option>Province</option>

                {provinces.map((province) => {
                  return <option value={province}> {province}</option>;
                })}
              </select>
            </DropDown>
          </FormGroup>
          <FormGroup>
            <Input
              ref={register}
              name="postcode"
              type="text"
              placeholder="Postal Code"
              handleChange={handleChange}
            />
            <Input
              ref={register}
              name="country"
              type="text"
              placeholder="Country"
              value={"Canada"}
              handleChange={handleChange}
            />
            <Input type="submit" />
          </FormGroup>
        </form>
      </FormContent>
    </IWrapper>
  );
};

export default Form;

const FormContent = styled.div`
  margin: 25px;

  h2 {
    padding-bottom: 10px;
  }
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

    .placeholder {
      color: #464a5c;
    }
  }
`;

const IWrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;
  label {
    display: none;
  }
`;

const Input = styled.input`
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
