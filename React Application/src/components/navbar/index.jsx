import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../button";
import { BrandLogo } from "../logo";
import { Marginer } from "../marginer";

const NavbarContainer = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5em;
    background-color: ${({ useTransparent }) => useTransparent ? "transparent" : "rgba(255, 127, 127, 0.9)"}
`;

const AccessibilityContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const AnchorLink = styled(Link)`
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    transition: all 200ms ease-in-out;

    &:hover{
        filter: contrast(0.6);
    }
`;

const Seperator = styled.div`
    min-height: 40%;
    width: 1px;
    background-color: #fff;
`;

export function Navbar(props){
    const { useTransparent, hide, loggedIn } = props;

    

    return <NavbarContainer useTransparent={useTransparent}>
        <BrandLogo/>
        <AccessibilityContainer>
            {!hide && <AnchorLink to="/driver">Driver Portal</AnchorLink>}
            {loggedIn && <AnchorLink>Welcome Back!</AnchorLink>}
            <Marginer direction="horizontal" margin={8}/>
            {!hide && <Seperator/>}
            <Marginer direction="horizontal" margin={8}/>
            <Link to="/access/signup">
                {!hide && <Button size={13}>Register</Button>}
            </Link>
            <Marginer direction="horizontal" margin={6}/>
            {!hide && <AnchorLink to="/access/signin" size={12}>Login</AnchorLink>}
        </AccessibilityContainer>
    </NavbarContainer>
}