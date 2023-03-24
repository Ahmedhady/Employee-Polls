import { connect } from "react-redux";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

const Answered = ({questionIds, authedUser, questions}) => {
  return (
    <ul>
      {
        questionIds && questionIds.map((id) => {
          if (questions[id].optionOne.votes.includes(authedUser) ||
              questions[id].optionTwo.votes.includes(authedUser)
          ) {
            return (
              <li className="small-question-card" key={id}>
                <Question done={false} id={id} />
              </li>
            )}
          }
        )
      }
    </ul>
  )
}

const mapStateToProps = ({ authedUser, questions }) => {

  return {
    authedUser,
    questions,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
};

export default connect(mapStateToProps)(Answered);