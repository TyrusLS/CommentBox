import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Editor from "./Editor";
import "../style/style.css"
import { RingLoader } from "react-spinners";
import { DataOption } from "./docs/data";
import Select from 'react-select';

export const initialDataOptions: DataOption[] = [
  { value: '', label: ''  }
];

export class AllComponents extends React.Component<{}>{
  private static updateCallback: (data: DataOption[]) => void = null;
  private static updateContext: (context: string) => void= null;
  private static updateUrl: (url: string) => void = null;
  constructor(props: any){
    super(props)
    this.state = {
      data: initialDataOptions,
      date: new Date().toLocaleDateString('de-DE'),
      context: '',
      comment: '',
      loading: false,
      url: ''
    }
      
  }

  
  public static update(data: any[], context: string, url: string) {
    var newState: DataOption[]= []
    for (let index = 0; index < data.length; index++) {
      try{
        newState.push({
          value: convert(data[index]),
         label: convert(data[index])
        });
      }catch(err){
        console.log(err)
      }
    }
        if(typeof AllComponents.updateCallback === 'function'){
          AllComponents.updateCallback(newState);
        }if(typeof AllComponents.updateContext === 'function'){
          AllComponents.updateContext(context);
        }if(typeof AllComponents.updateUrl === 'function'){
          AllComponents.updateUrl(url)
        }
        
    }
    public state = {
      data: initialDataOptions,
      date: new Date().toLocaleDateString('de-DE'),
      context: '',
      comment: '',
      loading: false,
      url: ''};
      
    public componentWillMount() {
      AllComponents.updateCallback = (newState: DataOption[]): void => { this.setState({data: newState}); }
      AllComponents.updateContext = (context: string): void => { this.setState({context: context}); }
      AllComponents.updateUrl = (url: string): void => {this.setState({url : url}); }
    }
    
    public componentWillUnmount() {
      AllComponents.updateCallback = null;
      AllComponents.updateContext = null;
      AllComponents.updateUrl = null;
    }
    public loadData(){
      
      this.setState({loading: true})
      setTimeout(()=> {
        this.setState({loading: false})
      }, 3000)
      this.setState({comment: ''})
    }
    handleChange(e){
      this.setState({date: e.value})
      }
      
  render(){
    const commentToParent = (commentData) =>{
      this.setState({comment: commentData});
  }
    var Data = this.state.data;
    
    return (
      <div className="App">
      {
          this.state.loading ? 
          <RingLoader color="#288BA8" />
          :
      <div  className="alltogether">
        
      <Stack spacing={2} >
      <Select options={Data} onChange={this.handleChange.bind(this)}/>
      
      </Stack>
      
      <Stack spacing={2} className="stack"> 
      <div className="item"><Editor  commentToParent={commentToParent}/> </div>
      <div className="send">
      <button onClick={ ()=> {this.loadData(); SendData(this.state.date, this.state.context, this.state.comment, this.state.url)} }className={'send--Btn'}>
      Senden
      </button>
      </div>
      </Stack>
      </div>
       }
      </div>
    )
}
}

async function SendData(date, context, comment, url){
  const URL = url;
  const postData = {
    ReferenceDate: date,
    Context: context,
    Content: comment
  }
  try{
  const res = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData),
  });
  if (!res.ok){
    const message = `An error has occured: ${res.status} - ${res.statusText}`;
    console.log(message);
  }
      
        const data = await res.json();
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };
  
  
  }catch(err){
  }
  
  console.log(date, context, comment);
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear()].join(".");
  }
  function convertTest123(str) {
    var mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = str.split(" ");
  
    return [date[3], mnths[date[1]], date[2]].join("-");
  }