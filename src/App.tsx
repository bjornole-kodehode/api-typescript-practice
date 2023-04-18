import { useEffect, useState } from 'react'

import './App.css'
import { getData } from './api'
import { CharacterType, Cost, SelectedType } from './types';
const URL = "https://rickandmortyapi.com/api/character?species="

function getCost(value: any): Cost {
  switch (value) {
    case "Human":
      return Cost.one;
    case "Alien":
      return Cost.two;
    case "unknown":
      return Cost.three;
    case "Animal":
      return Cost.four;
    case "Robot":
      return Cost.five;
    case "Mythological Creature":
      return Cost.six
    default:
      return Cost.one
  }
}


function App() {

  const [characterData, setCharacterData] = useState<CharacterType[]>([])
  const [selectedSorting, setSelectedSorting] = useState<SelectedType>("cost")

  useEffect(() => {
    async function fetchData() {
      try {
      const species = ["Human", "Alien", "Unknown", "Animal", "Robot", "Mythological"]
      const promises = species.map(specie => getData(`${URL}${specie}`))
      const results = await Promise.all(promises)
      
      
      const datas = results.flatMap(data => data.results)
      const characters: CharacterType[] = datas.map(({name, image, species}) => {
        console.log("data: ", name, image, species)
        return ({
          name,
          image,
          species,
          cost: getCost(species),
          gender: ""
      })
      })  
        setCharacterData(characters)
      } catch (error) {
        console.error(error)
      }
      
    }
    fetchData()
  }, [])

  const sortedByName = [...characterData].sort((a, b) => a.name.localeCompare(b.name))
  const sortedByCost = [...characterData].sort((a, b) => a.cost - b.cost)
  let sortedCharacters = characterData
  if (selectedSorting === "cost") {
    sortedCharacters = sortedByCost
  } else if (selectedSorting === "name") {
    sortedCharacters = sortedByName
  }
  
  return (
    <div className="App">
      <button className='py-2 px-4 hover:bg-blue-400 bg-blue-500 rounded my-6' onClick={() => setSelectedSorting(prevState => prevState === "cost" ? "name" : "cost")}>name/cost</button>
      <div className='grid gap-2 grid-cols-7'>
        {sortedCharacters.map(({name, image, cost, gender, species}) => (
          <div className=''>
            <img src={image} />
            <div className='flex flex-col'>
              <span>{name}</span>
              <span>{gender}</span>
              <span>{species}</span>
              <span>{cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
