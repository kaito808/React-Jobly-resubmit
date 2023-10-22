import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import {
  Container,
  Paper,
  Stack,
  Typography,
  
  FormControl,
  Button,
} from "@mui/material";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <Container maxWidth="xs" sx={{ p: "40px" }}>
			<Paper
				elevation={2}
				sx={{ p: "30px", borderRadius: "10px", background: "#f0f0e8" }}
			>
         <form onSubmit={handleSubmit}>
				<FormControl fullWidth>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="stretch"
						spacing={4}
					>
						<Typography variant="h4">Signup</Typography>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
							spacing={1}
						>
							<Typography variant="body1">Username</Typography>
							<input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
						</Stack>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
							spacing={1}
						>
							<Typography variant="body1">Password</Typography>
							<input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
						</Stack>
            <Stack
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
							spacing={1}
						>
							<Typography variant="body1">FirstName</Typography>
							<input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
						</Stack>
            <Stack
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
							spacing={1}
						>
							<Typography variant="body1">lastName</Typography>
							<input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
						</Stack>
            <Stack
							direction="column"
							justifyContent="center"
							alignItems="flex-start"
							spacing={1}
						>
							<Typography variant="body1">Email</Typography>
							<input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
						</Stack>
            
            {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

						<Button type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit} variant="contained">Signup</Button>
						
					</Stack>

				</FormControl>
        </form>
			</Paper>
		</Container>
      
      
  );
}

export default SignupForm;