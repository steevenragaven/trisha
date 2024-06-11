import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import Header from "../../components/Header";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleBlockUser = () => {
    console.log("Block user with id:", selectedUserId);
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    console.log("Delete user with id:", selectedUserId);
    handleMenuClose();
  };

  const columns = [
    { 
      field: "date_joined", 
      headerName: "Date Joined", 
      flex: 1, 
      cellClassName: "name-column--cell" 
    },
    { 
      field: "username", 
      headerName: "Username" 
    },
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "telephone_number",
      headerName: "Telephone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedUserId === row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleBlockUser}>Block</MenuItem>
            <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataUsers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
