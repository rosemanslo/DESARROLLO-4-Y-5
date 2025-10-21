using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Libreria.LN;
using Libreria.LN.Entidades;

namespace LAB6
{
    public partial class FrmInventarioPrincipal : Form
    {
      
         private LibrosLN _logica;

        public FrmInventarioPrincipal()
        {
            InitializeComponent();
            this.Text = "Inventario de Libros - Biblioteca UTP"; // Cambiar encabezado
            // ERROR CORREGIDO 2: Inicializa _logica
            _logica = new LibrosLN();

            // Carga los ítems del filtro
            cmbGeneroFiltro.Items.AddRange(new string[] { "Novelas", "Terror", "Fantasía", "Historia", "Poemas" });
            cmbGeneroFiltro.SelectedIndex = 0; // Selecciona un valor por defecto

            CargarLibros();

            CargarLibros();

        }

        private void CargarLibros()
        {
            try
            {
                var libros = _logica.ObtenerLibros();
                dgvLibros.DataSource = libros;
                // Opcional: Ajustar nombres de columnas
                if (dgvLibros.Columns.Contains("CantidadDisponible"))
                    dgvLibros.Columns["CantidadDisponible"].HeaderText = "Stock Disponible";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error de conexión: {ex.Message}", "Error de Sistema", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
      

        private void btnFiltrar_Click(object sender, EventArgs e)
        {
            try
            {
                string generoSeleccionado = cmbGeneroFiltro.SelectedItem.ToString();
                var (librosFiltrados, cantidadTitulos) = _logica.ObtenerYContarPorGenero(generoSeleccionado);

                dgvLibros.DataSource = librosFiltrados;
                lblCantidadTitulos.Text = $"Títulos listados: {cantidadTitulos}";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al filtrar: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            // Usa 'using' para asegurar que el formulario se libere de la memoria
            using (var frmGestion = new FrmGestionLibro())
            {
                if (frmGestion.ShowDialog() == DialogResult.OK)
                {
                    CargarLibros();
                }
            }
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            if (dgvLibros.CurrentRow == null)
            {
                MessageBox.Show("Seleccione un libro para eliminar.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (MessageBox.Show("¿Está seguro de eliminar el libro seleccionado?", "Confirmar Eliminación", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                try
                {
                    // Obtener el ID del libro seleccionado desde el DataGridView
                    int idLibro = (int)dgvLibros.CurrentRow.Cells["Id"].Value;

                    _logica.EliminarLibro(idLibro); // Llama a la Capa LN

                    MessageBox.Show("Libro eliminado exitosamente.", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    CargarLibros();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error al eliminar: {ex.Message}", "Error de Sistema", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
    
    }
}
