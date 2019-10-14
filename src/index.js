/* eslint-disable import/first, no-new */

/* -------------------
Styles
------------------- */
import './styles/style.scss';

/* -------------------
Layouts
------------------- */


/* -------------------
Components
------------------- */
import Button from './js/components/Button';

Array.from(document.body.querySelectorAll('.button')).forEach((button) => {
  new Button(button);
});

