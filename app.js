import express from 'express'
import SchoolRoutes from './Routes/SchoolRoutes.js';

const app=express();

app.set("PORT",3000)

app.use(express.urlencoded());
app.use(express.json());

app.use("/schoolAPI",SchoolRoutes)

// Fallback for all unmatched routes
app.use((req, res) => {
    return res.status(404).json({ error: "requested resource not found" });
});

const start = () => {
    app.listen(app.get('PORT'), () => {
        console.log(`Server listening on port ${app.get('PORT')}`);
    });
};

start();