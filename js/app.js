// =====================================
// MOBILE SIDEBAR
// =====================================

function toggleSidebar(){

const sidebar =
document.querySelector(
'.sidebar'
);

if(sidebar){

sidebar.classList.toggle(
'activeSidebar'
);

}

}

// =====================================
// ITEMS MASTERLIST
// =====================================

function getMasterItems(){

return JSON.parse(
localStorage.getItem(
'masterItems'
)
) || [];

}

function saveMasterItems(data){

localStorage.setItem(
'masterItems',
JSON.stringify(data)
);

}

function saveMasterItem(){

let code =
document.getElementById(
'masterCode'
).value;

let name =
document.getElementById(
'masterName'
).value;

let category =
document.getElementById(
'masterCategory'
).value;

let unit =
document.getElementById(
'masterUnit'
).value;

let cost =
document.getElementById(
'masterCost'
).value;

let supplier =
document.getElementById(
'masterSupplier'
).value;

if(
code === '' ||
name === '' ||
category === '' ||
unit === '' ||
cost === '' ||
supplier === ''
){
alert('Complete all fields');
return;
}

let items =
getMasterItems();

items.push({

code,
name,
category,
unit,
cost,
supplier

});

saveMasterItems(items);

alert('Item Saved');

clearMasterForm();

loadMasterItems();

}

function loadMasterItems(){

let table =
document.getElementById(
'masterTable'
);

if(!table) return;

let items =
getMasterItems();

table.innerHTML = '';

items.forEach((item,index)=>{

table.innerHTML += `

<tr>

<td>${item.code}</td>
<td>${item.name}</td>
<td>${item.category}</td>
<td>${item.unit}</td>
<td>₱${item.cost}</td>
<td>${item.supplier}</td>

<td>

<button
class="action-btn edit"
onclick="editMasterItem(${index})">

Edit

</button>

<button
class="action-btn delete"
onclick="deleteMasterItem(${index})">

Delete

</button>

</td>

</tr>

`;

});

let masterItemCount =
document.getElementById(
'masterItemCount'
);

let masterCategoryCount =
document.getElementById(
'masterCategoryCount'
);

if(masterItemCount){

masterItemCount.innerText =
items.length;

}

let categories =
[
...new Set(
items.map(
item=>item.category
)
)
];

if(masterCategoryCount){

masterCategoryCount.innerText =
categories.length;

}

}

function editMasterItem(index){

let items =
getMasterItems();

let item =
items[index];

document.getElementById(
'masterCode'
).value = item.code;

document.getElementById(
'masterName'
).value = item.name;

document.getElementById(
'masterCategory'
).value = item.category;

document.getElementById(
'masterUnit'
).value = item.unit;

document.getElementById(
'masterCost'
).value = item.cost;

document.getElementById(
'masterSupplier'
).value = item.supplier;

items.splice(index,1);

saveMasterItems(items);

loadMasterItems();

}

function deleteMasterItem(index){

let items =
getMasterItems();

if(confirm('Delete Item?')){

items.splice(index,1);

saveMasterItems(items);

loadMasterItems();

}

}

function clearMasterForm(){

const ids = [

'masterCode',
'masterName',
'masterCategory',
'masterUnit',
'masterCost',
'masterSupplier'

];

ids.forEach(id=>{

let element =
document.getElementById(id);

if(element){

element.value = '';

}

});

}

function searchMasterItem(){

let input =
document
.getElementById(
'searchMaster'
)
.value
.toLowerCase();

let rows =
document.querySelectorAll(
'#masterTable tr'
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
// CATEGORY
// =====================================

function saveCategory(){

let name =
document.getElementById(
'categoryName'
).value;

let description =
document.getElementById(
'categoryDescription'
).value;

if(
name === '' ||
description === ''
){
alert('Complete all fields');
return;
}

let categories =
JSON.parse(
localStorage.getItem(
'categories'
)
) || [];

categories.push({

name,
description

});

localStorage.setItem(
'categories',
JSON.stringify(categories)
);

alert('Category Saved');

document.getElementById(
'categoryName'
).value = '';

document.getElementById(
'categoryDescription'
).value = '';

loadCategories();

}

function loadCategories(){

let table =
document.getElementById(
'categoryTable'
);

if(!table) return;

let categories =
JSON.parse(
localStorage.getItem(
'categories'
)
) || [];

table.innerHTML = '';

categories.forEach((item,index)=>{

table.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.description}</td>

<td class="good">
Active
</td>

<td>

<button
class="action-btn delete"
onclick="deleteCategory(${index})">

Delete

</button>

</td>

</tr>

`;

});

let categoryCount =
document.getElementById(
'categoryCount'
);

if(categoryCount){

categoryCount.innerText =
categories.length;

}

}

function deleteCategory(index){

let categories =
JSON.parse(
localStorage.getItem(
'categories'
)
) || [];

if(confirm('Delete Category?')){

categories.splice(index,1);

localStorage.setItem(
'categories',
JSON.stringify(categories)
);

loadCategories();

}

}

function searchCategory(){

let input =
document
.getElementById(
'searchCategory'
)
.value
.toLowerCase();

let rows =
document.querySelectorAll(
'#categoryTable tr'
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
// RAW MATERIALS
// =====================================

function saveRawMaterial(){

let code =
document.getElementById(
'materialCode'
).value;

let name =
document.getElementById(
'materialName'
).value;

let category =
document.getElementById(
'materialCategory'
).value;

let unit =
document.getElementById(
'materialUnit'
).value;

let stock =
document.getElementById(
'materialStock'
).value;

let cost =
document.getElementById(
'materialCost'
).value;

let supplier =
document.getElementById(
'materialSupplier'
).value;

if(
code === '' ||
name === '' ||
category === '' ||
unit === '' ||
stock === '' ||
cost === '' ||
supplier === ''
){
alert('Complete all fields');
return;
}

let materials =
JSON.parse(
localStorage.getItem(
'rawMaterials'
)
) || [];

materials.push({

code,
name,
category,
unit,
stock:Number(stock),
cost:Number(cost),
supplier

});

localStorage.setItem(
'rawMaterials',
JSON.stringify(materials)
);

alert('Material Saved');

location.reload();

}

function loadRawMaterials(){

let table =
document.getElementById(
'rawMaterialTable'
);

if(!table) return;

let materials =
JSON.parse(
localStorage.getItem(
'rawMaterials'
)
) || [];

table.innerHTML = '';

let totalStock = 0;
let lowStock = 0;

materials.forEach((item,index)=>{

totalStock +=
Number(item.stock);

if(Number(item.stock) <= 5){

lowStock++;

}

let status =
Number(item.stock) <= 5
? 'Low Stock'
: 'Available';

let statusClass =
Number(item.stock) <= 5
? 'low'
: 'good';

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
class="action-btn delete"
onclick="deleteRawMaterial(${index})">

Delete

</button>

</td>

</tr>

`;

});

let rawCount =
document.getElementById(
'rawCount'
);

let totalStockElement =
document.getElementById(
'totalStock'
);

let lowStockCount =
document.getElementById(
'lowStockCount'
);

if(rawCount){

rawCount.innerText =
materials.length;

}

if(totalStockElement){

totalStockElement.innerText =
totalStock;

}

if(lowStockCount){

lowStockCount.innerText =
lowStock;

}

}

function deleteRawMaterial(index){

let materials =
JSON.parse(
localStorage.getItem(
'rawMaterials'
)
) || [];

if(confirm('Delete Material?')){

materials.splice(index,1);

localStorage.setItem(
'rawMaterials',
JSON.stringify(materials)
);

loadRawMaterials();

}

}

function searchRawMaterial(){

let input =
document
.getElementById(
'searchRaw'
)
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

let materials =
JSON.parse(
localStorage.getItem(
'rawMaterials'
)
) || [];

let dropdown =
document.getElementById(
'prodRawMaterial'
);

if(!dropdown) return;

dropdown.innerHTML =
'<option value="">Select Raw Material</option>';

materials.forEach(item=>{

dropdown.innerHTML += `

<option value="${item.name}">
${item.name} (${item.stock})
</option>

`;

});

}

// =====================================
// AUTO LOAD
// =====================================

document.addEventListener(
'DOMContentLoaded',
()=>{

loadMasterItems();
loadCategories();
loadRawMaterials();
loadProductionDropdown();

}
);
