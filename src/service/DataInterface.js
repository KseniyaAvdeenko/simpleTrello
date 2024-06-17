// export class UserDoc {
//     constructor(id, login,email, password) {
//         this.id = id
//         this.login = login
//         this.email = email
//         this.password = password
//     }
// }

export class BoardDoc {
    constructor(wsId, userId, name, background, url) {
        this.wsId = wsId
        this.userId = userId
        this.name = name
        this.background = background
        this.url = url
    }
}

export class TaskListDoc {
    constructor(taskListId, workSpaceId, taskListName) {
        this.taskListId = taskListId
        this.workSpaceId = workSpaceId
        this.taskListName = taskListName
    }
}

export class TaskDoc {
    constructor(taskId, title, description, order) {
        this.taskId = taskId
        this.title = title
        this.description = description
        this.order=order
    }
}

export function fireBaseConverter(obj){
    let data = {}
    Object.keys(obj).map((key)=>data[key] = obj[key])
    return data
}

