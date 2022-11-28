<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\Major;
use Exception;

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
		->orderBy(Student::T_STUDENT_ID, 'DESC')->get();
		return $list;
	}

	/**
	 * Insert new student
	 * 
	 * @param Array $var Validated fields
	 * @return Array
	 */
	public static function insert($var)
	{
		try {
			$student = Student::create([
				Student::T_MAJOR_ID				=> $var['t_major_id'],
				Student::T_FACULTY_ID			=> $var['t_faculty_id'],
				Student::T_STUDENT_NAME			=> $var['t_student_name'],
				Student::T_STUDENT_BIRTHDAY		=> $var['t_student_birthday'],
				Student::T_STUDENT_GENDER		=> $var['t_student_gender'],
				Student::T_STUDENT_ADDRESS		=> $var['t_student_address'],
				Student::T_STUDENT_PHONE_NUMBER	=> $var['t_student_phone_number'],
				// Student::T_STUDENT_IMAGE_URL	=> $var['T_STUDENT_IMAGE_URL'],
				Student::DELETED_AT				=> null,
				Student::CREATED_ID				=> 0,
				Student::CREATED_AT				=> date('Y-m-d h:i:s'),
				Student::UPDATED_ID				=> 0,
				Student::UPDATED_AT				=> null,
			]);
			$student->save();

			return $student;
		} catch (Exception $ex) {
			return $ex->getMessage();
		}
	}
}
