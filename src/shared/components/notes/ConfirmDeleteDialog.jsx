'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Fade,
} from '@mui/material';

export default function ConfirmDeleteDialog({open, onClose, onConfirm}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this note?</Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{display: 'block', mt: 1}}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{px: 3, pb: 3}}>
        <Button onClick={onClose} variant="outlined" sx={{borderRadius: 8}}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{borderRadius: 8}}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
