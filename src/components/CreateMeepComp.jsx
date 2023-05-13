import React from "react";
import { Form, Button } from "react-bootstrap";

const CreateMeepComp = () => {
  return (
    <Form className="mb-5">
      <Form.Group controlId="tweetForm">
        <Form.Control as="textarea" rows={3} placeholder="What's happening?" />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Tweet
        </Button>
      </div>
    </Form>
  );
};

export default CreateMeepComp;
