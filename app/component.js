// import styles from './main.css';

export default (text='Hello world. Enjoying web pack? cool') => {
  const element = document.createElement('div');

  element.innerHTML = text;
  element.className = 'fa fa-hand-spock-o fa-lg';

  return element;
};
