import React, {useState} from 'react';
import authStyle from '../../assets/styles/auth.module.sass'
import OpenedEye from '../../assets/images/eyeOpened.svg'
import ClosedEye from '../../assets/images/eyeClosed.svg'



const SignUpForm = ({authCardAndForms, onSingUpChange, onSingUpSubmit, signUpErrors}) => {
    const [passwordVisibility, setPasswordVisibility] = useState({type: 'password', image: ClosedEye})

    function togglePasswordVisibility() {
        passwordVisibility.type === 'text'
            ?setPasswordVisibility({...passwordVisibility, type: 'password', image: ClosedEye })
            :setPasswordVisibility({...passwordVisibility, type: 'text', image: OpenedEye })
    }

    return (
        <div className={authCardAndForms.signUpForm}>
            <div className={authStyle.cards__heading}>Sign Up</div>

            <div className={authStyle.errors}>{signUpErrors}</div>
            <form onSubmit={e => onSingUpSubmit(e)} className={authStyle.cards__form}>
                <div className={authStyle.cards__inputContainer}>
                    <input
                        type="text"
                        placeholder='Login'
                        required={true}
                        name="login"
                        id="signUpLogin"
                        onChange={e => onSingUpChange(e)}
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
                        onChange={e => onSingUpChange(e)}
                        className={authStyle.cards__input}
                    />
                </div>
                <div className={authStyle.cards__inputContainer}>
                    <input
                        type={passwordVisibility.type}
                        placeholder='Password'
                        required={true}
                        name="password"
                        id="signUpPassword"
                        onChange={e => onSingUpChange(e)}
                        className={authStyle.cards__input}
                    />
                    <div className={authStyle.passwordWatcher}>
                        <img onClick={() => togglePasswordVisibility()} src={passwordVisibility.image} alt="eye"/>
                    </div>
                </div>
                <button className={authStyle.cards__button} style={{marginTop: '20px'}}>Sign up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
