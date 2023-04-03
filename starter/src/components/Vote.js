import {connect} from "react-redux";
import {Navigate, useLocation , useNavigate, useParams} from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

const Vote = ({dispatch, authedUser, question, author}) => {
    const navigate = useNavigate();

    if (!authedUser || !question || !author) {
        return <Navigate to=""/>;
    }

    const percentage = (option, question) => {
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return `${question.optionOne.votes.length/totalVotes*100} %`;
            case "optionTwo":
                return `${question.optionTwo.votes.length/totalVotes*100 } %`;
            default:
                return "";
        }
    };

    const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
    const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
    const isVoted = hasVotedOptionOne || hasVotedOptionTwo;

    return (
        <div className="center">
            <h1>Poll by {author.id}</h1>
            <div>
                <img src={author.avatarURL} alt="pic" className="avatar"/>
                <div>{author.name}</div>
                <div>{question.author}</div>
            </div>
            <div>
                <h2>Would you rather?</h2>
            </div>
            <div>
                <p>Option 1: {question.optionOne.text}</p>
                {isVoted && <p>{question.optionOne.votes.length} Votes - {percentage("optionOne", question)}</p>}
                {hasVotedOptionOne && <p>You voted Option 1</p>}
                
                <p>Option 2: {question.optionTwo.text}</p>
                {isVoted && <p>{question.optionTwo.votes.length} Votes - {percentage("optionTwo", question)}</p>}
                {hasVotedOptionTwo && <p>You voted Option 2</p>}
            </div>
        </div>
    );
};

const mapStateToProps = ({authedUser, users, questions}) => {
    try {
        const question = Object.values(questions).find((question) => (question.id === useParams().id));
        const author = Object.values(users).find((user) => (user.id === question.author));
        return {authedUser, question, author};
    } catch (e) {
        return <Navigate to="*"/>;
    }
};

export default withRouter(connect(mapStateToProps)(Vote));