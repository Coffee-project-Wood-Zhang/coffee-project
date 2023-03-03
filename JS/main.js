"use strict"

let submitButton = document.querySelector('#submit');
let submitButton2 = document.querySelector('#add');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#coffee-search');
let newCoffee = document.querySelector('#new-coffee')
let newRoast = document.querySelector('#new-roast-selection')
let coffeeListTitle = document.querySelector('.coffee-list-title')
let coffeeList = document.querySelector('#coffees');
let coffeeInfo = document.querySelector('#home-tab-pane');
let coffeeOrigin =document.querySelector('#profile-tab-pane');


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light', info: "'<h2>Light City</h2><p>Is renowned for its sweet flavor</p>'",origin: ''},
    {id: 2, name: 'Half City', roast: 'light', info: "'<h2>Light City</h2><p>Is renowned for its sweet flavor</p>'", origin: ''},
    {id: 3, name: 'Cinnamon', roast: 'light', info: '', origin: ''},
    {id: 4, name: 'City', roast: 'medium', info: '', origin: ''},
    {id: 5, name: 'American', roast: 'medium', info: '', origin: ''},
    {id: 6, name: 'Breakfast', roast: 'medium', info: '', origin: ''},
    {id: 7, name: 'High', roast: 'dark', info: '', origin: ''},
    {id: 8, name: 'Continental', roast: 'dark', info: '', origin: ''},
    {id: 9, name: 'New Orleans', roast: 'dark', info: '', origin: ''},
    {id: 10, name: 'European', roast: 'dark', info: '', origin: ''},
    {id: 11, name: 'Espresso', roast: 'dark', info: '', origin: ''},
    {id: 12, name: 'Viennese', roast: 'dark', info: '', origin: ''},
    {id: 13, name: 'Italian', roast: 'dark', info: '', origin: ''},
    {id: 14, name: 'French', roast: 'dark', info: '', origin: ''},
];

function renderCoffee(coffee) {
    let html = '<button id="coffee-'+coffee.id+'" class="px-1 mx-4 list-items coffee row">';
    html += '<span class="d-flex name col-6">' + coffee.name + '</span>';
    html += '<span class="roast col-2">' + coffee.roast + '</span>';
    html += '<span class="d-flex img col-4">' +'<div class="parent">' +
        '<div class="'+coffee.roast+' d-flex" ></div>' +
        '<img class="child" src="img/local_cafe_FILL0_wght400_GRAD0_opsz48.png">'+'</div>' + '</span>';
    html += '</button>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast || selectedRoast === 'all') {
            filteredCoffees.push(coffee);
        }
    });
    coffeeListTitle.innerHTML = 'Coffee you may be looking for';
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

function searchCoffeeFunction() {
    let searchInput = coffeeSearch.value.toLowerCase();
    let filteredCoffees = [];
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
    coffeeInfo.innerHTML = 'Click a Coffee to learn about it!'
    coffeeOrigin.innerHTML = 'Click a Coffee to learn about it!'
}

function freshCoffee(e) {
    e.preventDefault();
    let coffeeName = newCoffee.value
    let roastType = newRoast.value
    let idNum = coffees.length
    let n = 0;
    let neewCoffee = coffeeName.toLowerCase();
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
                    let roastOrder = { light: 1, medium: 2, dark: 3 };
                    return roastOrder[a.roast] - roastOrder[b.roast];
                });
                coffeeList.innerHTML = renderCoffees(coffees);
            }
        } else {
            break
        }
    }
}
function infoCoffee(){

    coffeeInfo.innerHTML = coffees[1].info;
    coffeeOrigin.innerHTML = "";
}

// let selectedCoffee = addEventListener('click',)
coffeeList.innerHTML = renderCoffees(coffees);

coffeeSearch.addEventListener('keyup', searchCoffeeFunction);
roastSelection.addEventListener('change', updateCoffees);
submitButton.addEventListener('click', reset);
submitButton2.addEventListener('click', freshCoffee);
let info2 = [];
function compile(){
    for(let i=0; i<coffees ;i++){
        info2[i]=document.querySelector('#coffee-')
        console.log(info2)
    }
}
compile()
let info =[document.querySelector('#coffee-1'),
    document.querySelector('#coffee-2'),
    document.querySelector('#coffee-3'),
    document.querySelector('#coffee-4'),
    document.querySelector('#coffee-5'),
    document.querySelector('#coffee-6'),
    document.querySelector('#coffee-7'),
    document.querySelector('#coffee-8'),
    document.querySelector('#coffee-9'),
    document.querySelector('#coffee-10'),
    document.querySelector('#coffee-11'),
    document.querySelector('#coffee-12'),
    document.querySelector('#coffee-13'),
    document.querySelector('#coffee-14')];

    for(let i=0;i<info;i++){
    info[i].addEventListener('click', infoCoffee)
    }