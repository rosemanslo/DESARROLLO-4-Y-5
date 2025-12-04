// Carrito.js - Gestión del carrito de compras

// Variables globales
let carrito = [];

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
	cargarCarrito();
	configurarEventListeners();
});

// Cargar carrito desde el servidor
async function cargarCarrito() {
	try {
		const response = await fetch("/api/carrito");
		if (response.ok) {
			carrito = await response.json();
			mostrarCarrito();
			actualizarResumen();
			actualizarContadorCarrito();
		} else {
			throw new Error("Error al cargar el carrito");
		}
	} catch (error) {
		console.error("Error:", error);
		mostrarNotificacion("Error al cargar el carrito", true);
	}
}

// Mostrar productos en el carrito
function mostrarCarrito() {
	const listaCarrito = document.getElementById("lista-carrito");
	const carritoVacio = document.getElementById("carrito-vacio");

	if (carrito.length === 0) {
		listaCarrito.innerHTML = "";
		listaCarrito.appendChild(carritoVacio);
		carritoVacio.style.display = "block";
		return;
	}

	carritoVacio.style.display = "none";

	listaCarrito.innerHTML = carrito
		.map(
			(producto) => `
        <div class="item-carrito" data-id="${producto.id}">
            <div class="item-imagen">
                <img src="/images/${producto.id}.jpg" alt="${
				producto.nombre
			}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="image-placeholder" style="display: none;">📦</div>
            </div>
            <div class="item-info">
                <div class="item-nombre">${producto.nombre}</div>
                <div class="item-descripcion">${producto.descripcion}</div>
                <div class="item-precio">$${producto.precio.toFixed(2)} c/u</div>
            </div>
            <div class="item-controls">
                <div class="cantidad-controls">
                    <button class="btn-cantidad restar">-</button>
                    <span class="cantidad-display">${producto.cantidad}</span>
                    <button class="btn-cantidad sumar">+</button>
                </div>
                <div class="item-subtotal">
                    $${(producto.precio * producto.cantidad).toFixed(2)}
                </div>
                <button class="btn-eliminar">🗑️ Eliminar</button>
            </div>
        </div>
    `
		)
		.join("");

	// Asignar eventos después de renderizar
	listaCarrito.querySelectorAll(".btn-cantidad.sumar").forEach((btn, i) => {
		btn.addEventListener("click", () => cambiarCantidad(carrito[i].id, 1));
	});
	listaCarrito.querySelectorAll(".btn-cantidad.restar").forEach((btn, i) => {
		btn.addEventListener("click", () => cambiarCantidad(carrito[i].id, -1));
	});
	listaCarrito.querySelectorAll(".btn-eliminar").forEach((btn, i) => {
		btn.addEventListener("click", () => eliminarProducto(carrito[i].id));
	});
}

// Actualizar resumen del pedido
function actualizarResumen() {
	const subtotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
	const impuestos = subtotal * 0.13; // 13% de impuestos
	const total = subtotal + impuestos;

	document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
	document.getElementById("impuestos").textContent = `$${impuestos.toFixed(2)}`;
	document.getElementById("total").textContent = `$${total.toFixed(2)}`;

	// Actualizar resumen del carrito
	const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
	document.getElementById("resumen-carrito").textContent = `${totalProductos} producto${totalProductos !== 1 ? "s" : ""} en el carrito`;

	// Habilitar/deshabilitar botón de pedido
	document.getElementById("btn-realizar-pedido").disabled = carrito.length === 0;
}

// Actualizar contador del carrito en la navbar
function actualizarContadorCarrito() {
	const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
	const contador = document.getElementById("contador-carrito");

	if (contador) {
		contador.textContent = totalItems;
		contador.style.display = totalItems > 0 ? "flex" : "none";
	}
}

// Cambiar cantidad de un producto
async function cambiarCantidad(productoId, cambio) {
	const producto = carrito.find((p) => p.id === productoId);

	if (!producto) return;

	const nuevaCantidad = producto.cantidad + cambio;

	if (nuevaCantidad <= 0) {
		await eliminarProducto(productoId);
		return;
	}

	try {
		const response = await fetch(`/api/carrito/${productoId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ cantidad: nuevaCantidad }),
		});

		if (response.ok) {
			producto.cantidad = nuevaCantidad;
			mostrarCarrito();
			actualizarResumen();
			actualizarContadorCarrito();
		} else {
			throw new Error("Error al actualizar cantidad");
		}
	} catch (error) {
		console.error("Error:", error);
		mostrarNotificacion("Error al actualizar cantidad", true);
	}
}

// Eliminar producto del carrito
async function eliminarProducto(productoId) {
	try {
		const response = await fetch(`/api/carrito/${productoId}`, {
			method: "DELETE",
		});

		if (response.ok) {
			carrito = carrito.filter((p) => p.id !== productoId);
			mostrarCarrito();
			actualizarResumen();
			actualizarContadorCarrito();
			mostrarNotificacion("Producto eliminado del carrito");
		} else {
			throw new Error("Error al eliminar producto");
		}
	} catch (error) {
		console.error("Error:", error);
		mostrarNotificacion("Error al eliminar producto", true);
	}
}

// Limpiar todo el carrito
async function limpiarCarrito() {
	try {
		const response = await fetch("/api/carrito", {
			method: "DELETE",
		});

		if (response.ok) {
			carrito = [];
			mostrarCarrito();
			actualizarResumen();
			actualizarContadorCarrito();
			mostrarNotificacion("Carrito limpiado correctamente");
			cerrarModal();
		} else {
			throw new Error("Error al limpiar carrito");
		}
	} catch (error) {
		console.error("Error:", error);
		mostrarNotificacion("Error al limpiar carrito", true);
	}
}

// Realizar pedido
async function realizarPedido() {
	if (carrito.length === 0) return;

	try {
		const pedido = {
			productos: carrito,
			fecha: new Date().toISOString(),
			estado: "pendiente",
			total: carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0),
		};

		const response = await fetch("/api/pedidos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(pedido),
		});

		if (response.ok) {
			// Limpiar carrito después del pedido exitoso
			await limpiarCarrito();
			mostrarNotificacion("¡Pedido realizado con éxito!");
		} else {
			throw new Error("Error al realizar pedido");
		}
	} catch (error) {
		console.error("Error:", error);
		mostrarNotificacion("Error al realizar pedido", true);
	}
}

// Modal de confirmación
function mostrarModal() {
	document.getElementById("modal-confirmacion").style.display = "flex";
}

function cerrarModal() {
	document.getElementById("modal-confirmacion").style.display = "none";
}

// Configurar event listeners
function configurarEventListeners() {
	// Botón limpiar carrito
	document.getElementById("btn-limpiar-carrito").addEventListener("click", mostrarModal);

	// Botón realizar pedido
	document.getElementById("btn-realizar-pedido").addEventListener("click", realizarPedido);

	// Modal buttons
	document.getElementById("btn-cancelar").addEventListener("click", cerrarModal);
	document.getElementById("btn-confirmar-limpiar").addEventListener("click", limpiarCarrito);

	// Cerrar modal al hacer click fuera
	document.getElementById("modal-confirmacion").addEventListener("click", function (e) {
		if (e.target === this) {
			cerrarModal();
		}
	});
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje, esError = false) {
	const notificaciones = document.getElementById("notificaciones");
	const notificacion = document.createElement("div");
	notificacion.className = `notificacion ${esError ? "error" : ""}`;
	notificacion.textContent = mensaje;

	notificaciones.appendChild(notificacion);

	// Animación de entrada
	setTimeout(() => notificacion.classList.add("show"), 100);

	// Remover después de 4 segundos
	setTimeout(() => {
		notificacion.classList.remove("show");
		setTimeout(() => {
			if (notificacion.parentNode) {
				notificacion.parentNode.removeChild(notificacion);
			}
		}, 300);
	}, 4000);
}
