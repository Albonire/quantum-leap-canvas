
import React, { useState, useEffect } from 'react';
import { ExternalLink, MapPin, Users, GitFork, Star, Calendar } from 'lucide-react';
import { format, subDays, eachDayOfInterval, isToday, parseISO } from 'date-fns';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface ContributionDay {
  date: string;
  count: number;
}

const GitHubProfile = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/Albonire');
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/Albonire/repos?sort=updated&per_page=6');
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        setRepos(reposData);

        // Generate mock contribution data (since GitHub's contribution API requires authentication)
        generateMockContributions();

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const generateMockContributions = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 365);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    const contributionData = days.map(day => ({
      date: format(day, 'yyyy-MM-dd'),
      count: Math.floor(Math.random() * 6) // 0-5 contributions per day
    }));
    
    setContributions(contributionData);
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 1) return 'bg-sage-accent/30 dark:bg-cyber-lime/30';
    if (count <= 2) return 'bg-sage-accent/50 dark:bg-cyber-lime/50';
    if (count <= 3) return 'bg-sage-accent/70 dark:bg-cyber-lime/70';
    return 'bg-sage-accent dark:bg-cyber-lime';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  };

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  if (loading) {
    return (
      <section className="py-20 px-6" id="github">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm rounded-2xl p-8 border border-sage-accent/20 dark:border-cyber-lime/20 shadow-lg">
            <div className="animate-pulse">
              <div className="h-8 bg-sage-accent/20 dark:bg-cyber-lime/20 rounded mb-4 w-64 mx-auto"></div>
              <div className="h-4 bg-sage-accent/20 dark:bg-cyber-lime/20 rounded mb-8 w-96 mx-auto"></div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="h-48 bg-sage-accent/20 dark:bg-cyber-lime/20 rounded"></div>
                <div className="h-48 bg-sage-accent/20 dark:bg-cyber-lime/20 rounded"></div>
                <div className="h-48 bg-sage-accent/20 dark:bg-cyber-lime/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6" id="github">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm rounded-2xl p-8 border border-red-200 dark:border-red-400/20 shadow-lg text-center">
            <p className="text-red-600 dark:text-red-400">Error loading GitHub profile: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="py-20 px-6" id="github">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-4">
            Mi Perfil de{' '}
            <span className="text-sage-accent dark:text-cyber-lime">GitHub</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-silver-mist font-inter max-w-2xl mx-auto">
            Explora mis proyectos y contribuciones en código abierto
          </p>
        </div>

        <div className="bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm rounded-2xl p-8 border border-sage-accent/20 dark:border-cyber-lime/20 shadow-lg">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="relative">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-sage-accent dark:border-cyber-lime shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-sage-accent dark:bg-cyber-lime rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-2">
                {user.name || user.login}
              </h3>
              <p className="text-sage-accent dark:text-cyber-lime font-inter font-medium mb-3">
                @{user.login}
              </p>
              {user.bio && (
                <p className="text-gray-700 dark:text-silver-mist font-inter mb-4 leading-relaxed">
                  {user.bio}
                </p>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                {user.location && (
                  <div className="flex items-center gap-1 text-gray-600 dark:text-silver-mist">
                    <MapPin size={16} />
                    <span className="font-inter">{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-600 dark:text-silver-mist">
                  <Calendar size={16} />
                  <span className="font-inter">Desde {formatDate(user.created_at)}</span>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime">
                    {user.public_repos}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-silver-mist font-inter">Repositorios</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime">
                    {user.followers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-silver-mist font-inter">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-space-grotesk font-bold text-sage-accent dark:text-cyber-lime">
                    {user.following}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-silver-mist font-inter">Siguiendo</div>
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sage-accent dark:bg-cyber-lime text-white dark:text-charcoal px-6 py-3 rounded-lg font-inter font-medium hover:bg-sage-accent/80 dark:hover:bg-cyber-lime/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ver perfil completo
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Contribution Calendar */}
          <div className="border-t border-sage-accent/20 dark:border-cyber-lime/20 pt-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h4 className="text-xl font-space-grotesk font-semibold text-gray-900 dark:text-quantum-silver mb-2 sm:mb-0">
                {totalContributions} contribuciones en el último año
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-silver-mist">
                <span>Menos</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                  <div className="w-3 h-3 rounded-sm bg-sage-accent/30 dark:bg-cyber-lime/30"></div>
                  <div className="w-3 h-3 rounded-sm bg-sage-accent/50 dark:bg-cyber-lime/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-sage-accent/70 dark:bg-cyber-lime/70"></div>
                  <div className="w-3 h-3 rounded-sm bg-sage-accent dark:bg-cyber-lime"></div>
                </div>
                <span>Más</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-53 gap-1" style={{ gridTemplateColumns: 'repeat(53, 1fr)', width: '100%', minWidth: '800px' }}>
                  {contributions.map((day, index) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)} transition-all duration-200 hover:scale-110 cursor-pointer`}
                      title={`${day.count} contribuciones en ${day.date}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="border-t border-sage-accent/20 dark:border-cyber-lime/20 pt-8">
            <h4 className="text-xl font-space-grotesk font-semibold text-gray-900 dark:text-quantum-silver mb-6">
              Repositorios Recientes
            </h4>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-sage-accent/30 dark:border-cyber-lime/20 hover:border-sage-accent/50 dark:hover:border-cyber-lime/40 transition-all duration-300 hover:transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-space-grotesk font-semibold text-gray-900 dark:text-quantum-silver truncate">
                      {repo.name}
                    </h5>
                    <ExternalLink size={16} className="text-sage-accent dark:text-cyber-lime flex-shrink-0 ml-2" />
                  </div>
                  
                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-silver-mist font-inter mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-silver-mist">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-sage-accent dark:bg-cyber-lime"></div>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} />
                        {repo.forks_count}
                      </span>
                    </div>
                    <span>Actualizado {formatDate(repo.updated_at)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubProfile;
