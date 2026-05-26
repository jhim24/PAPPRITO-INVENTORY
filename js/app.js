// ============================
// MOBILE SIDEBAR
// ============================

function toggleSidebar(){

document
.querySelector(".sidebar")
.classList.toggle("activeSidebar");

}

// ============================
// RAW MATERIALS
// ============================

let rawMaterials =
JSON.parse(localStorage.getItem("rawMaterials")) || [];

function saveRawMaterial(){

let code =
document.getElementById("materialCode").value;

let name =
document.getElementById("materialName").value;

let category =
document.getElementById("materialCategory").value;

let unit =
document.getElementById("materialUnit").value;

let stock =
document.getElementById("materialStock").value;

let cost =
document.getElementById("materialCost").value;

let supplier =
document.getElementById("materialSupplier").value;

if(
code === "" ||
name === "" ||
category === "" ||
unit === "" ||
stock === "" ||
cost === "" ||
supplier === ""
){

alert("Please fill all fields");
return;

}

rawMaterials.push({

code,
name,
category,
unit,
stock,
cost,
supplier

});

localStorage.setItem(
"rawMaterials",
JSON.stringify(rawMaterials)
);

alert("Raw Material Saved");

loadRawMaterials();

clearRawMaterialForm();

}

// ============================
// LOAD RAW MATERIALS
// ============================

function loadRawMaterials(){

let table =
document.getElementById("rawMaterialTable");

if(!table) return;

table.innerHTML = "";

rawMaterials.forEach((item,index)=>{

let status =
item.stock <= 5
? "Low"
: "Good";

let statusClass =
item.stock <= 5
? "low"
: "good";

table.innerHTML += `

<tr>

<td>${item.code}</td>
<td>${item.name}</td>
<td>${item.category}</td>
<td>${item.unit}</td>
<td>${item.stock}</td>
<td>₱${item.cost}</td>
<td>${item.supplier}</td>

<td class="${statusClass}">
${status}
</td>

<td>

<button
class="action-btn edit"
onclick="editRawMaterial(${index})">

Edit

</button>

<button
class="action-btn delete"
onclick="deleteRawMaterial(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

// ============================
// DELETE RAW MATERIAL
// ============================

function deleteRawMaterial(index){

if(confirm("Delete this item?")){

rawMaterials.splice(index,1);

localStorage.setItem(
"rawMaterials",
JSON.stringify(rawMaterials)
);

loadRawMaterials();

}

}

// ============================
// EDIT RAW MATERIAL
// ============================

function editRawMaterial(index){

let item = rawMaterials[index];

document.getElementById("materialCode").value =
item.code;

document.getElementById("materialName").value =
item.name;

document.getElementById("materialCategory").value =
item.category;

document.getElementById("materialUnit").value =
item.unit;

document.getElementById("materialStock").value =
item.stock;

document.getElementById("materialCost").value =
item.cost;

document.getElementById("materialSupplier").value =
item.supplier;

deleteRawMaterial(index);

}

// ============================
// CLEAR FORM
// ============================

function clearRawMaterialForm(){

document.getElementById("materialCode").value = "";
document.getElementById("materialName").value = "";
document.getElementById("materialCategory").value = "";
document.getElementById("materialUnit").value = "";
document.getElementById("materialStock").value = "";
document.getElementById("materialCost").value = "";
document.getElementById("materialSupplier").value = "";

}

// ============================
// SEARCH RAW MATERIAL
// ============================

function searchRawMaterial(){

let input =
document
.getElementById("searchRaw")
.value
.toLowerCase();

let rows =
document.querySelectorAll(
"#rawMaterialTable tr"
);

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

row.style.display =
text.includes(input)
? ""
: "none";

});

}

// ============================
// FINISHED PRODUCTS
// ============================

let finishedProducts =
JSON.parse(
localStorage.getItem("finishedProducts")
) || [];

function loadFinishedProducts(){

let table =
document.getElementById("finishedTable");

if(!table) return;

table.innerHTML = "";

finishedProducts.forEach((item,index)=>{

let status =
item.available <= 10
? "Low"
: "Available";

let statusClass =
item.available <= 10
? "low"
: "good";

table.innerHTML += `

<tr>

<td>${item.code}</td>
<td>${item.name}</td>
<td>${item.category}</td>
<td>${item.available}</td>
<td>₱${item.price}</td>
<td>${item.batch}</td>

<td class="${statusClass}">
${status}
</td>

<td>

<button
class="action-btn delete"
onclick="deleteFinished(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

// ============================
// DELETE FINISHED PRODUCT
// ============================

function deleteFinished(index){

finishedProducts.splice(index,1);

localStorage.setItem(
"finishedProducts",
JSON.stringify(finishedProducts)
);

loadFinishedProducts();

}

// ============================
// PRODUCTION
// ============================

let productions =
JSON.parse(
localStorage.getItem("productions")
) || [];

function saveProduction(){

let prodNo =
document.getElementById("prodNo").value;

let rawMaterial =
document.getElementById("prodRawMaterial").value;

let quantity =
document.getElementById("prodQty").value;

let recipe =
document.getElementById("prodRecipe").value;

let finishedProduct =
document.getElementById("prodFinished").value;

// COMPUTE OUTPUT

let grams =
Number(quantity) * 1000;

let output =
Math.floor(grams / recipe);

// FIND RAW MATERIAL

let raw =
rawMaterials.find(
item => item.name === rawMaterial
);

if(!raw){

alert("Raw material not found");
return;

}

// CHECK STOCK

if(Number(quantity) > Number(raw.stock)){

alert("Not enough stock");
return;

}

// DEDUCT RAW MATERIAL

raw.stock =
Number(raw.stock) - Number(quantity);

// SAVE RAW MATERIAL UPDATE

localStorage.setItem(
"rawMaterials",
JSON.stringify(rawMaterials)
);

// SAVE PRODUCTION

productions.push({

prodNo,
rawMaterial,
quantity,
recipe,
finishedProduct,
output

});

localStorage.setItem(
"productions",
JSON.stringify(productions)
);

// SAVE FINISHED PRODUCT

finishedProducts.push({

code:"FP-"+Date.now(),

name:finishedProduct,

category:"Finished Product",

available:output,

price:0,

batch:prodNo

});

localStorage.setItem(
"finishedProducts",
JSON.stringify(finishedProducts)
);

alert("Production Saved");

loadProductions();
loadRawMaterials();
loadFinishedProducts();

clearProductionForm();

}

// ============================
// LOAD PRODUCTIONS
// ============================

function loadProductions(){

let table =
document.getElementById("productionTable");

if(!table) return;

table.innerHTML = "";

productions.forEach(prod=>{

table.innerHTML += `

<tr>

<td>${prod.prodNo}</td>
<td>${prod.rawMaterial}</td>
<td>${prod.quantity}KG</td>
<td>${prod.recipe}g/order</td>
<td>${prod.finishedProduct}</td>
<td>${prod.output} Orders</td>
<td class="good">Completed</td>

</tr>

`;

});

}

// ============================
// CLEAR PRODUCTION FORM
// ============================

function clearProductionForm(){

document.getElementById("prodNo").value = "";
document.getElementById("prodRawMaterial").value = "";
document.getElementById("prodQty").value = "";
document.getElementById("prodRecipe").value = "";
document.getElementById("prodFinished").value = "";

}

// ============================
// SALES
// ============================

let sales =
JSON.parse(
localStorage.getItem("sales")
) || [];

function saveSale(){

let receipt =
document.getElementById("saleReceipt").value;

let product =
document.getElementById("saleProduct").value;

let qty =
document.getElementById("saleQty").value;

let price =
document.getElementById("salePrice").value;

let cashier =
document.getElementById("saleCashier").value;

let finished =
finishedProducts.find(
item => item.name === product
);

if(!finished){

alert("Product not found");
return;

}

// CHECK STOCK

if(Number(qty) > Number(finished.available)){

alert("Not enough available orders");
return;

}

// DEDUCT PRODUCT

finished.available =
Number(finished.available) - Number(qty);

localStorage.setItem(
"finishedProducts",
JSON.stringify(finishedProducts)
);

// TOTAL

let total =
Number(qty) * Number(price);

// SAVE SALE

sales.push({

receipt,
product,
qty,
price,
total,
cashier

});

localStorage.setItem(
"sales",
JSON.stringify(sales)
);

alert("Sale Saved");

loadSales();
loadFinishedProducts();

clearSalesForm();

}

// ============================
// LOAD SALES
// ============================

function loadSales(){

let table =
document.getElementById("salesTable");

if(!table) return;

table.innerHTML = "";

sales.forEach(sale=>{

table.innerHTML += `

<tr>

<td>${sale.receipt}</td>
<td>${sale.product}</td>
<td>${sale.qty}</td>
<td>₱${sale.price}</td>
<td>₱${sale.total}</td>
<td>${sale.cashier}</td>
<td class="good">Paid</td>

</tr>

`;

});

}

// ============================
// CLEAR SALES FORM
// ============================

function clearSalesForm(){

document.getElementById("saleReceipt").value = "";
document.getElementById("saleProduct").value = "";
document.getElementById("saleQty").value = "";
document.getElementById("salePrice").value = "";
document.getElementById("saleCashier").value = "";

}

// ============================
// DASHBOARD COUNTS
// ============================

function loadDashboardCounts(){

let rawCount =
document.getElementById("rawCount");

if(rawCount){

rawCount.innerText =
rawMaterials.length;

}

let productionCount =
document.getElementById("productionCount");

if(productionCount){

productionCount.innerText =
productions.length;

}

let salesCount =
document.getElementById("salesCount");

if(salesCount){

salesCount.innerText =
sales.length;

}

}

// ============================
// AUTO LOAD
// ============================

document.addEventListener(
"DOMContentLoaded",
()=>{

loadRawMaterials();
loadFinishedProducts();
loadProductions();
loadSales();
loadDashboardCounts();
loadProductionDropdown?.();
}
);
