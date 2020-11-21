import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../ConstantStyles";
import { Link } from "react-router-dom";

// Fetch items by company selected

const CompanyList = () => {
  const [comps, setCompanies] = useState(null);

  useEffect(() => {
    fetch(`/company/all`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCompanies(res.companies);
        main;
      });
  }, []);

  return (
    comps && (
      <CWrapper>
        <h1>COMPANY LIST</h1>
        <CompanyGrid companies={comps} />
      </CWrapper>
    )
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CompanyBox = styled(Link)`
  padding: 10px;
  border: none;
  width: 200px;
  height: 60px;
  color: ${COLORS.primary};
  text-align: center;
  background: ${COLORS.secondary};
  border-radius: ${COLORS.borderRadius};
  margin: 20px;
`;

const Name = styled.h2`
  font-size: 20px;
`;

export default CompanyList;
const CWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ================ Company Wrappers ================
const CompanyGrid = ({ companies }) => {
  return (
    <CGWrapper>
      {companies.map((ele) => (
        <CompanyItem key={`${ele.id}`} company={ele} />
      ))}
    </CGWrapper>
  );
};

const CGWrapper = styled.div`
  width: 100vw;
  display: flex;
  height: auto;
`;

// ================ Company items ================
const CompanyItem = ({ company }) => {
  const { name, id, url, country } = company;

  return <CIWrapper>{name}</CIWrapper>;
};

const CIWrapper = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid red;
`;
