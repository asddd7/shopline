<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        return redirect()->route($request->user()->isAdmin() ? 'admin.dashboard' : 'sales.dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
        Route::get('/outlets', [DashboardController::class, 'outlets'])->name('outlets.index');
        Route::get('/outlets/register', [DashboardController::class, 'createOutlet'])->name('outlets.create');
    });

    Route::prefix('sales')->name('sales.')->middleware('role:sales')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'sales'])->name('dashboard');
        Route::get('/outlets', [DashboardController::class, 'outlets'])->name('outlets.index');
        Route::get('/outlets/register', [DashboardController::class, 'createOutlet'])->name('outlets.create');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
