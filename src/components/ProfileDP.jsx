import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProfileDP } from "../store/slices/profileListSlicer";
import { useParams, Link } from "react-router-dom";
import checkToken from "../utils/checkToken";
import { Button, Card, Alert, Spinner } from "react-bootstrap/";

const ProfileDP = () => {
  const { userid } = useParams();

  const dispatch = useDispatch();

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getProfileDP(userid))
      .then((response) => {
        console.log(response);
        setProfile(response.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error);
      });
  }, [dispatch, userid]);




  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (error) {
    return (
      <Alert key="warning" variant="warning">
        Some error occurred! {error}
      </Alert>
    );
  }

    if (!checkToken()) {
        // window.location.href = "/sign-up";
        return (
            <Alert key="warning" variant="warning">
                You need to be logged in to view this page.
            </Alert>
        );
    }

if(!profile){
    return (
        <Alert key="danger" variant="danger">
            No profile found.
        </Alert>
    );
}



return (
    <div>
      <h2>{profile.user}'s profile</h2>
      
      <strong>Follows {profile.follows.length} people:</strong>
      <ul>
        {profile.follows?profile.follows.map((follow) => (
          <li key={follow.id}><Link to={`/profile-dp/${follow.id}`}>@{follow.user__username}</Link> </li>
        )):<p>No follows</p>}
      </ul>
        <strong>Followed by {profile.followed_by.length} people :</strong>
        <ul>
        {profile.followed_by?profile.followed_by.map((follow) => (
            <li key={follow.id}><Link to={`/profile-dp/${follow.id}`}>@{follow.user__username}</Link> </li>
        )):<p>No followers</p>}
        </ul>

    </div>
  );
};


export default ProfileDP;
