import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const CanndidateForm = (props) => {
  const [nume, setNume] = useState(props.initialValues.nume);
  const [cv, setCv] = useState(props.initialValues.cv);
  const [email, setEmail] = useState(props.initialValues.email);

  useEffect(() => {
    setNume(props.initialValues.nume);
    setCv(props.initialValues.cv);
    setEmail(props.initialValues.email);
  }, [props.initialValues]);
  return (
    <div className="form-wrapper">
      <FormGroup>
        <FormLabel>Nume</FormLabel>
        <FormControl
          name="nume"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
          type="text"
          className="form-control"
        />
      </FormGroup>{" "}
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormControl
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="form-control"
        />
      </FormGroup>{" "}
      <FormGroup>
        <FormLabel>CV</FormLabel>
        <FormControl
          name="cv"
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          type="text"
          className="form-control"
        />
      </FormGroup>
      <Button
        variant="danger"
        size="lg"
        block="block"
        onClick={() => props.onSubmit({ cv, email, nume })}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default CanndidateForm;
