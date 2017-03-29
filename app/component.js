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
import styles from './main.css'; // eslint-disable-line no-unused-vars
import React from 'react'; // eslint-disable-line no-unused-vars
import Header from './components/header/header'; // eslint-disable-line no-unused-vars
import Post from './components/post/post'; // eslint-disable-line no-unused-vars
import About from './components/about/about'; // eslint-disable-line no-unused-vars
import NotFound from './components/notfound/notfound'; // eslint-disable-line no-unused-vars
import Home from './components/home/home';
import PostDetail from './components/postdetail/postdetail';
import posts from '../blog-posts.json';
import { BrowserRouter, Match, Miss } from 'react-router'; // eslint-disable-line no-unused-vars


// document.body.appendChild(component());

const App = () => (
  <BrowserRouter>
  <div >
    <Header />
    <div className={styles.container}>
    <Match exactly pattern='/webpack-demo/' component={ Home }/>
    <Match exactly pattern='/webpack-demo/about' component={ About }/>
    <Match exactly pattern='/webpack-demo/post/:slug' component={props =>{
      const post = posts.posts.filter(post => props.params.slug === post.slug);
      return < PostDetail post={post[0]} />;
    } }/>
    <Miss component={NotFound}/>
    </div>
  </div>
  </BrowserRouter>
);

export default App;
