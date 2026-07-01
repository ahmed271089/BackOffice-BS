import { useEffect, useState, FormEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { listCategories, createCategory, deleteCategory, Category } from '../api/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');

  const load = () => listCategories().then(setCategories).catch(console.error);

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    await deleteCategory(id);
    load();
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    await createCategory({ name, slug, icon: icon || undefined });
    setName('');
    setSlug('');
    setIcon('');
    setShowForm(false);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Categories</h1>
          <p className="mt-1 text-sm text-textSecondary">Organize problems and solutions by topic.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus size={16} />
          New category
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-xl2 border border-cardBorder bg-card p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input value={name} onChange={(e) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')); }} placeholder="Name" className="h-10 rounded-lg border border-cardBorder bg-bgElevated px-3 text-sm text-textPrimary" />
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" className="h-10 rounded-lg border border-cardBorder bg-bgElevated px-3 text-sm text-textPrimary" />
            <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Icon emoji" className="h-10 rounded-lg border border-cardBorder bg-bgElevated px-3 text-sm text-textPrimary" />
          </div>
          <Button type="submit">Create category</Button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-xl2 border border-cardBorder bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{c.icon}</span>
                <span className="font-semibold text-textPrimary">{c.name}</span>
              </div>
              <button onClick={() => remove(c.id)} className="text-textMuted hover:text-danger">
                <Trash2 size={16} />
              </button>
            </div>
            <p className="mt-2 text-xs text-textMuted">/{c.slug}</p>
            <p className="mt-3 text-sm text-textSecondary">{(c._count?.posts ?? 0).toLocaleString()} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
}
