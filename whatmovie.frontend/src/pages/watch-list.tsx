import React, {  } from "react"
import PrivateRoute from "../components/privateRoute";
import { Container } from "../components/container";

const WatchList = () => { 

  return (
    <PrivateRoute>
      <Container fluid>
          <h2>Watch List</h2>
          <p>Under construction</p>
      </Container>      
    </PrivateRoute>
  );
}

export default WatchList
