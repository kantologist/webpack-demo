import React from 'react'; // eslint-disable-line no-unused-vars
import Post from '../post/post'; // eslint-disable-line no-unused-vars
import posts from '../../../blog-posts.json'; // eslint-disable-line no-unused-vars

const Home = () => (
<div>
  {posts.posts.map(post => <Post {...post} key={post.slug} titleLink/>)}
</div>
);

export default Home;
