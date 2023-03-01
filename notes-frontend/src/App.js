import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
// import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import { useState } from "react";

function App() {

  const [myStyle, setMyStyle] = useState('')

  const styleArr = ['','dark','blue','red'];

  const toggleStyle = () => {
    let currentStyle = styleArr.indexOf(myStyle);
    if(currentStyle == -1){
      currentStyle += 1;
    }
    setMyStyle(styleArr[currentStyle+1]);
  }

  return (
    <Router>
      <div className = {`container ${myStyle}`}>
        <div className ="app">
          <div className="app-header">
            <h1>Note List</h1>
            <button className="styler" onClick={toggleStyle}>
              <img src="https://img.icons8.com/ios/50/null/horizontal-settings-mixer--v1.png"/>
            <span className="tooltiptext">Change Colour</span>
            </button>
          </div>
          <Routes>
            <Route path="/" exact element={<NotesListPage />} />
            <Route path="/note/:id" exact element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
