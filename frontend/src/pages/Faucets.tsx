import {useEffect, useState} from "react";
import faucetsStore from '../stores/faucetsStore.ts'
import { FaTrash } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {Link} from "react-router-dom";
import {CreateFaucet} from "@/components/faucets/CreateFaucet.tsx";
import {UpdateFaucet} from "@/components/faucets/UpdateFaucet.tsx";

function Faucets() {
    const store = faucetsStore()


    useEffect(() => {
        store.fetchFaucets()
    }, []);



    return (
        <div className="Faucets">
            <Table className="max-w-[800px]">
                <TableHeader>
                    <TableHead>
                        <h1>Faucets</h1>
                    </TableHead>
                </TableHeader>
                {store.faucets && store.faucets.map((faucet) => {
                    return (
                        <TableBody>
                            <TableRow className="flex justify-between container items-center" key={faucet._id}>
                                <TableCell className="flex">
                                    <Link to={faucet.url} target="_blank">
                                        <span className="font-bold"> {faucet.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span className="text-primary/30">{faucet.url}</span>
                                </TableCell>

                                <div className="space-x-4">
                                    <button
                                        onClick={() => store.deleteFaucets(faucet._id)}><FaTrash />
                                    </button>
                                    <UpdateFaucet  faucet={faucet} />
                                </div>
                            </TableRow>
                        </TableBody>
                    )
                })}
                <div className="flex justify-end py-4">
                  <CreateFaucet store={store}/>
                </div>
            </Table>
        </div>
    );
}

export default Faucets;
