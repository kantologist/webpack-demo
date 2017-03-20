export default (text='Hello world. Enjoying web pack? cool') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
};
