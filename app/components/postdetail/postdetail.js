import React from 'react';
import Post from '../post/post';


const PostDetail = (props) => (
  <div>
    {console.log(props)}
    <Post {...props.post}/>
  </div>
);


export default PostDetail;
