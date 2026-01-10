<?php

namespace App\Policies;

use App\Models\Thesis;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ThesisPolicy
{
    /**
     * Determine whether the user can download or preview the thesis.
     * The thesis is only accessible if the library clearance is approved.
     */
    public function viewContent(User $user, Thesis $thesis): bool
    {
        // Admin can always view? User said: 
        // "Admin hanya boleh approve/reject surat bebas pustaka, bukan skripsi; 
        // file thesis boleh didownload/ditampilkan hanya jika status clearance sudah approved."
        // This means even Admin is restricted until they approve it.
        
        return $thesis->clearance && $thesis->clearance->status === 'approved';
    }

    /**
     * Determine whether the user can upload clearance.
     */
    public function uploadClearance(User $user, Thesis $thesis): bool
    {
        // Only owner or admin can upload? Usually just owner.
        return $user->id === $thesis->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can manage (approve/reject) clearance.
     */
    public function manageClearance(User $user, Thesis $thesis): bool
    {
        return $user->isAdmin();
    }
}
