import { useEffect, useState } from 'react'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { RegistrationFieldsEditor } from '../../components/admin/RegistrationFieldsEditor'
import { SlideOver } from '../../components/admin/SlideOver'
import { createProduct, deleteProduct, listProducts, updateProduct } from '../../lib/firestore/products'
import { slugify, sanitizeRegistrationFields } from '../../lib/registrationFields'
import type { Product, ProductType } from '../../lib/types'

const emptyForm = (): Omit<Product, 'id'> => ({
  slug: '',
  name: '',
  description: '',
  price: 0,
  allowCustomAmount: false,
  type: 'other',
  registrationFields: [],
  active: true,
  order: 0,
})

export function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      setItems(await listProducts())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyForm(), order: items.length })
    setPanelOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({ ...p, registrationFields: p.registrationFields ?? [] })
    setPanelOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id)
    await load()
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        slug: form.slug.trim() || slugify(form.name),
        registrationFields: sanitizeRegistrationFields(form.registrationFields).map((f, i) => ({
          ...f,
          order: i,
        })),
      }
      if (editing) await updateProduct(editing.id, payload)
      else await createProduct(payload)
      setPanelOpen(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  return (
    <AdminErrorBoundary title="Products error">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Paid products (donations, registrations, etc.) with Authorize.net checkout and custom
          registration fields.
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm"
          >
            Add product
          </button>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-gray-500">
                    No products yet. Run <code className="text-xs">npm run seed:products</code> for
                    the donation product.
                  </td>
                </tr>
              ) : (
                items.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 font-medium text-navy">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      <a href={`/register/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-gold-dark hover:underline">
                        {p.slug}
                      </a>
                    </td>
                    <td className="px-4 py-3">{p.type}</td>
                    <td className="px-4 py-3">
                      {p.allowCustomAmount ? 'Custom' : `$${p.price}`}
                    </td>
                    <td className="px-4 py-3">{p.active ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button type="button" onClick={() => openEdit(p)} className="text-navy text-xs font-semibold hover:underline">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(p.id)} className="text-red-600 text-xs font-semibold hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SlideOver open={panelOpen} title={editing ? 'Edit product' : 'Add product'} onClose={() => setPanelOpen(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          {(
            [
              ['name', 'Name'],
              ['slug', 'URL slug'],
              ['description', 'Description'],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-navy mb-1">{label}</label>
              {key === 'description' ? (
                <textarea
                  value={form.description ?? ''}
                  onChange={(e) => setField('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                />
              ) : (
                <input
                  value={form[key] as string}
                  onChange={(e) => setField(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                />
              )}
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setField('type', e.target.value as ProductType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
            >
              <option value="donation">Donation</option>
              <option value="registration">Registration</option>
              <option value="tournament">Tournament</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Price ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setField('price', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.allowCustomAmount ?? false}
              onChange={(e) => setField('allowCustomAmount', e.target.checked)}
            />
            Allow custom amount (donations)
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setField('active', e.target.checked)}
            />
            Active
          </label>

          <RegistrationFieldsEditor
            fields={form.registrationFields}
            onChange={(fields) => setField('registrationFields', fields)}
          />

          <button type="submit" disabled={saving} className="px-4 py-2 bg-gold text-navy font-bold uppercase text-sm rounded-sm disabled:opacity-50">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </form>
      </SlideOver>
    </AdminErrorBoundary>
  )
}
