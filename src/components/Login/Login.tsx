import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'features';
import { FormData } from './types';
import {
  Box,
  Typography,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';

function Login() {
  const { register, handleSubmit, errors, formState } = useForm<FormData>({ mode: 'all' });
  const usersMap = useSelector(selectors.usersMap);
  const currentUserName = useSelector(selectors.currentUserName);
  const dispatch = useDispatch();

  if (currentUserName) {
    return <Redirect to={`/${currentUserName}`} />;
  }

  function onSubmit(data: FormData) {
    const existingUser = usersMap[data.username];

    if (existingUser) {
      dispatch(actions.setCurrentUserName(existingUser.username));
      return;
    }

    dispatch(actions.addUser(data));
    dispatch(actions.setCurrentUserName(data.username));
  }

  const { isDirty, isValid } = formState;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography align="center" variant="h4">Авторизация</Typography>
      <Box my={2}>
        <TextField
          fullWidth
          error={!!errors.username}
          name="username"
          label="Введите имя"
          variant="outlined"
          inputRef={register({
            required: 'Обязательное поле!',
            pattern: {
              value: /[А-Яа-яA-Za-z0-9_-]{3,12}$/,
              message: 'Неверный формат!',
            },
            minLength: {
              value: 3,
              message: 'Минимум 3 символа!',
            },
            maxLength: {
              value: 12,
              message: 'Максимум 12 символов!',
            },
          })}
        />
        {errors.username && <FormHelperText error>{errors.username.message}</FormHelperText>}
      </Box>
      <div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
}

export default Login;
