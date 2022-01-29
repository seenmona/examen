import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CandidateTableRow from "./CandidateTableRow";

const CandidateList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/api/candidates/` +
          window.location.href.split("/")[
            window.location.href.split("/").length - 1
          ]
      )
      .then(({ data }) => {
        setJobs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return jobs.map((res, i) => {
      return <CandidateTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>CV</th>
            <th>Email</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default CandidateList;
