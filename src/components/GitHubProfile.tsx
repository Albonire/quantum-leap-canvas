
'use client';

import { useState, useEffect, useRef } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const fetchWithRetry = async <T,>(url: string, retries = 3, delay = 1000): Promise<T> => {
      let lastError: Error | null = null;
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });
          if (response.ok) {
            return response.json();
          }
          lastError = new Error(`Request failed with status ${response.status}`);
        } catch (error) {
          lastError = error instanceof Error ? error : new Error('Unknown fetch error');
        }
        if (i < retries - 1) {
          await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
        }
      }
      throw lastError || new Error('Failed to fetch data after multiple retries');
    };

    const fetchGitHubData = async () => {
      try {
        const userData = await fetchWithRetry<GitHubUser>('https://api.github.com/users/Albonire');
        setUser(userData);

        
        const reposData = await fetchWithRetry<GitHubRepo[]>('https://api.github.com/users/Albonire/repos?sort=updated&per_page=6');
        setRepos(reposData);

        setLoading(false);
      } catch (err) {
        const errorId = Math.random().toString(36).substring(7);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`${errorMessage} (Ref: ${errorId})`);
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
      <section ref={sectionRef} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-8">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-sage-accent dark:border-cyber-lime border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-sage-accent dark:text-cyber-lime font-space-grotesk font-semibold">
                Loading GitHub profile...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-8">
            <p className="text-red-600 dark:text-red-400 text-center font-space-grotesk font-semibold">
              Error loading profile: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section ref={sectionRef} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with zoom-out effect */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-110 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6 text-sage-accent dark:text-cyber-lime">
            My GitHub
          </h2>
          <p className="text-xl max-w-2xl mx-auto font-medium text-black dark:text-quantum-silver">
            Showcasing my projects and open-source contributions
          </p>
        </div>

        {/* GitHub Profile Card with zoom-out effect */}
        <div className={`bg-sage-accent/20 dark:bg-neural-gray/30 backdrop-blur-md border-2 border-sage-accent dark:border-cyber-lime/20 rounded-lg p-6 sm:p-8 mb-8 shadow-lg relative transition-all duration-1000 ease-out delay-200 transform ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-110 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
            {/* Avatar and basic info */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-sage-accent dark:border-cyber-lime shadow-lg mb-4"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-space-grotesk font-bold text-gray-900 dark:text-quantum-silver mb-2">
                  {user.name}
                </h3>
                <p className="text-sage-accent dark:text-cyber-lime font-mono font-semibold mb-2 text-sm sm:text-base">
                  @{user.login}
                </p>
                {user.bio && (
                  <p className="text-gray-800 dark:text-quantum-silver/90 max-w-md mb-4 font-medium text-sm sm:text-base">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats and info */}
            <div className="flex-1">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Book className="w-4 h-4 sm:w-5 sm:h-5 text-sage-accent dark:text-cyber-lime" />
                  <span className="text-gray-900 dark:text-quantum-silver font-medium text-sm sm:text-base">
                    {user.public_repos} public repositories
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-sage-accent dark:text-cyber-lime" />
                  <span className="text-gray-900 dark:text-quantum-silver font-medium text-sm sm:text-base">
                    {user.followers} followers • {user.following} following
                  </span>
                </div>
                {user.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-sage-accent dark:text-cyber-lime" />
                    <span className="text-gray-900 dark:text-quantum-silver font-medium text-sm sm:text-base">
                      {user.location}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-sage-accent dark:text-cyber-lime" />
                  <span className="text-gray-900 dark:text-quantum-silver font-medium text-sm sm:text-base">
                    Since {formatDate(user.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ver perfil completo button - responsive positioning */}
          <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-6 sm:right-6 flex justify-center sm:justify-end">
            <CyberButton
              size="sm"
              onClick={() => window.open(user.html_url, '_blank')}
              className="group text-xs sm:text-sm w-full sm:w-auto"
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="hidden sm:inline">View full profile</span>
              <span className="sm:hidden">View profile</span>
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
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
            Recent Repositories
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
