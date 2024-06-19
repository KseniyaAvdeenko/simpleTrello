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
    const [taskFormClasses, setTaskFormClasses] = useState({
        taskForm: [boardStyles.task__form, commonStyle.blockIHidden].join(' '),
        addButton: [boardStyles.taskList__button].join(' '),
        settings: [boardStyles.taskList__settings].join(' '),
    })

    useEffect(() => {
        if (querySnapshot.docs[0].data()) {
            const {boards} = querySnapshot.docs[0].data()
            if (boards && boards.filter(b => b.url === link.url).length) {
                setCurrentBoard(boards.filter(b => b.url === link.url)[0])
                setBoardSectionStyles({
                    ...boardSectionStyles,
                    background: boards.filter(b => b.url === link.url)[0].background,
                    color: boards.filter(b => b.url === link.url)[0].textColor
                })
            }
        }
        if (querySnapshot.docs[1].data()) {
            const {taskLists} = querySnapshot.docs[1].data();
            if (taskLists && taskLists.length && taskLists.filter(tl => tl.boardUrl === link.url).length) {
                setBoardTaskLists(taskLists.filter(tl => tl.boardUrl === link.url))
            }
        }
        if (querySnapshot.docs[2].data()) {
            const {tasks} = querySnapshot.docs[2].data()
            if (tasks && tasks.filter(t => t.boardUrl === link.url).length) {
                setTasks(tasks.filter(t => t.boardUrl === link.url))
            }
        }

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
        ).then(res => console.log(res))
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

    function openTaskForm() {
        setTaskFormClasses({
            ...taskFormClasses,
            taskForm: [boardStyles.task__form].join(' '),
            addButton: [boardStyles.taskList__button, commonStyle.blockIHidden].join(' '),
            settings: [boardStyles.taskList__settings, commonStyle.blockIHidden].join(' '),
        })
    }

    function closeTaskForm() {
        setTaskFormClasses({
            ...taskFormClasses,
            taskForm: [boardStyles.task__form, commonStyle.blockIHidden].join(' '),
            addButton: [boardStyles.taskList__button].join(' '),
            settings: [boardStyles.taskList__settings].join(' '),
        })
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
                    e.currentTarget.parentNode.previousSibling.childNodes.length+1
                ))
            ).then(res => console.log(res))
            setTasks([...tasks, fireBaseConverter(new TaskDoc(
                'taskId' + Date.parse(nowDate),
                e.currentTarget.dataset.list,
                currentBoard.url,
                taskName,
                e.currentTarget.parentNode.previousSibling.childNodes.length+1
            ))])
        }
        closeTaskForm()
        setTaskName('')
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

    function updateTasks(taskListId) {

    }

    function deleteTask(taskListId, obj) {
        deleteItem(db, 'trello', 'Tasks', 'tasks', obj).then(r => r)
        setTasks(tasks.filter(t => t.taskId !== obj.taskId))
        let savedTasks = [...tasks.filter(t => t.taskListId === taskListId && t.taskId !== obj.taskId)]
        tasks.filter(task => task.taskListId === taskListId).forEach(task => deleteItem(db, 'trello', 'Tasks', 'tasks', task))
        savedTasks = savedTasks.sort(sortTasks).map((task, i) => {task.order = i + 1;return task})
        savedTasks.forEach(task => addItem(db, 'trello', 'Tasks', 'tasks', task))
    }


    return (
        <section className={boardStyles.boardSection} style={boardSectionStyles}>
            <div className={boardStyles.taskList__items}>
                {boardTaskLists.length
                    ? boardTaskLists.map(btl => (
                        <TaskList btl={btl} tasks={tasks} sortTasks={sortTasks} copyTask={copyTask}
                                  onSubmitTaskForm={onSubmitTaskForm} taskName={taskName} deleteTask={deleteTask}
                                  setTaskName={setTaskName} taskFormClasses={taskFormClasses}
                                  closeTaskForm={closeTaskForm} openTaskForm={openTaskForm}
                                  boardSectionStyles={boardSectionStyles} key={btl.taskListId}
                                  copyTaskList={copyTaskList} deleteTaskList={deleteTaskList}/>
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
