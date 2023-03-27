import {connect} from "react-redux";

const Leaderboard = ({users}) => {

    return (
        <div className="center" >
            <h1>Leaderboard</h1>
                    <th>User</th>
                    <th></th>
                    <th>Answered</th>
                    <th>Questioned</th>
                    <th>Score</th>
                {users.map((user) => ( 
                        <tr key={user.id}>
                            <td >{<img src={user.avatarURL} alt ={`Avatar of ${user.name}`} className="avatar" />}</td>
                            <td>{user.name}</td>
                            <td >{Object.keys(user.answers).length}</td>
                            <td >{Object.keys(user.questions).length}</td>
                            <td >{Object.keys(user.answers).length + Object.keys(user.questions).length}</td>
                        </tr>
                    ))
                }
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }) => {
    let usersArray = [];
  
    if(users) {
      Object.keys(users).map(user => {
        const answered = Object.keys(users[user].answers).length;
        const questioned = Object.keys(users[user].questions).length;
        users[user]['answered'] = answered;
        users[user]['questioned'] = questioned;
        users[user]['score'] = answered + questioned;
        usersArray.push(users[user]);
      })
    }
  
    usersArray.sort((a, b) => b.score - a.score);
  
    return {
      authedUser,
      users: usersArray
    };
  };
  
  export default connect(mapStateToProps)(Leaderboard);
