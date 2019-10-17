
import './styles/style.scss';
import Button from './js/components/Button';
require('./js/tools.js')();

Array.from(document.body.querySelectorAll('.button')).forEach((button) => {
  new Button(button);
});

ajax('./src/assets/models/models.json',{}, function(datas){
  let slider_best_seller = document.getElementById('slider-best-seller');
  for(let item of datas){
    slider_best_seller.appendChild(getArticle(item));
  }

  let articles = getVisibleArticles(slider_best_seller);

  for(let item of articles){
    item.style.display = 'initial';
  }

  console.log('visibles', articles);
  
});





function getArticle(item){
  let div_img = document.createElement('div');
  div_img.classList.add('div-img');

  let img = document.createElement('img');
  img.setAttribute('src',item.images.small);
  img.classList.add('img-article');

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
  if(item.stock <= 1){article.classList.add('stock-danger');}
  article.style.display = 'none';
  
  div_img.appendChild(img);
  article.appendChild(div_img);
  article.appendChild(title);
  article.appendChild(description);
  article.appendChild(stock);

  return article;
}

function getVisibleArticles(slider_best_seller)
{
  let tab = [];
  slider_best_seller.children.forEach(function(item, index, array) {
    if(index <= 4){
      tab.push(item);
    }
  });
  return tab;
}