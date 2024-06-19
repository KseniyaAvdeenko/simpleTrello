export const nowDate = new Date().toISOString();

export class UserDoc {
    constructor(id, login,email, password) {
        this.id = id
        this.login = login
        this.email = email
        this.password = password
    }
}

export class BoardDoc {
    constructor(boardId, userId, name, background, textColor, url) {
        this.boardId = boardId
        this.userId = userId
        this.name = name
        this.background = background
        this.textColor = textColor
        this.url = url
    }
}

export class TaskListDoc {
    constructor(taskListId, boardUrl, taskListName) {
        this.taskListId = taskListId
        this.boardUrl = boardUrl
        this.taskListName = taskListName
    }
}

export class TaskDoc {
    constructor(taskId, taskListId, boardUrl,  title, order) {
        this.taskId = taskId
        this.taskListId = taskListId
        this.boardUrl = boardUrl
        this.title = title
        this.order=order
    }
}

export function fireBaseConverter(obj){
    let data = {}
    Object.keys(obj).map((key)=>data[key] = obj[key])
    return data
}

