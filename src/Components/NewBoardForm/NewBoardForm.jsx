import React from 'react';
import profileStyles from "../../assets/styles/profile.module.sass";

const NewBoardForm = ({newBoard, onChangeNewBoard, onSubmitNewBoard}) => {
    return (
        <form onSubmit={e=>onSubmitNewBoard(e)} className={profileStyles.newBoardForm} onClick={(e)=>e.stopPropagation()}>
            <div className={profileStyles.inputContainer}>
                <input
                    type="text"
                    name="name"
                    id="boardName"
                    placeholder="Enter board name"
                    value={newBoard.name}
                    onChange={e=>onChangeNewBoard(e)}
                />
            </div>
            <div className={profileStyles.inputContainer}>
                <label htmlFor="textColor">Text color</label>
                <input
                    type="color"
                    name="textColor"
                    id="textColor"
                    value={newBoard.textColor}
                    onChange={e=>onChangeNewBoard(e)}
                />
            </div>
            <div className={profileStyles.inputContainer}>
                <label htmlFor="background">Board background</label>
                <input
                    type="color"
                    name="background"
                    id="background"
                    value={newBoard.background}
                    onChange={e=>onChangeNewBoard(e)}
                />
            </div>
            <button className={profileStyles.newBoardForm__button}>Create new board</button>
        </form>
    );
};

export default NewBoardForm;
