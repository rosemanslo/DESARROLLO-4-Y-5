document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const gridPedidos = document.getElementById('gridPedidos');
    const mapaPlaceholder = document.getElementById('mapaPlaceholder');
    const initialLoadingOverlay = document.getElementById('initialLoadingOverlay');
    const routeAnimationOverlay = document.getElementById('routeAnimationOverlay');
    const deliveredAnimationOverlay = document.getElementById('deliveredAnimationOverlay');
    const deliveryActiveOverlay = document.getElementById('deliveryActiveOverlay'); 
    
    const mapaIframe = mapaPlaceholder.querySelector('iframe');
    
    function hideAllOverlays() {
        initialLoadingOverlay.classList.remove('show');
        routeAnimationOverlay.classList.remove('show');
        deliveredAnimationOverlay.classList.remove('show');
        deliveryActiveOverlay.classList.remove('show'); 
    }

    function showOverlay(overlayElement, textContent = '', duration = 0, nextAction = null) {
        hideAllOverlays();
        mapaPlaceholder.classList.remove('loaded'); 

        if (overlayElement) {
            overlayElement.classList.add('show');
            const textElement = overlayElement.querySelector('p');
            if (textElement) {
                textElement.textContent = textContent; // SIEMPRE actualiza el texto con lo que se le pase
            }
            
            if (duration > 0) {
                setTimeout(() => {
                    if (nextAction) {
                        nextAction(); 
                    } else {
                        showPermanentOverlay();
                    }
                }, duration);
            }
        }
    }

    function showPermanentOverlay() {
        hideAllOverlays();
        
        const pedidoEnRuta = pedidos.find(p => p.estado === 'En Ruta');

        if (pedidoEnRuta) {
            mapaPlaceholder.classList.add('loaded'); 
            mapaIframe.src = 'about:blank'; 
            console.warn(`[ALERTA Repartidor]: Pedido activo para entregar: ${pedidoEnRuta.id} - ${pedidoEnRuta.direccion}`);
        } else {
            initialLoadingOverlay.classList.add('show');
            initialLoadingOverlay.querySelector('.overlay-text').textContent = "Buscando nuevos pedidos, ¡esperando asignación!";
            mapaPlaceholder.classList.remove('loaded'); 
            mapaIframe.src = 'about:blank'; 
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("Roseman, ¿estás seguro que deseas cerrar sesión?")) {
                window.location.href = '../HTML/login.html'; 
            }
        });
    }

    let pedidos = [
        { id: '#001', cliente: 'Juan Pérez', direccion: 'Calle 50, Casa 12', items: ['Hamburguesa x1', 'Refresco x1'], estado: 'Pendiente' },
        { id: '#002', cliente: 'María Gómez', direccion: 'Vía España, Edif. Central, Apt. 5A', items: ['Ensalada x1', 'Agua x1'], estado: 'En Ruta' },
        { id: '#003', cliente: 'Carlos Ruiz', direccion: 'Avenida Balboa, Torre Mar, Piso 10', items: ['Papas Grandes x2'], estado: 'Entregado' },
        { id: '#004', cliente: 'Sofía Lara', direccion: 'UTP - Edif. 3, Lab. A', items: ['Jugo Natural x1', 'Wrap de Pollo x1'], estado: 'Pendiente' }
    ];

    function renderizarPedidos() {
        if (!gridPedidos) return;
        gridPedidos.innerHTML = ''; 

        pedidos.forEach((pedido, index) => {
            const card = document.createElement('div');
            card.className = 'card-pedido';
            card.dataset.id = pedido.id;

            let statusClass = '';
            if (pedido.estado === 'Pendiente') statusClass = 'status-pendiente';
            else if (pedido.estado === 'En Ruta') statusClass = 'status-enruta';
            else if (pedido.estado === 'Entregado') statusClass = 'status-entregado';
            else if (pedido.estado === 'En Espera') statusClass = 'status-pendiente'; 

            const tomarDisabled = pedido.estado !== 'Pendiente' ? 'disabled' : '';
            const completarDisabled = pedido.estado !== 'En Ruta' ? 'disabled' : '';

            card.innerHTML = `
                <div class="header-gradient">
                    Pedido ${pedido.id} 
                    <span class="status-indicator ${statusClass}">${pedido.estado}</span>
                </div>
                <div class="info">
                    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                    <p><strong>Dirección:</strong> ${pedido.direccion}</p>
                    <p><strong>Items:</strong> ${pedido.items.join(', ')}</p>
                </div>
                <div class="acciones">
                    <button class="btn-accion tomar" data-action="tomar" ${tomarDisabled}>
                        <i class="fas fa-truck-loading"></i> Tomar
                    </button>
                    <button class="btn-accion completar" data-action="completar" ${completarDisabled}>
                        <i class="fas fa-check-circle"></i> Entregado
                    </button>
                    <button class="btn-accion ver-detalles" data-action="detalles">
                        <i class="fas fa-info-circle"></i> Detalles
                    </button>
                </div>
            `;
            gridPedidos.appendChild(card);

            setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, index * 150 + 500); 
        });

        showPermanentOverlay();
    }

    gridPedidos.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-accion');
        if (!btn || btn.disabled) return; 

        const card = btn.closest('.card-pedido');
        const pedidoId = card ? card.dataset.id : null;
        const action = btn.dataset.action;
        const pedido = pedidos.find(p => p.id === pedidoId);

        if (!pedido) return;

        switch (action) {
            case 'tomar':
                if (pedido.estado === 'Pendiente') {
                    pedidos.forEach(p => { if(p.estado === 'Pendiente') p.estado = 'En Espera'; }); 
                    
                    showOverlay(routeAnimationOverlay, `¡Ruta iniciada! Preparando navegación...`, 1500, () => {
                        showOverlay(deliveryActiveOverlay, `¡PEDIDO ${pedidoId} EN CURSO! Dirigiéndose a ${pedido.direccion}`, 2500, () => { 
                            pedido.estado = 'En Ruta';
                            renderizarPedidos(); 
                        });
                    });
                }
                break;
            case 'completar':
                if (pedido.estado === 'En Ruta') {
                    pedido.estado = 'Entregado';
                    pedidos.forEach(p => { if(p.estado === 'En Espera') p.estado = 'Pendiente'; }); 

                    showOverlay(deliveredAnimationOverlay, `¡Pedido ${pedidoId} entregado con éxito!`, 2500, renderizarPedidos);
                }
                break;
            case 'detalles':
                alert(`Detalles del Pedido ${pedidoId}:\nCliente: ${pedido.cliente}\nDirección: ${pedido.direccion}\nItems: ${pedido.items.join(', ')}\nEstado: ${pedido.estado}`);
                return; 
        }
    });

    renderizarPedidos();
});