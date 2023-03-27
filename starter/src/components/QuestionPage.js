import {connect} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { addAnswerQuestion } from "../actions/questions";
import { handleAddAnswer } from "../actions/questions";

const QuestionPage = ({dispatch, authedUser, question, author}) => {
    const navigate = useNavigate();

    if (!authedUser || !question || !author) {
        return <Navigate to="*"/>;
    }

    const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
    const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    const handleOptionOne = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id,"optionTwo", author));
        navigate("/");
    };

    const handleOptionTwo = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id,"optionTwo", author));
        navigate("/");
    };

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

    return (
        <div className="center">
            <h1>Poll by {author.id}</h1>
            <div>
                <img src={author.avatarURL} alt="Profile" className="avatar"/>
                <div>{author.name}</div>
                <div>{question.author}</div>
            </div>
            <div>
                <h2>Would you rather?</h2>
            </div>
            <div>
                <button onClick={handleOptionOne} disabled={hasVoted}
                        className={"center" + (hasVotedForOptionOne ? "center" : "")}>
                    <div className={hasVotedForOptionOne ? "chosen" : ""}>
                        <p>{question.optionOne.text}</p>
                        {!hasVoted &&
                        <p>Click</p>
                        }
                        {hasVoted &&
                        <p>Votes: {question.optionOne.votes.length} ({calcPercentage("optionOne", question)})</p>
                        }
                    </div>
                </button>
                <button onClick={handleOptionTwo} disabled={hasVoted}
                        className={"center" + (hasVotedForOptionTwo ? "center" : "")}>
                    <p>{question.optionTwo.text}</p>
                    {!hasVoted &&
                    <p>Click</p>
                    }
                    {hasVoted &&
                    <p>Votes: {question.optionTwo.votes.length} ({calcPercentage("optionTwo", question)})</p>
                    }
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = ({authedUser, users, questions}) => {
    try {
        const question = Object.values(questions).find((question) => question.id === useParams().id);
        const author = Object.values(users).find((user) => user.id === question.author);
        return {authedUser, question, author};
    } catch (e) {
        return <Navigate to="*"/>;
    }
};

export default connect(mapStateToProps)(QuestionPage);