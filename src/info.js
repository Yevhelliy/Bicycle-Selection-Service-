import React from 'react';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
class Info extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h1>Інформаційна сторінка</h1>
                <div>
                    <h2>Середнє розважування велосипедиста на заднє колесо - 70%</h2>
                    <h2>Середнє розважування твого велосипеду на заднє колесо - 50%</h2>
                    <h2>Як поміряти зріст?</h2>
                    <img src={img1} alt="Опис зображення" style={{ width: '50%', height: 'auto' }} />
                </div>
                <div>
                    <h2>Як поміряти довжину рук?</h2>
                    <img src={img2} alt="Опис зображення" style={{ width: '50%', height: 'auto' }} />
                </div>
                <div>
                    <h2>Як поміряти довжину ніг?</h2>
                    <img src={img3} alt="Опис зображення" style={{ width: '50%', height: 'auto', margin: 'auto' }} />
                </div>
            </div>
        );
    }
}

export default Info;
