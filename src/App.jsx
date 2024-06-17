import styles from './App.module.sass';
import commonStyles from './assets/styles/common.module.sass'
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header";
import {AuthProvider} from "./hooks/AuthProvider";
import AppRouter from "./Components/Approuter";
import Footer from "./Components/Footer";
import Authentication from "./Components/Authentication/Authentication";
import authStyles from './assets/styles/auth.module.sass'
import {useEffect, useState} from "react";
import {addItem, querySnapshot, db} from "./service/TrelloFirebaseConnection";



function App() {
    const [authModal, setAuthModal] = useState([authStyles.auth__modal, authStyles.authModalLightMode, commonStyles.blockIHidden].join(' '))
    const [authCardAndForms, setAuthCardAndForms] = useState({
        button: 'signUp',
        signUpCard: [authStyles.signUpCard, commonStyles.blockIHidden].join(' '),
        signUpForm: [authStyles.signUpForm].join(' '),
        signInCard: [authStyles.signInCard].join(' '),
        signInForm: [authStyles.signInForm, commonStyles.blockIHidden].join(' '),
    })
    const [signUpUser, setSignUpUser] = useState({login: '', email: '', password: ''})
    const [signInUser, setSignInUser] = useState({email: '', password: ''})
    const [allUsers, setAllUsers] = useState([])

    const [signUpErrors, setSignUpErrors] = useState('')
    const onSingUpChange = (e) => {
        setSignUpUser({...signUpUser, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const {users} = querySnapshot.docs[3].data()
        setAllUsers(users)
    }, [])

    const onSingUpSubmit = (e) => {
        e.preventDefault()
        let newUser = signUpUser
        newUser['id'] = Date.parse(new Date())
        if (allUsers.length) {
            if (allUsers.filter(u => u.email === signUpUser.email).length) {
                setSignUpErrors('User with this email is already existed')
            } else {
                addItem(db, 'trello', 'Users', 'users', newUser).then(res => console.log(res))
                showAuthForm('signIn')
                setSignUpErrors('')
                 e.target.reset()
            }
        } else {
            addItem(db, 'trello', 'Users', 'users', newUser).then(res => console.log(res))
            showAuthForm('signIn')
            setSignUpErrors('')
            e.target.reset()
        }
    }

    const onSingInChange = (e) => {
        setSignInUser({...signInUser, [e.target.name]: e.target.value})
    }

    function showAuthForm(value) {
        if (value === 'signUp') {
            setAuthCardAndForms({
                ...authCardAndForms,
                button: value,
                signUpCard: [authStyles.signUpCard, commonStyles.blockIHidden].join(' '),
                signUpForm: [authStyles.signUpForm].join(' '),
                signInCard: [authStyles.signInCard].join(' '),
                signInForm: [authStyles.signInForm, commonStyles.blockIHidden].join(' '),
            })
        } else if (value === 'signIn') {
            setAuthCardAndForms({
                ...authCardAndForms,
                button: value,
                signUpCard: [authStyles.signUpCard].join(' '),
                signUpForm: [authStyles.signUpForm, commonStyles.blockIHidden].join(' '),
                signInCard: [authStyles.signInCard, commonStyles.blockIHidden].join(' '),
                signInForm: [authStyles.signInForm].join(' '),
            })
        }
    }

    function showAuthModal(value) {
        setAuthModal([authStyles.auth__modal, authStyles.authModalLightMode].join(' '))
        showAuthForm(value)
    }


    return (
        <AuthProvider>
            <BrowserRouter>
                <div className={styles.app}>
                    <Authentication
                        setAuthModal={setAuthModal}
                        authModal={authModal}
                        authCardAndForms={authCardAndForms}
                        allUsers={allUsers}
                        signInUser={signInUser}
                        onSingUpChange={onSingUpChange}
                        onSingUpSubmit={onSingUpSubmit}
                        onSingInChange={onSingInChange}
                        showAuthForm={showAuthForm}
                        signUpErrors={signUpErrors}
                    />
                    <Header showAuthModal={showAuthModal}/>
                    <AppRouter/>
                    <Footer/>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
