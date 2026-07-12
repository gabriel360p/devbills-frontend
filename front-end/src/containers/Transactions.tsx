import { AlertCircle, ArrowDown, ArrowUp, LoaderCircle, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import MonthYearSelect from "../components/MonthYearSelect";
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import { TransactionType, type Transaction } from "../types/transactions";
import { Api } from "../services/Api";
import { deleteTransaction, getTransactions } from "../routes/transactionService";
import Button from "../components/Button";
import { formatCurrency, formatData } from "../utils/formatter";
import { toast } from "react-toastify";

const Transactions = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [deletingId, setDeletingId] = useState<string | boolean>("");
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [searchText, setSearchText] = useState<string>("");


    async function handleDelete(id: string): Promise<void> {
        try {
            setDeletingId(id)
            await deleteTransaction(id);

            //os dois jeitos funciona, o primeiro eu fiz sozinho o segundo foi o rodolfo, ele mostrou que pra puxar os dados anteriores do state com uma arrow function
            // setTransactions((transactions.filter(transactions => transactions.id !== id)))
            setFilteredTransactions(((PuxandoTodasAsTransacoesAnteriores: Transaction[]) => PuxandoTodasAsTransacoesAnteriores.filter(transacao => transacao.id !== id)))
            toast.success("Transação apagada!")

        } catch (error) {
            toast.error("Houve um erro ao tentar apagar, tente novamente mais tarde.")
            console.error(error)
        } finally {
            setDeletingId(false)
        }
    }

    function confirmDelete(id: string): void {
        if (window.confirm("Tem certeza que deseja deletar essa transação?")) handleDelete(id);
    }

    function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
        const searchString = e.target.value.toLocaleLowerCase()
        setSearchText(searchString)

        setFilteredTransactions(
            transactions.filter(
                transaction => transaction.description.toLocaleLowerCase().includes(searchString)
            )
        )

    }


    async function loadTransactions(): Promise<void> {
        try {
            setLoading(true)
            setError("")

            const data = await getTransactions({ month, year })
            setTransactions(data);
            setFilteredTransactions(data)
        } catch (err) {
            console.error(err)
            setError("Não foi possível carregar as transações, tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTransactions()
    }, [month, year])

    return (
        <div className="container-app py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
                <Link
                    className="bg-primary-500 text-[#051626] font-semibold px-4 py-2 rounded-xl
                    flex items-center justify-center hover:bg-primary-600 transition-all
                    "
                    to={'/transacoes/nova'}> Nova Transação <Plus />
                </Link>
            </div>
            <div className="mb-6">
                <MonthYearSelect year={year} month={month}
                    onMonthChange={setMonth} onYearChange={setYear}
                />
            </div>

            <Card>
                <div className="mb-6">
                    <Input labelId={"search-transaction"}
                        label="Pesquisar por transações"
                        icon={<Search />}
                        onChange={handleChangeInput}
                        value={searchText}
                        // error="erro ao pesquisar"
                        // onClick={(e) => alert("cliquei")}
                        fullWidth
                        placeholder="Buscar transações..." />
                </div>
            </Card>

            <Card className="overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <LoaderCircle className="animate-spin text-gray-500" />
                    </div>

                ) : error ? (
                    <div className="p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <p>{error}</p>
                        <Button className="mx-auto mt-4" onClick={loadTransactions}>Tentar Novamente</Button>
                    </div>
                ) : transactions?.length === 0 ? (
                    <div className="flex justify-center items-center gap-4 flex-col">
                        <Link
                            className="bg-primary-500 w-fit text-[#051626] font-semibold px-4 py-2 rounded-xl
                            flex items-center justify-center hover:bg-primary-600 transition-all"
                            to={'/transacoes/nova'}> Nova Transação <Plus />
                        </Link>
                        <p className="text-gray-500">Nenhuma transação encontrada</p>
                    </div>
                ) : (

                    <div className="overflow-hidden">

                        <table className="divide-y divide-gray-700 min-h-full w-full">
                            <thead>
                                <tr >
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase" scope="col">
                                        Descrição</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase" scope="col">
                                        Data</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase" scope="col">
                                        Categoria</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase" scope="col">
                                        Valor</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase" scope="col">
                                        Ações</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-700">
                                {filteredTransactions?.map(transaction => (
                                    <tr key={transaction.id} className="hover:bg-gray-800 ">
                                        <td className="py-3 px-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    {transaction.type === TransactionType.INCOME ? (
                                                        <ArrowUp className="text-primary-600" size={16} />
                                                    ) :
                                                        <ArrowDown className="text-red-600" size={16} />

                                                    }
                                                </div>
                                                <span className="text-sm font-medium text-gray-50">
                                                    {transaction.description}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-2 whitespace-nowrap">
                                            {formatData(transaction.date)}
                                        </td>

                                        <td className="py-3 px-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: transaction.Category.color }}
                                                >

                                                </div>
                                                <span className="text-sm font-medium text-gray-50">
                                                    {transaction.Category.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-2 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-50">
                                                <div className="flex justify-center items-center gap-2">

                                                    {transaction.type === TransactionType.INCOME ? (

                                                        <span className="text-primary-600">
                                                            {formatCurrency(transaction.amount)}
                                                        </span>
                                                    ) :
                                                        <span className="text-red-600">
                                                            {formatCurrency(transaction.amount)}
                                                        </span>
                                                    }
                                                </div>

                                            </span>
                                        </td>

                                        <td className="py-3 px-2 whitespace-nowrap">
                                            <div className="flex justify-center">
                                                {deletingId === transaction.id ? (
                                                    <LoaderCircle className="animate-spin text-gray-500" />
                                                ) :
                                                    <button
                                                        type="button"
                                                        className="bg-transparent border-transparent"
                                                        disabled={deletingId === transaction.id}
                                                        onClick={() => { confirmDelete(transaction.id) }}
                                                    >
                                                        <Trash2 size={20} className="text-red-600 cursor-pointer transition-all active:opacity-30" />
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>

                )
                }
            </Card >
        </div >
    )
}

export default Transactions;