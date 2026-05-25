// =========================
// LOAD ALL DATA
// =========================

document.addEventListener("DOMContentLoaded", () => {

loadItems();
loadDashboard();
loadReports();

});

// =========================
// SAVE ITEM
// =========================

function saveItem(){

let itemCode = document.getElementById("itemCode").value;
let itemName = document.getElementById("itemName").value;
let category = document.getElementById("category").value;
let unit = document.getElementById("unit").value;
let stock = document.getElementById("stock").value;
let cost = document.getElementById("cost").value;
let selling = document.getElementById("selling").value;
let supplier = document.getElementById("supplier").value;

if(
itemCode === "" ||
itemName === "" ||
category === "" ||
unit === "" ||
stock === "" ||
cost === "" ||
selling === "" ||
supplier === ""
){

alert("Please fill all fields");
return;

}

let items = JSON.parse(localStorage.getItem("items")) || [];

items.push({

itemCode,
itemName,
category,
unit,
stock,
cost,
selling,
supplier

});

localStorage.setItem("items", JSON.stringify(items));

alert("Item Saved Successfully");

clearForm();

loadItems();
loadDashboard();
loadReports();

}

// =========================
// LOAD ITEMS
// =========================

function loadItems(){

let items = JSON.parse(localStorage.getItem("items")) || [];

let table = document.getElementById("itemTable");

if(!table) return;

table.innerHTML = "";

items.forEach((item,index)=>{

table.innerHTML += `

<tr>

<td>${item.itemCode}</td>
<td>${item.itemName}</td>
<td>${item.category}</td>
<td>${item.unit}</td>
<td>${item.stock}</td>
<td>₱${item.cost}</td>
<td>₱${item.selling}</td>
<td>${item.supplier}</td>

<td>

<button
class="action-btn edit"
onclick="editItem(${index})">

Edit

</button>

<button
class="action-btn delete"
onclick="deleteItem(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

// =========================
// DELETE ITEM
// =========================

function deleteItem(index){

let items = JSON.parse(localStorage.getItem("items")) || [];

if(confirm("Delete this item?")){

items.splice(index,1);

localStorage.setItem("items", JSON.stringify(items));

loadItems();
loadDashboard();
loadReports();

}

}

// =========================
// EDIT ITEM
// =========================

function editItem(index){

let items = JSON.parse(localStorage.getItem("items")) || [];

document.getElementById("itemCode").value = items[index].itemCode;
document.getElementById("itemName").value = items[index].itemName;
document.getElementById("category").value = items[index].category;
document.getElementById("unit").value = items[index].unit;
document.getElementById("stock").value = items[index].stock;
document.getElementById("cost").value = items[index].cost;
document.getElementById("selling").value = items[index].selling;
document.getElementById("supplier").value = items[index].supplier;

deleteItem(index);

}

// =========================
// CLEAR FORM
// =========================

function clearForm(){

document.getElementById("itemCode").value = "";
document.getElementById("itemName").value = "";
document.getElementById("category").value = "";
document.getElementById("unit").value = "";
document.getElementById("stock").value = "";
document.getElementById("cost").value = "";
document.getElementById("selling").value = "";
document.getElementById("supplier").value = "";

}

// =========================
// SEARCH ITEM
// =========================

function searchItem(){

let input =
document.getElementById("searchInput").value.toLowerCase();

let rows =
document.querySelectorAll("#itemTable tr");

rows.forEach(row=>{

let text = row.innerText.toLowerCase();

row.style.display =
text.includes(input) ? "" : "none";

});

}

// =========================
// DASHBOARD
// =========================

function loadDashboard(){

let items = JSON.parse(localStorage.getItem("items")) || [];

let totalProducts =
document.getElementById("totalProducts");

if(totalProducts){

totalProducts.innerText = items.length;

}

let totalStock = 0;

items.forEach(item=>{

totalStock += Number(item.stock);

});

let totalStocks =
document.getElementById("totalStocks");

if(totalStocks){

totalStocks.innerText = totalStock;

}

}

// =========================
// REPORTS
// =========================

function loadReports(){

let items = JSON.parse(localStorage.getItem("items")) || [];

let reportTable =
document.getElementById("reportTable");

if(!reportTable) return;

reportTable.innerHTML = "";

items.forEach(item=>{

let status =
item.stock <= 20
? "Low Stock"
: "Good";

let statusClass =
item.stock <= 20
? "low"
: "good";

reportTable.innerHTML += `

<tr>

<td>${item.itemName}</td>
<td>${item.category}</td>
<td>${item.stock}</td>

<td class="${statusClass}">
${status}
</td>

<td>${item.supplier}</td>

</tr>

`;

});

}
