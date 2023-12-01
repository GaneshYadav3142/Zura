import React, { useState,useEffect } from 'react'
import axios from "axios"
export const Homepage:React.FC = () => {
    
    const [data,setData]=useState<any>([])
    const [query,setQuery]=useState<string>("")

    const fetchQuery=async (query:string)=>{
        let api
        if(query){
             api=`https://api.npms.io/v2/search?q=${query}`
        }
        else {
             api=`https://api.npms.io/v2/search?q=""`
        }
        try {
          const response= await axios.get(api)
              console.log(response.data.results)
              setData(response.data.results)
          
      }
        catch (error) {
          console.log(error)
        }
     }

     useEffect(()=>{
        fetchQuery(query)
     },[query])
  

  return (
    <div className="p-4 mx-auto max-w-screen-lg">
      {/* Search Input */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-left text-gray-700 font-bold mb-2">
          Search for NPM packages
        </label>
        <input
          type="text"
          id="search"
          className="border rounded w-full py-2 px-3"
          required
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Search Results */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-left">
          {data.length === 0 ? 'Search Results' : 'Results'}
        </h3>
        <div className="max-h-32 overflow-y-auto">
          {data.length !== 0 &&
            data.map((el:any, i:number) => (
              <div key={i} className="mb-2 text-left">
                <input type="radio" id={`radioOption${i}`} className="mr-2"  placeholder="e.g. react"/>
                <label htmlFor={`radioOption${i}`}>{el.package.name}</label>
              </div>
            ))}
        </div>
      </div>

      {/* Description Textarea and Submit Button */}
      <div>
      <label htmlFor="description" className="block text-left text-gray-700 font-bold mb-2">
          Why is this your favourite?
        </label>
        <textarea
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Enter description"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  )
}
