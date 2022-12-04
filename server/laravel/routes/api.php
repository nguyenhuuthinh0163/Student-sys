<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\MajorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('students', 'App\Http\Controllers\StudentController@list');
// Route::get('majors', 'App\Http\Controllers\MajorController@list');
// Route::get('faculties', 'App\Http\Controllers\FacultyController@list');
Route::resources([
    'students' => StudentController::class,
    'faculties' => FacultyController::class,
    'majors' => MajorController::class,
]);

// Route::delete('/delete/{id}', 'rendezv@destroy')->name('delete');

// Route::resource('photos', PhotoController::class)->except([
//     'create', 'store', 'update', 'destroy'
// ]);
