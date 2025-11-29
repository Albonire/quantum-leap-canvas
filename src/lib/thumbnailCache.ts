// Simple thumbnail cache + generation queue for limiting concurrent canvas work
type CacheEntry = { url: string; dataUrl: string };

const CACHE_KEY = 'qlc-thumbnail-cache-v1';
const MAX_ENTRIES = 300;

const inMemoryCache = new Map<string, string>();
const queue: Array<() => Promise<void>> = [];
let active = 0;
const MAX_CONCURRENT = 2;

function persistCache() {
  try {
    const arr = Array.from(inMemoryCache.entries()).slice(0, MAX_ENTRIES);
    localStorage.setItem(CACHE_KEY, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return;
    const arr: [string, string][] = JSON.parse(raw);
    arr.forEach(([k, v]) => inMemoryCache.set(k, v));
  } catch (e) {
    // ignore
  }
}

loadCache();

async function processQueue() {
  if (active >= MAX_CONCURRENT || queue.length === 0) return;
  const item = queue.shift();
  if (!item) return;
  active++;
  try {
    await item();
  } finally {
    active--;
    processQueue();
  }
}

export function getFromCache(key: string): string | undefined { return inMemoryCache.get(key); }

export function queueThumbnailGeneration(key: string, generate: () => Promise<string | null>): Promise<string | null> {
  if (inMemoryCache.has(key)) return Promise.resolve(inMemoryCache.get(key)!);
  return new Promise((resolve) => {
    const task = async () => {
      try {
        const result = await generate();
        if (result) {
          inMemoryCache.set(key, result);
          persistCache();
        }
        resolve(result);
      } catch (e) {
        resolve(null);
      }
    };
    queue.push(task);
    // try to process immediately
    setTimeout(processQueue, 0);
  });
}

export function clearCache() { inMemoryCache.clear(); persistCache(); }

export default { getFromCache, queueThumbnailGeneration, clearCache };
