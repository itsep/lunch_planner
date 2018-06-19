-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for osx10.13 (x86_64)
--
-- Host: localhost    Database: lunch_planner
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'dnadoba@gmail.com','$2b$13$vctRsfUVl9wg4XbIem8.iO4cgo.u90N7.xUidCLPXbpJRLuUyaGZm',1);
INSERT INTO `account` VALUES (2,'sebastian1210@web.de','$2b$13$Lqwe0Cbo57P/aP5IskPDjO9RRp9PO.53VMpfiXefhv1/vwh4vlGf2',2);
INSERT INTO `account` VALUES (3,'a.ferhat@hotmail.de','$2b$13$Kw2bD/3kJsQwclZwkipq7u8vX76p8EMj1MeGKZfMXkqgGQ0D1Vs9K',3);
INSERT INTO `account` VALUES (4,'marcmehrer@t-online.de','$2b$13$s1/sOos9GPAeyd2hR3qHze4w0z5U/ggJica7jU6cwehpw9bRrh1Fq',4);
INSERT INTO `account` VALUES (5,'munzinger3@gmail.com','$2b$13$opJdGxl0na0PjELj7IJ4cuENdX9z/MFeGVGMjR8FtH.w.3w7zMzrK',5);
INSERT INTO `account` VALUES (6,'jacob.brewer@gmail.com','$2b$13$YbPFY5dPpxza0wCBFuKnT.oWnNi6XCN0BDalGkqsxhr6ga6aLZ47u',6);
INSERT INTO `account` VALUES (7,'drew.grey@gmail.com','$2b$13$Ii2LmMRz.NHt10ZxoOkLDeLo9uPYAhZVHTzghmyJgwQAyBzAXlOka',7);
INSERT INTO `account` VALUES (8,'arnold.parry@gmail.com','$2b$13$Krm9/9qFTd7il0eVmWL5GeTNLBZMMH/ADlwRYRfwUSPEAwi7pmZUG',8);
INSERT INTO `account` VALUES (9,'roxy.swift@gmail.com','$2b$13$oYZ4KvBTR/gJHBmbq3/Ltuj2fsiVs62t3XejUool2kil1rUe5.sOG',9);
INSERT INTO `account` VALUES (10,'joyce.wood@gmail.com','$2b$13$qIOM31ogt8uLHF6Qs08AAuMUjw0V.FBWGnnotWrlpBRcPOlEtRfG6',10);
INSERT INTO `account` VALUES (11,'caitlin.mellor@gmail.com','$2b$13$Q1IjkT/sHm8rRq51zg6YbeQm6tKobDIxUmAj.xeyqwxt5rg1sP9I6',11);
INSERT INTO `account` VALUES (12,'daniela.neal@gmail.com','$2b$13$jQhuOrE7lTUsJo0gV/5l0uvD4PrTEKLE2xhG3YENPRkLlQCkPSGvS',12);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `invitation`
--

LOCK TABLES `invitation` WRITE;
/*!40000 ALTER TABLE `invitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ios_notification_registration`
--

LOCK TABLES `ios_notification_registration` WRITE;
/*!40000 ALTER TABLE `ios_notification_registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `ios_notification_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `join_up_at`
--

LOCK TABLES `join_up_at` WRITE;
/*!40000 ALTER TABLE `join_up_at` DISABLE KEYS */;
INSERT INTO `join_up_at` VALUES (3,5,'13:45:00','2018-06-19','2018-06-18 09:59:48');
INSERT INTO `join_up_at` VALUES (3,5,'14:45:00','2018-06-19','2018-06-18 10:04:13');
INSERT INTO `join_up_at` VALUES (3,7,'14:00:00','2018-06-19','2018-06-18 10:00:53');
INSERT INTO `join_up_at` VALUES (4,5,'14:45:00','2018-06-19','2018-06-18 10:04:09');
INSERT INTO `join_up_at` VALUES (4,6,'14:15:00','2018-06-19','2018-06-18 10:02:52');
INSERT INTO `join_up_at` VALUES (4,7,'14:00:00','2018-06-19','2018-06-18 10:01:00');
INSERT INTO `join_up_at` VALUES (5,5,'13:45:00','2018-06-19','2018-06-18 09:59:52');
INSERT INTO `join_up_at` VALUES (5,5,'14:45:00','2018-06-19','2018-06-18 10:04:03');
INSERT INTO `join_up_at` VALUES (5,7,'14:00:00','2018-06-19','2018-06-18 10:01:02');
INSERT INTO `join_up_at` VALUES (6,5,'14:45:00','2018-06-19','2018-06-18 10:04:10');
INSERT INTO `join_up_at` VALUES (6,8,'14:45:00','2018-06-19','2018-06-18 10:02:24');
INSERT INTO `join_up_at` VALUES (6,9,'13:45:00','2018-06-19','2018-06-18 10:00:23');
INSERT INTO `join_up_at` VALUES (7,5,'14:45:00','2018-06-19','2018-06-18 10:04:07');
INSERT INTO `join_up_at` VALUES (7,6,'14:15:00','2018-06-19','2018-06-18 10:03:14');
INSERT INTO `join_up_at` VALUES (7,8,'14:00:00','2018-06-19','2018-06-19 20:57:37');
INSERT INTO `join_up_at` VALUES (7,9,'14:00:00','2018-06-19','2018-06-19 20:57:52');
INSERT INTO `join_up_at` VALUES (8,6,'13:45:00','2018-06-19','2018-06-18 10:02:46');
INSERT INTO `join_up_at` VALUES (8,8,'14:15:00','2018-06-19','2018-06-18 10:02:16');
INSERT INTO `join_up_at` VALUES (8,8,'14:45:00','2018-06-19','2018-06-18 10:02:27');
INSERT INTO `join_up_at` VALUES (9,5,'14:45:00','2018-06-19','2018-06-18 10:04:00');
INSERT INTO `join_up_at` VALUES (10,5,'14:45:00','2018-06-19','2018-06-18 10:03:46');
INSERT INTO `join_up_at` VALUES (11,5,'14:45:00','2018-06-19','2018-06-18 10:03:57');
INSERT INTO `join_up_at` VALUES (11,7,'14:00:00','2018-06-19','2018-06-18 10:01:10');
INSERT INTO `join_up_at` VALUES (11,9,'13:45:00','2018-06-19','2018-06-18 10:00:15');
INSERT INTO `join_up_at` VALUES (13,5,'14:45:00','2018-06-19','2018-06-18 10:03:50');
INSERT INTO `join_up_at` VALUES (13,7,'14:00:00','2018-06-19','2018-06-18 10:01:06');
INSERT INTO `join_up_at` VALUES (13,9,'13:45:00','2018-06-19','2018-06-18 10:00:13');
/*!40000 ALTER TABLE `join_up_at` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Dean & David','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',1);
INSERT INTO `location` VALUES (2,'Pizzeria','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',1);
INSERT INTO `location` VALUES (3,'Metzgerei','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',1);
INSERT INTO `location` VALUES (4,'vsf-dining-room','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',1);
INSERT INTO `location` VALUES (5,'Starbucks','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (6,'Dean & David','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (7,'Domino\'s Pizza','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (8,'KFC','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (9,'Subway','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `lunchspace`
--

LOCK TABLES `lunchspace` WRITE;
/*!40000 ALTER TABLE `lunchspace` DISABLE KEYS */;
INSERT INTO `lunchspace` VALUES (1,'VSF Experts Mannheim','vsf-experts-ma');
INSERT INTO `lunchspace` VALUES (2,'Team It','it');
INSERT INTO `lunchspace` VALUES (3,'HS-Mannheim','hs-mannheim');
INSERT INTO `lunchspace` VALUES (4,'Food-Friends','food-friends');
/*!40000 ALTER TABLE `lunchspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `member_of`
--

LOCK TABLES `member_of` WRITE;
/*!40000 ALTER TABLE `member_of` DISABLE KEYS */;
INSERT INTO `member_of` VALUES (1,1,1);
INSERT INTO `member_of` VALUES (1,2,1);
INSERT INTO `member_of` VALUES (1,3,1);
INSERT INTO `member_of` VALUES (2,1,0);
INSERT INTO `member_of` VALUES (2,2,0);
INSERT INTO `member_of` VALUES (2,3,0);
INSERT INTO `member_of` VALUES (2,4,0);
INSERT INTO `member_of` VALUES (3,1,0);
INSERT INTO `member_of` VALUES (3,2,0);
INSERT INTO `member_of` VALUES (3,3,0);
INSERT INTO `member_of` VALUES (3,4,0);
INSERT INTO `member_of` VALUES (4,1,0);
INSERT INTO `member_of` VALUES (4,2,0);
INSERT INTO `member_of` VALUES (4,3,0);
INSERT INTO `member_of` VALUES (4,4,0);
INSERT INTO `member_of` VALUES (5,1,0);
INSERT INTO `member_of` VALUES (5,2,0);
INSERT INTO `member_of` VALUES (5,3,0);
INSERT INTO `member_of` VALUES (5,4,0);
INSERT INTO `member_of` VALUES (6,1,0);
INSERT INTO `member_of` VALUES (6,2,0);
INSERT INTO `member_of` VALUES (6,3,0);
INSERT INTO `member_of` VALUES (6,4,0);
INSERT INTO `member_of` VALUES (7,1,0);
INSERT INTO `member_of` VALUES (7,2,0);
INSERT INTO `member_of` VALUES (7,3,0);
INSERT INTO `member_of` VALUES (7,4,0);
INSERT INTO `member_of` VALUES (8,1,0);
INSERT INTO `member_of` VALUES (8,2,0);
INSERT INTO `member_of` VALUES (8,3,0);
INSERT INTO `member_of` VALUES (8,4,0);
INSERT INTO `member_of` VALUES (9,1,0);
INSERT INTO `member_of` VALUES (9,2,0);
INSERT INTO `member_of` VALUES (9,3,0);
INSERT INTO `member_of` VALUES (9,4,0);
INSERT INTO `member_of` VALUES (10,1,0);
INSERT INTO `member_of` VALUES (10,2,0);
INSERT INTO `member_of` VALUES (10,3,0);
INSERT INTO `member_of` VALUES (10,4,0);
INSERT INTO `member_of` VALUES (11,1,0);
INSERT INTO `member_of` VALUES (11,2,0);
INSERT INTO `member_of` VALUES (11,3,0);
INSERT INTO `member_of` VALUES (11,4,0);
INSERT INTO `member_of` VALUES (12,1,0);
INSERT INTO `member_of` VALUES (12,2,0);
INSERT INTO `member_of` VALUES (12,3,0);
INSERT INTO `member_of` VALUES (12,4,0);
/*!40000 ALTER TABLE `member_of` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'David','Nadoba','de','/api/images/fa49193f-8c80-4163-add4-e7e4b333c7dd.png');
INSERT INTO `user` VALUES (2,'Sebastian','Vogt','de','/api/images/2230a0c4-a6b6-4ef6-b7b9-57cca6e64464.png');
INSERT INTO `user` VALUES (3,'Ferhat','Ayaydin','de','/api/images/ce50e50f-78ac-42d4-a907-02cfe5a86e4c.png');
INSERT INTO `user` VALUES (4,'Marc','Mehrer','de','/api/images/e739492f-6a6d-4798-8fab-35189d41f147.png');
INSERT INTO `user` VALUES (5,'Fabian','Munzinger','de','/api/images/bc188c6d-3c98-404b-83e8-84b943da03d5.png');
INSERT INTO `user` VALUES (6,'Jacob','Brewer','en-US','/api/images/599b0a6a-2ae9-4531-946f-c03240a6df7f.png');
INSERT INTO `user` VALUES (7,'Drew','Grey','en-US','/api/images/c5f839d4-d521-48b5-9489-c586bab25398.png');
INSERT INTO `user` VALUES (8,'Arnold','Parry','en-US','/api/images/92dc07e6-a6c4-4944-88e4-54c8802ccd40.png');
INSERT INTO `user` VALUES (9,'Roxy','Swift','en-US','/api/images/b1001118-1b63-4ba8-8627-c52d365499e7.png');
INSERT INTO `user` VALUES (10,'Joyce','Wood','en-US','/api/images/c2589c4e-eb36-4737-a7ee-2b87c05e2b41.png');
INSERT INTO `user` VALUES (11,'Caitlin','Mellor','en-US','/api/images/5096680e-9989-4d2e-9dcb-43e1225429ea.png');
INSERT INTO `user` VALUES (12,'Daniela','Neal','en-US','/api/images/7ce78e21-bfed-4952-afd2-a2b66f8edd55.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `web_notification_subscription`
--

LOCK TABLES `web_notification_subscription` WRITE;
/*!40000 ALTER TABLE `web_notification_subscription` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_notification_subscription` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
