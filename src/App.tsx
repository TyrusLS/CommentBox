import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Editor from "./Editor";
import "../style/style.css"
import { RingLoader } from "react-spinners";
import { DataOption } from "./docs/data";
import Select from 'react-select';
import "react-quill/dist/quill.snow.css";




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
        console.log(new Date("2022.03.31").toLocaleDateString("de-DE"));
        newState.push({
          value: convertValue(data[index]),
         label: convertLabel(data[index])
        });
      }catch(err){
        console.log(err)
      }

      const  customSort = (a,b) => {
        const dateA = new Date(a.value);
        const dateB = new Date(b.value);
          if (dateA < dateB) return 1;
          else if(dateA > dateB) return -1;
          return 0;
        };
        newState = newState.sort(customSort);


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
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '25px',
        height: '25px',
        boxShadow: state.isFocused ? null : null,
      }),
  
      valueContainer: (provided, state) => ({
        ...provided,
        height: '25px',
        padding: '0 6px'
      }),
  
      input: (provided, state) => ({
        ...provided,
        margin: '0px',
      }),
      indicatorSeparator: state => ({
        display: 'none',
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '25px',
      }),
    };
    return (
      <div className="App">
      {
          this.state.loading ? 
          <RingLoader color="#288BA8" />
          :
      <div  className="alltogether">  
      <Select className="select" styles={customStyles} options={Data} onChange={this.handleChange.bind(this)}/>
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
  comment = TransformStyles(comment)

  const postData = {
    Stichtag: date,
    Abschnitt: context,
    Kommentar: comment
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
  function convertValue(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(),mnth,day].join(".");
    //return "01.09.2013 00:00:00";
  }
  function convertLabel(str){
    var date = new Date(str);
    return  [date.toLocaleString('de-DE', { month: 'long' }),date.getFullYear()].join(" ");
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
  
  //  return [date[3], mnths[date[1]], date[2]].join("/")+"12:00.00Am";
   
  }


  function TransformStyles(comment){
    let style = `
    <head>
    <style>
    p {
      font-family: Segoe UI; 
    }
    .ql-size-small {
      font-size: 0.75em;
    }
    .ql-size-large {
      font-size: 1.5em;
    }
    .ql-size-huge {
      font-size: 2.5em;
    }
    .ql-align-center {
      text-align: center;
    }
    .ql-align-right {
      text-align: right;
    }
    .ql-align-justify {
      text-align: justify;
    }
    </style>
    </head>
    `;
    
      
    return (style + comment); 
  }
  