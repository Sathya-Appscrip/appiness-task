import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const meetings = [
      { id: 1, name: 'Making of wireframe' , duration:'10 minutes' , assignee:"rahul@gmail.com" },
      { id: 2, name: 'Making of framework' , duration:'30 minutes' , assignee:"joe@gmail.com" },
      { id: 2, name: 'Clients meeting' , duration:'20 minutes' , assignee:"joe@gmail.com" },
      { id: 2, name: 'Managers meet' , duration:'10 minutes' , assignee:"joe@gmail.com" },
      { id: 2, name: 'Consultant meet' , duration:'50 minutes' , assignee:"joe@gmail.com" },
      { id: 2, name: 'HR meet' , duration:'10 minutes' , assignee:"joe@gmail.com" },
      { id: 2, name: 'Teamates meet' , duration:'50 minutes' , assignee:"joe@gmail.com" },

    ];

    const userList = [
        {
            id : 1,
            name : "Satya",
            username : "satya17",
            phone : '9036554422',
            mail : "satya@mob.com",
            address : "bangalore",
            password : "password"
        },
       
    ]
    return {meetings , userList};
  }
}
