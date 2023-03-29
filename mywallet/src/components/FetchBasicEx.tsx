import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const COINS = [
  {id: 1, symbol: 'xrp'},
  {id: 2, symbol: 'hbar'},
  {id: 3, symbol: 'algo'}
]

function wait(duration: number){
  return new Promise(resolve => setTimeout(resolve, duration))
}


const FetchBasicEx = () => {
  const queryClient = useQueryClient();

  const coinsQuery = useQuery({
    queryKey: ["coins"],
    queryFn: () => wait(1000).then(()=> [...COINS]),
  })

  const newCoinMutation = useMutation({
    mutationFn: (title: string) => wait(1000).then(() => {
      return COINS.push({
        id: crypto.randomUUID(),
        symbol: title
      })
    }),

    onSuccess: () => {
      //invalidates old coins query/list
      queryClient.invalidateQueries(["coins"])
    }
  })
  
  if(coinsQuery.isLoading) return <h1>Loading...</h1>
  if(coinsQuery.isError) return <h1>{JSON.stringify(coinsQuery.error)}</h1>
  
  return(
    <div>
      {coinsQuery.data.map(coin=> {
        return <p key={coin.id}> {coin.symbol} </p>
      })}
      <button disabled={newCoinMutation.isLoading} onClick={() => newCoinMutation.mutate("ada")}>Add New Coin</button>
    </div>
  )

}

export default FetchBasicEx
