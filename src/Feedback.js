import React, { useState } from 'react';
import {TextField, Button, Box, Rating, Typography, Card, CardHeader, CardContent} from '@mui/material';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логіка обробки форми

        // Змінити стан, щоб показати повідомлення про важливість відгуків.
        setIsSubmitted(true);

        // Очистити стан після відправлення форми.
        setName('');
        setEmail('');
        setComment('');
        setRating(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Залиште свій відгук
                </Typography>
                <TextField
                    label="Ім'я"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Електронна пошта"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Коментар"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Надіслати відгук
                </Button>
                {isSubmitted && (
                    <Typography sx={{ color: 'green', marginBottom: 2 }}>
                        Дякуємо за ваш відгук! Ваші думки дуже важливі для нас.
                    </Typography>
                )}
            </Box>
            <div>
                <h2>Відгуки користувачів</h2>
                <Card style={{ width: '70%', margin: 'auto' }}>
                    <CardHeader title="Олексій" />
                    <CardContent>
                        <Typography>Ваш сервіс дійсно корисний! Дякую за чудовий досвід!</Typography>
                    </CardContent>
                </Card>
                <Card style={{ width: '70%', margin: 'auto' }}>
                    <CardHeader title="Андрій" />
                    <CardContent>
                        <Typography>Ваш сервіс став для мене великим помічником у виборі велосипеда. Введення параметрів було легким та зручним процесом. Я вказав свій зріст, довжину ніг і рук, обрав тип велосипеда (гірський), та визначив свій стиль їзди.
                            Отримана рекомендація щодо розміру рами виявилася ідеальною. Ваш сервіс надав точний та персоналізований результат, що сприяє комфорту та ефективності під час катання. Дякую за корисний інструмент, який робить процес вибору велосипеда настільки простим та приємним!</Typography>
                    </CardContent>
                </Card>
                <Card style={{ width: '70%', margin: 'auto', marginTop: '20px' }}>
                    <CardHeader title="Валентин" />
                    <CardContent>
                        <Typography>Ваш сервіс виявився дуже корисним при виборі велосипеда. Введення зросту, довжини ніг і рук, а також обрання типу велосипеда та стилю їзди дозволило мені отримати точну рекомендацію для розміру рами.
                            Зараз я впевнено знаю, що вибраний велосипед буде не лише стильним, але й максимально комфортним для моїх параметрів. Дякую за відмінний сервіс, який робить процес вибору велосипеда надзвичайно простим та ефективним!</Typography>
                    </CardContent>
                </Card>

            </div>
        </form>
    );
};

export default FeedbackForm;
