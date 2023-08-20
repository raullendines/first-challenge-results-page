
import { useState, useEffect } from 'react'
import './App.css'

function App() {

  return (
    <div className='wrapper'>
      <Card/>
    </div>
  )
}

export default App


function Card() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('data.json'); 
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    }
    fetchData();
  }, []);

  const calculateSum = () => {
    if (jsonData) {
      const sum = jsonData.reduce((total, data) => total + data.score, 0);
      const average = Math.floor(sum / 4); // Calculate average and round down
      return average;
    }
    return 0;
  };


  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  return (

    <section className='card-bg-white'>
      <div className='card-bg-purple'>
        <h1 className='title-purp'>Your Result</h1>

        <div className='circle-purp'>
          <p className='text-sum'>{calculateSum()}</p>  
          <p className='text-sum-desc'>of 100</p>  

        </div>

        <p className='subtitle-purp'>Great</p>
        {
          isMobile ?  
          <p className='text-purp'>You scored higher than 65% of the <br/> people who have taken these tests.</p> :
          <p className='text-purp'>You scored higher than 65% of <br/>the people who have taken <br/>these tests.</p> 
        }
       
      </div>

      <div className='card-right'>
        <h1 className='title-sum'>Summary</h1>

        {jsonData ? (
          jsonData.map((element, index) => (
            <CardElement key={index} data={element} index={index} /> // Pass index prop
            ))
        ) : (
          <p>Loading JSON data...</p>
        )}

        <button className='btn'> Continue </button>
      </div>
    </section>
  )
}

function CardElement(props) {
  const { data, index } = props; // Destructure the data and index props

  // Determine the color based on the index
  const colorsBackground = [
    'hsla(0, 60%, 75%, 0.1)',
    'hsla(39, 60%, 75%, 0.1)',
    'hsla(166, 60%, 75%, 0.1)',
    'hsla(234, 60%, 75%, 0.1)',
  ];

  const colorsText = [
    'hsla(0, 60%, 50%, 0.9)',
    'hsla(39, 60%, 50%, 0.9)',
    'hsla(166, 60%, 50%, 0.9)',
    'hsla(234, 60%, 50%, 0.9)',
  ];

  const colorBg = colorsBackground[index % colorsBackground.length];
  const colorTxt = colorsText[index % colorsText.length];

  const cardElementStyle = {
    zIndex: 1,
    backgroundColor: colorBg,
  };

  const textColorStyle = {
    zIndex: 2,
    color: colorTxt,
    fontSize: 18,
  };

  return (
    <section className='card-element' style={cardElementStyle}>
      <div className='flex-direction'>
        <img src={data.icon} height={30} width={30} alt=""/>
        <p style={textColorStyle}>{data.category}</p>
      </div>
     
     <div className='flex-direction'>
      <p className='text-score'>{data.score}</p>
      <p className='text-score-desc'> / 100</p>
     </div>
     
    </section>
  );
}
