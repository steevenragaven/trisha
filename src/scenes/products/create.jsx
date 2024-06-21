import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [productImage, setProductImage] = useState('');
  const [shop, setShop] = useState('');
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleSubmit = async () => {
    const productData = {
      name: productName,
      categoryid: parseInt(categoryId),
      price: parseFloat(price),
      stockquantity: parseInt(stockQuantity),
      productimage: productImage,
      shop: shop,
    };
    try {
      const response = await axios.post('http://localhost:5000/products', productData);
      console.log(response.data);
      // Reset form fields after successful submission
      setProductName('');
      setCategoryId('');
      setPrice('');
      setStockQuantity('');
      setProductImage('');
      setShop('');
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleClickOpen();
        }}
        sx={{ width: '100%', maxWidth: 500 }}
      >
        <TextField
          fullWidth
          label="Product Name"
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryid} value={category.categoryid}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stock Quantity"
          variant="outlined"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Image URL"
          variant="outlined"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Shop"
          variant="outlined"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Product Creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create this product with the name "{productName}" and price "{price}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddProductForm;
