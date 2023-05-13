import React, { useEffect, useState } from "react";
import { getMeepByUserID } from "../store/slices/meepsSlicer";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const MeepsByUserIdComp = ({userid, username}) => {
  
    console.log(userid)
  const dispatch = useDispatch();
  const meeps = useSelector((state) => state.meeps.meeps);
  const status = useSelector((state) => state.meeps.status);

    useEffect(() => {
        dispatch(getMeepByUserID(userid));
    }, [dispatch, userid]);

    console.log(meeps);




    return (
        <div>
          <h2>meeps from {username} </h2>
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
    


export default MeepsByUserIdComp;