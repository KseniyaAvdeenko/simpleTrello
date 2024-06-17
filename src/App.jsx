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
import {fireBaseConverter, UserDoc} from "./service/DataInterface";


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
    let id = Date.parse(new Date())

    useEffect( () => {
        const {users} = querySnapshot.docs[3].data()
        setAllUsers(users)
    }, [querySnapshot])

    console.log(allUsers)
    const onSingUpSubmit = (e) => {
        e.preventDefault()

        //showAuthForm('signIn')
        if(allUsers.length){
            if(allUsers.filter(u=> u.email === signUpUser.email).length){
                setSignUpErrors('User with')
            }else{

            }

        }else{
            let newUser = signUpUser
            newUser['id'] = id
            addItem(db, 'trello', 'Users', 'users', newUser).then(res=>console.log(res))
        }
        console.log(signUpUser)
    }

    const onSingInChange = (e) => {
        setSignInUser({...signInUser, [e.target.name]: e.target.value})
    }

    const onSingInSubmit = (e) => {
        e.preventDefault()

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
                        onSingUpChange={onSingUpChange}
                        onSingUpSubmit={onSingUpSubmit}
                        onSingInChange={onSingInChange}
                        onSingInSubmit={onSingInSubmit}
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
