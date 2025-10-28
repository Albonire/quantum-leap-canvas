export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = 'Albonire';

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`, { headers }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      const errorBody = {
        error: 'Failed to fetch data from GitHub',
        userStatus: userResponse.status,
        repoStatus: reposResponse.status,
      };
      return new Response(JSON.stringify(errorBody), {
        status: 502, // Bad Gateway, as we are a proxy
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();

    return new Response(JSON.stringify({ userData, reposData }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}