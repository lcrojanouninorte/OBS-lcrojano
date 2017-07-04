<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'AngularController@serveApp');
    Route::get('/unsupported-browser', 'AngularController@unsupported');
    Route::get('user/verify/{verificationCode}', ['uses' => 'Auth\AuthController@verifyUserEmail']);
    Route::get('auth/{provider}', ['uses' => 'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' => 'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', 'Auth\AuthController@getAuthenticatedUser');


});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');

    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
    $api->post('auth/register', 'Auth\AuthController@postRegister');
    $api->get('answer', 'AnswerController@store');
    //$api->get('survey/{type}', 'SurveyController@show');
    $api->get('answers/{type}', 'AnswerController@chartData');

 $api->controller('users', 'UserController');
    $api->get('users', 'UserController@getIndex');



});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');
    $api->post('projects', 'ProjectController@create');
    $api->get('projects', 'ProjectController@index');
    $api->delete('projects/{id}', 'ProjectController@delete');
    $api->get('project/{id}', 'ProjectController@show');
    $api->get('survey/{type}', 'SurveyController@show');
    $api->post('answer', 'AnswerController@store');
    //$api->get('answers/{type}', 'AnswerController@chartData');
});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {
   
});
