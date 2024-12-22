import { arabize } from 'arabize';

(
  async () => {
    try {
      const result = await arabize('Mar7aban ya sadiqi, kayfa 7alak?');
      console.log(result); // مرحباً يا صديقي ٬ كيف حالك ؟
    } catch (err) {
      console.error(err);
    }
  }
)();