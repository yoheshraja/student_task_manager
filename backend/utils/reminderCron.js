import cron from 'node-cron'
import { sendTaskRemainder } from './sendTaskRemainder.js'

cron.schedule("* 9 * * *",async()=>{
    await sendTaskRemainder()

});
