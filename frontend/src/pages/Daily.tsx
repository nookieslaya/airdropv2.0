import {useEffect} from "react";
import dailyStore from "@/stores/dailyStore.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa6";
import {CreateDailyTasks} from "@/components/dailyTasks/CreateDailyTasks.tsx";
import {UpdateDailyTasks} from "@/components/dailyTasks/UpdateDailyTasks.tsx";
import CopyButton from "@/components/CopyButton.tsx";

const Daily = () => {
    const store = dailyStore()

    useEffect(() => {
        store.fetchDaily()
    }, []);

    return (
        <div>
            <Table className="max-w-[800px]">
                <TableHeader>
                    <TableHead>
                        <h1>Daily Tasks</h1>
                    </TableHead>
                </TableHeader>
                {store.dailyTask && store.dailyTask.map((daily) => {
                    return (
                        <TableBody>
                            <TableRow className="flex justify-between container items-center" key={daily._id}>
                                <TableCell className="flex">
                                    <Link to={daily.url} target="_blank">
                                        <span className="font-bold"> {daily.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="flex flex-row">
                                    <span className="text-primary/30">{daily.url}</span>

                                </TableCell>
                                <TableCell>
                                    <span className="text-primary/30">{daily.description}</span>
                                </TableCell>

                                <div className="space-x-4">
                                    <button
                                        onClick={() =>
                                            store.deleteTasks(daily._id)}><FaTrash/>
                                    </button>
                                    <UpdateDailyTasks daily={daily}/>
                                </div>
                            </TableRow>
                        </TableBody>
                    )
                })}
                <div className="flex justify-end py-4">
                    <CreateDailyTasks store={store}/>
                </div>
            </Table>
        </div>
    );
};

export default Daily;