import React from 'react';
import IProps from './types';
import { Box, Typography } from '@material-ui/core';
import Post from 'components/Post';

function Posts({ posts }: IProps) {
  return (
    <Box my={5}>
      {posts.length > 0 ? (
        posts.map((data) => (
          <Box mt={2} key={data.id}>
            <Post data={data} />
          </Box>
        ))
      ) : (
        <Typography align="center">Нет постов</Typography>
      )}
    </Box>
  );
}

export default Posts;
