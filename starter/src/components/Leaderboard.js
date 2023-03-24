import {connect} from "react-redux";

const Leaderboard = ({users}) => {

    return (
        <div >
            <h1 className="center">Leaderboard</h1>
                    <th >User</th>
                    <th >Answered Questions</th>
                    <th >Created Questions</th>
                    <th >Score</th>
                {users.map((user) => ( 
                        <tr key={user.id}>
                            <td >{<img src={user.avatarURL} alt ={`Avatar of ${user.name}`} className="avatar" />}{user.name}</td>
                            <td >{Object.keys(user.answers).length}</td>
                            <td >{user.questions.length}</td>
                            <td >{Object.keys(user.answers).length+user.questions.length}</td>
                        </tr>
                    ))
                }
        </div>
    );
};

const mapStateToProps = ({users}) => ({
    users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);
