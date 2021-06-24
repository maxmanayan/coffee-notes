import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DailyQuote = () => {
  const [ quoteBlock, setQuoteBlock ] = useState(null)

  useEffect(() => {
    getQuote()
  }, [])

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const getQuote = async () => {
    try {
      let res = await axios.get('https://type.fit/api/quotes')
      // let res = await axios.get('https://zenquotes.io/api/today')
      setQuoteBlock(res.data[getRandomInt(0, res.data.length - 1)])
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div className='daily-quote'>
      <h1>Daily Quote</h1>
      {/* {quoteBlock && <span>{JSON.stringify(quoteBlock, null, 2)}</span>} */}
      <div className='daily-quote-quoteblock'>
        <div className='daily-quote-text'>
          {quoteBlock && <h3>{quoteBlock.text}</h3>}
        </div>
        <div className='daily-quote-text'>
          {quoteBlock && <h3>{quoteBlock.author}</h3>}
        </div>
      </div>
    </div>
  )
};

export default DailyQuote;