import {useState} from "react";
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/questions";
import {useNavigate} from "react-router-dom";

const NewQuestion = ({dispatch}) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const handleFirstOptionChange = (event) => {
        setFirstOption(event.target.value);
    };

    const handleSecondOptionChange = (event) => {
        setSecondOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/");
    };

    const isEmpty = () => firstOption===""  || secondOption==="";

    return (
        <div className="center">
            <h1>Would You Rather</h1>
            <h2>Create Your own Poll</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <textarea className="textarea" value={firstOption} onChange={handleFirstOptionChange} placeholder={"Option One"} />
                </p>
                <p>
                    <textarea className="textarea" value={secondOption} onChange={handleSecondOptionChange} placeholder={"Option Two"} />
                </p>
                    <button className="btn" type="submit" disabled={isEmpty()}>Submit</button>
            </form>
        </div>
    );
};

export default connect()(NewQuestion);