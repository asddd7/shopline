import SfaLayout from '@/Layouts/SfaLayout';
import { Head, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

export default function CreateOutlet({ area }: { area: 'admin' | 'sales' }) {
    const [submitted, setSubmitted] = useState(false);
    const indexRoute = area === 'admin' ? 'admin.outlets.index' : 'sales.outlets.index';

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <SfaLayout area={area}>
            <Head title="Register Outlet" />
            <div className="mx-auto max-w-5xl space-y-6">
                <section><p className="mb-2 flex items-center gap-2 text-[11px] text-slate-400"><Link href={route(indexRoute)} className="hover:text-emerald-700">Outlet</Link><span>/</span><span className="font-semibold text-emerald-700">Register Outlet</span></p><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Register outlet</h1><p className="mt-1.5 text-sm text-slate-500">Tambahkan informasi outlet baru ke dalam wilayah penjualan.</p></section>
                {submitted && <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"><b>Form siap.</b> Ini masih tampilan frontend; data belum disimpan ke database.</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-700">01</span><div><h2 className="text-sm font-bold text-slate-900">Informasi outlet</h2><p className="mt-1 text-xs text-slate-500">Masukkan nama dan kategori outlet.</p></div></div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className="space-y-1.5 text-xs font-medium text-slate-700">Nama outlet <span className="text-rose-500">*</span><input required name="name" placeholder="Contoh: Toko Berkah Jaya" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700">Nama pemilik <span className="text-rose-500">*</span><input required name="owner" placeholder="Nama pemilik outlet" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700">Tipe outlet <span className="text-rose-500">*</span><select required name="type" defaultValue="" className="block w-full rounded-lg border-slate-200 text-sm text-slate-600 focus:border-emerald-600 focus:ring-emerald-600"><option value="" disabled>Pilih tipe outlet</option><option>Retail</option><option>Grosir</option><option>Warung</option><option>Minimarket</option></select></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700">Nomor telepon <span className="text-rose-500">*</span><input required name="phone" type="tel" placeholder="08xx xxxx xxxx" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700 sm:col-span-2">Email outlet <span className="font-normal text-slate-400">(opsional)</span><input name="email" type="email" placeholder="email@outlet.com" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                        </div>
                    </section>
                    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-semibold text-blue-700">02</span><div><h2 className="text-sm font-bold text-slate-900">Lokasi outlet</h2><p className="mt-1 text-xs text-slate-500">Alamat digunakan untuk memetakan area kunjungan.</p></div></div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className="space-y-1.5 text-xs font-medium text-slate-700">Provinsi <span className="text-rose-500">*</span><input required name="province" placeholder="Contoh: DKI Jakarta" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700">Kota/Kabupaten <span className="text-rose-500">*</span><input required name="city" placeholder="Contoh: Jakarta Selatan" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700 sm:col-span-2">Alamat lengkap <span className="text-rose-500">*</span><textarea required name="address" rows={3} placeholder="Nama jalan, nomor, RT/RW, kelurahan..." className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                            <label className="space-y-1.5 text-xs font-medium text-slate-700 sm:col-span-2">Catatan <span className="font-normal text-slate-400">(opsional)</span><textarea name="notes" rows={2} placeholder="Informasi tambahan untuk tim sales" className="block w-full rounded-lg border-slate-200 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600" /></label>
                        </div>
                    </section>
                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row"><Link href={route(indexRoute)} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center text-xs font-semibold text-slate-600 transition hover:bg-slate-50">Batal</Link><button type="submit" className="rounded-lg bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800">Daftarkan outlet</button></div>
                </form>
            </div>
        </SfaLayout>
    );
}