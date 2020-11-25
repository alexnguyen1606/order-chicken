jQuery(function ($) {
    $(document).ready(function () {
        function getTotal() {
            var totalProduct = sessionStorage.getItem("totalProduct");
            var totalPrice = sessionStorage.getItem("totalPrice");
            console.log(totalPrice);
            console.log(totalProduct);
            if (totalProduct == null) {
                totalProduct = 0;
            }
            $('.totalItem').text(parseInt(totalProduct));
            if (totalPrice == null) {
               totalPrice = 0;
            }
            $('#totalPrice').text(parseInt(totalPrice).toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));

        }
        getTotal();

    })
})