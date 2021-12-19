import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./Stock.css";

function Stock() {
  const [stockData, setStockData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [checkColor, setCheckColor] = useState(0);
  const [splitText, setSplitText] = useState([]);
  useEffect(() => {
    fetData();
  }, []);

  const fetData = async () => {
    const allData = await axios.get("http://localhost:8000/stocks");
    console.log(allData.data);
    setStockData(allData.data);
  };
  const addToWatchList = async (el) => {
    await axios.post("http://localhost:8000/watch", el);
  };
  return (
    <Container>
      <Section>
        <Input
          type="text"
          placeholder="Search Stock"
          onChange={(e) => setInputText(e.target.value)}
        />
        <DisplayContent>
          {stockData
            .filter((el) => {
              if (inputText === "") {
                return el;
              } else if (
                el[0].toLowerCase().includes(inputText.toLocaleLowerCase())
              ) {
                return el;
              }
            })
            .map((element, ind) => (
              //  {setCheckColor((element[1] - element[2]) / element[2])}
              <Wrap key={element[0]} className="main_div">
                <Left>
                  <span
                    style={{
                      color: `${
                        (element[1] - element[2]) / element[2] > 0
                          ? "green"
                          : "red"
                      }`,
                    }}
                  >
                    {element[0].split("::")}
                  </span>
                  <span style={{ color: "black", fontSize: "13px" }}>NSE</span>
                </Left>
                <Right>
                  <span
                    style={{
                      color: `${
                        (element[1] - element[2]) / element[2] >= 0
                          ? "green"
                          : "red"
                      }`,
                    }}
                  >
                    {element[1]}
                  </span>
                  <ArrowElement>
                    <Arrow
                      style={{
                        borderTop: `${
                          (element[1] - element[2]) / element[2] >= 0
                            ? "5px solid transparent"
                            : "7px solid red"
                        }`,
                        borderBottom: `${
                          (element[1] - element[2]) / element[2] >= 0
                            ? "7px solid green"
                            : "5px solid transparent"
                        }`,
                      }}
                    ></Arrow>
                    <span style={{ color: "black", marginLeft: "5px" }}>
                      {((element[1] - element[2]) / element[2]).toFixed(4)}%
                    </span>
                    <AddButton
                      className="add_button"
                      onClick={() => addToWatchList(element)}
                    ></AddButton>
                  </ArrowElement>
                </Right>
              </Wrap>
            ))}
        </DisplayContent>
      </Section>
    </Container>
  );
}

export default Stock;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
const Section = styled.div``;
const Input = styled.input``;
const DisplayContent = styled.div`
  // background-color: black;
  color: white;
  width: 500px;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 100px;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #d3d3d3;
  &:hover {
    cursor: pointer;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ariel;
  font-size: 16px;
  font-weight: bold;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ariel;
  font-size: 14px;
  font-weight: bold;
`;
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 7px solid red;
`;
const ArrowElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AddButton = styled(AddOutlinedIcon)`
  color: black;
  visibility: hidden;
  background-color: blue;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
