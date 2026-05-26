// =====================================
// MOBILE SIDEBAR
// =====================================

function toggleSidebar(){

const sidebar = document.querySelector('.sidebar');

if(sidebar){
sidebar.classList.toggle('activeSidebar');
}

}

// =====================================
// LOCAL STORAGE DATABASE
// =====================================

function getRawMaterials(){
return JSON.parse(localStorage.getItem('rawMaterials')) || [];
}

function saveRawMaterials(data){
localStorage.setItem('rawMaterials', JSON.stringify(data));
}

function getProductions(){
return JSON.parse(localStorage.getItem('productions')) || [];
}

function saveProductions(data){
localStorage.setItem('productions', JSON.stringify(data));
}

function getFinishedProducts(){
return JSON.parse(localStorage.getItem('finishedProducts')) || [];
}

function saveFinishedProducts(data){
localStorage.setItem('finishedProducts', JSON.stringify(data));
}

function getSales(){
return JSON.parse(localStorage.getItem('sales')) || [];
}

function saveSalesData(data){
localStorage.setItem('sales', JSON.stringify(data));
}

// =====================================
// RAW MATERIALS
// =====================================

function saveRawMaterial(){

let code = document.getElementById('materialCode').value;
let name = document.getElementById('materialName').value;
let category = document.getElementById('materialCategory').value;
let unit = document.getElementById('materialUnit').value;
let stock = document.getElementById('materialStock').value;
let cost = document.getElementById('materialCost').value;
let supplier = document.getElementById('materialSupplier').value;

if(
code === '' ||
name === '' ||
category === '' ||
unit === '' ||
stock === '' ||
cost === '' ||
supplier === ''
){
alert('Please complete all fields');
return;
}

let rawMaterials = getRawMaterials();

rawMaterials.push({
code,
name,
category,
unit,
stock:Number(stock),
cost:Number(cost),
supplier
});

saveRawMaterials(rawMaterials);

alert('Raw Material Saved');

clearRawMaterialForm();
loadRawMaterials();
loadDashboard();
loadProductionDropdown();

}

function loadRawMaterials(){

let table = document.getElementById('rawMaterialTable');

if(!table) return;

let rawMaterials = getRawMaterials();

table.innerHTML = '';

let totalStock = 0;
let lowStock = 0;

rawMaterials.forEach((item,index)=>{

if(Number(item.stock) <= 5){
lowStock++;
}

totalStock += Number(item.stock);

let status = Number(item.stock) <= 5 ? 'Low' : 'Good';
let statusClass = Number(item.stock) <= 5 ? 'low' : 'good';

table.innerHTML += `

<tr>
<td>${item.code}</td>
<td>${item.name}</td>
<td>${item.category}</td>
<td>${item.unit}</td>
<td>${item.stock}</td>
<td>₱${item.cost}</td>
<td>${item.supplier}</td>
<td class="${statusClass}">${status}</td>

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

let rawCount = document.getElementById('rawCount');
let totalStockElement = document.getElementById('totalStock');
let lowStockCount = document.getElementById('lowStockCount');

if(rawCount){
rawCount.innerText = rawMaterials.length;
}

if(totalStockElement){
totalStockElement.innerText = totalStock;
}

if(lowStockCount){
lowStockCount.innerText = lowStock;
}

}

function editRawMaterial(index){

let rawMaterials = getRawMaterials();
let item = rawMaterials[index];

if(!item) return;

document.getElementById('materialCode').value = item.code;
document.getElementById('materialName').value = item.name;
document.getElementById('materialCategory').value = item.category;
document.getElementById('materialUnit').value = item.unit;
document.getElementById('materialStock').value = item.stock;
document.getElementById('materialCost').value = item.cost;
document.getElementById('materialSupplier').value = item.supplier;

rawMaterials.splice(index,1);

saveRawMaterials(rawMaterials);
loadRawMaterials();

}

function deleteRawMaterial(index){

let rawMaterials = getRawMaterials();

if(confirm('Delete this material?')){

rawMaterials.splice(index,1);

saveRawMaterials(rawMaterials);

loadRawMaterials();
loadDashboard();
loadProductionDropdown();

}

}

function clearRawMaterialForm(){

const ids = [
'materialCode',
'materialName',
'materialCategory',
'materialUnit',
'materialStock',
'materialCost',
'materialSupplier'
];

ids.forEach(id=>{

let element = document.getElementById(id);

if(element){
element.value = '';
}

});

}

function searchRawMaterial(){

let input =
document
.getElementById('searchRaw')
.value
.toLowerCase();

let rows =
document.querySelectorAll(
'#rawMaterialTable tr'
);

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

row.style.display =
text.includes(input)
? ''
: 'none';

});

}

// =====================================
// PRODUCTION DROPDOWN
// =====================================

function loadProductionDropdown(){

let materials = getRawMaterials();

let dropdown =
document.getElementById('prodRawMaterial');

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">Select Raw Material</option>';

materials.forEach(item=>{

let option =
document.createElement('option');

option.value = item.name;

option.textContent =
`${item.name} (${item.stock} ${item.unit})`;

dropdown.appendChild(option);

});

}

// =====================================
// PRODUCTION
// =====================================

function saveProduction(){

let prodNo =
document.getElementById('prodNo').value;

let rawMaterial =
document.getElementById('prodRawMaterial').value;

let quantity =
document.getElementById('prodQty').value;

let recipe =
document.getElementById('prodRecipe').value;

let finishedProduct =
document.getElementById('prodFinished').value;

if(
prodNo === '' ||
rawMaterial === '' ||
quantity === '' ||
recipe === '' ||
finishedProduct === ''
){
alert('Please complete all fields');
return;
}

let rawMaterials = getRawMaterials();
let productions = getProductions();
let finishedProducts = getFinishedProducts();

let raw =
rawMaterials.find(
item => item.name === rawMaterial
);

if(!raw){
alert('Raw material not found');
return;
}

if(Number(quantity) > Number(raw.stock)){
alert('Not enough stock');
return;
}

let grams =
Number(quantity) * 1000;

let output =
Math.floor(grams / Number(recipe));

raw.stock =
Number(raw.stock) - Number(quantity);

saveRawMaterials(rawMaterials);

productions.push({

prodNo,
rawMaterial,
quantity,
recipe,
finishedProduct,
output

});

saveProductions(productions);

finishedProducts.push({

code:'FP-' + Date.now(),
name:finishedProduct,
category:'Finished Product',
available:output,
price:0,
batch:prodNo

});

saveFinishedProducts(finishedProducts);

alert('Production Completed');

clearProductionForm();

loadProductions();
loadRawMaterials();
loadFinishedProducts();
loadDashboard();
loadProductionDropdown();
loadSalesDropdown();

}

function loadProductions(){

let table =
document.getElementById('productionTable');

if(!table) return;

let productions = getProductions();

table.innerHTML = '';

productions.forEach(item=>{

table.innerHTML += `

<tr>

<td>${item.prodNo}</td>
<td>${item.rawMaterial}</td>
<td>${item.quantity} KG</td>
<td>${item.recipe} g/order</td>
<td>${item.finishedProduct}</td>
<td>${item.output} Orders</td>
<td class="good">Completed</td>

</tr>

`;

});

}

function clearProductionForm(){

const ids = [
'prodNo',
'prodRawMaterial',
'prodQty',
'prodRecipe',
'prodFinished'
];

ids.forEach(id=>{

let element =
document.getElementById(id);

if(element){
element.value = '';
}

});

}
