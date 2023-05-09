import App from '@app';
import UserRoute from '@routes/user.route';

const app = new App([new UserRoute()]);

app.listen();
