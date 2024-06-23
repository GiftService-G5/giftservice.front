import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserwebService } from '../../../services/userweb.service';
import { City } from '../../../models/city';
import { CityService } from '../../../services/city.service';
import { MatSelectModule } from '@angular/material/select';
import { UserWeb } from '../../../models/UserWeb';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listCities: City[] = [];
  usuario: UserWeb = new UserWeb();

  constructor(
    private uS: UserwebService,
    private cS: CityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreUsusario: ['', Validators.required],
      contraseña: ['', Validators.required],
      enabled: [true],
      nombreReal: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
    });

    this.cS.list().subscribe((data) => {
      this.listCities = data;
    });
  }

  Registrar() {
    if (this.form.valid) {
      this.usuario.username = this.form.value.nombreUsusario;
      this.usuario.password = this.form.value.contraseña;
      this.usuario.enabled = this.form.value.enabled;
      this.usuario.realname = this.form.value.nombreReal;
      this.usuario.lastName = this.form.value.apellido;
      this.usuario.mail = this.form.value.email;
      this.usuario.contact = this.form.value.telefono;
      this.usuario.address = this.form.value.direccion;
      this.usuario.ciTy.idCity = this.form.value.ciudad;

      this.uS.insert(this.usuario).subscribe(
        (data) => {
          console.log('Usuario registrado correctamente:', data);
          this.router.navigate(['registrarRole']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}
