const JOOMLA_API = 'https://cms.spotyflex.com/api/index.php/v1/content/articles';
const JOOMLA_API_TOKEN = 'c2hhMjU2OjUxMDoxYzYyYTgzMWYwY2E2ZjgyYTFjODdjMmM5Y2Q3YTk2YjQ1NjM1NjIwMDVhN2ZjNjVmMzNjOWI3MTdjN2JhOGUy';

async function checkTags() {
    try {
        const res = await fetch(JOOMLA_API, {
            headers: {
                'Authorization': `Bearer ${JOOMLA_API_TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        const articles = data.data || [];
        articles.forEach((a, i) => {
            const tags = a.attributes?.tags || a.tags;
            if (tags) {
                console.log(`Article ${i} tags:`, JSON.stringify(tags));
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

checkTags();
