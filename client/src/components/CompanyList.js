import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Fetch items by company selected

const CompanyList = () => {
  const [comps, setComps] = useState(null);

  useEffect(() => {
    fetch(`/company/all`)
      .then((data) => data.json())
      .then((info) => {
        if (info.status === 200) {
          console.log(info);
          setComps(info.companies);
        } else {
          console.log(info.error); // may direct to error page
        }
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
