import React, {useState} from 'react';
import boardStyles from "../assets/styles/board.module.sass";
import commonStyle from "../assets/styles/common.module.sass";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import CopyIcon from "./CopyIcon";
import DeleteIcon from "./DeleteIcon";

const TaskList = (props) => {

    const [copyTaskListIconFill, setCopyTaskListIconFill] = useState(props.boardSectionStyles.color);
    const [deleteTaskListIconFill, setDeleteTaskListIconFill] = useState(props.boardSectionStyles.color);

    return (
        <div className={boardStyles.taskList__item}>
            <div className={boardStyles.taskList__heading}>{props.btl.taskListName}</div>
            <div className={boardStyles.task__items} data-list={props.btl.taskListId}>
                {
                    props.tasks.length && props.tasks.filter(t => t.taskListId === props.btl.taskListId).length
                        ? props.tasks.filter(t => t.taskListId === props.btl.taskListId).sort(props.sortTasks).map(task => (
                            <div className={boardStyles.task__item} key={task.taskId} data-order={task.order}>
                                <p>{task.title}{task.order}</p>
                                <div className={boardStyles.taskList__settings.settings}>
                                    <CopyIcon classname={[boardStyles.taskList__icon, commonStyle.mr_10].join(' ')}
                                              fill={props.boardSectionStyles.color}
                                              onClick={e => props.copyTask(e, task)}/>
                                    <DeleteIcon classname={boardStyles.taskList__icon}
                                                fill={props.boardSectionStyles.color}
                                                onClick={() => props.deleteTask(props.btl.taskListId, task)}/>
                                </div>
                            </div>
                        ))
                        : ''
                }
            </div>
            <div className={[boardStyles.btnContainer, commonStyle.jcSpBtw].join(' ')}>
                <NewTaskForm onSubmitTaskForm={props.onSubmitTaskForm} taskName={props.taskName}
                             setTaskName={props.setTaskName} taskFormClasses={props.taskFormClasses}
                             dataList={props.btl.taskListId} closeTaskForm={props.closeTaskForm}/>
                <button className={props.taskFormClasses.addButton} onClick={() => props.openTaskForm()}>
                    + add task
                </button>
                <div className={props.taskFormClasses.settings}>
                    <CopyIcon fill={copyTaskListIconFill}
                              onMouseOver={() => setCopyTaskListIconFill('#2E8B57')}
                              onClick={() => props.copyTaskList(props.btl.taskListName)}
                              classname={[boardStyles.taskList__icon, commonStyle.mr_10].join(' ')}
                              onMouseOut={() => setCopyTaskListIconFill(props.boardSectionStyles.color)}/>
                    <DeleteIcon fill={deleteTaskListIconFill}
                                classname={boardStyles.taskList__icon}
                                onClick={() => props.deleteTaskList(props.btl)}
                                onMouseOver={() => setDeleteTaskListIconFill('#2E8B57')}
                                onMouseOut={() => setDeleteTaskListIconFill(props.boardSectionStyles.color)}/>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
