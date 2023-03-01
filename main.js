"use strict"

function renderCoffee(coffee) {
    var html = '<span class="coffee">';
    html += '<span>' + coffee.id + '</span>';
    html += '<span>' + coffee.name + '</span>';
    html += '<span>' + coffee.roast + '</span>';
    html += '</span>';

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
    var searchedRoast = roastSearch.value;
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast || coffee.roast === searchedRoast || selectedRoast === 'all') {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

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

function freshCoffee(e) {
    e.preventDefault();
    var coffeeName = newCoffee.value
    var roastType = newRoast.value
    var idNum = coffees.length
    var neewCoffee = {name: coffeeName.toLowerCase(), roast: roastType.toString()}
    for (let i = 0; i < idNum; i++) {
        let n = 0;
        let coffee = {name: coffees[i].name.toLowerCase(), roast: coffees[i].roast};
        console.log(coffee)
        console.log(neewCoffee)
        if (neewCoffee === coffee) {
            break
        } else if (neewCoffee !== coffee) {
            n++
            console.log(n)
            if (n !== idNum) {
                continue;
            } else if (n === idNum) {
                coffees.push({id: idNum + 1, name: coffeeName, roast: roastType})
                tbody.innerHTML = renderCoffees(coffees);
            }
        } else {
            break
        }
    }
}

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var submitButton2 = document.querySelector('#add');
var roastSelection = document.querySelector('#roast-selection');
var roastSearch = document.querySelector('#roast-search');
var newCoffee = document.querySelector('#new-coffee')
var newRoast = document.querySelector('#new-roast-selection')


tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
submitButton2.addEventListener('click', freshCoffee);
