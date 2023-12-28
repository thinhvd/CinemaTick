import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import Seat from "../components/seat"
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import React, { useState } from 'react';
export default function SelectSeatPage() {
  // const movieSelected = document.getElementById('movie');
  // const seatsSelected = document.getElementById('seatsSelected');
  // const totalPrice = document.getElementById('totalPrice');
  // const container = document.querySelector('.container');

  // const updatePrice = () => {
  //   const selectedSeats = document.querySelectorAll(
  //     '.container .seat.selected:not(.occupied)'
  //   );
  //   const selectedSeatsCount = selectedSeats.length;

  //   totalPrice.innerText = selectedSeatsCount * +movieSelected.value;
  //   seatsSelected.innerText = selectedSeatsCount;
  // };

  // const selectSeat = (seat) => {
  //   seat.classList.toggle('selected');
  //   updatePrice();
  // };

  // var chooseSeat = (seat) => {
  //   if (
  //     seat.classList.contains('seat') &&
  //     !seat.classList.contains('occupied')
  //   ) {
  //     selectSeat(seat);
  //   }
  // }
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatNumber) => {
    // Tìm vị trí của chỗ ngồi trong mảng đã chọn
    const seatIndex = selectedSeats.indexOf(seatNumber);

    // Nếu chỗ ngồi đã chọn, loại bỏ nó khỏi mảng
    if (seatIndex > -1) {
      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(newSelectedSeats);
    } else {
      // Ngược lại, thêm chỗ ngồi vào mảng đã chọn
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  
  return (
    <div className="background">
      <TopBar />
      <Content>
        <div className="selectseat_area">
          <ul className="showcase">
            <li>
              <div className="seat"></div>
              <small>N/A</small>
            </li>
            <li>
              <div className="seat selected"></div>
              <small>Selected</small>
            </li>
            <li>
              <div className="seat occupied"></div>
              <small>Occupied</small>
            </li>
          </ul>
          <div className="container">
            {/* <div className="screen"></div> */}
            <div className="row">
              <div className="seat occupied" onClick={() => chooseSeat()}>A1</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>A2</div>
              <div className="seat" onClick={() => chooseSeat()}>A3</div>
              <div className="seat" onClick={() => chooseSeat()}>A4</div>
              <div className="seat" onClick={() => chooseSeat()}>A5</div>
              <div className="seat" onClick={() => chooseSeat()}>A6</div>
              <div className="seat" onClick={() => chooseSeat()}>A7</div>
              <div className="seat" onClick={() => chooseSeat()}>A8</div>
              <div className="seat" onClick={() => chooseSeat()}>A9</div>
              <div className="seat" onClick={() => chooseSeat()}>A10</div>
              <div className="seat" onClick={() => chooseSeat()}>A11</div>
              <div className="seat" onClick={() => chooseSeat()}>A12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>B1</div>
              <div className="seat" onClick={() => chooseSeat()}>B2</div>
              <div className="seat" onClick={() => chooseSeat()}>B3</div>
              <div className="seat" onClick={() => chooseSeat()}>B4</div>
              <div className="seat" onClick={() => chooseSeat()}>B5</div>
              <div className="seat" onClick={() => chooseSeat()}>B6</div>
              <div className="seat" onClick={() => chooseSeat()}>B7</div>
              <div className="seat" onClick={() => chooseSeat()}>B8</div>
              <div className="seat" onClick={() => chooseSeat()}>B9</div>
              <div className="seat occupied" onClick={() => chooseSeat()}> B10</div>
              <div className="seat" onClick={() => chooseSeat()}>B11</div>
              <div className="seat" onClick={() => chooseSeat()}>B12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>C1</div>
              <div className="seat" onClick={() => chooseSeat()}>C2</div>
              <div className="seat" onClick={() => chooseSeat()}>C3</div>
              <div className="seat" onClick={() => chooseSeat()}>C4</div>
              <div className="seat" onClick={() => chooseSeat()}>C5</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>C6</div>
              <div className="seat" onClick={() => chooseSeat()}>C7</div>
              <div className="seat" onClick={() => chooseSeat()}>C8</div>
              <div className="seat" onClick={() => chooseSeat()}>C9</div>
              <div className="seat" onClick={() => chooseSeat()}>C10</div>
              <div className="seat" onClick={() => chooseSeat()}>C11</div>
              <div className="seat" onClick={() => chooseSeat()}>C12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>D1</div>
              <div className="seat" onClick={() => chooseSeat()}>D2</div>
              <div className="seat" onClick={() => chooseSeat()}>D3</div>
              <div className="seat" onClick={() => chooseSeat()}>D4</div>
              <div className="seat" onClick={() => chooseSeat()}>D5</div>
              <div className="seat" onClick={() => chooseSeat()}>D6</div>
              <div className="seat" onClick={() => chooseSeat()}>D7</div>
              <div className="seat" onClick={() => chooseSeat()}>D8</div>
              <div className="seat" onClick={() => chooseSeat()}>D9</div>
              <div className="seat" onClick={() => chooseSeat()}>D10</div>
              <div className="seat" onClick={() => chooseSeat()}>D11</div>
              <div className="seat" onClick={() => chooseSeat()}>D12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>E1</div>
              <div className="seat" onClick={() => chooseSeat()}>E2</div>
              <div className="seat" onClick={() => chooseSeat()}>E3</div>
              <div className="seat" onClick={() => chooseSeat()}>E4</div>
              <div className="seat" onClick={() => chooseSeat()}>E5</div>
              <div className="seat" onClick={() => chooseSeat()}>E6</div>
              <div className="seat" onClick={() => chooseSeat()}>E7</div>
              <div className="seat" onClick={() => chooseSeat()}>E8</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>E9</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>E10</div>
              <div className="seat" onClick={() => chooseSeat()}>E11</div>
              <div className="seat" onClick={() => chooseSeat()}>E12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>F1</div>
              <div className="seat" onClick={() => chooseSeat()}>F2</div>
              <div className="seat" onClick={() => chooseSeat()}>F3</div>
              <div className="seat" onClick={() => chooseSeat()}>F4</div>
              <div className="seat" onClick={() => chooseSeat()}>F5</div>
              <div className="seat" onClick={() => chooseSeat()}>F6</div>
              <div className="seat" onClick={() => chooseSeat()}>F7</div>
              <div className="seat" onClick={() => chooseSeat()}>F8</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>F9</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>F10</div>
              <div className="seat" onClick={() => chooseSeat()}>F11</div>
              <div className="seat" onClick={() => chooseSeat()}>F12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>G1</div>
              <div className="seat" onClick={() => chooseSeat()}>G2</div>
              <div className="seat" onClick={() => chooseSeat()}>G3</div>
              <div className="seat" onClick={() => chooseSeat()}>G4</div>
              <div className="seat" onClick={() => chooseSeat()}>G5</div>
              <div className="seat" onClick={() => chooseSeat()}>G6</div>
              <div className="seat" onClick={() => chooseSeat()}>G7</div>
              <div className="seat" onClick={() => chooseSeat()}>G8</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>G9</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>G10</div>
              <div className="seat" onClick={() => chooseSeat()}>G11</div>
              <div className="seat" onClick={() => chooseSeat()}>G12</div>
            </div>
            <div className="row">
              <div className="seat" onClick={() => chooseSeat()}>H1</div>
              <div className="seat" onClick={() => chooseSeat()}>H2</div>
              <div className="seat" onClick={() => chooseSeat()}>H3</div>
              <div className="seat" onClick={() => chooseSeat()}>H4</div>
              <div className="seat" onClick={() => chooseSeat()}>H5</div>
              <div className="seat" onClick={() => chooseSeat()}>H6</div>
              <div className="seat" onClick={() => chooseSeat()}>H7</div>
              <div className="seat" onClick={() => chooseSeat()}>H8</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>H9</div>
              <div className="seat occupied" onClick={() => chooseSeat()}>H10</div>
              <div className="seat" onClick={() => chooseSeat()}>H11</div>
              <div className="seat" onClick={() => chooseSeat()}>H12</div>
            </div>
          </div>
        </div>
        <div className="total_area">
        <p className="totalprice">You have selected <span id="seatsSelected">0</span> seats for the price of $<span
          id="totalPrice">0</span></p>
        </div>
      </Content>
    </div>
  );
} 