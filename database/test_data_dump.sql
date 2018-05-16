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
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `join_up_at`
--

LOCK TABLES `join_up_at` WRITE;
/*!40000 ALTER TABLE `join_up_at` DISABLE KEYS */;
INSERT INTO `join_up_at` VALUES (1, 1, '10:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (2, 1, '10:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (3, 1, '10:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (1, 1, '11:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (2, 1, '11:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (5, 1, '11:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (3, 1, '11:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (1, 1, '12:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (2, 1, '12:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (5, 1, '12:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (3, 1, '12:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (4, 1, '12:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (1, 1, '12:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (2, 1, '12:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (3, 1, '12:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (4, 1, '12:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (5, 1, '12:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (6, 1, '12:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (3, 1, '13:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (4, 1, '13:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (4, 1, '14:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (1, 2, '12:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (5, 3, '13:00', '16.05.2018');
INSERT INTO `join_up_at` VALUES (6, 4, '14:30', '16.05.2018');
INSERT INTO `join_up_at` VALUES (7, 4, '15:00', '16.05.2018');
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
INSERT INTO `member_of` VALUES (3,1,0);
INSERT INTO `member_of` VALUES (3,2,0);
INSERT INTO `member_of` VALUES (3,3,0);
INSERT INTO `member_of` VALUES (4,1,0);
INSERT INTO `member_of` VALUES (4,2,0);
INSERT INTO `member_of` VALUES (4,3,0);
INSERT INTO `member_of` VALUES (5,1,0);
INSERT INTO `member_of` VALUES (5,2,0);
INSERT INTO `member_of` VALUES (5,3,0);
INSERT INTO `member_of` VALUES (6,1,0);
INSERT INTO `member_of` VALUES (6,2,0);
INSERT INTO `member_of` VALUES (6,3,0);
INSERT INTO `member_of` VALUES (7,1,0);
INSERT INTO `member_of` VALUES (7,2,0);
INSERT INTO `member_of` VALUES (7,3,0);
/*!40000 ALTER TABLE `member_of` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'David','Nadoba',NULL);
INSERT INTO `user` VALUES (2,'Alesia','Albrecht',NULL);
INSERT INTO `user` VALUES (3,'Ferhat','Ayaydin',NULL);
INSERT INTO `user` VALUES (4,'Marc','Mehrer',NULL);
INSERT INTO `user` VALUES (5,'Fabian','Munzinger',NULL);
INSERT INTO `user` VALUES (6,'Marcel','Ortega',NULL);
INSERT INTO `user` VALUES (7,'Luisa','M�ller',NULL);
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
