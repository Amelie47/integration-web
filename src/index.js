import './styles/style.scss';
import Slider from './js/components/Slider';
import Search from './js/components/Search';
import Collapse from './js/components/Collapse';
import Utils from './js/components/Utils';
require('./js/ajax.js')();

let mobile_size = window.innerWidth < 800;

let utils = new Utils();
let slider_auto_entete = document.getElementById('slider-auto-entete');
let slider_best_seller = document.getElementById('slider-best-seller');
let first_products = document.getElementById('first-products');
let commandes = document.getElementsByClassName('div-articles-historique')[0];
let entete = document.getElementById('entete');

let burger_menu_icon = document.getElementById('menu-burger');
let burger_menu_div = document.getElementById('div_header_nav');

let h = burger_menu_div.children[0].offsetHeight + burger_menu_div.children[1].offsetHeight;

if(mobile_size){
  burger_menu_div.classList.remove('spacebetween');
  burger_menu_div.style.transform = 'translate3d(0,' + -h + 'px,0)';
  entete.style.height = window.innerHeight + 'px';
  burger_menu_div.style.height = window.innerHeight + 'px';
}else{
  burger_menu_div.classList.add('spacebetween');
}

let see = 0;
burger_menu_icon.addEventListener('click', function(){
  let color = entete.style.backgroundColor;
  if(see%2 == 0){
    burger_menu_div.style.transform = 'translate3d(0,0,0)';
    burger_menu_icon.children[0].style.transform = 'rotate(45deg) translateY(12px)';
    burger_menu_icon.children[1].style.opacity = '0';
    burger_menu_icon.children[2].style.transform = 'rotate(-45deg) translateY(-12px)';
    burger_menu_div.style.backgroundColor = color;
  }else{
    burger_menu_div.style.transform = 'translate3d(0,' + -h + 'px,0)';
    burger_menu_icon.children[0].style.transform = 'rotate(0deg)';
    burger_menu_icon.children[1].style.opacity = '1';
    burger_menu_icon.children[2].style.transform = 'rotate(0deg)';
  }
  see ++;
})

ajax('./src/assets/models/models.json', {}, function (datas) {

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
  //SLIDER ventes et commandes
  //==================================
  for(let n = 0; n < commandes.children.length; n++){
    commandes.children[n].style.transition = '0.5s all';
    if(n>3){
      commandes.children[n].style.opacity = '0';
    }
  }

  let collapsecommandes = new Collapse(document.getElementById('voir-tout-commandes'), commandes, {
    btnSecondText: 'Voir 4 dernières actualités',
    imgRotate: true,
    visible: 4,
    decalage: -24,
    itemsAlign: 'vertical',
    btnPos: 1
  });


  //==================================
  //AFFICHAGE DE TOUT LES PRODUITS
  //==================================
  utils.displayAllProducts(first_products, datas);
  utils.setWidthItems(first_products);
  utils.setHeightItems(first_products);

  first_products.children.forEach((item) => {
    if ((utils.getPos(item).y - 3) != utils.getPos(first_products).y) { item.style.opacity = '0'; }
  });

  let collapseseeall = new Collapse(document.getElementById('btn-voir-tout'), first_products, {
    btnSecondText: 'Voir 5 modèles',
    imgRotate: true,
    decalage: 3,
    timeTransition: 0.7,
    btnPos: 0
  });

  let input_search = document.getElementById('search');
  let loupe = document.getElementById('loupe');
  loupe.style.right = input_search.offsetWidth - loupe.offsetWidth - 11 + 'px';
  let searchBar = new Search(input_search, first_products);
});