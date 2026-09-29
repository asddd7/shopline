<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function admin(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                ['label' => 'Total penjualan', 'value' => 'Rp 248,6 jt', 'change' => '+12,8%', 'tone' => 'green'],
                ['label' => 'Pesanan hari ini', 'value' => '184', 'change' => '+8,2%', 'tone' => 'green'],
                ['label' => 'Outlet aktif', 'value' => '1.284', 'change' => '+3,1%', 'tone' => 'green'],
                ['label' => 'Tim sales', 'value' => '42', 'change' => '38 bertugas', 'tone' => 'blue'],
            ],
            'weeklySales' => [42, 58, 49, 76, 63, 88, 72],
            'topSales' => [
                ['name' => 'Andi Pratama', 'region' => 'Jakarta Selatan', 'sales' => 'Rp 42.850.000', 'progress' => 86, 'initials' => 'AP'],
                ['name' => 'Siti Rahmawati', 'region' => 'Bandung', 'sales' => 'Rp 38.420.000', 'progress' => 77, 'initials' => 'SR'],
                ['name' => 'Budi Santoso', 'region' => 'Surabaya', 'sales' => 'Rp 34.760.000', 'progress' => 69, 'initials' => 'BS'],
                ['name' => 'Dewi Lestari', 'region' => 'Yogyakarta', 'sales' => 'Rp 29.180.000', 'progress' => 58, 'initials' => 'DL'],
            ],
        ]);
    }

    public function sales(): Response
    {
        return Inertia::render('Sales/Dashboard', [
            'metrics' => [
                ['label' => 'Penjualan bulan ini', 'value' => 'Rp 18,4 jt', 'change' => '+14,2%', 'tone' => 'green'],
                ['label' => 'Target tercapai', 'value' => '74%', 'change' => 'dari Rp 25 jt', 'tone' => 'blue'],
                ['label' => 'Outlet dikunjungi', 'value' => '28', 'change' => 'dari 36 outlet', 'tone' => 'amber'],
                ['label' => 'Pesanan hari ini', 'value' => '12', 'change' => '3 menunggu', 'tone' => 'violet'],
            ],
            'visits' => [
                ['time' => '09.00', 'outlet' => 'Toko Berkah Jaya', 'area' => 'Kemang, Jakarta Selatan', 'status' => 'Selesai', 'initials' => 'BJ'],
                ['time' => '11.30', 'outlet' => 'Rita Mart', 'area' => 'Pancoran, Jakarta Selatan', 'status' => 'Berikutnya', 'initials' => 'RM'],
                ['time' => '14.00', 'outlet' => 'Toko Sumber Rejeki', 'area' => 'Tebet, Jakarta Selatan', 'status' => 'Terjadwal', 'initials' => 'SR'],
            ],
        ]);
    }

    public function outlets(Request $request): Response
    {
        $area = $request->user()->isAdmin() ? 'admin' : 'sales';
        $outlets = [
            ['code' => 'OTL-0001', 'name' => 'Toko Berkah Jaya', 'owner' => 'Pak Hendra', 'phone' => '0812 3456 7890', 'city' => 'Jakarta Selatan', 'type' => 'Grosir', 'status' => 'Aktif', 'initials' => 'BJ'],
            ['code' => 'OTL-0002', 'name' => 'Rita Mart', 'owner' => 'Bu Rita', 'phone' => '0813 4567 8901', 'city' => 'Jakarta Selatan', 'type' => 'Retail', 'status' => 'Aktif', 'initials' => 'RM'],
            ['code' => 'OTL-0003', 'name' => 'Toko Sumber Rejeki', 'owner' => 'Pak Joko', 'phone' => '0821 9876 5432', 'city' => 'Depok', 'type' => 'Retail', 'status' => 'Menunggu verifikasi', 'initials' => 'SR'],
            ['code' => 'OTL-0004', 'name' => 'Maju Jaya Wholesale', 'owner' => 'Bu Lina', 'phone' => '0819 2233 4455', 'city' => 'Tangerang', 'type' => 'Grosir', 'status' => 'Aktif', 'initials' => 'MJ'],
            ['code' => 'OTL-0005', 'name' => 'Warung Pak Dedi', 'owner' => 'Pak Dedi', 'phone' => '0856 1122 3344', 'city' => 'Bekasi', 'type' => 'Warung', 'status' => 'Menunggu verifikasi', 'initials' => 'PD'],
        ];

        return Inertia::render('Outlets/Index', [
            'area' => $area,
            'outlets' => $area === 'sales' ? array_slice($outlets, 0, 4) : $outlets,
        ]);
    }

    public function createOutlet(Request $request): Response
    {
        return Inertia::render('Outlets/Create', [
            'area' => $request->user()->isAdmin() ? 'admin' : 'sales',
        ]);
    }
}
