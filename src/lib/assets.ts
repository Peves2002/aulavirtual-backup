export const ASSET_BASE = "assets/elite";

export function getAssetPath(path: string | any): string {
    if (typeof path !== 'string') return path;

    if (
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('//') ||
        path.startsWith('data:') ||
        path.startsWith('blob:')
    ) {
        return path;
    }

    const base = ASSET_BASE.replace(/\/+$/, "");
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const combined = base ? `/${base}/${cleanPath}` : `/${cleanPath}`;

    return combined.replace(/\/+/g, '/');
}
