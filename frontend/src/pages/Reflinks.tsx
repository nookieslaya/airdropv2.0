import {useEffect, useState} from "react";
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
import {UpdateReflinks} from "@/components/reflinks/UpdateReflinks.tsx";
import CopyButton from "@/components/CopyButton.tsx";
import reflinksStore from "../stores/reflinksStore.ts";
import {CreateReflinks} from "@/components/reflinks/CreateReflinks.tsx";

function Reflinks() {
    const store = reflinksStore()


    useEffect(() => {
        store.fetchReflinks()
    }, []);



    return (
        <div className="reflinks">
            <Table className="max-w-[800px]">
                <TableHeader>
                    <TableHead>
                        <h1>Reflinks</h1>
                    </TableHead>
                </TableHeader>
                {store.reflinks && store.reflinks.map((reflink) => {
                    return (
                        <TableBody>
                            <TableRow className="flex justify-between container items-center" key={reflink._id}>
                                <TableCell className="flex">
                                    <Link to={reflink.url} target="_blank">
                                        <span className="font-bold"> {reflink.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="flex">
                                    <span className="text-primary/30">{reflink.url}</span>
                                    <CopyButton url={reflink.url}/>
                                </TableCell>

                                <div className="space-x-4">
                                    <button
                                        onClick={() => store.deleteReflinks(reflink._id)}><FaTrash />
                                    </button>
                                    <UpdateReflinks  reflink={reflink} />
                                </div>
                            </TableRow>
                        </TableBody>
                    )
                })}
                <div className="flex justify-end py-4">
                    <CreateReflinks store={store}/>
                </div>
            </Table>

        </div>
    );
}

export default Reflinks;
