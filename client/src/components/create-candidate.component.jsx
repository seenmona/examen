// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateForm from "./CandidateForm";

// CreateStudent Component
const CreateCandidate = () => {
  const [formValues, setFormValues] = useState({
    nume: "",
    cv: "",
    email: "",
  });
  // onSubmit handler
  const onSubmit = (data) => {
    axios
      .post("http://localhost:8081/api/candidates", {
        ...data,
        jobPostingId:
          window.location.href.split("/")[
            window.location.href.split("/").length - 1
          ],
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => err.response.data.errors.forEach((item) => alert(item)));
  };

  // Return student form
  return (
    <CandidateForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create Candidate
    </CandidateForm>
  );
};

// Export CreateJobPost Component
export default CreateCandidate;
