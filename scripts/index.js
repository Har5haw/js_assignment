let tables = [
    {
        name: "Harsha",
        total_price: 0.0,
        total_items: 0,
        items: []
    },
    {
        name: "Vardhan",
        total_price: 0.0,
        total_items: 0,
        items: []
    },
    {
        name: "Shaw",
        total_price: 0.0,
        total_items: 0,
        items: []
    }
]

let items = [
    {
        name: "Gulab Jamun",
        price: 105.00,
        course: "desserts"
    },
    {
        name: "Lassi",
        price: 150.00,
        course: "beverages"
    },
    {
        name: "Gajar Ka Halwa",
        price: 85.00,
        course: "desserts"
    },
    {
        name: "Paneer Tikka",
        price: 105.00,
        course: "Appetizers Or Starters"
    },
    {
        name: "Kheer",
        price: 150.00,
        course: "desserts"
    },
    {
        name: "Rasgulla",
        price: 110.00,
        course: "desserts"
    },
    {
        name: "Manchuria",
        price: 85.00,
        course: "Appetizers Or Starters"
    },
    {
        name: "Kaju ki Barfi",
        price: 120.00,
        course: "desserts"
    },
    {
        name: "Samosa",
        price: 120.00,
        course: "Appetizers Or Starters"
    },

    {
        name: "Masala Chai",
        price: 110.00,
        course: "beverages"
    },
    {
        name: "Butter Nan",
        price: 150.00,
        course: "Appetizers Or Starters"
    },
    {
        name: "South indian Coffee",
        price: 105.00,
        course: "beverages"
    },
    {
        name: "Biryani",
        price: 185.00,
        course: "Large"
    },
    {
        name: "Chicken curry",
        price: 120.00,
        course: "Curries"
    },
    {
        name: "Sushi",
        price: 150.00,
        course: "Appetizers Or Starters"
    }
]

refreshAllTables = () => {
    let tableContainer = document.getElementById("tablesList");

    tableContainer.innerHTML = '';

    tables.forEach((element, index) => {
        let tableItem = document.createElement('div');
        tableItem.className = "tableItem";
        tableItem.id = index;
        tableItem.setAttribute("ondrop", "drop(event)");
        tableItem.setAttribute("ondragover", "allowDrop(event)");
        tableItem.setAttribute("onclick", "tableClick(event.target.id)");

        tableItem.innerHTML = element.name + "<br>" + "Amount: " + element.total_price + " Rs | Total items: " + element.total_items;

        tableContainer.appendChild(tableItem);
    });
}

refreshAllItems = () => {
    let itemContainer = document.getElementById("itemsList");

    itemContainer.innerHTML = '';

    items.forEach((element, index) => {
        let item = document.createElement('div');
        item.className = "item";
        item.id = index;
        item.setAttribute("draggable", "true");
        item.setAttribute("ondragstart", "drag(event)");

        item.innerHTML = element.name + "<br>" + "Price: " + element.price + " Rs";

        itemContainer.appendChild(item);
    });
}

window.onload = () => {
    refreshAllTables();
    refreshAllItems();
}

var timeoutId;
let search_table_text = "";

function tablesSearch(val) {
    if (val || search_table_text) {
        search_table_text = val;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(doneTypingTables, 500);
    }
}

function doneTypingTables() {

    if (search_table_text) {

        let tableContainer = document.getElementById("tablesList");

        tableContainer.innerHTML = '';

        tables.forEach((element, index) => {
            if (element.name.toLowerCase().includes(search_table_text)) {
                let tableItem = document.createElement('div');
                tableItem.className = "tableItem";
                tableItem.id = index;
                tableItem.setAttribute("ondrop", "drop(event)");
                tableItem.setAttribute("ondragover", "allowDrop(event)");
                tableItem.setAttribute("onclick", "tableClick(event.target.id)");

                tableItem.innerHTML = element.name + "<br>" + "Amount: " + element.total_price + " Rs | Total items: " + element.total_items;

                tableContainer.appendChild(tableItem);
            }
        });
    } else {
        refreshAllTables();
    }
}


let search_item_text = "";
function itemsSearch(val) {
    if (val || search_item_text) {
        search_item_text = val;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(doneTypingItems, 500);
    }
}

function doneTypingItems() {

    if (search_item_text) {

        let itemContainer = document.getElementById("itemsList");

        itemContainer.innerHTML = '';

        items.forEach((element, index) => {
            if (element.name.toLowerCase().includes(search_item_text) || element.course.toLowerCase().includes(search_item_text)) {
                let item = document.createElement('div');
                item.className = "item";
                item.id = index;
                item.setAttribute("draggable", "true");
                item.setAttribute("ondragstart", "drag(event)");

                item.innerHTML = element.name + "<br>" + "Price: " + element.price + " Rs";

                itemContainer.appendChild(item);
            }
        });
    } else {
        refreshAllItems();
    }
}

function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    event.preventDefault();

    var id = event.dataTransfer.getData("id");
    let tableId = event.target.id;

    if (!tables[tableId].items.filter((e) => e.name === items[id].name).length) {

        tables[tableId].total_items += 1;
        tables[tableId].total_price += items[id].price;
        tables[tableId].items.push({ ...items[id], servings: 1 });
        refreshAllTables();
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function generatePopup(id) {
    let popup = document.getElementById("popupContent");

    popup.innerHTML = '';

    let title = document.createElement('div');
    title.innerHTML = tables[id].name;

    popup.appendChild(title);

    if (tables[id].items.length) {

        let table = document.createElement('table');

        let tr = document.createElement('tr');

        let th = document.createElement('th');
        th.innerHTML = "Item Name"
        tr.appendChild(th);
        th = document.createElement('th');
        th.innerHTML = "Item Price";
        tr.appendChild(th);
        th = document.createElement('th');
        th.innerHTML = "Servings";
        tr.appendChild(th);
        th = document.createElement('th');
        th.innerHTML = "Delete Item";
        tr.appendChild(th);

        table.appendChild(tr);

        tables[id].items.forEach((element, index) => {
            tr = document.createElement('tr');

            let td = document.createElement('td');
            td.innerHTML = element.name;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = element.price;
            tr.appendChild(td);

            td = document.createElement('td');
            let input = document.createElement('input');
            input.id = id + "-" + index;
            input.setAttribute("onkeyup", "changeServings(event)");
            input.setAttribute("value", element.servings);
            td.appendChild(input);

            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = "DELETE";
            td.setAttribute("onclick", "deleteItemFromTable(event)")
            td.id = id + "-" + index + "-delete";
            td.className = "deleteItem";
            tr.appendChild(td);

            table.appendChild(tr);
        });

        popup.appendChild(table);
    } else {
        let noItems = document.createElement('div')
        noItems.innerHTML = "There are no items in this Table";

        popup.appendChild(noItems);
    }

    let totalPrice = document.createElement('div')
    totalPrice.innerHTML = "Total Price: " + tables[id].total_price;

    popup.appendChild(totalPrice);

    popup = document.getElementById("popup");

    popup.className = "popup-on";
}

function tableClick(id) {
    generatePopup(id);
}

function closepopup() {
    let popup = document.getElementById("popup");
    popup.className = "popup-off";
}

function changeServings(event) {
    if (event.target.value >= 1) {
        let input = document.getElementById(event.target.id);
        input.className = "";

        let [tableId, itemId] = event.target.id.split("-");
        tables[tableId].total_price += (event.target.value - tables[tableId].items[itemId].servings) * tables[tableId].items[itemId].price;
        tables[tableId].items[itemId].servings = event.target.value;
        refreshAllTables();
    } else {
        let input = document.getElementById(event.target.id);
        input.className = "input-error";
    }
}

function deleteItemFromTable(event) {
    let [tableId, itemId] = event.target.id.split("-");
    tables[tableId].total_price -= tables[tableId].items[itemId].price * tables[tableId].items[itemId].servings;
    tables[tableId].total_items -= 1;
    tables[tableId].items.splice(itemId, 1);
    generatePopup(tableId);
    refreshAllTables();
}