import {useEffect} from 'react'
import {getRedirectResult} from 'firebase/auth'
import Button from '../../components/button/button.component';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import { 
    auth,
    signInWithGooglePopUp, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect } from "../utils/firebase/firebase.utils";


const SignIn = () =>{

    const logGoogleUser = async () =>{
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    


    return (
        <div>
            <h1>SIGN IN </h1>
            <Button onClick={ logGoogleUser } buttonType='google'>Sign in with google pop up </Button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;