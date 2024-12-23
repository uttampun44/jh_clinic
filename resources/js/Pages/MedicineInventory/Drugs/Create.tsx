import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Siderbar from "@/Components/Sidebar";
import { AuthContext } from "@/Context/ContextProvider";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Input, Select } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft} from "@mui/icons-material";
import { FormEvent, useContext } from "react";
import { toast } from "sonner";

export default function Create({ categories }) {

    const { isToggle } = useContext(AuthContext);
    const { errors, setData, data, post: post, reset, clearErrors } = useForm({
        name: '',
        sku: '',
        description: '',
        manufacturer: '',
        dosage_from: '',
        strength: '',
        expiration_date: '',
        drug_category_id: ''
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        post(route('drugs.store'), {
            onSuccess: () => {
                clearErrors()
                reset();
                toast.success("Drug create successfully");
            },
            onError: () => {
                toast.error('There was an error while creating the drug');
            },
        })
    }
    return (
        <Authenticated>
            <div className={`drug bg-white ${isToggle ? 'ml-56 p-10 rounded-md mr-8' : 'ml-24 p-10'}`}>
                <Siderbar />

                <div className="durgsForm">
                    <div className="title flex justify-between">
                        <h1 className="text-xl font-bold">Create Drug</h1> <PrimaryButton className="pr-1"><Link href={route("drugs.index")} className="p-2"><ArrowLeft />Back</Link></PrimaryButton>
                    </div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="formGrid my-2 grid grid-cols-3 gap-4">
                                <div className="name">
                                    <InputLabel htmlFor="name" value="Name" className="text-xl text-gray-500 font-medium" />
                                    <Input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} className="rounded-md my-1 w-full" />
                                    {
                                        errors.name && (
                                            <p className="text-red-600">{errors.name}</p>
                                        )
                                    }
                                </div>
                                <div className="sku">
                                    <InputLabel htmlFor="sku" value="Sku" className="text-xl text-gray-500 font-medium" />
                                    <Input type="text" value={data.sku} onChange={(e) => setData("sku", e.target.value)} className="rounded-md my-1 w-full" />
                                    {
                                        errors.sku && (
                                            <p className="text-red-600">{errors.sku}</p>
                                        )
                                    }
                                </div>
                                <div className="description">
                                    <InputLabel htmlFor="description" value="Description" className="text-xl text-gray-500 font-medium" />
                                    <Input type="text" value={data.description} onChange={(e) => setData("description", e.target.value)} className="rounded-md my-1 w-full" />
                                    {errors.description && (
                                        <p className="text-red-600">{errors.description}</p>
                                    )
                                    }

                                </div>
                                <div className="manufacturer">
                                    <InputLabel htmlFor="manufacturer" value="Manufacturer" className="text-xl text-gray-500 font-medium" />
                                    <Input type="text" value={data.manufacturer} onChange={(e) => setData("manufacturer", e.target.value)} className="rounded-md my-1 w-full" />
                                    {
                                        errors.manufacturer && (
                                            <p className="text-red-600">{errors.manufacturer}</p>
                                        )
                                    }
                                </div>
                                <div className="dosage">
                                    <InputLabel htmlFor="dosage" value="Dosage" className="text-xl text-gray-500 font-medium" />
                                    <input type="number" value={data.dosage_from} onChange={(e) => setData("dosage_from", e.target.value)} className="rounded-md my-1 w-full"  min="0" max="10" />
                                    {
                                        errors.dosage_from && (
                                            <p className="text-red-600">{errors.dosage_from}</p>
                                        )
                                    }
                                </div>
                                <div className="strength">
                                    <InputLabel htmlFor="strength" value="Strength" className="text-xl text-gray-500 font-medium" />
                                    <Input type="text" value={data.strength} onChange={(e) => setData("strength", e.target.value)} className="rounded-md my-1 w-full" />
                                    {
                                        errors.strength && (
                                            <p className="text-red-600">{errors.strength}</p>
                                        )
                                    }
                                </div>
                               
                                <div className="expiration_date">
                                    <InputLabel htmlFor="expiration_date" value="Expiration Date" className="text-xl text-gray-500 font-medium" />
                                    <Input type="date" value={data.expiration_date} onChange={(e) => setData("expiration_date", e.target.value)} className="rounded-md my-1 w-full" />
                                    {
                                        errors.expiration_date && (
                                            <p className="text-red-600">{errors.expiration_date}</p>
                                        )
                                    }
                                </div>
                                <div className="drugs_categories">
                                    <InputLabel htmlFor="drug_Categories" value="Drug Category" className="text-xl text-gray-500 font-medium" />
                                    <Select value={data.drug_category_id} onChange={(e) => setData("drug_category_id", e.target.value)} className="rounded-md my-1 w-full">
                                        <option>Select Drug Categories</option>
                                        {
                                            categories.drug_categories.map((category: any, index: number) => (
                                                <option value={category.id} key={index}>{category.name}</option>
                                            ))
                                        }
                                    </Select>
                                    {
                                        errors.drug_category_id && (
                                            <p className="text-red-600">{errors.drug_category_id}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="submit flex gap-x-2">
                                <PrimaryButton className="p-2">Create</PrimaryButton>  <DangerButton><Link href={route("drugs.index")} className="p-1">Cancel</Link></DangerButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}