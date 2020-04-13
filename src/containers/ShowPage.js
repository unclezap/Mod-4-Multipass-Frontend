import React, { Component } from 'react';
import Browse from '../components/Browse';
import Quiz from "../components/Quiz";

//change what is passed to Browse

class ShowPage extends Component {
    render(){
        return(
            <div>
                {/* Details to come */}
                {/* {add a ternary to show either the browse component or quiz component?} */}
                {this.props.activePage === "browse" ? <Browse allQuizzes={[{title: "Magic Quiz", description: "All things Magic", user_id: 1, category: "Nerds", private: false}]}/> : <Quiz id={1}/>}
                
                <h3>This is the showpage.</h3>
            </div>
        )
    };
};

export default ShowPage;