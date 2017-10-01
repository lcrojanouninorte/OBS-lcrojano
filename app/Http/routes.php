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
    Route::get('api/challenges', 'ChallengeController@index');
     


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
   // $api->get('users', 'UserController@getIndex');
    $api->get('/challenges', 'ChallengeController@index');

    $api->post('results', 'ResultController@create');


   $api->get('project/{id}', 'ProjectController@show');

   //$api->resource('budgets', 'BudgetController');
   $api->get('budgets/{product_id}', 'BudgetController@budget_product');
   $api->post('product/budgets', 'ProductController@addBudget');
   
   


});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');


    $api->post('projects', 'ProjectController@create');
    $api->get('projects', 'ProjectController@index');
    $api->delete('projects/{id}', 'ProjectController@delete');
    

    $api->get('survey/{type}', 'SurveyController@show');
    $api->post('answer', 'AnswerController@store');
    $api->post('challenge', 'ChallengeController@store');
    //$api->get('challenge', 'ChallengeController@index');

    $api->get('results/{project_id}', 'ResultController@index');
    
    
    //$api->get('answers/{type}', 'AnswerController@chartData');

    $api->controller('users', 'UserController');

    $api->get('users/{role}', 'UserController@getUsersByRole'); //TODO solo admin
    $api->post('empresarios', 'UserController@postEmpresario');

    //Productos
    $api->resource('products', 'ProductController');
    $api->post('products/check', 'ProductController@updateCheck');

});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {
   
});
