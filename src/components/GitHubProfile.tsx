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

const GitHubProfile = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('GitHubProfile: Setting up intersection observer');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('GitHubProfile: Observer triggered', {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio
        });
        
        if (entry.isIntersecting) {
          console.log('GitHubProfile: Setting isVisible to true');
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Use a timeout to ensure the DOM is ready
    const setupObserver = () => {
      const section = document.getElementById('github-section');
      console.log('GitHubProfile: Found section element:', section);
      
      if (section) {
        observer.observe(section);
      } else {
        console.warn('GitHubProfile: github-section element not found');
      }
    };

    // Delay the observer setup slightly to ensure DOM is ready
    const timeout = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timeout);
      const section = document.getElementById('github-section');
      if (section) {
        observer.unobserve(section);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('GitHubProfile: isVisible state changed to:', isVisible);
  }, [isVisible]);

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

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
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
    <section id="github-section" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with zoom-out effect */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-110 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6 text-sage-accent dark:text-cyber-lime">
            Mi GitHub
          </h2>
          <p className="text-xl max-w-2xl mx-auto font-medium text-black dark:text-quantum-silver">
            Explora mis proyectos y contribuciones en el código
          </p>
        </div>

        {/* GitHub Profile Card with zoom-out effect */}
        <div className={`bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-8 mb-8 shadow-lg relative transition-all duration-1000 ease-out delay-200 transform ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-110 opacity-0'
        }`}>
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
            <div className="flex-1">
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
            </div>
          </div>

          {/* Ver perfil completo button - moved to bottom right and made smaller */}
          <div className="absolute bottom-6 right-6">
            <CyberButton
              size="sm"
              onClick={() => window.open(user.html_url, '_blank')}
              className="group text-sm"
            >
              <Github className="w-4 h-4 mr-2" />
              Ver perfil completo
              <ExternalLink className="w-3 h-3 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </CyberButton>
          </div>
        </div>

        {/* Recent Repositories with staggered zoom-out effects */}
        <div className={`mb-8 transition-all duration-1000 ease-out delay-400 transform ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-110 opacity-0'
        }`}>
          <h3 className="text-2xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-6 text-center">
            Repositorios Recientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <div
                key={repo.id}
                className={`bg-white/60 dark:bg-neural-gray/40 backdrop-blur-md border-2 border-sage-accent/30 dark:border-cyber-lime/20 rounded-lg p-6 hover:border-sage-accent dark:hover:border-cyber-lime transition-all duration-300 group hover:scale-105 shadow-lg transform ${
                  isVisible 
                    ? 'scale-100 opacity-100' 
                    : 'scale-110 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${600 + index * 100}ms` : '0ms',
                  transitionDuration: '1000ms'
                }}
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
