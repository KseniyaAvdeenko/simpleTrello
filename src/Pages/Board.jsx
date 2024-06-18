import React from 'react';
import {useParams} from "react-router-dom";
import boardStyles from'../assets/styles/board.module.sass'

const Board = () => {
    let link = useParams()
    console.log(link.url)
    return (
        <div>
            board
        </div>
    );
};

export default Board;
