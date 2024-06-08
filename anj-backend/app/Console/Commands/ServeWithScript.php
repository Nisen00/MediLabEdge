<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ServeWithScript extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'serves';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start the server with custom script';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->line('Running script...'); 
        $path = base_path('/server');
        $this->line('Running script at path: ' . $path);
        exec("cd $path && npm start");

    }
}
