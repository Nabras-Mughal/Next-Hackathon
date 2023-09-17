"use client";
import { Box, Button, TextField, Typography, CardActions } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [mongoDBData, setMongoDBData] = useState(null);
  const [blog, setBlog] = useState({ title: "", description: "" });

  let activeID = params.UpdateBlog;

  let APIkey = `http://localhost:3000/BlogAdd/${activeID}`;

  useEffect(() => {
    fetch(APIkey, { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => setMongoDBData(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, [APIkey]);

  useEffect(() => {
    // setting Data //

    if (mongoDBData !== null) {
      // Destructuring previous Data //
      const { title, description } = mongoDBData.result;

      //  setting Data //
      setBlog({ title: title, description: description });
    }
  }, [mongoDBData]);

  // console.log(params.UpdateBlog);
  let value = mongoDBData !== null ? mongoDBData.result : "Fetching";

  console.log(value);
  // console.log(`Form Data : ${JSON.stringify(formFields, null, 2)}`);

  const router = useRouter();

  // useState Hooks Here //
  const { title, description } = blog;

  const handleSubmit = async (event) => {
    let updatedData = await fetch(APIkey, {
      method: "PUT",
      body: JSON.stringify(blog),
    });
    updatedData = await updatedData.json();
    if (mongoDBData.isConnected === true) {
    console.log("Updated");
    //   return <h1>Updated Successfully</h1>;
    }
    event.preventDefault();
    // await router.push("/Blog");
  };
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
              Update Blog
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
              Update Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
