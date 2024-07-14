import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule , FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  
  service_url = `https://66933836c6be000fa07a1504.mockapi.io/todo/v1/topic`
  topics:any = []

  constructor(
    private http:HttpClient,
    private router : Router
  )
  {
    this.loadTopics()
  }

  

  topic = new FormControl('')
  onAddTopic (){
    let body = {
      "topic": this.topic.value
    }
    this.http.post(this.service_url , body).subscribe({
        next : (result)=>{
            alert('Insert Success')
            this.loadTopics()
        }
    })
  }

  onRemoveTopic (id:number){
    this.http.delete(`${this.service_url}/${id}`).subscribe({
      next: (result)=>{
        alert('Delete Success')
        this.loadTopics()
      }
    })
  }

  loadTopics (){
    this.http.get(this.service_url).subscribe({
      next: (result) =>{
        this.topics = result
      }
    })
  }

  onSelectTopic(id:number){
    this.router.navigate(['/list',id])
  }
}
