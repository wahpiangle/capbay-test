import DataTable from 'datatables.net-dt';
import * as vanillaToast from 'vanilla-toast';
import 'vanilla-toast/vanilla-toast.css';

var table;

const generateTable = async () => {
    const response = await fetch('http://localhost:5000/api/items');
    const data = await response.json();
    console.log(data);
    const dataSet = data.items.map((product) => {
        return [product._id, product.name, product.color];
    });

    if (table) {
        table.destroy();
    }

    table = new DataTable('#table', {
        columns: [
            { title: 'ID' },
            { title: 'Name' },
            { title: 'Color' },
            {
                title: 'Actions',
                render: function (row, data, type) {
                    return `<div>
                        <button class="btn btn-primary edit-button" data-id="${type[0]}" data-name="${type[1]}" data-color="${type[2]}"data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
                        <button class="btn btn-danger delete-button" data-id="${type[0]}" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button>
                    </div>`;
                },
            },
        ],
        data: dataSet,
    });
    let addItemButton = document.querySelector('#add-item-button');
    let editButtonList = document.querySelectorAll('.edit-button');
    let editItemButton = document.querySelector('#edit-item-button');
    let deleteButtonList = document.querySelectorAll('.delete-button');
    let deleteItemButton = document.querySelector('#delete-item-button');
    removeEventListeners(addItemButton, editButtonList, editItemButton, deleteButtonList, deleteItemButton);
    addEvents(addItemButton, editButtonList, editItemButton, deleteButtonList, deleteItemButton);
    return Promise.resolve();
};

const removeEventListeners = (addItemButton, editButtonList, editItemButton, deleteButtonList, deleteItemButton) => {
    addItemButton.removeEventListener('click', handleAddItemClick);
    editButtonList.forEach(function (editButton) {
        const dataId = editButton.getAttribute('data-id');
        const dataName = editButton.getAttribute('data-name');
        const dataColor = editButton.getAttribute('data-color');
        editButton.removeEventListener('click', function() {
            handleEditItemClick(dataId, dataName, dataColor);
        });
    });
    editItemButton.removeEventListener('click', handleEditItemButtonClick);
    deleteButtonList.forEach(function (deleteButton) {
        deleteButton.removeEventListener('click', function(){
            handleDeleteItemClick(dataId);
        });
    });
    deleteItemButton.removeEventListener('click', handleDeleteItemButtonClick);
};

const addEvents = (addItemButton, editButtonList, editItemButton, deleteButtonList, deleteItemButton) => {
    addItemButton.addEventListener('click', handleAddItemClick);
    editButtonList.forEach(function (editButton) {
        const dataId = editButton.getAttribute('data-id');
        const dataName = editButton.getAttribute('data-name');
        const dataColor = editButton.getAttribute('data-color');
        editButton.addEventListener('click', function() {
            handleEditItemClick(dataId, dataName, dataColor);
        });
    });
    editItemButton.addEventListener('click', handleEditItemButtonClick);
    deleteButtonList.forEach(function (deleteButton) {
        const dataId = deleteButton.getAttribute('data-id');
        deleteButton.addEventListener('click', function(){
            handleDeleteItemClick(dataId);
        });
    });
    deleteItemButton.addEventListener('click', handleDeleteItemButtonClick);
};

const handleAddItemClick = function (e) {
    e.preventDefault();
    const nameInput = document.querySelector('.add-name-input').value;
    const colorInput = document.querySelector('.add-color-input').value;
    addItem(nameInput, colorInput);
};

const handleEditItemClick = (dataId, dataName, dataColor) => {
    const formTitleId = document.querySelector('#edit-form-title-id');
    const editNameInput = document.querySelector('.edit-name-input');
    const editColorInput = document.querySelector('.edit-color-input');
    formTitleId.innerHTML = 'Editing item of ID: ' + dataId;
    editNameInput.value = dataName;
    editColorInput.value = dataColor;
};

const handleEditItemButtonClick = function (e) {
    e.preventDefault();
    const id = document.querySelector('#edit-form-title-id').innerHTML.split(' ')[4];
    const nameInput = document.querySelector('.edit-name-input').value;
    const colorInput = document.querySelector('.edit-color-input').value;
    editItem(id, nameInput, colorInput);
};

const handleDeleteItemClick = function (dataId) {
    const deleteFormTitleId = document.querySelector('#delete-form-title-id');
    deleteFormTitleId.innerHTML = 'Deleting item of ID: ' + dataId;
};

const handleDeleteItemButtonClick = function (e) {
    e.preventDefault();
    const id = document.querySelector('#delete-form-title-id').innerHTML.split(' ')[4];
    deleteItem(id);
};

const addItem = async (nameInput, colorInput) => {
    await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameInput, color: colorInput }),
    })
        .then((res) => {
            return generateTable();
        })
        .then(() => {
            vanillaToast.success('Item added successfully');
        })
        .catch((err) => {
            vanillaToast.error('Item not added', { fadeDuration: 200 });
        });
};

const editItem = async (id, nameInput, colorInput) => {
    await fetch('http://localhost:5000/api/items/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameInput, color: colorInput }),
    })
        .then((res) => {
            return generateTable();
        })
        .then(() => {
            vanillaToast.success('Item edited successfully');
        })
        .catch((err) => {
            vanillaToast.error('Item not edited', { fadeDuration: 200 });
        });
};

const deleteItem = async (id) => {
    fetch('http://localhost:5000/api/items/' + id, {
        method: 'DELETE',
    })
        .then(() => {
            return generateTable();
        })
        .then(() => {
            vanillaToast.success('Item deleted successfully');
        })
        .catch((err) => {
            vanillaToast.error('Item not deleted', { fadeDuration: 200 });
        });
};

generateTable()
    .catch((err) => {
        console.error(err);
    });
