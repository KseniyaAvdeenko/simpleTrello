import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import boardStyles from '../assets/styles/board.module.sass'
import commonStyle from '../assets/styles/common.module.sass'
import {addItem, db, deleteItem, querySnapshot} from "../service/TrelloFirebaseConnection";
import NewTaskListForm from "../Components/NewTaskListForm/NewTaskListForm";
import {fireBaseConverter, nowDate, TaskDoc, TaskListDoc} from "../service/DataInterface";
import NewTaskForm from "../Components/NewTaskForm/NewTaskForm";
import TaskList from "../Components/TaskList";

const Board = () => {
    let link = useParams()
    const [currentBoard, setCurrentBoard] = useState(localStorage.currentBoard ? JSON.parse(localStorage.currentBoard) : {})
    const [boardTaskLists, setBoardTaskLists] = useState([])
    const [boardSectionStyles, setBoardSectionStyles] = useState(localStorage.currentBoard ? {
        color: JSON.parse(localStorage.currentBoard).textColor,
        background: JSON.parse(localStorage.currentBoard).background
    } : {color: '#1e1e1e', background: '#FFFFFF'})
    const [taskListForm, setTaskListForm] = useState([boardStyles.taskListForm, commonStyle.blockIHidden].join(' '))
    const [taskListName, setTaskListName] = useState('')
    const [taskName, setTaskName] = useState('')
    const [tasks, setTasks] = useState([])

    const [currentTaskList, setCurrentTaskList] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    class GetDataFromFireBase {

        getBoards(link) {
            if (querySnapshot.docs[0].data()) {
                const {boards} = querySnapshot.docs[0].data()
                if (boards && boards.filter(b => b.url === link).length) {
                    setCurrentBoard(boards.filter(b => b.url === link)[0])
                    setBoardSectionStyles({
                        ...boardSectionStyles,
                        background: boards.filter(b => b.url === link)[0].background,
                        color: boards.filter(b => b.url === link)[0].textColor
                    })
                }
            }
        }

        getTaskLists(link) {
            if (querySnapshot.docs[1].data()) {
                const {taskLists} = querySnapshot.docs[1].data();
                if (taskLists && taskLists.length && taskLists.filter(tl => tl.boardUrl === link).length) {
                    setBoardTaskLists(taskLists.filter(tl => tl.boardUrl === link))
                }
            }
        }

        getTasks(link) {
            if (querySnapshot.docs[2].data()) {
                const {tasks} = querySnapshot.docs[2].data()
                if (tasks && tasks.filter(t => t.boardUrl === link).length) {
                    setTasks(tasks.filter(t => t.boardUrl === link))
                }
            }
        }

    }

    let fireBaseData = new GetDataFromFireBase

    useEffect(() => {
        fireBaseData.getBoards(link.url);
        fireBaseData.getTaskLists(link.url);
        fireBaseData.getTasks(link.url)
    }, [link.url])

    function closeTaskListForm() {
        setTaskListForm([boardStyles.taskListForm, commonStyle.blockIHidden].join(' '))
    }

    const onSubmitTaskListForm = e => {
        e.preventDefault()
        addItem(db,
            'trello',
            'TaskList',
            'taskLists',
            fireBaseConverter(new TaskListDoc(
                'taskList' + Date.parse(nowDate),
                currentBoard.url,
                taskListName
            ))
        ).then(res => res)
        setBoardTaskLists([...boardTaskLists, fireBaseConverter(new TaskListDoc(
            'taskList' + Date.parse(nowDate),
            currentBoard.url,
            taskListName
        ))])
        closeTaskListForm()
        setTaskListName('')
    }

    const copyTaskList = (copiedName) => {
        addItem(db,
            'trello',
            'TaskList',
            'taskLists',
            fireBaseConverter(new TaskListDoc(
                'taskList' + Date.parse(nowDate),
                currentBoard.url,
                copiedName
            ))
        ).then(res => console.log(res))
        setBoardTaskLists([...boardTaskLists, fireBaseConverter(new TaskListDoc(
            'taskList' + Date.parse(nowDate),
            currentBoard.url,
            copiedName
        ))])
    }

    function deleteTaskList(obj) {
        tasks.filter(task=>task.taskListId === obj.taskListId).forEach(task=>deleteTask(obj.taskListId, task))
        deleteItem(db, 'trello', 'TaskList', 'taskLists', obj).then(res => console.log(res))
        setBoardTaskLists(boardTaskLists.filter(tl => tl.taskListId !== obj.taskListId))
    }

    function sortTasks(a, b) {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

    function openTaskForm(e) {
        e.currentTarget.nextSibling.className = [boardStyles.taskList__settings, commonStyle.blockIHidden].join(' ')
        e.currentTarget.previousSibling.className = [boardStyles.task__form].join(' ')
        e.currentTarget.className = [boardStyles.taskList__button, commonStyle.blockIHidden].join(' ')
    }

    function closeTaskForm(e) {
        e.currentTarget.parentNode.parentNode.className = [boardStyles.task__form, commonStyle.blockIHidden].join(' ')
        e.currentTarget.parentNode.parentNode.nextSibling.className = [boardStyles.taskList__button].join(' ')
        e.currentTarget.parentNode.parentNode.nextSibling.nextSibling.className = [boardStyles.taskList__settings].join(' ')
    }

    const onSubmitTaskForm = e => {
        e.preventDefault()
        if (e.currentTarget.parentNode.previousSibling.childNodes.length) {
            addItem(db,
                'trello',
                'Tasks',
                'tasks',
                fireBaseConverter(new TaskDoc(
                    'taskId' + Date.parse(nowDate),
                    e.currentTarget.dataset.list,
                    currentBoard.url,
                    taskName,
                    parseInt(e.currentTarget.parentNode.previousSibling.childNodes[e.currentTarget.parentNode.previousSibling.children.length - 1].dataset.order) + 1
                ))
            ).then(res => console.log(res))
            setTasks([...tasks, fireBaseConverter(new TaskDoc(
                'taskId' + Date.parse(nowDate),
                e.currentTarget.dataset.list,
                currentBoard.url,
                taskName,
                parseInt(e.currentTarget.parentNode.previousSibling.childNodes[e.currentTarget.parentNode.previousSibling.children.length - 1].dataset.order) + 1
            ))])
        } else {
            addItem(db,
                'trello',
                'Tasks',
                'tasks',
                fireBaseConverter(new TaskDoc(
                    'taskId' + Date.parse(nowDate),
                    e.currentTarget.dataset.list,
                    currentBoard.url,
                    taskName,
                    e.currentTarget.parentNode.previousSibling.childNodes.length + 1
                ))
            ).then(res => res)
            setTasks([...tasks, fireBaseConverter(new TaskDoc(
                'taskId' + Date.parse(nowDate),
                e.currentTarget.dataset.list,
                currentBoard.url,
                taskName,
                e.currentTarget.parentNode.previousSibling.childNodes.length + 1
            ))])
        }
        setTaskName('')
        e.currentTarget.className = [boardStyles.task__form, commonStyle.blockIHidden].join(' ')
        e.currentTarget.nextSibling.className = [boardStyles.taskList__button].join(' ')
        e.currentTarget.nextSibling.nextSibling.className = [boardStyles.taskList__settings].join(' ')
    }

    function copyTask(e, obj) {
        console.log()
        addItem(db,
            'trello',
            'Tasks',
            'tasks',
            fireBaseConverter(new TaskDoc(
                'taskId' + Date.parse(nowDate),
                obj.taskListId,
                currentBoard.url,
                obj.title,
                parseInt(e.currentTarget.parentNode.parentNode.parentNode.children[e.currentTarget.parentNode.parentNode.parentNode.children.length - 1].dataset.order) + 1
            ))
        ).then(res => res)
        setTasks([...tasks, fireBaseConverter(new TaskDoc(
            'taskId' + Date.parse(nowDate),
            obj.taskListId,
            currentBoard.url,
            obj.title,
            parseInt(e.currentTarget.parentNode.parentNode.parentNode.children[e.currentTarget.parentNode.parentNode.parentNode.children.length - 1].dataset.order) + 1
        ))])
    }

    function copyTasks(listId, tasksArray) {
        return [...tasksArray.filter(t => t.taskListId === listId)]
    }

    function copyTasksForDelete(listId, tasksArray, deletedObj) {
        return [...tasksArray.filter(t => t.taskListId === listId && t.taskId !== deletedObj.taskId)]
    }

    function reIndexTasks(listId, tasksArray, savedTasksArray) {
        tasksArray.filter(task => task.taskListId === listId).forEach(task => deleteItem(db, 'trello', 'Tasks', 'tasks', task))
        savedTasksArray = savedTasksArray.sort(sortTasks).map((task, i) => {
            task.order = i + 1;
            return task
        })
        savedTasksArray.forEach(task => addItem(db, 'trello', 'Tasks', 'tasks', task))
        fireBaseData.getTasks(link.url)
        return tasks
    }

    function deleteTask(taskListId, obj) {
        deleteItem(db, 'trello', 'Tasks', 'tasks', obj).then(r => r)
        setTasks(tasks.filter(t => t.taskId !== obj.taskId))
        reIndexTasks(taskListId, tasks, copyTasksForDelete(taskListId, tasks, obj))
    }

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.hasAttribute('data-order')) {
            e.target.style.boxShadow = '0 2px 5px 0 #454545'
        }
    }

    function dragStartHandler(e, list, task) {
        setCurrentTaskList(list)
        setCurrentTask(task)
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = '0 0 10px 0 rgba(69, 69, 69, 0.25)'
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = '0 0 10px 0 rgba(69, 69, 69, 0.25)'
    }

    function dropHandler(e, list, task) {
        e.preventDefault()
        let targetIndex = Array.prototype.indexOf.call(e.target.parentNode.children, e.target)
        let draggableTask = Object.assign(currentTask, {})
        deleteTask(currentTaskList.taskListId, currentTask)
        setCurrentTask(null)
        draggableTask.taskListId = list.taskListId
        draggableTask.order = targetIndex
        addItem(db, 'trello', 'Tasks', 'tasks', draggableTask).then(res => res)
        setTasks(reIndexTasks(list.taskListId, tasks, copyTasks(list.taskListId, tasks)))
    }

    function listDropHandler(e, taskList) {
        e.preventDefault()
        if (!tasks.filter(t => t.taskListId === taskList.taskListId).length) {
            let draggableTask = Object.assign(currentTask, {})
            deleteTask(currentTaskList.taskListId, currentTask)
            setCurrentTask(null)
            draggableTask.taskListId = taskList.taskListId
            addItem(db, 'trello', 'Tasks', 'tasks', draggableTask).then(res => res)
            setTasks(reIndexTasks(taskList.taskListId, tasks, copyTasks(taskList.taskListId, tasks)))
        }
    }


    return (
        <section className={boardStyles.boardSection} style={boardSectionStyles}>
            <div className={boardStyles.taskList__items}>
                {boardTaskLists.length
                    ? boardTaskLists.map(btl => (
                        <TaskList btl={btl} tasks={tasks} sortTasks={sortTasks}
                                  copyTask={copyTask} taskName={taskName}
                                  onSubmitTaskForm={onSubmitTaskForm}
                                  deleteTask={deleteTask} key={btl.taskListId}
                                  setTaskName={setTaskName}
                                  closeTaskForm={closeTaskForm}
                                  openTaskForm={openTaskForm}
                                  dropHandler={dropHandler}
                                  boardSectionStyles={boardSectionStyles}
                                  deleteTaskList={deleteTaskList}
                                  copyTaskList={copyTaskList}
                                  dragOverHandler={dragOverHandler}
                                  dragStartHandler={dragStartHandler}
                                  dragLeaveHandler={dragLeaveHandler}
                                  dragEndHandler={dragEndHandler}
                                  listDropHandler={listDropHandler}
                        />
                    ))
                    : ''
                }
                <div className={boardStyles.taskListBtnContainer}>
                    <NewTaskListForm
                        taskListForm={taskListForm}
                        closeTaskListForm={closeTaskListForm}
                        taskListName={taskListName}
                        setTaskListName={setTaskListName}
                        onSubmitTaskListForm={onSubmitTaskListForm}
                    />
                    <button className={boardStyles.taskList__btn}
                            onClick={() => setTaskListForm([boardStyles.taskListForm].join(' '))}>+ add new task list
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Board;
