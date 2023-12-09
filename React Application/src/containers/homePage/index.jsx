//containers are the different pages of the website
import React from "react";
import styled from "styled-components";
import { DriverAd } from "../../components/driverAd";
import { Footer } from "../../components/footer";
import { Marginer } from "../../components/marginer";
import { Navbar } from "../../components/navbar";
import { InnerPageContainer, PageContainer } from "../../components/pageContainer";
import { deviceSize } from "../../components/responsive";
import { Services } from "./services";
import { TopSection } from "./topSection";


const ContentContainer = styled.div`
    width: 100%;
    max-width: ${deviceSize.laptop}px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1em;
`;

export function HomePage(props){
    return <PageContainer>
        <TopSection>
            <Navbar useTransparent/>
        </TopSection>
    </PageContainer>
}