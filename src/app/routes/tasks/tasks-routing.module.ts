import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
