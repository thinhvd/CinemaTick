// Seat.js
import React from 'react';

const Seat = ({ seatNumber, status, seatType, onClick }) => {
    function numberToString(number) {
        if (number % 96 == 0) {
            return 'H12'
        }
        // Tính toán ký tự (A đến H)
        number = number % 96
        let charCode = Math.floor((number - 1) / 12) + 'A'.charCodeAt(0);
        let char = String.fromCharCode(charCode);

        // Tính toán số (1 đến 12)
        let numberInRow = (number - 1) % 12 + 1;

        // Tạo tên của ô
        let cellName = char + numberInRow;

        return cellName;
    }

    const seatStyles = {
        // width: '40px',
        // height: '40px',
        // margin: '5px',
        // border: '1px solid #ccc',
        backgroundColor: status === 'occupied' ? '#212224' : status === 'selected' ? 'rgb(115, 115, 253)' : seatType === 'vip' ? '#800080' : '#777',
        cursor: status === 'occupied' ? 'not-allowed' : 'pointer',
      };

    return <div
        // className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
        className='seat'
        style={seatStyles}
        onClick={onClick}>
        {numberToString(seatNumber)}
    </div>;
};

export default Seat;