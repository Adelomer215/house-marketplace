import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExplorIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutLineIcon } from "../assets/svg/personOutlineIcon.svg";
import styled from "styled-components";

const NavBar = () => {
  const Navigate = useNavigate(); // change the url without reload the page
  const Location = useLocation();

  const activeColor = (route) => {
    if (route === Location.pathname) {
      return true;
    }
  };
  return (
    <Footer>
      <nav>
        <Ul>
          <li
            className={`${activeColor("/") && "active"}`}
            onClick={() => Navigate("/")}
          >
            <ExplorIcon fill={activeColor("/") ? "green" : "#8f8f8f"} />
            <p>explore</p>
          </li>
          <li
            className={`${activeColor("/offers") && "active"}`}
            onClick={() => Navigate("/offers")}
          >
            <OfferIcon fill={activeColor("/offers") ? "green" : "#8f8f8f"} />
            <p>offer</p>
          </li>
          <li
            className={`${activeColor("/profile") && "active"}`}
            onClick={() => Navigate("/profile")}
          >
            <PersonOutLineIcon
              fill={activeColor("/profile") ? "green" : "#8f8f8f"}
            />
            <p>profile</p>
          </li>
        </Ul>
      </nav>
    </Footer>
  );
};

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  min-height: 4rem;
  z-index: 111111;

  gap: 2rem;
  svg {
    display: block;
    width: 2rem;
    height: 2rem;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  li {
    cursor: pointer;
    padding-top: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.4rem;
    min-width: 85px;
    &.active {
      font-size: 0.6rem;
    }
    p {
      text-transform: uppercase;
    }
  }
`;

export default NavBar;
