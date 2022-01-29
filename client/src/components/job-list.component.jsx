import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormGroup,
  Table,
  FormLabel,
  FormControl,
  Button,
  FormSelect,
} from "react-bootstrap";

import JobPostTableRow from "./JobPostTableRow";

const JobPostList = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("1990-01-12");
  const [endDate, setEndDate] = useState("2222-01-12");

  useEffect(() => {
    console.log(startDate, endDate);
    axios
      .get(
        `http://localhost:8081/api/jobs?offset=${0}&filter=${filter}&startDate=${startDate}&endDate=${endDate}&sort=${sort}`
      )
      .then(({ data }) => {
        setJobs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter, startDate, endDate, sort]);

  const DataTable = () => {
    return jobs.map((res, i) => {
      return <JobPostTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <div className="form-wrapper">
        <FormGroup>
          <FormLabel>Filter</FormLabel>
          <FormControl
            name="filtru"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            className="form-control"
          />
        </FormGroup>{" "}
        <FormGroup>
          <FormLabel>Start Date</FormLabel>
          <FormControl
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            name="startdate"
            type="date"
            className="form-control"
          />
        </FormGroup>{" "}
        <FormGroup>
          <FormLabel>End Date</FormLabel>
          <FormControl
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name="endaate"
            type="date"
            className="form-control"
          />
        </FormGroup>{" "}
        <FormGroup>
          <FormLabel>Date order</FormLabel>
          <FormSelect value={sort} onChange={(e) => setSort(e.target.value)}>
            {" "}
            <option>DESC</option>
            <option>ASC</option>
          </FormSelect>
        </FormGroup>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            <th>Action</th>
            <th>Candidates</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default JobPostList;
