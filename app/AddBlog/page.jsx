"use client";
import { Box, Button, TextField, Typography, CardActions } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  // useState Hooks Here //
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    author: "",
    date: null,
  });
  const { title, description } = blog;

  let user_ID = localStorage.getItem("userCredentials");
  user_ID = JSON.parse(user_ID);

  let postingDate = new Date();
  postingDate.toISOString();

  const handleSubmit = async (event) => {
    if (user_ID && user_ID._id) {
      setBlog({ ...blog, author: user_ID._id, date: postingDate });
    }

    let addBlog = await fetch("http://localhost:3000/BlogAdd", {
      method: "POST",
      body: JSON.stringify(blog),
    });
    addBlog = await addBlog.json();

    // console.log(`Blog : ${JSON.stringify(blog, null, 2)}`);
    //
    event.preventDefault();
    // await router.push("/Blog");
  };

  console.log(blog);
  return (
    <>
      <Box
        component="div"
        className="AddBlogContainer flex flex-col items-center"
      >
        <Box className="AddblogContent w-10/12 bg-purple-300">
          <Box className="navBar bg-red-100 flex">
            <Typography
              variant="body2"
              className="text-2xl font-semibold"
              gutterBottom
            >
              Add New Blog
            </Typography>
          </Box>
          <Box
            className="body flex bg-red-50 flex-col py-3 px-2"
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              className="my-2"
              label="Title"
              value={title}
              onChange={(event) =>
                setBlog({ ...blog, title: event.target.value })
              }
              autoFocus
              required
            />
            <TextField
              className="my-2"
              label="Description"
              value={description}
              onChange={(event) =>
                setBlog({ ...blog, description: event.target.value })
              }
              autoFocus
              required
            />
            <Button variant="outlined" type="submit">
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
