import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import { Box, Typography } from "@mui/material";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        {currentUser ? (
          <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
        ) : (
          <Box
            sx={{
              backgroundImage: "url('./images/h1_hero.jpg')", // Relative path to the image
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "90vh",
              pl: "70px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 900, color: "#28395A" }}>
              Find the
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, color: "#28395A" }}>
              most exciting
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, color: "#28395A" }}>
              IT jobs
            </Typography>
            <p>
              <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary font-weight-bold" to="/signup">
                Sign up
              </Link>
            </p>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Homepage;
