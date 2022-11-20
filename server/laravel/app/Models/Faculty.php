<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;
    use SoftDeletes;
    const T_FACULTY_ID = 't_faculty_id';
    const T_FACULTY_NAME = 't_faculty_name';
    const DELETED_AT = 'deleted_at';
    const CREATED_ID = 'created_id';
    const CREATED_AT = 'created_at';
    const UPDATED_ID = 'updated_id';
    const UPDATED_AT = 'updated_at';

    public $table = "t_faculty";
    protected $primaryKey = self::T_FACULTY_ID;
    protected $fillable = [
        self::T_FACULTY_ID,
        self::T_FACULTY_NAME,
        self::DELETED_AT,
        self::CREATED_ID,
        self::CREATED_AT,
        self::UPDATED_ID,
        self::UPDATED_AT
    ];
}
