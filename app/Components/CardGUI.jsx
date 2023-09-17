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
  // const { AccountDetails, content } = props;

  console.log(content);
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
  // const {
  //   userDetails: { _id },
  // } = user;
  // console.log(_id);

  // let ans = user.userDetails ?? null;

  const { author } = content;

  // console.log(ans);

  // console.log(content.author);
  // if (userDetails._id === content.author) {
  //   console.log(content.title);
  // }

  console.log(content.author == AccountDetails._id);

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

  // return (

  //   <>
  //     {/* <Typography variant="h4">{content.firstName} {content.LastName}</Typography> */}

  //     {AccountDetails._id != content.author ? null : ( // </Typography> //   {/* {content.firstName} {content.LastName} */} //   win // <Typography variant="h4">
  //       <Card
  //         sx={{
  //           width: "50%",
  //           margin: "5px",
  //           padding: "5px",
  //           display: "flex",
  //           flexDirection: "column",
  //         }}
  //       >
  //         <CardActionArea>
  //           <CardContent>
  //             <Typography
  //               variant="h5"
  //               component="h5"
  //               className="font-semibold"
  //               gutterBottom
  //             >
  //               {content.title}
  //             </Typography>
  //             <Typography variant="body1">{content.description}</Typography>
  //           </CardContent>
  //         </CardActionArea>
  //       </Card>
  //     )}
  //   </>
  // );
}

{
  /* <CardActions sx={{ marginTop: "auto" }}> */
}
{
  /* <Link
        href={`/Blog/${content._id}`}
        className="w-1/2 bg-green-300 hover:bg-green-400 px-5 py-2 rounded-md font-semibold shadow-lg text-center"
      >
        Edit
      </Link> */
}
{
  /* <Button
        variant="contained"
        color="secondary"
        onClick={() => alert(content._id)}
      > */
}
{
  /* Edit
      </Button> */
}
{
  /* <Button
        variant="contained"
        color="error"
        className="w-1/2 bg-red-300 hover:bg-red-400 px-5 py-2 rounded-md font-semibold shadow-lg text-center text-slate-900"
        onClick={() => handleDelete(content._id)}
      >
        Delete
      </Button> */
}
{
  /* </CardActions> */
}

// {ans._id === content.author ? (
//   <Typography variant="h4">
//     yes
//     {/* {content.firstName} {content.LastName} */}
//   </Typography>
// ) : (
//   null

{
  /* <Card
          sx={{
            width: "50%",
            margin: "5px",
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
        </Card> */
}

// Render other blogs
// <Card
//   sx={{
//     width: "50%",
//     margin: "5px",
//     padding: "5px",
//     display: "flex",
//     flexDirection: "column",
//   }}
// >
//   <CardActionArea>
//     <CardContent>
//       <Typography
//         variant="h5"
//         component="h5"
//         className="font-semibold"
//         gutterBottom
//       >
//         {content.title}
//       </Typography>
//       <Typography variant="body1">{content.description}</Typography>
//     </CardContent>
//   </CardActionArea>
// </Card>
