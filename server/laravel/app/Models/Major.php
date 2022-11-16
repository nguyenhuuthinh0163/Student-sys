<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    use HasFactory;
    use SoftDeletes;
    const T_MAJOR_ID = 't_major_id';
    const T_FACULTY_ID = 't_faculty_id';
    const T_MAJOR_NAME = 't_major_name';
    const DELETED_AT = 'deleted_at';
    const CREATED_ID = 'created_id';
    const CREATED_DATETIME = 'created_datetime';
    const UPDATED_ID = 'updated_id';
    const UPDATE_DATETIME = 'update_datetime';

    public $table = "t_major";
    protected $primaryKey = self::T_MAJOR_ID;
    protected $fillable = [
        self::T_MAJOR_ID,
        self::T_FACULTY_ID,
        self::T_MAJOR_NAME,
        self::DELETED_AT,
        self::CREATED_ID,
        self::CREATED_DATETIME,
        self::UPDATED_ID,
        self::UPDATE_DATETIME
    ];
}
