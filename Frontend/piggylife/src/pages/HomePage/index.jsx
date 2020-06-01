import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import CardLayout from "../../components/CardL";
import { inject, observer } from "mobx-react";

@inject("storeStore", "userStore")
@observer
class HomePage extends React.Component {
  componentWillMount() {
    this.props.storeStore.get_mypost();
    this.props.userStore.whoami(window.sessionStorage.getItem("email"));
  }

  render() {
    return (
      <Frame>
        <List>
          <Mukitlist>
            <Title>먹킷리스트</Title>
            <Div>
              <CardLayout keyword="mypost"></CardLayout>
            </Div>
          </Mukitlist>

          <Top10>
            <Title>이 달의 MukSpot-TOP10</Title>
            <Div>
              <CardLayout keyword="top10"></CardLayout>
            </Div>
          </Top10>

          <Place>
            <Title>OOO지역에서 가볼만한 곳</Title>
            <Div>
              <CardLayout keyword="hotplace"></CardLayout>
            </Div>
          </Place>

          <User>
            <Title>OOO님과 비슷한 먹유저들의 MukSpot</Title>
            <Div>
              <CardLayout keyword="similar"></CardLayout>
            </Div>
          </User>
        </List>
        <Navbar></Navbar>
      </Frame>
    );
  }
}

const Title = styled.div`
  margin-left: 1rem;
`;

const Div = styled.div`
  background-color: #f2e9e4;
  width: 100%;
  height: 100px;
`;

const Mukitlist = styled.div`
  /* background-color: #5897a6; */
`;

const Top10 = styled.div`
  /* background-color: #f28379; */
`;

const Place = styled.div`
  /* background-color: #5897a6; */
`;

const User = styled.div`
  /* background-color: #f28379; */
`;

const Frame = styled.div`
  height: 100vh;
`;
const List = styled.div`
  display: grid;
  height: 92vh;
  grid-template-areas: "Mukitlist" "Top10" "Place" "User";

  margin-top: 1rem;
`;

export default HomePage;
