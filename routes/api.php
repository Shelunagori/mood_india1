<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::get('user', 'NotificationController@userdata');
Route::get('agegroups', 'NotificationController@age_group');
Route::get('income_level', 'NotificationController@income_level');
Route::get('genders', 'NotificationController@gender');
Route::get('maritial', 'NotificationController@maritial');
Route::get('language', 'NotificationController@language');
Route::get('device', 'NotificationController@device');
Route::get('group', 'NotificationController@group');
Route::get('poll', 'NotificationController@poll');
Route::post('save_data', 'NotificationController@storeData');
Route::get('countries', 'NotificationController@countries');
Route::get('states', 'NotificationController@states');
Route::get('location', 'NotificationController@location');
Route::get('location_para/{country}/{state}', 'NotificationController@location_para');
Route::get('states_para/{country}', 'NotificationController@states_para');
