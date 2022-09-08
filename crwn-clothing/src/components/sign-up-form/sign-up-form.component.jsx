import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../routes/utils/firebase/firebase.utils";
import  FormInput from "../form-input/form-input.componet";
import Button from "../button/button.component";
import "./sign-up-form.style.scss"

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFiled] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formFields;

    const handelChange = (event)=>{
        const {name, value } = event.target;
        setFormFiled({...formFields, [name]: value})
    };

    const resetFormFields = () =>{
        setFormFiled(defaultFormField);
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
    
        if(password !== confirmPassword){
            alert('password not much')
            return;
        }
        try{
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, { displayName });
        
        resetFormFields();
        }
        catch(error){
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
              } else {
                console.log('user creation encountered an error', error);
              }
        }

    }

    return (
        <div className = "sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with you email and password</span>
            <form onSubmit={handelSubmit}>
                <FormInput
                    label = "Display Name"
                    inputOptions={{
                        type : 'text',
                        required: true,
                        onChange: handelChange ,
                        name: 'displayName',
                        value: displayName,
                    }}
                ></FormInput>

                <FormInput
                    label = "Email"
                    inputOptions={{
                        type : 'email',
                        required: true,
                        onChange: handelChange ,
                        name: 'email',
                        value: email,
                    }}
                ></FormInput>

                <FormInput
                    label = "Password"
                    inputOptions={{
                        type : 'password',
                        required: true,
                        onChange: handelChange ,
                        name: 'password',
                        value: password,
                    }}
                ></FormInput>

                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        type : 'password',
                        required: true,
                        onChange: handelChange ,
                        name: 'confirmPassword',
                        value: confirmPassword,
                    }}>
                </FormInput>
                
                <div className="button-containers">
                    <Button type="submit" >Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;