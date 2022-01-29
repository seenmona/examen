import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CandidateTableRow = (props) => {
  const { id, nume, cv, email } = props.obj;

  const deleteStudent = () => {
    console.log(props.obj);
    axios
      .delete(`http://localhost:8081/api/candidates/${id}`)
      .then((res) => {
        alert("Candidate successfully deleted");
        window.location.reload();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{nume}</td>
      <td>{cv ? cv.slice(0, 20) : ""}</td>
      <td>{email}</td>

      <td>
        <Link className="edit-link" to={"/edit-candidate/" + id}>
          Edit
        </Link>
        <Button onClick={deleteStudent} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CandidateTableRow;
