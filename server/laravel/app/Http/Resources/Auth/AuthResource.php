<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *      properties={
 *          @OA\Property(
 *              property="success",
 *              type="boolean",
 *              example="true"
 *          ),
 *          @OA\Property(
 *              property="data",
 *              type="object",
 *                  @OA\Property(property="token", type="string", example="3|PXX3pewsSBbtJhJQXXuRZ1NiLHzTvD6Bv2TBUJjm"),
 *                  @OA\Property(property="token_type", type="string", example="Bearer"),
 *          ),
 *          @OA\Property(
 *              property="message",
 *              type="string",
 *              example="success"
 *          )
 *      }
 * )
 */
class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            $this->createToken("api")->plainTextToken
        ];
    }
}