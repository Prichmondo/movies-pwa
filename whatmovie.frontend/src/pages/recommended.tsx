import React, {  } from "react"
import PrivateRoute from "../components/privateRoute";
import { Container } from "../components/container";

const Recommended = () => { 

  return (
    <PrivateRoute>
      <Container fluid>
          <h2>Recommended Movies</h2>
          <p>Under construction</p>
      </Container>      
    </PrivateRoute>
  );
}

export default Recommended
