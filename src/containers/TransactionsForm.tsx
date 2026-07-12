import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { TransactionType, type CreateTransactionDataDTO } from "../types/transactions";
import { geCategories } from "../routes/categoryService";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import Input from "../components/Input";
import { Calendar, DollarSign, Save, Tag } from "lucide-react";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTransaction } from "../routes/transactionService";

interface FormData {
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    type: TransactionType;
}
const initialFormData = {
    description: "",
    amount: 0,
    date: "",
    categoryId: "",
    type: TransactionType.EXPENSE,
}
const TransactionsForm = () => {

    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const formId = useId()
    const navigate = useNavigate()
    const filteredCategories = categories.filter((category) => category.type === formData.type)

    const validateForm = (): boolean => {
        if (!formData.description || !formData.amount || !formData.date || !formData.categoryId) {
            setError("Preencha todos os campos");
            return false

        }
        if (formData.amount <= 0) {
            setError("O valor deve ser maior que zero");
            return false
        }

        return true
    }

    function handleTransactionType(itemType: TransactionType): void {
        setFormData((prev) => ({ ...prev, type: itemType }))
    }

    async function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): Promise<void> {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault() //impedindo que o submit de um reload na tela
        setError(null)

        try {
            if (!validateForm()) {
                toast.error(error)
                return
            }
            const transactionData: CreateTransactionDataDTO = {
                description: formData.description,
                amount: Number.parseFloat(formData.amount),
                categoryId: formData.categoryId,
                type: formData.type,
                date: `${formData.date}T12:00:00.000Z`,
            }
            await createTransaction(transactionData)
            toast.success("Transação salva com sucesso!")
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)
        } catch (error) {
            toast.error("Houve um erro ao salvar a nova transação, tente novamente mais tarde")
            console.error(error)
        }
    }

    function handleCancel(): void {
        // navega para a tela de transactions
        navigate('/transacoes')
    }



    useEffect(() => {
        async function loadCategories(): Promise<void> {
            const response = await geCategories()
            setCategories(response)
        } loadCategories()
    }, [])

    return (
        <div className="container-app py-8">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">Nova transação</h1>
                <Card>
                    <form onSubmit={handleSubmit} className="py-4">

                        <div>
                            <label htmlFor={formId}>Tipo de Transação</label>
                            <TransactionTypeSelector
                                id={formId}
                                value={formData.type}
                                onChange={handleTransactionType}
                            />
                        </div>

                        <Input
                            fullWidth
                            label="descrição"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Ex: Supermercado, padaria..."
                            required
                        />
                        <Input
                            fullWidth
                            type="number"
                            label="Valor"
                            step={"0.01"}
                            min={0.01}
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Ex: R$ 0,00"
                            required
                            icon={<DollarSign />}
                        />
                        <Input
                            fullWidth
                            label="Data"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            icon={<Calendar />}
                        />

                        <Select
                            label="Categorias"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            icon={<Tag />}
                            required
                            fullWidth
                            options={[
                                { value: "", label: "Selecione uma categoria" },
                                ...filteredCategories.map(category => ({
                                    value: category.id,
                                    label: category.name,
                                }))
                            ]}
                        />


                        <div className="flex justify-end space-x-3 mt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant={formData.type === TransactionType.EXPENSE ? "danger" : "success"}
                                type="submit"
                            >
                                <Save
                                    className="w-4 h-4 mr-2"
                                />
                                Salvar
                            </Button>
                        </div>

                    </form>
                </Card>
            </div>

        </div>
    )
}

export default TransactionsForm;
