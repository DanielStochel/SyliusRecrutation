document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = $('#add-to-cart-button');

  addToCartButton.click(function(event) {
    event.preventDefault();
    customAddToCart();
  });

  function customAddToCart() {
    const element = $("#custom-add-to-cart-form");
    const url = element.attr('action');
    const validationElement = $('#sylius-cart-validation-error');
    $.ajax({
      url: url,
      method: 'POST',
      data: element.serialize()
    }).done(function (response) {
       // blank response ? shouldn't it return something, for example cart current item quantity?
       // getItemsCount()
       window.location.reload()
    }).fail(function (response) {
       validationElement.removeClass('hidden');
       let validationMessage = '';

       Object.entries(response.errors.errors).forEach(([, message]) => {
         validationMessage += message;
       });
       validationElement.html(validationMessage);
       $(element).removeClass('loading');
    })
  }

  function getItemsCount() {
    // to be done
  }
});