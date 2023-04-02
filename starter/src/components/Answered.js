import {connect} from "react-redux";
import Question from "./Question";

const Answered = ({authedUser, questions, users}) => {

    const done = (question) => (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser));

    return (
        <div>
            <h2 className="center">Done</h2>
            <ul className="dashboard-list">
                {questions.filter(done).map((question) => (
                        <li key={question.id}>
                            <Question question={question} author={users[question.author]}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Answered);