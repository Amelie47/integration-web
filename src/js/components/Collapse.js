import Utils from './Utils';
let utils = new Utils();

export default class Collapse{
  constructor(el, container, options = {}) {
    this.el = el;
    this.container = container;
    this.options = Object.assign({}, {
      event: 'click',
      see: false,
      btnSecondText: this.el.innerHTML,
      imgRotate: true 
    }, options);
    this.rotate = 180;
    this.img = this.el.getElementsByTagName('img')[0];
    this.btnText = this.el.textContent;
    this.initialHeight = this.container.offsetHeight;

    this.container.style.height = 3 + utils.getMaxHeight(this.container) + "px";

    this.addEventWithElement();
  }
  addEventWithElement() {
    this.el.addEventListener(this.options.event, this.move.bind(this));
  }
  move() {
    this.el.innerHTML = '';
    switch (this.options.see) {
      case true: this.hideComponent(); break;
      case false: this.seeComponent(); break;
    }
    if(this.options.imgRotate) this.rotateImg();
  }
  seeComponent() {
    let n = 5;
    this.container.style.height = this.initialHeight + "px";
    let intervalSee = setInterval(() => {
      this.container.children[n].style.opacity = '1';
      n++;
      if (n >= this.container.children.length - 1) { clearInterval(intervalSee); }
    }, 50);
    this.el.innerHTML = 'Voir 5 modèles';
    this.options.see = true;
  }
  hideComponent() {
    this.container.style.height = 3 + utils.getMaxHeight(this.container) + "px";
    this.container.children.forEach((item) => {
      if ((utils.getPos(item).y - 3) != utils.getPos(this.container).y) { item.style.opacity = '0'; }
    });
    this.el.innerHTML = this.btnText;
    this.options.see = false;
  }
  rotateImg(){
    this.img.style.transform = 'rotate(' + this.rotate + 'deg)';
    this.rotate += 180;
    this.el.prepend(this.img);
  }
}
