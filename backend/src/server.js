const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const healthRoutes = require('./routes/health');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/health', healthRoutes);
app.use('/api/notes', notesRoutes);

// Only start server if this file is run directly
// NOT when imported by tests
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;