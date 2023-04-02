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
                <p>Option 1: {question.optionOne.text}</p>
                <p>Votes: {question.optionOne.votes}</p>
                <h5 className="center">Or</h5>
                <p>Option 2: {question.optionTwo.text}</p>
                <p>Votes: {question.optionTwo.votes}</p>
                <div className="center">
                <p className="tweet-icon">View Question</p>
                </div>
            </div>
        </div>
        </Link>
    );
}
  
export default connect()(Question);