import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import CreateJob from "./components/create-jobPost.component";
import EditJob from "./components/edit-jobPost.component";
import JobList from "./components/job-list.component";
import CreateCandidate from "./components/create-candidate.component";
import EditCandidate from "./components/edit-candidate.component";
import CandidateList from "./components/candidate-list.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-job"} className="nav-link">
                  React App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-job"} className="nav-link">
                    Create JobPost
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/job-list"} className="nav-link">
                    JobPost List
                  </Link>
                </Nav>{" "}
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<CreateJob />} />
                  <Route path="/create-job" element={<CreateJob />} />
                  <Route path="/edit-job/:id" element={<EditJob />} />
                  <Route path="/job-list" element={<JobList />} />
                  <Route
                    path="/create-candidate/:id"
                    element={<CreateCandidate />}
                  />
                  <Route
                    path="/edit-candidate/:id"
                    element={<EditCandidate />}
                  />
                  <Route
                    path="/candidate-list/:id"
                    element={<CandidateList />}
                  />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
