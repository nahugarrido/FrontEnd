import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { BannerButtonComponent } from './components/banner-button/banner-button.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ModalesComponent } from './components/modales/modales.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { interceptorProvider } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    BannerButtonComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    ContactoComponent,
    ModalesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AlifeFileToBase64Module,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
