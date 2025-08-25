import { useState } from 'react';
import type { SignUpFormFields } from '../../interfaces';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
        } catch (error) {
            console.error("Error creating user", error);
        }
    }

  return (
    <div>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Display Name" name='displayName' value={displayName} minLength={4} maxLength={25} onChange={handleChange} required />
        <input type="email" placeholder="Email" name='email' value={email} onChange={handleChange} required />
        <input type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength={6} maxLength={25} required />
        <input type="password" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={handleChange} minLength={6} maxLength={25} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
