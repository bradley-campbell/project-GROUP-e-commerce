import React from "react";
import styled from "styled-components";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { RiAlertFill } from "react-icons/ri";
import FInput from "./Input";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleConfirmationView,
  togglePaymentView,
} from "../../actions/statusActions";

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

const Form = ({ setFormData, handleFetch }) => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const FormConnect = useFormContext();
  console.log(useFormContext());

  const onSubmit = (data) => {
    dispatch(togglePaymentView());
    dispatch(toggleConfirmationView());
    setFormData(data);
  };

  return (
    <IWrapper>
      <FormContent>
        <FormProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Bill to:</h2>
            <FormGroup>
              <InputDiv>
                <Input
                  ref={register({ required: true, minLength: 2 })}
                  name="givenName"
                  type="text"
                  placeholder="First name"
                />
                {errors.givenName && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
              <InputDiv>
                <Input
                  ref={register({ required: true, minLength: 2 })}
                  name="surname"
                  type="text"
                  placeholder="Last name"
                />
                {errors.surname && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
            </FormGroup>
            <FormGroup>
              <InputDiv>
                <Input
                  ref={register({ required: true, minLength: 2 })}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
            </FormGroup>
            <FormGroup>
              <InputDiv>
                <Input
                  ref={register({ required: true, minLength: 2 })}
                  name="address"
                  type="address"
                  placeholder="Address"
                />
                {errors.address && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
            </FormGroup>
            <FormGroup>
              <InputDiv>
                <Input
                  ref={register({ required: true, minLength: 2 })}
                  name="city"
                  type="text"
                  placeholder="City"
                />
                {errors.city && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
              <InputDiv>
                <DropDown>
                  <label for="province">Province:</label>
                  <select
                    name="province"
                    ref={register({ required: true, minLength: 2 })}
                  >
                    <option></option>

                    {provinces.map((province) => {
                      return <option value={province}>{province}</option>;
                    })}
                  </select>
                </DropDown>
                {errors.province && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
            </FormGroup>
            <FormGroup>
              <InputDiv>
                <Input
                  ref={register({ required: true, minLength: 6, maxLength: 7 })}
                  name="postcode"
                  type="text"
                  placeholder="Postal Code"
                />
                {errors.postcode && (
                  <FormError>
                    <RiAlertFill /> This is a required field
                  </FormError>
                )}
              </InputDiv>
              <Input
                ref={register({ required: true })}
                name="country"
                type="text"
                value={"Canada"}
              />
              <Input type="submit" />
            </FormGroup>
          </form>
        </FormProvider>
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
