import React from 'react';
import authStyle from '../../assets/styles/auth.module.sass'

const SignUpForm = ({authCardAndForms, onSingUpChange, onSingUpSubmit, signUpErrors}) => {
    return (
       <div className={authCardAndForms.signUpForm}>
           <div className={authStyle.cards__heading}>Sign Up</div>

           <div className="errors mb_20">{signUpErrors}</div>
           <form onSubmit={e=>onSingUpSubmit(e)} className={authStyle.cards__form}>
               <div className={authStyle.cards__inputContainer}>
                   <input
                       type="text"
                       placeholder='Login'
                       required={true}
                       name="login"
                       id="signUpLogin"
                       onChange={e=>onSingUpChange(e)}
                       className={authStyle.cards__input}
                   />
               </div>
               <div className={authStyle.cards__inputContainer}>
                   <input
                       type="email"
                       placeholder='Email'
                       required={true}
                       name="email"
                       id="signUpEmail"
                       onChange={e=>onSingUpChange(e)}
                       className={authStyle.cards__input}
                   />
               </div>
               <div className={authStyle.cards__inputContainer}>
                   <input
                       type="password"
                       placeholder='Password'
                       required={true}
                       name="password"
                       id="signUpPassword"
                       onChange={e=>onSingUpChange(e)}
                       className={authStyle.cards__input}
                   />
               </div>
               <button className={authStyle.cards__button} style={{marginTop: '20px'}}>Sign up</button>
           </form>
       </div>
    );
};

export default SignUpForm;
