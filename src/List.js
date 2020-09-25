import React from 'react';
import * as arr from "./data.json"
class List extends React.Component{

render(){
  console.log("The data is ",arr)
  return (
    <div>
<h1>Inside List</h1>
    </div>
  )
}

}

export default List;