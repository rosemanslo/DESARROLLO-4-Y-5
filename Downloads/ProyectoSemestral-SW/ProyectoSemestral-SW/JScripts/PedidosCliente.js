// JavaScript dedicado a PedidosCliente
// Constantes de Estado
const ESTADOS = {
	CANCELADO: 0,
	PENDIENTE: 1, // ROJO: Pedido Recibido
	PREPARANDO: 2, // AMARILLO: Pedido en Cocina
	LISTO: 3, // VERDE: Listo para Repartidor/Recoger (Activa animación)
	ENTREGADO: 4, // Completado
};

// Simulación del pedido actual del cliente
let currentOrder = {
	id: 1001,
	estado: ESTADOS.PENDIENTE, // Estado inicial
};

// Almacena la animación para poder detenerla/reiniciarla
let trackerAnimation = null;

// ===================================
// Lógica de Rastreo y Animación
// ===================================

/**
 * Inicia o detiene la animación del carro.
 * La animación se activa cuando el pedido pasa a estado 'LISTO'.
 * @param {number} status - El estado actual del pedido.
 */
function handleCarAnimation(status) {
	const carElement = document.querySelector(".car");
	const pathElement = document.getElementById("delivery-path");

	// Si el estado es LISTO (3), se activa la animación
	if (status === ESTADOS.LISTO) {
		if (pathElement && carElement) {
			// Si ya hay una animación, no la reiniciamos, solo nos aseguramos de que corra
			if (trackerAnimation && !trackerAnimation.paused) {
				carElement.style.display = "block";
				return;
			}

			const path = anime.path(pathElement);

			// 1. Animación del carro siguiendo el circuito
			trackerAnimation = anime({
				targets: carElement,
				translateX: path("x"),
				translateY: path("y"),
				rotate: path("angle"),
				duration: 8000, // Velocidad de la vuelta
				loop: true,
				easing: "linear",
			});

			// 2. Animación del trazado (Opcional: dibuja la línea)
			anime({
				targets: pathElement,
				strokeDashoffset: [anime.setDashoffset, 0],
				duration: 8000,
				easing: "linear",
				loop: true,
			});

			carElement.style.display = "block"; // Mostrar el carro
		}
	} else {
		// Detener la animación en cualquier otro estado (PENDIENTE, PREPARANDO, CANCELADO, ENTREGADO)
		if (trackerAnimation) {
			trackerAnimation.pause();
			trackerAnimation = null; // Reinicia el tracker para la próxima vez
		}
		if (carElement) {
			carElement.style.display = "none"; // Ocultar el carro
		}
	}
}

/**
 * Actualiza la interfaz del rastreador de estado (círculos y barra de progreso).
 * @param {number} status - El estado actual del pedido (1, 2, 3...).
 */
function updateTrackerUI(status) {
	const statusSteps = {
		[ESTADOS.PENDIENTE]: "step-pendiente",
		[ESTADOS.PREPARANDO]: "step-preparando",
		[ESTADOS.LISTO]: "step-listo",
	};

	const statusTextElement = document.getElementById("current-status-text");
	let statusMessage = "Estado Desconocido";

	// 1. Iterar y actualizar las clases de los pasos
	Object.keys(statusSteps).forEach((key) => {
		const stepId = statusSteps[key];
		const stepElement = document.getElementById(stepId);

		// Resetear clases
		stepElement.classList.remove("active", "current", "animacion-latido");

		if (parseInt(key) <= status) {
			stepElement.classList.add("active");
		}

		if (parseInt(key) === status) {
			stepElement.classList.add("current"); // Marcar el paso actual

			// Definir el mensaje y color
			if (status === ESTADOS.PENDIENTE) {
				statusMessage = "🔴 Pedido Recibido, Esperando Confirmación";
				statusTextElement.style.backgroundColor = "var(--color-rojo-claro, #f9e3e1)";
			} else if (status === ESTADOS.PREPARANDO) {
				statusMessage = "🟡 En Preparación. ¡Estamos Cocinando!";
				statusTextElement.style.backgroundColor = "var(--color-amarillo-claro, #fff8e1)";
			} else if (status === ESTADOS.LISTO) {
				statusMessage = "🟢 ¡LISTO! El Repartidor está en camino.";
				statusTextElement.style.backgroundColor = "var(--color-verde-claro, #e1f5fe)";
			}
		}
	});

	if (status === ESTADOS.ENTREGADO) {
		statusMessage = "🎉 Pedido Entregado. ¡Que disfrutes!";
		statusTextElement.style.backgroundColor = "var(--color-verde-claro, #e1f5fe)";
	}

	// 2. Actualizar el texto del estado
	statusTextElement.innerHTML = statusMessage;

	// 3. Actualizar la barra de progreso
	const trackerLine = document.querySelector(".tracker-line");
	let percentage = 0;
	if (status === ESTADOS.PREPARANDO) percentage = 50;
	if (status >= ESTADOS.LISTO) percentage = 100;

	trackerLine.style.width = `${percentage}%`;
	trackerLine.classList.remove("bg-red", "bg-yellow", "bg-green");
	if (status === ESTADOS.PENDIENTE) trackerLine.classList.add("bg-red");
	else if (status === ESTADOS.PREPARANDO) trackerLine.classList.add("bg-yellow");
	else if (status >= ESTADOS.LISTO) trackerLine.classList.add("bg-green");
}

/**
 * Función principal para chequear y actualizar todo.
 */
function checkOrderStatus() {
	const currentStatus = currentOrder.estado;
	updateTrackerUI(currentStatus);
	handleCarAnimation(currentStatus);
}

// ===================================
// Funciones de Simulación para Demostración
// ===================================

function simulateNextStatus() {
	// Avanza el estado: 1 -> 2 -> 3 -> 4 -> 1 (Ciclo)
	if (currentOrder.estado < ESTADOS.ENTREGADO) {
		currentOrder.estado++;
	} else {
		currentOrder.estado = ESTADOS.PENDIENTE;
	}

	console.log(`Simulación: Pedido ${currentOrder.id} ha avanzado a estado: ${currentOrder.estado}`);
	checkOrderStatus();
}

// ===================================
// Inicialización
// ===================================

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("order-id").textContent = currentOrder.id;
	checkOrderStatus();

	// En un sistema real, usarías:
	// setInterval(checkOrderStatus, 5000); // Chequear el estado del API cada 5 segundos
});
