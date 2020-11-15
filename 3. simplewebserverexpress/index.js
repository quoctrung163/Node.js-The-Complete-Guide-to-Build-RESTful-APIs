const express = require('express');
const app = express();
const validateCourse = require('./validateCourse');

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Hello world! with dosomething');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID not found!');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(res.body);
  if (error)
    return res.status(400)
      .send(error.details[0].message);

  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send('Name is required and should be minium 3 character');

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // look up the course
  // if not exist, return 404
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) res.status(404).send('The course with the given ID not found!');

  // validate
  // if invalid, return 400 bad request
  const { error } = validateCourse(res.body);
  if (error)
    return res.status(400)
      .send(error.details[0].message);

  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send('Name is required and should be minium 3 character');

  // update course
  // return the updated course
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // look up the course
  // not existing return 404
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID not found!');

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the same course
  res.send(course);
})

app.listen(port, () => console.log(`Listening on port ${port}...`));
