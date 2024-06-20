import React from 'react';
import mainStyles from '../assets/styles/main.module.sass'
import MainImg from '../assets/images/mainImg.png'

const Main = () => {
    return (
        <main className={mainStyles.main}>
            <div className={mainStyles.main__imageWrapper}>
                <img className={mainStyles.main__img} src={MainImg} alt="image"/>
            </div>
            <h1 className={mainStyles.main__heading}>Master the chaos</h1>
            <h4 className={mainStyles.main__subheading}>get inspired, create, explore</h4>
        </main>
    );
};

export default Main;
