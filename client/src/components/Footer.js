import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../ConstantStyles";
import { NavLink, Link } from "react-router-dom";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { RiMapPin2Fill } from "react-icons/ri";

export const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <Contact>
        <Logo>Shop Fetch</Logo>
        <Address>
          <ContactIcon>
            <RiMapPin2Fill size={17} />
          </ContactIcon>
          123 fake st.
        </Address>
        <Indent>Montreal, Quebec</Indent>
        <p>
          <ContactIcon>
            <AiFillPhone size={17} />
          </ContactIcon>
          (555) 555 - 5555
        </p>
        <p>
          <ContactIcon>
            <AiTwotoneMail size={17} />
          </ContactIcon>
          shopfetch@nonsense.com
        </p>
      </Contact>
      <SiteNav>
        <FootLink exact to="/">
          Home
        </FootLink>
        <FootLink exact to="/all">
          Shop All by Category
        </FootLink>
        <FootLink exact to="/company">
          Shop by Brand
        </FootLink>
        <FootLink exact to="/cart">
          View Cart
        </FootLink>
      </SiteNav>
      <Extras>
        <FootLink exact to="">
          About Us
        </FootLink>
        <FootLink exact to="">
          Policies
        </FootLink>
        <FootLink exact to="">
          Contact
        </FootLink>
        <FootLink exact to="">
          FAQ
        </FootLink>
      </Extras>
      <Social>
        <SocialIcon>
          <AiFillTwitterCircle size={30} />
        </SocialIcon>
        <SocialIcon>
          <AiFillFacebook size={30} />
        </SocialIcon>
        <SocialIcon>
          <AiFillInstagram size={30} />
        </SocialIcon>
      </Social>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  line-height: 2em;
  background: ${COLORS.primary};
  font-size: 14px;
  height: 250px;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 3fr;
  grid-template-areas: "contact sitenav extras social";
`;
const Contact = styled.div`
  grid-area: contact;
  color: white;
  padding-top: 25px;
  padding-left: 50px;
`;

const Address = styled.div`
  line-height: 1em;
`;

const ContactIcon = styled.div`
  margin: 15px 10px 0px 0px;
  display: inline;
`;
const Logo = styled.h3`
  font-size: 20px;
  font-style: italic;
  margin-bottom: 20px;
`;

const SiteNav = styled.div`
  padding-top: 70px;
  grid-area: sitenav;
`;

const Indent = styled.p`
  margin-left: 25px;
`;

const Extras = styled.div`
  grid-area: extras;
  padding-top: 70px;
`;

const FootLink = styled(Link)`
  color: white;
  display: block;
  &:hover {
    color: ${COLORS.accent};
  }
`;

const Social = styled.div`
  grid-area: social;
  padding-top: 30px;
  color: white;
`;

const SocialIcon = styled.div`
  display: inline;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    color: ${COLORS.accent};
  }
`;

export default Footer;
