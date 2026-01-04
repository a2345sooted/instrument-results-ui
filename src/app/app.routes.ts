import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { ViewRuns } from './pages/view-runs/view-runs';
import { CreateRun } from './pages/create-run/create-run';
import {RunDetails} from './pages/run-details/run-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'runs' },

  { path: 'about', component: About },

  { path: 'runs', component: ViewRuns },
  { path: 'runs/create', component: CreateRun },
  { path: 'runs/:id', component: RunDetails },

  { path: '**', redirectTo: 'runs' },
];
