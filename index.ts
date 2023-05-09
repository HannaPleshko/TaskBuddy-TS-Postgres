import App from '@app';
import UserRoute from '@routes/user.route';
import SkillRoute from '@routes/skill.route';

const app = new App([new UserRoute(), new SkillRoute()]);

app.listen();
