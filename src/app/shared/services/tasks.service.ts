import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(
    private apiService: ApiService,
  ) {
    this.loadTasks().pipe(first()).subscribe((tasks) => {
      this.tasks$.next(tasks);
    })
  }

  public get tasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  public loadTasks(): Observable<Task[]> {
    return this.apiService.get<Task[]>('tasks');
  }

  public addTask(title: string): Observable<Task> {
    const newTask = {
      title,
      description: '',
      completed: false
    };

    return this.apiService.post<Task>('tasks', newTask).pipe(
      tap((newTask) => {
        const tasks = this.tasks$.getValue();
        this.tasks$.next([...tasks, newTask]);
      })
    )
  }

  public deleteTask(id: number): Observable<void> {
    return this.apiService.delete<void>(`tasks/${id}`).pipe(
      tap(() => {
        const tasks = this.tasks$.getValue().filter(task => task.id !== id);
        this.tasks$.next(tasks);
      })
    );
  }
}
