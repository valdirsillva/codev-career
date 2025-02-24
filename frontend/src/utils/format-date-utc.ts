
export const formatDateStringToUTC = (data: string) => {
    const arr = data.split(/[/:\-T]/)

    const year = Number(arr[0])
    const month = Number(arr[1]) 
    const day = Number(arr[2])
    
    const date = new Date(year, month, day)

    const options: any = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: "America/Sao_Paulo"
    }

    return new Intl.DateTimeFormat("pt-BR", options).format(date)
}

export const parseDate = (data: string) => {
    const arr = data.split(/[/:\-T]/)
    
    const year = Number(arr[0])
    const month = Number(arr[1])
    const day = Number(arr[2])
  
    // console.log(new Date(`${year}-${month}-${day}T${min}`))
    return new Date(year, month, day)

}