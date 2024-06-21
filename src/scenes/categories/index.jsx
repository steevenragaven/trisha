import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('There was an error fetching the categories!', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:5000/categories/${currentRow.categoryid}`);
      setCategories(categories.filter((category) => category.categoryid !== currentRow.categoryid));
      setOpenDialog(false);
    } catch (error) {
      console.error('There was an error deleting the category!', error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const updatedCategory = {
        name: currentRow.name,
        itemimage: currentRow.itemimage,
      };
      const response = await axios.put(`http://localhost:5000/categories/${currentRow.categoryid}`, updatedCategory);
      setCategories(categories.map((category) => (category.categoryid === currentRow.categoryid ? response.data : category)));
      setOpenDialog(false);
    } catch (error) {
      console.error('There was an error updating the category!', error);
    }
  };

  const handleDialogOpen = (type, row) => {
    setDialogType(type);
    setCurrentRow(row);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const processRowUpdate = async (newRow) => {
    handleDialogOpen('edit', newRow);
    return newRow;
  };

  const columns = [
    { 
      field: "categoryid", 
      headerName: "Category ID",
      flex: 1,
      cellClassName: "name-column--cell" 
    },
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "itemimage",
      headerName: "Item Image",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <img src={row.itemimage} alt="category" style={{ width: 50, height: 50, objectFit: "cover" }} />
        </Box>
      ),
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around" width="100%">
          <IconButton color="primary" onClick={() => handleDialogOpen('edit', params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDialogOpen('delete', params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Categories" />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create-category")}
          sx={{
            backgroundColor: colors.blueAccent[700],
            '&:hover': {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          Add Category
        </Button>
      </Box>
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
        <DataGrid
          checkboxSelection
          rows={categories}
          columns={columns}
          getRowId={(row) => row.categoryid}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'delete' ? 'Confirm Delete' : 'Confirm Edit'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === 'delete' ? 'Are you sure you want to delete this category?' : 'Are you sure you want to save changes to this category?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={dialogType === 'delete' ? handleDeleteCategory : handleEditCategory} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
