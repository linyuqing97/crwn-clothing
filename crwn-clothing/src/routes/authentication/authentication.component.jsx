
import SignInForm from '../../components/sign-in-form/sign-in.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import './authentication.style.scss';
import { 
    signInWithGooglePopUp, 
    createUserDocumentFromAuth, } from "../utils/firebase/firebase.utils";


const SignIn = () =>{

    const logGoogleUser = async () =>{
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;