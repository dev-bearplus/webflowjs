// /netlify/functions/fetchPosts.js
export async function handler(event, context) {
    // Handle preflight request (CORS)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        };
    }

    const url = "https://triple-threat.leadway.ai/posts";

    try {
        const response = await fetch(url);
        const html = await response.text();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*", // dev cho nhanh, sau tighten lại
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: html,
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                error: "Failed to fetch posts",
                detail: error.message,
            }),
        };
    }
}