'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {noteSchema} from '@/shared/schemas/notes';
import TextInput from '@/shared/components/inputs/textInput';
import SelectInput from '@/shared/components/inputs/selectInput';
import {TAGS_ENUM} from '@/shared/constants/notes';
import {useEffect} from 'react';

const tagOptions = TAGS_ENUM.map((tag) => ({value: tag, label: tag}));

export default function CreateNoteDialog({open, onClose, onSubmit, editNote}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    handleSubmit,
    control,
    reset,
    formState: {isSubmitting},
  } = useForm({
    resolver: yupResolver(noteSchema),
    defaultValues: editNote || {title: '', content: '', tags: []},
  });

  // Reset form when opening/closing
  useEffect(() => {
    reset(editNote || {title: '', content: '', tags: []});
  }, [editNote, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      transitionDuration={300}
    >
      <DialogTitle sx={{borderBottom: 1, borderColor: 'divider', py: 2}}>
        {editNote ? 'Edit Note' : 'Create Note'}
      </DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}
      >
        <DialogContent
          sx={{
            flex: '1 1 auto',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            py: 3,
          }}
        >
          <TextInput
            control={control}
            label="Title"
            name="title"
            placeholder="Enter note title"
            fullWidth
            required
          />
          <TextInput
            control={control}
            label="Content"
            name="content"
            placeholder="Enter note content"
            multiline
            rows={4}
            fullWidth
          />
          <SelectInput
            control={control}
            label="Tags"
            name="tags"
            placeholder="Choose Tags"
            isMulti={true}
            options={tagOptions}
            fullWidth
          />
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: 'divider',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={onClose} variant="outlined" sx={{borderRadius: 8}}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            sx={{
              borderRadius: 8,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #0CA8F6 90%)',
              },
            }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={20} sx={{mr: 1}} color="inherit" />
                {editNote ? 'Updating...' : 'Creating...'}
              </>
            ) : editNote ? (
              'Update'
            ) : (
              'Create'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
