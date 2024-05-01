


document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("signupForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        var fullName = document.getElementById("full-name").value;
        var phoneNo = document.getElementById("phone-no").value;
        var address = document.getElementById("address").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirm-password").value;

       
        if (fullName === "" || phoneNo === "" || address === "" || password === "" || confirmPassword === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

      
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        var username = document.getElementById("username").value;
        var phoneNo = document.getElementById("pno").value;
        var password = document.getElementById("pass").value;

        // You can add additional client-side validation here if needed

        // Send data to server for verification
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "signin.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (xhr.responseText === "success") {
                        window.location.href = "shop.html";
                    } else {
                        alert("Invalid username or password.");
                    }
                } else {
                    alert("An error occurred while processing your request.");
                }
            }
        };
        xhr.send("username=" + username + "&phone_no=" + phoneNo + "&password=" + password);
    });
});


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