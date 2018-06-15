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
INSERT INTO `account` VALUES (2,'alesia.albrecht@web.de','$2b$13$zvhcizPenFaqtJtjaQNZ5uudReA5YreWeAwdTzaTNke0WBLDq799a',2);
INSERT INTO `account` VALUES (3,'1614997@stud.hs-mannheim.de','$2b$13$Kw2bD/3kJsQwclZwkipq7u8vX76p8EMj1MeGKZfMXkqgGQ0D1Vs9K',3);
INSERT INTO `account` VALUES (4,'1622019@stud.hs-mannheim.de','$2b$13$s1/sOos9GPAeyd2hR3qHze4w0z5U/ggJica7jU6cwehpw9bRrh1Fq',4);
INSERT INTO `account` VALUES (5,'1529702@stud.hs-mannheim.de','$2b$13$opJdGxl0na0PjELj7IJ4cuENdX9z/MFeGVGMjR8FtH.w.3w7zMzrK',5);
INSERT INTO `account` VALUES (6,'ortega_marcel@yahoo.de','$2b$13$oWXw2UKkjnfn4AH12ylvFe6Hyi4.mwL.JBvDd4fycKpD0q7KDM7mu',6);
INSERT INTO `account` VALUES (7,'LuShanty@freenet.de','$2b$13$Lqwe0Cbo57P/aP5IskPDjO9RRp9PO.53VMpfiXefhv1/vwh4vlGf2',7);
INSERT INTO `account` VALUES (8,'sebastian1210@web.de','$2b$13$Lqwe0Cbo57P/aP5IskPDjO9RRp9PO.53VMpfiXefhv1/vwh4vlGf2',8);
INSERT INTO `account` VALUES (9,'hicham.soussi1986@yahoo.de','$2b$13$E1aeZI9GBfi8v/Ilnuro9.fuPojP81a9u7RDo5ly6I1LVIS1OWTPe',9);
INSERT INTO `account` VALUES (10,'Habitak53@gmail.com','$2b$13$qMliLS8Bewni450bjYThvO4gA0HH3DjRIhjI1qc08f0L0wqj4fSWC',10);
INSERT INTO `account` VALUES (11,'frederikgeier@t-online.de','$2b$13$y4O2hMJDWcLyc.wuctK3n.IEcsTAsF87L6.YXhD58NqoVHer/QnCm',11);
INSERT INTO `account` VALUES (12,'Thomas.loran@arcor.de','$2b$13$vixvodEYHKZhM6Hi4SCSj.MmSDsOF4H7n4hH1JLhuJoqjTmPujVLm',12);
INSERT INTO `account` VALUES (13,'evan.evan@gmail.com','$2b$13$bjcXH./TE6tQzzfCH/EZg.zAyBbzrXaQI2n2ka4TrerueR88d0qhK',13);
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
-- Dumping data for table `join_up_at`
--

LOCK TABLES `join_up_at` WRITE;
/*!40000 ALTER TABLE `join_up_at` DISABLE KEYS */;
INSERT INTO `join_up_at` VALUES (1,1,'13:00:00','2018-06-13','2018-05-18 12:30:00');
INSERT INTO `join_up_at` VALUES (1,2,'13:00:00','2018-06-13','2018-05-18 12:30:01');
INSERT INTO `join_up_at` VALUES (1,3,'12:30:00','2018-06-13','2018-05-18 12:30:02');
INSERT INTO `join_up_at` VALUES (1,4,'12:30:00','2018-06-13','2018-05-18 12:30:03');
INSERT INTO `join_up_at` VALUES (1,4,'13:00:00','2018-06-13','2018-05-18 12:30:04');
INSERT INTO `join_up_at` VALUES (2,2,'12:30:00','2018-06-13','2018-05-18 12:30:05');
INSERT INTO `join_up_at` VALUES (2,3,'13:00:00','2018-06-13','2018-05-18 12:30:06');
INSERT INTO `join_up_at` VALUES (2,4,'13:00:00','2018-06-13','2018-05-18 12:30:07');
INSERT INTO `join_up_at` VALUES (3,1,'12:30:00','2018-06-13','2018-05-18 12:30:08');
INSERT INTO `join_up_at` VALUES (3,3,'13:00:00','2018-06-13','2018-05-18 12:30:09');
INSERT INTO `join_up_at` VALUES (3,4,'13:00:00','2018-06-13','2018-05-18 12:30:10');
INSERT INTO `join_up_at` VALUES (4,2,'13:00:00','2018-06-13','2018-05-18 12:30:20');
INSERT INTO `join_up_at` VALUES (4,3,'12:30:00','2018-06-13','2018-05-18 12:30:30');
INSERT INTO `join_up_at` VALUES (4,4,'12:30:00','2018-06-13','2018-05-18 12:30:40');
INSERT INTO `join_up_at` VALUES (4,4,'13:00:00','2018-06-13','2018-05-18 12:30:50');
INSERT INTO `join_up_at` VALUES (5,1,'13:30:00','2018-06-13','2018-05-18 12:31:00');
INSERT INTO `join_up_at` VALUES (5,2,'13:00:00','2018-06-13','2018-05-18 12:32:00');
INSERT INTO `join_up_at` VALUES (6,1,'13:00:00','2018-06-13','2018-05-18 12:33:00');
INSERT INTO `join_up_at` VALUES (6,2,'12:00:00','2018-06-13','2018-05-18 12:34:00');
INSERT INTO `join_up_at` VALUES (6,4,'13:00:00','2018-06-13','2018-05-18 12:35:00');
INSERT INTO `join_up_at` VALUES (7,2,'12:30:00','2018-06-13','2018-05-18 12:36:00');
INSERT INTO `join_up_at` VALUES (7,3,'13:00:00','2018-06-13','2018-05-18 12:37:00');
INSERT INTO `join_up_at` VALUES (7,4,'12:30:00','2018-06-13','2018-05-18 12:38:00');
INSERT INTO `join_up_at` VALUES (7,4,'13:00:00','2018-06-13','2018-05-18 12:39:00');
INSERT INTO `join_up_at` VALUES (8,1,'13:00:00','2018-06-13','2018-05-18 12:40:00');
INSERT INTO `join_up_at` VALUES (8,2,'13:00:00','2018-06-13','2018-05-18 12:50:00');
INSERT INTO `join_up_at` VALUES (8,3,'13:00:00','2018-06-13','2018-05-18 13:30:00');
INSERT INTO `join_up_at` VALUES (8,4,'13:00:00','2018-06-13','2018-05-18 14:30:00');
INSERT INTO `join_up_at` VALUES (8,4,'13:30:00','2018-06-13','2018-05-18 15:30:00');
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
INSERT INTO `location` VALUES (5,'Mensa','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (6,'Sonnendeck','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (7,'Café Integral','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (8,'Tankstelle','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
INSERT INTO `location` VALUES (9,'Lidl','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',4);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `lunchspace`
--

LOCK TABLES `lunchspace` WRITE;
/*!40000 ALTER TABLE `lunchspace` DISABLE KEYS */;
INSERT INTO `lunchspace` VALUES (1,'VSF Experts Mannheim','vsf-experts-ma');
INSERT INTO `lunchspace` VALUES (2,'HS-Mannheim','hs-mannheim');
INSERT INTO `lunchspace` VALUES (3,'It','it');
INSERT INTO `lunchspace` VALUES (4,'IZI','izi');
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
INSERT INTO `member_of` VALUES (1,4,1);
INSERT INTO `member_of` VALUES (2,1,0);
INSERT INTO `member_of` VALUES (2,2,0);
INSERT INTO `member_of` VALUES (2,3,0);
INSERT INTO `member_of` VALUES (2,4,1);
INSERT INTO `member_of` VALUES (3,1,0);
INSERT INTO `member_of` VALUES (3,2,0);
INSERT INTO `member_of` VALUES (3,3,0);
INSERT INTO `member_of` VALUES (3,4,1);
INSERT INTO `member_of` VALUES (4,1,0);
INSERT INTO `member_of` VALUES (4,2,0);
INSERT INTO `member_of` VALUES (4,3,0);
INSERT INTO `member_of` VALUES (4,4,1);
INSERT INTO `member_of` VALUES (5,1,0);
INSERT INTO `member_of` VALUES (5,2,0);
INSERT INTO `member_of` VALUES (5,3,0);
INSERT INTO `member_of` VALUES (5,4,1);
INSERT INTO `member_of` VALUES (6,1,0);
INSERT INTO `member_of` VALUES (6,2,0);
INSERT INTO `member_of` VALUES (6,3,0);
INSERT INTO `member_of` VALUES (6,4,1);
INSERT INTO `member_of` VALUES (7,1,0);
INSERT INTO `member_of` VALUES (7,2,0);
INSERT INTO `member_of` VALUES (7,3,0);
INSERT INTO `member_of` VALUES (7,4,1);
INSERT INTO `member_of` VALUES (8,1,0);
INSERT INTO `member_of` VALUES (8,2,0);
INSERT INTO `member_of` VALUES (8,3,0);
INSERT INTO `member_of` VALUES (8,4,0);
INSERT INTO `member_of` VALUES (9,1,0);
INSERT INTO `member_of` VALUES (9,2,0);
INSERT INTO `member_of` VALUES (9,4,0);
INSERT INTO `member_of` VALUES (10,1,0);
INSERT INTO `member_of` VALUES (10,2,0);
INSERT INTO `member_of` VALUES (10,4,0);
INSERT INTO `member_of` VALUES (11,1,0);
INSERT INTO `member_of` VALUES (11,2,0);
INSERT INTO `member_of` VALUES (11,4,0);
INSERT INTO `member_of` VALUES (12,1,0);
INSERT INTO `member_of` VALUES (12,2,0);
INSERT INTO `member_of` VALUES (12,4,0);
INSERT INTO `member_of` VALUES (13,1,0);
INSERT INTO `member_of` VALUES (13,2,0);
INSERT INTO `member_of` VALUES (13,4,0);
/*!40000 ALTER TABLE `member_of` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'David','Nadoba','de','https://pbs.twimg.com/profile_images/845411989589504000/af0aKVig_400x400.jpg');
INSERT INTO `user` VALUES (2,'Alesia','Albrecht','de',NULL);
INSERT INTO `user` VALUES (3,'Ferhat','Ayaydin','de','https://avatars3.githubusercontent.com/u/24521977?s=400&v=4');
INSERT INTO `user` VALUES (4,'Marc','Mehrer','de','https://avatars2.githubusercontent.com/u/26874205?s=400&v=4');
INSERT INTO `user` VALUES (5,'Fabian','Munzinger','de','https://avatars2.githubusercontent.com/u/22883071?s=400&v=4');
INSERT INTO `user` VALUES (6,'Marcel','Ortega','de',NULL);
INSERT INTO `user` VALUES (7,'Luisa','Müller','de',NULL);
INSERT INTO `user` VALUES (8,'Sebastian','Vogt','de','https://avatars2.githubusercontent.com/u/26856272?s=400&v=4');
INSERT INTO `user` VALUES (9,'Hicham','Soussi','de','https://image.ibb.co/hrxHqJ/hicham.jpg');
INSERT INTO `user` VALUES (10,'Furkan','Katar','de','https://image.ibb.co/jfk3VJ/furkan.jpg');
INSERT INTO `user` VALUES (11,'Frederik','Geier','de','https://image.ibb.co/mWjrHy/fredi.jpg');
INSERT INTO `user` VALUES (12,'Thomas','Loran','de','https://image.ibb.co/fgKVAJ/thomas.jpg');
INSERT INTO `user` VALUES (13,'Evan','Evan','de','https://image.ibb.co/bH6Gjd/even.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
