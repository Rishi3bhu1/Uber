import React from 'react';

function LocationSearchPanel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if(activeField==="destination") {
      setDestination(suggestion);
    }
  };
  return (
    <div onChange={()=>console.log(suggestions)}>
      {
        suggestions.map((elem, index) => (
          <div
            className='flex items-center justify-start gap-4'
            key={index}
            onClick={() => handleSuggestionClick(elem.description)}
          >
            <h2 className='p-2 bg-[#eee] flex rounded-full my-4 items-center justify-center'>
              <i className="fa-solid fa-map-pin p-2"></i>
            </h2>
            <h4>{elem.description}</h4>
          </div>
        ))
      }
    </div>
  );
}

export default LocationSearchPanel;
