# Corrupted / Archived ProjectCard Backups

This folder contains archived and corrupted versions of `ProjectCard` that were left behind during iterative development.

Why these exist
- During refactoring and experimentation, `ProjectCard.tsx` became corrupted with duplicated and conflicting code. To recover, the project maintainer moved corrupted versions here while creating a validated `ProjectCardFinal.tsx` implementation and a thin wrapper `ProjectCard.tsx` that re-exports the final component.

What to keep
- Keep the `projectcard_backups_*.tgz` archive for historical reference.
- Optionally keep `ProjectCardClean.tsx` or `ProjectCardNew.tsx` if they contain reusable refactorings you want to preserve.

Safe to remove
- The original corrupted sources have been archived and removed; this folder now only contains the archive and README. If you are confident in `ProjectCardFinal.tsx` and `ProjectCard.tsx`, it is safe to remove this folder entirely.

How we recovered
- We created a stable wrapper `src/components/ProjectCard.tsx` that re-exports `ProjectCardFinal`. The `ProjectsSection` and other modules should import `./ProjectCard`.
- We removed temporary tsconfig excludes and archived the corrupted files here to restore a healthy build.

If you want help reintroducing any functionality from these older versions, I can inspect them and re-implement specific code in `ProjectCardFinal.tsx`.
