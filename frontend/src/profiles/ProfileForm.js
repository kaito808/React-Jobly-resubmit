import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import {
  Container,
  Paper,
  Stack,
  Typography,
  
  FormControl,
  Button,
} from "@mui/material";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <Container maxWidth="xs" sx={{ p: "40px" }}>
    <Paper
      elevation={2}
      sx={{ p: "30px", borderRadius: "10px", background: "#f0f0e8" }}
    >
      <FormControl fullWidth>
        <h3>Profile</h3>
        
            <form>
              <div className="form-group">
                
                <p className="form-control-plaintext">{formData.username}</p>
              </div>
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
                    name="email"
                    className="form-control"
                    value={formData.email}
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

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <Button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit} variant="contained"
              >
                Save Changes
              </Button>
            </form>
          </FormControl>
      </Paper>
      </Container>
  );
}

export default ProfileForm;
