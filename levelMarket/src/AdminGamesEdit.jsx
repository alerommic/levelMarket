import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './assets/Loading';
import API_BASE from './config'

function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    releaseDate: '',
    genre: 'Aventura',
    platform: 'PlayStation',
    stock: '',
    imageurl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/GameList/${id}`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Juego no encontrado');
        return res.json();
      })
      .then(data => {
        setForm({
          name: data.name,
          price: data.price,
          releaseDate: data.releasedate,
          genre: data.genre,
          platform: data.platform,
          stock: data.stock,
          imageurl: data.imageurl
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/games/${id}/edit`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          releasedate: form.releaseDate,
          genre: form.genre,
          platform: form.platform,
          stock: parseInt(form.stock, 10),
          imageurl: form.imageurl
        })
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'error al guardar');
      }
      navigate('/admin/games');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Editar Juego
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Fecha de salida</label>
            <input
              name="releaseDate"
              type="date"
              value={form.releaseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Género</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <option value="Aventura">Aventura</option>
              <option value="Acción">Acción</option>
              <option value="Estrategia">Estrategia</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Plataforma</label>
            <select
              name="platform"
              value={form.platform}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <option value="PlayStation">PlayStation</option>
              <option value="PC">PC</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">URL de la imagen</label>
            <input
              name="imageurl"
              type="text"
              value={form.imageurl}
              onChange={handleChange}
              placeholder="url de la imagen"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-600 text-white py-2 rounded-md hover:bg-neutral-700 transition"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProductEdit;