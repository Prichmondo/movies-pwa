import React, {  } from "react"
import PrivateRoute from "../components/privateRoute";
import { Container } from "../components/container";

const Recommended = () => { 

  return (
    <PrivateRoute>
      <Container fluid>
          <h3>Recommended Movies</h3>
          <p>coming soon...</p>
      </Container>      
    </PrivateRoute>
  );
}

export default Recommended
