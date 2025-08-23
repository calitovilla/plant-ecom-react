import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const SignIn = () => {

    const handleSignIn = async () => {
        try {

            // Destructure user from the response
            // signInWithGooglePopup returns a UserCredential, 
            // but we need the User object, destructure with {}
            const { user } = await signInWithGooglePopup();

            const userDocRef = await createUserDocumentFromAuth(user);

            console.log(user);
            // Handle successful sign-in here (e.g., redirect or show a message)
        } catch (error) {
            console.error("Error signing in with Google:", error);
            // Handle sign-in error here (e.g., show an error message)
        }
    };

  return (
    <div>
      <h2>Sign In</h2>
        <button onClick={handleSignIn}>
            Sign in with Google
        </button>
    </div>
  );
};

export default SignIn;