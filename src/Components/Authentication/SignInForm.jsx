import React from 'react';
import authStyle from "../../assets/styles/auth.module.sass";

const SignInForm = ({authCardAndForms, onSingInSubmit, onSingInChange}) => {
    return (
        <div className={authCardAndForms.signInForm}>
            <div className={authStyle.cards__heading}>Sign In</div>
            <form onSubmit={e => onSingInSubmit(e)} className={authStyle.cards__form}>
                <div className={authStyle.cards__inputContainer}>
                    <input
                        type="email"
                        placeholder='Email'
                        required={true}
                        name="email"
                        id="signInEmail"
                        onChange={e => onSingInChange(e)}
                        className={authStyle.cards__input}
                    />
                </div>
                <div className={authStyle.cards__inputContainer}>
                    <input
                        type="password"
                        placeholder='Password'
                        required={true}
                        name="password"
                        id="signInPassword"
                        onChange={e => onSingInChange(e)}
                        className={authStyle.cards__input}
                    />
                </div>
                <button className={authStyle.cards__button} style={{marginTop: '20px'}}>Sign up</button>
            </form>
        </div>
    );
};

export default SignInForm;
