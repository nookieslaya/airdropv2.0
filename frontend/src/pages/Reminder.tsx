import reminderStore from "../stores/reminderStore";
import {useEffect} from "react";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import Countdown from "@/components/reminder/Countdown.tsx";
const Reminder = () => {

    const store = reminderStore()
    useEffect(() => {
        store.fetchReminders()
    })
    return (
        <div>
            {store.reminders && store.reminders.map((reminder) => {
                return (
                    <Card>
                        <CardContent className="p-0">
                            <div key={reminder.id} className={`bg-${reminder.color}`}>
                                <CardTitle>
                                    <p>{reminder.name}</p>
                                </CardTitle>

                                    <p>{reminder.date}</p>
                                    <p><Countdown date={reminder.date} /> </p>
                                    <p>{reminder.description}</p>
                                    <p>{reminder.color}</p>
                                    <p>{reminder.url}</p>
                                    <p>{reminder.complete}</p>

                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};

export default Reminder