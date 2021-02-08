import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actions } from 'features';
import { nanoid } from '@reduxjs/toolkit';
import IProps, { FormData } from './types';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  FormHelperText,
} from '@material-ui/core';

function AddPostDialog({ username, isOpen, onClose }: IProps) {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const dispatch = useDispatch();

  function addPost(data: FormData) {
    const postId = nanoid();
    dispatch(actions.addPost({
      username,
      id: postId,
      body: data.postBody,
      date: Date.now(),
    }));
    dispatch(actions.addUserPost({ username, postId }));
    onClose();
  }

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogContent>
        <form id="postBodyForm" onSubmit={handleSubmit(addPost)}>
          <TextField
            name="postBody"
            label="Введите текст поста"
            error={!!errors.postBody}
            inputRef={register({
              validate: {
                minLength: (value: string) => (
                  value.trim().length >= 10 || 'Минимум 10 символов!'
                ),
                maxLength: (value: string) => (
                  value.trim().length <= 1000 || 'Максимум 1000 символов!'
                ),
              },
              setValueAs: (value: string) => value.trim(),
            })}
            multiline
            fullWidth
            autoFocus
          />
          {errors.postBody && <FormHelperText error>{errors.postBody.message}</FormHelperText>}
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Отмена</Button>
        <Button
          type="submit"
          form="postBodyForm"
          variant="contained"
          color="primary"
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPostDialog;
