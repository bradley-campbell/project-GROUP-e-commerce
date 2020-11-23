import React from "react";
import styled from "styled-components";
import Input from "./Input";

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

const Form = ({ handleChange, disabled, handleSubmit }) => {
  return (
    <FormContent>
      <h2>Bill to:</h2>
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
        type="email"
        placeholder="Email"
        handleChange={handleChange}
      />
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
        <DropDown>
          <label HTMLfor="province">Province: </label>
          <select name="province" onChange={handleChange}>
            <option></option>

            {provinces.map((province) => {
              return <option value={province}> {province}</option>;
            })}
          </select>
        </DropDown>
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
          value={"Canada"}
          handleChange={handleChange}
        />
      </FormGroup>
      <button onClick={handleSubmit} type="submit" disabled={disabled}>
        Submit
      </button>
    </FormContent>
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
