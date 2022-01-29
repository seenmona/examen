// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

import CandidateForm from "./CandidateForm";

// EditStudent Component
const EditJobPost = (props) => {
  const [formValues, setFormValues] = useState({
    nume: "",
    cv: "",
    email: "",
  });

  const id =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  //onSubmit handler
  const onSubmit = (data) => {
    axios
      .put("http://localhost:8081/api/candidates", {
        ...data,
        id,
      })
      .then((res) => {
        alert("Candidate updated");
        window.location.href = "/job-list";
      })
      .catch((err) => console.error(err));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/candidates/" + id)
      .then((res) => {
        const { nume, cv, email } = res.data;
        setFormValues({ nume, cv, email });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return student form
  return (
    <CandidateForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Edit Candidate
    </CandidateForm>
  );
};

// Export EditJobPost Component
export default EditJobPost;
