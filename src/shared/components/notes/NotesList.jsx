'use client';

import {
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Typography,
  Chip,
  Box,
  Tooltip,
  useTheme,
  alpha,
  Grow,
} from '@mui/material';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {TAG_COLORS} from '@/shared/constants/notes';

export default function NotesList({notes, onEdit, onDelete}) {
  const theme = useTheme();

  return (
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
                          bgcolor: TAG_COLORS[tag] || TAG_COLORS.default,
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
                    onClick={() => onEdit(note)}
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
                    onClick={() => onDelete(note._id)}
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
  );
}
