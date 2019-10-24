import Utils from './Utils';
let utils = new Utils();

export default class Search {
  constructor(el, component, options = {}) {
    this.el = el;
    this.component = component;
    this.options = Object.assign({}, {
      event: 'keyup',
    }, options);
    

    this.addEventOnElement();
  }
  addEventOnElement() {
    this.el.addEventListener(this.options.event, this.filterInput.bind(this));
  }
  filterInput() {
    let filter = this.el.value.toUpperCase();

    //*
    this.component.style.height = 'auto';

    if (filter == "") {
      this.component.style.height = 3 + utils.getMaxHeight(this.component) + "px";
      this.component.children.forEach((item) => {
        if ((utils.getPos(item).y - 3) != utils.getPos(this.component).y) { item.style.opacity = '0'; }
        item.style.transition = '0.5s all';
      });
    }
    
    for (let i = 0; i < this.component.children.length; i++) {
      let title = this.component.children[i].getElementsByClassName("content__title")[0];
      let value = title.textContent || title.innerText;
      if (value.toUpperCase().indexOf(filter) > -1) {
        this.component.children[i].style.display = "";
        this.component.children[i].style.opacity = "1";
      } else {
        this.component.children[i].style.display = "none";
      }
    }
  }
}