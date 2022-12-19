<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use Faker\Generator as Faker;
use Faker\Provider\vi_VN\Person;
use Faker\Provider\vi_VN\Address;
use Faker\Provider\vi_VN\PhoneNumber;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Student::create([
            Student::T_MAJOR_ID				=> random_int(0,5),
            Student::T_FACULTY_ID			=> 1,
            Student::T_STUDENT_NAME			=> Person::firstNameFemale().' '.Person::middleNameFemale(),
            Student::T_STUDENT_BIRTHDAY		=> random_int(1995, 2004) .'-'.random_int(3, 12).'-'.random_int(1, 30),
            Student::T_STUDENT_GENDER		=> 0,
            Student::T_STUDENT_ADDRESS		=> Address::randomNumber(2, true).' '.Address::streetSuffix().Address::citySuffix().' city',
            Student::T_STUDENT_PHONE_NUMBER	=> '0'.random_int(1, 999999999),
            // Student::T_STUDENT_IMAGE_URL	=> $var['T_STUDENT_IMAGE_URL'],
            Student::DELETED_AT				=> null,
            Student::CREATED_ID				=> 0,
            Student::CREATED_AT				=> date('Y-m-d h:i:s'),
            Student::UPDATED_ID				=> 0,
            Student::UPDATED_AT				=> null,
        ])->save();

        Student::create([
            Student::T_MAJOR_ID				=> random_int(2, 4),
            Student::T_FACULTY_ID			=> 1,
            Student::T_STUDENT_NAME			=> Person::firstNameMale().' '.Person::middleNameMale(),
            Student::T_STUDENT_BIRTHDAY		=> random_int(1995, 2004) .'-'.random_int(3, 12).'-'.random_int(1, 30),
            Student::T_STUDENT_GENDER		=> 0,
            Student::T_STUDENT_ADDRESS		=> Address::randomNumber(2, true).' '.Address::streetSuffix().Address::citySuffix().' city',
            Student::T_STUDENT_PHONE_NUMBER	=> '0'.random_int(1, 999999999),
            // Student::T_STUDENT_IMAGE_URL	=> $var['T_STUDENT_IMAGE_URL'],
            Student::DELETED_AT				=> null,
            Student::CREATED_ID				=> 0,
            Student::CREATED_AT				=> date('Y-m-d h:i:s'),
            Student::UPDATED_ID				=> 0,
            Student::UPDATED_AT				=> null,
        ])->save();
    }
}
