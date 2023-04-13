CREATE DATABASE  IF NOT EXISTS `school_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `school_system`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: school_system
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_faculty`
--

DROP TABLE IF EXISTS `t_faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_faculty` (
  `t_faculty_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `t_faculty_name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`t_faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_faculty`
--

LOCK TABLES `t_faculty` WRITE;
/*!40000 ALTER TABLE `t_faculty` DISABLE KEYS */;
INSERT INTO `t_faculty` (`t_faculty_id`, `t_faculty_name`, `deleted_at`, `created_id`, `created_at`, `updated_id`, `updated_at`) VALUES (1,'Information Technology',NULL,1,'2022-10-14 15:20:20',0,'0000-00-00 00:00:00'),(2,'Accoutance',NULL,1,'2022-10-14 15:20:20',0,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `t_faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_major`
--

DROP TABLE IF EXISTS `t_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_major` (
  `t_major_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `t_faculty_id` bigint(20) NOT NULL,
  `t_major_name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`t_major_id`),
  KEY `t_major_faculty_idx` (`t_faculty_id`),
  CONSTRAINT `t_major_faculty` FOREIGN KEY (`t_faculty_id`) REFERENCES `t_faculty` (`t_faculty_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_major`
--

LOCK TABLES `t_major` WRITE;
/*!40000 ALTER TABLE `t_major` DISABLE KEYS */;
INSERT INTO `t_major` (`t_major_id`, `t_faculty_id`, `t_major_name`, `deleted_at`, `created_id`, `created_at`, `updated_id`, `updated_at`) VALUES (2,1,'Software Engineering',NULL,1,'2022-10-14 15:20:20',0,'0000-00-00 00:00:00'),(3,1,'Software Architecture Engineering',NULL,1,'2022-10-14 15:20:20',0,'0000-00-00 00:00:00'),(4,1,'Tester',NULL,1,'2022-10-14 15:20:20',0,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `t_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_student`
--

DROP TABLE IF EXISTS `t_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_student` (
  `t_student_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `t_major_id` bigint(20) NOT NULL,
  `t_faculty_id` bigint(20) NOT NULL,
  `t_student_name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `t_student_birthday` date DEFAULT NULL,
  `t_student_gender` tinyint(1) DEFAULT NULL,
  `t_student_address` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `t_student_phone_number` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `t_student_image_url` text COLLATE utf8mb4_unicode_ci,
  `deleted_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`t_student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_student`
--

LOCK TABLES `t_student` WRITE;
/*!40000 ALTER TABLE `t_student` DISABLE KEYS */;
INSERT INTO `t_student` (`t_student_id`, `t_major_id`, `t_faculty_id`, `t_student_name`, `t_student_birthday`, `t_student_gender`, `t_student_address`, `t_student_phone_number`, `t_student_image_url`, `deleted_at`, `created_id`, `created_at`, `updated_id`, `updated_at`) VALUES (13,2,1,'Thinh','1996-07-06',1,'6/1 Pham Van Nghi','0335492537',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(14,3,1,'Truong','2000-06-06',1,'6/2 Pham Van Nghi','0335648225',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(15,4,1,'Phu','2000-12-06',1,'6/3 Pham Van Nghi','0558643554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(16,2,1,'Tam','2000-12-06',1,'1 Duy Tan','0558343554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(17,3,1,'Hue','2001-12-06',1,'99 Nguyen Van Linh','0548643554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(18,4,1,'Kieu','1990-12-06',0,'03 Hai Phong','0558645554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(19,2,1,'Tuyen','1995-07-06',0,'23 Nguyen Van Thoai','0558673554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(20,3,1,'Vy','1992-07-06',0,'90 Nui Thanh','0558643654',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(21,4,1,'Vi','1998-07-06',0,'25 Nui Thanh','0554333454',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(22,2,1,'Can','1999-07-06',1,'27 Yen Bai','0552643554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(23,3,1,'Danh','1994-07-06',1,'25 Yên Bái','0558649654',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(24,4,1,'Trinh','1999-07-06',1,'3 Hoàng Diệu','0551113554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(25,2,1,'Toan','1987-07-06',1,'3 Nguyễn Thành Hãn','0511143554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(26,3,1,'Minh','1987-07-06',0,'3 fpt place','0558643511',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(27,4,1,'Tự','1999-07-06',1,'09 Hòa Vang','0223343554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(28,2,1,'Sơn','1992-07-06',1,'02 Hòa Xuân','0551123554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(29,3,1,'Thọ','1999-07-06',1,'02 Hòa Quý','0544322254',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(30,4,1,'Tiên','1993-07-06',0,'99 Nguyễn Văn Thoại','0522343554',NULL,NULL,1,'2022-10-14 15:20:20',1,NULL),(32,4,1,'Duy','1996-02-29',1,'23 Nghĩa Lộ','0166334549',NULL,NULL,0,'2022-11-23 04:06:37',0,NULL),(33,2,1,'Long','1996-02-09',1,'24 Nghĩa Lộ','0652335158',NULL,NULL,0,'2022-11-23 04:18:39',0,NULL),(34,2,1,'Thương','1999-01-02',1,'aaaa','0156552335',NULL,NULL,0,'2022-11-23 04:22:09',0,NULL),(35,2,1,'Thiên','1995-01-01',0,'aaa','0136554885',NULL,NULL,0,'2022-11-23 04:23:18',0,NULL),(36,2,1,'Nguyễn Thiếu Kỳ','1996-12-22',1,'187/22 Nguyễn Công Phương, tp Quảng Ngãi','0955345662',NULL,NULL,0,'2022-11-23 07:01:17',0,NULL),(37,3,1,'test','1996-02-21',0,'2222','0352445221',NULL,NULL,0,'2022-11-23 07:06:39',0,NULL),(38,2,1,'123 user','1999-01-01',0,'sdfsdf','0335492537',NULL,NULL,0,'2022-11-23 07:09:48',0,NULL),(39,2,1,'Edited 39','1996-07-06',1,'123 Nguyen Huu Tho','0552455569',NULL,NULL,0,'2022-11-23 07:20:15',0,'2022-11-30 09:29:06'),(40,2,1,'test','1999-01-02',1,'aaa','0778767675',NULL,NULL,0,'2022-11-30 06:58:02',0,NULL),(41,2,1,'test 2','1998-02-02',1,'ssadasd','0998777676',NULL,NULL,0,'2022-11-30 06:59:06',0,NULL),(42,4,1,'test 3','1899-01-02',1,'1','0998878876',NULL,NULL,0,'2022-11-30 07:00:41',0,NULL),(43,2,1,'New student getone','1996-07-06',1,'123 Nguyen Huu Tho','0552455569',NULL,NULL,0,'2022-12-02 08:56:08',0,NULL),(44,2,1,'Another one','1996-07-06',1,'123 Nguyen Huu Tho','0552455561',NULL,NULL,0,'2022-12-02 08:56:56',0,'2022-12-02 09:02:00'),(45,2,1,'Thịnh','1996-01-02',1,'12 Nguyễn Chí Thanh','0335492537',NULL,NULL,0,'2023-02-07 03:54:52',0,NULL);
/*!40000 ALTER TABLE `t_student` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
