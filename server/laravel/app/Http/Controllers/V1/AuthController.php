<?php

namespace App\Http\Controllers\V1;

use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Http\Requests\Auth\AuthRequest;
use App\Http\Resources\Auth\AuthResource;
use App\Http\Resources\Auth\ResponseResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\SuccessResource;
use Illuminate\Http\Request;
use App\Models\User;
use DateTime;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	/**
	 * Register user
	 *
	 * @OA\Post(
	 *      path="/api/v1/register",
	 *      tags={"Auth"},
	 *      @OA\RequestBody(
	 *         required=true,
	 *         @OA\JsonContent(
	 *              ref="#/components/schemas/CreateUserRequest"
	 *         )
	 *      ),
	 *      @OA\Response(
	 *          response=200,
	 *          description="Successful operation",
	 *          @OA\JsonContent(ref="#/components/schemas/AuthResource")
	 *       ),
	 *      @OA\Response(
	 *          response=401,
	 *          description="Unauthenticated",
	 *      ),
	 *      @OA\Response(
	 *          response=403,
	 *          description="Forbidden"
	 *      )
	 * )
	 * @param CreateUserRequest $request
	 * @return AuthResource
	 */
	public function createUser(CreateUserRequest $request): AuthResource
	{
		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'permission' => 1,
			'deleted_at' => null,
			'created_at' => now(),
			'updated_at' => null,
		]);

		return new AuthResource($user);
	}

	/**
	 * User login
	 *
	 * @OA\Post(
	 *      path="/api/v1/login",
	 *      tags={"Auth"},
	 *      @OA\RequestBody(
	 *         required=true,
	 *         @OA\JsonContent(
	 *              ref="#/components/schemas/AuthRequest"
	 *         )
	 *      ),
	 *      @OA\Response(
	 *          response=200,
	 *          description="Successful operation",
	 *          @OA\JsonContent(ref="#/components/schemas/AuthResource")
	 *       ),
	 *      @OA\Response(
	 *          response=401,
	 *          description="Unauthenticated",
	 *      ),
	 *      @OA\Response(
	 *          response=403,
	 *          description="Forbidden"
	 *      )
	 * )
	 *
	 * @param AuthRequest $request
	 * @return AuthResource
	 */
	public function login(AuthRequest $request): AuthResource
	{
		if ( ! Auth::attempt($request->only('email', 'password'))) {
			throw new Exception('Username or password is wrong');
		}
		$user = User::where('email', $request['email'])->firstOrFail();

		return new AuthResource($user);
	}

	/**
	 * User profile
	 *
	 * @OA\Get(
	 *      path="/api/v1/profile",
	 *      tags={"Auth"},
	 *      security={{ "sanctum": {} }},
	 *      @OA\Response(
	 *          response=200,
	 *          description="Successful operation",
	 *          @OA\JsonContent(ref="#/components/schemas/UserResource")
	 *       ),
	 *      @OA\Response(
	 *          response=401,
	 *          description="Unauthenticated",
	 *      ),
	 *      @OA\Response(
	 *          response=403,
	 *          description="Forbidden"
	 *      )
	 * )
	 *
	 * @param Request $request
	 * @return UserResource
	 */
	public function profile(Request $request): UserResource
	{
		return new UserResource($request->user());
	}

	/**
	 * User logout
	 *
	 * @OA\Post(
	 *      path="/api/v1/logout",
	 *      tags={"Auth"},
	 *      security={{ "sanctum": {} }},
	 *      @OA\Response(
	 *          response=200,
	 *          description="Successful operation",
	 *          @OA\JsonContent(ref="#/components/schemas/SuccessResource")
	 *       ),
	 *      @OA\Response(
	 *          response=401,
	 *          description="Unauthenticated",
	 *      ),
	 *      @OA\Response(
	 *          response=403,
	 *          description="Forbidden"
	 *      )
	 * )
	 * 
	 * @param Request $request
	 * @return ResponseResource ResponseResource
	 */
	public function logout(Request $request)
	{
		if (is_null($request->bearerToken()))
		{
			return [
				"code"		=> 401,
				"message"	=> "Unauthenticated."
			];
		}
		$tokenId = explode("|", $request->bearerToken())[0];
		$savedToken = Auth::user()->tokens()->where('id', $tokenId);
		if ($savedToken)
		{
			$savedToken->delete();
		}
		auth()->guard('web')->logout();
		return [
			"code"		=> 200,
			"message"	=> "Logout Successfull"
		];
	}
}