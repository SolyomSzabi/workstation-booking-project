import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { LoginUsers } from "../services/AuthenticationService";

export default function LoginForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [loginFailPopup, setLoginFailPopup] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    hasError: false,
    touched: false,
    changed: false
  });
  const [password, setPassword] = useState({
    value: "",
    hasError: false,
    touched: false,
    changed: false
  });

  // eslint-disable-next-line
  const isValidEmail = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const emailChangeHandler = e => {
    const inputValue = e.target.value.trim().toLowerCase();
    let hasError = false;
    if (!isValidEmail(inputValue)) {
      hasError = true;
    }
    setEmail(currentValue => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      changed: true
    }));
  };

  const emailBlurHandler = () => {
    if (email.value) {
      setEmail(currentValue => ({
        ...currentValue,
        touched: true
      }));
    }
  };

  const passwordChangeHandler = e => {
    const inputValue = e.target.value;
    let hasError = false;
    if (inputValue === "") {
      hasError = true;
    }
    setPassword(currentValue => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      changed: true
    }));
  };

  const passwordBlurHandler = () => {
    if (password.value) {
      setPassword(currentValue => ({
        ...currentValue,
        touched: true
      }));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    const response = await LoginUsers({ email: email.value, password: password.value });
    if (response.data.auth_token === undefined) {
      setSuccessfulPopup(false);
      setLoginFailPopup(true);
      localStorage.removeItem("auth_token");
    } else {
      localStorage.setItem("auth_token", response.data.auth_token);
      setLoginFailPopup(false);
      setSuccessfulPopup(true);
      navigate("/admin/buildings");
    }
    /* .catch(error =>  handle the unsuccessful login here ) */
    setOpen(false);
  };

  const handleSuccessfulClose = () => {
    setSuccessfulPopup(false);
  };

  const handleLoginFailClose = () => {
    setLoginFailPopup(false);
  };

  return (
    <Stack sx={{ maxWidth: 150 }}>
      <Typography variant="contained" onClick={handleClickOpen}>
        Sign in
      </Typography>
      <Dialog open={open}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={emailBlurHandler}
                  onChange={emailChangeHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onBlur={passwordBlurHandler}
                  onChange={passwordChangeHandler}
                />
                {email.hasError && email.touched && (
                  <Typography component="h4" style={{ color: "red" }}>
                    Please enter a valid email!
                  </Typography>
                )}
                {password.hasError && password.touched && (
                  <Typography component="h4" style={{ color: "red" }}>
                    Please enter your password!
                  </Typography>
                )}
              </Box>
              <Button
                disabled={
                  !(
                    (password.touched || password.changed) &&
                    (email.touched || email.changed) &&
                    !password.hasError &&
                    !email.hasError
                  )
                }
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}>
                Sign In
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={successfulPopup}>
        <DialogContent>
          <Box>
            <Typography component="h1" variant="h5">
              Successful login
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSuccessfulClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={loginFailPopup}>
        <DialogContent>
          <Box>
            <Typography component="h1" variant="h5">
              Unsuccessful login
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginFailClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
