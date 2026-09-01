import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3001/api/devices";
const COMMENTS_API_URL = "http://localhost:3001/api/comments";

const getDeviceImage = (device) => {
    const name = device.name.toLowerCase();

    if (name.includes("vivobook")) {
        return "/images/vivobook-15.jpg";
    }

    if (name.includes("rog strix")) {
        return "/images/rog-strix.jpg";
    }

    if (name.includes("rog zephyrus")) {
        return "/images/rog-zephyrus.jpg";
    }

    if (name.includes("tuf")) {
        return "/images/tuf-gaming.jpg";
    }

    if (name.includes("zenbook")) {
        return "/images/zenbook.jpg";
    }

    return "/images/default-asus.jpg";
};

function App() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [selectedDevice, setSelectedDevice] = useState(null);

    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);

    const [newComment, setNewComment] = useState({
        rating: 5,
        comment: ""
    });

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams();

                if (search) {
                    params.append("search", search);
                }

                if (category) {
                    params.append("category", category);
                }

                const url = params.toString()
                    ? `${API_URL}?${params.toString()}`
                    : API_URL;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Error al cargar los dispositivos");
                }

                const data = await response.json();

                setDevices(data);
            } catch (error) {
                console.error(
                    "Error al cargar dispositivos:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, [search, category]);

    const categories = useMemo(() => {
        return [
            ...new Set(
                devices.map((device) => device.category)
            )
        ];
    }, [devices]);

    const fetchComments = async (deviceId) => {
        try {
            setCommentLoading(true);

            const response = await fetch(
                `${COMMENTS_API_URL}/${deviceId}`
            );

            if (!response.ok) {
                throw new Error("Error al cargar comentarios");
            }

            const data = await response.json();

            setComments(data);
        } catch (error) {
            console.error(
                "Error al cargar comentarios:",
                error
            );

            setComments([]);
        } finally {
            setCommentLoading(false);
        }
    };

    const handleViewDetail = async (id) => {
        try {
            const response = await fetch(
                `${API_URL}/${id}`
            );

            if (!response.ok) {
                throw new Error(
                    "Error al obtener detalle"
                );
            }

            const data = await response.json();

            setSelectedDevice(data);

            await fetchComments(id);
        } catch (error) {
            console.error(
                "Error al obtener detalle:",
                error
            );
        }
    };

    const handleCloseModal = () => {
        setSelectedDevice(null);
        setComments([]);

        setNewComment({
            rating: 5,
            comment: ""
        });
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();

        if (!selectedDevice) {
            return;
        }

        try {
            const response = await fetch(
                `${COMMENTS_API_URL}/${selectedDevice.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: 1,
                        rating: Number(
                            newComment.rating
                        ),
                        comment:
                            newComment.comment
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.mensaje ||
                    "No fue posible crear el comentario"
                );

                return;
            }

            setNewComment({
                rating: 5,
                comment: ""
            });

            await fetchComments(
                selectedDevice.id
            );
        } catch (error) {
            console.error(
                "Error al crear comentario:",
                error
            );

            alert(
                "Ocurrió un error al publicar el comentario"
            );
        }
    };

    return (
        <div className="app">
            <header className="navbar">
                <div className="brand">
                    <span className="brand-main">
                        ASUS
                    </span>

                    <span className="brand-sub">
                        SMART DEVICES
                    </span>
                </div>

                <nav>
                    <a href="#inicio">
                        Inicio
                    </a>

                    <a href="#catalogo">
                        Catálogo
                    </a>

                    <a href="#gaming">
                        Gaming
                    </a>
                </nav>
            </header>

            <main>
                <section
                    className="hero"
                    id="inicio"
                >
                    <div className="hero-overlay">
                    </div>

                    <div className="hero-content">
                        <span className="hero-tag">
                            NEXT LEVEL PERFORMANCE
                        </span>

                        <h1>
                            POTENCIA SIN
                            <span>
                                {" "}
                                LÍMITES
                            </span>
                        </h1>

                        <p>
                            Descubre computadores ASUS
                            diseñados para gaming,
                            productividad y alto
                            rendimiento.
                        </p>

                        <a
                            href="#catalogo"
                            className="hero-button"
                        >
                            Explorar equipos
                        </a>
                    </div>

                    <div className="hero-glow glow-one">
                    </div>

                    <div className="hero-glow glow-two">
                    </div>
                </section>

                <section
                    className="catalog-section"
                    id="catalogo"
                >
                    <div className="section-header">
                        <div>
                            <span className="section-tag">
                                ASUS COLLECTION
                            </span>

                            <h2>
                                Encuentra tu próxima
                                máquina
                            </h2>
                        </div>

                        <p>
                            Explora equipos ASUS y
                            encuentra el que mejor se
                            adapte a tu estilo.
                        </p>
                    </div>

                    <div className="filters">
                        <div className="search-box">
                            <span>
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Buscar por nombre o modelo..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <select
                            value={category}
                            onChange={(event) =>
                                setCategory(
                                    event.target.value
                                )
                            }
                        >
                            <option value="">
                                Todas las categorías
                            </option>

                            {categories.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {loading ? (
                        <div className="loading">
                            <div className="loader">
                            </div>

                            <p>
                                Cargando arsenal
                                ASUS...
                            </p>
                        </div>
                    ) : (
                        <div className="device-grid">
                            {devices.map(
                                (device) => (
                                    <article
                                        className="device-card"
                                        key={device.id}
                                    >
                                        <div className="card-top">
                                            <span className="device-category">
                                                {
                                                    device.category
                                                }
                                            </span>

                                            <span className="device-brand">
                                                {
                                                    device.brand
                                                }
                                            </span>
                                        </div>

                                        <div className="device-image">
                                            <img
                                                src={getDeviceImage(
                                                    device
                                                )}
                                                alt={
                                                    device.name
                                                }
                                                className="device-photo"
                                            />
                                        </div>

                                        <div className="card-body">
                                            <h3>
                                                {
                                                    device.name
                                                }
                                            </h3>

                                            <p className="model">
                                                {
                                                    device.model
                                                }
                                            </p>

                                            <p className="description">
                                                {
                                                    device.description
                                                }
                                            </p>

                                            <div className="card-footer">
                                                <div>
                                                    <span className="price-label">
                                                        Precio
                                                    </span>

                                                    <strong>
                                                        $
                                                        {Number(
                                                            device.price
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                    </strong>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handleViewDetail(
                                                            device.id
                                                        )
                                                    }
                                                >
                                                    Ver detalle
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}

                    {!loading &&
                        devices.length === 0 && (
                            <div className="empty-state">
                                <h3>
                                    No encontramos
                                    equipos
                                </h3>

                                <p>
                                    Prueba con otro
                                    nombre, modelo o
                                    categoría.
                                </p>
                            </div>
                        )}
                </section>

                <section
                    className="gaming-banner"
                    id="gaming"
                >
                    <div>
                        <span className="section-tag">
                            REPUBLIC OF GAMERS
                        </span>

                        <h2>
                            Juega. Compite. Domina.
                        </h2>

                        <p>
                            Rendimiento diseñado para
                            quienes exigen más de cada
                            partida.
                        </p>
                    </div>
                </section>
            </main>

            {selectedDevice && (
                <div
                    className="modal-backdrop"
                    onClick={handleCloseModal}
                >
                    <div
                        className="detail-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <button
                            className="close-button"
                            onClick={handleCloseModal}
                        >
                            ×
                        </button>

                        <div className="modal-device-image">
                            <img
                                src={getDeviceImage(
                                    selectedDevice
                                )}
                                alt={
                                    selectedDevice.name
                                }
                                className="modal-device-photo"
                            />
                        </div>

                        <span className="modal-category">
                            {
                                selectedDevice.category
                            }
                        </span>

                        <h2>
                            {selectedDevice.name}
                        </h2>

                        <p className="modal-model">
                            Modelo:{" "}
                            {selectedDevice.model}
                        </p>

                        <p className="modal-description">
                            {
                                selectedDevice.description
                            }
                        </p>

                        <div className="modal-info">
                            <div>
                                <span>
                                    Marca
                                </span>

                                <strong>
                                    {
                                        selectedDevice.brand
                                    }
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Lanzamiento
                                </span>

                                <strong>
                                    {
                                        selectedDevice.release_date
                                    }
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Precio
                                </span>

                                <strong>
                                    $
                                    {Number(
                                        selectedDevice.price
                                    ).toLocaleString(
                                        "es-CO"
                                    )}
                                </strong>
                            </div>
                        </div>

                        <div className="comments-section">
                            <h3>
                                Opiniones de usuarios
                            </h3>

                            {commentLoading ? (
                                <p className="comments-message">
                                    Cargando
                                    comentarios...
                                </p>
                            ) : comments.length ===
                              0 ? (
                                <p className="comments-message">
                                    Este equipo todavía
                                    no tiene comentarios.
                                </p>
                            ) : (
                                <div className="comments-list">
                                    {comments.map(
                                        (item) => (
                                            <div
                                                className="comment-card"
                                                key={
                                                    item.id
                                                }
                                            >
                                                <div className="comment-header">
                                                    <strong>
                                                        {
                                                            item.user_name
                                                        }
                                                    </strong>

                                                    <span>
                                                        {"★".repeat(
                                                            item.rating
                                                        )}

                                                        {"☆".repeat(
                                                            5 -
                                                                item.rating
                                                        )}
                                                    </span>
                                                </div>

                                                <p>
                                                    {
                                                        item.comment
                                                    }
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            <form
                                className="comment-form"
                                onSubmit={
                                    handleSubmitComment
                                }
                            >
                                <h3>
                                    Deja tu opinión
                                </h3>

                                <label>
                                    Calificación

                                    <select
                                        value={
                                            newComment.rating
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setNewComment(
                                                {
                                                    ...newComment,
                                                    rating:
                                                        event
                                                            .target
                                                            .value
                                                }
                                            )
                                        }
                                    >
                                        <option value="5">
                                            5 - Excelente
                                        </option>

                                        <option value="4">
                                            4 - Muy bueno
                                        </option>

                                        <option value="3">
                                            3 - Bueno
                                        </option>

                                        <option value="2">
                                            2 - Regular
                                        </option>

                                        <option value="1">
                                            1 - Malo
                                        </option>
                                    </select>
                                </label>

                                <label>
                                    Comentario

                                    <textarea
                                        placeholder="Cuéntanos qué opinas de este equipo..."
                                        value={
                                            newComment.comment
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setNewComment(
                                                {
                                                    ...newComment,
                                                    comment:
                                                        event
                                                            .target
                                                            .value
                                                }
                                            )
                                        }
                                        required
                                    />
                                </label>

                                <button type="submit">
                                    Publicar comentario
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <footer>
                <p>
                    ASUS Smart Devices · Proyecto
                    Ingeniería de Software
                </p>
            </footer>
        </div>
    );
}

export default App;
