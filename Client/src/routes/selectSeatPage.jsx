// SeatSelector.jsid
import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Space, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Seat from '../components/seat';
import { useParams } from "react-router";

const {Title, Paragraph} = Typography;

const SelectSeatPage = () => {
  const [seatStatus, setSeatStatus] = useState([]);
  const [seatPrice, setSeatPrice] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [movieName, setmovieName] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [room, setRoom] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  var checkout_info = {
    'price': totalPrice,
    'message': 'THONG TIN VE: seat id:[' + selectedSeats.join(', ')  + ']'+ ',movie name:' + movieName + ',show id:' + id
  }


  function numberToString(number) {
    // Tính toán ký tự (A đến H)
    var temp = []
    for (let i = 0; i < number.length; i++) {
      if (number[i] % 96 == 0) temp.push('H12')
      else {
        let charCode = Math.floor((number[i] % 96 - 1) / 12) + 'A'.charCodeAt(0);
        let char = String.fromCharCode(charCode);
  
        // Tính toán số (1 đến 12)
        let numberInRow = (number[i] - 1) % 12 + 1;
  
        // Tạo tên của ô
        let cellName = char + numberInRow;
  
        temp.push(cellName)
      }
    }
    return temp

  }

  function stringToNumber(string) {
    const columnLetter = string.charAt(0);
    const rowNumber = parseInt(string.slice(1));

    // Chuyển đổi chữ cái cột thành số tương ứng (A->1, B->2, ..., H->8)
    const columnNumber = columnLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

    // Kiểm tra nếu dữ liệu đầu vào là hợp lệ
    if (isNaN(rowNumber) || rowNumber < 1 || rowNumber > 12 || columnNumber < 1 || columnNumber > 8) {
      console.error("Dữ liệu đầu vào không hợp lệ.");
      return null;
    }

    // Tính toán số tương ứng
    const number = (columnNumber - 1) * 12 + rowNumber;

    return number;
  }

  function redirectToCheckout() {
    fetch("http://fall2324w20g8.int3306.freeddns.org/payment", {
      headers: {
        'accept': 'application/json, text/plain',
        'content-type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
      },
      method: "post",
      body: JSON.stringify(checkout_info)
    }).then(response => response.json())
      .then(data => window.location.href = data.payment_url)
      .catch(error => console.error(error));
  }

  useEffect(() => {
    // Fetch data from API
    // axios.get(`http://fall2324w20g8.int3306.freeddns.org/api/seats/${id}`)
    axios({
      method: "GET",
      url: `http://fall2324w20g8.int3306.freeddns.org/api/seats/${id}`,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

      .then(response => {
        const seatData = response.data;
        const initialSeatStatus = Array(672).fill('normal');
        const initialSeatPrice = Array(672).fill(0);
        const initialSeatType = Array(672).fill('basic');

        seatData.forEach(seat => {
          // const index = calculateIndexFromPosition(seat.position);
          var index = seat.id;
          initialSeatStatus[index] = seat.status;
          initialSeatPrice[index] = seat.price;
          initialSeatType[index] = seat.seat_type;
        });
        // console.log(seatData)
        setmovieName(seatData[0].movie_name)
        setSchedule(seatData[0].schedule)
        setRoom(seatData[0].room)
        setSeatStatus(initialSeatStatus);
        setSeatPrice(initialSeatPrice);
        setSeatType(initialSeatType);
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
    // console.log(index)
    //console.log(id)
    if(seatStatus[index] === 'empty') {
      seatStatus[index] = 'normal'
    }
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
      // console.log(newSelectedSeats)
    } else {
      // Ngược lại, thêm chỗ ngồi vào mảng đã chọn
      setSelectedSeats([...selectedSeats, index]);
      //console.log(...selectedSeats)
    }

  };

  return (
    <div className="background">
      <TopBar />
      <Space style={{display:'flex', justifyContent:'space-between',marginTop:'10vh' }} direction="horizontal">
      <Space className="redone" direction="vertical">
        <Space className="cinema">
          <Space>
            <div className="seat"></div>
            <Title level={3} style={{color:'white'}}>Normal</Title>
          </Space>
          <Space>
            <div className="seat vip"></div>
            <Title level={3} style={{color:'white'}}>VIP</Title>
          </Space>
          <Space>
            <div className="seat selected"></div>
            <Title level={3} style={{color:'white'}}>Selected</Title>
          </Space>
          <Space>
            <div className="seat occupied"></div>
            <Title level={3} style={{color:'white'}}>Occupied</Title>
          </Space>
        </Space>
        <Space direction="column" style={{display:'flex', flexDirection:'column', fontSize:''}}>
          {[...Array(8)].map((_, rowIndex) => (
            <div key={rowIndex} className="row">
              {[...Array(12)].map((_, colIndex) => {
                const seatNumber = rowIndex * 12 + colIndex + 1;
                const seatID = seatNumber + 96 * (id - 1)
                return (
                  <Seat
                    key={seatID}
                    seatNumber={seatID}
                    status={seatStatus[seatID]}
                    seatType={seatType[seatID]}
                    onClick={() => handleSeatClick(seatID)}
                  />
                );
              })}
            </div>
          ))}
        </Space>
      </Space>
      <div className="blueone">
        <ul>
          <li>Rạp số: {room}</li>
          <li>Tên Phim: {movieName}</li>
          <li>Suất chiếu: {schedule}</li>
          <li>Ghế đã chọn: {numberToString(selectedSeats).join(', ')}</li>
          <li className="totalprice">Total: {totalPrice} VND</li>
        </ul>
        <Space className="seatbutton" direction="horizontal" align="center">
          <Button className="cancelseatbutton" shape="round" href={`/`} icon={<CloseOutlined />} >Cancel </Button >
          <Button className="selectseatbutton" shape="round" onClick={() => redirectToCheckout()} icon={<DoubleRightOutlined />} >Next </Button >
        </Space>
      </div>
      </Space>
    </div>
  );
};

export default SelectSeatPage;
