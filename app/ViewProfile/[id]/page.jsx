"use client";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [getApiData, setGetApiData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  let apiKey = `http://localhost:3000/credentials/${params.id}`;

  useEffect(() => {
    fetch(apiKey, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setGetApiData(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, [apiKey]);

  useEffect(() => {
    if (getApiData && getApiData.result) {
      const { firstName, LastName, email, password } = getApiData.result;
      setFormData({
        ...formData,
        firstName,
        LastName,
        email,
        password,
      });
    }
  }, [getApiData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    let callPutApi = await fetch(apiKey, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    callPutApi = await callPutApi.json();
    e.preventDefault();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Update Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="LastName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

// export default function Page({ params }) {
//   console.log(params.id);
//   return <div>My Post: {params.id}</div>;
// }
