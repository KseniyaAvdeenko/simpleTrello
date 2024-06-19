import React, {useState} from 'react';
import boardStyles from '../../assets/styles/board.module.sass'

const NewTaskListForm = ({taskListName, taskListForm, setTaskListName, onSubmitTaskListForm, closeTaskListForm}) => {
    const [closeBtnFill, setCloseBtnFill] =useState('#345e37')

    return (
        <form onSubmit={e=>onSubmitTaskListForm(e)} className={taskListForm}>
            <div className={boardStyles.inputContainer}>
                <input
                    type="text"
                    name="taskListName"
                    id="taskListName"
                    placeholder="Enter task list name"
                    value={taskListName}
                    onChange={e=>setTaskListName(e.target.value)}
                />
            </div>
            <div className={boardStyles.btnContainer}>
                <button className={boardStyles.taskListForm__button}>Add List</button>
                <svg width="14" height="14"
                     viewBox="0 0 14 14" fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     onMouseOver={()=>setCloseBtnFill('#2E8B57')}
                     onMouseOut={()=>setCloseBtnFill('#345e37')}
                     onClick={()=>closeTaskListForm()}
                >
                    <path
                        d="M13.6268 2.11607C13.7435 2.00348 13.8366 1.86879 13.9006 1.71984C13.9647 1.57089 13.9985 1.41068 13.9999 1.24855C14.0014 1.08641 13.9706 0.925608 13.9093 0.775513C13.848 0.625418 13.7574 0.489039 13.6428 0.374335C13.5282 0.259631 13.3919 0.168897 13.2418 0.10743C13.0918 0.0459616 12.931 0.0149905 12.7689 0.0163225C12.6068 0.0176544 12.4465 0.051263 12.2975 0.115188C12.1485 0.179112 12.0137 0.272072 11.901 0.388644L7.00691 5.28112L2.11444 0.388644C2.00265 0.268673 1.86784 0.172449 1.71806 0.105709C1.56827 0.0389697 1.40658 0.00308283 1.24262 0.000190033C1.07867 -0.00270277 0.915811 0.0274578 0.763764 0.0888718C0.611718 0.150286 0.473599 0.241695 0.357647 0.357647C0.241695 0.473599 0.150286 0.611717 0.0888718 0.763764C0.0274578 0.91581 -0.00270277 1.07867 0.000190033 1.24262C0.00308283 1.40658 0.0389697 1.56827 0.105709 1.71806C0.172449 1.86784 0.268673 2.00265 0.388644 2.11444L5.27786 7.00854L0.385388 11.901C0.169696 12.1325 0.0522707 12.4387 0.0578522 12.755C0.0634337 13.0713 0.191586 13.3732 0.415309 13.5969C0.639033 13.8206 0.94086 13.9488 1.2572 13.9543C1.57355 13.9599 1.87971 13.8425 2.11118 13.6268L7.00691 8.73434L11.8994 13.6284C12.1309 13.8441 12.437 13.9616 12.7534 13.956C13.0697 13.9504 13.3715 13.8222 13.5953 13.5985C13.819 13.3748 13.9471 13.073 13.9527 12.7566C13.9583 12.4403 13.8409 12.1341 13.6252 11.9026L8.73597 7.00854L13.6268 2.11607Z"
                        fill={closeBtnFill}/>
                </svg>
            </div>
        </form>
    );
};

export default NewTaskListForm;
