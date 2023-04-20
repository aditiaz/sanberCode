import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await axios.post(
        "https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/login",
        {
          email: data.get("email"),
          password: data.get("password"),
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));

      if (response.token != "") {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        alert("Failed to log in");
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <h2>
            Don't have an account? Go{" "}
            <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>
              {" "}
              Sign Up
            </span>
          </h2>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
