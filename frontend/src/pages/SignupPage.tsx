import authStore from "@/stores/authStore.ts";
import {useNavigate} from "react-router-dom";

export const SignupPage = () => {
    const store = authStore();
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        await store.signup();

        navigate("/login");

    };
    return (
        <>
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSignup}>
                    <input onChange={store.updateSignupForm} value={store.signupForm.email} className="border"
                           type="email" name="email"/>
                    <input onChange={store.updateSignupForm}
                           value={store.signupForm.name} className="border"
                           type="text" name="name"/>
                    <input onChange={store.updateSignupForm} value={store.signupForm.password} className="border"
                           type="password" name="password"/>
                    <button type="Submit">Register</button>
                </form>
            </div>
        </>
    );
};
