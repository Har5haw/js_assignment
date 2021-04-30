
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

        tableItem.innerHTML = "Table Name: " + element.name + "<br>" + "Amount: " + element.total_price + " Rs | Total items: " + element.total_items;

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

        item.innerHTML = "Item Name: " + element.name + "<br>" + "Price: " + element.price + " Rs";

        itemContainer.appendChild(item);
    });
}

window.onload = () => {

    refreshAllTables();
    refreshAllItems();

}