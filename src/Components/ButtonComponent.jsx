import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
function ButtonComponent({ el, watchData, addToWatchList }) {
  const [present, setPresent] = useState(false);

  return (
    <Container>
      {present ? (
        <AddButton>-</AddButton>
      ) : (
        <DeleteButton onClick={() => addToWatchList(el)}>+</DeleteButton>
      )}
    </Container>
  );
}

export default ButtonComponent;
const Container = styled.div``;
const AddButton = styled.div`
  font-size: 15px;
  padding: 5px;
  background-color: blue;
  color: white;
`;
const DeleteButton = styled.div`
  font-size: 15px;
  padding: 5px;
  background-color: blue;
  color: white;
`;
