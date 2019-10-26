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
      imgRotate: true,
      height: utils.getMaxHeight(this.container),
      decalage: 0,
      timeTransition: 0.5,
      visible:5,
      itemsAlign: 'horizontal',
      btnPos: 0
    }, options);
    this.rotate = 180;
    this.img = this.el.getElementsByTagName('img')[0];
    this.btnText = this.el.textContent;
    this.initialHeight = this.container.offsetHeight;

    this.container.style.height = this.options.height + this.options.decalage + 'px';
    if(this.options.itemsAlign == 'vertical'){
      this.container.style.height = (this.options.visible * this.options.height) + this.options.decalage + 'px';
    }
    this.h = this.container.style.height;
   
    this.setTransition();
    this.addEventWithElement();
  }
  setTransition(){
    this.container.style.transition = this.options.timeTransition + 's height';
    this.container.children.forEach((item) => {
      item.style.transition = this.options.timeTransition + 's opacity';
    })
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
    let n = this.options.visible;
    this.container.style.height = this.initialHeight + "px";
    let intervalSee = setInterval(() => {
      this.container.children[n].style.opacity = '1';
      n++;
      if (n >= this.container.children.length) { clearInterval(intervalSee); }
    }, 50);
    this.el.innerHTML = this.options.btnSecondText;
    this.options.see = true;
  }
  hideComponent() {
    this.container.style.height = this.h;
    if(this.options.itemsAlign == 'horizontal'){
      this.container.children.forEach((item) => {
        if ((utils.getPos(item).y - 3) != utils.getPos(this.container).y) { item.style.opacity = '0'; }
      });
    }else{
      for(let n = 0; n < this.container.children.length; n++){
        if(n>this.options.visible){
          this.container.children[n].style.opacity = '0';
        };
      };
    };
    this.el.innerHTML = this.btnText;
    this.options.see = false;
  }
  rotateImg(){
    this.img.style.transform = 'rotate(' + this.rotate + 'deg)';
    this.rotate += 180;
    if(this.options.btnPos == 0){this.el.prepend(this.img);}
    if(this.options.btnPos == 1){this.el.append(this.img);}
  }
}
