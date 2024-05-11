import {create} from "zustand";
import axios from "axios";
import {toast} from "@/components/ui/use-toast.ts";


const reminderStore = create((set) => ({
    reminders: null,
    createReminder: {name: "", url: "", date: "", description: "", color: "", complete: false},
    updateForm: {_id: null, name: "", url: "", date: "", description: "", color: "", complete: false},
    fetchReminders: async () => {
        try {
            const res = await axios.get('/reminders')
            set({
                reminders: res.data.reminders
            })
        } catch (err) {
            console.log(err)
        }
    },
}))

export default reminderStore