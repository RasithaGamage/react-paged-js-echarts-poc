import "./App.css";
import { useEffect, useState, createRef } from "react";
import Content from "./content";
import "./core.css";
import { Previewer, Handler, registerHandlers } from "pagedjs";

function App() {

  // const [isAfterRendered, setIsAfterRendered] = useState(false);
  const refroot2 = createRef(null);
  const refpreview = createRef(null);

  useEffect(() => {
    const previewer = new Previewer();
    // setTimeout(() => {
      previewer.preview(
        refroot2.current.innerHTML,
        ["/core.css"],
        refpreview.current
      );
      // previewer.preview(
      //   document.querySelector("#root2")?.innerHTML,
      //   ["/core.css"],
      //   document.querySelector("#preview")
      // )
    // }, 1000);
  }, []);

  return <>
  <button onClick={()=>{window.print()}} id="buttonPrint" >Print</button>
  <div id="root2" ref={refroot2}>
    <div>
    <Content> </Content>
    </div>
  </div>
  <div id="preview"  ref={refpreview}/>
    
  </>;
}




export default App;
