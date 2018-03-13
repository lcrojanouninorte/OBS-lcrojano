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
    //Route::get('api/challenges', 'ChallengeController@index');
    
    //Route::get('project/{project_id}/pdf', 'ProjectController@get_pdf');
    //Route::get('project/{project_id}/excel', 'ProjectController@get_excel');
    //Route::get('report/{project_id}/excel', 'ProjectController@get_excel2');
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');
    
    //$api->get('wallets/{user_id}/{product_id}/{budget_product_id}', 'WalletController@walletList'); //TODO solo admin
    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
    $api->post('auth/register', 'Auth\AuthController@postRegister');

    $api->resource('bots', 'BotController');
    //$api->get('answer', 'AnswerController@store');
    //$api->get('survey/{type}', 'SurveyController@show');
    //$api->get('answers/{type}', 'AnswerController@chartData');
   // $api->get('users', 'UserController@getIndex');
    //$api->get('/challenges', 'ChallengeController@index');

    //$api->post('results', 'ResultController@create');


    //$api->get('project/{id}', 'ProjectController@show');
    //$api->get('project/gantt/{id}', 'ProjectController@show_gantt');
    //$api->get('project/{id}/products/{date?}', 'ProjectController@get_products');


    //$api->get('budgets/{product_id}', 'BudgetController@budget_product');
    //$api->get('budgets/{budget_id}/products/{product_id}', 'BudgetController@budget_desc_product');
    //$api->post('product/budgets', 'ProductController@addBudget');
    //$api->resource('budgets', 'BudgetController');

 
        //Milestones
   // $api->get('milestones/{project_id}', 'MilestoneController@index');
    //$api->get('milestones/delayed/{project_id}', 'MilestoneController@delayed');
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {


    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');


  /*   $api->post('projects', 'ProjectController@create');
    $api->get('projects', 'ProjectController@index');
     
    $api->delete('projects/{id}', 'ProjectController@delete');
    $api->get('survey/{type}', 'SurveyController@show');
    $api->post('answer', 'AnswerController@store');
    $api->post('challenge', 'ChallengeController@store');
    //$api->get('challenge', 'ChallengeController@index');

    $api->get('results/{project_id}', 'ResultController@index');
    $api->post('result/upload/{result_id}', 'ResultController@upload_document');
    $api->post('projects/file_download', 'ProjectController@file_download'); */
    
    
    //$api->get('answers/{type}', 'AnswerController@chartData');

    $api->controller('users', 'UserController');
    $api->get('users/{role}', 'UserController@getUsersByRole'); //TODO solo admin
    $api->post('users/add/custom', 'UserController@postUser');
/* 
    //Productos
    $api->resource('products', 'ProductController');
    $api->resource('results', 'ResultController');
    $api->post('products/check', 'ProductController@updateCheck');
    $api->post('result/check', 'ResultController@updateCheck');

            //Milestones
    $api->post('milestone', 'MilestoneController@store');

        //RECURSO: WALLET
    $api->resource('wallets', 'WalletController'); */
});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {
});
