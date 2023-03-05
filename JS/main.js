"use strict"

let submitButton = document.querySelector('#submit');
let submitButton2 = document.querySelector('#add');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#coffee-search');
let newCoffee = document.querySelector('#new-coffee');
let newRoast = document.querySelector('#new-roast-selection');
let coffeeListTitle = document.querySelector('.coffee-list-title');
let coffeeList = document.querySelector('#coffees');
let coffeeInfo = document.querySelector('#taste-tab-pane');
let coffeeOrigin = document.querySelector('#profile-tab-pane');
let infoInput = document.querySelector('#coffee-info');
let originInput = document.querySelector('#coffee-origin');
let info = [];
let compiled = 0;

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {
        id: 1,
        name: 'Light City',
        roast: 'light',
        info: '<h2>Light City</h2><p>A strange of name as it is, Light City is generally the term used for very light roasted coffee. It is cooked until you hear the beans crack open in the oven.  </p>',
        origin: '<h2>Light City</h2><p>Named to distinguish itself from the other city coffee variants.</p>'
    },
    {
        id: 2,
        name: 'Half City',
        roast: 'light',
        info: '<h2>Half City</h2><p>Is a kin to Light City, just roasted longer to give it a more coffee-esk flavor.</p>',
        origin: '<h2>Half City</h2><p>Named Half-city becuase it half way to its second crack. </p>'
    },
    {
        id: 3,
        name: 'Cinnamon',
        roast: 'light',
        info: '<h2>Cinnamon</h2><p> Cinnamon is closer in flavor to medium roast beans while still being a light roast.</p>',
        origin: '<h2>Cinnamon</h2><p>This Actually refers to the color of the beans not the Flavor, hence why many know it as Blond roast instead.</p>'
    },
    {
        id: 4,
        name: 'City',
        roast: 'medium',
        info: '<h2>City</h2><p>This roast has reached its first crack and beyond. medium roast are generally sweeter and less fruity than light roasts.</p>',
        origin: '<h2>City</h2><p>Otherwise known as Medium City, it is the mid point of the city variants.</p>'
    },
    {
        id: 5,
        name: 'American',
        roast: 'medium',
        info: '<h2>American</h2><p>This coffee is free, but also very expensive. Jokes aside this is generally a sweeter blend.</p>',
        origin: '<h2>American</h2><p>It named after the country it was created in.</p>'
    },
    {
        id: 6,
        name: 'Breakfast',
        roast: 'medium',
        info: '<h2>Breakfast</h2><p>A roast that is approaching its second crack, it can also be known as After Dinner. However the two can vary, and when they do After Dinner is the Darker of the two</p>',
        origin: '<h2>Breakfast</h2><p>It name arose when people where drinking this blend and think <em>"this would go great with some eggs."</em></p>'
    },
    {
        id: 7,
        name: 'High',
        roast: 'dark',
        info: '<h2>High</h2><p>A roast that has well and truly reached it second crack. The bitter coffee experience black coffee drinker enjoy.</p>',
        origin: '<h2>High</h2><p>It could be consider the high variant of the City coffees, but why would we make things easy on you?</p>'
    },
    {
        id: 8,
        name: 'Continental',
        roast: 'dark',
        info: '<h2>Continental</h2><p>Continental is a roasting of beans from different continents in the same batch. Every batch end ups unique, although each and everyone is roasted to the extreme to through mix the flavors.</p>',
        origin: '<h2>Continental</h2><p>This one follow the same naming convention as the American blend, but with two separate continents. Sure we could come up with a name for every different combine blend out there or we could keep you guess. Everyone likes an expected surprise right?</p>'
    },
    {
        id: 9,
        name: 'New Orleans',
        roast: 'dark',
        info: '<h2>New Orleans</h2><p>A dark roast inspired by the dark roast capital of american, we hope this blend can pay proper homage to the Crescent City</p>',
        origin: '<h2>New Orleans</h2><p>As above so below.</p>'
    },
    {
        id: 10,
        name: 'European',
        roast: 'dark',
        info: '<h2>European</h2><p>Most dark coffee are said to have a deep flavor experience, though we think our European blend is the best personification of that.</p>',
        origin: `<h2>European</h2><p>This one is just flavor text, don't tell anyone!</p>`
    },
    {
        id: 11,
        name: 'Espresso',
        roast: 'dark',
        info: '<h2>Espresso</h2><p>Espresso is an entirely different kind of coffee. Though you can have blond shots of espresso, our is a dark roast that even those who do not enjoy the bitterness of regular coffee might enjoy.</p>',
        origin: '<h2>Espresso</h2><p>Originated in the coffee capital of the world Italy, it how coffee was meant to be drunk. At least according to some.</p>'
    },
    {
        id: 12,
        name: 'Viennese',
        roast: 'dark',
        info: '<h2>Viennese</h2><p>This is a medium-dark roast that is roasted to mid-second crack, and is traditionally popular in Austria’s capital.</p>',
        origin: '<h2>Viennese</h2><p>No that is not just Venice spelled wrong its a real place.</p>'
    },
    {
        id: 13,
        name: 'Italian',
        roast: 'dark',
        info: '<h2>Italian</h2><p>The darkest of dark roast on this list.</p>',
        origin: '<h2>Italian</h2><p>Named after the home of Coffee</p>'
    },
    {
        id: 14,
        name: 'French',
        roast: 'dark',
        info: '<h2>French</h2><p>This is a roast that’s progressed well beyond second crack.</p>',
        origin: '<h2>French</h2><p>Named after the wannabe home to Coffee</p>'
    },
];

function renderCoffee(coffee) {
    let html = '<button id="coffee-' + coffee.id + '" class="px-1 mx-4 list-items coffee row">'
    html += '<span class="d-flex name col-6">' + coffee.name + '</span>';
    html += '<span class="roast col-2">' + coffee.roast + '</span>';
    html += '<span class="d-flex img col-4">' + '<div class="parent">' +
        '<div class="' + coffee.roast + ' d-flex" ></div>' +
        '<img class="child" src="img/local_cafe_FILL0_wght400_GRAD0_opsz48.png">' + '</div>' + '</span>';
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
}

function reloadInfo(e){
    e.preventDefault();
    console.log(compiled)
    coffeeInfo.innerHTML = coffees[compiled].info;
    coffeeOrigin.innerHTML = coffees[compiled].origin;
}

function freshCoffee(e) {
    e.preventDefault();
    let coffeeName = newCoffee.value
    let roastType = newRoast.value
    let idNum = coffees.length
    let info2 = infoInput.value
    let origin = originInput.value
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
                coffees.push({id: idNum + 1, name: coffeeName, roast: roastType, info: info2, origin: origin})
                coffeeList.innerHTML = renderCoffees(coffees);
                info.push(document.querySelector(`#coffee-${coffees.length}`))
                info[compiled].addEventListener('click',reloadInfo)

                compiled++
                setTimeout(function () {
                    coffees.sort(function (a, b) {
                        let roastOrder = {light: 1, medium: 2, dark: 3};
                        return roastOrder[a.roast] - roastOrder[b.roast];
                    })
                    coffeeList.innerHTML = renderCoffees(coffees)
                }, .1000)
            }
        } else {
            break;
        }
    }
    newCoffee.value = '';
    infoInput.value = '';
    originInput.value = '';
}

coffeeList.innerHTML = renderCoffees(coffees);

coffeeSearch.addEventListener('keyup', searchCoffeeFunction);
roastSelection.addEventListener('change', updateCoffees);
submitButton.addEventListener('click', reset);
submitButton2.addEventListener('click', freshCoffee);

for (let i = 0; i < coffees.length; i++) {
    info[i] = document.querySelector(`#coffee-${coffees[i].id}`)
    info[i].addEventListener('click', function (e) {
        e.preventDefault();
        console.log(`clicked`)
        coffeeInfo.innerHTML = coffees[i].info;
        coffeeOrigin.innerHTML = coffees[i].origin;
    });
    console.log(info[i])
    compiled++
}