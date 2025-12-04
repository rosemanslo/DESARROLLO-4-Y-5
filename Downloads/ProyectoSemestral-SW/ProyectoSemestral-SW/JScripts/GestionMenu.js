// Elementos del DOM
let menuData = [
	{
		ID_Producto: 1,
		Nombre_Prod: "Cerdito",
		Descripcion_Prod: "Emparedado de cerdo y queso",
		Precio_Prod: "3.00",
		Dispo_Prod: true,
	},
	{
		ID_Producto: 2,
		Nombre_Prod: "Nicolleta",
		Descripcion_Prod: "Dulce",
		Precio_Prod: "0.00",
		Dispo_Prod: true,
	},
	{
		ID_Producto: 3,
		Nombre_Prod: "Soda CocaCola",
		Descripcion_Prod: "Soda CocaCola...",
		Precio_Prod: "0.00",
		Dispo_Prod: true,
	},
	{
		ID_Producto: 4,
		Nombre_Prod: "Soda Kist Fresa",
		Descripcion_Prod: "Soda de fresa...",
		Precio_Prod: "0.00",
		Dispo_Prod: true,
	},
	{
		ID_Producto: 5,
		Nombre_Prod: "Soda Kist Naranja",
		Descripcion_Prod: "Soda de Naranja...",
		Precio_Prod: "0.00",
		Dispo_Prod: true,
	},
	{
		ID_Producto: 6,
		Nombre_Prod: "prueba",
		Descripcion_Prod: "abcdefg",
		Precio_Prod: "0.00",
		Dispo_Prod: true,
	},
	{
		ID_Producto: 7,
		Nombre_Prod: "Hamburguesa Clasica",
		Descripcion_Prod: "Hamburguesa de toda la vida",
		Precio_Prod: "0.00",
		Dispo_Prod: true,
	},
];

// Elementos del DOM
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const productIdInput = document.getElementById("product-id");
const productNameInput = document.getElementById("product-name");
const productDescriptionInput = document.getElementById("product-description");
const productPriceInput = document.getElementById("product-price");
const productAvailabilityInput = document.getElementById("product-availability");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");
const notification = document.getElementById("notification");

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
	renderProductList();
	setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
	productForm.addEventListener("submit", handleFormSubmit);
	cancelBtn.addEventListener("click", resetForm);
}

// Manejar el envío del formulario
function handleFormSubmit(e) {
	e.preventDefault();

	const productId = productIdInput.value;
	const productData = {
		Nombre_Prod: productNameInput.value,
		Descripcion_Prod: productDescriptionInput.value,
		Precio_Prod: parseFloat(productPriceInput.value).toFixed(2),
		Dispo_Prod: productAvailabilityInput.checked,
	};

	if (productId) {
		// Editar producto existente
		updateProduct(parseInt(productId), productData);
	} else {
		// Agregar nuevo producto
		addProduct(productData);
	}
}

// Agregar un nuevo producto
function addProduct(productData) {
	// Encontrar el ID más alto y sumar 1
	const maxId = menuData.reduce((max, product) => (product.ID_Producto > max ? product.ID_Producto : max), 0);

	const newProduct = {
		ID_Producto: maxId + 1,
		...productData,
	};

	menuData.push(newProduct);
	renderProductList();
	resetForm();
	showNotification("Producto agregado exitosamente", "success");

	// Enviar datos al servidor
	sendDataToServer();
}

// Actualizar un producto existente
function updateProduct(id, productData) {
	const index = menuData.findIndex((product) => product.ID_Producto === id);

	if (index !== -1) {
		menuData[index] = {
			ID_Producto: id,
			...productData,
		};

		renderProductList();
		resetForm();
		showNotification("Producto actualizado exitosamente", "success");

		// Enviar datos al servidor
		sendDataToServer();
	}
}

// Eliminar un producto
function deleteProduct(id) {
	if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
		menuData = menuData.filter((product) => product.ID_Producto !== id);
		renderProductList();
		showNotification("Producto eliminado exitosamente", "success");

		// Enviar datos al servidor
		sendDataToServer();
	}
}

// Editar un producto (cargar datos en el formulario)
function editProduct(id) {
	const product = menuData.find((product) => product.ID_Producto === id);

	if (product) {
		productIdInput.value = product.ID_Producto;
		productNameInput.value = product.Nombre_Prod;
		productDescriptionInput.value = product.Descripcion_Prod;
		productPriceInput.value = product.Precio_Prod;
		productAvailabilityInput.checked = product.Dispo_Prod;

		submitBtn.textContent = "Actualizar Producto";
		cancelBtn.style.display = "inline-block";
		formTitle.textContent = "Editar Producto";

		productNameInput.focus();
	}
}

// Restablecer el formulario
function resetForm() {
	productForm.reset();
	productIdInput.value = "";
	submitBtn.textContent = "Agregar Producto";
	cancelBtn.style.display = "none";
	formTitle.textContent = "Agregar Producto";
}

// Renderizar la lista de productos
function renderProductList() {
	productList.innerHTML = "";

	if (menuData.length === 0) {
		productList.innerHTML = "<p>No hay productos en el menú.</p>";
		return;
	}

	menuData.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.className = `product-card ${product.Dispo_Prod ? "" : "unavailable"}`;

		productCard.innerHTML = `
            <div class="product-header">
                <div class="product-name">${product.Nombre_Prod}</div>
                <div class="product-id">ID: ${product.ID_Producto}</div>
            </div>
            <div class="product-description">${product.Descripcion_Prod}</div>
            <div class="product-price">$${product.Precio_Prod}</div>
            <div class="product-footer">
                <div class="availability">
                    <span class="status-dot ${product.Dispo_Prod ? "available" : "unavailable"}"></span>
                    ${product.Dispo_Prod ? "Disponible" : "No disponible"}
                </div>
                <div class="card-actions">
                    <button class="card-btn edit-btn" onclick="editProduct(${product.ID_Producto})">Editar</button>
                    <button class="card-btn delete-btn" onclick="deleteProduct(${product.ID_Producto})">Eliminar</button>
                </div>
            </div>
        `;

		productList.appendChild(productCard);
	});
}

// Mostrar notificación
function showNotification(message, type) {
	notification.textContent = message;
	notification.className = `notification ${type} show`;

	setTimeout(() => {
		notification.classList.remove("show");
	}, 3000);
}

// Enviar datos al servidor
function sendDataToServer() {
	fetch("/api/menu", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(menuData),
	})
		.then((res) => res.json())
		.then((r) => console.log(r.msg))
		.catch((error) => {
			console.error("Error al enviar datos:", error);
			showNotification("Error al guardar en el servidor", "error");
		});
}
