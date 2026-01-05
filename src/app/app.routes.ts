import { Routes } from '@angular/router';
import { ViewRuns } from './pages/view-runs/view-runs';
import { CreateRun } from './pages/create-run/create-run';
import {RunDetails} from './pages/run-details/run-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'runs' },

  { path: 'runs', component: ViewRuns },
  { path: 'runs/create', component: CreateRun },
  { path: 'runs/:id', component: RunDetails },

  { path: '**', redirectTo: 'runs' },
];
