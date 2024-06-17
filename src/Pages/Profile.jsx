import React, {useEffect, useState} from 'react';
import profileStyles from '../assets/styles/profile.module.sass'
import {addItem, db, querySnapshot} from "../service/TrelloFirebaseConnection";
import board from "./Board";
import {Link} from "react-router-dom";
import {BoardDoc, fireBaseConverter} from "../service/DataInterface";
import {logDOM} from "@testing-library/react";

const Profile = () => {

    const [currentUser, setCurrentUser] = useState({})
    const [userBoards, setUserBoards] = useState([])

    function getuserBoards() {
        if (querySnapshot.docs[0].data()) {
            const {boards} = querySnapshot.docs[0].data()
            boards.filter(b => b.userId === currentUser.id).length
                ? setUserBoards(boards.filter(b => b.userId === currentUser.id))
                : setUserBoards([])
        }

    }

    useEffect(() => {
        if (localStorage.loggedUser) {
            setCurrentUser(JSON.parse(localStorage.loggedUser))
        }
        getuserBoards()
    }, []);

    function hoverIn(e) {
        console.log(getComputedStyle(e.currentTarget).background)
    }

    function hoverOut(e) {
        console.log(getComputedStyle(e.currentTarget).background)
    }

    //linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.7) 100%)

    // console.log(userBoards)
    // console.log(currentUser)

    function createNewBoard() {
        let newBoard = new BoardDoc(
            Date.parse(new Date()),
            currentUser.id,
            'Unnamed',
            '#FFFFFF',
            'unnamed' + Date.parse(new Date())
        )
        addItem(db,
            'trello',
            'Boards',
            'boards',
            fireBaseConverter(newBoard)
        ).then(res => console.log(res))
        getuserBoards()
    }

    return (
        <div className={profileStyles.profile}>
            <div className={profileStyles.profileContainer}>
                <button className={profileStyles.newBoardButton} onClick={() => createNewBoard()}>
                    <span style={{marginRight: '10px'}}>+</span> <span> new board</span>
                </button>
                {userBoards.length
                    ?userBoards.map(b => (
                        <Link key={b.id} to={"/board/" + b.url + '/'} className={profileStyles.userBoardLink}
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
