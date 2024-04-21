import {useEffect} from "react";
import faucetsStore from '../stores/faucetsStore.ts'
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react"
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

    // const [faucets, setFaucets] = useState(null)
    // const [createFaucet, setCreateFaucet] = useState({name: "", url: ""})
    // const [updateForm, setUpdateForm] = useState({_id: null, name: "", url: ""})

    useEffect(() => {
        store.fetchFaucets()
    }, []);


    // const fetchFaucets = async () => {
    //     const res = await axios.get('http://localhost:3000/faucets')
    //     setFaucets(res.data.faucets)
    // }
    // const updateCreateFormField = (e) => {
    //     const {name, value} = e.target
    //
    //     setCreateFaucet({
    //         ...createFaucet, [name]: value
    //     })
    // }
    // const createSingleFaucet = async (e) => {
    //     e.preventDefault()
    //     const res = await axios.post('http://localhost:3000/faucets', createFaucet)
    //     setFaucets([...faucets, res.data.faucet])
    //     setCreateFaucet({name: "", url: ''})
    // }
    // const deleteFaucet = async (_id) => {
    //     await axios.delete(`http://localhost:3000/faucets/${_id}`);
    //     store.fetchFaucets();
    // }
    // const handleUpdateFieldChange = (e) => {
    //     const {name, value} = e.target
    //     setUpdateForm({
    //         ...updateForm,
    //         [name]: value
    //     })
    // }
    // const toggleUpdate  = async(faucet)=>{
    //    setUpdateForm({name: faucet.name, url: faucet.url, _id: faucet._id})
    // }
    //
    // const updateFaucet = async (e) => {
    //     e.preventDefault()
    //      const res=   await axios.put(`http://localhost:3000/faucets/${updateForm._id}`, updateForm);
    //
    //     store.fetchFaucets();
    //     setUpdateForm({
    //         name: "", url: "", _id: null
    //     })
    // }


    return (
        <div className="Faucets">
            <Table className="max-w-[350px]">
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

                                <div className="space-x-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>


                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem
                                                onClick={() => store.deleteFaucets(faucet._id)}>del</DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => store.toggleUpdate(faucet)}>update</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableRow>
                        </TableBody>
                    )
                })}
                {!store.updateForm._id && (
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

                        {/*<h2 className='text-xl my-3'>create faucet</h2>*/}

                        {/*<form onSubmit={store.createSingleFaucet}>*/}
                        {/*    <Input className='border border-black-100' type="text" name="name"*/}
                        {/*           value={store.createFaucet.name}*/}
                        {/*           onChange={store.updateCreateFormField}/>*/}
                        {/*    <Input className='border border-black-100' type="text" name="url"*/}
                        {/*           value={store.createFaucet.url}*/}
                        {/*           onChange={store.updateCreateFormField}/>*/}
                        {/*    <Button type="submit">Create faucet</Button>*/}
                        {/*</form>*/}

                    </div>

                )}
                {store.updateForm._id && (
                    <div>
                        <h2 className='text-xl my-3'>update faucet</h2>

                        <form onSubmit={store.updateFaucet}>
                            <Input className='border border-black-100' type="text" name="name"
                                   value={store.updateForm.name}
                                   onChange={store.handleUpdateFieldChange}/>
                            <Input className='border border-black-100' type="text" name="url"
                                   value={store.updateForm.url}
                                   onChange={store.handleUpdateFieldChange}/>
                            <button type="submit">update faucet</button>
                        </form>
                    </div>
                )}
            </Table>
        </div>
    );
}

export default Faucets;
