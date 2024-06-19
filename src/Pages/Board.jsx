import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import boardStyles from '../assets/styles/board.module.sass'
import commonStyle from '../assets/styles/common.module.sass'
import {addItem, db, querySnapshot} from "../service/TrelloFirebaseConnection";
import NewTaskListForm from "../Components/NewTaskListForm/NewTaskListForm";
import {BoardDoc, fireBaseConverter, nowDate, TaskDoc, TaskListDoc} from "../service/DataInterface";
import NewTaskForm from "../Components/NewTaskForm/NewTaskForm";

const Board = () => {
    let link = useParams()
    const [currentBoard, setCurrentBoard] = useState({})
    const [boardTaskLists, setBoardTaskLists] = useState([])
    const [boardSectionStyles, setBoardSectionStyles] = useState({color: '#1e1e1e', background: '#FFFFFF'})
    const [taskListForm, setTaskListForm] = useState([boardStyles.taskListForm, commonStyle.blockIHidden].join(' '))
    const [taskListName, setTaskListName] = useState('')
    const [taskName, setTaskName] = useState('')
    const [tasks, setTasks] = useState([])
    const [taskFormClasses, setTaskFormClasses] = useState({
        taskForm: [boardStyles.task__item, commonStyle.blockIHidden].join(' '),
        addButton: [boardStyles.taskList__button].join(' ')
    })
    useEffect(() => {
        console.log(querySnapshot.docs[1].data())
        if (querySnapshot.docs[0].data()) {
            const {boards} = querySnapshot.docs[0].data()
            if (boards && boards.filter(b => b.url === link.url).length) {
                setCurrentBoard(boards.filter(b => b.url === link.url)[0])
                setBoardSectionStyles({
                    ...boardSectionStyles,
                    background: boards.filter(b => b.url === link.url)[0].background,
                    color: boards.filter(b => b.url === link.url)[0].color
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
            // console.log(tasks)
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
            taskForm: [boardStyles.task__item].join(' '),
            addButton: [boardStyles.taskList__button, commonStyle.blockIHidden].join(' ')
        })
    }

    function closeTaskForm() {
        setTaskFormClasses({
            ...taskFormClasses,
            taskForm: [boardStyles.task__item, commonStyle.blockIHidden].join(' '),
            addButton: [boardStyles.taskList__button].join(' ')
        })
    }

    const onSubmitTaskForm = e => {
        e.preventDefault()
        console.log(e.currentTarget.parentNode.previousSibling.children.length)

        addItem(db,
            'trello',
            'Tasks',
            'tasks',
            fireBaseConverter(new TaskDoc(
                'taskId' + Date.parse(nowDate),
                e.currentTarget.dataset.list,
                currentBoard.url,
                taskName,
                e.currentTarget.parentNode.previousSibling.children.length
            ))
        ).then(res => console.log(res))
        setTasks([...tasks, fireBaseConverter(new TaskDoc(
            'taskId' + Date.parse(nowDate),
            e.currentTarget.dataset.list,
            currentBoard.url,
            taskName,
            e.currentTarget.parentNode.previousSibling.children.length
        ))])
        closeTaskForm()
        setTaskName('')
    }

    // console.log(tasks)

    return (
        <section className={boardStyles.boardSection} style={boardSectionStyles}>
            <div className={boardStyles.taskList__items}>
                {boardTaskLists.length
                    ? boardTaskLists.map(btl => (
                        <div className={boardStyles.taskList__item} key={btl.taskListId}>
                            <div className={boardStyles.taskList__heading}>{btl.taskListName}</div>
                            <div className={boardStyles.task__items}>
                                {
                                    tasks.length && tasks.filter(t => t.taskListId === btl.taskListId).length
                                        ? tasks.filter(t => t.taskListId === btl.taskListId).sort(sortTasks).map(task => (
                                            <div className={boardStyles.task__item} key={task.taskId}>{task.title}</div>
                                        ))
                                        : ''
                                }
                            </div>
                            <div className={boardStyles.btnContainer}>
                                <NewTaskForm onSubmitTaskForm={onSubmitTaskForm} taskName={taskName}
                                             setTaskName={setTaskName} taskFormClasses={taskFormClasses}
                                             dataList={btl.taskListId} closeTaskForm={closeTaskForm}/>
                                <button className={taskFormClasses.addButton} onClick={() => openTaskForm()}>
                                    + add task
                                </button>
                            </div>
                        </div>
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
