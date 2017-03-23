import React from 'react'; // eslint-disable-line no-unused-vars

import styles from './post.css'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

const Post = (props) => (
  <div>
    <h2 className={styles.title}>
    {props.titleLink
      ?<Link className={styles.link} to={`/post/${props.slug}`}>{props.title}</Link>
      : props.title}
    </h2>
    <p className={styles.content}>{props.excerpt} </p>
  </div>
);

export default Post;
