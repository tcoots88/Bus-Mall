'use strict';

var productImageSectionElem = document.getElementById('all_products');
var leftProductImageElem = document.getElementById('left_product_img');
var centerProductImageElem = document.getElementById('center_product_img');
var rightProductImageElem = document.getElementById('right_product_img');
var leftProductCaptionElem = document.getElementById('left_product_h2');
var centerProductCaptionElem = document.getElementById('center_product_h2');
var rightProductCaptionElem = document.getElementById('right_product_h2');

var leftProductOnThePage = null;
var centerProductOnThePage = null;
var rightProductOnThePage = null;


function Product(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
  this.clickCtr = 0;
  this.shownCtr = 0;

  Product.allImages.push(this);
}


Product.allImages = [];

var renderNewProduct = function (leftIndex, centerIndex, rightIndex) {
  leftProductImageElem.src = ProductPicture.allImages[leftIndex].url;
  centerProductImageElem.src = ProductPicture.allImages[centerIndex].url;
  rightProductImageElem.src = ProductPicture.allImages[rightIndex].url;
  leftProductCaptionElem.textContent = ProductPicture.allImages[leftIndex].name;
  centerProductImageElem.textContent = ProductPicture.allImages[centerIndex].name;
  rightProductCaptionElem.textContent = ProductPicture.allImages[rightIndex].name;
};

var pickNewProduct = function(){
  var leftIndex = Math.floor(Math.random() * ProductPicture.allImages.length);

  do {
    var rightIndex = Math.floor(Math.random() * ProductPicture.allImages.length);
  } while (rightIndex === leftIndex === centerIndex);
  console.log(ProductPicture.allImages[leftIndex].name, ProductPicture.allImages[centerIndex].name, ProductPicture.allImages[rightIndex].name);

  leftProductOnThePage = ProductPicture.allImages[leftIndex];
  centerProductOnThePage = ProductPicture.allImages[centerIndex];
  rightProductOnThePage = ProductPicture.allImages[rightIndex];

  renderNewProduct(leftIndex, centerIndex, rightIndex);
};

var handleClickOnProduct = function(event){
  console.log('im still alive');
  if(totalClicks < 25){

    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if(id === 'left_product_img' || id === 'center_product_img' || id === 'right_product_img' ){
      if(id === 'left_product_img'){
        leftProductOnThePage.clicks++;
      }

      if(id === 'center_product_img'){
        centerProductOnThePage.clicks++;
      }

      if(id === 'right_product_img'){
        rightProductOnThePage.clicks++;
      }

      leftProductOnThePage.timesShown++;
      centerProductOnThePage.timesShown++;
      rightProductOnThePage.timesShown++;

      pickNewProduct();
    }
    console.log(event.target.id);
  }
  totalClicks++;
  if(totalClicks === 25){
    productImageSectionElem.removeEventListener('click', handleClickOnProduct);
    console.log('you picked 25 products, ');
  }
};

productImageSectionElem.addEventListener('click', handleClickOnProduct);

new ProductPicture('R2D2', './assetts/bag.jpg');
new ProductPicture('banana', '././assetts/banana.jpg');
new ProductPicture('bathroom', './assetts/bathroom.jpg');
new ProductPicture('boots', './assetts/boots.jpg');
new ProductPicture('breakfast', './assetts/breakfast.jpg');
new ProductPicture('bubblegum', './assetts/bubblegum.jpg');
new ProductPicture('chair', './assetts/chair.jpg');
new ProductPicture('cthulhu', './assetts/cthulhu.jpg');
new ProductPicture('dog-duck', './assetts/dog-duck.jpg');
new ProductPicture('dragon', './assetts/dragon.jpg');
new ProductPicture('pen', './assetts/pen.jpg');
new ProductPicture('pet-sweep', './assetts/pet-sweep.jpg');
new ProductPicture('scissors', './assetts/scissors.jpg');
new ProductPicture('shark', './assetts/shark.jpg');
new ProductPicture('sweep', '../assetts/sweep.jpg');
new ProductPicture('tauntaun', './assetts/tauntaun.jpg');
new ProductPicture('unicorn', './assetts/unicorn.jpg');
new ProductPicture('usb', './assetts/usb.jpg');
new ProductPicture('water-can', './assetts/water-can.jpg');
new ProductPicture('wine-glass', './assetts/wine-glass.jpg'); 

leftProductOnThePage = ProductPicture.allImages[3];
centerProductOnThePage = ProductPicture.allImages[0];
rightProductOnThePage = ProductPicture.allImages[0];

pickNewProduct();
