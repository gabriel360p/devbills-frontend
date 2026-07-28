import { useEffect, useState } from "react";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionsMonthly, getTransactionsSummary } from "../routes/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import Card from "../components/Card";
import { ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/formatter";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, type PieLabelRenderProps, type TooltipValueType } from "recharts";



const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

    const initialSummary: TransactionSummary = {
        balance: 0,
        totalExpense: 0,
        totalIncome: 0,
        expesesByCategory: [],
    }

    const [summary, setSummary] = useState<TransactionSummary>(initialSummary);

    useEffect(() => {

        async function loadTransactionsMonthly(): Promise<void> {
            try {
                const { history } = await getTransactionsMonthly(month, year);
                setMonthlyItemsData(history)
            } catch (error) {
                console.error(error)

            }
        } loadTransactionsMonthly()

        async function loadTransactionSummary(): Promise<void> {
            try {
                const response = await getTransactionsSummary(month, year);
                setSummary(response)
            } catch (error) {
                console.error(error)

            }
        } loadTransactionSummary()
    }, [month, year])

    const renderPieChartLabel = ({ payload, percent }: PieLabelRenderProps): string => {
        const categoryName = (payload as { categoryName?: string } | undefined)?.categoryName ?? "Categoria";
        return `${categoryName}: ${((percent ?? 0) * 100).toFixed(1)}%`
    }

    const formatToolTipValue = (value: TooltipValueType | undefined): string => {
        return formatCurrency(typeof value === "number" ? value : 0)
    }




    return (
        <div className="container-app py-6 ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6" >
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
            </div>

            <MonthYearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card hover glowEffect={summary.balance > 0} icon={<Wallet size={20} />} title="Saldo">
                    <p className={`font-bold text-primary-500
                        ${summary.balance > 0 ? 'text-primary-500' : 'text-red-600'}
                    `}>
                        {formatCurrency(summary.balance)}
                    </p>
                </Card>

                <Card hover icon={<ArrowUp size={20} />} title="Receitas">
                    <p className={`font-bold text-primary-500`}>
                        {formatCurrency(summary.totalIncome)}
                    </p>
                </Card>
                <Card hover icon={<Wallet color="orange" size={20} />} title="Despesas">
                    <p className={`font-bold text-red-700`}>
                        {formatCurrency(summary.totalExpense)}
                    </p>
                </Card>
            </div>

            <div >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-6">
                    {/* Gráfico Pie */}
                    <Card className="min-h-80" title="Despesas por categoria" icon={<TrendingUp size={20} className="text-primary-500" />} >
                        {summary.expesesByCategory.length > 0 ? (
                            <div className="h-72 mt-4">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={summary.expesesByCategory}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            dataKey="amount"
                                            label={renderPieChartLabel}
                                            nameKey={"categoryName"}
                                        >
                                            {summary.expesesByCategory.map(entry => (
                                                <Cell
                                                    key={entry.categoryId}
                                                    fill={entry.categoryColor}
                                                />
                                            ))}

                                        </Pie>
                                        <Tooltip formatter={formatToolTipValue} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) :
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                Nenhuma despesa registrada nesse período
                            </div>

                        }

                    </Card>

                    {/* Gráfico Bar  */}
                    <Card icon={<Calendar size={20} className="text-primary-500" />}
                        title="Histórico Mensal"
                        className="min-h-80"
                    >
                        <div className="min-72 mt-4">
                            {monthlyItemsData.length > 0 ? (
                                <BarChart
                                    margin={{ left: 30 }}
                                    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                                    responsive
                                    data={monthlyItemsData}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="red" />
                                    <XAxis
                                        stroke="#94A3BB"
                                        tick={{ style: { textTransform: "capitalize" } }}
                                        dataKey="name"
                                    />
                                    <YAxis stroke="#94A3BB" tickFormatter={formatCurrency}
                                        tick={{ style: { fontSize: 12 } }}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="expenses"
                                        name={"Despesas"}
                                        fill="#FF6384" />
                                    <Bar dataKey="income"
                                        name={"Receitas"}
                                        fill="#37E359" />
                                </BarChart>
                            ) :
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    Nenhuma despesa registrada nesse período
                                </div>
                            }

                        </div>
                    </Card>
                </div>


            </div>
        </div >
    )
}

export default Dashboard;
