import React, { useEffect, useState } from "react";
import { getMeeps, likeMeep } from "../store/slices/meepsSlicer";
import { useDispatch, useSelector } from "react-redux";
import CreateMeepComp from "./CreateMeepComp";
import MeepLikesCountComp from "./MeepLikesCountComp";

import {Alert, Button } from "react-bootstrap/";

const MeepsComp = () => {
  const dispatch = useDispatch();
  const meeps = useSelector((state) => state.meeps.meeps);
  const status = useSelector((state) => state.meeps.status);
  const [visibleMeeps, setVisibleMeeps] = useState(3);
  const [meepLikes, setMeepLikes] = useState(0);


  useEffect(() => {
    dispatch(getMeeps());
  }, [dispatch]);

  console.log(meeps);

  

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load meeps</div>;
  }
  
  const showMoreMeeps = () => {
    setVisibleMeeps(visibleMeeps + 5);
  };

  return (
    <div>
    <h1>Meeps</h1>
    <CreateMeepComp />
    {Array.from(meeps)&& meeps.slice(0, visibleMeeps).map((meep) => (
      <div key={meep.id}>
        <Alert variant="dark">
          <h3>{meep.body}</h3>
          <small>{meep.date_modified}</small>
          <p>{meep.user}</p>
          <p>Likes: </p>
        </Alert>
      </div>
    ))}
    {visibleMeeps < meeps.length && (
      <Button variant="primary" onClick={showMoreMeeps}>
        Load more
      </Button>
    )}
  </div>
);
};


export default MeepsComp;
