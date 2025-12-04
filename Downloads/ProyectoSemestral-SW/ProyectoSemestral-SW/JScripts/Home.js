// Home.js - Lógica para estructura interactiva

document.addEventListener("DOMContentLoaded", function () {
	// Inicializar elementos
	initializePlaceholders();
	setupEventListeners();

	// Efecto de carga inicial
	setTimeout(() => {
		document.body.style.opacity = "1";
	}, 100);

	document.body.style.opacity = "0";
	document.body.style.transition = "opacity 0.3s ease-in";
});

function initializePlaceholders() {
	// Configurar placeholders para demostración
	const placeholders = {
		games: ["Juego 1", "Juego 2", "Juego 3"],
		newsCategories: ["ACTUALIZACIÓN", "NOTICIA", "EVENTO", "OFERTA", "LANZAMIENTO"],
		menuItems: ["Inicio", "Biblioteca", "Tienda", "Comunidad", "Ajustes"],
		options: ["Seleccionar", "Configurar", "Guardar"],
	};

	// Aplicar texto de demostración al hacer clic
	document.querySelectorAll(".menu-item").forEach((item, index) => {
		item.dataset.text = placeholders.menuItems[index] || `Menú ${index + 1}`;
	});

	document.querySelectorAll(".option-item").forEach((item, index) => {
		item.dataset.text = placeholders.options[index] || `Opción ${index + 1}`;
	});
}

function setupEventListeners() {
	// Noticias
	document.querySelectorAll(".news-card").forEach((card, index) => {
		card.addEventListener("click", function () {
			this.style.borderLeftColor = "#ff6b6b";
			setTimeout(() => {
				this.style.borderLeftColor = "#4a9eff";
			}, 300);

			// Efecto visual
			this.style.transform = "scale(0.98)";
			setTimeout(() => {
				this.style.transform = "";
			}, 200);
		});
	});

	// Menú items
	document.querySelectorAll(".menu-item").forEach((item) => {
		item.addEventListener("click", function () {
			// Remover activo de todos
			document.querySelectorAll(".menu-item").forEach((i) => {
				i.classList.remove("active");
			});

			// Marcar como activo
			this.classList.add("active");

			// Mostrar texto
			const originalHTML = this.innerHTML;
			this.innerHTML = this.dataset.text;
			this.style.color = "#4a9eff";

			setTimeout(() => {
				this.innerHTML = originalHTML;
				this.style.color = "";
			}, 1000);
		});
	});

	// Opciones
	document.querySelectorAll(".option-item").forEach((item) => {
		item.addEventListener("click", function () {
			const originalHTML = this.innerHTML;
			this.innerHTML = this.dataset.text;
			this.style.backgroundColor = "#4a9eff";
			this.style.color = "#fff";

			setTimeout(() => {
				this.innerHTML = originalHTML;
				this.style.backgroundColor = "";
				this.style.color = "";
			}, 800);
		});
	});

	// Juego destacado
	const featuredCard = document.querySelector(".featured-card");
	if (featuredCard) {
		featuredCard.addEventListener("click", function () {
			this.style.transform = "scale(0.98)";
			setTimeout(() => {
				this.style.transform = "scale(1.02)";
			}, 150);
		});
	}

	// Juego reciente
	const recentGame = document.querySelector(".recent-game-card");
	if (recentGame) {
		recentGame.addEventListener("click", function () {
			this.style.boxShadow = "0 0 0 2px #4a9eff";
			setTimeout(() => {
				this.style.boxShadow = "";
			}, 500);
		});
	}

	// Botones de navegación
	document.querySelectorAll(".nav-button").forEach((button) => {
		button.addEventListener("click", function () {
			const isBack = this.classList.contains("back-button");
			this.style.transform = "scale(0.95)";

			setTimeout(() => {
				this.style.transform = "";
				console.log(`Botón ${isBack ? "ATRÁS" : "SELECCIONAR"} presionado`);
			}, 150);
		});
	});
}
