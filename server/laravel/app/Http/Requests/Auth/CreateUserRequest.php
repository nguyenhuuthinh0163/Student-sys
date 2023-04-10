<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *      properties={
 *          @OA\Property(property="name", type="string", example="huunv"),
 *          @OA\Property(property="email", type="string", example="huunv@gmail.com"),
 *          @OA\Property(property="password", type="string", example="123456"),
 *      }
 * )
 */
class CreateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:user,email',
            'password' => 'required'
        ];
    }
}