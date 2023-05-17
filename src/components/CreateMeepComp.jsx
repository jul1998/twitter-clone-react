import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createMeep } from "../store/slices/meepsSlicer";

const CreateMeepComp = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("user_id");
    const [meep, setMeep] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const data = {
          body: meep,
          user_id: userId,
        };
        dispatch(createMeep(data));
      
        // reset the form after submission
        e.currentTarget.reset();
        //refresh window
        window.location.reload();
      };
      
      const handleMeepChange = (e) => {
        setMeep(e.currentTarget.value);
      };
      
      return (
        <Form onSubmit={handleSubmit} className="mb-5">
          <Form.Group controlId="tweetForm">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's happening?"
              value={meep}
              onChange={handleMeepChange}
            />
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
