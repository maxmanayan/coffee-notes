import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

const RandomQuote = () => {
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
    <div className='random-quote'>
      {/* <h1>to ponder...</h1> */}
      {/* {quoteBlock && <span>{JSON.stringify(quoteBlock, null, 2)}</span>} */}
      <div className='random-quote-quoteblock'>
        <div className='random-quote-text'>
          {quoteBlock && <h2>"{quoteBlock.text}"</h2>}
        </div>
        <div className='random-quote-author'>
          {quoteBlock && <h3>- {quoteBlock.author === null ? 'Anonymous' : quoteBlock.author}</h3>}
        </div>
      </div>
      <div>
        <div className='random-quote-refresh'>
          <Icon.ArrowRepeat size={30} onClick={getQuote} />
        </div>
        {/* <h5 className='random-quote-refresh' onClick={getQuote}>Get New Quote</h5> */}
      </div>
    </div>
  )
};

export default RandomQuote;