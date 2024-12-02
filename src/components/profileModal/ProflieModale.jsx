import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupSlice } from '../../redux/popupSlice/popupSlice';
import { Link } from 'react-router-dom';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const dispatch = useDispatch()
  const {popup} = useSelector((state)=>state.popupSlice)

  const handleClickOpen = () => {
    dispatch(setPopupSlice(true))
    
  };
  const handleClose = () => {
    
    dispatch(setPopupSlice(false))

  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={popup}
      >
        <DialogTitle className='text-regal-green' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Успешно оплачено
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          Вы успешно оплатили заказ для получения товара можете забрать товар из магазина или заказать доставку.


          </Typography>
          <Typography gutterBottom>
          Самовывоз:
Область Ош, улица Касымбекова, дом 8б
          </Typography>
          <Typography gutterBottom>
          Доставка:
          Для доставки можете написать нашим менеджерам в Ватсапп: <Link className='text-blue-500' to="https://api.whatsapp.com/send?phone=996551868080">996551868080
          </Link>
          </Typography>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
