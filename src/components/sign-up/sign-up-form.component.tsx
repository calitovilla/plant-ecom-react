import { useState, useContext } from 'react';
import type { SignUpFormFields } from '../../interfaces';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

import './sign-up-form.styles.scss';

const SignUpForm = () => {

    const defaultFormFields: SignUpFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formFields, setFormFields] = useState<SignUpFormFields>(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; 
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

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try{
            const user = await createAuthUserWithEmailAndPassword(email, password);

            if (!user) return;
            await createUserDocumentFromAuth(user, { displayName });

            clearFormFields();

            setCurrentUser(user);
        } catch (error) {
            console.error("Error creating user", error);
        }
    }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" placeholder="Display Name" name='displayName' value={displayName} minLength={4} maxLength={25} onChange={handleChange} required />
        <FormInput label="Email" type="email" placeholder="Email" name='email' value={email} onChange={handleChange} required />
        <FormInput label="Password" type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength={6} maxLength={25} required />
        <FormInput label="Confirm Password" type="password" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={handleChange} minLength={6} maxLength={25} required />
        <div className="buttons-container">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
