import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProfileList } from '../store/slices/profileListSlicer';
import checkToken from "../utils/checkToken";

import {Button, Card, Alert, Nav } from 'react-bootstrap/';

const ProfileList = () => {


  const dispatch = useDispatch();
  const profileList = useSelector((state) => state.profile.profileList);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getProfileList())
        .then((response) => {  
            setProfiles(response.payload);
            setLoading(false);
            })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    );

  }, [dispatch, profileList]);

  console.log(profiles)

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Some error occurred! {error}</div>;
  }

  if (!checkToken()) {
    // window.location.href = "/sign-up";
    return <div>
      <Alert key="warning" variant="warning">
          You need to be logged in to view this page.
        </Alert>
    </div>
   }

  return (
    <div>
      {profiles?profiles.map((profile) => (
      <Card className="mt-4" key={profile.id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMGhvbGRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" />
      <Card.Body>
        <Card.Title>{profile.user}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card
        </Card.Text>
        <Card.Text>
         <small>Last update: {profile.date_modified} </small>
        </Card.Text>
        <Button variant="primary">
          <Nav.Link href={`/profile-dp/${profile.id}`}>View Profile</Nav.Link>
        </Button>
      </Card.Body>
    </Card>
    )):<p>No profiles</p>}
    
       
    </div>
  );
};

export default ProfileList;
