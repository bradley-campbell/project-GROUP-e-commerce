import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../ConstantStyles";
import { Link } from "react-router-dom";

// Fetch items by company selected

export const CompanyList = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    fetch(`/company/all`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCompanies(res.companies);
      });
  }, []);

  return (
    companies && (
      <Wrapper>
        {console.log(companies)}
        <Head>Shop by Company</Head>
        <CompanyWrapper>
          {Object.values(companies)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((company) => {
              return <Cbox to={`/company/${company.id}`}>{company.name}</Cbox>;
            })}
        </CompanyWrapper>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

const CompanyWrapper = styled.div`
  display: flex;
  margin: 20px 50px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Head = styled.div`
  font-size: 20px;
  margin: 30px;
`;

const Cbox = styled(Link)`
  font-size: 20px;
  background: rgb(0, 0, 0, 0.01);
  margin: 3px;
  padding: 10px 20px;
  font-weight: bold;
  color: ${COLORS.primary};
  width: 300px;
  border-radius: ${COLORS.borderRadius};
  transition: 0.5s ease;
  &:hover {
    background: transparent;
    box-shadow: -1px -1px 18px 0px rgba(50, 50, 50, 0.21);
  }
`;

export default CompanyList;
