import { Routes } from '@angular/router';
import { Index } from './pages/index/index';
import { Login } from './pages/login/login'
import { Register } from './pages/register/register';
import { Settings } from './pages/settings/settings';
import { RegistroWizard } from './shared/components/registro-wizard/registro-wizard';
export const routes: Routes = [
  { path: '', component: Index },
  { path: 'login', component: Login },
  { path: 'register', component: Register }, 
  { path:'registro-datos', component:RegistroWizard},
  { path: 'settings', component: Settings },
  { path: '**', redirectTo: '' },
  
];
