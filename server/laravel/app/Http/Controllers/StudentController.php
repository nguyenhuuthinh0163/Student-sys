<?php

namespace App\Http\Controllers;

use App\Service\StudentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * /api/students/
     */
    public function index()
    {
        $student = new StudentService();
        return $student->getList();
    }

    /**
     * Store a newly student.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $birthDayMin = date('Y-m-d', strtotime(date('Y-m-d'). ' - 18 years'));
        $messages = array(
            'required' => 'The :attribute field is required.',
        );
        $validator = Validator::make($request->all(), [
            't_major_id' => 'required',
            't_faculty_id' => 'required',
            't_student_name' => 'required|max:255',
            't_student_birthday' => 'required|before:'.$birthDayMin,
            't_student_gender' => 'required|integer|between:0,1',
            't_student_address' => 'required|max:2500',
            't_student_phone_number' => 'required|regex:/0([0-9]{9})/|max:10',
            // 't_student_image_url' => 'required|unique:posts|max:255',
        ], $messages);
        $validator->setAttributeNames([
            't_major_id' => 'Student major',
            't_faculty_id' => 'faculty',
            't_student_name' => 'student name',
            't_student_birthday' => 'birthday',
            't_student_gender' => 'gender',
            't_student_address' => 'address',
            't_student_phone_number' => 'phone number'
        ]);
        if ($validator->fails())
        {
            return [
                'code'          => 400,
                'error_message' => $validator->errors()
            ];
        }
        $student = new StudentService();
        $result = $student->insert($request->all());

        return [
            'code' => 200,
            'data' => $result
        ];
    }
}
