//testing js works
// console.log("Hello World")


//testing jquery works
// window.onload = function() {
//   if (window.jQuery) {  
//       // jQuery is loaded  
//       alert("Yeah!");
//   } else {
//       // jQuery is not loaded
//       alert("Doesn't Work");
//   }
// }


$(document).ready(function () {
updateShoppingCart();

var timeout;
$(document).on('input', function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    console.clear();
    updateShoppingCart();
    }, 1000);
  });

$('#addProduct').on('submit', function (event) {
  event.preventDefault();
  var product = $(this).children('[name=product]').val();
  var price = $(this).children('[name=price]').val();
  var quantity = $(this).children('[name=quantity]').val();
  console.log(product, price, quantity);

  $('table').append('<tr>' +
  '<td class="food">' + product + '</td>' +
  '<td class="unitPrice">' + price + '</td>' +
  '<td class="quantity"><label for="quantity">QTY</label><input type="number" value="' + quantity + 'id="quantity" name="quantity">' +
  '<td><button type="button" class="btn btn-outline-primary btn-sm remove">Remove</button></td><td class="totalProductPrice"></td>' +
  '</tr>');

  updateShoppingCart();
  $(this).children('[name=product]').val('');
  $(this).children('[name=price]').val('');
  $(this).children('[name=quantity]').val('');
  });

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateShoppingCart();
  });

});


function portfolioMarketValue() {
  var totalSum = 0;
  for (let i=0; i < totalPrice.length; i++) {
    totalSum = totalSum + i;
    // totalSum += totalPrice[i];
    // console.log(totalSum);
  }
  return totalSum;
};

var updateShoppingCart = function () {
  var totalPrice = [];

  $('body table tr').each(function (i, ele) {
    console.log(ele);
    updatedTotalProductPrice = totalProductPrice(ele);
    totalPrice.push(updatedTotalProductPrice);
  })
    console.log(totalPrice);
    var totalSum = 0;
    for (let i = 0; i < totalPrice.length; i++) {
      totalSum = totalSum + totalPrice[i];
    }
    console.log(totalSum);
    $('#totalPrice').html(totalSum);
  }

var totalProductPrice = function (ele) {
  var sharesOwned = parseFloat($(ele).find('.unitPrice').text());
  var marketPrice = parseFloat($(ele).find('.quantity input').val());

  if (isNaN(marketPrice)) {
    var marketPrice = 0;
    var totalProductPrice = sharesOwned * marketPrice;
    $(ele).children('.totalProductPrice').html("$ " + 0);
  } else {
    var totalProductPrice = sharesOwned * marketPrice;
    $(ele).children('.totalProductPrice').html("$ " + totalProductPrice);
  }
    return totalProductPrice;
  }


