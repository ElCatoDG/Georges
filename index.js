const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const autoeat = require('mineflayer-auto-eat');
const collectBlock = require('mineflayer-collectblock');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const bot = mineflayer.createBot({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '25565'),
  username: 'Georges',
  auth: 'offline'
});

bot.loadPlugin(pathfinder);
bot.loadPlugin(autoeat);
bot.loadPlugin(collectBlock);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

bot.once('spawn', () => {
  const defaultMove = new Movements(bot);
  bot.pathfinder.setMovements(defaultMove);
  bot.chat("¡Hola! Soy Georges. Estoy listo para ayudarte.");
});

bot.on('chat', async (username, message) => {
  if (username === bot.username) return;

  if (message.startsWith('georges, ve a ')) {
    const parts = message.split(' ');
    const x = parseInt(parts[3]);
    const y = parseInt(parts[4]);
    const z = parseInt(parts[5]);
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      const goal = new goals.GoalBlock(x, y, z);
      bot.pathfinder.setGoal(goal);
    }
    return;
  }

  if (message.toLowerCase().includes('georges')) {
    bot.chat("Pensando...");
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: message }]
      });
      bot.chat(completion.data.choices[0].message.content.slice(0, 100));
    } catch (err) {
      console.log("Error con OpenAI:", err.message);
      bot.chat("No puedo responder ahora.");
    }
  }
});