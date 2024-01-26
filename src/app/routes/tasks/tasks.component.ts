import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, first, take } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public tasks$ = this.tasksService.tasks;
  public addTaskControl = new FormControl('', { nonNullable: true, validators: [Validators.required]})

  constructor(
    private tasksService: TasksService,
  ) { }

  public ngOnInit(): void {
  }

  public addTask() {
    console.log('inside addTask');
    this.tasksService.addTask(this.addTaskControl.value).subscribe(() => {
    })
  }

  public deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe();
  }
}
