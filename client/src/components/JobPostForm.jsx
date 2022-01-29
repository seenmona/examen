import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const JobPostForm = (props) => {
  const [descriere, setDescriere] = useState(props.initialValues.descriere);
  const [deadline, setDeadline] = useState(props.initialValues.deadline);

  useEffect(() => {
    setDeadline(
      props.initialValues.deadline
        ? props.initialValues.deadline.split("T")[0]
        : props.initialValues.deadline
    );
    setDescriere(props.initialValues.descriere);
  }, [props.initialValues]);
  return (
    <div className="form-wrapper">
      <FormGroup>
        <FormLabel>Descriere</FormLabel>
        <FormControl
          name="descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          type="text"
          className="form-control"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Deadline</FormLabel>
        <FormControl
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          name="deadline"
          type="date"
          className="form-control"
        />
      </FormGroup>

      <Button
        variant="danger"
        size="lg"
        block="block"
        onClick={() => props.onSubmit({ deadline, descriere })}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default JobPostForm;
