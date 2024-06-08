<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('customers', 'App\Http\Controllers\CustomerController');
Route ::apiResource('doctors', 'App\Http\Controllers\DoctorController');
Route::apiResource('booking', 'App\Http\Controllers\BookingController');
Route::apiResource('users', 'App\Http\Controllers\AdminController');
