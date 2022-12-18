import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInventory } from "../redux/reducers/actions/actions";
import AllRoutes from "./Routes";
import { Container } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  return (
    <Container>
      <div className="App">
        <AllRoutes />
      </div>
    </Container>
  );
}

export default App;
