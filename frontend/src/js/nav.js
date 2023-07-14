const navbar = document.getElementById("navbar")
navbar.innerHTML = `<nav class="navbar navbar-expand-lg bg-dark">
<div class="container-fluid">
  <a class="navbar-brand text-white" href="#">Inventory</a>
  <div id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <button type="button" class="btn btn-primary nav-add-button" data-bs-toggle="modal" data-bs-target="#add-modal">Add Item</button>
      </li>
    </ul>
  </div>
</div>
</nav>`
let navAddButton = document.querySelector('.nav-add-button');

navAddButton.addEventListener('click', function () {
  document.querySelector('.add-name-input').value = '';
  document.querySelector('.add-color-input').value = '';
});