import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeepLikesCount } from '../store/slices/meepsSlicer';

const MeepLikesCountComp = ({ meep_id }) => {
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(0);

  const data = {
    meep_id: meep_id,
  };

  useEffect(() => {
    dispatch(getMeepLikesCount(data)).then
    ((response) => {
        console.log(response.payload);
    });
  }, [dispatch]);

  

  

  return <div>{likesCount}</div>;
};

export default MeepLikesCountComp;
