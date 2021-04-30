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