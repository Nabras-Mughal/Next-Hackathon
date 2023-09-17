"use client";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Box,
  Grid,
  CardContent,
  CardActionArea,
  TextField,
  Skeleton,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Login from "./Login/page";
import { useEffect, useState } from "react";
import CardGUI from "./Components/CardGUI";
import AvatarMenu from "./Components/AvatarMenu";

// !Testing //

export default function Home() {
  const [blogsData, setBlogsData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userBlogs, setUserBlogs] = useState(null);
  const [OtherBlogs, setOtherBlogs] = useState(null);

  const [searchBlog, setsearchBlog] = useState("");
  let APIkey = `http://localhost:3000/BlogAdd`;

  useEffect(() => {
    fetch(APIkey, { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => setBlogsData(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, [APIkey]);

  let accountUser = localStorage.getItem("userCredentials");
  let parsedData = JSON.parse(accountUser);

  // console.log(`Account user : ${JSON.stringify(accountUser, null, 2)}`);
  useEffect(() => {
    if (parsedData) {
      setIsAuth(true);
    }
  }, [parsedData]);
  console.log(`Auth State : ${isAuth}`);

  useEffect(() => {
    // Filter blogs by author's _id

    if (blogsData && parsedData) {
      // blogsData.BlogGET
      const userBlogsFiltered = blogsData.BlogGET.filter(
        (blog) => blog.author === parsedData._id
      );
      setUserBlogs(userBlogsFiltered);

      // console.log(userBlogsFiltered);

      // // Filter other blogs
      const otherBlogsFiltered = blogsData.BlogGET.filter(
        (blog) => blog.author !== parsedData._id
      );
      console.log(otherBlogsFiltered);

      setOtherBlogs(otherBlogsFiltered);

      // Set all blogs
      // console.log(blogsData.BlogGET);

      // setBlogs(blogsData);
    }
  }, [blogsData]);
  // if (accountUser) {
  //   // acountUserID = accountUser
  //   console.log(JSON.parse(accountUser));
  // }

  console.log(parsedData);

  let AccountDetails = parsedData;

  let value = <Skeleton variant="rounded" />;

  if (blogsData) {
    value = blogsData.BlogGET;
  }
  // const blogArray = value.BlogGET || value;
  // console.log(value);

  // let arrayOfBlogs = blogsData ??  : arrayOfBlogs;
  console.log(userBlogs);
  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="HomePage bg-gray-500 h-screen flex flex-col"
    >
      <AppBar position="static" sx={{ display: "flex", alignItems: "center" }}>
        <Toolbar className="w-10/12">
          <Typography variant="h5">My Blog</Typography>
          <Box className="btnSection ml-auto flex flex-row justify-center items-center">
            <TextField
              type="search"
              className="mr-4"
              value={searchBlog}
              onChange={(event) => setsearchBlog(event.target.value)}
            />
            {!isAuth ? (
              <Login />
            ) : (
              <>
                <AvatarMenu />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {!isAuth ? (
        <Box className="flex justify-center pb-48 items-center h-screen ">
          <Typography
            variant="h5"
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Please Login to see Blog
          </Typography>
        </Box>
      ) : (
        <Box className="cardConatiner p-3 bg-gray-300">
          <Paper square={false} className="bg-gray-400">
            <Box display="flex" justifyContent="flex-start">
              <Typography
                variant="h5"
                sx={{ color: "black" }}
                // className="py-2 px-2 font-semibold text-white"
              >
                My Blog
              </Typography>
              {/* <Button
                variant="text"
                className="ml-auto mr-5 text-white font-semibold hover:font-bold"
              >
                See all
              </Button> */}
            </Box>
            {/* <Box className="cardContent flex flex-col content-center flex-wrap border-2 p-1"> */}
            <Grid container spacing={2}>
              {!blogsData && userBlogs ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                userBlogs &&
                userBlogs.map((content, index) => (
                  <CardGUI
                    key={content._id}
                    AccountDetails={AccountDetails}
                    content={content}
                  />
                ))
              )}
            </Grid>
            {/* </Box> */}
          </Paper>
          <Paper square={false} className="bg-gray-400 mt-4">
            <Box display="flex" justifyContent="flex-start">
              <Typography
                variant="h5"
                sx={{ color: "black" }}

                // className="py-2 px-2 font-normal text-white "
              >
                Others
              </Typography>
              {/* <Button
                variant="text"
                className="ml-auto mr-5 text-white font-semibold hover:font-bold"
              >
                See all
              </Button> */}
            </Box>
            {/* <Box className="cardContent flex flex-col content-center flex-wrap border-2 p-1"> */}
            <Grid container spacing={2}>
              {!OtherBlogs ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                OtherBlogs &&
                OtherBlogs.map((content, index) => (
                  <CardGUI
                    key={content._id}
                    AccountDetails={AccountDetails}
                    content={content}
                  />
                ))
              )}
            </Grid>
            {/* </Box> */}
          </Paper>
        </Box>
      )}
    </Box>
  );
}
