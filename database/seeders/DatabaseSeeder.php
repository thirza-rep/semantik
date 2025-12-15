<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@semantik.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Dosen User
        User::create([
            'name' => 'Dosen User',
            'email' => 'dosen@semantik.com',
            'password' => bcrypt('password'),
            'role' => 'dosen',
            'email_verified_at' => now(),
        ]);

        // Create Mahasiswa User
        User::create([
            'name' => 'Mahasiswa User',
            'email' => 'mahasiswa@semantik.com',
            'password' => bcrypt('password'),
            'role' => 'mahasiswa',
            'email_verified_at' => now(),
        ]);
    }
}
