<?php

namespace App\Http\Controllers;

use App\Service\StudentService;

class StudentController extends Controller
{
    /**
     * /api/students/
     */
    public function list()
    {
        $student = new StudentService();
        return $student->getList();
    }
}
