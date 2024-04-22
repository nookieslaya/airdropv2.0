import {useEffect, useState} from "react";
import faucetsStore from '../stores/faucetsStore.ts'
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button.tsx";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Link} from "react-router-dom";

function Faucets() {
    const store = faucetsStore()


    useEffect(() => {
        store.fetchFaucets()
    }, []);

    const [open, setOpen] = useState(false);

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
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <button onSelect={(e) => e.preventDefault()} onClick={() => {
                                                store.toggleUpdate(faucet)
                                            }}>
                                                <FaEdit />
                                            </button>

                                        </DialogTrigger>

                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Update Faucet</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid  items-center gap-4">
                                                    <form onSubmit={store.updateFaucet}>
                                                        <Label className="text-right">
                                                            Faucet Name
                                                        </Label>
                                                        <Input className='border border-black-100' type="text"
                                                               name="name"
                                                               value={store.updateForm.name}
                                                               onChange={store.handleUpdateFieldChange}/>
                                                        <Label className="text-right">
                                                            Faucet Url
                                                        </Label>
                                                        <Input className='border border-black-100' type="text"
                                                               name="url"
                                                               value={store.updateForm.url}
                                                               onChange={store.handleUpdateFieldChange}/>
                                                        <DialogFooter className='py-6'>
                                                            <Button onClick={()=>setOpen(false)} className="py-6" type="submit">Update
                                                                faucet</Button>
                                                        </DialogFooter>
                                                    </form>

                                                </div>

                                            </div>

                                        </DialogContent>

                                    </Dialog>
                                </div>
                            </TableRow>
                        </TableBody>
                    )
                })}

                <div className="flex justify-end py-4">

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create Faucet</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Faucet</DialogTitle>
                                <DialogDescription>
                                    Create new faucet here
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid  items-center gap-4">
                                    <form onSubmit={store.createSingleFaucet}>
                                        <Label className="text-right">
                                            Faucet Name
                                        </Label>
                                        <Input className='border border-black-100' type="text" name="name"
                                               value={store.createFaucet.name}
                                               onChange={store.updateCreateFormField}/>
                                        <Label className="text-right">
                                            Faucet Url
                                        </Label>
                                        <Input className='border border-black-100' type="text" name="url"
                                               value={store.createFaucet.url}
                                               onChange={store.updateCreateFormField}/>
                                        <DialogFooter className='py-6'>
                                            <Button className="py-6" type="submit">Create faucet</Button>
                                        </DialogFooter>
                                    </form>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </Table>
        </div>
    );
}

export default Faucets;
