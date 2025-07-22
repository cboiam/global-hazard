import OpenAI from "openai";
import { Event } from "../infrastructure/models/event";
import NodeCache from "node-cache";
import { cacheConstants } from "../infrastructure/constants";

class OpenAIEventsService {
    client: OpenAI;
    cache: NodeCache;

    constructor() {
        this.client = new OpenAI();
        this.cache = new NodeCache();
    }

    public getEventSummary = async (event: Event): Promise<string> => {
        const key = `${cacheConstants.keys.EVENT_SUMMARY}-${event.id}`;
        let data: string = this.cache.get(key);
        if (data) return data;

        const response = await this.client.responses.create({
            model: "gpt-4.1",
            instructions: "Show a summary of this event from Nasa EONET Api in a markdown format. skip ending messages",
            input: [
                {
                    role: "user",
                    content: JSON.stringify(event)
                },
                {
                    role: "user",
                    content: "Summarize the event data and its impacts"
                },
                {
                    role: "user",
                    content: "Get links to related content (youtube videos, social media posts and news)"
                }
            ]
        });

        const result = response.output_text.replace("```markdown", "")
            .replace("```", "");
        
        const ttl = event.closed ? cacheConstants.ttl.ONEWEEK : cacheConstants.ttl.ONEDAY;
        this.cache.set(key, result, ttl);
        return result;
    }
}

export { OpenAIEventsService }