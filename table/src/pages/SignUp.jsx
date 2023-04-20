import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await axios.post(
        "https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/register",
        {
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
        }
      );
      console.log(response);

      if (response.status == 201) {
        setLoading(false);
        navigate("/signin");
      } else {
        setLoading(false);
        alert("Failed to register.");
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <LockOutlinedIcon sx={{ fontSize: "large" }} />
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? "Loading..." : "Sign Up"}
          </Button>{" "}
          <h3>
            Already have an account? Go{" "}
            <span onClick={() => navigate("/signin")} style={{ color: "blue", cursor: "pointer" }}>
              {" "}
              Sign In
            </span>
          </h3>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
