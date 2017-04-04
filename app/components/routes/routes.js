// // import styles from './main.css';
//
// export default (text='Hello world. Enjoying web pack? cool') => {
//   const element = document.createElement('div');
//
//   element.innerHTML = text;
//   element.className = 'fa fa-hand-spock-o fa-lg';
//
//   element.onclick = () => {
//     import('./lazy').then((lazy) => {
//       element.textContent = lazy.default;
//     }).catch((err) => {
//       console.error(err);
//     });
//   };
//
//   return element;
// };


// import component from './component';
import styles from '../../main.css'; // eslint-disable-line no-unused-vars
import React from 'react'; // eslint-disable-line no-unused-vars
import Header from '../header/header'; // eslint-disable-line no-unused-vars
import Post from '../post/post'; // eslint-disable-line no-unused-vars
import About from '../about/about'; // eslint-disable-line no-unused-vars
import NotFound from '../notfound/notfound'; // eslint-disable-line no-unused-vars
import Home from '../home/home';
import PostDetail from '../postdetail/postdetail';
import posts from '../../../blog-posts.json';
import { Route, Switch } from 'react-router-dom'; // eslint-disable-line no-unused-vars


// document.body.appendChild(component());

const Routes = () => (
  <Switch>
    <Route exact path='/webpack-demo/' component={ Home }/>
    <Route path='/webpack-demo/about' component={ About }/>
    <Route path='/webpack-demo/post/:slug' component={props =>{
      const post = posts.posts.filter(post => props.match.params.slug === post.slug);
      return < PostDetail post={post[0]} />;
    } }/>
    <Route component={NotFound}/>
  </Switch>
);

export default Routes;
