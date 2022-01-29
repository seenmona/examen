// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

import JobPostForm from "./JobPostForm";

// EditStudent Component
const EditJobPost = (props) => {
  const [formValues, setFormValues] = useState({
    descriere: "",
    deadline: "",
  });

  const id =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  //onSubmit handler
  const onSubmit = (data) => {
    axios
      .put("http://localhost:8081/api/jobs", {
        ...data,
        id,
      })
      .then((res) => {
        alert("Job post updated");
        window.location.href = "/job-list";
      })
      .catch((err) => console.error(err));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/jobs/" + id)
      .then((res) => {
        const { descriere, deadline } = res.data;
        setFormValues({ descriere, deadline });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return student form
  return (
    <JobPostForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Edit JobPost
    </JobPostForm>
  );
};

// Export EditJobPost Component
export default EditJobPost;
