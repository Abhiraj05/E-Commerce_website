




function create_card(pro_img, pro_name, pro_price) {
    let create_box = document.createElement("div");
    create_box.classList.add("cart_box");

    let create_picture = document.createElement("div");
    create_picture.classList.add("pic-adj");

    let add_img = document.createElement("img");
    add_img.classList.add("cart_img");
    add_img.setAttribute("src", pro_img);

    let add_pro_dt = document.createElement("div");
    add_pro_dt.classList.add("pro-adj");

    let add_hd1 = document.createElement("h3");
    add_hd1.classList.add("pro-h1");
    add_hd1.insertAdjacentText("afterbegin", pro_name);


    let add_hd2 = document.createElement("div");
    add_hd2.classList.add("pro-h2");
    add_hd2.insertAdjacentText("afterbegin", "price:"+pro_price);
     
    let add_btn = document.createElement("div");
    add_btn .classList.add("pro-btn-adj");

    let buy_btn = document.createElement("button");
    buy_btn .classList.add("pro-btn-buy");
    buy_btn.insertAdjacentText("afterbegin","buy");


    let rmv_btn = document.createElement("button");
    rmv_btn .classList.add("pro-btn-rmv");
    rmv_btn.insertAdjacentText("afterbegin","Remove");


    create_picture.append(add_img);
    create_box.append(create_picture);
    add_pro_dt.append(add_hd1);
    add_pro_dt.append(add_hd2);
    create_box.append(add_pro_dt);
    add_btn.append(buy_btn);
    add_btn.append(rmv_btn);
    create_box.append(add_btn);


    return create_box;

}


let btn = document.getElementById("add_to")
btn.addEventListener("click", () => {
    let add_card = document.querySelector(".cart_container");
    
    add_card.append(create_card("shop images/organic-rice-amp-moong-khichdi-mix-200g-507933_l-removebg-preview.png", "Organic Rice & Moong Porridge Mix 200g", "350 rs"));


})

