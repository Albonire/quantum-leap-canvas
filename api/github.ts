import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
  const USERNAME = 'Albonire';

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    // Fetch user data and repositories in parallel
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`, { headers }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      // Handle potential errors for each request
      const userError = !userResponse.ok ? await userResponse.text() : null;
      const repoError = !reposResponse.ok ? await reposResponse.text() : null;
      return res.status(500).json({
        error: 'Failed to fetch data from GitHub',
        userStatus: userResponse.status,
        repoStatus: reposResponse.status,
        userError,
        repoError,
      });
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();

    // Set cache headers to reduce API calls on Vercel's side
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache for 1 hour

    return res.status(200).json({ userData, reposData });

  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
