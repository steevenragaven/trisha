import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const categoryData = {
      categoryName,
      itemImage,
    };

    try {
      const response = await axios.post('http://localhost:3000/categories', categoryData);
      console.log(response.data);
      // Reset form fields after successful submission
      setCategoryName('');
      setItemImage('');
      navigate('/'); // Navigate back to categories or another page after submission
    } catch (error) {
      console.error('There was an error creating the category!', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setItemImage(file.name); // Assuming you want to store the file name
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
        Create New Category
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
          label="Category Name"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          margin="normal"
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            Upload Image
          </Button>
        </label>
        {itemImage && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {itemImage}
          </Typography>
        )}
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
          Create Category
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Category Creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create this category with the name "{categoryName}"?
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

export default CreateCategory;
