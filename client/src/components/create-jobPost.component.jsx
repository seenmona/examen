// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import JobPostForm from "./JobPostForm";

// CreateStudent Component
const CreateJobPost = () => {
  const [formValues, setFormValues] = useState({
    descriere: "",
    deadline: "",
  });
  // onSubmit handler
  const onSubmit = (data) => {
    axios
      .post("http://localhost:8081/api/jobs", data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => err.response.data.errors.forEach((item) => alert(item)));
  };

  // Return student form
  return (
    <JobPostForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create job post
    </JobPostForm>
  );
};

// Export CreateJobPost Component
export default CreateJobPost;
