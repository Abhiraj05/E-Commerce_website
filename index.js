
//display cart function
$('#openModal').click(function () {
    $('#cartdis').modal('toggle');
});

$(document).on('click', function (event) {
    if ($(event.target).closest('.modal-content').length === 0 && $('#cartdis').hasClass('show')) {
        $('#cartdis').modal('hide');
    }
});





//displaycart items & remove function

function add_to_cart(pid, pimg, ptitle, pprice, pqy = 1) {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        let products = [];
        let prod = { productid: pid, productimg: pimg, producttitle: ptitle, productprice: pprice, quantity: pqy };
        products.push(prod)
        localStorage.setItem("cart", JSON.stringify(products))
        alert(`${ptitle} added to cart!`);
    } else {
        let p_cart = JSON.parse(cart);
        let old_cart = p_cart.find(item => item.productid == pid);

        if (old_cart) {
            old_cart.quantity += 1;
            alert(`${ptitle} added to cart!`);

        } else {
            let prod = { productid: pid, productimg: pimg, producttitle: ptitle, productprice: pprice, quantity: pqy };
            p_cart.push(prod);
            alert(`${ptitle} added to cart!`);
        }
        localStorage.setItem("cart", JSON.stringify(p_cart));
    }
    updateCart();
}

function updateCart() {
    let cart_string = localStorage.getItem("cart");
    let cart = JSON.parse(cart_string);
    if (cart == null || cart.length === 0) {
        $(".cart-body").html('<h5>Cart Does Not Have Any Items</h5>');
        $(".checkout-btn").addClass('disabled');
        
    } else {
        let table = '<table class="table"><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Action</th></tr></thead><tbody>';
        let totalprice = 0;
        cart.forEach(item => {
            table += `<tr><td>${item.producttitle}</td><td>${item.productprice}</td><td>${item.quantity}</td><td><button class="remove-btn" onclick="remove_from_cart(${item.productid})">Remove</button></td></tr>`;
            totalprice += item.productprice * item.quantity;
        });
        table += `</tbody></table><p>Total: ${totalprice} rs</p>`;
        $(".cart-body").html(table);
        $(".checkout-btn").removeClass('disabled');
        $(".remove-btn").addClass("styled-remove-btn");
    }
}

function remove_from_cart(pid) {
    let cart_string = localStorage.getItem("cart");
    let cart = JSON.parse(cart_string);
    let updated_cart = cart.filter(item => item.productid != pid);
    localStorage.setItem("cart", JSON.stringify(updated_cart));
    updateCart();
    let removed_item = cart.find(item => item.productid == pid);
    alert(`${removed_item.producttitle} removed from cart!`);
}

$(document).ready(function () {
    updateCart();
});



