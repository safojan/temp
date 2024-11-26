import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, TextField, Button, Typography } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const fields = { title, details, date, adminID };
  const address = 'Notice';

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="background.default" 
      p={3}
    >
      <Box
        component="form"
        onSubmit={submitHandler}
        display="flex"
        flexDirection="column"
        gap={3}
        width={{ xs: '100%', sm: '400px' }}
        bgcolor="white"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        borderRadius={2}
        p={4}
      >
        <Typography variant="h5" align="center" fontWeight="bold">
          Add Notice
        </Typography>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <TextField
          label="Details"
          variant="outlined"
          fullWidth
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          required
        />

        <TextField
          label="Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <Button
          variant="contained"
          type="submit"
          disabled={loader}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            },
          }}
        >
          {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
        </Button>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddNotice;
