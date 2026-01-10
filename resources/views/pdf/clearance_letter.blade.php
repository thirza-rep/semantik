<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            color: #333;
            margin: 40px;
        }
        .header {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 20px;
            text-transform: uppercase;
        }
        .header h2 {
            margin: 5px 0;
            font-size: 16px;
            text-transform: uppercase;
        }
        .header p {
            margin: 0;
            font-size: 12px;
        }
        .letter-title {
            text-align: center;
            margin-bottom: 40px;
        }
        .letter-title h3 {
            text-decoration: underline;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        .content {
            margin-bottom: 40px;
        }
        .content p {
            text-indent: 40px;
            text-align: justify;
        }
        .data-table {
            margin: 20px 0 20px 40px;
        }
        .data-table td {
            padding: 5px;
            vertical-align: top;
        }
        .footer {
            float: right;
            width: 250px;
            text-align: center;
            margin-top: 50px;
        }
        .footer .signature-space {
            height: 80px;
        }
        .clear {
            clear: both;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PERPUSTAKAAN PUSAT</h1>
        <h2>UNIVERSITAS SEMANTIK MODERN</h2>
        <p>Jl. Ilmu Pengetahuan No. 123, Indonesia | Telp: (021) 1234567</p>
        <p>Email: perpustakaan@semantik.ac.id | Website: library.semantik.ac.id</p>
    </div>

    <div class="letter-title">
        <h3>SURAT KETERANGAN BEBAS PUSTAKA</h3>
        <p>Nomor: {{ $thesis->letter_number }}</p>
    </div>

    <div class="content">
        <p>Kepala Perpustakaan Pusat Universitas Semantik Modern dengan ini menerangkan bahwa:</p>
        
        <table class="data-table">
            <tr>
                <td width="150">Nama Mahasiswa</td>
                <td width="10">:</td>
                <td><strong>{{ $thesis->author_name }}</strong></td>
            </tr>
            <tr>
                <td>NIM</td>
                <td>:</td>
                <td>{{ $thesis->nim }}</td>
            </tr>
            <tr>
                <td>Program Studi</td>
                <td>:</td>
                <td>{{ $thesis->prodi }}</td>
            </tr>
            <tr>
                <td>Fakultas</td>
                <td>:</td>
                <td>{{ $thesis->fakultas }}</td>
            </tr>
            <tr>
                <td>Judul Skripsi</td>
                <td>:</td>
                <td>"{{ $thesis->title }}"</td>
            </tr>
        </table>

        <p>Telah memenuhi segala persyaratan administrasi perpustakaan dan **BEBAS** dari pinjaman koleksi perpustakaan, serta telah menyerahkan salinan tugas akhir/skripsi yang telah disetujui.</p>
        
        <p>Demikian surat keterangan ini diberikan untuk dapat dipergunakan sebagaimana mestinya.</p>
    </div>

    <div class="footer">
        <p>{{ now()->translatedFormat('d F Y') }}</p>
        <p>Kepala Perpustakaan,</p>
        <div class="signature-space"></div>
        <p><strong>( ____________________ )</strong></p>
        <p>NIP. ...........................</p>
    </div>

    <div class="clear"></div>
</body>
</html>
