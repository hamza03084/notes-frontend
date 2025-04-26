'use client';

import {useEffect, useState} from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import useApi from '@/shared/hooks/useApi';
import {toast} from 'react-hot-toast';
import CreateNoteDialog from '@/shared/components/notes/CreateNoteDialog';
import ConfirmDeleteDialog from '@/shared/components/notes/ConfirmDeleteDialog';
import NotesList from '@/shared/components/notes/NotesList';
import NotesHeader from '@/shared/components/notes/NotesHeader';

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

        setNotes([...notes, newNote]);
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
          <NotesHeader
            onAdd={() => {
              setOpen(true);
              setEditNote(null);
            }}
          />

          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress />
            </Box>
          ) : (
            <NotesList
              notes={notes}
              onEdit={handleEdit}
              onDelete={(id) => setConfirmDeleteId(id)}
            />
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
