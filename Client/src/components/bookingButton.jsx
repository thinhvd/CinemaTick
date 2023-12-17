import React, { useState } from 'react';
import { Button } from 'antd';

const DatVe = () => {
    const [poster, setPoster] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    var movieDetails={
        "poster": poster,
        "name": name,
        "description": description,
    }

    function getMovie() {
        fetch("http://fall2324w20g8.int3306.freeddns.org/api/movie/1", {
            headers: {
                'accept': 'application/json, text/plain',
                'content-type': 'application/json;charset=utf-8'
            },
            method: "GET",
            mode: 'no-cors',
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return(
        <Button className="button" onClick={()=>getMovie()}>Đặt vé</Button>
    )
}

export default DatVe;