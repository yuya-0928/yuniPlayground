const { Octokit } = require("@octokit/rest");
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function createWebhooks() {
  try {
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      affiliation: 'owner,public'
    });

    for (let repo of repos) {
      const { data: hooks } = await octokit.repos.listWebhooks({
        owner: repo.owner.login,
        repo: repo.name
      });

      const discordWebhookExists = hooks.some(hook => hook.config.url === DISCORD_WEBHOOK_URL);

      if (discordWebhookExists) {
        console.log(`Discord webhook already exists for ${repo.name}, skipping...`);
        continue;
      }

      await octokit.repos.createWebhook({
        owner: repo.owner.login,
        repo: repo.name,
        config: {
          url: DISCORD_WEBHOOK_URL,
          content_type: 'json'
        },
        events: ['*']
      });
    }
  } catch (err) {
    console.error(err);
  }
}

createWebhooks();
