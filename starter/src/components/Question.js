import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Question = ({question, author}) => {
    return (
        <Link to={'questions/' + question.id} className="tweet">
         <img src={author?.avatarURL} alt="Author" className="avatar"/>
        <div className="tweet-info">
            <span></span>
            <div>
                <span >{question.author}</span>
                <div>{new Date(question.timestamp).toDateString()}</div>
                <p></p>
                <p className="tweet-icon">View Question</p>
            </div>
        </div>
        </Link>
    );
}

export default connect()(Question);