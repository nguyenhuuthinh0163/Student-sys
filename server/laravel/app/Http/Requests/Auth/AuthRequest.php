<?php

namespace App\Http\Requests\Auth;

use App\Exceptions\ApiException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *      properties={
 *          @OA\Property(property="email", type="string", example="huunv@gmail.com"),
 *          @OA\Property(property="password", type="string", example="123456"),
 *      }
 * )
 */
class AuthRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }
}