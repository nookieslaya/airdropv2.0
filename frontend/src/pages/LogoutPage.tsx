import {useEffect} from "react";
import authStore from "../stores/authStore.ts";
export const LogoutPage = () => {
    const store = authStore()
    useEffect(()=>{
        store.logout()
    })
    return (
        <div>

            <h2>You have been loged out</h2>

        </div>
    );
};
