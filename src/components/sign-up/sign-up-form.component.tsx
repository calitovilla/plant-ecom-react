import { useState } from 'react';
import type { SignUpFormFields } from '../../interfaces';

const SignUpForm = () => {

    const defaultFormFields: SignUpFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formFields, setFormFields] = useState<SignUpFormFields>(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        //{ [name]: value }
        // This is called a computed property.
        // It means: use the value of the variable name as the object key.
        // The object is expanded with... and the corresponding field is overwritten with the computed property.
        setFormFields({ ...formFields, [name]: value });
    };

  return (
    <div>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={() => {}}>
        <input type="text" placeholder="Display Name" name='displayName' value={displayName} required />
        <input type="email" placeholder="Email" name='email' value={email} required />
        <input type="password" placeholder="Password" name='password' value={password} required />
        <input type="password" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
