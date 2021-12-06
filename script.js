const tax = 0.04;
console.log(localStorage)
var orderBtn = document.getElementById("orderBtn");
var orderModal = document.getElementById("orderModalBody");
var localStorage = window.localStorage;
var retrievedChicken = localStorage.getItem("allchicken");
var retrievedList = localStorage.getItem("chickenList");
var list = document.getElementById("list");

$(".modal").on("hidden.bs.modal", clearModal);


if(typeof(retrievedChicken) === "string"){
    var chicken = JSON.parse(retrievedChicken);
} else {
    var chicken = {
        "fireball": {
            name: "Fireball Chicken",
            price: 12.99,
            quantity: 0
        },
        "buttermilk": {
            name: "Buttermilk Chicken",
            price: 11.99,
            quantity: 0
        },
        "the1000season": {
            name: "1000 Season Chicken",
            price: 14.14,
            quantity: 0
        },
        "raw": {
            name: "Raw Chicken",
            price: 4.99,
            quantity: 0
        },
        "burnt": {
            name: "Burnt Chicken",
            price: 6.00,
            quantity: 0
        },
        "bootstrap": {
            name: "Bootstrap Template Chicken",
            price: 13.37,
            quantity: 0
        }
    }

    localStorage.setItem('allchicken', JSON.stringify(chicken));

}

if(typeof(retrievedList) === "string"){
    list.innerHTML = retrievedList;
    orderBtn.classList.remove("disabled");
}

function createRowComponent(type, chickenName, chickenPrice, chickenQuantity) {
    row = document.createElement("div");
    row.className = `row ${type}`;


    nameContainer = document.createElement("div");
    nameContainer.className = "col-md-3";
    cName = document.createElement("h5");
    cName.textContent = `${chickenName}`;
    nameContainer.append(cName);

    priceContainer = document.createElement("div");
    priceContainer.className = "col-md-3";
    price = document.createElement("p");
    price.textContent = `$${chickenPrice}`;
    priceContainer.append(price);

    quantityContainer = document.createElement("div");
    quantityContainer.className = "col-md-3";
    quantity = document.createElement("p");
    quantity.textContent = `${chickenQuantity}`;
    quantityContainer.append(quantity);

    buttonCol = document.createElement("div");
    buttonCol.className = "col-md-3 d-flex";

    increase = document.createElement("button");
    increase.className = "btn btn-sm btn-light";
    increase.style = "height: 30px;";
    increase.textContent = "+"
    increase.setAttribute("onclick", `addChicken('${type}')`);
    decrease = document.createElement("button");
    decrease.className = "btn btn-sm btn-light";
    decrease.style = "height: 30px;";
    decrease.textContent = "-"
    decrease.setAttribute("onclick", `removeChicken('${type}')`);


    buttonCol.append(increase);
    buttonCol.append(decrease);


    //appending

    list.append(row);
    row.append(nameContainer);
    row.append(priceContainer);
    row.append(quantityContainer);
    row.append(buttonCol);

}


function addChicken(type) {
    orderBtn.classList.remove("disabled");
    matchingChicken = document.querySelector(`.${type}`);
    if (matchingChicken === null) {
        chicken[type].quantity++;
        createRowComponent(type, chicken[type].name, chicken[type].price, chicken[type].quantity);
        console.log(chicken[type]);
        localStorage.setItem('allchicken', JSON.stringify(chicken));
        localStorage.setItem('chickenList', list.innerHTML);

    } else {
        chicken[type].quantity++;
        // for (let i = 0; i < matchingChicken.children.length; i++) {
        //     console.log(matchingChicken.children[i].tagName);
        //   }

        matchingChicken.children[2].firstChild.textContent = `${chicken[type].quantity}`;

        localStorage.setItem('allchicken', JSON.stringify(chicken));
        localStorage.setItem('chickenList', list.innerHTML);




    }


}

function removeChicken(type) {
    var chickenQuantity = 0;
    matchingChicken = document.querySelector(`.${type}`);
        chicken[type].quantity--;

        matchingChicken.children[2].firstChild.textContent = `${chicken[type].quantity}`;
    

        for (i = 0; i < Object.keys(chicken).length; i++) {
            chickenQuantity = chicken["the1000season"].quantity + chicken["buttermilk"].quantity + chicken["fireball"].quantity + chicken["raw"].quantity + chicken["burnt"].quantity + chicken["bootstrap"].quantity;
            if (chickenQuantity === 0) {
                orderBtn.classList.add("disabled");
                matchingChicken.remove();

            }
        }

        localStorage.setItem("allchicken", JSON.stringify(chicken));
        localStorage.setItem('chickenList', list.innerHTML);




    

    


}

function orderChicken(){
    chickenPrice = 0;
    for (i = 0; i < Object.keys(chicken).length; i++) {
        // chickenQuantity = chicken["1000season"].quantity + chicken["buttermilk"].quantity + chicken["fireball"].quantity;
        chickenOn = Object.keys(chicken)[i];
       
       if (chicken[chickenOn].quantity > 0){
           console.log("There's chicken among us!")
           chickenItem = document.createElement("h4");
           chickenItem.textContent = `${chicken[chickenOn].quantity}x ${chicken[chickenOn].name}`;
           console.log(orderModal.children);
           orderModal.children[0].append(chickenItem);
           chickenPrice = chickenPrice + (chicken[chickenOn].price * chicken[chickenOn].quantity);
       }


    }

    chickenPriceItem = document.createElement("h6");
    chickenPriceItem.textContent = `Total Price: $${chickenPrice.toFixed(2)}`;
    orderModal.children[0].append(chickenPriceItem);

    




}

function purchaseChicken(){
    localStorage.clear();
    document.location = "https://daiquery.github.io/kam-chicken-proj/success.html";

}

function clearModal(){
    orderModal.children[0].innerHTML = "";
}