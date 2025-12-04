// JavaScript dedicado al LogIn+SignIn
// Snipet de lógica para leer el JSON
fetch("/api/menu")
	.then((r) => r.json())
	.then((data) => {
		const lista = document.getElementById("lista");

		// Verificar si es un array directo o tiene propiedad Inventario
		const productos = Array.isArray(data) ? data : data.Inventario;

		if (!productos || !Array.isArray(productos)) {
			console.error("No se pudo encontrar el array de productos");
			return;
		}

		// Cambiar el estilo del contenedor para grid
		lista.style.display = "grid";
		lista.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
		lista.style.gap = "20px";
		lista.style.padding = "20px";
		lista.style.listStyle = "none";

		// Variable para guardar la carta actualmente volteada
		let cartaVolteadaActual = null;

		productos.forEach((p) => {
			const cardContainer = document.createElement("li");
			cardContainer.className = "card-container";

			// Determinar clase de disponibilidad
			const disponibilidadClass = p.Dispo_Prod ? "disponible" : "no-disponible";
			const disponibilidadText = p.Dispo_Prod ? "✓ Disponible" : "✗ No disponible";

			// Crear la estructura de la carta con frente y dorso
			cardContainer.innerHTML = `
				<div class="card-inner">

					<!-- Frente de la carta -->
					<div class="card-front">
						<div class="card-header">
							<h3 class="product-name">${p.Nombre_Prod}</h3>
						</div>
						<div class="card-image">
							<img src="images/${p.ID_Producto}.jpg" alt="${p.Nombre_Prod}" onerror="this.style.display='none'">
							<div class="image-placeholder">📷</div>
						</div>
						<div class="card-body">
							<span class="product-price">$${p.Precio_Prod}</span>
						</div>
						<div class="card-footer">
							<span class="availability ${disponibilidadClass}">${disponibilidadText}</span>
							<div class="button-group">
								<button class="desc-btn">📖 Descripción</button>
								<button class="order-btn" ${!p.Dispo_Prod ? "disabled" : ""}>
									${p.Dispo_Prod ? "🛒 Agregar" : "No disponible"}
								</button>
							</div>
						</div>
					</div>
					
					<!-- Dorso de la carta -->
					<div class="card-back">
						<div class="card-header back-header">
							<h3 class="product-name">${p.Nombre_Prod}</h3>
							<button class="order-btn-header" ${!p.Dispo_Prod ? "disabled" : ""}>
								${p.Dispo_Prod ? "🛒 Agregar al pedido" : "No disponible"}
							</button>
						</div>
						<div class="card-body back-body">
							<h4>Descripción Completa</h4>
							<p class="full-description">${p.Descripcion_Prod}</p>

							<div class="product-details">
								<div class="detail-item">
									<strong>Precio:</strong> $${p.Precio_Prod}
								</div>
								<div class="detail-item availability ${disponibilidadClass}">
									<strong>Estado:</strong> ${disponibilidadText}
								</div>
							</div>
						</div>

						<div class="card-footer back-footer">
							<button class="back-btn">← Volver al menú</button>
						</div>
					</div>

				</div>
			`;

			// Agregar event listeners para los botones
			const descBtn = cardContainer.querySelector(".desc-btn");
			const backBtn = cardContainer.querySelector(".back-btn");
			const orderBtn = cardContainer.querySelector(".order-btn");
			const orderBtnHeader = cardContainer.querySelector(".order-btn-header");
			const cardInner = cardContainer.querySelector(".card-inner");

			// Función para voltear la carta
			const voltearCarta = () => {
				// Si hay una carta volteada y no es esta misma, cerrarla
				if (cartaVolteadaActual && cartaVolteadaActual !== cardInner) {
					cartaVolteadaActual.style.transform = "rotateY(0deg)";
				}

				// Voltear esta carta
				cardInner.style.transform = "rotateY(180deg)";
				cartaVolteadaActual = cardInner;
			};

			// Función para cerrar la carta
			const cerrarCarta = () => {
				cardInner.style.transform = "rotateY(0deg)";
				if (cartaVolteadaActual === cardInner) {
					cartaVolteadaActual = null;
				}
			};

			// Función para agregar al carrito
			const agregarAlCarrito = async () => {
				if (!p.Dispo_Prod) return;

				const productoCarrito = {
					id: p.ID_Producto,
					nombre: p.Nombre_Prod,
					descripcion: p.Descripcion_Prod,
					precio: parseFloat(p.Precio_Prod),
					cantidad: 1,
					fechaAgregado: new Date().toISOString(),
				};

				try {
					await guardarEnCarrito(productoCarrito);
					mostrarNotificacion(`¡${p.Nombre_Prod} agregado al carrito!`);
				} catch (error) {
					console.error("Error al agregar al carrito:", error);
					mostrarNotificacion("Error al agregar al carrito", true);
				}
			};

			// Event listeners
			descBtn.addEventListener("click", voltearCarta);
			backBtn.addEventListener("click", cerrarCarta);
			orderBtn.addEventListener("click", agregarAlCarrito);
			orderBtnHeader.addEventListener("click", agregarAlCarrito);

			// Cerrar carta al hacer click fuera (opcional)
			cardContainer.addEventListener("click", (e) => {
				// Si se hace click en el fondo del contenedor (no en ningún elemento hijo específico)
				if (e.target === cardContainer && cartaVolteadaActual === cardInner) {
					cerrarCarta();
				}
			});

			lista.appendChild(cardContainer);
		});

		// Cerrar cartas al hacer click fuera de cualquier carta
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".card-container") && cartaVolteadaActual) {
				cartaVolteadaActual.style.transform = "rotateY(0deg)";
				cartaVolteadaActual = null;
			}
		});
	})
	.catch((err) => console.error("Error leyendo JSON:", err));

// ========== FUNCIONES DEL CARRITO ==========
// Función para guardar producto en el carrito
async function guardarEnCarrito(producto) {
	try {
		// Obtener carrito actual
		let carrito = await obtenerCarrito();

		// Verificar si el producto ya está en el carrito
		const productoExistente = carrito.find((item) => item.id === producto.id);

		if (productoExistente) {
			// Incrementar cantidad si ya existe
			productoExistente.cantidad += 1;
			productoExistente.fechaActualizado = new Date().toISOString();
		} else {
			// Agregar nuevo producto
			carrito.push(producto);
		}

		// Guardar carrito actualizado
		await enviarCarritoAlServidor(carrito);
	} catch (error) {
		console.error("Error en guardarEnCarrito:", error);
		throw error;
	}
}

// Función para obtener el carrito actual
async function obtenerCarrito() {
	try {
		const response = await fetch("/api/carrito");
		if (response.ok) {
			return await response.json();
		} else {
			// Si no existe el carrito, retornar array vacío
			return [];
		}
	} catch (error) {
		console.error("Error obteniendo carrito:", error);
		return [];
	}
}

// Función para enviar carrito al servidor
async function enviarCarritoAlServidor(carrito) {
	try {
		const response = await fetch("/api/carrito", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(carrito),
		});

		if (!response.ok) {
			throw new Error("Error al guardar el carrito");
		}

		return await response.json();
	} catch (error) {
		console.error("Error enviando carrito:", error);
		throw error;
	}
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, esError = false) {
	const notificacion = document.createElement("div");
	notificacion.textContent = mensaje;
	notificacion.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: ${esError ? "#dc3545" : "#28a745"};
		color: white;
		padding: 15px 20px;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		z-index: 10000;
		font-weight: 500;
		transform: translateX(100%);
		transition: transform 0.3s ease;
	`;

	document.body.appendChild(notificacion);

	// Animación de entrada
	setTimeout(() => {
		notificacion.style.transform = "translateX(0)";
	}, 100);

	// Remover después de 3 segundos
	setTimeout(() => {
		notificacion.style.transform = "translateX(100%)";
		setTimeout(() => {
			if (document.body.contains(notificacion)) {
				document.body.removeChild(notificacion);
			}
		}, 300);
	}, 3000);
}

// ========== FUNCIONES ADICIONALES DEL CARRITO ==========

// Función para obtener el total del carrito
async function obtenerTotalCarrito() {
	try {
		const carrito = await obtenerCarrito();
		return carrito.reduce((total, producto) => {
			return total + producto.precio * producto.cantidad;
		}, 0);
	} catch (error) {
		console.error("Error calculando total:", error);
		return 0;
	}
}

// Función para limpiar el carrito
async function limpiarCarrito() {
	try {
		const response = await fetch("/api/carrito", {
			method: "DELETE",
		});

		if (response.ok) {
			mostrarNotificacion("Carrito limpiado correctamente");
			return true;
		} else {
			throw new Error("Error al limpiar el carrito");
		}
	} catch (error) {
		console.error("Error limpiando carrito:", error);
		mostrarNotificacion("Error al limpiar el carrito", true);
		return false;
	}
}

// Función para actualizar cantidad de un producto
async function actualizarCantidad(productoId, nuevaCantidad) {
	try {
		if (nuevaCantidad <= 0) {
			return await eliminarDelCarrito(productoId);
		}

		const carrito = await obtenerCarrito();
		const producto = carrito.find((item) => item.id === productoId);

		if (producto) {
			producto.cantidad = nuevaCantidad;
			producto.fechaActualizado = new Date().toISOString();
			await enviarCarritoAlServidor(carrito);
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error actualizando cantidad:", error);
		return false;
	}
}

// Función para eliminar producto del carrito
async function eliminarDelCarrito(productoId) {
	try {
		const carrito = await obtenerCarrito();
		const carritoActualizado = carrito.filter((item) => item.id !== productoId);
		await enviarCarritoAlServidor(carritoActualizado);
		return true;
	} catch (error) {
		console.error("Error eliminando del carrito:", error);
		return false;
	}
}

// Actualizar contador del carrito en la navbar (si existe)
async function actualizarContadorCarrito() {
	try {
		const carrito = await obtenerCarrito();
		const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);

		const contadorCarrito = document.getElementById("contador-carrito");
		if (contadorCarrito) {
			contadorCarrito.textContent = totalItems;
			contadorCarrito.style.display = totalItems > 0 ? "flex" : "none";
		}
	} catch (error) {
		console.error("Error actualizando contador:", error);
	}
}

// Inicializar contador del carrito cuando se carga la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
