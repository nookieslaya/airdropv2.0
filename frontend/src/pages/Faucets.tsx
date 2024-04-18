import { useEffect} from "react";
import faucetsStore from '../stores/faucetsStore.ts'
import { Input } from "@/components/ui/input"

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
            <h1>Faucets</h1>
            {store.faucets && store.faucets.map((faucet) => {
                return (<div className="flex justify-between container" key={faucet._id}>
                    <div><p>{faucet.name}</p>
                        <p>{faucet.url}</p></div>
                    <div className="space-x-2">
                        <button onClick={() => store.deleteFaucets(faucet._id)}>del</button>
                        <button onClick={() => store.toggleUpdate(faucet)}>update</button>
                    </div>
                </div>)
            })}
            {!store.updateForm._id && (
                <div>
                    <h2 className='text-xl my-3'>create faucet</h2>

                    <form onSubmit={store.createSingleFaucet}>
                        <Input className='border border-black-100' type="text" name="name" value={store.createFaucet.name}
                               onChange={store.updateCreateFormField}/>
                        <Input className='border border-black-100' type="text" name="url" value={store.createFaucet.url}
                               onChange={store.updateCreateFormField}/>
                        <button type="submit">Create faucet</button>
                    </form>
                </div>
            )}
            {store.updateForm._id && (
                <div>
                    <h2 className='text-xl my-3'>update faucet</h2>

                    <form onSubmit={store.updateFaucet}>
                        <Input className='border border-black-100' type="text" name="name" value={store.updateForm.name}
                               onChange={store.handleUpdateFieldChange}/>
                        <Input className='border border-black-100' type="text" name="url" value={store.updateForm.url}
                               onChange={store.handleUpdateFieldChange}/>
                        <button type="submit">update faucet</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Faucets;
