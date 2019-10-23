
import './styles/style.scss';
import Button from './js/components/Button';
import Slider from './js/components/Slider';
require('./js/tools.js')();
// require('./js/slider.js').default();

Array.from(document.body.querySelectorAll('.button')).forEach((button) => {
  new Button(button);
});

ajax('./src/assets/models/models.json', {}, function (datas) {

  let slider_auto_entete = document.getElementById('slider-auto-entete');
  let slider_best_seller = document.getElementById('slider-best-seller');
  let section_entete = document.getElementById('entete');
  let slider_nouveautes = document.getElementById('slider_nouveautes');
  let first_products = document.getElementById('first-products');
  let all_products = document.getElementById('all-products');

  //==================================
  //SLIDER AUTO ENTETE
  //==================================
  for (let item of datas) {
    if (item.hero == true) {
      slider_auto_entete.appendChild(getProduct(item, section_entete));
    }
  }
  let sliderentete = new Slider(slider_auto_entete, {
    slidesVisible: 1,
    auto:{
      bool:true,
      interval: 5000,
      nav:false,
      stopHover:false
    },
    anime: 'translateY',
    transitionTime: 0.7
  });


  //==================================
  //SLIDER BEST SELLER
  //==================================
  displayProducts(slider_best_seller, datas);
  let sliderbestseller = new Slider(slider_best_seller, {
    slidesVisible: 5,
    transitionTime: 0.5
  });

  //==================================
  //AFFICHAGE DE TOUT LES PRODUITS
  //==================================
  let slidernouveautes = new Slider(slider_nouveautes, {
    slidesVisible: 1,
    auto:{
      bool:true,
      interval: 7000,
      nav:false,
      stopHover:true
    },
    transitionTime: 0.7
  });

  //==================================
  //AFFICHAGE DE TOUT LES PRODUITS
  //==================================

  // Juste 5
  displayProducts(first_products, datas);
  setWidthItems(first_products);
  setHeightItems(first_products);
  let btn_voir_tout = document.getElementById('btn-voir-tout');
  let see = false;
  let h = first_products.offsetHeight;
  first_products.style.height = 0 + getMaxHeight(first_products) + "px";

  let fleche_down = document.createElement('img');
  fleche_down.setAttribute('src', '/src/assets/images/Fleche-down.png');
  fleche_down.setAttribute('id','fleche-down');

  let rotate = 180;

  btn_voir_tout.addEventListener('click', function () {
    if (!see) {
      first_products.style.height = h + "px";
      btn_voir_tout.innerHTML = 'Cacher les modèles';
      see = true;
    } else {
      first_products.style.height = 0 + getMaxHeight(first_products) + "px";
      btn_voir_tout.innerHTML = 'Voir les modèles';
      see = false;
    }
    fleche_down.style.transform = 'rotate('+ rotate +'deg)';
    rotate += 180;
    btn_voir_tout.prepend(fleche_down);
    window.scrollTo(getPos(first_products).x, getPos(first_products).y);
  })
});


function getPos(el) {
  for (var lx=0, ly=0;
       el != null;
       lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx,y: ly};
}

function setWidthItems(tab){
  tab.children.forEach(function(item){
    item.style.width = ((1/5) * tab.parentNode.offsetWidth - 6) + 'px';
  });
}

function getMaxHeight(tab){
  let h = 0;
  let t = [];
  tab.children.forEach(function(item){
    if(item.offsetHeight > h){
      h = item.offsetHeight;
    }
    t.push(item.offsetHeight);
  });
  return h;
}

function setHeightItems(tab){
  tab.children.forEach(function(item){
    item.style.height = getMaxHeight(tab) + "px";
  });
}


function getArticle(item) {
  let item_div = createDivWithClass('item');
  let item_body = createDivWithClass('item__body');
  let item_img = createDivWithClass('item__img');
  let img = createImgWithSrc(item.images.small);
  let item_content = createDivWithClass('item__content');
  if(item.stock <= 1){
    item_content.classList.add('stock-danger');
  }
  let title = document.createElement('h2');
  title.classList.add('content__title');
  let description = document.createElement('p');
  description.classList.add('content__desc');
  let stock = document.createElement('p');
  stock.classList.add('content__stock');

  title.innerHTML = item.title;
  description.innerHTML = item.specs.engine + ' - ' + item.specs.color;
  stock.innerHTML = item.stock + ' en stock';

  item_img.appendChild(img);
  item_content.appendChild(title);
  item_content.appendChild(description);
  item_content.appendChild(stock);
  item_body.appendChild(item_img);
  item_body.appendChild(item_content);
  item_div.appendChild(item_body);

  return item_div;
}

function createDivWithClass(classname){
  let div = document.createElement('div');
  div.classList.add(classname);
  return div;
}

function getProduct(item, section_entete) {
  section_entete.style.backgroundColor = getColor(item.specs.color);

  let container = document.createElement('div');
  container.classList.add('div-product');
  container.setAttribute('data-color', item.specs.color);


  let article = document.createElement('article');
  article.classList.add('product');

  let div_wrapper = document.createElement('div');
  div_wrapper.classList.add('wrapper');

  let div2 = document.createElement('div');

  let title = document.createElement('h1');
  title.classList.add('product-title');
  title.classList.add('ft-14');

  let size_engine = document.createElement('p');
  size_engine.classList.add('product-content');

  let color = document.createElement('p');
  color.classList.add('product-content');

  let img = createImgWithSrc(item.images.big);
  img.classList.add('img-entete');

  container.appendChild(img);
  container.appendChild(article);
  article.appendChild(div_wrapper);
  div_wrapper.appendChild(div2);
  div2.appendChild(title);
  div2.appendChild(size_engine);
  div2.appendChild(color);
  div2.appendChild(getButtonCommander());

  title.innerHTML = item.title;
  size_engine.innerHTML = 'Taille ' + item.specs.size + ' - ' + item.specs.engine;
  color.innerHTML = item.specs.color;

  return container;
}

function getVisibleArticles(slider) {
  let tab = [];
  slider.children.forEach(function (item, index, array) {
    if (index <= 4) {
      tab.push(item);
    }
  });
  return tab;
}

function getAllArticles(slider) {
  let tab = [];
  slider.children.forEach(function (item, index, array) {
    tab.push(item);
  });
  return tab;
}

function createImgWithSrc(src) {
  let img = document.createElement('img');
  img.setAttribute('src', src);
  return img;
}

function getButtonCommander() {
  let div_button = document.createElement('div');

  let button = document.createElement('button');
  button.classList.add('button');
  button.classList.add('button-commander');

  let span = document.createElement('span');
  span.classList.add('arrow-button');

  let arrow = document.createElement('img');
  arrow.setAttribute('src', '/src/assets/images/Fleche-right-ligth.png');

  button.innerHTML = "Commander";
  span.appendChild(arrow);
  button.appendChild(span);
  div_button.appendChild(button);

  return div_button;
}

function getColor(color) {
  switch (color) {
    case 'Rouge Feu': return '#e73025';
    case 'Vert Gazon': return '#009f55';
    case 'Bleu Nuit': return '#231F6A';
    case 'Blanc': return '#CCCCCC';
    case 'Gris Souris': return '#CCCCCC';
    case 'Jaune Poussin': return '#FFBE00';
  }
}

function displayProducts(container, datas) {
  for (let item of datas) {
    if (item.best == true) {
      container.appendChild(getArticle(item));
    }
  }
}

// function getMaxWidth(tab){

// }