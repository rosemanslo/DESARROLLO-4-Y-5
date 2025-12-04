// ===================================
// Constantes de Estado (Iguales a AdminPedidos.js)
// ===================================
const ESTADOS = {
    CANCELADO: 0,
    PENDIENTE: 1,       // Cliente acaba de pedir
    PREPARANDO: 2,      // Cocina trabajando
    LISTO: 3,           // Listo para ser recogido/entregado (Verde Cliente)
    ENTREGADO: 4        // Completado
};

// ===================================
// Simulación de Datos de Pedidos (API)
// ===================================
// Se reutilizan los datos simulados del administrador para consistencia
let pedidosActivos = [
    { 
        id: 1001, 
        cliente: "Carlos Roseman", 
        estado: ESTADOS.PENDIENTE, 
        nota: "Sin pepinillos, por favor.",
        productos: [
            { nombre: "Hamburguesa Clásica", cantidad: 2 },
            { nombre: "Papas Fritas Grandes", cantidad: 1 },
            { nombre: "Agua Embotellada", cantidad: 1 }
        ] 
    },
    { 
        id: 1002, 
        cliente: "María Rodríguez", 
        estado: ESTADOS.PREPARANDO, 
        nota: "Doble queso en la wrap.",
        productos: [
            { nombre: "Wrap de Pollo", cantidad: 1 },
            { nombre: "Jugo de Naranja", cantidad: 1 }
        ] 
    },
    { 
        id: 1003, 
        cliente: "Juan Pérez", 
        estado: ESTADOS.LISTO, // Este no debería mostrarse en Cocina
        nota: "",
        productos: []
    },
    { 
        id: 1005, 
        cliente: "Pedro Vargas", 
        estado: ESTADOS.PENDIENTE, 
        nota: "Muy picante.",
        productos: [
            { nombre: "Empanadas de Carne", cantidad: 2 },
            { nombre: "Batido de Frutas", cantidad: 1 }
        ] 
    },
];

// ===================================
// Funciones de Renderizado
// ===================================

function obtenerClaseEstado(estado) {
    return estado === ESTADOS.PENDIENTE ? "status-pendiente" : "status-preparando";
}

function renderizarPedidos() {
    const container = document.getElementById('pedidos-list-container');
    const countElement = document.getElementById('count-activos');
    const noOrdersMessage = document.getElementById('no-orders-message');
    container.innerHTML = '';

    // Filtrar solo los pedidos que la cocina debe ver (PENDIENTE o PREPARANDO)
    const pedidosPendientesYEnCurso = pedidosActivos.filter(p => 
        p.estado === ESTADOS.PENDIENTE || p.estado === ESTADOS.PREPARANDO
    );

    countElement.textContent = pedidosPendientesYEnCurso.length;
    noOrdersMessage.classList.toggle('hidden', pedidosPendientesYEnCurso.length > 0);

    pedidosPendientesYEnCurso.forEach(pedido => {
        const estadoClass = obtenerClaseEstado(pedido.estado);
        const estadoTexto = pedido.estado === ESTADOS.PENDIENTE ? "Pendiente" : "En Preparación";
        
        let productosHTML = pedido.productos.map(p => 
            `<li><span>${p.nombre}</span><span>x${p.cantidad}</span></li>`
        ).join('');
        
        const cardHTML = `
            <div class="pedido-card">
                <div class="card-header ${estadoClass}">
                    <h4>Pedido #${pedido.id}</h4>
                    <span>${estadoTexto}</span>
                </div>
                <div class="card-body">
                    <ul>${productosHTML}</ul>
                </div>
                <div class="card-footer">
                    <p><strong>Notas:</strong> ${pedido.nota || 'Ninguna'}</p>
                    <button class="btn-listo" onclick="marcarComoListo(${pedido.id})">
                        Marcar como LISTO (Verde Cliente)
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
        
        // Si el estado es PENDIENTE, cambiarlo automáticamente a PREPARANDO al cargarse (la cocina lo "acepta" al verlo)
        if (pedido.estado === ESTADOS.PENDIENTE) {
            actualizarEstadoLocal(pedido.id, ESTADOS.PREPARANDO);
        }
    });
}

// ===================================
// Lógica de Acción
// ===================================

// Función interna para actualizar el array local y re-renderizar
function actualizarEstadoLocal(id, nuevoEstado) {
    const pedidoIndex = pedidosActivos.findIndex(p => p.id === id);
    if (pedidoIndex > -1) {
        pedidosActivos[pedidoIndex].estado = nuevoEstado;
        // La re-renderización se hace después de la acción principal
    }
}

function marcarComoListo(id) {
    // 1. Simulación de la llamada al API
    // Aquí se ejecutaría un fetch() POST para cambiar el estado a LISTO (3) en la base de datos.
    if (!confirm(`¿Confirmas que el Pedido #${id} está completamente listo y empacado?`)) {
        return;
    }
    
    // 2. Actualización Local
    actualizarEstadoLocal(id, ESTADOS.LISTO); 

    // 3. Notificación y Re-renderizado
    alert(`Pedido #${id} marcado como LISTO. El cliente ahora lo verá en VERDE.`);
    renderizarPedidos();
}


// ===================================
// Inicialización
// ===================================

document.addEventListener("DOMContentLoaded", () => {
    // Cargar los pedidos al iniciar
    renderizarPedidos();
});