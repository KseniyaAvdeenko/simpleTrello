import React from 'react';
import profileStyles from "../../assets/styles/profile.module.sass";
import {bgColors, textColors} from "../../service/BoardSettings";

const NewBoardForm = ({newBoard, onChangeNewBoard, onSubmitNewBoard}) => {
    const highlightSelected = (e)=>{
        e.currentTarget.parentNode.childNodes.forEach(label => label.style.outline = '1px solid transparent')
        e.currentTarget.style.outline = '2px solid #8FBC8F'
    }
    return (
        <form onSubmit={e => onSubmitNewBoard(e)} className={profileStyles.newBoardForm}
              onClick={(e) => e.stopPropagation()}>
            <div className={profileStyles.inputContainer}>
                <input
                    type="text"
                    name="name"
                    id="boardName"
                    placeholder="Enter board name"
                    value={newBoard.name}
                    onChange={e => onChangeNewBoard(e)}
                />
            </div>
            <div className={profileStyles.inputContainer__items}>
                <p>Text color</p>
                <div className={profileStyles.inputContainer__colors}>
                    {textColors.map(color => (
                        <label className={profileStyles.colors__label} htmlFor={color.id} key={color.id}
                               style={{backgroundColor: color.value}}
                               onClick={e=> highlightSelected(e)}
                        >
                            <input
                                type="radio"
                                name="textColor"
                                id={color.id}
                                value={color.value}
                                onChange={e => onChangeNewBoard(e)}
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div className={profileStyles.inputContainer__items}>
                <p>Board background</p>
                <div className={profileStyles.inputContainer__colors}>
                    {
                        bgColors.map(bg => (
                            <label
                                className={profileStyles.colors__label}
                                htmlFor={bg.id}
                                key={bg.id}
                                onClick={e=> highlightSelected(e)}
                                style={{backgroundColor: bg.value}}>
                                <input
                                    type="radio"
                                    name="background"
                                    id={bg.id}
                                    value={bg.value}
                                    onChange={e => onChangeNewBoard(e)}
                                />
                            </label>
                        ))
                    }
                </div>
            </div>
            <button className={profileStyles.newBoardForm__button}>Create new board</button>
        </form>
    );
};

export default NewBoardForm;
