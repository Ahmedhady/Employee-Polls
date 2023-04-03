import {connect} from "react-redux";
import {Navigate, useLocation , useNavigate, useParams} from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import Vote from "./Vote";
import UnVote from "./UnVote";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

const VotePage = ({dispatch, authedUser, question, author}) => {
    const navigate = useNavigate();

    if (!authedUser || !question || !author) {
        return <Navigate to=""/>;
    }


    const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
    const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
    const isVoted = hasVotedOptionOne || hasVotedOptionTwo;

    return (
        <div className="center">
            { !isVoted ? <UnVote /> : <Vote />}
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

export default withRouter(connect(mapStateToProps)(VotePage));