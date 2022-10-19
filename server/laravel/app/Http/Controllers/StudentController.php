<?php

namespace App\Http\Controllers;

use App\Models\Student;

class StudentController extends Controller
{
    /**
     * /api/students/
     */
    public function list()
    {
        return Student::all();
    }
}
