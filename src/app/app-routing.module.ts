import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavComponent } from './component/nav/nav.component';
import { TecnicoListComponent } from './component/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {
    path:'', component: NavComponent,canActivate: [AuthGuard], children:[
      {path:'home', component:HomeComponent},
     
      {path:'tecnicos',component:TecnicoListComponent},
      {path:'tecnicos/create',component:TecnicoCreateComponent},
      {path:'tecnicos/update/:id',component:TecnicoUpdateComponent},
      {path:'tecnicos/delete/:id',component:TecnicoDeleteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
