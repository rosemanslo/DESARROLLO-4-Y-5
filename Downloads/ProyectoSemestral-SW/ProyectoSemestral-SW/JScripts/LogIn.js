// JavaScript dedicado al LogIn+SignIn
// Snippet de lógica para animación
const contenedor = document.getElementById("container");
const BTNRegistro = document.getElementById("register");
const BTNInicioSesion = document.getElementById("login");

BTNRegistro.addEventListener("click", () => {
	contenedor.classList.add("activo");
});

BTNInicioSesion.addEventListener("click", () => {
	contenedor.classList.remove("activo");
});

// Snippet de lógica para LogIn
const formLogIn = document.getElementById("LogIn");
const BTNLogIn = document.getElementById("LogInBTN");
const mailLI = document.getElementById("mailLI");
const pwLI = document.getElementById("passwLI");

BTNLogIn.addEventListener("click", (e) => {
	e.preventDefault();
	// 1. Validar campos vacíos
	if (mailLI.value === "" || pwLI.value === "") {
		BTNLogIn.classList.add("Error");
		alert("Se dejaron campos vacíos.");
		setTimeout(() => BTNLogIn.classList.remove("Error"), 800);
		return;
	}

	// 2. Validar longitud mínima de contraseña
	if (pwLI.value.length < 6) {
		BTNLogIn.classList.add("Error");
		alert("La contraseña debe tener al menos 6 caracteres.");
		setTimeout(() => BTNLogIn.classList.remove("Error"), 800);
		return;
	}

	// 3. Todo bien → animación + redirección
	BTNLogIn.classList.add("Aplastar");
	setTimeout(() => {
		window.location.href = "/HTML/Menu.html";
		BTNLogIn.classList.remove("Aplastar");
	}, 800);
});

// Snipet de lógica para SignIn
const formSignIn = document.getElementById("SignIn");
const BTNSignIn = document.getElementById("SignInBTN");
const nameSI = document.getElementById("nameSI");
const mailSI = document.getElementById("mailSI");
const pwSI = document.getElementById("passwSI");
const cPWSI = document.getElementById("cPasswSI");

BTNSignIn.addEventListener("click", (e) => {
	e.preventDefault();

	// 1. Validar campos vacíos
	if (nameSI.value === "" || mailSI.value === "" || pwSI.value === "" || cPWSI.value === "") {
		BTNSignIn.classList.add("Error");
		alert("Se dejaron campos vacíos.");
		setTimeout(() => BTNSignIn.classList.remove("Error"), 800);
		return;
	}

	// 2. Validar longitud mínima de la contraseña
	if (pwSI.value.length < 6 || cPWSI.value.length < 6) {
		BTNSignIn.classList.add("Error");
		alert("La contraseña debe tener al menos 6 caracteres.");
		setTimeout(() => BTNSignIn.classList.remove("Error"), 800);
		return;
	}

	// 3. Validar contraseñas iguales
	if (pwSI.value !== cPWSI.value) {
		BTNSignIn.classList.add("Error");
		alert("Las contraseñas no coinciden.");
		setTimeout(() => BTNSignIn.classList.remove("Error"), 800);
		return;
	}

	// 4. Todo bien, animación de "Aplastar" y redirección
	BTNSignIn.classList.add("Aplastar");
	setTimeout(() => {
		window.location.href = "/HTML/Home.html";
		BTNSignIn.classList.remove("Aplastar");
	}, 800);
});

// Snippet de lógica para alternar la contraseña
function togglePassword(input, btn) {
	btn.addEventListener("click", () => {
		input.type = input.type === "password" ? "text" : "password";
		btn.textContent = input.type === "password" ? "👁" : "🙈";
	});
}

// LogIn
togglePassword(document.getElementById("passwLI"), document.getElementById("togglePwLI"));

// SignIn
togglePassword(document.getElementById("passwSI"), document.getElementById("togglePwSI"));

togglePassword(document.getElementById("cPasswSI"), document.getElementById("toggleCPwSI"));
