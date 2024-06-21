import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${currentRow.productid}`);
      setProducts(products.filter((product) => product.productid !== currentRow.productid));
      setOpenDialog(false);
    } catch (error) {
      console.error('There was an error deleting the product!', error);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedProduct = {
        name: currentRow.name,
        categoryid: currentRow.categoryid,
        price: currentRow.price,
        stockquantity: currentRow.stockquantity,
        productimage: currentRow.productimage,
        shop: currentRow.shop,
      };
      const response = await axios.put(`http://localhost:5000/products/${currentRow.productid}`, updatedProduct);
      setProducts(products.map((product) => (product.productid === currentRow.productid ? response.data : product)));
      setOpenDialog(false);
    } catch (error) {
      console.error('There was an error updating the product!', error);
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
      field: 'productid',
      headerName: 'Product ID',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      editable: true,
    },
    {
      field: 'categoryid',
      headerName: 'Category ID',
      headerAlign: 'left',
      align: 'left',
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      editable: true,
    },
    {
      field: 'stockquantity',
      headerName: 'Stock Quantity',
      flex: 1,
      editable: true,
    },
    {
      field: 'productimage',
      headerName: 'Product Image',
      flex: 1,
      editable: true,
    },
    {
      field: 'shop',
      headerName: 'Shop',
      flex: 1,
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
      <Header title="Products" />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-product')}
          sx={{
            backgroundColor: colors.blueAccent[700],
            '&:hover': {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          Add Product
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={products}
          columns={columns}
          getRowId={(row) => row.productid}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'delete' ? 'Confirm Delete' : 'Confirm Edit'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === 'delete' ? 'Are you sure you want to delete this product?' : 'Are you sure you want to save changes to this product?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={dialogType === 'delete' ? handleDelete : handleEdit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
