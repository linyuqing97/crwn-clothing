
import SignInForm from '../../components/sign-in-form/sign-in.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { AuthenticationContainer } from './authentication.style';


const SignIn = () =>{

    // const logGoogleUser = async () =>{
    //     const { user } = await signInWithGooglePopUp();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }

    return (
       <AuthenticationContainer>
            <SignInForm/>
            <SignUpForm/>
        </AuthenticationContainer>
    )
}

export default SignIn;