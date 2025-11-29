// src/lib/thumbnailCache.ts
type ThumbnailGenerator = () => Promise<string | null>;

const inMemoryCache = new Map<string, string>();
const generationQueue: Map<string, { resolve: (data: string | null) => void; reject: (error: Error) => void; generator: ThumbnailGenerator }[]> = new Map();
let currentGenerations = 0;
const MAX_CONCURRENT_GENERATIONS = 2;

const processQueue = () => {
  if (currentGenerations >= MAX_CONCURRENT_GENERATIONS) {
    return;
  }

  for (const [key, queue] of generationQueue.entries()) {
    if (queue.length > 0 && currentGenerations < MAX_CONCURRENT_GENERATIONS) {
      currentGenerations++;
      const { resolve, reject, generator } = queue.shift()!;

      generator()
        .then(data => {
          if (data) {
            inMemoryCache.set(key, data);
          }
          resolve(data);
        })
        .catch(reject)
        .finally(() => {
          currentGenerations--;
          if (queue.length === 0) {
            generationQueue.delete(key);
          }
          processQueue();
        });
    }
  }
};

export const thumbnailCache = {
  getFromCache(key: string): string | null {
    return inMemoryCache.get(key) || null;
  },

  queueThumbnailGeneration(key: string, generator: ThumbnailGenerator): Promise<string | null> {
    const cached = this.getFromCache(key);
    if (cached) {
      return Promise.resolve(cached);
    }

    return new Promise((resolve, reject) => {
      if (!generationQueue.has(key)) {
        generationQueue.set(key, []);
      }
      generationQueue.get(key)!.push({ resolve, reject, generator });
      processQueue();
    });
  },
};
