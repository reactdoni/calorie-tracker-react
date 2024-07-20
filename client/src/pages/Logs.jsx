import React, {useEffect, useState} from 'react'
import '../styles/Logs.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "@ramonak/react-progress-bar"
import NavbarHealthy from '../components/NavbarHealthy';
import { Link } from "react-router-dom";
import axios from 'axios';
import Popup from '../components/Popup';

function Logs({isAuthenticated}) {

    const [caloriesBreakfast, setCaloriesBreakfast] = useState(0);
    const [caloriesLunch, setCaloriesLunch] = useState(0);
    const [caloriesDinner, setCaloriesDinner] = useState(0);
    const [caloriesSnack, setCaloriesSnack] = useState(0);
    const [caloriesGoal, setCaloriesGoal] = useState(0);

    let jwtToken = sessionStorage.getItem("token");

    useEffect(() => {
        const getCalories = async () => {
            try {
                if(isAuthenticated) {
                    const response = await axios.get('/logs', {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    });
                    setCaloriesBreakfast(response.data.calories_breakfast);
                    setCaloriesLunch(response.data.calories_lunch);
                    setCaloriesDinner(response.data.calories_dinner);
                    setCaloriesSnack(response.data.calories_snack);
                    setCaloriesGoal(response.data.calories_goal);
                }
            } catch(error) {
                console.error('Error sending token', error);
            }
        };

        getCalories();
    }, []);

    const updateCalories = (formData) => {
        if( formData.caloriesBreakfast )
            setCaloriesBreakfast(parseInt(formData.caloriesBreakfast));

        if( formData.caloriesLunch )
            setCaloriesLunch(parseInt(formData.caloriesLunch));

        if( formData.caloriesDinner )
            setCaloriesDinner(parseInt(formData.caloriesDinner));

        if( formData.caloriesSnack )
            setCaloriesSnack(parseInt(formData.caloriesSnack));

        if( formData.caloriesGoal )
            setCaloriesGoal(parseInt(formData.caloriesGoal));
    };
    

    return (
        <>
        <NavbarHealthy />
        <div className="caloriesMain">
            <p className="myDiaryText">My Diary</p>
            <Popup updateCalories={updateCalories} />
            <div className="flexContent">
                <div className="leftContent">
                    <div className="caloriesSection">
                        <div className="caloriesSubSection">
                            <p className="caloriesText">Calories Today</p>
                            <div className="caloriesCount">
                                <h1>{(caloriesBreakfast+caloriesLunch+caloriesDinner+caloriesSnack)}</h1><span style={{alignContent:'center'}}>kcal</span>
                            </div>
                        </div>

                        <div className="caloriesSubSection">
                            <p className="caloriesText">Calorie Goal</p>
                            <div className="caloriesCount">
                                <h1>{caloriesGoal}</h1><span style={{alignContent:'center'}}>kcal</span>
                            </div>
                        </div>
                    </div>

                    <div className="macros">
                        <div className="carb">
                            <p>Carbs</p>
                            <ProgressBar width="100px" bgColor="green" baseBgColor="rgb(58, 58, 58, 0.3)" animateOnRender="true" completed={60} />
                        </div>

                        <div className="fat">
                            <p>Fats</p>
                            <ProgressBar width="100px" baseBgColor="rgb(58, 58, 58, 0.3)" animateOnRender="true" completed={45} />
                        </div>

                        <div className="protein">
                            <p>Proteins</p>
                            <ProgressBar width="100px" bgColor="aqua" baseBgColor="rgb(58, 58, 58, 0.3)" animateOnRender="true" completed={88} />
                        </div>
                    </div>
                </div>

                <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar
                    value={Math.floor(((caloriesBreakfast+caloriesLunch+caloriesDinner+caloriesSnack)/caloriesGoal)*100)}
                    text={`${Math.floor(((caloriesBreakfast+caloriesLunch+caloriesDinner+caloriesSnack)/caloriesGoal)*100)}%`}
                    styles={buildStyles({
                        textColor: "black",
                        pathColor: "rgba(8,199,37, 1.0)",
                        trailColor: "rgba(8,199,37, 0.3)",
                    })}
                />
                </div>
            </div>

            <p className="mealsTodayText">Meals Today</p>

            <div className="firstMeals">
                <div className="breakfast">
                    <p style={{fontSize:'24px'}}>Breakfast</p>
                    <p style={{margin: 0, padding: 0}}>Bread</p>
                    <p style={{margin: 0, padding: 0}}>Eggs</p>

                    <div className="breakfastAlign">
                        <p style={{margin: 0, padding: 0, fontSize:"42px"}}>{caloriesBreakfast}</p><p style={{alignContent:'end'}}>Kcal</p> 
                    </div>
                    <Link to="/seemore" style={{paddingLeft: '70%'}}>See More</Link>
                </div>

                <div className="lunch">
                    <p style={{fontSize:'24px'}}>Lunch</p>
                    <p style={{margin: 0, padding: 0}}>Bread</p>
                    <p style={{margin: 0, padding: 0}}>Eggs</p>

                    <div className="lunchAlign">
                        <p style={{margin: 0, padding: 0, fontSize:"42px"}}>{caloriesLunch}</p><p style={{alignContent:'end'}}>Kcal</p> 
                    </div>
                    <Link to="/seemore" style={{paddingLeft: '70%'}}>See More</Link>
                </div>
            </div>

            <div className="secondMeals">
                <div className="dinner">
                    <p style={{fontSize:'24px'}}>Dinner</p>
                    <p style={{margin: 0, padding: 0}}>Chicken Breast</p>
                    <p style={{margin: 0, padding: 0}}>Fries</p>

                    <div className="dinnerAlign">
                        <p style={{margin: 0, padding: 0, fontSize:"42px"}}>{caloriesDinner}</p><p style={{alignContent:'end'}}>Kcal</p> 
                    </div>
                    <Link to="/seemore" style={{paddingLeft: '70%'}}>See More</Link>
                </div>

                <div className="snack">
                <p style={{fontSize:'24px'}}>Snacks</p>
                    <p style={{margin: 0, padding: 0}}>Chocolate</p>
                    <p style={{margin: 0, padding: 0}}>Chips</p>

                    <div className="snackAlign">
                        <p style={{margin: 0, padding: 0, fontSize:"42px"}}>{caloriesSnack}</p><p style={{alignContent:'end'}}>Kcal</p> 
                    </div>
                    <Link to="/seemore" style={{paddingLeft: '70%'}}>See More</Link>
                </div>
            </div>
        </div>
    </>
    )
}

export default Logs