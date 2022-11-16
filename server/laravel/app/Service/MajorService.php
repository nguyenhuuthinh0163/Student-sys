<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;
use App\Models\Major;

/**
 * MajorService
 */
class MajorService
{

	/**
	 * Get list of Major
	 *
	 * @param Array $options List of input
	 * @return Array
	 */
	public static function getList($options)
	{
		$list = Major::where(Major::DELETED_AT, null);
		if (isset($options['t_faculty_id']))
		{
			$list = $list->where(Major::T_FACULTY_ID, $options['t_faculty_id']);
		}
		$list = $list->orderBy(Major::T_MAJOR_NAME)->get();

		$data = [];
		foreach ($list as $row)
		{
			$data[] = self::modelToArray($row);
		}
		return $data;
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
			Major::T_MAJOR_ID	=> $model[Major::T_MAJOR_ID],
			Major::T_FACULTY_ID	=> $model[Major::T_FACULTY_ID],
			Major::T_MAJOR_NAME	=> $model[Major::T_MAJOR_NAME],
		];
		return $result;
	}
}
