import {toast} from "@/components/ui/use-toast.ts";
import {create} from "zustand";
import axios from "axios";

type DailyTask = {
    _id: string;
    name: string;
    url: string;
    description: string;
};

type CreateDaily = {
    name: string;
    url: string;
    description: string;
};

type UpdateForm = {
    _id: string | null;
    name: string;
    url: string;
    description: string;
};

type DailyStoreState = {
    dailyTask: DailyTask[] | null;
    createDaily: CreateDaily;
    updateForm: UpdateForm;
    setCreateDaily: (value: Partial<CreateDaily>) => void;
    updateDailyTask: (e: React.FormEvent) => Promise<void>;
    createSingleDailyTask: (e: React.FormEvent) => Promise<void>;
};

const useDailyStore = create<DailyStoreState>((set) => ({
    dailyTask: null,
    createDaily: { name: "", url: "", description: "" },
    updateForm: { _id: null, name: "", url: "", description: "" },
    setCreateDaily: (value: Partial<CreateDaily>) => {
        set((state) => ({
            createDaily: {
                ...state.createDaily,
                ...value,
            },
        }));
    },
    updateDailyTask: async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const { updateForm: { _id, name, url, description }, dailyTask } = useDailyStore.getState();
            const res = await axios.put(`daily/${_id}`, { name, url, description });

            const newDailyTask = dailyTask ? [...dailyTask] : [];
            const dailyTaskIndex = newDailyTask.findIndex((task) => task._id === _id);
            if (dailyTaskIndex !== -1) {
                newDailyTask[dailyTaskIndex] = res.data.daily;
            }

            useDailyStore.setState({ dailyTask: newDailyTask, updateForm: { name: "", url: "", _id: null, description: "" } });

            toast({
                description: "Task Updated",
            });
        } catch (err) {
            console.log(err);
        }
    },
    createSingleDailyTask: async (e: React.FormEvent) => {
        e.preventDefault();

        const { createDaily, dailyTask } = useDailyStore.getState();
        // Check if the fields are not empty
        if (!createDaily.name || !createDaily.url) {
            toast({
                description: "Fill all inputs.",
            });
            return;
        }
        const res = await axios.post('/daily', createDaily);
        const newDailyTask = dailyTask ? [...dailyTask, res.data.daily] : [res.data.daily];
        useDailyStore.setState({
            dailyTask: newDailyTask,
            createDaily: { name: "", url: "", description: "" },
        });
        toast({
            description: "You create new Daily.",
        });
    },
}));

export default useDailyStore