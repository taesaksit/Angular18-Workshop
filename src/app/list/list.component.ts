import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl , ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  )
  {
    this.route.paramMap.subscribe(params =>{
      console.log(params.get('topicId'))
      this.topicId = params.get('topicId')
      this.loadList()
    })
  }

  todo = new FormControl('')
  service_url = 'https://66933836c6be000fa07a1504.mockapi.io/todo/v1/topic'
  topicId:any
  list:any = []

  loadList () {
    console.log(`${this.service_url}/${this.topicId}/todos`)
    this.http.get(`${this.service_url}/${this.topicId}/todos`).subscribe({
        next: (result)=> {
            this.list = result
        },
    })
  }


  onAddTodo (){
    let body = {
      "topic": this.todo.value
    }
    console.log(body)
    this.http.post(`${this.service_url}/${this.topicId}/todos/` , body).subscribe({
        next : (result)=>{
            alert('Insert Success')
            this.loadList()
        }
    })
  }
  onRemoveTodo(id:number){
    console.log(id)
    this.http.delete(`${this.service_url}/${this.topicId}/todos/${id}`).subscribe({
      next: (result)=>{
       
        this.loadList()
      }
    })
  }

  onUpdateTodo(id:number , status:boolean){
    let  upadteTodoUrl = `https://66933836c6be000fa07a1504.mockapi.io/todo/v1/todos/${id}`
    let body = {"status": !status}

    this.http.put(upadteTodoUrl, body).subscribe({
      next: (result) => {
        this.loadList();
      }
    });

  }




}
