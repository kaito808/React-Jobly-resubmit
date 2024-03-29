import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";
import {
  Container,
  Box,
  Button,
} from "@mui/material";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    
			
        <Container maxWidth="sm" sx={{ p: "50px" }}> {applied}
        	<Box
					
						sx={{
							mb: 4,
							p: 2,
							borderRadius: 4,
							backgroundColor: "#f0f0f0",
						}}
					>
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <Button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </Button>
        </Box>
      </Container>
  );
}

/** Render integer salary like '$1,250,343' */

function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}


export default JobCard;
