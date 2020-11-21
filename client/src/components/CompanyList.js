import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../ConstantStyles";
import { Link } from "react-router-dom";

// Fetch items by company selected

const CompanyList = () => {
  const [companies, setCompanies] = useState("");

  useEffect(() => {
    fetch(`/company/all`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCompanies(res.companies);
      });
  }, []);
  console.log(companies);

  return companies ? (
    <Wrapper>
      {companies.map((company) => {
        return (
          <CompanyBox exact to="/company/companyid">
            <Name>{company.name}</Name>
          </CompanyBox>
        );
      })}
    </Wrapper>
  ) : (
    <div>loading</div>
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
