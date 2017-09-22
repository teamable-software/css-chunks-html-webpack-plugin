import styles from './d.css';

const anchor = document.createElement('a');
anchor.className = styles.d;
anchor.innerText = 'Hi!';
anchor.href = 'https://github.com/mike1808/css-chunks-html-webpack-plugin';

document.body.appendChild(anchor);
