export async function handler(event) {
    // ✅ CORS + preflight
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

    const slug = event.queryStringParameters?.slug;

    if (!slug) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing slug" }),
        };
    }

    const url = `https://triple-threat.leadway.ai/p/${slug}`;

    try {
        const response = await fetch(url);
        const html = await response.text();

        // 🔥 lấy __NEXT_DATA__
        const match = html.match(
            /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/
        );

        if (!match) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Cannot find __NEXT_DATA__" }),
            };
        }

        const json = JSON.parse(match[1]);

        const pageProps = json?.props?.pageProps;
        console.log(pageProps)
        // 🔥 thử nhiều format vì Beehiiv không cố định
        const post =
            pageProps?.post ||
            pageProps?.post_data ||
            pageProps?.publication_post ||
            null;

        if (!post) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Cannot find post data",
                    keys: Object.keys(pageProps || {}),
                }),
            };
        }

        // 🔥 lấy content
        const content =
            post?.content?.html ||
            post?.content_html ||
            post?.body_html ||
            "";

        if (!content) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Content empty",
                }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
            },
            body: content,
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                error: "Failed to fetch post detail",
                detail: error.message,
            }),
        };
    }
}