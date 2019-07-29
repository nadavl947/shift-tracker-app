import React from 'react';

const OneStatFormat = (props) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td><h3>{props.statTitle}</h3></td>
            <td><h2>{props.statNumber}</h2></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default OneStatFormat;
