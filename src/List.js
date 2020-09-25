import React from 'react';
import data from "./data"
import Company from './Company'
class List extends React.Component{

constructor(props){
super(props);

//map the data start
data = data.map((item)=>{
  return {
    ...item,
    lastSaved : new Date(),
    editIndex : 0,
    editStt : false
  }
})
//map the data end

this.state = {
  companies : data,
  editButton : false
}
}

editArr = (index)=>{
  this.setState({
    editTxt : this.state.companies[index].name
  })
let tmpArr = this.state.companies;
tmpArr = tmpArr.map((item,i)=>{
if(i==index){
return {
  ...item,
  editStt : !item.editStt,
  editTxt : ""
}
}
return item;
})
this.setState({companies : tmpArr});
this.setState()
}

updateFinally = (index,eleVal)=>{
console.log(index,eleVal)
}

saveData=(evt)=>{
  evt.preventDefault()
let tmpArr = this.state.companies;
tmpArr = tmpArr.map((item,i)=>{
if(i==this.state.editIndex){
return {
  ...item,
  name : this.state.editTxt,
  editStt : false,
}
}
return item;
})
this.setState({
  companies : tmpArr
})

}

delRecord = (index)=>{
let tmpArr = this.state.companies;
tmpArr = tmpArr.splice(index,1);
// tmpArr = tmpArr.map((item,i)=>{
// if(i==index){
// return {
//   ...item,
//   name : this.state.editTxt,
//   editStt : false,
// }
// }
// return item;
// })
this.setState({
  companies : tmpArr
})
}

render(){
  return (
    <div>
<h1>Inside List</h1>
<table className="table">
<th>Company</th><th>Type</th><th>Last saved</th><th>Actions</th>
{
  this.state.companies.map((comp,i)=>{
return (
  <tr key={i}>
<td>
{
(comp.editStt)?
<div>
<form onSubmit={this.saveData}>
<input className="form-control" value={this.state.editTxt} onChange={(evt)=>{

  this.setState({
    editIndex : i,
    editTxt : evt.target.value
  })
}}/>
</form>
</div>
:<span>
{comp.name}
</span>
}


</td>
<td>{comp.type}</td>
<td>{}</td>
<td>
<button  className="btn btn-sm btn-primary" onClick={()=>this.editArr(i)}>Edit</button>
<button  className="btn btn-sm btn-danger" onClick={()=>delRecord(i)}>Del</button>
</td>
  </tr>
)
  })
}
</table>
    </div>
  )
}

}

export default List;