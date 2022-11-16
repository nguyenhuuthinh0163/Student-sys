<?php

namespace App\Http\Controllers;

use App\Service\FacultyService;

class FacultyController extends Controller
{
    /**
     * /api/faculties/
     */
    public function list()
    {
        $faculty = new FacultyService();
        return $faculty->getList();
    }
}
