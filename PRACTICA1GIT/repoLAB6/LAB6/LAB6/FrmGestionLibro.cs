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
    public partial class FrmGestionLibro : Form
    {


        private LibrosLN _logica;
    public FrmGestionLibro()
        {
            InitializeComponent();
        this.Text = "Agregar Nuevo Libro"; // Título del formulario
        _logica = new LibrosLN();

        CargarGeneros();
    }
        private void CargarGeneros()
        {
            cmbGenero.Items.AddRange(new string[] {
                "Novelas",
                "Terror",
                "Fantasía",
                "Historia",
                "Poemas"
            });
            // Opcional: Seleccionar el primer elemento para evitar errores de selección vacía
            if (cmbGenero.Items.Count > 0)
                cmbGenero.SelectedIndex = 0;
        }





        private void FrmGestionLibro_Load(object sender, EventArgs e)
        {

        }

        private void btnGuardar_Click(object sender, EventArgs e)
        {
            // Validaciones de UI básicas
            if (string.IsNullOrWhiteSpace(txtTitulo.Text) || string.IsNullOrWhiteSpace(txtAutor.Text))
            {
                MessageBox.Show("El Título y el Autor no pueden estar vacíos.", "Validación", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            if (cmbGenero.SelectedItem == null)
            {
                MessageBox.Show("Debe seleccionar un Género Literario.", "Validación", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                // 1. Crear el objeto de entidad con los datos de los controles
                var nuevoLibro = new Libro
                {
                    Titulo = txtTitulo.Text,
                    Autor = txtAutor.Text,
                    GeneroLiterario = cmbGenero.SelectedItem.ToString(),
                    // El control NumericUpDown ya devuelve un valor numérico
                    CantidadDisponible = (int)numCantidad.Value
                };

                // 2. Llama a la Capa de Negocio (LN) para ejecutar las validaciones de negocio y guardar
                _logica.GuardarNuevoLibro(nuevoLibro);

                // 3. Informar éxito
                MessageBox.Show("Libro guardado con éxito.", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);

                // 4. Establece el resultado del diálogo a OK y cierra el formulario
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            catch (ArgumentException aex) // Captura errores de validación lanzados desde Libreria.LN
            {
                MessageBox.Show(aex.Message, "Error de Validación de Datos", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            catch (Exception ex) // Captura errores generales (conexión a BD, etc.)
            {
                MessageBox.Show($"Error al guardar el libro: {ex.Message}", "Error del Sistema", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
    

