import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import "./Login.scss";
import axios from "axios";
import { getLoginToken } from "../../api/auth";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };

    try {
      const { access, refresh } = await getLoginToken(userData);
      localStorage.clear();
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      window.location.href = "/admin/panel";
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const isLoginDisabled = !username || !password;

  return (
    <div className="content">
      <Dialog open={true}>
        <DialogContent className="panel-dialog-content">
          <Typography variant="h4" className="panel-dialog-content__title">
            Administrator Login
          </Typography>
          {error && (
            <Typography
              className="panel-dialog-content__error"
              variant="body2"
              color="error"
            >
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="panel-dialog-content__btn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoginDisabled}
            >
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
