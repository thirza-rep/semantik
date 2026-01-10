<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Thesis extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'year',
        'description',
        'category',
        'keywords',
        'author_name',
        'nim',
        'prodi',
        'fakultas',
        'file_path',
        'file_size',
        'download_count',
        'letter_number',
        'letter_issued_at',
        'letter_issued_by',
        'letter_file_path',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'letter_issued_at' => 'datetime',
    ];

    /**
     * Attributes to append to model's array form
     */
    protected $appends = ['file_url', 'formatted_file_size', 'is_approved'];

    /**
     * Get the public URL for the PDF file
     */
    public function getFileUrlAttribute()
{
    return $this->file_path
        ? asset('storage/' . $this->file_path)
        : null;
}

    /**
     * Get the user that owns the thesis
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get formatted file size
     */
    public function getFormattedFileSizeAttribute()
    {
        $bytes = $this->file_size;
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }

    /**
     * Scope for searching theses
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('author_name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('keywords', 'like', "%{$search}%");
        });
    }

    /**
     * Scope for filtering by category
     */
    public function scopeCategory($query, $category)
    {
        if ($category) {
            return $query->where('category', $category);
        }
        return $query;
    }

    /**
     * Scope for filtering by year
     */
    public function scopeYear($query, $year)
    {
        if ($year) {
            return $query->where('year', $year);
        }
        return $query;
    }

    /**
     * Scope for year range
     */
    public function scopeYearRange($query, $from, $to)
    {
        if ($from && $to) {
            return $query->whereBetween('year', [$from, $to]);
        } elseif ($from) {
            return $query->where('year', '>=', $from);
        } elseif ($to) {
            return $query->where('year', '<=', $to);
        }
        return $query;
    }

    /**
     * Increment download count
     */
    public function incrementDownloads()
    {
        $this->increment('download_count');
    }

    public function clearance()
    {
        return $this->hasOne(ThesisClearance::class);
    }

    public function getIsApprovedAttribute()
    {
        return $this->clearance && $this->clearance->status === 'approved';
    }

    public function scopeWithApprovedClearance($query)
    {
        return $query->whereHas('clearance', function ($q) {
            $q->where('status', 'approved');
        });
    }

    /**
     * Get the admin who issued the letter
     */
    public function issuer()
    {
        return $this->belongsTo(User::class, 'letter_issued_by');
    }
}
