


function check_pass(event) {
    event.preventDefault();
    let pass = document.getElementById("pass").value;
    let add_p = document.querySelector("pglink");

    if (pass.length >= 6) {
        alert("Login Successfully");
    }
    else {
        add_p.insertAdjacentHTML("beforeend", "<p>Password length Should be Min 6</p>");
        add_p.classList.add("pglink");
    }

}



//addtocartfunction
function add_to_cart(pid, pimg, ptitle, pprice) {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        let products = [];
        let prod = { productid: pid, productiimg: pimg, producttitle: ptitle, productprice: pprice, pquntity: pqy };
        products.push(prod)
        localStorage.setItem("cart", JSON.stringify(products))
    }
    else {
        let p_cart = JSON.parse(cart);
        let old_cart = p_cart.find(item => item.productid == pid)

        if (old_cart) {
            old_cart.pquntity = old_cart.pquntity + 1
            p_cart.map(item => {
                if (item.productid == old_cart.productid) {
                    item.pquntity = old_cart.pquntity;
                }
            })
            localStorage.setItem("cart", JSON.stringify(p_cart));

        } else {
            let prod = { productid: pid, productiimg: pimg, producttitle: ptitle, productprice: pprice, pquntity: pqy };
            p_cart.push(prod);
            localStorage.setItem("cart", JSON.stringify(p_cart));

        }
    }
    updateCart()
}

//cartdisplayfunction
$('#openModal').click(function () {
    $('#cartdis').modal('toggle');
});

$(document).on('click', function (event) {
    if ($(event.target).closest('.modal-content').length === 0 && $('#cartdis').hasClass('show')) {
        $('#cartdis').modal('hide');
    }
});

//updatecartfunction
function updateCart() {
    let cart_string = localStorage.getItem("cart");
    let cart = JSON.parse(cart_string);
    if (cart == null || cart.length == 0) {
        console.log("cart is empty !!")

        $(".cart-body").html('<h5 style="font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;">Cart Does Not Have Any Items </h5>')
        $(".checkout-btn").addClass('disabled');

    }
    else {
        console.log(cart)

        let table = `
        <table class="table">
        <thead>
        <tr>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        </tr>
        </thead>
        
        `;
        table=`
        <tr>
        <td>${} </td>
        <td>${} </td>
        <td>${} </td>
        <td>${} </td>
        </tr>
    `
        let totalprice=0;
        table += table; `</table>`
        $(".cart-body").html(table)

    }
}

$(document).ready(function () {
    updateCart()
})