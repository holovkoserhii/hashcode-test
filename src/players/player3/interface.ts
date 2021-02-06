interface Pizza {
    id: number
    ingredients: string[],
}

export interface player1out {
    teamOf2Number: number
    teamOf3Number: number
    teamOf4Number: number
    pizzas: Pizza[]
    pizzasCount: number
}

interface Order {
    teamOf: number
    pizzaIds: number[]
}

export interface player2out {
    orders: Order[]
}