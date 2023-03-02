"use strict"

var submitButton = document.querySelector('#submit');
var submitButton2 = document.querySelector('#add');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSearch = document.querySelector('#coffee-search');
var newCoffee = document.querySelector('#new-coffee')
var newRoast = document.querySelector('#new-roast-selection')
var coffeeListTitle = document.querySelector('.coffee-list-title')
var coffeeList = document.querySelector('#coffees');
var addsymbol = document.querySelector("input#add[value]")

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

function renderCoffee(coffee) {
    var html = '<div class="coffee row">';
    html += '<span class="name col-7">' + coffee.name + '</span>';
    html += '<span class="roast col-3">' + coffee.roast + '</span>';
    html += '<span class="img col-1">' +'<div class="parent">'+ '<div class="'+coffee.roast+' d-flex" ></div>' + '<img class="child" src="img/local_cafe_FILL0_wght400_GRAD0_opsz48.png">'+'</div>' + '</span>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast || selectedRoast === 'all') {
            filteredCoffees.push(coffee);
        }
    });
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

function searchCoffeeFunction() {
    var searchInput = coffeeSearch.value.toLowerCase();
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().includes(searchInput)) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeListTitle.innerHTML = 'Coffee you may be looking for';
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}


function reset(e) {
    e.preventDefault();
    roastSelection.value = 'all';
    coffeeListTitle.innerHTML = 'All Coffees!';
    coffeeList.innerHTML = renderCoffees(coffees);
    coffeeSearch.value = '';
}

function freshCoffee(e) {
    e.preventDefault();
    var coffeeName = newCoffee.value
    var roastType = newRoast.value
    var idNum = coffees.length
    let n = 0;
    var neewCoffee = coffeeName.toLowerCase();
    for (let i = 0; i < idNum; i++) {
        let coffee = coffees[i].name.toLowerCase();
        if (coffee === neewCoffee) {
            n -= 1
            break
        } else if (neewCoffee !== coffee) {
            n += 1
            if (n !== idNum) {
                continue;
            } else if (n === idNum) {
                coffees.push({id: idNum + 1, name: coffeeName, roast: roastType})
                coffees.sort(function(a, b) {
                    var roastOrder = { light: 1, medium: 2, dark: 3 };
                    return roastOrder[a.roast] - roastOrder[b.roast];
                });
                coffeeList.innerHTML = renderCoffees(coffees);
            }
        } else {
            break
        }
    }
}

coffeeList.innerHTML = renderCoffees(coffees);

coffeeSearch.addEventListener('keyup', searchCoffeeFunction);
roastSelection.addEventListener('change', updateCoffees);
submitButton.addEventListener('click', reset);
submitButton2.addEventListener('click', freshCoffee);