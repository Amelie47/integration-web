
import './styles/style.scss';
import Slider from './js/components/Slider';
import Search from './js/components/Search';
import Collapse from './js/components/Collapse';
import Utils from './js/components/Utils';
require('./js/ajax.js')();

let utils = new Utils();

ajax('./src/assets/models/models.json', {}, function (datas) {

  let slider_auto_entete = document.getElementById('slider-auto-entete');
  let slider_best_seller = document.getElementById('slider-best-seller');
  let first_products = document.getElementById('first-products');

  //==================================
  //SLIDER AUTO ENTETE
  //==================================
  for (let item of datas) {
    if (item.hero == true) {
      slider_auto_entete.appendChild(utils.getProduct(item, document.getElementById('entete')));
    }
  }
  let sliderentete = new Slider(slider_auto_entete, {
    slidesVisible: 1,
    auto: {
      bool: true,
      interval: 5000,
      nav: false,
      stopHover: true
    },
    anime: 'translateY',
    transitionTime: 0.7
  });


  //==================================
  //SLIDER BEST SELLER
  //==================================
  utils.displayProducts(slider_best_seller, datas);
  let sliderbestseller = new Slider(slider_best_seller, {
    slidesVisible: 5,
    transitionTime: 0.5
  });

  //==================================
  //SLIDER NOUVEAUTES
  //==================================
  let slidernouveautes = new Slider(document.getElementById('slider_nouveautes'), {
    slidesVisible: 1,
    auto: {
      bool: true,
      interval: 7000,
      nav: false,
      stopHover: true
    },
    transitionTime: 0.7
  });

  //==================================
  //AFFICHAGE DE TOUT LES PRODUITS
  //==================================
  // Affichage
  utils.displayAllProducts(first_products, datas);
  utils.setWidthItems(first_products);
  utils.setHeightItems(first_products);

  first_products.children.forEach((item) => {
    if ((utils.getPos(item).y - 3) != utils.getPos(first_products).y) { item.style.opacity = '0'; }
    item.style.transition = '0.5s all';
  });

  let btn_voir_tout = document.getElementById('btn-voir-tout');
  let see = false;
  let h = first_products.offsetHeight;

  let fleche_down = document.createElement('img');
  fleche_down.setAttribute('src', '/src/assets/images/Fleche-down.png');
  fleche_down.setAttribute('id', 'fleche-down');

  let collapseseeall = new Collapse(btn_voir_tout, first_products, {
    btnSecondText: 'Voir 5 modèles',
    imgRotate: true
  });

  let searchBar = new Search(document.getElementById('search'), first_products);

});