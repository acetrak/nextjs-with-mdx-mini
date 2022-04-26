import * as React from 'react';
import { Card, CardActionArea, Container, Stack, Typography } from '@mui/material';
import NextImage from 'next/image';
import Link from '../components/Link';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';


function Home(props) {
  const { posts } = props;


  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h2" mb={3}>Blog</Typography>
        <>
          {
            posts.map(item => (
              <CardActionArea
                sx={{ mb: 2 }} key={item?.slug} component={Link} href={`/blog/[slug]`} linkAs={`/blog/${item?.slug}`}
              >

                <Card>
                  <Stack direction="row" alignItems="stretch">
                    <NextImage src={item.thumbnailUrl} width={260} height={200} />
                    <Stack sx={{ ml: 3, p: 1, flex: 1 }}>
                      <Typography variant="h6">
                        {item.title}
                      </Typography>

                      <Typography variant="body1">
                        {item.description}
                      </Typography>

                      <Typography sx={{ mt: 'auto' }} variant="body2" color="text.secondary">
                        {item.date}
                      </Typography>

                    </Stack>
                  </Stack>
                </Card>
              </CardActionArea>
            ))
          }
        </>
      </Container>
    </>
  );
}

export default Home;

export const getStaticProps = async () => {
  const posts = getAllPosts(['title', 'date', 'description', 'thumbnailUrl', 'tags', 'slug']);
  return {
    props: {
      posts,
    },
  };
};
