import {connect} from "react-redux";
import Answered from "./Answered";
import NonAnswered from "./NonAnswered";
import { useState } from "react";

const Dashboard = () => {

    const [view, setView] = useState("");

    const handleView = (type) => {
        setView(type);
      }


    return (
        <div className="center">
            { view === "" ? <h3>New Question</h3> : <h3>Done</h3>}
      
      <button className="btn" onClick={() => handleView("answered")} >Done</button>
      
      <button className="btn" onClick={() => handleView("")} >New Question</button>

      { view === "" ? <NonAnswered /> : <Answered />}
        </div>
    );
}

export default connect()(Dashboard);