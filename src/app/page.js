'use client';

import {useEffect, useState} from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Tooltip,
  useTheme,
  alpha,
  Grow,
} from '@mui/material';
import useApi from '@/shared/hooks/useApi';
import {toast} from 'react-hot-toast';
import {FaEdit, FaTrash, FaPlus} from 'react-icons/fa';
import {TAG_COLORS} from '@/shared/constants/notes';
import CreateNoteDialog from '@/shared/components/notes/CreateNoteDialog';
import ConfirmDeleteDialog from '@/shared/components/notes/ConfirmDeleteDialog';

// Tag color mapping

export default function NotesPage() {
  const theme = useTheme();
  const {callApi} = useApi();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await callApi({url: 'notes'});
      setNotes(res);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch notes');
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editNote) {
        const updatedNote = await callApi({
          url: `notes/${editNote._id}`,
          method: 'PATCH',
          body: data,
        });

        setNotes(
          notes.map((note) => (note._id === editNote._id ? updatedNote : note))
        );

        toast.success('Note updated successfully');
      } else {
        const newNote = await callApi({
          url: 'notes',
          method: 'POST',
          body: data,
        });

        setNotes([newNote, ...notes]);
        toast.success('Note created successfully');
      }
      setOpen(false);

      setEditNote(null);
    } catch (err) {
      toast.error('Operation failed. Please try again.');
    }
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await callApi({url: `notes/${confirmDeleteId}`, method: 'DELETE'});
      setNotes(notes.filter((note) => note._id !== confirmDeleteId));
      toast.success('Note deleted successfully');
      setConfirmDeleteId(null);
    } catch (err) {
      toast.error('Delete failed. Please try again.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'light'
            ? 'linear-gradient(to right bottom, #f5f7fa, #f8f9fb)'
            : 'linear-gradient(to right bottom, #1a1a2e, #16213e)',
        pt: 2,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          }}
        >
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
              onClick={() => {
                setOpen(true);
                setEditNote(null);
              }}
              sx={{
                borderRadius: 8,
                px: 3,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                '&:hover': {
                  background:
                    'linear-gradient(45deg, #1976D2 30%, #0CA8F6 90%)',
                },
              }}
            >
              Add Note
            </Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {notes.map((note, index) => (
                <Grid item xs={12} sm={6} md={4} key={note._id}>
                  <Grow in={true} timeout={(index + 1) * 200}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <CardContent sx={{flexGrow: 1}}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontWeight: 'bold',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {note.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {note.content}
                        </Typography>
                        {note.tags?.length > 0 && (
                          <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                            {note.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  bgcolor:
                                    TAG_COLORS[tag] || TAG_COLORS.default,
                                  color: '#fff',
                                  fontSize: '0.7rem',
                                  height: 24,
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </CardContent>
                      <Divider />
                      <CardActions sx={{justifyContent: 'flex-end', p: 1}}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            onClick={() => handleEdit(note)}
                            size="small"
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                              },
                            }}
                          >
                            <FaEdit size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setConfirmDeleteId(note._id)}
                            sx={{
                              '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                              },
                            }}
                          >
                            <FaTrash size={16} />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>

      <CreateNoteDialog
        open={open}
        onClose={() => setOpen(false)}
        editNote={editNote}
        onSubmit={onSubmit}
      />

      <ConfirmDeleteDialog
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
