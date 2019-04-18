<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::view('/{path?}', 'app');

Route::get('/', 'NotificationController@index');
Route::get('/share', 'NotificationController@share');
Route::get('/send_notification/{id}', 'NotificationController@sendNotification');
Route::post('save_data', 'NotificationController@storeData');