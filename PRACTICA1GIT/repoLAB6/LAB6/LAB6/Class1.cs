// Archivo: Libros.LN/Entidades/Libro.cs

namespace Libreria.LN.Entidades
{
    public class Libro
    {
        public int Id { get; set; }

        public string Titulo { get; set; } // Máximo 100 caracteres

        public string Autor { get; set; } // Máximo 50 caracteres

        // Género Literario (novelas, terror, fantasía, historia y poemas)
        public string GeneroLiterario { get; set; }

        public int CantidadDisponible { get; set; }
    }
}