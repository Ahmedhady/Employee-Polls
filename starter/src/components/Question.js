import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Question = ({question, author}) => {
    return (
        <Link to={'questions/' + question.id} className="tweet">
        <div className="center">
            <div >
                <img className="avatar" src={author?.avatarURL} alt="Author" />
            </div>
            <div>
                <div >{question.author}</div>
                <p>{new Date(question.timestamp).toDateString()}</p>
                <p>View Question</p>
            </div>
        </div>
        </Link>
    );
}

export default connect()(Question);