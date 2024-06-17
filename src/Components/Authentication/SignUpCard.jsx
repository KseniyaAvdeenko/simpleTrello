import React from 'react';
import authStyles from "../../assets/styles/auth.module.sass";

const SignUpCard = ({authCardAndForms, showAuthForm}) => {
    return (
        <div className={authCardAndForms.signUpCard}>
            <div className={authStyles.cards__heading}>Haven’t got any account yet??</div>
            <button className={authStyles.cards__button} onClick={()=>showAuthForm('signUp')}>Sign up</button>
        </div>
    );
};

export default SignUpCard;
