import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TipoSiniestro = 'Robo' | 'Colisión';
type EstadoSiniestro = 'En proceso' | 'Atrasado' | 'En finanzas' | 'Pagado';

interface Siniestro {
  numero: string;
  tipo: TipoSiniestro;
  asegurado: string;
  fechaRecepcion: string;
  etapa: string;
  responsable: string;
  estado: EstadoSiniestro;
  monto: number;
  dias: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  vista = 'Dashboard';
  busqueda = '';
  filtroTipo = 'Todos';
  filtroEstado = 'Todos';
  siniestroSeleccionado: Siniestro | null = null;

  siniestros: Siniestro[] = [
    { numero: 'SIN-2026-1048', tipo: 'Colisión', asegurado: 'María Fernanda López', fechaRecepcion: '06 oct 2026', etapa: 'Validación documental', responsable: 'Laura Méndez', estado: 'Atrasado', monto: 48500, dias: 9 },
    { numero: 'SIN-2026-1047', tipo: 'Robo', asegurado: 'Carlos Hernández Ruiz', fechaRecepcion: '07 oct 2026', etapa: 'Análisis del siniestro', responsable: 'Jorge Salas', estado: 'En proceso', monto: 127000, dias: 6 },
    { numero: 'SIN-2026-1046', tipo: 'Colisión', asegurado: 'Ana Sofía Ramírez', fechaRecepcion: '07 oct 2026', etapa: 'Finanzas', responsable: 'Paola Cruz', estado: 'En finanzas', monto: 32600, dias: 5 },
    { numero: 'SIN-2026-1045', tipo: 'Robo', asegurado: 'Roberto García Torres', fechaRecepcion: '08 oct 2026', etapa: 'Recepción', responsable: 'Miguel Ortega', estado: 'En proceso', monto: 89500, dias: 3 },
    { numero: 'SIN-2026-1044', tipo: 'Colisión', asegurado: 'Daniela Castillo Pérez', fechaRecepcion: '08 oct 2026', etapa: 'Pago y cierre', responsable: 'Paola Cruz', estado: 'Pagado', monto: 21800, dias: 2 },
    { numero: 'SIN-2026-1043', tipo: 'Robo', asegurado: 'Luis Alberto Mendoza', fechaRecepcion: '09 oct 2026', etapa: 'Validación documental', responsable: 'Laura Méndez', estado: 'En proceso', monto: 76500, dias: 1 }
  ];

  etapas = [
    { nombre: 'Recepción', estado: 'Completada', fecha: '07 oct · 09:14', responsable: 'Miguel Ortega' },
    { nombre: 'Validación documental', estado: 'Completada', fecha: '07 oct · 13:40', responsable: 'Laura Méndez' },
    { nombre: 'Análisis del siniestro', estado: 'En proceso', fecha: '08 oct · 10:05', responsable: 'Jorge Salas' },
    { nombre: 'Autorización', estado: 'Pendiente', fecha: '—', responsable: 'Por asignar' },
    { nombre: 'Finanzas y pago', estado: 'Pendiente', fecha: '—', responsable: '—' }
  ];

  get siniestrosFiltrados(): Siniestro[] {
    const q = this.busqueda.trim().toLowerCase();
    return this.siniestros.filter(s => {
      const coincideTexto = !q || `${s.numero} ${s.asegurado} ${s.responsable}`.toLowerCase().includes(q);
      const coincideTipo = this.filtroTipo === 'Todos' || s.tipo === this.filtroTipo;
      const coincideEstado = this.filtroEstado === 'Todos' || s.estado === this.filtroEstado;
      return coincideTexto && coincideTipo && coincideEstado;
    });
  }

  cambiarVista(vista: string): void {
    this.vista = vista;
    if (vista !== 'Detalle del siniestro') this.siniestroSeleccionado = null;
  }

  verDetalle(siniestro: Siniestro): void {
    this.siniestroSeleccionado = siniestro;
    this.vista = 'Detalle del siniestro';
  }

  volverAListado(): void {
    this.vista = 'Siniestros';
    this.siniestroSeleccionado = null;
  }

  formatoMonto(monto: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(monto);
  }

  claseEstado(estado: string): string {
    if (estado === 'Atrasado') return 'status status-danger';
    if (estado === 'Pagado') return 'status status-success';
    if (estado === 'En finanzas') return 'status status-info';
    return 'status status-warning';
  }
}
