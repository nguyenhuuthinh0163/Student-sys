<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
class ResponseResource extends JsonResource
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
            'code' => $request->code,
            'message' => $request->message,
        ];
    }
}