// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import Alert from "../common/Alert";
// import {
// 	Container,
// 	Paper,
// 	Stack,
// 	Typography,
// 	TextField,
// 	FormControl,
// 	Button,
// } from "@mui/material";

// /** Login form.
//  *
//  * Shows form and manages update to state on changes.
//  * On submission:
//  * - calls login function prop
//  * - redirects to /companies route
//  *
//  * Routes -> LoginForm -> Alert
//  * Routed as /login
//  */

// function LoginForm({ login }) {
//   const history = useHistory();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [formErrors, setFormErrors] = useState([]);

//   console.debug(
//       "LoginForm",
//       "login=", typeof login,
//       "formData=", formData,
//       "formErrors", formErrors,
//   );

//   /** Handle form submit:
//    *
//    * Calls login func prop and, if successful, redirect to /companies.
//    */

//   async function handleSubmit(evt) {
//     evt.preventDefault();
//     let result = await login(formData);
//     if (result.success) {
//       history.push("/companies");
//     } else {
//       setFormErrors(result.errors);
//     }
//   }

//   /** Update form data field */
//   function handleChange(evt) {
//     const { name, value } = evt.target;
//     setFormData(l => ({ ...l, [name]: value }));
//   }

//   return (
      
//                 <Container maxWidth="xl" sx={{ p: "40px" }}>
// 			<Paper
// 				elevation={2}
// 				sx={{ p: "30px", borderRadius: "10px", background: "#f0f0e8" }}
// 			>
// 				<FormControl fullWidth onSubmit={handleSubmit}>
// 					<Stack
// 						direction="column"
// 						justifyContent="center"
// 						alignItems="stretch"
// 						spacing={4}
// 					>
// 						<Typography variant="h4">Login</Typography>
// 						<Stack
// 							direction="column"
// 							justifyContent="center"
// 							alignItems="flex-start"
// 							spacing={1}
// 						>
// 							<Typography variant="body1">Username</Typography>
// 							<TextField
//               label=""
//             type="email"
//               value={formData.username}
//               onChange={handleChange}
//               autoComplete="username"
//               required
								
// 								size="medium"
// 								sx={{ width: "100%" }}
// 							/>
// 						</Stack>
//             <Stack
// 							direction="column"
// 							justifyContent="center"
// 							alignItems="flex-start"
// 							spacing={1}
// 						>
// 							<Typography variant="body1">Password</Typography>
// 							<TextField
//                type="password"
              
//                value={formData.password}
//                onChange={handleChange}
//                autoComplete="current-password"
//                required
// 								label="Password"
								
// 								size="medium"
// 								sx={{ width: "100%" }}
// 							/>
// 						</Stack>
//             {formErrors.length
//                     ? <Alert type="danger" messages={formErrors} />
//                     : null}
//             <Button  onSubmit={handleSubmit} variant="contained">Login</Button>

//             </Stack>
//             </FormControl>
            
//             </Paper>
//             </Container>

           
//   );
// }}

// export default LoginForm;
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

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
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
              <Typography variant="h4">Login</Typography>
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
                      autoComplete="username"
                      required
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
                      autoComplete="current-password"
                      required
                  />
                
              </Stack>
              {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
              <Button type="submit" variant="contained">
                submit
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginForm;
