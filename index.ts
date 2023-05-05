import { PORT } from './src/config/index';
import app from './src/app';
import { createTables } from './src/initializeDB';

createTables();

app.listen(PORT, () => {
  console.log(`╭───────────────────────────────────────────────────╮`);
  console.log(`│                                                   │`);
  console.log(`│            App listening at port ${PORT}!            │`);
  console.log(`│                                                   │`);
  console.log(`╰───────────────────────────────────────────────────╯`);
});
