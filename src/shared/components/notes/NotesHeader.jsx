'use client';

import {Box, Button, Typography} from '@mui/material';
import {FaPlus} from 'react-icons/fa';

export default function NotesHeader({onAdd}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Notes
      </Typography>
      <Button
        variant="contained"
        startIcon={<FaPlus />}
        onClick={onAdd}
        sx={{
          borderRadius: 8,
          px: 3,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #0CA8F6 90%)',
          },
        }}
      >
        Add Note
      </Button>
    </Box>
  );
}
