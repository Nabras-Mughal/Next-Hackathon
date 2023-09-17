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
import { useState } from "react";
import Link from "next/link";
import Login from "../Login/page";

export default function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [loginData, setLoginData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = loginData;

  // Form Handle //
  const handleSubmit = async (event) => {
    // Post Data using Fetch //
    let insertUser = await fetch("http://localhost:3000/credentials", {
      method: "POST",
      body: JSON.stringify(loginData),
    });
    insertUser = await insertUser.json();

    event.preventDefault();
    console.log(JSON.stringify(loginData));
    setIsSucceed(true);
  };

  if (isSucceed) {
    return (
      <h1 className="text-7xl font-black text-emerald-700">
        Data Inserted Successfully
      </h1>
    );
  }

  return (
    <Box className="LoginContent">
      <Button variant="contained" onClick={(event) => setIsOpen(true)}>
        Signup
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Avatar>
          <LockIcon />
        </Avatar>
        <DialogTitle component="span">
          <Typography variant="h4">Sign Up</Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              className="w-1/2 "
              type="text"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(event) =>
                setLoginData({ ...loginData, firstName: event.target.value })
              }
              autoFocus
              required
            />
            <TextField
              className="w-1/2"
              type="text"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(event) =>
                setLoginData({ ...loginData, lastName: event.target.value })
              }
              required
            />
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
            <Login />
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
