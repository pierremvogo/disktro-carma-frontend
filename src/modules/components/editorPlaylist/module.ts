import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function withQuery(url: string, query: Record<string, any>) {
  const p = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length > 0)
      p.set(k, String(v));
  });
  const qs = p.toString();
  return qs ? `${url}?${qs}` : url;
}

const API_URLS = {
  GET_ALL: `${BASE_API_URL}/editorPlaylist/getAll`,
  GET_BY_ID: `${BASE_API_URL}/editorPlaylist/getById/:id`,
} as const;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

class ServiceObject {
  static getEditorPlaylists = (token: string, locale = "en", limit = 20) => {
    const url = withQuery(API_URLS.GET_ALL, { locale, limit });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getEditorPlaylistById = (id: string, token: string) => {
    const url = formatURL(API_URLS.GET_BY_ID, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };
}

export const EditorPlaylistModuleObject = { service: ServiceObject };
