import React from 'react';
import authStyles from '../../assets/styles/auth.module.sass'
import SignUpForm from "./SignUpForm";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";
import SignInForm from "./SignInForm";
import commonStyles from "../../assets/styles/common.module.sass";

const Authentication = ({
                            authModal,
                            setAuthModal,
                            authCardAndForms,
                            onSingInChange,
                            onSingUpChange,
                            onSingUpSubmit,
                            showAuthForm,
                            signUpErrors,
                            allUsers,
                            signInUser,
                        }) => {
    return (
        <div
            onClick={() => setAuthModal([authStyles.auth__modal, authStyles.authModalLightMode, commonStyles.blockIHidden].join(' '))}
            className={authModal}>
            <div onClick={(e) => e.stopPropagation()}
                 className={[authStyles.auth__container, authStyles.authContainerLightMode].join(' ')}>
                <SignUpForm
                    authCardAndForms={authCardAndForms}
                    onSingUpChange={onSingUpChange}
                    onSingUpSubmit={onSingUpSubmit}
                    signUpErrors={signUpErrors}
                />
                <SignInCard
                    showAuthForm={showAuthForm}
                    authCardAndForms={authCardAndForms}/>

                <SignUpCard
                    showAuthForm={showAuthForm}
                    authCardAndForms={authCardAndForms}/>
                <SignInForm
                    onSingInChange={onSingInChange}
                    authCardAndForms={authCardAndForms}
                    allUsers={allUsers}
                    setAuthModal={setAuthModal}
                    signInUser={signInUser}
                />
            </div>
        </div>
    );
};

export default Authentication;
