import { useState, useContext } from 'react';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from '../../contexts/user.context';
import type { SignInFormFields } from "../../interfaces";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const SignInForm = () => {

    const defaultFormFields: SignInFormFields = {
        email: '',
        password: '',
    };

    const [formFields, setFormFields] = useState<SignInFormFields>(defaultFormFields);
    const { email, password } = formFields; 
    // Destructure form fields, with this we can link the input values because we can use the same names as the state properties
    // so <input name='displayName' value={displayName} onChange={handleChange} />
    // and when we clear the form, the input values will be reset to the default values

    const { setCurrentUser } = useContext(UserContext);

    const clearFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        //{ [name]: value }
        // This is called a computed property.
        // It means: use the value of the variable name as the object key.
        // The object is expanded with... and the corresponding field is overwritten with the computed property.
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission, don't do reload
        event.preventDefault();

        try{
            const user = await signInAuthUserWithEmailAndPassword(email, password);

            if (!user) return;

            await createUserDocumentFromAuth(user);

            clearFormFields();

            setCurrentUser(user);

        } catch (error) {
            console.error("Error signing in with email and password:", error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {

            // Destructure user from the response
            // signInWithGooglePopup returns a UserCredential, 
            // but we need the User object, destructure with {}
            const { user } = await signInWithGooglePopup();

            const userDocRef = await createUserDocumentFromAuth(user);

            setCurrentUser(user);
            
            console.log(user);
            // Handle successful sign-in here (e.g., redirect or show a message)
        } catch (error) {
            console.error("Error signing in with Google:", error);
            // Handle sign-in error here (e.g., show an error message)
        }
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" name='email' value={email} type="email" onChange={handleChange} required  />
                <FormInput label="Password" name='password' value={password} type="password" minLength={6} maxLength={25} onChange={handleChange} required  />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={'google'} onClick={handleGoogleSignIn}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
