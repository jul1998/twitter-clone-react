import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProfileDP } from "../store/slices/profileListSlicer";
import { useParams, Link } from "react-router-dom";
import checkToken from "../utils/checkToken";
import {
  Container,
  ListGroup,
  Image,
  Row,
  Col,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap/";

const ProfileDP = () => {
  const localUserId  = localStorage.getItem("user_id");
  const { userid } = useParams();

  const dispatch = useDispatch();

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getProfileDP(userid))
      .then((response) => {
        console.log(response);
        setProfile(response.payload.profile);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error);
      });
  }, [dispatch, userid]);

  const determineIfFollow = (userId) => {
    const followedBy = profile.followed_by || []; // default to an empty array if followed_by is undefined
    const isFollowing = followedBy.some(user => user.id === userId);
    return isFollowing ? "Unfollow" : "Follow";
  };

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

  if (!profile) {
    return (
      <Alert key="danger" variant="danger">
        No profile found.
      </Alert>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src="holder.js/171x180" roundedCircle />
          </Col>
          <Col>
            <h2>{profile.user}'s profile</h2>
          </Col>
          <Col>
            <strong>Follows {profile.follows.length} people:</strong>
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                Follows {profile.follows.length} people:
              </Card.Header>
              <ListGroup variant="flush">
                {profile.follows ? (
                  profile.follows.map((follow) => (
                    <Link to={`/profile-dp/${follow.id}`}>
                      <ListGroup.Item key={follow.id}>
                        {" "}
                        @{follow.user__username}{" "}
                      </ListGroup.Item>
                    </Link>
                  ))
                ) : (
                  <p>No follows</p>
                )}
              </ListGroup>
            </Card>

            <Card className="mt-3" style={{ width: "18rem" }}>
              <Card.Header>
                Followed by {profile.followed_by.length} people:
              </Card.Header>
              <ListGroup variant="flush">
                {profile.followed_by ? (
                  profile.followed_by.map((follow) => (
                    <Link to={`/profile-dp/${follow.id}`}>
                      <ListGroup.Item key={follow.id}>
                        {" "}
                        @{follow.user__username}{" "}
                      </ListGroup.Item>
                    </Link>
                  ))
                ) : (
                  <p>No follows</p>
                )}
              </ListGroup>
            </Card>

            {determineIfFollow(localUserId)}
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileDP;
