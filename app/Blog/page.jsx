"use client";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Skeleton,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";

export default function Page() {
  const [blogData, setBlogData] = useState(null);
  const [userBlog, setUserBlog] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/BlogAdd", { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  let accountUser = localStorage.getItem("userCredentials");
  let parsedData = JSON.parse(accountUser);

  useEffect(() => {
    if (blogData) {
      const userBlogsFiltered = blogData.BlogGET.filter(
        (blog) => blog.author === parsedData._id
      );
      setUserBlog(userBlogsFiltered);
    }
  }, [blogData]);

  let nowUsingTernery = !blogData ? (
    <Skeleton variant="rounded" />
  ) : (
    blogData.BlogGET[0]
  );

  let value = <Skeleton variant="rounded" />;

  if (blogData !== null) {
    value = blogData.BlogGET;
  }
  // const blogArray = value.BlogGET || value;
  console.log(value);
  // console.log(JSON.stringify(blogData, null, 2));
  return (
    <Box component="div" className="BlogContainer flex flex-col items-center">
      <Box className="blogContent w-10/12 bg-teal-100">
        <Box className="navBar bg-red-100 flex items-center py-4">
          <Typography variant="h6" className="font-bold my-4 ">
            Dashboard
          </Typography>
          <Box component="span" className="ml-auto">
            <Link
              href="/AddBlog"
              className="py-2 px-1 bg-red-200 mr-4 font-semibold rounded-md"
            >
               Add Blog
            </Link>
          </Box>
        </Box>
        <Grid container>
          {!userBlog ? (
            <Skeleton variant="rounded" height={200} />
          ) : (
            userBlog.map((content) => (
              <CardComponent key={content._id} content={content} />
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
