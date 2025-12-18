import { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Paginación
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  // Filtros
  const [title, setTitle] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [email, setEmail] = useState("");

  const buildUrl = () => {
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    params.set("offset", String(offset));

    if (title.trim()) params.set("title", title.trim());
    if (albumTitle.trim()) params.set("album.title", albumTitle.trim());
    if (email.trim()) params.set("album.user.email", email.trim());

    const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/externalapi/photos?${params.toString()}`;

  };

  const fetchPhotos = async () => {
    setLoading(true);
    setError("");

    try {
      const url = buildUrl();
      const resp = await fetch(url);

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      const data = await resp.json();
      setPhotos(data);
    } catch (e) {
      setError(
        "No se pudo cargar la lista. Revisa que el backend esté corriendo en http://localhost:3000 y que CORS esté habilitado."
      );
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al iniciar y cuando cambian limit/offset
  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset]);

  const onSearch = () => {
    setOffset(0);
    if (offset === 0) fetchPhotos();
  };

  const onClear = () => {
    setTitle("");
    setAlbumTitle("");
    setEmail("");
    setOffset(0);
    fetchPhotos();
  };

  const nextPage = () => setOffset((prev) => prev + limit);
  const prevPage = () => setOffset((prev) => Math.max(0, prev - limit));

  return (
    <div style={{ padding: 16, fontFamily: "Arial" }}>
      <h2>MetaPhoto MVP (SPA)</h2>

      <div style={{ display: "grid", gap: 8, maxWidth: 700 }}>
        <label>
          title (contains):
          <input
            style={{ width: "100%", padding: 8 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: repudiandae iusto"
          />
        </label>

        <label>
          album.title (contains):
          <input
            style={{ width: "100%", padding: 8 }}
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            placeholder="Ej: quidem"
          />
        </label>

        <label>
          album.user.email (equals):
          <input
            style={{ width: "100%", padding: 8 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej: Sincere@april.biz"
          />
        </label>

        <label>
          Page size (limit):
          <select
            style={{ width: "100%", padding: 8 }}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onSearch} style={{ padding: "8px 12px" }}>
            Buscar
          </button>
          <button onClick={onClear} style={{ padding: "8px 12px" }}>
            Limpiar
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={prevPage}
            disabled={offset === 0}
            style={{ padding: "8px 12px" }}
          >
            Anterior
          </button>

          <button
            onClick={nextPage}
            disabled={photos.length < limit}
            style={{ padding: "8px 12px" }}
          >
            Siguiente
          </button>

          <span>
            offset: {offset} | mostrando: {photos.length}
          </span>
        </div>
      </div>

      <hr />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {photos.map((p) => (
          <div
            key={p.id}
            style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}
          >
            <div>
              <strong>#{p.id}</strong> — {p.title}
            </div>

            <div style={{ fontSize: 14 }}>
              Album: {p.album?.title} | User email: {p.album?.user?.email}
            </div>

            <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
              <img src={p.thumbnailUrl} alt={p.title} />
              <a href={p.url} target="_blank" rel="noreferrer">
                Open photo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
