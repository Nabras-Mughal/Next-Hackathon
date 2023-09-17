import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";

export default function AvatarMenu() {
  let router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DashboardHandler = (event) => {
    router.push("/Blog");
    console.log(event.target.value);
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userCredentials");
    setAnchorEl(null);
    window.location.reload();
  };

  return (
    <div>
      <IconButton
        aria-label="options"
        aria-controls="avatar-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar sizes="large">
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={DashboardHandler}>Dashboard</MenuItem>
        {/* <MenuItem onClick={handleClose}>Option 2</MenuItem> */}
        <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
      </Menu>
    </div>
  );
}

// const AvatarDropdown = () => {
//   };
