import React from 'react';
import authStyles from '../../assets/styles/auth.module.sass'

const SignInCard = ({authCardAndForms, showAuthForm}) => {
    return (
        <div className={authCardAndForms.signInCard}>
            <div className={authStyles.cards__heading}>Welcome back to simpleTrello ??</div>
            <button className={authStyles.cards__button} onClick={()=>showAuthForm('signIn')}>Sign in</button>
        </div>
    );
};

export default SignInCard;
