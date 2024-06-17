import React, {useState} from 'react';
import authStyle from "../../assets/styles/auth.module.sass";
import {useAuth} from "../../hooks/useAuth";
import authStyles from "../../assets/styles/auth.module.sass";
import commonStyles from "../../assets/styles/common.module.sass";
import OpenedEye from '../../assets/images/eyeOpened.svg'
import ClosedEye from '../../assets/images/eyeClosed.svg'
import {useNavigate} from "react-router-dom";


const SignInForm = ({authCardAndForms, onSingInChange, allUsers, signInUser, setAuthModal}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [signInErrors, setSignInErrors] = useState('')
    const [passwordWatcher, setPasswordWatcher] = useState({type: 'password', image: ClosedEye})
    const onSingInSubmit = (e) => {
        e.preventDefault()
        if (allUsers.length) {
            if (allUsers.filter(u => u.email === signInUser.email && u.password === signInUser.password).length) {
                let [loggedInUser] = allUsers.filter(u => u.email === signInUser.email)
                auth.logIn(loggedInUser);
                setSignInErrors('')
                setAuthModal([authStyles.auth__modal, authStyles.authModalLightMode, commonStyles.blockIHidden].join(' '))
                e.target.reset()
                navigate('/profile/')
            } else {
                setSignInErrors('Your email (or password) is not correct')
            }
        } else {
            setSignInErrors('User with this email is not existed yet')
        }
    }


    return (
        <div className={authCardAndForms.signInForm}>
            <div className={authStyle.cards__heading}>Sign In</div>
            <div className={authStyle.errors}>{signInErrors}</div>
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
                        type={passwordWatcher.type}
                        placeholder='Password'
                        required={true}
                        name="password"
                        id="signInPassword"
                        onChange={e => onSingInChange(e)}
                        className={authStyle.cards__input}
                    />
                     <div className={authStyle.passwordWatcher}>
                        <img onClick={() => passwordWatcher.type === 'text' ? setPasswordWatcher({type: 'password', image: ClosedEye}) : setPasswordWatcher({type: 'text', image: OpenedEye})} src={passwordWatcher.image} alt="eye"/>
                    </div>
                </div>
                <button className={authStyle.cards__button} style={{marginTop: '20px'}}>Sign in</button>
            </form>
        </div>
    );
};

export default SignInForm;
