<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use SoftDeletes;
    const T_STUDENT_ID = 't_student_id';
    const T_MAJOR_ID = 't_major_id';
    const T_FACULTY_ID = 't_faculty_id';
    const T_STUDENT_NAME = 't_student_name';
    const T_STUDENT_BIRTHDAY = 't_student_birthday';
    const T_STUDENT_GENDER = 't_student_gender';
    const T_STUDENT_ADDRESS = 't_student_address';
    const T_STUDENT_PHONE_NUMBER = 't_student_phone_number';
    const T_STUDENT_IMAGE_URL = 't_student_image_url';
    const DELETED_AT = 'deleted_at';
    const CREATED_ID = 'created_id';
    const CREATED_AT = 'created_at';
    const UPDATED_ID = 'updated_id';
    const UPDATED_AT = 'updated_at';

    public $table = "t_student";
    protected $primaryKey = self::T_STUDENT_ID;
    protected $fillable = [
        self::T_STUDENT_ID,
        self::T_MAJOR_ID,
        self::T_FACULTY_ID,
        self::T_STUDENT_NAME,
        self::T_STUDENT_BIRTHDAY,
        self::T_STUDENT_GENDER,
        self::T_STUDENT_ADDRESS,
        self::T_STUDENT_PHONE_NUMBER,
        self::T_STUDENT_IMAGE_URL,
        self::DELETED_AT,
        self::CREATED_ID,
        self::CREATED_AT,
        self::UPDATED_ID,
        self::UPDATED_AT
    ];
}