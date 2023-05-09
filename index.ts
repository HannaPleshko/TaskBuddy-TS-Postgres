import App from './src/app';
import UserRoute from './src/routes/user.route';

const app = new App([new UserRoute()]);

app.listen();
