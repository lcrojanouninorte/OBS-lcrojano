<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
use App\Layer;



class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        '\App\Console\Commands\UpdateExternalAPIs',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
<<<<<<< HEAD
        $schedule->command("OBS:updateAPIs")->cron('* * * * * *')->sendOutputTo(storage_path('logs/obsExternalApiUpdates.log'));
=======
        $schedule->command("OBS:updateAPIs")->cron('* * * * * *')->appendOutputTo(storage_path('logs/obsExternalApiUpdates.log'));
>>>>>>> f28da96f16008ada72ae86c39623643931c4b283
        ;
    }

    
}
