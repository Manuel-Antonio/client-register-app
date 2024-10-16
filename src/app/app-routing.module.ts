import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
