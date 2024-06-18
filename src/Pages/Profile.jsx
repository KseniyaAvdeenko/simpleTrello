import React, {useEffect, useState} from 'react';
import profileStyles from '../assets/styles/profile.module.sass'
import commonStyles from '../assets/styles/common.module.sass'
import {addItem, db, querySnapshot} from "../service/TrelloFirebaseConnection";
import {Link} from "react-router-dom";
import {BoardDoc, fireBaseConverter, nowDate} from "../service/DataInterface";
import NewBoardForm from "../Components/NewBoardForm/NewBoardForm";

const Profile = () => {

    const [currentUser, setCurrentUser] = useState({})
    const [userBoards, setUserBoards] = useState([])
    const [newBoard, setNewBoard] = useState({name: '', textColor: "#1e1e1e", background: '#FFFFFF'})
    const [newBoardForm, setNewBoardForm] = useState([profileStyles.newBoardFormContainer, commonStyles.blockIHidden].join(' '))

    function getuserBoards(userId) {
        if (querySnapshot.docs[0].data()) {
            const {boards} = querySnapshot.docs[0].data()
            console.log(boards)
            boards
                ? setUserBoards(boards.filter(b => b.userId === userId))
                : setUserBoards([])
        }
    }

    useEffect(() => {
        if (localStorage.loggedUser) {
            setCurrentUser(JSON.parse(localStorage.loggedUser))
            getuserBoards(JSON.parse(localStorage.loggedUser).id)
        }

    }, [currentUser.id]);

    function hoverIn(e) {
        let bgColor = getComputedStyle(e.currentTarget).backgroundColor
        e.currentTarget.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 100%) ${bgColor}`
        e.currentTarget.style.color = 'white'
    }

    function hoverOut(e) {
        e.currentTarget.style.color = '#1e1e1e'
        e.currentTarget.style.background = getComputedStyle(e.currentTarget).backgroundColor
    }

    function createNewBoard() {
        newBoardForm === [profileStyles.newBoardFormContainer, commonStyles.blockIHidden].join(' ')
            ? setNewBoardForm([profileStyles.newBoardFormContainer].join(' '))
            : setNewBoardForm([profileStyles.newBoardFormContainer, commonStyles.blockIHidden].join(' '))
    }

    const onChangeNewBoard = e => {
        setNewBoard({...newBoard, [e.target.name]: e.target.value})
    }

    const onSubmitNewBoard = e => {
        e.preventDefault()
        addItem(db,
            'trello',
            'Boards',
            'boards',
            fireBaseConverter(new BoardDoc(
                Date.parse(nowDate),
                currentUser.id,
                newBoard.name,
                newBoard.background,
                newBoard.textColor,
                newBoard.name + Date.parse(nowDate)
            ))
        ).then(res => console.log(res))
        setUserBoards([...userBoards, fireBaseConverter(new BoardDoc(
            'board' + Date.parse(nowDate),
            currentUser.id,
            newBoard.name,
            newBoard.background,
            newBoard.textColor,
            newBoard.name + Date.parse(nowDate)
        ))])
        setNewBoardForm([profileStyles.newBoardFormContainer, commonStyles.blockIHidden].join(' '))
    }

    return (
        <div className={profileStyles.profile}>
            <div className={profileStyles.profileContainer}>
                <div className={profileStyles.newBoardBtnContainer}>
                    <button className={profileStyles.newBoardButton} onClick={() => createNewBoard()}>
                        <span style={{marginRight: '10px'}}>+</span> <span> new board</span>
                    </button>
                    <div className={newBoardForm} onClick={() => createNewBoard()}>
                        <NewBoardForm
                            newBoard={newBoard}
                            onSubmitNewBoard={onSubmitNewBoard}
                            onChangeNewBoard={onChangeNewBoard}
                        />
                    </div>
                </div>
                {userBoards.length
                    ? userBoards.map(b => (
                        <Link key={b.boardId} to={"/board/" + b.url + '/'} className={profileStyles.userBoardLink}
                              onMouseOver={e => hoverIn(e)} onMouseOut={e => hoverOut(e)}
                              style={{backgroundColor: b.background}}>{b.name}</Link>
                    ))
                    : ''
                }
            </div>
        </div>
    );
};

export default Profile;
