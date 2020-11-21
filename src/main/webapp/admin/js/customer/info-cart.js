jQuery(function ($) {
    $(document).ready(function () {
        function getTotal() {
            var totalProduct = parseInt(sessionStorage.getItem("totalProduct"));
            var totalPrice = parseInt(sessionStorage.getItem("totalPrice"));
            console.log(totalPrice);
            console.log(totalProduct);
            if (totalProduct != NaN) {
                $('.totalItem').text(totalProduct);
            }
            if (totalPrice != NaN) {
                $('#totalPrice').text(totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
            }

        }
        getTotal();

    })
})