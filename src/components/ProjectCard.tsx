import React, { Suspense } from 'react';
import type { Project } from '@/data/projects';

const LazyProjectCard = React.lazy(() => import('./ProjectCardFinal'));

type ProjectCardProps = { project: Project };
const ProjectCardWrapper: React.FC<ProjectCardProps> = ({ project }) => (
  <Suspense fallback={<div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl" />}>
    <LazyProjectCard project={project} />
  </Suspense>
);

export default ProjectCardWrapper;
// Thin wrapper for lazy-loading the validated 'ProjectCardFinal' implementation.
