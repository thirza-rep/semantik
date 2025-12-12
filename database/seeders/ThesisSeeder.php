<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Thesis;
use App\Models\User;

class ThesisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get dosen users
        $dosen1 = User::where('email', 'ahmad@semantik.com')->first();
        $dosen2 = User::where('email', 'siti@semantik.com')->first();

        if (!$dosen1 || !$dosen2) {
            $this->command->warn('Dosen users not found. Please run AdminSeeder first.');
            return;
        }

        // Sample thesis data
        $theses = [
            [
                'user_id' => $dosen1->id,
                'title' => 'Implementasi Web Semantik untuk Sistem Rekomendasi Skripsi Berbasis Ontologi',
                'year' => 2024,
                'description' => 'Penelitian ini membahas implementasi teknologi web semantik dalam membangun sistem rekomendasi skripsi yang cerdas menggunakan ontologi. Sistem ini mampu memberikan rekomendasi skripsi yang relevan berdasarkan minat dan keahlian mahasiswa.',
                'category' => 'Web Semantik',
                'keywords' => 'web semantik, ontologi, sistem rekomendasi, RDF, OWL',
                'author_name' => 'Muhammad Rizki Pratama',
                'file_path' => 'dummy.pdf',
                'file_size' => 2048576,
            ],
            [
                'user_id' => $dosen1->id,
                'title' => 'Pengembangan Knowledge Graph untuk Repository Digital Skripsi',
                'year' => 2024,
                'description' => 'Skripsi ini mengembangkan knowledge graph untuk mengelola dan mengorganisir repository digital skripsi. Knowledge graph memungkinkan pencarian yang lebih cerdas dan penemuan hubungan antar skripsi.',
                'category' => 'Knowledge Management',
                'keywords' => 'knowledge graph, repository digital, linked data, SPARQL',
                'author_name' => 'Siti Aisyah Putri',
                'file_path' => 'dummy.pdf',
                'file_size' => 3145728,
            ],
            [
                'user_id' => $dosen2->id,
                'title' => 'Ontologi dalam Pencarian Informasi Skripsi Menggunakan SPARQL',
                'year' => 2024,
                'description' => 'Penelitian tentang penggunaan ontologi dan query SPARQL untuk meningkatkan efektivitas pencarian informasi dalam repository skripsi. Sistem ini menggunakan semantic web technologies untuk pencarian yang lebih akurat.',
                'category' => 'Information Retrieval',
                'keywords' => 'ontologi, SPARQL, information retrieval, semantic search',
                'author_name' => 'Ahmad Fauzi Rahman',
                'file_path' => 'dummy.pdf',
                'file_size' => 1835008,
            ],
            [
                'user_id' => $dosen2->id,
                'title' => 'RDF dan SPARQL dalam Manajemen Data Akademik',
                'year' => 2024,
                'description' => 'Implementasi RDF (Resource Description Framework) dan SPARQL untuk manajemen data akademik yang lebih terstruktur dan mudah diakses. Penelitian ini menunjukkan keunggulan semantic web dalam pengelolaan data.',
                'category' => 'Semantic Web',
                'keywords' => 'RDF, SPARQL, data akademik, semantic web, triple store',
                'author_name' => 'Dewi Kusuma Wardani',
                'file_path' => 'dummy.pdf',
                'file_size' => 2621440,
            ],
            [
                'user_id' => $dosen1->id,
                'title' => 'Linked Data untuk Integrasi Repository Skripsi Multi-Universitas',
                'year' => 2023,
                'description' => 'Penelitian ini mengeksplorasi penggunaan linked data untuk mengintegrasikan repository skripsi dari berbagai universitas. Sistem ini memungkinkan pencarian lintas repository dengan mudah.',
                'category' => 'Linked Data',
                'keywords' => 'linked data, integrasi data, repository, URI, LOD',
                'author_name' => 'Budi Santoso Wijaya',
                'file_path' => 'dummy.pdf',
                'file_size' => 2359296,
            ],
            [
                'user_id' => $dosen2->id,
                'title' => 'Machine Learning dalam Klasifikasi Otomatis Skripsi Berdasarkan Topik',
                'year' => 2023,
                'description' => 'Pengembangan sistem klasifikasi otomatis skripsi menggunakan algoritma machine learning. Sistem ini dapat mengkategorikan skripsi secara otomatis berdasarkan konten dan topik pembahasan.',
                'category' => 'Machine Learning',
                'keywords' => 'machine learning, klasifikasi, NLP, text mining, deep learning',
                'author_name' => 'Fitri Handayani',
                'file_path' => 'dummy.pdf',
                'file_size' => 3407872,
            ],
            [
                'user_id' => $dosen1->id,
                'title' => 'Semantic Web Technologies untuk E-Learning Adaptif',
                'year' => 2023,
                'description' => 'Implementasi teknologi semantic web dalam membangun sistem e-learning yang adaptif terhadap kebutuhan dan kemampuan mahasiswa. Sistem menggunakan ontologi untuk personalisasi konten pembelajaran.',
                'category' => 'E-Learning',
                'keywords' => 'semantic web, e-learning, ontologi, personalisasi, adaptif',
                'author_name' => 'Eko Prasetyo Nugroho',
                'file_path' => 'dummy.pdf',
                'file_size' => 2883584,
            ],
            [
                'user_id' => $dosen2->id,
                'title' => 'Analisis Sentimen Terhadap Skripsi Menggunakan Natural Language Processing',
                'year' => 2023,
                'description' => 'Penelitian ini menggunakan teknik NLP untuk menganalisis sentimen dan kualitas penulisan skripsi. Sistem dapat memberikan feedback otomatis untuk perbaikan penulisan.',
                'category' => 'Natural Language Processing',
                'keywords' => 'NLP, analisis sentimen, text analysis, sentiment analysis',
                'author_name' => 'Rina Marlina',
                'file_path' => 'dummy.pdf',
                'file_size' => 1966080,
            ],
            [
                'user_id' => $dosen1->id,
                'title' => 'Blockchain untuk Verifikasi Keaslian Dokumen Skripsi Digital',
                'year' => 2024,
                'description' => 'Implementasi teknologi blockchain untuk memastikan keaslian dan integritas dokumen skripsi digital. Sistem ini mencegah pemalsuan dan plagiasi dokumen akademik.',
                'category' => 'Blockchain',
                'keywords' => 'blockchain, verifikasi, digital signature, smart contract',
                'author_name' => 'Arif Budiman',
                'file_path' => 'dummy.pdf',
                'file_size' => 2097152,
            ],
            [
                'user_id' => $dosen2->id,
                'title' => 'Sistem Deteksi Plagiasi Skripsi Menggunakan Deep Learning',
                'year' => 2024,
                'description' => 'Pengembangan sistem deteksi plagiasi yang akurat menggunakan algoritma deep learning. Sistem ini dapat mendeteksi berbagai jenis plagiasi termasuk parafrase dan terjemahan.',
                'category' => 'Deep Learning',
                'keywords' => 'deep learning, plagiasi, deteksi, neural network, similarity',
                'author_name' => 'Lina Kusumawati',
                'file_path' => 'dummy.pdf',
                'file_size' => 3670016,
            ],
        ];

        foreach ($theses as $thesis) {
            Thesis::create($thesis);
        }

        $this->command->info('Sample thesis data created successfully!');
    }
}
