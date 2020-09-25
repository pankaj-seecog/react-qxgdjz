import React from "react";
import data from "./data";
import Company from "./Company";
class List extends React.Component {
  constructor(props) {
    super(props);

    //map the data start
    data = data.map(item => {
      return {
        ...item,
        lastSaved: new Date(),
        editIndex: 0,
        editStt: false,
        searchTxt : ""
      };
    });
    //map the data end

    this.state = {
      mainData : data,
      companies: data,
      editButton: false
    };
  }

  editArr = index => {
    this.setState({
      editTxt: this.state.companies[index].name
    });
    let tmpArr = this.state.companies;
    tmpArr = tmpArr.map((item, i) => {
      if (i == index) {
        return {
          ...item,
          editStt: !item.editStt,
          editTxt: ""
        };
      }
      return item;
    });
    this.setState({ companies: tmpArr });
    this.setState();
  };

  updateFinally = (index, eleVal) => {
    console.log(index, eleVal);
  };

  filterArr = (evt)=>{
    // evt.preventDefault();
    console.log("==>",this.state.searchTxt)
let tmpArr = this.state.mainData;
tmpArr = tmpArr.filter((item)=>{
  if(item.name.includes(this.state.searchTxt))
  console.log("Comming")
// return item.name==this.state.searchTxt
return item.name.includes(this.state.searchTxt)
})
console.log("fonal found ",tmpArr)
if(tmpArr.length >0){
this.setState({
  companies : tmpArr
})
}
else{
this.setState({
  companies : this.state.mainData
})
}


  }

  saveData = evt => {
    evt.preventDefault();
    let tmpArr = this.state.companies;
    tmpArr = tmpArr.map((item, i) => {
      if (i == this.state.editIndex) {
        return {
          ...item,
          name: this.state.editTxt,
          editStt: false
        };
      }
      return item;
    });
    this.setState({
      companies: tmpArr
    });
  };

  delRecord = index => {
    if (confirm("Do you want to delete record ?")) {
      let tmpArr = this.state.companies;
      tmpArr.splice(index, 1);
      this.setState({
        companies: tmpArr
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Inside List</h1>
        <div>
        <form onSubmit={this.filterArr}>
<input className="form-control" value={this.state.searchTxt} onChange={
  (evt)=>{
    this.setState({
    searchTxt : evt.target.value})
    console.log("-----")
    this.filterArr()
  
  
  }
}/>
</form>
        </div>
        <table className="table">
          <th>Company</th>
          <th>Type</th>
          <th>Last saved</th>
          <th>Actions</th>
          {this.state.companies.map((comp, i) => {
            return (
              <tr key={i}>
                <td>
                  {comp.editStt ? (
                    <div>
                      <form onSubmit={this.saveData}>
                        <input
                          className="form-control"
                          value={this.state.editTxt}
                          onChange={evt => {
                            this.setState({
                              editIndex: i,
                              editTxt: evt.target.value
                            });
                          }}
                        />
                      </form>
                    </div>
                  ) : (
                    <span>{comp.name}</span>
                  )}
                </td>
                <td>{comp.type}</td>
                <td>{}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => this.editArr(i)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.delRecord(i)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default List;
