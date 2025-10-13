using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Lab5
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnReservar_Click(object sender, EventArgs e)
        {
            
            // DeclaracionVariables
            ClsReserva objReserva = new ClsReserva();
            int cantEntradas = 0;
            int cantEstacionamiento = 0;
            string tipoEntrada;

            // Etiqueta: TryCatchPrincipal
            try
            {
                // CapturaDatos
                tipoEntrada = cmbTipoEntrada.SelectedItem.ToString();
                cantEntradas = int.Parse(txtCantidadEntradas.Text);
                cantEstacionamiento = int.Parse(txtCantidadEstacionamiento.Text);

                // Validacion_Logica
                if (objReserva.ValidarReserva(tipoEntrada, cantEntradas, cantEstacionamiento))
                {
                    // DeclaracionResultados
                    decimal totalPagar, impuestoSpac, impuestoItbms;

                    // Calculo
                    objReserva.CalcularCosto(out totalPagar, out impuestoSpac, out impuestoItbms);

                    // Mensaje_Formato
                    string mensajeEstacionamiento = "";
                    if (cantEstacionamiento > 0)
                    {
                        mensajeEstacionamiento = $"\n\n¡Ha reservado {cantEstacionamiento} espacio(s) de estacionamiento! " +
                                                 $"Disponibles restantes: {objReserva.EstacionamientosDisponibles}";
                    }

                    // Impresion_Resultado
                    lblResultado.Text = $"--- RESERVA CONFIRMADA---\n\n" +
                                        $"Tipo de Entrada: {tipoEntrada} ({cantEntradas} uds)\n" +
                                        $"--------------------------------------\n" +
                                        $"Impuesto SPAC (5%): B/. {impuestoSpac:F2}\n" +
                                        $"ITBMS (7%): B/. {impuestoItbms:F2}\n" +
                                        $"--------------------------------------\n" +
                                        $"TOTAL A PAGAR: B/. {totalPagar:F2}" +
                                        mensajeEstacionamiento;

                    // Feedback_Disponibilidad
                    string dispRestante = $"Disponibles {tipoEntrada}: {objReserva.ObtenerDisponibilidad(tipoEntrada)}";
                    MessageBox.Show("Reserva exitosa.\n" + dispRestante, "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                else
                {
                    // Rechazo_Validacion
                    string mensajeRechazo = "La reserva ha sido rechazada. Verifique:\n" +
                                            "- Máximo de 5 entradas y 2 estacionamientos.\n" +
                                            "- Suficiente disponibilidad de entradas y estacionamientos.";

                    MessageBox.Show(mensajeRechazo, "Error de Validación", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            }
            // Excepciones_Formato
            catch (FormatException)
            {
                MessageBox.Show("Error: Asegúrese de ingresar números válidos para las cantidades.", "Error de Formato", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            // Excepciones_Nulo
            catch (NullReferenceException)
            {
                MessageBox.Show("Error: Debe seleccionar un Tipo de Entrada.", "Error de Selección", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            // Excepciones_General
            catch (Exception ex)
            {
                MessageBox.Show($"Ocurrió un error inesperado: {ex.Message}", "Error General", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        
    }
    }
}
