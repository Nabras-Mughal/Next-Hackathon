"use client";
import {
  Button,
  Card,
  Grid,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from "@mui/material";
import Link from "next/link";

export default function CardComponent({ content }) {
  // console.log(content);
  // useState hooks //

  //   const handleDelete = async (id) => {
  //     let deleteAPI;
  //     try {
  //       deleteAPI = await fetch(`http://localhost:3000/BlogAdd/${id}`, {
  //         method: "DELETE",
  //       });
  //       deleteAPI = await deleteAPI.json();
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //     if (deleteAPI.message === "Deleted") {
  //       alert(id);
  //       location.reload();
  //       console.log("Deleted Successfully");
  //     }
  //   };

  // useEffect(() => {
  //   if (userDetails) {
  //   }
  // }, [userDetails]);
  // Render blogs written by the same user

  // console.log(localStorage.getItem("userCredentials"));

  let AccountDetails = localStorage.getItem("userCredentials");
  if (AccountDetails) {
    AccountDetails = JSON.parse(AccountDetails);
    // console.log(AccountDetails);
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ background: "rgb(226 226 226 / 70%)" }}>
          <CardContent>
            <Typography variant="h6">{content.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {content.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
