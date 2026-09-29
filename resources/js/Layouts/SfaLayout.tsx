import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { PageProps } from '@/types';

type SfaArea = 'admin' | 'sales';

const navigation: Record<SfaArea, { label: string; icon: string; active?: boolean }[]> = {
    admin: [
        { label: 'Ringkasan', icon: '▦', active: true },
        { label: 'Tim penjualan', icon: '♙' },
        { label: 'Outlet', icon: '⌖' },
        { label: 'Produk', icon: '◇' },
        { label: 'Pesanan', icon: '▤' },
        { label: 'Laporan', icon: '▥' },
    ],
    sales: [
        { label: 'Ringkasan', icon: '▦', active: true },
        { label: 'Kunjungan', icon: '⌖' },
        { label: 'Outlet saya', icon: '♙' },
        { label: 'Pesanan', icon: '▤' },
        { label: 'Target', icon: '◎' },
    ],
};

export default function SfaLayout({ area, children }: PropsWithChildren<{ area: SfaArea }>) {
    const { auth } = usePage<PageProps>().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const dashboardRoute = area === 'admin' ? 'admin.dashboard' : 'sales.dashboard';
    const areaLabel = area === 'admin' ? 'Administrator' : 'Sales Lapangan';
    const initials = auth.user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

    return (
        <div className="min-h-screen bg-[#f5f7f6] text-slate-800">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-slate-200 bg-white lg:flex">
                <Link href={route(dashboardRoute)} className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-sm font-extrabold tracking-tight text-white">SF</span>
                    <span><span className="block text-[15px] font-bold tracking-tight text-slate-900">SFA<span className="text-emerald-700">Flow</span></span><span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Sales force platform</span></span>
                </Link>
                <div className="px-4 pt-5">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-800">N</div>
                        <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-800">Nusantara Distribusi</p><p className="mt-1 text-[11px] text-slate-500">{areaLabel}</p></div>
                        <span className="text-xs text-slate-400">⌄</span>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-7">
                    <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Menu utama</p>
                    <div className="space-y-1">
                        {navigation[area].map((item) => (
                            <div key={item.label} className={item.active ? 'flex items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2.5 text-[13px] font-medium text-emerald-800' : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-500'} title={item.active ? undefined : 'Modul tersedia pada pengembangan berikutnya'}>
                                <span className={item.active ? 'flex h-5 w-5 items-center justify-center text-base text-emerald-700' : 'flex h-5 w-5 items-center justify-center text-base text-slate-400'}>{item.icon}</span>
                                <span className="flex-1">{item.label}</span>
                                {!item.active && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">Segera</span>}
                            </div>
                        ))}
                    </div>
                    <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Preferensi</p>
                    <Link href={route('profile.edit')} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><span className="flex h-5 w-5 items-center justify-center text-base text-slate-400">⚙</span>Pengaturan akun</Link>
                </nav>
                <div className="border-t border-slate-100 p-4">
                    <div className="flex items-center gap-3 rounded-xl p-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">{initials}</div>
                        <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-800">{auth.user.name}</p><p className="mt-1 text-[10px] text-slate-500">{areaLabel}</p></div>
                        <Link href={route('logout')} method="post" as="button" className="text-xs text-slate-400 transition hover:text-rose-600" title="Keluar">↗</Link>
                    </div>
                </div>
            </aside>
            <div className="lg:pl-[250px]">
                <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
                    <div className="flex h-[68px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-9">
                        <div className="flex min-w-0 items-center gap-3">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden" aria-label="Buka menu">☰</button>
                            <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">{areaLabel}</p><p className="mt-0.5 text-sm font-semibold text-slate-700">Selamat datang kembali</p></div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="hidden h-9 w-56 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 md:flex"><span className="text-slate-400">⌕</span><span className="text-xs text-slate-400">Cari apa saja...</span><kbd className="ml-auto rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] text-slate-400">⌘ K</kbd></div>
                            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500" aria-label="Notifikasi">♧<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" /></button>
                            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
                            <div className="hidden items-center gap-2 sm:flex"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">{initials}</div><span className="max-w-32 truncate text-xs font-semibold text-slate-700">{auth.user.name}</span></div>
                        </div>
                    </div>
                    {menuOpen && <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"><Link href={route(dashboardRoute)} className="whitespace-nowrap rounded-md bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">Ringkasan</Link><Link href={route('profile.edit')} className="whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-slate-500">Pengaturan akun</Link><Link href={route('logout')} method="post" as="button" className="whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-slate-500">Keluar</Link></nav>}
                </header>
                <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9">{children}</main>
            </div>
        </div>
    );
}