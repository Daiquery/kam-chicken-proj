const tax = 0.04;

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

function createRowComponent(type, chickenName, chickenPrice, chickenQuantity){
    //creation
    list = document.getElementById("list");

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
    decrease = document.createElement("button");
    decrease.className = "btn btn-sm btn-light";
    decrease.style = "height: 30px;";
    decrease.textContent = "-"

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
    matchingChicken = document.querySelector(`.${type}`);
    if(matchingChicken === null){
        chicken[type].quantity++;
        createRowComponent(type, chicken[type].name, chicken[type].price, chicken[type].quantity);
        console.log(chicken[type])   
    } else {
        chicken[type].quantity++;
        // for (let i = 0; i < matchingChicken.children.length; i++) {
        //     console.log(matchingChicken.children[i].tagName);
        //   }

        matchingChicken.children[2].firstChild.textContent = `${chicken[type].quantity}`;

          
    }
 
}

function removeChicken(type) {

}

