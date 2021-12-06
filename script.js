const tax = 0.04;
var orderBtn = document.getElementById("orderBtn");
var orderModal = document.getElementById("orderModalBody");

const chicken = {
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
    "1000season": {
        name: "1000 Season Chicken",
        price: 14.14,
        quantity: 0
    }
};

function createRowComponent(type, chickenName, chickenPrice, chickenQuantity) {
    var list = document.getElementById("list");

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
    } else {
        chicken[type].quantity++;
        // for (let i = 0; i < matchingChicken.children.length; i++) {
        //     console.log(matchingChicken.children[i].tagName);
        //   }

        matchingChicken.children[2].firstChild.textContent = `${chicken[type].quantity}`;


    }


}

function removeChicken(type) {
    var chickenQuantity = 0;
    matchingChicken = document.querySelector(`.${type}`);


    if (matchingChicken === null) {
        chicken[type].quantity--;
    } else {
        chicken[type].quantity--;

        matchingChicken.children[2].firstChild.textContent = `${chicken[type].quantity}`;
    

        for (i = 0; i < Object.keys(chicken).length; i++) {
            chickenQuantity = chicken["1000season"].quantity + chicken["buttermilk"].quantity + chicken["fireball"].quantity;
            if (chickenQuantity === 0) {
                orderBtn.classList.add("disabled");
                matchingChicken.remove();

            }
        }


    }

    


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
    chickenPriceItem.textContent = `Total Price: ${chickenPrice}`;
    orderModal.children[0].append(chickenPriceItem);

    




}


function clearModal(){
    orderModal.children[0].innerHTML = "";
}