<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Content\PostCommentController;
use App\Http\Controllers\Content\PostController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MedicineInventory\DrugCategoriesController;
use App\Http\Controllers\MedicineInventory\DrugController;
use App\Http\Controllers\MedicineInventory\DrugPurchaseController;
use App\Http\Controllers\MedicineInventory\DrugSaleController;
use App\Http\Controllers\MedicineInventory\DrugSupplierController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Models\PostCategory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Auth/Login");
});


Route::middleware(['auth', 'verified'])->group(function(){
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::resource('patients', PatientController::class);
        Route::resource('doctors', DoctorController::class);
        Route::resource('appointments', AppointmentController::class);
        Route::resource('drug-categories', DrugCategoriesController::class);
        Route::resource('drugs', DrugController::class)->only(['index', 'create', 'store', 'edit', 'update']);
        Route::resource('drug-suppliers', DrugSupplierController::class)->only(['index', 'store', 'edit', 'update']);
        Route::resource('drugs-purchases', DrugPurchaseController::class)->only(['index', 'create', 'store', 'edit', 'update']);
        Route::resource('drugs-sales', DrugSaleController::class)->only(['index', 'store', 'edit', 'update']);
        Route::resource('blog-categories', PostCategory::class)->only(['index', 'store', 'update']);
        Route::resource('blog-post', PostController::class)->only(['index', 'store', 'edit', 'update', 'delete']);
        Route::resource('comments', PostCommentController::class)->only(['index', 'store', 'edit', 'update', 'delete']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
