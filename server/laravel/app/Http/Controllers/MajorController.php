<?php

namespace App\Http\Controllers;

use App\Service\MajorService;
use Illuminate\Http\Request;

class MajorController extends Controller
{
    /**
     * /api/majors/
     */
    public function list(Request $request)
    {
        $input = $request->all();
        $var = [];
        if (isset($input['t_faculty_id']))
        {
            $var['t_faculty_id'] = $input['t_faculty_id'];
        }
        $major = new MajorService();
        return $major->getList($var);
    }
}
