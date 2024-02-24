import React from 'react'
import LineChart1 from './chart/Linechart'
import Linecharttwo from './chart/Linechart_two';
import Barchat from './chart/Barchart';
import Dailychart from './chart/Dailychart';
import Userchart from './chart/Userchart';
import Line3 from './chart/Line3';
import "./App.css"

export const App = () => {



  return (
    <>
    <div className='one'>
       <Linecharttwo/>
       <Dailychart/>
      <LineChart1/>
      
    </div>
    <div className='two'>
    <Userchart/>
      <Barchat/>
      <Line3/>
    </div>
    </>
  )
}
export default App;
