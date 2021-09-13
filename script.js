// market value calculation
var updateMarketValue = function (ele) {
  var sharesOwned = parseFloat($(ele).find('.shares input').val());
  var marketPrice = parseFloat($(ele).find('.marketPrice input').val());
  // market value is shares times market price per share
  var marketValue = sharesOwned * marketPrice;
  $(ele).children('.marketValue').html(marketValue);

  return marketValue;
}

// unrealized Profit calculation
var updateUnrealizedProfit = function (ele, marketValue) {
  var sharesOwned = parseFloat($(ele).find('.shares input').val());
  var costPerShare = parseFloat($(ele).find('.cost input').val());
  var costOfPurchase = sharesOwned * costPerShare;

  var unrealizedProfit = marketValue - costOfPurchase;
  $(ele).children('.profit').html(unrealizedProfit);


  return unrealizedProfit;
}

// porftolio value and portfolio gain/loss calculation
var sum = function (acc, x) { return acc + x; };

var updatePortfolioValueAndProfit = function () {
  var stocksMarketValues = [];
  var stocksUnrealizedProfits = [];

  $('tbody tr').each(function (i, ele) {
    var marketValue = updateMarketValue(ele);
    stocksMarketValues.push(marketValue);
    var unrealizedProfit = updateUnrealizedProfit(ele, marketValue);
    stocksUnrealizedProfits.push(unrealizedProfit);
  });
  var portfolioMarketValue = stocksMarketValues.reduce(sum);
  var portfolioUnrealizedProfit = stocksUnrealizedProfits.reduce(sum);
  $('#portfolioValue').html(portfolioMarketValue);
  $('#portfolioProfit').html(portfolioUnrealizedProfit);

};

// general function execution + remove button function + updates de table after input + sets timeout to not overcharge the code.

var timeout;
$(document).ready(function () {
  updatePortfolioValueAndProfit();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    // $(this).parent().parent().remove();
    // The above also works
    updatePortfolioValueAndProfit();
  });
  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePortfolioValueAndProfit();
    }, 1000);
  });
  $('#addStock').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var shares = $(this).children('[name=shares]').val();
    var cost = $(this).children('[name=cost]').val();
    var marketPrice = $(this).children('[name=marketPrice]').val();

    $('tbody').append('<tr>' +
    '<td class="name">' + name + '</td>' +
    '<td class="shares"><input type="number" value="' + shares + '" /></td>' +
    '<td class="cost"><input type="number" value="' + cost + '" /></td>' +
    '<td class="marketPrice"><input type="number" value="' + marketPrice + '" /></td>' +
    '<td class="marketValue"></td>' +
    '<td class="profit"></td>' +
    '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
    '</tr>');
    
    updatePortfolioValueAndProfit();
    $(this).children('[name=name]').val('');
    $(this).children('[name=shares]').val('');
    $(this).children('[name=cost]').val('');
    $(this).children('[name=marketPrice]').val('');
  });
});
    








