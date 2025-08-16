import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';


const SignIn = () => {

    const handleSignIn = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log(response);
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