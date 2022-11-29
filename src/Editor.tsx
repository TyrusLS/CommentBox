
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/style.css"


const Editor: React.FC<any> = ({commentToParent}) => {
  const [startValue, setValue] = useState("");
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { align: [] }
        ],
        ["image"],
        ["clean"]
      ]
    },
    clipboard: { matchVisual: false }
  };
const format = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "image",
    "align"
  ]


  return (
    <div className="Editor">
   
      <ReactQuill  
      value={startValue} 
      
      onChange={(value) => {setValue(value) ; commentToParent(value)}    }
      modules={modules}
      formats={format}
      />
    
     
    </div>
  );
};


export default Editor;
