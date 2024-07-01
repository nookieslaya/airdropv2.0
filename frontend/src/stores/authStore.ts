import {create, SetState} from 'zustand'
import axios from "axios";



interface AuthStore {
    loggedIn: boolean | null
    loginForm: {
        email: string
        password: string
    }
    signupForm: {
        email: string
        password: string
        name: string
    }
    login: () => void
    signup: () => void
    updateLoginForm: (e : any) => void
    updateSignupForm: (e : any) => void
}

const authStore = create((set : SetState<AuthStore>) => ({
    loggedIn: null,


    loginForm:{
        email: "",
        password: ""
    },

    signupForm:{
        email: "",
        password: "",
        name: ""
    },

    updateLoginForm: (e : any) => {
        const {name, value} = e.target
        set((state) => ({
            loginForm: {
                ...state.loginForm,
                [name]: value
            }
        }))
    },
    updateSignupForm: (e) => {
        const {name, value} = e.target
        set((state) => {
            return {
                signupForm: {
                    ...state.signupForm,
                    [name]: value
                }
            }
        })
    },
    login: async () => {
        try {
            const {loginForm} = authStore.getState()
            const res : any = await axios.post('/login', loginForm )
            console.log(res.data)
            set({signupForm: {email: "", password: "", name: ""}})
            set({loggedIn: true})
        }catch (e) {

        }
    },
    signup: async () => {
        console.log('Signup initiated');

        const {signupForm} = authStore.getState();
        console.log('signupForm', signupForm);

        try {
            const res = await axios.post('/signup', signupForm );
            console.log(res.data)
           set({signupForm: {email: "", password: "", name: ""}})
        } catch (e) {

        }
    },
    checkAuth: async () => {
        try {
            await axios.get("/check-auth" )
            set({loggedIn: true})
        } catch (e) {
            set({loggedIn: false})
            console.log(e)
        }

    },
    logout: async () => {
        try {
            await axios.get("/logout" )
            set({loggedIn: false})

        } catch (e) {
            console.log(e)
        }
    }


}))

export default authStore