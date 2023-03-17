import { /* useEffect, */ useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line import/no-unresolved, import/extensions
import { addUsers } from "../services/AuthenticationService";

export default function RegisterForm() {
  const [open, setOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);

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

  const [name, setName] = useState({
    value: "",
    hasError: false,
    touched: false,
    changed: false
  });

  const isValidEmail = mail => {
    return /\S+@\S+\.\S+/.test(mail);
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

  const nameChangeHandler = e => {
    const inputValue = e.target.value;
    let hasError = false;
    if (inputValue === "") {
      hasError = true;
    }

    setName(currentValue => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      changed: true
    }));
  };

  const nameBlurHandler = () => {
    if (name.value) {
      setName(currentValue => ({
        ...currentValue,
        touched: true
      }));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    addUsers({ email: email.value, userName: name.value, password: password.value })
      .then(response => console.log(response))
      .catch(error => console.error(error));
    setOpen(false);
    setSuccessfulPopup(true);
  };

  const handleSuccessfulClose = () => {
    setSuccessfulPopup(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: "auto" }}>
        Register
      </Button>
      <Dialog open={open}>
        <DialogContent>
          {name.hasError && name.touched && (
            <Typography component="h4" style={{ color: "red" }}>
              Please enter your name!
            </Typography>
          )}
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              id="name"
              label="Name"
              name="name"
              variant="standard"
              autoComplete="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
          </Box>
          <Box>
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="standard"
              autoComplete="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
          </Box>
          <Box>
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="standard"
              autoComplete="current-password"
              onBlur={passwordBlurHandler}
              onChange={passwordChangeHandler}
            />
          </Box>
          <Box mt={3}>
            <Button
              disabled={
                !(
                  (password.touched || password.changed) &&
                  (name.touched || name.changed) &&
                  (email.touched || email.changed) &&
                  !name.hasError &&
                  !password.hasError &&
                  !email.hasError
                )
              }
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              id="post">
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={successfulPopup}>
        <DialogContent>
          <Box>
            <Typography component="h1" variant="h5">
              Successful registration
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
    </div>
  );
}
