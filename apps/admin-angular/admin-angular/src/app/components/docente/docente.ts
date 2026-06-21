import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DocenteModel, DocenteService } from '../../services/docente';

@Component({
    selector: 'app-docente',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './docente.html',
    styleUrl: './docente.css',
})
export class Docente implements OnInit {
    docentes = signal<DocenteModel[]>([]);
    mostrarFormulario = false;
    docenteSeleccionado: DocenteModel | null = null;

    form: Partial<DocenteModel> = {
        nombre: '', email: '', especialidad: '',
        departamento: '', estado: ''
    };

    private docenteService = inject(DocenteService);

    ngOnInit(): void {
        this.docenteService.getDocente().subscribe({
            next: (data) => {
                console.log('Docentes recibidos:', data);
                this.docentes.set(data);
            },
            error: (error) => {
                console.error('Error al obtener docentes:', error);
            }
        });
    }

    guardar(): void {
        if (this.docenteSeleccionado) {
            this.actualizarDocente(this.docenteSeleccionado._id, this.form);
        } else {
            this.crearDocente(this.form as DocenteModel);
        }
    }

    crearDocente(docente: DocenteModel): void {
        this.docenteService.crearDocente(docente).subscribe({
            next: (data) => {
                console.log('Docente creado:', data);
                this.ngOnInit();
                this.cancelar();
            },
            error: (error) => {
                console.error('Error al crear docente:', error);
            }
        });
    }

    editar(docente: DocenteModel): void {
        this.docenteSeleccionado = docente;
        this.form = { ...docente };
        this.mostrarFormulario = true;
    }

    actualizarDocente(id: string, docente: Partial<DocenteModel>): void {
        this.docenteService.actualizarDocente(id, docente).subscribe({
            next: (data) => {
                console.log('Docente actualizado:', data);
                this.ngOnInit();
                this.cancelar();
            },
            error: (error) => {
                console.error('Error al actualizar docente:', error);
            }
        });
    }

    eliminarDocente(id: string): void {
        this.docenteService.eliminarDocente(id).subscribe({
            next: (data) => {
                console.log(data.mensaje);
                this.ngOnInit();
            },
            error: (error) => {
                console.error('Error al eliminar docente:', error);
            }
        });
    }

    cancelar(): void {
        this.mostrarFormulario = false;
        this.docenteSeleccionado = null;
        this.form = { nombre: '', email: '', especialidad: '', departamento: '', estado: '' };
    }
}
