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
	 * @return Array
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
		->where($student->getTable().'.'.Student::DELETED_AT, null)
		->orderBy(Student::T_STUDENT_ID, 'DESC')->get();
		return $list;
	}

	/**
	 * Get one Student
	 * 
	 * @param String $t_student_id t_student_id
	 * @return Array
	 */
	public static function getOne($t_student_id)
	{
		$one_student = Student::where(Student::T_STUDENT_ID, $t_student_id)->first();
		return $one_student;
	}

	/**
	 * Insert new student
	 * 
	 * @param Array $var Validated fields
	 * @return Array
	 */
	public static function insert($var)
	{
		try
		{
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
			$newStudent = self::getOne($student[Student::T_STUDENT_ID]);

			return $newStudent;
		}
		catch (Exception $ex)
		{
			return $ex->getMessage();
		}
	}

	/**
	 * Update a student
	 * 
	 * @param Array $var Validated fields
	 * @param String  $t_student_id t_student_id
	 * @return Array
	 */
	public static function update($var, $t_student_id)
	{
		try
		{
			Student::where(Student::T_STUDENT_ID, $t_student_id)
			->update([
				Student::T_MAJOR_ID				=> $var['t_major_id'],
				Student::T_FACULTY_ID			=> $var['t_faculty_id'],
				Student::T_STUDENT_NAME			=> $var['t_student_name'],
				Student::T_STUDENT_BIRTHDAY		=> $var['t_student_birthday'],
				Student::T_STUDENT_GENDER		=> $var['t_student_gender'],
				Student::T_STUDENT_ADDRESS		=> $var['t_student_address'],
				Student::T_STUDENT_PHONE_NUMBER	=> $var['t_student_phone_number'],
				Student::UPDATED_AT				=> date('Y-m-d h:i:s'),
			]);
			$updatedStudent = self::getOne($t_student_id);

			return $updatedStudent;
		}
		catch (Exception $ex)
		{
			return $ex->getMessage();
		}
	}

	/**
	 * Delete one Student
	 * 
	 * @param String $t_student_id t_student_id
	 * @return void
	 */
	public static function deleteOneStudent($t_student_id)
	{
		try
		{
			Student::where(Student::T_STUDENT_ID, $t_student_id)->update(Student::DELETED_AT, date('Y-m-d h:i:s'));
		}
		catch (Exception $ex)
		{
			return $ex->getMessage();
		}
	}

	/**
	 * Delete list Student
	 * 
	 * @param Array $listStudent List of student id
	 * @return void
	 */
	public static function deleteListStudent($listStudent)
	{
		try
		{
			Student::whereIn(Student::T_STUDENT_ID, $listStudent)->count();
			
			// update(Student::DELETED_AT, date('Y-m-d h:i:s'));
		}
		catch (Exception $ex)
		{
			return $ex->getMessage();
		}
	}

	/**
	 * Validate list Student
	 * 
	 * @param Array $listStudent List of student id
	 * @return void
	 */
	public static function validateListStudent($listStudent)
	{
		$availableStudent = Student::whereIn(Student::T_STUDENT_ID, $listStudent)
		->where(Student::DELETED_AT, null)
		->count();
		
		if ($availableStudent !== count($listStudent))
		{
			return false;
		}
		return true;
	}

	/**
	 * Validate one Student
	 * 
	 * @param String $t_student_id t_student_id
	 * @return void
	 */
	public static function validateOneStudent($t_student_id)
	{
		$student = Student::where([
			Student::T_STUDENT_ID	=> $t_student_id,
			Student::DELETED_AT		=> null,
		])->first();
		
		if ($student)
		{
			return true;
		}
		return false;
	}
}
