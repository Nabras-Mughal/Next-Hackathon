"use client";
import {
  Avatar,
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Signup from "../Signup/page";

export default function Login() {
  const router = useRouter();

  // use States Hooks //
  const [isOpen, setIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [userDetails, setUserDetails] = useState(null);
  const [userCredentials, setUserCredentials] = useState(null);
  const { email, password } = loginData;

  let APIKey = "http://localhost:3000/credentials";

  useEffect(() => {
    // cache: "no-cache"
    fetch(APIKey, {})
      .then((response) => response.json())
      .then((data) => setUserCredentials(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, [APIKey]);

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userCredentials", JSON.stringify(userDetails));
    }
  }, [userDetails]);
  
  // ChatGPT Form Handler //

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (!userCredentials || !userCredentials.userCredentialsGET) {
      console.error("User credentials not available.");
      return;
    }

    const match = userCredentials.userCredentialsGET.find(
      (value) => email === value.email && password === value.password
    );

    if (match) {
      setUserDetails(match);
      setIsOpen(false);
      // Optionally, you can navigate to another page using the router
      // router.push("/");
    } else {
      console.error("Invalid credentials");
    }

    console.log(loginData);
  };

  console.log(userDetails);

  // if (isSucess) {
  //   return <h1 className="text-5xl">Welcome</h1>;
  // }

  return (
    <Box className="LoginContent">
      <Button
        variant="contained"
        sx={{ background: "green" }}
        onClick={(event) => setIsOpen(true)}
      >
        Login
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="items-center"
      >
        <Box component="div" className="bg-red-500">
          <Avatar sizes="4">
            <LockIcon />
          </Avatar>
          <DialogTitle component="span">
            <Typography variant="h4">Login</Typography>
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="my-4 items-center"
              sx={{ alignItems: "center" }}
              noValidate
            >
              <TextField
                className="py-2"
                type="email"
                label="Email Address"
                id="email"
                name="email"
                onChange={(event) =>
                  setLoginData({ ...loginData, email: event.target.value })
                }
                value={email}
                fullWidth
                autoFocus
                required
              />
              <TextField
                className="py-2"
                type="password"
                label="Password"
                id="password"
                name="password"
                value={password}
                onChange={(event) =>
                  setLoginData({ ...loginData, password: event.target.value })
                }
                fullWidth
                required
              />
              <Signup />
              <Button
                type="submit"
                variant="contained"
                className="bg-blue-400"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </DialogContent>
        </Box>
        {/* <DialogActions>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
// () => setIsOpen(true)
