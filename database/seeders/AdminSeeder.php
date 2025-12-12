<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        \App\Models\User::create([
            'name' => 'Administrator',
            'email' => 'admin@semantik.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'phone' => '081234567890',
        ]);

        // Create sample dosen users
        \App\Models\User::create([
            'name' => 'Dr. Ahmad Hidayat',
            'email' => 'ahmad@semantik.com',
            'password' => bcrypt('dosen123'),
            'role' => 'dosen',
            'nidn' => '0123456789',
            'phone' => '081234567891',
        ]);

        \App\Models\User::create([
            'name' => 'Dr. Siti Nurjanah',
            'email' => 'siti@semantik.com',
            'password' => bcrypt('dosen123'),
            'role' => 'dosen',
            'nidn' => '0123456790',
            'phone' => '081234567892',
        ]);

        // Create sample mahasiswa users
        \App\Models\User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@semantik.com',
            'password' => bcrypt('mahasiswa123'),
            'role' => 'mahasiswa',
            'nim' => '2021001',
            'phone' => '081234567893',
        ]);

        \App\Models\User::create([
            'name' => 'Dewi Lestari',
            'email' => 'dewi@semantik.com',
            'password' => bcrypt('mahasiswa123'),
            'role' => 'mahasiswa',
            'nim' => '2021002',
            'phone' => '081234567894',
        ]);
    }
}
