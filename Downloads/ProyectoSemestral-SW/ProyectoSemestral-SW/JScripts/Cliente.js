document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos
    const simularAvanceBtn = document.getElementById('simularAvanceBtn');
    const cancelarPedidoBtn = document.getElementById('cancelarPedidoBtn');
    const progressBar = document.querySelector('.progress-bar');
    const pedidoStatusText = document.getElementById('pedidoStatusText');
    const gridCatalogo = document.getElementById('gridCatalogo'); 
    const logoutBtn = document.getElementById('logoutBtn');

    // ====================================================================
    // LÓGICA DE CERRAR SESIÓN
    // ====================================================================
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
                // Redirigir al login o a la página de inicio
                window.location.href = '../HTML/login.html'; // Ajusta la ruta a tu página de login
            }
        });
    }

    // ====================================================================
    // LÓGICA DE ESTADO Y ANIMACIÓN (SIMULACIÓN DE PEDIDO)
    // ====================================================================

    // Se mantiene el valor de la circunferencia para el radio 45px del SVG
    const CIRCUMFERENCE = 282.6; 
    const estados = [
        'Pendiente', 'En Preparación', 'Listo para Recoger', 'Entregado'
    ];
    let estadoIndex = 0;

    function actualizarAnimacion(estado) {
        let progreso = 0;
        let icon = '';
        let color = '';
        let texto = estado;

        switch (estado) {
            case 'Pendiente':
                progreso = 0;
                icon = 'far fa-clock';
                color = '#ff9800'; // Naranja más brillante para pendiente
                break;
            case 'En Preparación':
                progreso = 30; 
                icon = 'fas fa-utensils';
                color = '#f38f4a'; // Naranja principal
                break;
            case 'Listo para Recoger':
                progreso = 80; 
                icon = 'fas fa-box-open';
                color = '#4CAF50'; // Verde para listo
                texto = 'Listo';
                break;
            case 'Entregado':
                progreso = 100;
                icon = 'fas fa-check-circle';
                color = '#26A69A'; // Verde oscuro para entregado
                texto = '¡Entregado!';
                break;
        }

        const offset = CIRCUMFERENCE - (progreso / 100) * CIRCUMFERENCE;

        if (progressBar) progressBar.style.strokeDashoffset = offset;
        if (progressBar) progressBar.style.stroke = color;

        if (pedidoStatusText) {
            pedidoStatusText.innerHTML = `<i class="${icon}"></i> <p>${texto}</p>`;
            const iconElement = pedidoStatusText.querySelector('i');
            if (iconElement) iconElement.style.color = color;
        }
        
        if (simularAvanceBtn) {
            const siguienteEstadoIndex = (estadoIndex + 1) % estados.length;
            const siguienteEstadoTexto = estados[siguienteEstadoIndex];
            
            if (siguienteEstadoIndex === 0) {
                 simularAvanceBtn.textContent = 'Reiniciar Simulación de Pedido';
            } else {
                 simularAvanceBtn.textContent = `Simular: "${siguienteEstadoTexto}"`;
            }
        }
    }
    
    // Asignación de Eventos de Progreso
    if (simularAvanceBtn) {
        simularAvanceBtn.addEventListener('click', () => {
            estadoIndex = (estadoIndex + 1) % estados.length; 
            actualizarAnimacion(estados[estadoIndex]);
        });
    }

    if (cancelarPedidoBtn) {
        cancelarPedidoBtn.addEventListener('click', () => {
            const confirmacion = confirm("¿Estás seguro de que deseas cancelar tu pedido #1023?");
            if (confirmacion) {
                alert("Pedido #1023 cancelado con éxito.");
                estadoIndex = 0; 
                actualizarAnimacion(estados[estadoIndex]);
            }
        });
    }
    
    actualizarAnimacion(estados[estadoIndex]); 


    // ====================================================================
    // LÓGICA: CATÁLOGO CON ANIMACIÓN DE VOLTEO (FLIP CARD)
    // ====================================================================

    const productos = [
        { id: 1, nombre: 'Hamburguesa Clásica', desc: 'Carne, queso, tomate, lechuga.', desc_larga: 'Una hamburguesa de res 100% panameña, con queso suizo derretido, tomate fresco, y lechuga crujiente. Servida en pan brioche.', precio: 5.50, img: 'burger.jpg' },
        { id: 2, nombre: 'Wrap de Pollo', desc: 'Pollo desmenuzado, vegetales frescos.', desc_larga: 'Tiras de pollo a la parrilla envueltas en una tortilla integral con aderezo ranch, aguacate y mezcla de lechugas.', precio: 4.00, img: 'wrap.jpg' },
        { id: 3, nombre: 'Papas Fritas UTP', desc: 'Ración grande con sal marina.', desc_larga: 'Nuestras papas insignia, cortadas a mano y fritas a la perfección, sazonadas con sal marina. Perfectas para acompañar.', precio: 2.50, img: 'fries.jpg' },
        { id: 4, nombre: 'Ensalada César', desc: 'Pollo a la parrilla, aderezo César.', desc_larga: 'Clásica ensalada César con crutones, queso parmesano y pollo tierno a la parrilla, bañada en aderezo cremoso.', precio: 6.00, img: 'salad.jpg' },
        { id: 5, nombre: 'Batido de Frutas', desc: 'Natural y refrescante.', desc_larga: 'Batido de frutas de temporada (fresa, banano y mango), preparado con leche entera o descremada a tu elección.', precio: 3.50, img: 'smoothie.jpg' },
        { id: 6, nombre: 'Jugo de Naranja', desc: 'Recién exprimido.', desc_larga: 'Jugo de naranja natural, recién exprimido al momento. La dosis perfecta de vitamina C.', precio: 2.00, img: 'juice.jpg' }
    ];

    function cargarCatalogo() {
        if (!gridCatalogo) return;

        productos.forEach((producto, index) => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-producto-container';

            const card = document.createElement('div');
            card.className = 'card-producto';
            card.dataset.id = producto.id;
            
            const imgPath = `../Img/${producto.img}`; 

            // 1. CARA FRONTAL
            const frontFace = document.createElement('div');
            frontFace.className = 'card-face card-face-front';
            
            frontFace.innerHTML = `
                <div class="card-header-gradient"></div>
                <div class="content">
                    <h3>${producto.nombre}</h3>
                    <p class="item-description">${producto.desc}</p>
                    <img src="${imgPath}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/150x150?text=No+Img'">
                    <p class="precio">$${producto.precio.toFixed(2)}</p>
                    <button class="btn-agregar" data-action="agregar">Agregar</button>
                    <button class="btn-detalle" data-action="flip">Descripción</button>
                </div>
            `;
            
            // 2. CARA TRASERA
            const backFace = document.createElement('div');
            backFace.className = 'card-face card-face-back';
            
            backFace.innerHTML = `
                <h3>Detalle de ${producto.nombre}</h3>
                <p>${producto.desc_larga}</p>
                <button class="btn-detalle" data-action="flip">Volver</button>
            `;


            card.appendChild(frontFace);
            card.appendChild(backFace);
            cardContainer.appendChild(card);
            gridCatalogo.appendChild(cardContainer);
            
            // Animación de desvanecimiento (Fade-in)
            setTimeout(() => {
                cardContainer.style.opacity = 1;
            }, index * 100); 
        });
    }

    cargarCatalogo();

    // LÓGICA PARA VOLTEAR LA TARJETA (FLIP) y Agregar
    gridCatalogo.addEventListener('click', (e) => {
        const btn = e.target;
        
        if (btn.dataset.action === 'flip') {
            const card = btn.closest('.card-producto');
            if (card) {
                card.classList.toggle('is-flipped');
            }
        } else if (btn.dataset.action === 'agregar') {
            const card = btn.closest('.card-producto');
            const id = card ? card.dataset.id : null;
            const producto = productos.find(p => p.id == id);
            if (producto) {
                alert(`"${producto.nombre}" agregado al carrito!`);
            }
        }
    });

});