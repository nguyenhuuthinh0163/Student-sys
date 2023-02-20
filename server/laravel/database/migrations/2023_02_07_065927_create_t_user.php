<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('t_user.', function (Blueprint $table) {
            $table->increments('t_user_id');
            $table->dateTime('created_at', $precision = 0);
        });
        // CREATE TABLE `t_user` (
        //     `t_user_id` bigint(20) NOT NULL AUTO_INCREMENT,
        //     `t_user_name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
        //     `t_user_email` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
        //     `t_user_password` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
        //     `t_user_permission` tinyint(4) DEFAULT '0',
        //     `deleted_at` datetime DEFAULT NULL,
        //     `created_id` int(11) NOT NULL,
        //     `created_at` datetime NOT NULL,
        //     `updated_id` int(11) NOT NULL,
        //     `updated_at` datetime NOT NULL,
        //     PRIMARY KEY (`t_user_id`)
        //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('t_user.');
    }
}
