namespace Lab5
{
    partial class Form1
    {
        /// <summary>
        /// Variable del diseñador necesaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpiar los recursos que se estén usando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben desechar; false en caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de Windows Forms

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido de este método con el editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.lblResultado = new System.Windows.Forms.Label();
            this.cmbTipoEntrada = new System.Windows.Forms.ComboBox();
            this.txtCantidadEntradas = new System.Windows.Forms.TextBox();
            this.txtCantidadEstacionamiento = new System.Windows.Forms.TextBox();
            this.btnReservar = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Perpetua Titling MT", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(88, 24);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(590, 28);
            this.label1.TabIndex = 0;
            this.label1.Text = "RESERVA DE ENTRADAS Y ESTACIONAMIENTOS";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Perpetua Titling MT", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(144, 103);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(179, 21);
            this.label2.TabIndex = 1;
            this.label2.Text = "Tipo de Entrada";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Perpetua Titling MT", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(11, 152);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(312, 21);
            this.label3.TabIndex = 2;
            this.label3.Text = "Cantidad de Entrada (Máx 5)";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Perpetua Titling MT", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(57, 207);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(266, 21);
            this.label4.TabIndex = 3;
            this.label4.Text = "Estacionamiento (Máx 2)";
            // 
            // lblResultado
            // 
            this.lblResultado.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.lblResultado.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblResultado.Font = new System.Drawing.Font("Perpetua Titling MT", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblResultado.Location = new System.Drawing.Point(510, 70);
            this.lblResultado.Name = "lblResultado";
            this.lblResultado.Size = new System.Drawing.Size(373, 279);
            this.lblResultado.TabIndex = 4;
            // 
            // cmbTipoEntrada
            // 
            this.cmbTipoEntrada.FormattingEnabled = true;
            this.cmbTipoEntrada.Items.AddRange(new object[] {
            "Platino",
            "VIP",
            "General"});
            this.cmbTipoEntrada.Location = new System.Drawing.Point(365, 104);
            this.cmbTipoEntrada.Name = "cmbTipoEntrada";
            this.cmbTipoEntrada.Size = new System.Drawing.Size(121, 24);
            this.cmbTipoEntrada.TabIndex = 5;
            // 
            // txtCantidadEntradas
            // 
            this.txtCantidadEntradas.Location = new System.Drawing.Point(365, 151);
            this.txtCantidadEntradas.Name = "txtCantidadEntradas";
            this.txtCantidadEntradas.Size = new System.Drawing.Size(100, 22);
            this.txtCantidadEntradas.TabIndex = 6;
            // 
            // txtCantidadEstacionamiento
            // 
            this.txtCantidadEstacionamiento.Location = new System.Drawing.Point(365, 208);
            this.txtCantidadEstacionamiento.Name = "txtCantidadEstacionamiento";
            this.txtCantidadEstacionamiento.Size = new System.Drawing.Size(100, 22);
            this.txtCantidadEstacionamiento.TabIndex = 7;
            // 
            // btnReservar
            // 
            this.btnReservar.Location = new System.Drawing.Point(352, 264);
            this.btnReservar.Name = "btnReservar";
            this.btnReservar.Size = new System.Drawing.Size(125, 43);
            this.btnReservar.TabIndex = 8;
            this.btnReservar.Text = "Realizar Reserva";
            this.btnReservar.UseVisualStyleBackColor = true;
            this.btnReservar.Click += new System.EventHandler(this.btnReservar_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(908, 471);
            this.Controls.Add(this.btnReservar);
            this.Controls.Add(this.txtCantidadEstacionamiento);
            this.Controls.Add(this.txtCantidadEntradas);
            this.Controls.Add(this.cmbTipoEntrada);
            this.Controls.Add(this.lblResultado);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "5";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label lblResultado;
        private System.Windows.Forms.ComboBox cmbTipoEntrada;
        private System.Windows.Forms.TextBox txtCantidadEntradas;
        private System.Windows.Forms.TextBox txtCantidadEstacionamiento;
        private System.Windows.Forms.Button btnReservar;
    }
}

