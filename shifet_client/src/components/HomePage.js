import React from 'react';

import AddShift from './HomePageComponents/AddShift.js';
import PastColumnsTable from './HomePageComponents/PastColumnsTable.js';

const HomePage = () => {
  return(
    <div className="homePage">
      <AddShift/>
      <PastColumnsTable/>
    </div>
  )
}
export default HomePage;
