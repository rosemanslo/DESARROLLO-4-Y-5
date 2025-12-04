// ===================================
// Constantes de Estado
// Mapea los estados internos a los visuales R/Y/G
// ===================================
const ESTADOS = {
    CANCELADO: 0,
    PENDIENTE: 1,       // Cliente acaba de pedir (Amarillo: En Curso)
    PREPARANDO: 2,      // Cocina trabajando (Amarillo: En Curso)
    LISTO: 3,           // Listo para ser recogido/entregado (Verde: Listo)
    ENTREGADO: 4        // Completado (Verde: Listo)
};

// ===================================
// Simulación de Datos de Pedidos (API)
// ===================================

let pedidosActivos = [
    { id: 1001, cliente: "Carlos Roseman", total: 15.50, estado: ESTADOS.PENDIENTE, detalle: "2x Burger UTP, 1x Coca-Cola" },
    { id: 1002, cliente: "María Rodríguez", total: 8.00, estado: ESTADOS.PREPARANDO, detalle: "1x Wrap de Pollo, 1x Jugo de Naranja" },
    { id: 1003, cliente: "Juan Pérez", total: 25.75, estado: ESTADOS.LISTO, detalle: "4x Tacos de Carnitas, 2x Cerveza (Solo mayores)" },
    { id: 1004, cliente: "Andrea Gómez", total: 10.00, estado: ESTADOS.CANCELADO, detalle: "1x Ensalada César, 1x Café" },
    { id: 1005, cliente: "Pedro Vargas", total: 12.00, estado: ESTADOS.PENDIENTE, detalle: "2x Empanadas de Carne, 1x Batido de Frutas" },
];

// ===================================
// Funciones de Renderizado
// ===================================

function obtenerClaseEstado(estado) {
    switch (estado) {
        case ESTADOS.CANCELADO: 
            return { text: "Cancelado", class: "cancelado" };
        case ESTADOS.PENDIENTE:
        case ESTADOS.PREPARANDO: 
            return { text: "En Curso", class: "en-curso" }; // Amarillo
        case ESTADOS.LISTO: 
        case ESTADOS.ENTREGADO: 
            return { text: "Listo", class: "listo" }; // Verde
        default: 
            return { text: "Desconocido", class: "" };
    }
}

function renderizarTablaPedidos() {
    const tbody = document.getElementById('pedidos-table-body');
    const countPendiente = document.getElementById('count-pendiente');
    const countPreparacion = document.getElementById('count-preparacion');
    const countListo = document.getElementById('count-listo');

    tbody.innerHTML = '';
    
    // Contadores para las tarjetas
    let c_pend = 0;
    let c_prep = 0;
    let c_list = 0;

    pedidosActivos.forEach(pedido => {
        const { text, class: statusClass } = obtenerClaseEstado(pedido.estado);
        const newRow = tbody.insertRow();
        
        // 1. Contador de Tarjetas
        if (pedido.estado === ESTADOS.PENDIENTE) c_pend++;
        if (pedido.estado === ESTADOS.PREPARANDO) c_prep++;
        if (pedido.estado === ESTADOS.LISTO || pedido.estado === ESTADOS.ENTREGADO) c_list++;

        // 2. Columna ID
        newRow.insertCell().textContent = `#${pedido.id}`;

        // 3. Columna Cliente
        newRow.insertCell().textContent = pedido.cliente;

        // 4. Columna Total
        newRow.insertCell().textContent = `$${pedido.total.toFixed(2)}`;

        // 5. Columna Estado (Pill)
        const statusCell = newRow.insertCell();
        statusCell.innerHTML = `<span class="status-pill ${statusClass}">${text}</span>`;
        
        // 6. Columna Acciones (Botones)
        const actionCell = newRow.insertCell();
        actionCell.className = "action-cell";

        if (pedido.estado === ESTADOS.PENDIENTE) {
            // Botón para Caja/Gerente: Aceptar el pedido (Mover a PREPARANDO)
            actionCell.innerHTML += `<button class="action-btn" onclick="actualizarEstado(${pedido.id}, ${ESTADOS.PREPARANDO})">Aceptar</button>`;
        } else if (pedido.estado === ESTADOS.PREPARANDO) {
            // Botón para Cocina: Marcar como listo
            actionCell.innerHTML += `<button class="action-btn" onclick="actualizarEstado(${pedido.id}, ${ESTADOS.LISTO})" style="background-color: #008000;">Listo</button>`;
        } else if (pedido.estado === ESTADOS.LISTO) {
            // Botón para Repartidor/Caja: Entregar
            actionCell.innerHTML += `<button class="action-btn" onclick="actualizarEstado(${pedido.id}, ${ESTADOS.ENTREGADO})" style="background-color: #17a2b8;">Entregar</button>`;
        }

        // Botón para ver detalle (siempre disponible)
        actionCell.innerHTML += `<button class="action-btn" onclick="verDetalle(${pedido.id})" style="background-color: #6c757d;">Detalle</button>`;
    });

    // 7. Actualizar Tarjetas de Resumen
    countPendiente.textContent = c_pend;
    countPreparacion.textContent = c_prep;
    countListo.textContent = c_list;
}

// ===================================
// Funciones de Acción
// ===================================

function actualizarEstado(id, nuevoEstado) {
    const pedidoIndex = pedidosActivos.findIndex(p => p.id === id);
    if (pedidoIndex > -1) {
        // *** SIMULACIÓN DE LLAMADA AL API ***
        // En un proyecto real, se haría un fetch() POST aquí.
        
        pedidosActivos[pedidoIndex].estado = nuevoEstado;
        alert(`Pedido #${id} actualizado a estado: ${obtenerClaseEstado(nuevoEstado).text}`);
        renderizarTablaPedidos(); // Re-renderizar la tabla
        
        // Se puede añadir aquí una notificación al cliente (si se usaran WebSockets)
    }
}

function verDetalle(id) {
    const pedido = pedidosActivos.find(p => p.id === id);
    if (pedido) {
        alert(`Detalle del Pedido #${pedido.id}:\nCliente: ${pedido.cliente}\nTotal: $${pedido.total.toFixed(2)}\nEstado: ${obtenerClaseEstado(pedido.estado).text}\nProductos: ${pedido.detalle}`);
    }
}

// ===================================
// Inicialización
// ===================================

document.addEventListener("DOMContentLoaded", () => {
    // Cargar la tabla al iniciar
    renderizarTablaPedidos();
});