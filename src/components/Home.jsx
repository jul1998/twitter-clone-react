import React from 'react'
import checkToken from "../utils/checkToken";
import MeepsComp from './MeepsComp';

const Home = () => {

  if (!checkToken()) {
   // window.location.href = "/sign-up";
   return <div>Not logged in</div>
  }


  return (
    <div>
      <MeepsComp />
    </div>
  )
}

export default Home