import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CursosModel, CursosService } from '../../services/cursos';

@Component({
    selector: 'app-cursos',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './cursos.html',
    styleUrl: './cursos.css',
})
export class Cursos implements OnInit {
    cursos = signal<CursosModel[]>([]);
    mostrarFormulario = false;
    cursoSeleccionado: CursosModel | null = null;

    form: Partial<CursosModel> = {
        curso: '', docente: '', categorias: '',
        insctritos: '', precio: '', estado: ''
    };

    private cursoService = inject(CursosService);

    ngOnInit(): void {
        this.cursoService.getCurso().subscribe({
            next: (data) => {
                console.log('Cursos recibidos:', data);
                this.cursos.set(data);
            },
            error: (error) => {
                console.error('Error al obtener cursos:', error);
            }
        });
    }

    guardar(): void {
        if (this.cursoSeleccionado) {
            this.actualizarCurso(this.cursoSeleccionado._id, this.form);
        } else {
            this.crearCurso(this.form as CursosModel);
        }
    }

    crearCurso(curso: CursosModel): void {
        this.cursoService.crearCurso(curso).subscribe({
            next: (data) => {
                console.log('Curso creado:', data);
                this.ngOnInit();
                this.cancelar();
            },
            error: (error) => {
                console.error('Error al crear curso:', error);
            }
        });
    }

    editar(curso: CursosModel): void {
        this.cursoSeleccionado = curso;
        this.form = { ...curso };
        this.mostrarFormulario = true;
    }

    actualizarCurso(id: string, curso: Partial<CursosModel>): void {
        this.cursoService.actualizarCurso(id, curso).subscribe({
            next: (data) => {
                console.log('Curso actualizado:', data);
                this.ngOnInit();
                this.cancelar();
            },
            error: (error) => {
                console.error('Error al actualizar curso:', error);
            }
        });
    }

    eliminarCurso(id: string): void {
        this.cursoService.eliminarCurso(id).subscribe({
            next: (data) => {
                console.log(data.mensaje);
                this.ngOnInit();
            },
            error: (error) => {
                console.error('Error al eliminar curso:', error);
            }
        });
    }

    cancelar(): void {
        this.mostrarFormulario = false;
        this.cursoSeleccionado = null;
        this.form = { curso: '', docente: '', categorias: '', insctritos: '', precio: '', estado: '' };
    }
}