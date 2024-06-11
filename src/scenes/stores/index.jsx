import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockDataStores } from "../../data/mockData";
import Header from "../../components/Header";

const Stores = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const handleMenuOpen = (event, storeId) => {
    setAnchorEl(event.currentTarget);
    setSelectedStoreId(storeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStoreId(null);
  };

  const handleEditStore = () => {
    console.log("Edit store with id:", selectedStoreId);
    handleMenuClose();
  };

  const handleDeleteStore = () => {
    console.log("Delete store with id:", selectedStoreId);
    handleMenuClose();
  };

  const columns = [
    { 
      field: "date_created", 
      headerName: "Date Created", 
      flex: 1, 
      cellClassName: "name-column--cell" 
    },
    { 
      field: "store_id", 
      headerName: "Store ID" 
    },
    {
      field: "store_name",
      headerName: "Store Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "manager_in_charge",
      headerName: "Manager In Charge",
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
      field: "email_address",
      headerName: "Email Address",
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
            open={Boolean(anchorEl) && selectedStoreId === row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditStore}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteStore}>Delete</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Stores" />
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
        <DataGrid checkboxSelection rows={mockDataStores} columns={columns} />
      </Box>
    </Box>
  );
};

export default Stores;
