import app from './app'

const PORT: string = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});