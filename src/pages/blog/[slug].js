import * as React from 'react';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { getAllPosts, getPostBySlug } from '../../lib/api';
import Button from '../../components/MyButton';
import NextImage from 'next/image';
import Head from 'next/head';

function Blog(props) {


  const { content, title, thumbnailUrl, date, tags } = props;


  return (

    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <NextImage src={thumbnailUrl} layout="responsive" width={200} height={110} />

        <Typography variant="h3" mt={2}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{date}</Typography>
        <Box sx={{ mt: 2, mb: 4 }}>
          <MDXRemote {...content} components={{ Button, SyntaxHighlighter }} />


        </Box>

        <Stack direction="row" spacing={2}>
          <Typography>tags:</Typography>
          {
            tags.map(item => <Chip key={item} label={item} />)
          }

        </Stack>

      </Container>
    </>

  );
}

export default Blog;


export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {

  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'tags',
    'content',
    'thumbnailUrl',
  ]);


  const mdx = await serialize(post.content);


  return {
    props: {
      ...post,
      content: mdx,
    },
  };
};
