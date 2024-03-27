import React, { useState } from 'react';
import {
    Button,
    Typography,
    Container,
    FormControl,
    InputLabel,
    FilledInput,
    Select,
    MenuItem,
} from '@mui/material';
import './pendant.css';

const Pendant = () => {
    const [personWeight, setPersonWeight] = useState('');
    const [entertainmentPercentage, setEntertainmentPercentage] = useState('');
    const [bikeWeight, setBikeWeight] = useState('');
    const [bikeEntertainment, setBikeEntertainment] = useState('');
    const [suspensionTravel, setSuspensionTravel] = useState('');
    const [shockTravel, setShockTravel] = useState('');
    const [calculationType, setCalculationType] = useState('');
    const [resultData, setResultData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const baseParams = {
            weight: personWeight,
            rider_weight_distribution: entertainmentPercentage,
            weight_bike_without_wheels: bikeWeight,
            bike_weight_distribution: bikeEntertainment,
            suspension_travel: suspensionTravel,
            shock_absorber_stroke: shockTravel,
            sag: calculationType === 'stiffness' ? '26' : '1',
            spring_stiffness: '450',
            preload: calculationType === 'stiffness' ? '0' : '1',
        };

        let apiUrl = '';
        let queryParameters = new URLSearchParams(baseParams).toString();

        switch (calculationType) {
            case 'sag':
                apiUrl = `http://localhost:8080/api/bike/sag?${queryParameters}`;
                break;
            case 'preload':
                apiUrl = `http://localhost:8080/api/bike/preload?${queryParameters}`;
                break;
            case 'stiffness':
                apiUrl = `http://localhost:8080/api/bike/stiffness?${queryParameters}`;
                break;
            default:
                console.error('Invalid comfort level');
                return;
        }

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
            }

            const data = await response.json();
            setResultData(data);
        } catch (error) {
            console.error('Помилка при виконанні запиту:', error.message);
            console.log({ apiUrl });
            setError('Помилка при виконанні запиту. Будь ласка, спробуйте ще раз.');
        }
    };

    return (
        <Container className="your-form-container">
            <Typography variant="h4">Введіть параметри</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="personWeight">Вага людини (кг)</InputLabel>
                    <FilledInput
                        id="personWeight"
                        style={{ background: '#ffffff' }}
                        type="text"
                        value={personWeight}
                        onChange={(e) => setPersonWeight(e.target.value)}
                        variant="filled"
                        helperText="Please select your currency"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="entertainmentPercentage">Розважування на заднє колесо (%)</InputLabel>
                    <FilledInput
                        id="entertainmentPercentage"
                        style={{ background: '#ffffff' }}
                        type="text"
                        value={entertainmentPercentage}
                        onChange={(e) => setEntertainmentPercentage(e.target.value)}
                        helperText="Please select your currency"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="bikeWeight">Вага вашого байка (кг)</InputLabel>
                    <FilledInput
                        id="bikeWeight"
                        style={{ background: '#ffffff' }}
                        type="text"
                        value={bikeWeight}
                        onChange={(e) => setBikeWeight(e.target.value)}
                        helperText="Please select your currency"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="bikeEntertainment">Розважування байка на заднє колесо</InputLabel>
                    <FilledInput
                        id="bikeEntertainment"
                        style={{ background: '#ffffff' }}
                        type="text"
                        value={bikeEntertainment}
                        onChange={(e) => setBikeEntertainment(e.target.value)}
                        helperText="Please select your currency"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="suspensionTravel">Хід підвіски (мм)</InputLabel>
                    <FilledInput
                        id="suspensionTravel"
                        style={{ background: '#ffffff' }}
                        type="text"
                        value={suspensionTravel}
                        onChange={(e) => setSuspensionTravel(e.target.value)}
                        helperText="Please select your currency"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="shockTravel">Хід амортизатора (мм)</InputLabel>
                    <FilledInput
                        id="shockTravel"
                        style={{ background: '#ffffff' }}
                        type="text"
                        value={shockTravel}
                        onChange={(e) => setShockTravel(e.target.value)}
                        helperText="Please select your currency"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel>Що потрібно розрахувати?</InputLabel>
                    <Select
                        value={calculationType}
                        onChange={(e) => setCalculationType(e.target.value)}
                    >
                        <MenuItem value="">Оберіть що потрібно розрахувати</MenuItem>
                        <MenuItem value="sag">Sag</MenuItem>
                        <MenuItem value="preload">Preload</MenuItem>
                        <MenuItem value="stiffness">Stiffness</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">
                    Відправити
                </Button>
            </form>

            {resultData && (
                <div  className="result-container">
                    <Typography variant="h5">Результати запиту:</Typography>
                    {calculationType === 'sag' && resultData.sag !== undefined ? (
                        <Typography align="center" variant="h4">{JSON.stringify(resultData.sag, null, 2)}</Typography>
                    ) : null}

                    {calculationType === 'preload' && resultData.preload !== undefined ? (
                        <Typography  align="center" variant="h4">{JSON.stringify(resultData.preload, null, 2)}</Typography>
                    ) : null}

                    {calculationType === 'stiffness' && resultData.stiffness !== undefined ? (
                        <Typography  align="center" variant="h4" >{JSON.stringify(resultData.stiffness, null, 2)}</Typography>
                    ) : null}
                </div>
            )}

            {error && (
                <div className="error-container">
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                </div>
            )}
        </Container>
    );
};

export default Pendant;
