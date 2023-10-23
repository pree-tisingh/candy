let i = 1;

let form = document.getElementById('my-form');
form.addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();
    console.log('updating List');

    let candy = document.getElementById('candy').value;
    let desc = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let nil = document.createElement('li');
    let use = document.getElementById('users');

    let formData = {
        Candy: candy,
        Desc: desc,
        Price: price,
        Quantity: quantity
    };

    axios.post('https://crudcrud.com/api/cc65e6c985864f24b2d3f7c1f2a4827d/candy', formData)
        .then((response) => {
            showOutput(response.data);
        })
        .catch((err) => {
            alert("Something went wrong");
            console.log(err);
        });

    document.getElementById('candy').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

function showOutput(formData) {
    let use = document.getElementById('users');
    let nil = document.createElement('li');
    nil.setAttribute('data-id', formData._id); 

    nil.innerHTML = `Candy: ${formData.Candy}, Desc: ${formData.Desc}, Price: ${formData.Price}, Quantity: <span class="quantity">${formData.Quantity}</span>
    <button onclick="buyCandy('${formData._id}', ${formData.Quantity}, 1)">Buy 1</button>
    <button onclick="buyCandy('${formData._id}', ${formData.Quantity}, 2)">Buy 2</button>
    <button onclick="buyCandy('${formData._id}', ${formData.Quantity}, 3)">Buy 3</button>`;
    use.appendChild(nil);
}



function buyCandy(id, currentQuantity, purchaseCount) {
    const newQuantity = currentQuantity - purchaseCount;
    axios.put(`https://crudcrud.com/api/cc65e6c985864f24b2d3f7c1f2a4827d/candy/${id}`, { Quantity: newQuantity })
        .then(response => {
            console.log(`Successfully bought candy with ID: ${id}`);
            updateListItem(id, newQuantity); 
        })
        .catch(error => {
            console.error('Error buying candy', error);
        });
}

function updateListItem(id, newQuantity) {
    let quantityNode = document.querySelector(`li[data-id="${id}"] .quantity`);
    if (quantityNode) {
        quantityNode.textContent = newQuantity; 
    }
}
