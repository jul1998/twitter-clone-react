import React from 'react'
import checkToken from "../utils/checkToken";


const Home = () => {

  if (!checkToken()) {
   // window.location.href = "/sign-up";
   return <div>Not logged in</div>
  }


  return (
    <div>Meeps!</div>
  )
}

export default Home