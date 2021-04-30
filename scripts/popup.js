function generatePopup(id) {
    let popup = document.getElementById("popupContent");

    let close = document.createElement("div");
    close.innerHTML = "✕"
    close.setAttribute("onclick", "closepopup()");
    close.className = "close-popup";

    popup.innerHTML = '';

    popup.appendChild(close);

    let title = document.createElement('div');
    title.innerHTML = "Table Name: " + tables[id].name;

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
            let span = document.createElement('span');
            span.id = id + "-" + index + "-error";
            span.className = "error";
            td.appendChild(input);
            td.appendChild(document.createElement('br'));
            td.appendChild(span);
            tr.appendChild(td);

            td = document.createElement('td');
            let div = document.createElement('div');
            div.className = "deleteItem";
            div.id = id + "-" + index + "-delete";
            div.setAttribute("onclick", "deleteItemFromTable(event)");
            td.appendChild(div);
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
    totalPrice.id = "popup-total-price"

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
    if (event.target.value >= 1 && event.target.value < 1000) {

        let input = document.getElementById(event.target.id);
        input.className = "";

        let span = document.getElementById(event.target.id + "-error");
        span.innerHTML = "";

        let [tableId, itemId] = event.target.id.split("-");
        tables[tableId].total_price += (event.target.value - tables[tableId].items[itemId].servings) * tables[tableId].items[itemId].price;
        tables[tableId].items[itemId].servings = event.target.value;

        let popupTotalPrice = document.getElementById("popup-total-price");
        popupTotalPrice.innerHTML = "Total Price: " + tables[tableId].total_price;
        refreshAllTables();
    } else {
        let input = document.getElementById(event.target.id);
        input.className = "input-error";

        let span = document.getElementById(event.target.id + "-error");
        span.innerHTML = "Servings should be between 1 and 1000";
    }
}

function deleteItemFromTable(event) {
    let [tableId, itemId] = event.target.id.split("-");
    console.log(tableId);
    tables[tableId].total_price -= tables[tableId].items[itemId].price * tables[tableId].items[itemId].servings;
    tables[tableId].total_items -= 1;
    tables[tableId].items.splice(itemId, 1);
    generatePopup(tableId);
    refreshAllTables();
}