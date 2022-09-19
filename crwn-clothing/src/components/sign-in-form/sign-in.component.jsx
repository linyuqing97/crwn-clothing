import { useState } from "react";
import FormInput from "../form-input/form-input.componet";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import "./sign-in.style.scss";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopUp} from "../../routes/utils/firebase/firebase.utils";

const defaultFormField = {
    email : '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await signInAuthUserWithEmailAndPassword(
            email,
            password
          );
          resetFormFields();
        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
        }
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    
      return (
        <div className='sign-up-container'>
          <h2>Already have an account?</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput
              label='Email'
              inputOptions={{
                type: 'email',
                required: true,
                name: 'email',
                value: email,
                onChange: handleChange,
              }}
            />
    
            <FormInput
              label='Password'
              inputOptions={{
                type: 'password',
                required: true,
                onChange: handleChange,
                name: 'password',
                value: password,
              }}
              />
            
            <div className='buttons-container'>
              <Button type='submit'>Sign In</Button>
              <Button buttonType={BUTTON_TYPE_CLASSES.google}
                      type='button'
                      onClick={signInWithGoogle}>
                Google sign in
              </Button>
            </div>
          </form>
        </div>
      );
    };
    
    export default SignInForm;