// SeatSelector.js
import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Seat from '../components/seat';

const TestPage = () => {
  const [seatStatus, setSeatStatus] = useState([]);
  const [seatPrice, setSeatPrice] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seats, setOccupiedSeat] = useState([]);
  // var seats = [
  //   {
  //     "id": 1,
  //     "position": "A1",
  //     "price": 125,
  //     "seat_type": "basic",
  //     "show_id": 1,
  //     "status": "occupied"
  //   },
  //   // ... (các đối tượng khác)
  //   {
  //     "id": 5,
  //     "position": "A5",
  //     "price": 125,
  //     "seat_type": "basic",
  //     "show_id": 1,
  //     "status": "normal"
  //   }
  // ];

  // for (let row = 'A'; row <= 'H'; row++) {
  //   for (let col = 1; col <= 12; col++) {
  //     const seat = {
  //       "id": `${row}${col}`,
  //       "status": "normal"
  //     };
  //     seats.push(seat);
  //   }
  // }


  // const checkOccupied = (seatNumber) => {
  //   console.log(seats, seats[1 - 1].status)
  //     return seats[seatNumber - 1].status === "occupied";
  // }


  function numberToString(number) {
    // Tính toán ký tự (A đến H)
    var temp = []
    for (let i = 0; i < number.length; i++) {
      let charCode = Math.floor((number[i] - 1) / 12) + 'A'.charCodeAt(0);
      let char = String.fromCharCode(charCode);

      // Tính toán số (1 đến 12)
      let numberInRow = (number[i] - 1) % 12 + 1;

      // Tạo tên của ô
      let cellName = char + numberInRow;

      temp.push(cellName)
    }
    return temp

  }

  useEffect(() => {
    // Fetch data from API
    axios.get('http://fall2324w20g8.int3306.freeddns.org/api/seats/1')
      .then(response => {
        const seatData = response.data;
        const initialSeatStatus = Array(12 * 8).fill('normal');
        const initialSeatPrice = Array(12 * 8).fill(0);

        seatData.forEach(seat => {
          // const index = calculateIndexFromPosition(seat.position);
          const index = seat.id;
          initialSeatStatus[index] = seat.status;
          initialSeatPrice[index] = seat.price;
        });

        setSeatStatus(initialSeatStatus);
        setSeatPrice(initialSeatPrice);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  // const calculateIndexFromPosition = (position) => {
  //   // Implement logic to convert seat position (e.g., "A1") to array index
  //   // You may need to adjust this based on your actual seat layout
  //   // For example, if the layout is 12x8, you could use something like:
  //   // const row = position.charCodeAt(0) - 'A'.charCodeAt(0);
  //   // const col = parseInt(position.slice(1)) - 1;
  //   // const index = row * 12 + col;
  //   // return index;
  // };

  const handleSeatClick = (index) => {
    if (seatStatus[index] === 'normal') {
      const newSeatStatus = [...seatStatus];
      newSeatStatus[index] = 'selected';
      setSeatStatus(newSeatStatus);
      const selectedSeatPrice = seatPrice[index];
      setTotalPrice((prevTotal) => prevTotal + selectedSeatPrice);
    } else if (seatStatus[index] === 'selected') {
      const newSeatStatus = [...seatStatus];
      newSeatStatus[index] = 'normal';
      setSeatStatus(newSeatStatus);
      const selectedSeatPrice = seatPrice[index];
      setTotalPrice((prevTotal) => prevTotal - selectedSeatPrice);
    }

    // Tìm vị trí của chỗ ngồi trong mảng đã chọn
    const seatIndex = selectedSeats.indexOf(index);

    // Nếu chỗ ngồi đã chọn, loại bỏ nó khỏi mảng
    if (seatIndex > -1) {
      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(newSelectedSeats);
    } else {
      // Ngược lại, thêm chỗ ngồi vào mảng đã chọn
      setSelectedSeats([...selectedSeats, index]);
    }

  };

  return (
    <Layout>
      <TopBar />
      <div className="background">
        <Content>

          <div className="redone">
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
            <div className="cinema">
              {[...Array(8)].map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                  {[...Array(12)].map((_, colIndex) => {
                    const seatNumber = rowIndex * 12 + colIndex + 1;
                    const index = seatNumber;

                    return (
                      <Seat
                        key={index}
                        seatNumber={seatNumber}
                        status={seatStatus[index]}
                        onClick={() => handleSeatClick(index)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="blueone">
            <ul>
              <li>Rạp số: 1</li>
              <li>Tên Phim: Siêu nhân Gao</li>
              <li>Suất chiếu: 20:00 14/12/2023</li>
              <li>Ghế đã chọn: {numberToString(selectedSeats).join(', ')}</li>
              <li>Giá vé: 210.000 VND</li>
              <li>Combo: Something</li>
              <li className="totalprice">Total: {totalPrice}.000 VND</li>
            </ul>
            <Button className="cancelseatbutton" shape="round" icon={<CloseOutlined />} size={10}>Cancel </Button >
            <Button className="selectseatbutton" shape="round" onClick={() => sendSeatData()} icon={<DoubleRightOutlined />} size={10}>Next </Button >

          </div>

        </Content>
      </div>
    </Layout>
  );
};

export default TestPage;
