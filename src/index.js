
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
  slidermove();

  function slidermove() {
    let n = 0;
    slider_auto_entete.children[1].style.display = 'flex';
    let interval = setInterval(displayed, 3000);
    function displayed() {
      slider_auto_entete.children.forEach(function (item, index, array) {
        if (index == n) {
          item.style.display = 'flex';
          section_entete.style.backgroundColor = getColor(item.getAttribute('data-color'));
        } else {
          item.style.display = 'none';
        }
      });
      n++;

      //retour au début
      if (n >= slider_auto_entete.children.length) {
        n = 0;
      }
    }
  }


  //==================================
  //SLIDER BEST SELLER
  //==================================
  displayProductsBestSeller(slider_best_seller, false, datas);


  //==================================
  //AFFICHAGE DE TOUT LES PRODUITS
  //==================================

  // Juste 5
  displayProducts(first_products, false, datas);

  // voir tout
  displayProducts(all_products, true, datas);
  let btn_voir_tout = document.getElementById('btn-voir-tout');
  let see = false;
  btn_voir_tout.addEventListener('click', function () {
    if (!see) {
      all_products.style.display = 'flex';
      see = true;
    } else {
      all_products.style.display = 'none';
      see = false;
    }
  })

});





function getArticle(item) {
  let div_img = document.createElement('div');
  div_img.classList.add('div-img');

  let title = document.createElement('h2');
  title.classList.add('title-article');

  let description = document.createElement('p');
  description.classList.add('article-desc');

  let stock = document.createElement('p');
  stock.classList.add('article-stock');

  title.innerHTML = item.title;
  description.innerHTML = item.specs.engine + ' - ' + item.specs.color;
  stock.innerHTML = item.stock + ' en stock';

  let article = document.createElement('article');
  article.classList.add('article-card');
  article.classList.add('relative');
  if (item.stock <= 1) { article.classList.add('stock-danger'); }
  article.style.display = 'none';

  div_img.appendChild(getImage(item.images.small, 'img-article'));
  article.appendChild(div_img);
  article.appendChild(title);
  article.appendChild(description);
  article.appendChild(stock);

  return article;
}
function getProduct(item, section_entete) {
  section_entete.style.backgroundColor = getColor(item.specs.color);

  let container = document.createElement('div');
  container.classList.add('div-product');
  container.style.display = 'none';
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

  let img = getImage(item.images.big, 'img-entete');

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

function getImage(src, classname) {
  let img = document.createElement('img');
  img.setAttribute('src', src);
  img.classList.add(classname);

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
    case 'Bleu nuit': return '#231F6A';
    case 'Blanc': return '#CCCCCC';
    case 'Gris Souris': return '#CCCCCC';
    case 'Jaune Poussin': return '#FFBE00';
  }
}

function displayProducts(container, all, datas) {
  for (let item of datas) {
    container.appendChild(getArticle(item));
  }
  let tab = getVisibleArticles(container);
  if (all) { tab = getAllArticles(container); }
  for (let item of tab) {
    item.style.display = 'initial';
  }
}

function displayProductsBestSeller(container, all, datas) {
  for (let item of datas) {
    if (item.best == true) {
      container.appendChild(getArticle(item));
    }
  }
  let tab = getVisibleArticles(container);
  if (all) { tab = getAllArticles(container); }
  for (let item of tab) {
    item.style.display = 'initial';
  }
}