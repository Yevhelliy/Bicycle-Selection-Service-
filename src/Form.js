import React, { useState } from 'react';
import './Form.css';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const HeightForm = () => {
  const [height, setHeight] = useState('');
  const [legLength, setLegLength] = useState('');
  const [armLength, setArmLength] = useState('');
  const [bikeType, setBikeType] = useState('');
  const [comfortLevel, setComfortLevel] = useState('');
  const [frameSize, setFrameSize] = useState(null);

  const calculateFrameSize = (legLength, coefficient1, coefficient2, roundingFactor) => {
    const innerLegLengthInInches = legLength * coefficient2;
    let frameSize = 0;

    if (bikeType === 'roadBike') {
      frameSize = ((height * 0.66) + (legLength * 0.66) - (armLength * 0.57)) / 2.54;
    } else if (bikeType === 'crossBike') {
      frameSize = height * 0.8 / 2.54;
    } else {
      frameSize = (armLength * coefficient1 / 2.54) + (innerLegLengthInInches / 2.54);
    }

    if (roundingFactor === 'comfortable') {
      frameSize = Math.ceil(frameSize);
    } else if (roundingFactor === 'active') {
      frameSize = Math.floor(frameSize);
    } else {
      frameSize = frameSize.toFixed(2);
    }

    return frameSize;
  };

  const isValidInput = (input) => !isNaN(input);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidInput(height) || !isValidInput(legLength) || !isValidInput(armLength)) {
      console.error('Будь ласка, введіть коректні числові значення для усіх полів.');
      return;
    }

    let coefficient1, coefficient2, roundingFactor;

    switch (bikeType) {
      case 'mtb':
        coefficient1 = 0.57;
        coefficient2 = 0.226;
        break;
      case 'roadBike':
        coefficient1 = 0.66;
        coefficient2 = 0.66;
        break;
      case 'crossBike':
        coefficient1 = 0.63;
        coefficient2 = 0.259;
        break;
      default:
        coefficient1 = 0.57;
        coefficient2 = 0.226;
    }

    switch (comfortLevel) {
      case 'comfortable':
        roundingFactor = 'comfortable';
        break;
      case 'active':
        roundingFactor = 'active';
        break;
      default:
        roundingFactor = 'normal';
    }

    const calculatedFrameSize = calculateFrameSize(legLength, coefficient1, coefficient2, roundingFactor);
    setFrameSize(calculatedFrameSize);
  };

  return (
      <Container className="form-container">
        <Typography variant="h4">Введіть параметри для розрахунку розміру рами</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl fullWidth>
              <TextField
                  id="height"
                  label="Ріст (см)"
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  error={!isValidInput(height)}
                  variant="filled"
                  style={{ background: '#ffffff', color: '#000000' }} // Білий фон та чорний текст
              />
              {!isValidInput(height) && (
                  <FormHelperText error>Будь ласка, введіть коректне числове значення в сантиметрах.</FormHelperText>
              )}
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <TextField
                  id="legLength"
                  style={{ background: '#ffffff' }}
                  label="Довжина ніг (см)"
                  type="text"
                  value={legLength}
                  onChange={(e) => setLegLength(e.target.value)}
                  error={!isValidInput(legLength)}
                  variant="filled"
              />
              {!isValidInput(legLength) && (
                  <FormHelperText error>Будь ласка, введіть коректне числове значення в сантиметрах.</FormHelperText>
              )}
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <TextField
                  id="armLength"
                  style={{ background: '#ffffff' }}
                  label="Довжина рук (см)"
                  type="text"
                  value={armLength}
                  onChange={(e) => setArmLength(e.target.value)}
                  error={!isValidInput(armLength)}
                  variant="filled"
              />
              {!isValidInput(armLength) && (
                  <FormHelperText error>Будь ласка, введіть коректне числове значення в сантиметрах.</FormHelperText>
              )}
            </FormControl>
          </div>

          <FormControl fullWidth>
            <InputLabel ba>Тип велосипеда</InputLabel>
            <Select value={bikeType} onChange={(e) => setBikeType(e.target.value)}>
              <MenuItem value="">Оберіть тип велосипеда</MenuItem>
              <MenuItem value="mtb">Гірський велосипед</MenuItem>
              <MenuItem value="roadBike">Шосейний велосипед</MenuItem>
              <MenuItem value="crossBike">Трекінговий велосипед</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Стиль їзди</InputLabel>
            <Select value={comfortLevel} onChange={(e) => setComfortLevel(e.target.value)}>
              <MenuItem value="">Оберіть стиль їзди</MenuItem>
              <MenuItem value="comfortable">Комфортний</MenuItem>
              <MenuItem value="active">Активний</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained">
            Розрахувати
          </Button>
        </form>

        {frameSize !== null && (
            <div>
              <Typography variant="h5">Розмір потрібної вам рами:</Typography>
              <Typography variant="h4" align="center">
                {frameSize}"
              </Typography>
            </div>
        )}
      </Container>
  );
};

export default HeightForm;
