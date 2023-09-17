"use client";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from "@mui/material";
import Link from "next/link";

export default function CardComponent({ content }) {
  const handleDelete = async (id) => {
    let deleteAPI;
    try {
      deleteAPI = await fetch(`http://localhost:3000/BlogAdd/${id}`, {
        method: "DELETE",
      });
      deleteAPI = await deleteAPI.json();
    } catch (error) {
      throw new Error(error);
    }
    if (deleteAPI.message === "Deleted") {
      alert(id);
      location.reload();
      console.log("Deleted Successfully");
    }
  };
  console.log(content);
  return (
    <Card
      sx={{
        width: "250px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            variant="h5"
            component="h5"
            className="font-semibold"
            gutterBottom
          >
            {content.title}
          </Typography>
          <Typography variant="body1">{content.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ marginTop: "auto" }}>
        <Link
          href={`/Blog/${content._id}`}
          className="w-1/2 bg-green-300 hover:bg-green-400 px-5 py-2 rounded-md font-semibold shadow-lg text-center"
        >
          Edit
        </Link>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => alert(content._id)}
        > */}
        {/* Edit
        </Button> */}
        <Button
          variant="contained"
          color="error"
          className="w-1/2 bg-red-300 hover:bg-red-400 px-5 py-2 rounded-md font-semibold shadow-lg text-center text-slate-900"
          onClick={() => handleDelete(content._id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
