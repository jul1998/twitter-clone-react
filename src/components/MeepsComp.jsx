import React, { useEffect, useState } from "react";
import { getMeeps } from "../store/slices/meepsSlicer";
import { useDispatch, useSelector } from "react-redux";
import CreateMeepComp from "./CreateMeepComp";

import Alert from "react-bootstrap/Alert";

const MeepsComp = () => {
  const dispatch = useDispatch();
  const meeps = useSelector((state) => state.meeps.meeps);
  const status = useSelector((state) => state.meeps.status);

  useEffect(() => {
    dispatch(getMeeps());
  }, [dispatch]);

  console.log(status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load meeps</div>;
  }

  return (
    <div>
      <h1>Meeps</h1>
      <CreateMeepComp />
      {meeps.map((meep) => (
        <div key={meep.id}>
          <Alert variant="dark">
          <h3>{meep.body}</h3>
          <small>{meep.date_modified}</small>
          <p>{meep.user}</p>
          </Alert>
          
        </div>
      ))}
    </div>
  );
};

export default MeepsComp;
