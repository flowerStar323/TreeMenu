import './App.css';
import React from 'react';
import { data } from "./Treedata";
import SuperTreeview from 'react-super-treeview';
import 'react-super-treeview/dist/style.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.setState({ data: this.getNodes(data) })
  }

  getNodes = (object) => {
    return Object
      .entries(object)
      .map(([key, value]) => {
        let tempTag;

        switch (typeof value) {
          case 'string':
            if (value == "string") {
              tempTag = (

                <div className='onerow'><input className='content' type="text" /></div>
              )

            }
            else if (value == "boolean") {
              tempTag = (
                <div className='onerow'><input className='content' type="checkbox" /></div>
              )
            }
            else if (value == "number") {
              tempTag = (
                <div className='onerow'><input className='inDiv' type="number" defaultValue="0" /></div>
              )
            }
            break;
          case 'object':
            if (value.constructor == Array) {
              tempTag = (
                <div className='onerow'><select className='selDiv'>{value.map((k, item) => (<option key={k}>{item}</option>))}</select></div>
              )
            }
            break;
          default:
            break;
        }
        return value && value.constructor === Object
          ? { name: key, id: key, children: this.getNodes(value) }
          : { name: (<div id="lastchild" style={{ display: "flex", justifyContent: 'space-between', width: "100%" }}>{key}<div className='inputdiv'>{tempTag}</div></div>), id: key }

      }
      );
  }

  handleChange = (updateData) => {
    this.setState({ data: updateData })
  }

  render() {
    return (
      <div className='root'>
        <div className='mainbody'>
          <SuperTreeview
            data={this.state.data}
            deleteElement
            onUpdateCb={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
export default App;