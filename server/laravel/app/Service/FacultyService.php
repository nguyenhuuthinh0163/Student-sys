<?php

namespace App\Service;

use App\Models\Faculty;

/**
 * FacultyService
 */
class FacultyService
{

	/**
	 * Get list of Faculty
	 *
	 * @return Array
	 */
	public static function getList()
	{
		$list = Faculty::where(Faculty::DELETED_AT, null)
		->orderBy(Faculty::T_FACULTY_NAME)->get();

		$data = [];
		foreach ($list as $row)
		{
			$data[] = self::modelToArray($row);
		}
		return $list;
	}

	/**
	 * Convert model to array
	 *
	 * @param Model $model Model
	 * @return Array
	 */
	public static function modelToArray($model)
	{
		$result = [
			Faculty::T_FACULTY_ID	=> $model[Faculty::T_FACULTY_ID],
			Faculty::T_FACULTY_NAME	=> $model[Faculty::T_FACULTY_NAME],
		];
		return $result;
	}
}
