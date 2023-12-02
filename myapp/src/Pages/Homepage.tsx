import React, { useState,useEffect } from 'react'
import axios from "axios"
export const Homepage:React.FC = () => {
    
    const [data,setData]=useState<any>([])
    const [query,setQuery]=useState<string>("")
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);

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
  

     const handleRadioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPackage(e.target.value);
      setFormError(null);
    };
  
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
      setFormError(null);
    };


    const handleAddToFavorites = () => {
      if (!selectedPackage) {
        setFormError('Please select a package.');
      } else if (description.trim() === '') {
        setFormError('Please enter a description.');
      } else {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isItemPresent = favorites.some(
          (item: { itemName: string }) => item.itemName === selectedPackage
        );
  
        if (isItemPresent) {
          // Show alert if the item is already present
          alert('Item already present in favorites.');
        } else {
          // Add to localStorage
          const favoriteItem = {
            itemName: selectedPackage,
            description,
          };
          favorites.push(favoriteItem);
          localStorage.setItem('favorites', JSON.stringify(favorites));
  
          // Additional logic if needed
  
          // Reset state
          setSelectedPackage(null);
          setDescription('');
          setFormError(null);
          alert("item Added succefully")
        }
      }
    }
  
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
          placeholder="e.g. react"
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
                <input 
                type="radio" 
                value={el.package.name}
                id={`radioOption${i}`} 
                className="mr-2" 
                onChange={handleRadioSelect}
                checked={selectedPackage === el.package.name}
                />
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
        required
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Enter description"
          value={description}
          onChange={handleTextareaChange}
        />
        {formError && <p className="text-red-500 mb-2">{formError}</p>}
        <button className="bg-blue-500 text-white py-2 px-4 rounded"   onClick={handleAddToFavorites}>
          Submit
        </button>
      </div>
    </div>
  )
}
