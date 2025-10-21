using System;
using System.Collections.Generic;
using Libreria.AD;
using Libreria.LN.Entidades;

// Se asume que tu proyecto de la Lógica de Negocio (Libreria.LN) no está dentro de LAB6,
// por eso se eliminó la referencia "using LAB6;".
// Si el namespace de tu proyecto de lógica de negocio es LAB6, cambia 'Libreria.LN' por 'LAB6'.
namespace Libreria.LN
{
    public class LibrosLN
    {
        private LibrosAD _datos;

        public LibrosLN()
        {
            _datos = new LibrosAD();
        }

        public List<Libro> ObtenerLibros()
        {
            return _datos.ObtenerTodos();
        }

        // Retorna la lista filtrada y la cantidad de títulos (int)
        public (List<Libro> LibrosFiltrados, int CantidadTitulos) ObtenerYContarPorGenero(string genero)
        {
            var listaFiltrada = _datos.FiltrarPorGenero(genero);
            int cantidad = listaFiltrada.Count;

            return (listaFiltrada, cantidad);
        }

        public void GuardarNuevoLibro(Libro libro)
        {
            // Validaciones de entrada (cumpliendo con el enunciado)
            if (string.IsNullOrWhiteSpace(libro.Titulo))
            {
                throw new ArgumentException("El título del libro es obligatorio.");
            }
            if (libro.Titulo.Length > 100) // Máximo 100 caracteres 
            {
                throw new ArgumentException("El título no puede exceder los 100 caracteres.");
            }
            // Agrega más validaciones aquí (Autor, Cantidad, Género)

            _datos.AgregarLibro(libro); // Llama a la Capa AD
        }

        public void ActualizarEjemplares(int idLibro, int nuevaCantidad)
        {
            // Validaciones
            if (nuevaCantidad < 0)
            {
                throw new ArgumentException("La cantidad disponible no puede ser negativa.");
            }

            _datos.ActualizarCantidad(idLibro, nuevaCantidad);
        }

        public void EliminarLibro(int idLibro)
        {
            _datos.EliminarLibro(idLibro);
        }
    }
}