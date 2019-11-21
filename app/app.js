'use strict';
// insert greeting to user and possibly collect demographic information. 
// If demographic information is collected, information can be thrown into the graph
// Add-in name to the "thank you for playing" message



// globals to populate images and captions
var leftFavoriteProductElem = document.getElementById('left_product_img');
var centerFavoriteProductElem = document.getElementById('center_product_img');
var rightFavoriteProductElem = document.getElementById('right_product_img');
var leftProductCaptionElem = document.getElementById('left_product_caption');
var centerProductCaptionElem = document.getElementById('center_product_caption');
var rightProductCaptionElem = document.getElementById('right_product_caption');
var favProduct = document.getElementById('image-choices');
var productElem = [];
productElem.push(leftFavoriteProductElem, centerFavoriteProductElem, rightFavoriteProductElem);
var imgNameElem = [];
imgNameElem.push(leftProductCaptionElem, centerProductCaptionElem, rightProductCaptionElem);
var imgGen = [];
var randomArr = [];


function FavoriteProduct(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = 0;
  this.shownCtr = 0;

  FavoriteProduct.all.push(this);
}

// array of products for user to select from
FavoriteProduct.all = [];
new FavoriteProduct('R2D2', '/assetts/bag.jpg');
new FavoriteProduct('banana', 'assetts/banana.jpg');
new FavoriteProduct('bathroom', 'assetts/bathroom.jpg');
new FavoriteProduct('boots', 'assetts/boots.jpg');
new FavoriteProduct('breakfast', 'assetts/breakfast.jpg');
new FavoriteProduct('bubblegum', 'assetts/bubblegum.jpg');
new FavoriteProduct('chair', 'assetts/chair.jpg');
new FavoriteProduct('cthulhu', 'assetts/cthulhu.jpg');
new FavoriteProduct('dog-duck', 'assetts/dog-duck.jpg');
new FavoriteProduct('dragon', 'assetts/dragon.jpg');
new FavoriteProduct('pen', 'assetts/pen.jpg');
new FavoriteProduct('pet-sweep', 'assetts/pet-sweep.jpg');
new FavoriteProduct('scissors', 'assetts/scissors.jpg');
new FavoriteProduct('shark', 'assetts/shark.jpg');
new FavoriteProduct('sweep', 'assetts/sweep.png');
new FavoriteProduct('tauntaun', 'assetts/tauntaun.jpg');
new FavoriteProduct('unicorn', 'assetts/unicorn.jpg');
new FavoriteProduct('usb', 'assetts/usb.gif');
new FavoriteProduct('water-can', 'assetts/water-can.jpg');
new FavoriteProduct('wine-glass', 'assetts/wine-glass.jpg');

// set at 0 for a starting point
FavoriteProduct.voteCTR = 0;
FavoriteProduct.maxVote = 25;
// set max voting limit to 25 votes


// function saveStatsToLocalStorage(data) {
//   var productStats = [];
//   for (var i = 0; i < data.length; i++) {
//     productStats.push(data[i]);
//   }
//   // console.log(JSON.stringify(productStats));
//   localStorage.productStats = JSON.stringify(productStats);
// }








function shuffle(array) {
  var currentIndex = array.length, tempValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;

}

function pullProductFromArray() {
  if (randomArr.length === 0) {
    randomArr = shuffle(FavoriteProduct.all.slice());
  }
  var arrPop = randomArr.pop();
  return arrPop;
}


function generateProducts() {
  for (var i = 0; i < 3; i++) {
    imgGen.push(pullProductFromArray());
    productElem[i].src = imgGen[i].imgURL;
    imgNameElem[i].textContent = imgGen[i].name;
    imgGen[i].shownCtr++;
  }
}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}
// ToDo - resultList needs to move into the same function as chart render

var resultList = document.getElementById('resultList');


function addClick() {
  var text = '';

  for (var i = 0; i < FavoriteProduct.all.length; i++) {
    text = `${FavoriteProduct.all[i].name} : ${FavoriteProduct.all[i].clickCtr} votes.`;
    addElement('li', resultList, text);
  }
}
favProduct.addEventListener('click', clickHandler);


function clickHandler(event) {
  var id = event.target.id;
  console.log('id :', id);
  if (id === 'left_product_img') {
    imgGen[0].clickCtr++;
    console.log('imgGen[0].clickCtr :', imgGen[0].clickCtr);
  } else if (id === 'center_product_img') {
    imgGen[1].clickCtr++;
    console.log('imgGen[1].clickCtr :', imgGen[1].clickCtr);
  } else if (id === 'right_product_img') {
    imgGen[2].clickCtr++;
    console.log('imgGen[2].clickCtr :', imgGen[2].clickCtr);
  }

  console.log('FavoriteProduct :', FavoriteProduct.all);

  FavoriteProduct.maxVote--;
  if (FavoriteProduct.maxVote >= 0) {
    imgGen = [];
    resultList.innerHTML = '';
    generateProducts();
    addClick();
  } else {
    favProduct.removeEventListener('click', clickHandler);
    alert('Thank you for paticipating in this market survey');
    alert('Please enjoy the chart of the results');
    // var shift = document.getElementById("#text").style.padding-top = "15em";
    // shift();
    var colorChange = document.getElementById('vote-count').style.color = 'black'
    colorChange();
    postChart();
  }
}
generateProducts();
addClick();

function postChart() {
  favProduct.innerHTML = '';

  var productName = [];
  var productVoteTotal = [];
  var productShownTotal = [];

  for (var i = 0; i < FavoriteProduct.all.length; i++) {
    var singleProductName = FavoriteProduct.all[i].name;
    productName.push(singleProductName);
    var singleProductVoteTotal = FavoriteProduct.all[i].clickCtr;
    productVoteTotal.push(singleProductVoteTotal);
    var singleProductShownTotal = FavoriteProduct.all[i].shownCtr;
    productShownTotal.push(singleProductShownTotal);
  }

  var barChart = addElement('CANVAS', favProduct);
  barChart.setAttribute('id', 'productChart');


  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productName,
      datasets: [{
        label: 'Product Votes',
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 0)',
        data: productVoteTotal,
      },
      {
        label: 'Times Shown',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(0, 0, 0)',
        data: productShownTotal
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 6,
            stepSize: 1,
          }
        }]
      },
      layout: {
        width: 800,
        padding: 50

      }
    }
  });
}
