import SfaLayout from '@/Layouts/SfaLayout';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type Outlet = {
    code: string;
    name: string;
    owner: string;
    phone: string;
    city: string;
    type: string;
    status: string;
    initials: string;
};

export default function OutletIndex({ area, outlets }: { area: 'admin' | 'sales'; outlets: Outlet[] }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua status');
    const createRoute = area === 'admin' ? 'admin.outlets.create' : 'sales.outlets.create';
    const filteredOutlets = useMemo(() => outlets.filter((outlet) => {
        const matchesSearch = [outlet.name, outlet.code, outlet.owner, outlet.city].some((value) =>
            value.toLowerCase().includes(search.toLowerCase()),
        );
        return matchesSearch && (statusFilter === 'Semua status' || outlet.status === statusFilter);
    }), [outlets, search, statusFilter]);
    const activeCount = outlets.filter((outlet) => outlet.status === 'Aktif').length;

    return (
        <SfaLayout area={area}>
            <Head title="Outlet" />
            <div className="space-y-6">
                <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div><p className="mb-2 text-[11px] text-slate-400">Workspace / <span className="font-semibold text-emerald-700">Outlet</span></p><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{area === 'admin' ? 'Semua outlet' : 'Outlet saya'}</h1><p className="mt-1.5 text-sm text-slate-500">{area === 'admin' ? 'Kelola dan pantau seluruh outlet yang terdaftar.' : 'Daftar outlet dalam wilayah penjualan Anda.'}</p></div>
                    <Link href={route(createRoute)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"><span className="text-base leading-none">+</span> Register Outlet</Link>
                </section>
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Total outlet</p><p className="mt-2 text-2xl font-bold text-slate-900">{outlets.length}</p></article>
                    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Outlet aktif</p><p className="mt-2 text-2xl font-bold text-emerald-700">{activeCount}</p></article>
                    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Menunggu verifikasi</p><p className="mt-2 text-2xl font-bold text-amber-600">{outlets.length - activeCount}</p></article>
                </section>
                <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <div><h2 className="text-sm font-bold text-slate-900">Daftar outlet</h2><p className="mt-1 text-xs text-slate-500">Menampilkan {filteredOutlets.length} dari {outlets.length} outlet</p></div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 sm:w-60"><span className="text-slate-400">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama, kode, kota..." className="w-full border-0 p-0 text-xs placeholder:text-slate-400 focus:ring-0" /></label>
                            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-9 rounded-lg border-slate-200 py-0 text-xs text-slate-600 focus:border-emerald-600 focus:ring-emerald-600"><option>Semua status</option><option>Aktif</option><option>Menunggu verifikasi</option></select>
                        </div>
                    </div>
                    <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left">
                        <thead><tr className="bg-slate-50/70 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><th className="px-5 py-3">Nama outlet</th><th className="px-4 py-3">Pemilik</th><th className="px-4 py-3">Kontak</th><th className="px-4 py-3">Kota</th><th className="px-4 py-3">Tipe</th><th className="px-5 py-3">Status</th></tr></thead>
                        <tbody>
                            {filteredOutlets.map((outlet) => <tr key={outlet.code} className="border-t border-slate-100 text-xs">
                                <td className="px-5 py-3.5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[10px] font-bold text-emerald-800">{outlet.initials}</span><div><p className="font-semibold text-slate-800">{outlet.name}</p><p className="mt-1 text-[10px] text-slate-400">{outlet.code}</p></div></div></td>
                                <td className="px-4 py-3.5 text-slate-600">{outlet.owner}</td><td className="px-4 py-3.5 text-slate-500">{outlet.phone}</td><td className="px-4 py-3.5 text-slate-500">{outlet.city}</td><td className="px-4 py-3.5"><span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">{outlet.type}</span></td>
                                <td className="px-5 py-3.5"><span className={outlet.status === 'Aktif' ? 'rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700' : 'rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700'}>{outlet.status}</span></td>
                            </tr>)}
                            {filteredOutlets.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-xs text-slate-400">Outlet tidak ditemukan. Coba ubah pencarian atau filter.</td></tr>}
                        </tbody>
                    </table></div>
                    <div className="border-t border-slate-100 px-5 py-3 text-[10px] text-slate-400">Data outlet contoh untuk rancangan awal</div>
                </section>
            </div>
        </SfaLayout>
    );
}