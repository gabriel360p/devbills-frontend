export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency"
    }).format(value)
}


export const formatData = (date: Date | string): string => {
    //verificando se a minha data já é uma instância de date, se não eu converto
    const dataObj = date instanceof Date ? date : new Date(date)

    return new Intl.DateTimeFormat("pt-BR").format(dataObj)
}


