using System.Collections.Generic;
using Libreria.LN.Entidades; // Necesita esta referencia para el objeto Libro
using System; // Para manejar excepciones
 
namespace Libreria.AD 
{
    public class LibrosAD
    {
        // NOTA: Implementar try-catch para manejo de excepciones de BD.

        public List<Libro> ObtenerTodos()
        {
            // Tarea 
            return new List<Libro>();
        }

        public List<Libro> FiltrarPorGenero(string genero)
        {
            // Tarea
            return new List<Libro>();
        }

        public void AgregarLibro(Libro nuevoLibro)
        {
            // Tarea 
        }

        public void ActualizarCantidad(int idLibro, int nuevaCantidad)
        {
            // Tarea 
        }

        public void EliminarLibro(int idLibro)
        {
            // Tarea 
        }
    }
}