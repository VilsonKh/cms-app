import React from 'react'

const TesmComponent = ({darkMode, setDarkMode}) => {
  return (
   <>
      <div>TesmComponent</div>
      <button onClick={() => setDarkMode(!darkMode)}>Dark</button>
   </>
  )
}

export default TesmComponent