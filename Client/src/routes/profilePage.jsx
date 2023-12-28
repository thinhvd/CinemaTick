import { useState } from 'react'
import axios from "axios";

function Profile() {
  const token = localStorage.getItem('token');

  const [profileData, setProfileData] = useState(null)
  function getData() {
    axios({
      method: "GET",
      url:"http://fall2324w20g8.int3306.freeddns.org/api/profile",
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then((response) => {
      const res =response.data
      console.log(res)
      setProfileData(({
        profile_name: res.fullname,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <div className="Profile">

        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }

    </div>
  );
}

export default Profile;