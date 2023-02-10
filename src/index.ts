import { app } from './app';
import { CONFIG } from './config';

app.listen(CONFIG.SERVER.PORT, () => {
  console.log(`Server up and running on port ${CONFIG.SERVER.PORT}`);
});
