/* -----------------------------------------
Button Component
----------------------------------------- */

/* -------------------
Imports
------------------- */

/* -------------------
Module
------------------- */
export default class Button {
  constructor(el) {
    this.el = el;
    this.initHandlers();
  }

  initHandlers() {
    this.el.addEventListener('click', () => {});
  }
}
