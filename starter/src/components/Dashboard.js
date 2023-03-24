import {connect} from "react-redux";
import Question from "./Question";

const Dashboard = ({authedUser, questions, users}) => {

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));

    return (
        <div>
            <h1 className="center">Dashboard</h1>

            <h2 className="center">New Questions</h2>
            <ul className="center">
                {questions
                    .filter(unanswered)
                    .map((question) => (
                        <li key={question.id}>
                            <Question question={question} author={users[question.author]}/>
                        </li>
                    ))}
            </ul>
            <h2 className="center">Answered Questions</h2>
            <ul className="center">
                {questions
                    .filter(answered)
                    .map((question) => (
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

export default connect(mapStateToProps)(Dashboard);