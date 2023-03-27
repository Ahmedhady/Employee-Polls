import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Question = ({question, author }) => {
    return (
        <Link to={`questions/${question.id}`} className="tweet">
         <img src={author.avatarURL} alt="Author" className="avatar"/>
        <div className="tweet-info">
            <div>
                <span>{author.name}</span>
                <div>{question.author}</div>
                <div>{formatDate(question.timestamp)}</div>
                <p>Option One: {question.optionOne.text}</p>
                <h5 className="center">Or</h5>
                <p>Option Two: {question.optionTwo.text}</p>
                <p className="center">
                <p className="tweet-icon">View Question</p>
                </p>
            </div>
        </div>
        </Link>
    );
}

export default connect()(Question);