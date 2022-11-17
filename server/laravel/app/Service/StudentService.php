<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\Major;

/**
 * StudentService
 */
class StudentService
{
	/**
	 * Get list of Student
	 *
	 * @return void
	 */
	public static function getList()
	{
		$student = new Student();
		$major = new Major();
		$faculty = new Faculty();

		$list = DB::table($student->getTable())
		->join($major->getTable(), $major->getTable().'.'.Major::T_MAJOR_ID, '=', $student->getTable().'.'.Student::T_MAJOR_ID)
		->join($faculty->getTable(), $faculty->getTable().'.'.Faculty::T_FACULTY_ID, '=', $student->getTable().'.'.Student::T_FACULTY_ID)
		->select($student->getTable().'.*', Major::T_MAJOR_NAME, Faculty::T_FACULTY_NAME, $major->getTable().'.'.Major::T_MAJOR_ID, $faculty->getTable().'.'.Faculty::T_FACULTY_ID)
		->get();
		return $list;
	}
}
