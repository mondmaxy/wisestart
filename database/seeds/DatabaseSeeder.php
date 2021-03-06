<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call(AreasTableSeeder::class);
         $this->call(PolygonTableSeeder::class);
         $this->call(CoordinateTableSeeder::class);
    }
}
