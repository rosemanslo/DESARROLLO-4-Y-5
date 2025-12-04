const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // permite que tus HTML funcionen

// ====== Función genérica para leer JSON ======
function leerJSON(rutaRelativa) {
	const ruta = path.join(__dirname, rutaRelativa);
	if (!fs.existsSync(ruta)) {
		// Si no existe, devolvemos array vacío
		return [];
	}
	const data = fs.readFileSync(ruta, "utf8");
	if (!data.trim()) return [];
	return JSON.parse(data);
}

// ====== Función genérica para escribir JSON ======
function escribirJSON(rutaRelativa, contenido) {
	const ruta = path.join(__dirname, rutaRelativa);
	fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4), "utf8");
}

// ================= Menu =================
app.get("/api/menu", (req, res) => {
	try {
		const data = leerJSON("JSON/menu.json");
		res.json(data);
	} catch (err) {
		console.error("Error leyendo menu.json:", err);
		res.status(500).json({ error: "Error leyendo menú" });
	}
});

app.post("/api/menu", (req, res) => {
	try {
		escribirJSON("JSON/menu.json", req.body);
		res.json({ ok: true, msg: "JSON de menú actualizado" });
	} catch (err) {
		console.error("Error guardando menu.json:", err);
		res.status(500).json({ error: "Error guardando menú" });
	}
});

// ================= Carrito =================
app.get("/api/carrito", (req, res) => {
	try {
		const data = leerJSON("JSON/carrito.json");
		res.json(data);
	} catch (err) {
		console.error("Error leyendo carrito.json:", err);
		res.status(500).json({ error: "Error leyendo carrito" });
	}
});

app.post("/api/carrito", (req, res) => {
	try {
		escribirJSON("JSON/carrito.json", req.body);
		res.json({ ok: true, msg: "Carrito actualizado" });
	} catch (err) {
		console.error("Error guardando carrito.json:", err);
		res.status(500).json({ error: "Error guardando carrito" });
	}
});

// DELETE para limpiar carrito (lo usa tu limpiarCarrito())
app.delete("/api/carrito", (req, res) => {
	try {
		escribirJSON("JSON/carrito.json", []);
		res.json({ ok: true, msg: "Carrito limpiado" });
	} catch (err) {
		console.error("Error limpiando carrito.json:", err);
		res.status(500).json({ error: "Error limpiando carrito" });
	}
});

// ================= Clientes =================
app.get("/api/clientes", (req, res) => {
	try {
		const data = leerJSON("JSON/clientes.json");
		res.json(data);
	} catch (err) {
		console.error("Error leyendo clientes.json:", err);
		res.status(500).json({ error: "Error leyendo clientes" });
	}
});

app.post("/api/clientes", (req, res) => {
	try {
		escribirJSON("JSON/clientes.json", req.body);
		res.json({ ok: true, msg: "JSON de clientes actualizado" });
	} catch (err) {
		console.error("Error guardando clientes.json:", err);
		res.status(500).json({ error: "Error guardando clientes" });
	}
});

app.listen(PORT, () => console.log("Servidor funcionando en http://localhost:" + PORT));
