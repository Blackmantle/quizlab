import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'features';
import IProps from './types';
import {
  Box,
  Typography,
  Link,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function Post({ data }: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentUserName = useSelector(selectors.currentUserName) as string;
  const dispatch = useDispatch();

  const { id: postId, username, body, likes } = data;
  const isCurrentUser = currentUserName === username;
  const isLikedByCurrentUser = likes.includes(currentUserName);

  function onDelete() {
    setIsDialogOpen(true);
  }

  function onDialogClose(isConfirmed?: boolean) {
    return () => {
      setIsDialogOpen(false);
      if (isConfirmed) {
        dispatch(actions.deletePost(postId));
        dispatch(actions.deleteUserPost({ username, postId }));
      }
    };
  }

  function onLike() {
    if (isLikedByCurrentUser) {
      dispatch(actions.deleteLike({ postId, username: currentUserName }));
    } else {
      dispatch(actions.addLike({ postId, username: currentUserName }));
    }
  }

  return (
    <Box
      position="relative"
      boxShadow={4}
      borderRadius={4}
      p={2}
    >
      <Link component={RouterLink} to={`/${username}`}>{username}</Link>
      <Box position="absolute" right={2} top={2}>
        {isCurrentUser && (
          <Tooltip title="Удалить">
            <IconButton color="primary" onClick={onDelete}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Нравится">
          <Checkbox
            name="like"
            color="primary"
            checked={isLikedByCurrentUser}
            onChange={onLike}
            icon={<FavoriteBorder color="primary" />}
            checkedIcon={<Favorite />}
          />
        </Tooltip>
      </Box>
      <Box my={2}>
        <Typography style={{ wordBreak: 'break-word' }}>{body}</Typography>
      </Box>
      {likes && likes.length > 0 && (
        <Box>
          <Typography component="span">Понравилось: </Typography>
          {likes.map((likedUsername, id) => (
            <Typography component="span" key={postId + likedUsername}>
              <Link component={RouterLink} to={`/${likedUsername}`}>{likedUsername}</Link>
              {id !== likes.length - 1 && ', '}
            </Typography>
          ))}
        </Box>
      )}
      <Dialog open={isDialogOpen} onClose={onDialogClose()}>
        <DialogTitle>Вы уверены, что хотите удалить этот пост?</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={onDialogClose(false)}>Отмена</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onDialogClose(true)}
            autoFocus
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Post;
