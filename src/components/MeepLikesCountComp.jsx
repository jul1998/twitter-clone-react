import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeepLikesCount } from '../store/slices/meepsSlicer';

const MeepLikesCountComp = ({ meep_id }) => {
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const data = {
    meep_id: meep_id,
  };

  useEffect(() => {
    dispatch(getMeepLikesCount(data)).then((response) => {
      console.log(response);
      setLikesCount(response.payload.likes_total);
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading likes count...</div>;
  }

  console.log(likesCount);

  return <div>Likes: {likesCount}</div>;
};

export default MeepLikesCountComp;
