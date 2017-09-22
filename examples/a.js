import styles from './a.css';


const button = document.createElement('button');
button.className = styles.a;
button.innerText = 'load modules';
button.addEventListener('click', () => {
  button.innerText = 'loading...';
  import('./b.js')
    .then(() => {
      button.innerText = 'loaded';
    });
});

document.body.appendChild(button);


