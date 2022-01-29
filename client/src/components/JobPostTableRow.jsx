import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const JobPostTableRow = (props) => {
  const { id, descriere, deadline } = props.obj;

  const deleteStudent = () => {
    console.log(props.obj);
    axios
      .delete(`http://localhost:8081/api/jobs/${id}`)
      .then((res) => {
        alert("Job successfully deleted");
        window.location.reload();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{descriere}</td>
      <td>{deadline}</td>

      <td>
        <Link className="edit-link" to={"/edit-job/" + id}>
          Edit
        </Link>
        <Button onClick={deleteStudent} size="sm" variant="danger">
          Delete
        </Button>
      </td>
      <td>
        <Link className="edit-link" to={"/create-candidate/" + id}>
          Create
        </Link>{" "}
        <Link className="edit-link" to={"/candidate-list/" + id}>
          List
        </Link>
      </td>
    </tr>
  );
};

export default JobPostTableRow;
