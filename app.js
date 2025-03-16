const express = require("express");
const app = express();
const PORT = 3000;

// Parses form data
app.use(express.urlencoded({ extended: true })); 
app.set('view engine','ejs');
app.use(express.static('public'));


// in-memory storage
let workouts = [];

// Serve html file
app.get('/', (req,res) => {
    res.render('index');
});

// Handle form submission
app.post("/add-workout", (req,res) => {
    const workout = {
        type: req.body.workoutType,
        duration: req.body.duration,
        intensity: req.body.intensity,
        date: req.body.date,
        notes: req.body.notes
    };

    // Store workout data to our memory
    workouts.push(workout);

    res.redirect("summary");
});

// Display workouts at summary route
app.get("/summary", (req,res) => {
    res.render('summary', { workouts: workouts });
})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});

