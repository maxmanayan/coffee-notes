import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

const MotivationalQuote = () => {
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
    <div className='motivational-quote'>
      <h1 className='motivational-quote-header'>A Quote to Ponder</h1>
      <div className='motivational-quote-quoteblock'>
        <div className='motivational-quote-text'>
          {quoteBlock && <h3>"{quoteBlock.text}"</h3>}
        </div>
        <div className='motivational-quote-author'>
          {quoteBlock && <h4>- {quoteBlock.author === null ? 'Anonymous' : quoteBlock.author}</h4>}
        </div>
      </div>
      <div>
        <div className='motivational-quote-refresh'>
          <Icon.ArrowRepeat size={30} onClick={getQuote} />
        </div>
        {/* <h5 className='motivational-quote-refresh' onClick={getQuote}>Get New Quote</h5> */}
      </div>
    </div>
  )
};

export default MotivationalQuote;