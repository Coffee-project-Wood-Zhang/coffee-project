"use strict"
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
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    //html += '<p>' + coffee.id + '<p>';
    html += '<h3 class="coffee-name">' + coffee.name + '</h3>';
    html += '<p class="coffee-roast">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i=0; i < coffees.length;  i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

var roastSelection = document.querySelector('#roast-selection');
roastSelection.addEventListener('change', updateCoffees);
var coffeeListTitle = document.querySelector('.coffee-list-title')

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (selectedRoast === coffee.roast) {
            filteredCoffees.push(coffee);
        } else if(selectedRoast === 'All') {
            filteredCoffees.push(coffee);
        }
    });
    if (selectedRoast === 'light') {
        coffeeListTitle.innerHTML = 'Light coffees';
    } else if (selectedRoast === 'medium') {
        coffeeListTitle.innerHTML = 'Medium coffees';
    } else if (selectedRoast === 'dark') {
        coffeeListTitle.innerHTML = 'Dark coffees';
    } else {
        coffeeListTitle.innerHTML = 'All coffees';
    }
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

var searchCoffee = document.querySelector('#searchCoffee');
searchCoffee.addEventListener('keyup', searchCoffeeFunction);

function searchCoffeeFunction() {
    var searchInput = searchCoffee.value.toLowerCase();
    var filteredCoffees = [];
    coffees.forEach(function (coffee){
        if(coffee.name.toLowerCase().includes(searchInput)) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeListTitle.innerHTML = 'Coffee you may looking for';
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}
var submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', reset);

function reset() {
    roastSelection.value = 'All';
    coffeeListTitle.innerHTML = 'All coffees';
    searchCoffee.value = '';
    coffeeList.innerHTML = renderCoffees(coffees);
}

var inputName = document.querySelector('#input-name');
var inputRoast = document.querySelector('#input-roast');
var coffeeList = document.querySelector('#coffees');
coffeeList.innerHTML = renderCoffees(coffees);

var newCoffee = document.querySelector('#input-submit');
newCoffee.addEventListener('click', addCoffee);
function addCoffee(input) {
    var addID = coffees.length + 1;
    var addName = inputName.value.toLowerCase();
    var addRoast = inputRoast.value.toString();
    input = {id:addID, name:addName, roast:addRoast};
    var existingCoffee = coffees.find(function (coffee) {
        return coffee.name.toLowerCase() === addName;
    });
    if(existingCoffee) {
        alert(addName + ' is already in the menu');
    } else {
        coffees.push(input);
        coffees.sort(function(a, b) {
            var roastOrder = { light: 1, medium: 2, dark: 3 };
            return roastOrder[a.roast] - roastOrder[b.roast];
        });
    }
    coffeeList.innerHTML = renderCoffees(coffees);
    inputName.value = '';
}

var removeSearch = document.querySelector('#remove-name');
removeSearch.addEventListener('keyup', removeSearchFunction);

function removeSearchFunction() {
    var searchInput = removeSearch.value.toLowerCase();
    var filteredCoffees = [];
    coffees.forEach(function (coffee){
        if(coffee.name.toLowerCase().includes(searchInput)) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeListTitle.innerHTML = 'Coffee you may want to remove';
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

var removeName = document.querySelector('#remove-name');
var removeConfirm = document.querySelector('#removeButton');
removeConfirm.addEventListener('click', removeCoffee);

function removeCoffee(input) {
    var remove_Name = removeName.value;
    var menuCoffee = coffees.find(function (coffee) {
        return coffee.name.toLowerCase() === remove_Name;
    });
    if(menuCoffee) {
        for (let i = 0; i < coffees.length; i++) {
            if (coffees[i].name.toLowerCase() === remove_Name.toLowerCase()) {
                coffees.splice(i, 1);
            }
        }
    } else {
        alert('OOPS, there is no ' + remove_Name + ' in the menu');
    }
    coffeeList.innerHTML = renderCoffees(coffees);
    removeName.value = '';
}