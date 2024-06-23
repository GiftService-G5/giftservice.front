import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { UserwebService } from '../../../services/userweb.service';
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from '../../../services/role.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Role } from '../../../models/Roles';

@Component({
  selector: 'app-register-role',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './register-role.component.html',
  styleUrl: './register-role.component.css',
})
export class RegisterRoleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  idUsuario: number | undefined;

  role: Role = new Role();

  constructor(
    private uS: UserwebService,
    private rS: RoleService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      seleccion: ['', Validators.required],
    });
  }

  roles: { value: string; viewValue: string }[] = [
    { value: 'EMPRENDIMIENTO', viewValue: 'EMPRENDIMIENTO' },
    { value: 'CLIENTE', viewValue: 'CLIENTE' },
  ];

  ngOnInit(): void {
    this.uS.encontrarUltimoUsuario().subscribe(
      (ultimoUsuarioId) => {
        this.idUsuario = ultimoUsuarioId;
        console.log('Último ID de usuario:', this.idUsuario);
      },
      (error) => {
        console.error('Error al obtener último usuario:', error);
      }
    );
  }

  register() {
    if (this.form.valid && this.idUsuario !== undefined) {
      this.role.usEr.idUser = this.idUsuario;
      this.role.nameRole = this.form.value.seleccion;

      this.rS.insert(this.role).subscribe(
        (res) => {
          console.log('Rol registrado correctamente:', res);
        },
        (error) => {
          console.error('Error al registrar rol:', error);
        }
      );
    }
  }
}
