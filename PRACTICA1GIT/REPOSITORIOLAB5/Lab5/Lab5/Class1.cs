using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class ClsReserva
{
    // Constantes
    private const decimal PRECIO_PLATINO = 150.00m;
    private const decimal PRECIO_VIP = 100.00m;
    private const decimal PRECIO_GENERAL = 50.00m;
    private const decimal PRECIO_ESTACIONAMIENTO = 25.00m;
    private const decimal TASA_SPAC = 0.05m;
    private const decimal TASA_ITBMS = 0.07m;

    //  CuposDisponibles_Inicial
    private static int cuposPlatino = 10;
    private static int cuposVIP = 20;
    private static int cuposGeneral = 120;
    private static int cuposEstacionamiento = 200;

    //  Propiedades_Calculos
    public string TipoEntrada { get; set; }
    public int CantidadEntradas { get; set; }
    public int CantidadEstacionamiento { get; set; }

    //  Propiedad_Estacionamientos
    public int EstacionamientosDisponibles
    {
        get { return cuposEstacionamiento; }
    }

    //  Metodo_Validacion_Reserva
    public bool ValidarReserva(string tipo, int cantEntradas, int cantEstac)
    {
        //  Validacion_Maximos
        if (cantEntradas <= 0 || cantEntradas > 5 || cantEstac < 0 || cantEstac > 2)
        {
            return false; // Máximos por cliente
        }

        //  Validacion_Disponibilidad
        if (tipo == "Platino" && cantEntradas > cuposPlatino) return false;
        if (tipo == "VIP" && cantEntradas > cuposVIP) return false;
        if (tipo == "General" && cantEntradas > cuposGeneral) return false;
        if (cantEstac > cuposEstacionamiento) return false;

        //  Asignacion_Propiedades
        TipoEntrada = tipo;
        CantidadEntradas = cantEntradas;
        CantidadEstacionamiento = cantEstac;

        return true;
    }

    //  Metodo_CalcularCosto
    public void CalcularCosto(out decimal totalPagar, out decimal impuestoSpac, out decimal impuestoItbms)
    {
        decimal precioUnitarioEntrada = 0.0m;

        // PrecioBase
        if (TipoEntrada == "Platino") precioUnitarioEntrada = PRECIO_PLATINO;
        else if (TipoEntrada == "VIP") precioUnitarioEntrada = PRECIO_VIP;
        else if (TipoEntrada == "General") precioUnitarioEntrada = PRECIO_GENERAL;

        // SubTotal_Entradas
        decimal subTotalEntradas = precioUnitarioEntrada * CantidadEntradas;

        //  Calculo_SPAC
        impuestoSpac = subTotalEntradas * TASA_SPAC;

        // Costo_Estacionamiento
        decimal costoEstacionamiento = CantidadEstacionamiento * PRECIO_ESTACIONAMIENTO;

        // SubTotal_Impuesto
        decimal subTotalImpuesto = subTotalEntradas + impuestoSpac + costoEstacionamiento;

        // Calculo_ITBMS
        impuestoItbms = subTotalImpuesto * TASA_ITBMS;

        // Total
        totalPagar = subTotalImpuesto + impuestoItbms;

        // Actualizacion_Cupos
        if (TipoEntrada == "Platino") cuposPlatino -= CantidadEntradas;
        else if (TipoEntrada == "VIP") cuposVIP -= CantidadEntradas;
        else if (TipoEntrada == "General") cuposGeneral -= CantidadEntradas;

        cuposEstacionamiento -= CantidadEstacionamiento;
    }

    // Metodo_ObtenerDisponibilidad
    public int ObtenerDisponibilidad(string tipo)
    {
        if (tipo == "Platino") return cuposPlatino;
        if (tipo == "VIP") return cuposVIP;
        if (tipo == "General") return cuposGeneral;
        return 0;
    }
}
