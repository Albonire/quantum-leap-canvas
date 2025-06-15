
'use client';

import { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Calendar, MapPin, Users, Book } from 'lucide-react';
import CyberButton from './CyberButton';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  created_at: string;
  company: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
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

        // Generate mock contribution data (since GitHub API doesn't provide this without authentication)
        const mockContributions = generateMockContributions();
        setContributions(mockContributions);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const generateMockContributions = (): ContributionDay[] => {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const date = new Date(d);
      const count = Math.floor(Math.random() * 15); // Random commits between 0-14
      const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4;
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    return contributions;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getContributionColor = (level: number): string => {
    const colors = {
      0: 'bg-gray-100 dark:bg-gray-800',
      1: 'bg-sage-accent/20 dark:bg-cyber-lime/20',
      2: 'bg-sage-accent/40 dark:bg-cyber-lime/40',
      3: 'bg-sage-accent/60 dark:bg-cyber-lime/60',
      4: 'bg-sage-accent dark:bg-cyber-lime'
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const renderContributionCalendar = () => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay();
      
      if (index === 0) {
        // Fill empty days at the beginning of the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
      }
      
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Add remaining days to the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  if (loading) {
    return (
      <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-sage-accent dark:border-cyber-lime border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-sage-accent dark:text-cyber-lime font-space-grotesk font-semibold">
            Cargando perfil de GitHub...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-8">
        <p className="text-red-600 dark:text-red-400 text-center font-space-grotesk font-semibold">
          Error al cargar el perfil: {error}
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6 text-sage-accent dark:text-cyber-lime">
            Mi GitHub
          </h2>
          <p className="text-xl max-w-2xl mx-auto font-medium text-black dark:text-quantum-silver">
            Explora mis proyectos y contribuciones en el código
          </p>
        </div>

        {/* GitHub Profile Card */}
        <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar and basic info */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-sage-accent dark:border-cyber-lime shadow-lg mb-4"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-2">
                  {user.name}
                </h3>
                <p className="text-sage-accent dark:text-cyber-lime font-mono font-semibold mb-2">
                  @{user.login}
                </p>
                {user.bio && (
                  <p className="text-gray-800 dark:text-quantum-silver/90 max-w-md mb-4 font-medium">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats and info */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-sage-accent dark:text-cyber-lime" />
                  <span className="text-gray-900 dark:text-quantum-silver font-medium">
                    {user.public_repos} repositorios públicos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-sage-accent dark:text-cyber-lime" />
                  <span className="text-gray-900 dark:text-quantum-silver font-medium">
                    {user.followers} seguidores • {user.following} siguiendo
                  </span>
                </div>
                {user.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sage-accent dark:text-cyber-lime" />
                    <span className="text-gray-900 dark:text-quantum-silver font-medium">
                      {user.location}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-sage-accent dark:text-cyber-lime" />
                  <span className="text-gray-900 dark:text-quantum-silver font-medium">
                    Desde {formatDate(user.created_at)}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <div className="flex items-center justify-center md:justify-end">
                <CyberButton
                  size="lg"
                  onClick={() => window.open(user.html_url, '_blank')}
                  className="group"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Ver perfil completo
                  <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                </CyberButton>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Calendar */}
        <div className="bg-white/60 dark:bg-neural-gray/40 backdrop-blur-md border-2 border-sage-accent/30 dark:border-cyber-lime/20 rounded-lg p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-6 text-center">
            Calendario de Contribuciones
          </h3>
          
          <div className="overflow-x-auto">
            <div className="flex flex-col items-center min-w-max">
              {/* Days of week labels */}
              <div className="flex mb-2">
                <div className="w-6"></div>
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="w-3 h-3 text-xs text-gray-600 dark:text-quantum-silver/60 flex items-center justify-center mx-[1px]">
                    {day[0]}
                  </div>
                ))}
              </div>
              
              {/* Contribution grid */}
              <div className="flex">
                <div className="flex flex-col justify-between text-xs text-gray-600 dark:text-quantum-silver/60 mr-2 h-[91px]">
                  <span>Ene</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Nov</span>
                </div>
                
                <div className="flex gap-[1px]">
                  {renderContributionCalendar().map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[1px]">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} ${
                            day.date ? 'cursor-pointer hover:scale-110 transition-transform' : ''
                          }`}
                          title={day.date ? `${day.count} contribuciones el ${day.date}` : ''}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-quantum-silver/60">
                <span>Menos</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
                <span>Más</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Repositories */}
        <div className="mb-8">
          <h3 className="text-2xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-6 text-center">
            Repositorios Recientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-white/60 dark:bg-neural-gray/40 backdrop-blur-md border-2 border-sage-accent/30 dark:border-cyber-lime/20 rounded-lg p-6 hover:border-sage-accent dark:hover:border-cyber-lime transition-all duration-300 group hover:scale-105 shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors">
                    {repo.name}
                  </h4>
                  <ExternalLink 
                    className="w-4 h-4 text-gray-600 dark:text-quantum-silver/60 group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors cursor-pointer"
                    onClick={() => window.open(repo.html_url, '_blank')}
                  />
                </div>
                
                {repo.description && (
                  <p className="text-gray-700 dark:text-quantum-silver/80 text-sm mb-4 line-clamp-2 font-medium">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="text-sage-accent dark:text-cyber-lime font-mono font-semibold">
                        {repo.language}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-700 dark:text-quantum-silver/80 font-medium">
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4 text-gray-500 dark:text-quantum-silver/60" />
                      <span className="text-gray-700 dark:text-quantum-silver/80 font-medium">
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubProfile;
