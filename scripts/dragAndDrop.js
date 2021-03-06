function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    event.preventDefault();

    var id = event.dataTransfer.getData("id");
    let tableId = event.target.id;

    let [item] = tables[tableId].items.filter((e) => e.name === items[id].name);

    if (!item) {
        tables[tableId].total_items += 1;
        tables[tableId].total_price += items[id].price;
        tables[tableId].items.push({ ...items[id], servings: 1 });
    } else {
        item.servings += 1;
        tables[tableId].total_price += item.price;
    }
    refreshAllTables();
}

function allowDrop(event) {
    event.preventDefault();
}