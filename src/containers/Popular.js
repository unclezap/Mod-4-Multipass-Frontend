import React from "react"
import QuizCard from '../components/QuizCard';
import { Container, Col, Row } from 'react-bootstrap';
import { api } from '../api';

class Popular extends React.Component {

    state = {
        sortedQuizzes: [],
        categories: [],
        showCategories: ["All"],
        allClick: true
    }

    componentDidMount() {
        this.getPopularQuizzes()
    }

    getPopularQuizzes() {
        api.quizzes.getPopularQuizzes().then(data => 
            this.setState(prev => {
                const keysArray = Object.keys(data);
                let categs = keysArray.map((timesTaken) => {
                    return data[timesTaken].map((thisQuiz) => {
                        return thisQuiz.category
                    })
                });
                categs = categs.flat();
                const cats = categs.filter((a, b) => categs.indexOf(a) === b);
                cats.push("All")
                return {sortedQuizzes: data, categories: cats, showCategories: []}
            })
        )}

    popularQuizzes = () => {
        const keysArray = Object.keys(this.state.sortedQuizzes).reverse()

        return keysArray.map((timesTaken) => {
            return this.state.sortedQuizzes[timesTaken].map((thisQuiz) => {
                return (
                <Col>
                    <QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"}/>
                    <h4>{`Times taken: ${timesTaken}`}</h4>
                </Col>
                )
            })
        })
    }

    allToggle = () => {
            this.setState(prev => ({
                allClick: !prev.allClick
            })
        )
    }

    buttonToggle = (event) => {
        event.preventDefault()
        const cat = event.target.value
        let newCats = this.state.showCategories
            if (this.state.showCategories.includes(cat)) {
                console.log("hi")
                newCats = newCats.filter( category => category !== cat)
            } else {
                console.log("goodbye")
                newCats.push(cat)
            }
        this.setState(prev => {
            return {showCategories: newCats}
        })
    }

    makeCategoryButtons = () => {

        return this.state.categories.map((category, index) => {
            return (
                <Col>
                    <button key={index} onClick={this.buttonToggle} value={category}>{category}</button>
                    {this.state.showCategories.includes(category) ? this.showCategoryQuizzes(category) : null}
                </Col>
                
            )
        })
    }

    showCategoryQuizzes = (category) => {
        const keysArray = Object.keys(this.state.sortedQuizzes).reverse()

        return keysArray.map((timesTaken) => {
            return this.state.sortedQuizzes[timesTaken].map((thisQuiz) => {
                return (
                    <Col>
                    { (thisQuiz.category === category) || category === "All" 
                        ? <>
                        <QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"}/>
                        <h4>{`Times taken: ${timesTaken}`}</h4>
                          </>
                        : null
                    } 
                    </Col>

                )
            })
        })
    }

    render () {
        return (
            <Container fluid="md">
                <div>
                <h4>Popular Quizzes</h4>
                <Row>
                {this.makeCategoryButtons()}
                </Row>
                </div>
            </Container>
        )
    }
}

export default Popular