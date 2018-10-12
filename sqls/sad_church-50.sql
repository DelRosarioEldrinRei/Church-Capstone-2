-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: capstone_church(1)
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `tbl_baptism`
--

DROP TABLE IF EXISTS `tbl_baptism`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_baptism` (
  `int_eventinfoID` int(10) NOT NULL,
  `var_parentmarriageadd` varchar(100) NOT NULL,
  `var_fatherbplace` varchar(100) NOT NULL,
  `var_motherbplace` varchar(100) NOT NULL,
  `var_fathername` varchar(100) NOT NULL,
  `var_mothername` varchar(100) NOT NULL,
  `var_contactnum` varchar(13) NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  CONSTRAINT `tbl_baptism_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_baptism`
--

LOCK TABLES `tbl_baptism` WRITE;
/*!40000 ALTER TABLE `tbl_baptism` DISABLE KEYS */;
INSERT INTO `tbl_baptism` VALUES (35,'asdqwd','caloocan city','caloocan city','papa','mama','09205516439'),(36,'asdqwd','asdwda','qwdasdwd','dsdawd','qwdasda','09205516439'),(37,'Caloocan City','Caloocan City','Caloocan City','Julius Ignacio','Raquel Macaya','09205516439'),(38,'asdasda','asdqwd','asdqwdas','asdqwd','asdqwd','09205516439'),(39,'asdasda','asdqwd','asdqwdas','asdqwd','asdqwd','09205516439'),(40,'Caloocan City','Caloocan City','Caloocan City','Julius Ignacio','Raquel Macaya','09205516439'),(41,'asdasd','qwdasd','asdqwd','dqwdd','qwd','09205516439'),(42,'asdasd','qwda','dqwdasd','asdasd','qwdas','09205516439'),(43,'asdas','dasd','dasd','asdas','asdas','09205516439'),(44,'asd','asd','asd','asd','asd','09205516439'),(45,'asd','asd','asd','asd','asd','09205516439'),(46,'asd','asd','asd','asd','asd','09205516439'),(47,'aasd','asd','asd','asd','asd','09205516439'),(48,'asd','asd','asd','asd','asd','09205516439'),(49,'asd','asd','asd','asd','asd','09205516439'),(50,'asd','asd','asd','asd','asd','09205516439'),(51,'asd','asd','asd','asd','asd','09205516439'),(52,'asd','asd','asd','asd','asd','09205516439'),(53,'asdas','asdas','asdasd','asdasd','asdasd','09205516439'),(54,'asdasdas','asd','asd','asd','asd','09205516439'),(55,'asdasd','asd','asd','asd','asd','09205516439'),(56,'Sta. Ana Manila','Sta. Ana Manila','Sta. Ana Manila','Papi Lacsina','Gracia Lacsina','09205516439'),(57,'Sta. Ana Manila','Sta. Ana Manila','Sta. Ana Manila','Papi Lacsina','Grace Lacsina','09205516439'),(58,'asdasdasd','asdasd','sdasd','dasdd','asda','09205516439'),(59,'asd','asdasd','asd','dasd','asd','09205516439'),(60,'asd','asd','asd','asd','asd','09205516439'),(61,'asd','asd','asd','asd','asd','09205516439'),(62,'asd','as','da','dasd','asdasd','09205516439'),(63,'asd','as','da','dasd','asdasd','09205516439'),(64,'asd','asd','asd','asd','asd','09205516439'),(65,'asd','asd','asd','asd','asd','09205516439'),(66,'asd','asd','asd','asdasd','asd','09205516439'),(67,'asd','asd','asd','asd','asd','09205516439'),(68,'Wala','Calocohan City','San Isidro','Jasper Reeve Mackaia','Khelle Mackaia','0912234564'),(69,'Wala','Calocohan City','San Isidro','Jasper Reeve Mackaia','Khelle Mackaia','0912234564'),(70,'asd','asd','asd','asd','asd','09205516439'),(71,'asd','asd','asd','asd','asd','09205516439'),(72,'asd','asd','asd','asd','asd','09205516439'),(73,'asd','asd','asd','asd','asd','09205516439'),(74,'asd','asd','asd','asd','asd','09205516439'),(75,'asd','asd','asd','asd','asd','09205516439'),(76,'asd','asd','asd','asd','asd','09205516439'),(77,'asd','asd','asd','asd','asd','09205516439'),(78,'asd','asd','asd','asd','asd','09205516439'),(79,'asd','asd','asd','asd','asd','09205516439'),(80,'asd','asd','asd','asd','asd','09205516439'),(81,'asd','asd','asd','asd','asd','09205516439'),(82,'asd','asd','asd','asd','asd','09205516439'),(83,'asd','asd','asd','asd','asd','09205516439'),(84,'asd','asd','asd','asd','asd','09205516439'),(85,'asd','asda','asd','asd','asd','09205516439'),(86,'asd','asd','asd','asd','asd','09205516439'),(87,'asd','asd','asd','asd','asd','09205516439'),(88,'asd','asd','asd','asd','asd','09205516439'),(89,'asd','asd','asd','asd','asd','09205516439'),(90,'asd','asd','asd','asd','asd','09205516439'),(91,'dasd','asd','asd','asd','asd','09205516439'),(92,'asd','asd','asd','asd','asd','09205516439'),(93,'asd','asd','asd','asd','asd','09205516439'),(94,'asd','asd','asd','asd','asd','09205516439'),(95,'asd','asd','asd','asd','asd','09205516439'),(96,'asd','asd','asd','asd','asd','09205516439'),(97,'asd','asd','asd','asd','asd','09205516439'),(98,'asd','asd','asd','asd','asd','09205516439'),(99,'asd','asd','asd','asd','asd','09205516439'),(100,'asd','asd','asd','asd','asd','09205516439'),(101,'asd','asd','asd','asd','asd','09205516439'),(102,'asd','asd','asd','asd','asd','09205516439'),(103,' caloocan city','asd','asd','asd','asd','09205516439'),(104,' Caloocan City','Caloocan City','Caloocan City','Pablo Macaya','Graciana Macaya','09205516439'),(105,' caloocan city','caloocan city','caloocan city','julius ignacio','khelle mackaia','09205516439'),(106,' United Kingdom','United Kingdom','United Kingdom','Desmond Styles','Anne Cox','09205516439'),(107,' United Kingdom','United Kingdom','United Kingdom','Desmond Styles','Anne Cox','09205517439'),(108,' caloocan city','caloocan city','caloocan city','Desmond Styles','Anne Cox','09205516439'),(109,' asd','asd','asd','asd','asd','09205516439'),(110,' asd','asd','asd','asd','asd','09205516439'),(111,' asd','asd','asd','asd','asd','09205516439'),(112,' asd','asd','asd','asd','asd','09205516439'),(113,' asd','asd','asd','asd','asd','09205516439'),(114,' asd','asd','asd','asd','asd','09205516439'),(115,' asd','asd','as','asd','dasd','asd'),(116,' asd','asd','asd','asd','asd','asd'),(117,' asd','asd','asd','asd','asd','asd'),(118,' dasd','asd','dasd','asd','as','asd'),(119,' asd','asd','sd','asd','asda','asd'),(120,'asd ','asd','asd','asd','asd','asd'),(121,' asd','asd','asd','asd','asd','asd');
/*!40000 ALTER TABLE `tbl_baptism` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_blessing`
--

DROP TABLE IF EXISTS `tbl_blessing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_blessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_blessingvenue` varchar(100) NOT NULL,
  `var_blessingdetails` varchar(100) NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_blessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_blessing`
--

LOCK TABLES `tbl_blessing` WRITE;
/*!40000 ALTER TABLE `tbl_blessing` DISABLE KEYS */;
INSERT INTO `tbl_blessing` VALUES (122,'Payatas B Quezon City','asd'),(123,'Payatas B Quezon City','asd'),(124,'Payatas B Quezon City','asd'),(125,'Payatas B Quezon City','asd'),(126,'Payatas B Quezon City','asd'),(127,'Payatas B Quezon City','asd'),(128,'Payatas B Quezon City','asd'),(129,'Payatas B Quezon City','asd'),(130,'Payatas B Quezon City','asd'),(131,'Payatas B Quezon City','asd'),(132,'Payatas B Quezon City','asd'),(133,'Payatas B Quezon City','asd'),(134,'Payatas B Quezon City','asd'),(135,'Payatas B Quezon City','asd');
/*!40000 ALTER TABLE `tbl_blessing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_document`
--

DROP TABLE IF EXISTS `tbl_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_document` (
  `int_documentID` int(11) NOT NULL AUTO_INCREMENT,
  `var_documenttype` varchar(50) NOT NULL,
  `var_doctemplatepath` varchar(45) NOT NULL,
  `dbl_docuprice` double NOT NULL,
  PRIMARY KEY (`int_documentID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_document`
--

LOCK TABLES `tbl_document` WRITE;
/*!40000 ALTER TABLE `tbl_document` DISABLE KEYS */;
INSERT INTO `tbl_document` VALUES (1,'Baptismal Certificate','/img/document/facility-permit.png',50),(2,'Confirmation Certificate','/img/document/facility-permit.png',50),(3,'First Communion Certificate','/img/document/facility-permit.png',50);
/*!40000 ALTER TABLE `tbl_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_documentrequest`
--

DROP TABLE IF EXISTS `tbl_documentrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_documentrequest` (
  `int_requestID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `int_documentID` int(11) NOT NULL,
  `var_doclastname` varchar(50) NOT NULL,
  `var_docfirstname` varchar(50) NOT NULL,
  `text_purpose` text NOT NULL,
  `date_docurequested` date NOT NULL,
  `date_docureleased` date DEFAULT NULL,
  `date_docureceived` int(11) DEFAULT NULL,
  `char_docustatus` varchar(20) NOT NULL,
  `date_doceventdate` date NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  `datetime_signed` datetime DEFAULT NULL,
  PRIMARY KEY (`int_requestID`),
  KEY `int_documentID` (`int_documentID`),
  KEY `int_userID` (`int_userID`),
  KEY `tbl_documentrequest_ibfk_4_idx` (`int_paymentID`),
  CONSTRAINT `payment` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`),
  CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_documentrequest`
--

LOCK TABLES `tbl_documentrequest` WRITE;
/*!40000 ALTER TABLE `tbl_documentrequest` DISABLE KEYS */;
INSERT INTO `tbl_documentrequest` VALUES (2,11,1,'asd','we','marriage','2018-09-29',NULL,NULL,'Pending','2018-10-07',54,NULL);
/*!40000 ALTER TABLE `tbl_documentrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_documentsevents`
--

DROP TABLE IF EXISTS `tbl_documentsevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_documentsevents` (
  `int_docu_eventID` int(11) NOT NULL AUTO_INCREMENT,
  `int_eventID` int(11) NOT NULL,
  `int_documentID` int(11) NOT NULL,
  PRIMARY KEY (`int_docu_eventID`),
  KEY `tbl_id_event_idx` (`int_eventID`),
  KEY `tbl_id_docu_idx` (`int_documentID`),
  CONSTRAINT `tbl_id_docu` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  CONSTRAINT `tbl_id_event` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_documentsevents`
--

LOCK TABLES `tbl_documentsevents` WRITE;
/*!40000 ALTER TABLE `tbl_documentsevents` DISABLE KEYS */;
INSERT INTO `tbl_documentsevents` VALUES (1,3,1),(2,2,2);
/*!40000 ALTER TABLE `tbl_documentsevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_eventinfo`
--

DROP TABLE IF EXISTS `tbl_eventinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_eventinfo` (
  `int_eventinfoID` int(10) NOT NULL AUTO_INCREMENT,
  `int_userID` int(10) NOT NULL,
  `int_eventID` int(10) NOT NULL,
  `date_eventdate` date DEFAULT NULL,
  `time_eventstart` time DEFAULT NULL,
  `char_approvalstatus` char(20) NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  `int_userpriestID` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_eventinfoID`),
  KEY `int_userID` (`int_userID`),
  KEY `tbl_eventinfo_ibfk_2_idx` (`int_eventID`),
  KEY `int_paymentID_idx` (`int_paymentID`),
  KEY `tbl_eventinfo_ibfk_3` (`int_userID`),
  KEY `tbl_eventinfo_ibfk_3_idx` (`int_userpriestID`),
  CONSTRAINT `int_paymentID` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`),
  CONSTRAINT `tbl_eventinfo_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_eventinfo_ibfk_2` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`),
  CONSTRAINT `tbl_eventinfo_ibfk_3` FOREIGN KEY (`int_userpriestID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_eventinfo`
--

LOCK TABLES `tbl_eventinfo` WRITE;
/*!40000 ALTER TABLE `tbl_eventinfo` DISABLE KEYS */;
INSERT INTO `tbl_eventinfo` VALUES (35,11,3,'2018-10-07','10:00:00','Approved',18,10),(36,11,3,'2018-10-07','10:00:00','Cancelled',19,NULL),(37,11,3,'2018-10-07','10:00:00','Pending',20,NULL),(38,11,3,'2018-10-02','09:00:00','Approved',22,NULL),(39,11,9,'2018-10-02','09:00:00','Pending',21,NULL),(40,11,3,'2018-10-07','10:00:00','Pending',23,NULL),(41,11,3,'2018-10-14','10:00:00','Approved',24,NULL),(42,11,3,'2018-10-08','09:00:00','Approved',25,NULL),(43,11,3,'2018-10-07','10:00:00','Approved',26,NULL),(44,11,3,'2018-10-14','10:00:00','Approved',27,NULL),(45,11,3,'2018-10-07','10:00:00','Pending',28,NULL),(46,11,3,'2018-10-07','10:00:00','Approved',29,NULL),(47,11,3,'2018-10-07','10:00:00','Approved',30,NULL),(48,11,3,'2018-10-07','10:00:00','Pending',31,NULL),(49,11,3,'2018-10-07','10:00:00','Pending',32,NULL),(50,11,3,'2018-10-07','10:00:00','Approved',33,NULL),(51,11,3,'2018-10-07','10:00:00','Approved',34,NULL),(52,11,3,'2018-10-14','10:00:00','Disapproved',35,NULL),(53,11,3,'2018-10-21','10:00:00','Pending',36,10),(54,11,3,'2018-10-21','10:00:00','Approved',37,10),(55,11,3,'2018-10-07','10:00:00','Pending',38,NULL),(56,11,3,'2018-10-07','10:00:00','Pending',39,NULL),(57,11,3,'2018-10-07','10:00:00','Pending',40,NULL),(58,11,3,'2018-10-28','10:00:00','Approved',41,17),(59,11,3,'2018-10-21','10:00:00','Approved',42,10),(60,11,3,'2018-10-28','10:00:00','Pending',43,17),(61,11,3,'2018-10-21','10:00:00','Approved',44,10),(62,11,3,'2018-10-07','10:00:00','Pending',45,NULL),(63,11,3,'2018-10-21','10:00:00','Approved',46,10),(64,11,3,'2018-10-14','10:00:00','Approved',47,NULL),(65,11,3,'2018-10-28','10:00:00','Pending',48,17),(66,11,3,'2018-10-07','10:00:00','Pending',49,NULL),(67,11,3,'2018-10-07','10:00:00','Pending',50,NULL),(68,11,3,'2018-10-07','10:00:00','Pending',51,NULL),(69,11,3,'2018-10-10','10:00:00','Approved',52,NULL),(70,11,3,'2018-10-07','10:00:00','Pending',55,NULL),(71,11,3,'2018-10-07','10:00:00','Pending',56,NULL),(72,11,3,'2018-10-07','10:00:00','Pending',57,NULL),(73,11,3,'2018-10-14','10:00:00','Approved',58,NULL),(74,11,3,'2018-10-14','10:00:00','Pending',59,NULL),(75,11,3,'2018-10-14','10:00:00','Approved',60,NULL),(76,11,3,'2018-10-07','10:00:00','Pending',61,NULL),(77,11,3,'2018-10-14','10:00:00','Pending',62,NULL),(78,11,3,'2018-10-14','10:00:00','Pending',63,NULL),(79,11,3,'2018-10-07','10:00:00','Pending',64,NULL),(80,11,3,'2018-10-07','10:00:00','Pending',65,NULL),(81,11,3,'2018-10-14','10:00:00','Pending',66,NULL),(82,11,3,'2018-10-14','10:00:00','Pending',67,NULL),(83,11,3,'2018-10-07','10:00:00','Pending',68,NULL),(84,11,3,'2018-10-07','10:00:00','Pending',69,NULL),(85,11,3,'2018-10-07','10:00:00','Pending',70,NULL),(86,11,3,'2018-10-28','10:00:00','Approved',71,17),(87,11,3,'2018-10-14','10:00:00','Approved',72,NULL),(88,11,3,'2018-10-07','10:00:00','Pending',73,NULL),(89,11,3,'2018-10-07','10:00:00','Pending',74,NULL),(90,11,3,'2018-10-14','10:00:00','Pending',75,NULL),(91,11,3,'2018-10-07','10:00:00','Pending',76,NULL),(92,11,3,'2018-10-21','10:00:00','Pending',77,10),(93,11,3,'2018-10-07','10:00:00','Pending',78,NULL),(94,11,3,'2018-10-14','10:00:00','Pending',79,NULL),(95,11,3,'2018-10-07','10:00:00','Pending',80,NULL),(96,11,3,'2018-10-07','10:00:00','Pending',81,NULL),(97,11,3,'2018-10-14','10:00:00','Pending',82,NULL),(98,11,3,'2018-10-14','10:00:00','Pending',83,NULL),(99,11,3,'2018-10-07','10:00:00','Pending',84,NULL),(100,11,3,'2018-10-14','10:00:00','Approved',85,NULL),(101,11,3,'2018-10-14','10:00:00','Approved',86,NULL),(102,11,9,'2018-10-24','12:00:00','Pending',87,NULL),(103,11,9,'2018-10-22','09:00:00','Pending',88,NULL),(104,11,9,'2018-10-22','11:00:00','Pending',89,NULL),(105,11,9,'2018-10-19','10:00:00','Pending',90,NULL),(106,11,9,'2018-10-20','10:00:00','Pending',92,NULL),(107,11,9,'2018-10-26','11:30:00','Pending',93,NULL),(108,11,9,'2018-10-22','10:30:00','Pending',94,NULL),(109,11,9,'2018-10-22','10:00:00','Pending',95,NULL),(110,11,3,'2018-10-21','10:00:00','Pending',96,NULL),(111,11,9,'2018-10-22','09:00:00','Pending',97,NULL),(112,11,9,'2018-10-29','10:00:00','Pending',98,NULL),(113,11,9,'2018-10-22','11:00:00','Pending',99,NULL),(114,11,9,'2018-10-22','01:00:00','Pending',100,NULL),(115,11,9,'2018-10-23','11:30:00','Pending',101,NULL),(116,11,9,'2018-10-22','10:00:00','Pending',102,NULL),(117,11,9,'2018-10-22','09:30:00','Pending',103,NULL),(118,11,9,'2018-10-22','11:00:00','Pending',104,NULL),(119,11,9,'2018-10-22','11:00:00','Pending',105,NULL),(120,11,9,'2018-10-22','01:00:00','Pending',106,NULL),(121,11,3,'2018-10-28','10:00:00','Pending',107,NULL),(122,11,1,'2018-10-17','10:00:00','Pending',NULL,NULL),(123,11,1,'2018-10-11','09:00:00','Pending',NULL,NULL),(124,11,1,'2018-10-20','09:00:00','Pending',NULL,NULL),(125,11,1,'2018-10-13','09:00:00','Pending',NULL,NULL),(126,11,1,'2018-10-19','09:00:00','Pending',NULL,NULL),(127,11,1,'2018-10-19','09:00:00','Pending',NULL,NULL),(128,11,1,'2018-10-13','09:30:00','Pending',109,NULL),(129,11,1,'2018-10-12','10:00:00','Pending',110,NULL),(130,11,1,'2018-10-12','09:00:00','Pending',111,NULL),(131,11,1,'2018-10-10','09:00:00','Pending',112,NULL),(132,11,1,'2018-10-12','09:00:00','Pending',113,NULL),(133,11,1,'2018-10-13','09:00:00','Pending',114,NULL),(134,11,1,'2018-10-13','09:00:00','Pending',115,NULL),(135,11,1,'2018-10-09','10:00:00','Pending',116,NULL);
/*!40000 ALTER TABLE `tbl_eventinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_facility`
--

DROP TABLE IF EXISTS `tbl_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_facility` (
  `int_facilityID` int(11) NOT NULL AUTO_INCREMENT,
  `var_facilityname` varchar(50) NOT NULL,
  `var_facilitydesc` varchar(200) DEFAULT NULL,
  `int_maxpax` int(11) NOT NULL,
  `var_facilitypicpath` varchar(100) DEFAULT NULL,
  `var_facilitysize` varchar(30) NOT NULL,
  PRIMARY KEY (`int_facilityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facility`
--

LOCK TABLES `tbl_facility` WRITE;
/*!40000 ALTER TABLE `tbl_facility` DISABLE KEYS */;
INSERT INTO `tbl_facility` VALUES (1,'Bro. Roqueto 2nd floor','Meetings, training, seminars, workshops',100,NULL,'\r\n4.9m x 11.5m (16ft x 37ft)'),(2,'Bro. Roqueto 3rd floor','Meetings, training, seminars, workshops, holiday parties, banquets, receptions, class reunions, anniversary parties, birthday parties, baby showers',100,NULL,'\r\n4.9m x 11.5m (16ft x 37ft)');
/*!40000 ALTER TABLE `tbl_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_facilityreservation`
--

DROP TABLE IF EXISTS `tbl_facilityreservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_facilityreservation` (
  `int_reservationID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `int_facilityID` int(11) NOT NULL,
  `var_event` varchar(100) NOT NULL,
  `var_eventdesc` varchar(300) NOT NULL,
  `int_attendees` int(11) NOT NULL,
  `datetime_reservestart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `datetime_reserveend` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `char_reservestatus` char(50) NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_reservationID`),
  KEY `int_userID` (`int_userID`),
  KEY `int_facilityID` (`int_facilityID`),
  CONSTRAINT `tbl_facilityreservation_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_facilityreservation_ibfk_2` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facilityreservation`
--

LOCK TABLES `tbl_facilityreservation` WRITE;
/*!40000 ALTER TABLE `tbl_facilityreservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_facilityreservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_grd3students`
--

DROP TABLE IF EXISTS `tbl_grd3students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_grd3students` (
  `int_studentID` int(10) NOT NULL AUTO_INCREMENT,
  `int_sectionID` int(11) NOT NULL,
  `var_studentfname` varchar(45) NOT NULL,
  `var_studentmname` varchar(45) NOT NULL,
  `var_studentlname` varchar(45) NOT NULL,
  PRIMARY KEY (`int_studentID`),
  KEY `int_sectionID_idx` (`int_sectionID`),
  CONSTRAINT `int_sectionID` FOREIGN KEY (`int_sectionID`) REFERENCES `tbl_section` (`int_sectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_grd3students`
--

LOCK TABLES `tbl_grd3students` WRITE;
/*!40000 ALTER TABLE `tbl_grd3students` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_grd3students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_houseblessing`
--

DROP TABLE IF EXISTS `tbl_houseblessing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_houseblessing` (
  `int_houseblessID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `var_owner` varchar(100) NOT NULL,
  `var_estloc` varchar(100) NOT NULL,
  `var_ownercontactnum` varchar(13) NOT NULL,
  `var_owneremailadd` varchar(50) NOT NULL,
  `date_blessingdate` date NOT NULL,
  `time_blessingstart` time NOT NULL,
  `char_approvalstatus` char(11) NOT NULL,
  PRIMARY KEY (`int_houseblessID`),
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_houseblessing_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_houseblessing`
--

LOCK TABLES `tbl_houseblessing` WRITE;
/*!40000 ALTER TABLE `tbl_houseblessing` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_houseblessing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_itemdetails`
--

DROP TABLE IF EXISTS `tbl_itemdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_itemdetails` (
  `int_itemdetailsID` int(11) NOT NULL AUTO_INCREMENT,
  `int_itemID` int(11) NOT NULL,
  `int_qualityID` int(11) NOT NULL,
  `int_quantity` int(11) NOT NULL,
  PRIMARY KEY (`int_itemdetailsID`),
  KEY `TBL_IBFK_1_idx` (`int_itemID`),
  KEY `TBL_FK_1_idx` (`int_itemID`),
  KEY `int_itemdID` (`int_itemID`),
  KEY `int_qualityID_idx` (`int_qualityID`),
  CONSTRAINT `int_itemID` FOREIGN KEY (`int_itemID`) REFERENCES `tbl_items` (`int_itemID`),
  CONSTRAINT `int_qualityID` FOREIGN KEY (`int_qualityID`) REFERENCES `tbl_quality` (`int_qualityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_itemdetails`
--

LOCK TABLES `tbl_itemdetails` WRITE;
/*!40000 ALTER TABLE `tbl_itemdetails` DISABLE KEYS */;
INSERT INTO `tbl_itemdetails` VALUES (1,1,1,25),(2,1,2,25);
/*!40000 ALTER TABLE `tbl_itemdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_items`
--

DROP TABLE IF EXISTS `tbl_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_items` (
  `int_itemID` int(11) NOT NULL AUTO_INCREMENT,
  `var_itemname` varchar(45) NOT NULL,
  `var_itemdesc` varchar(45) NOT NULL,
  `int_goodquantity` int(11) NOT NULL,
  `int_damagedquantity` int(11) NOT NULL,
  PRIMARY KEY (`int_itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_items`
--

LOCK TABLES `tbl_items` WRITE;
/*!40000 ALTER TABLE `tbl_items` DISABLE KEYS */;
INSERT INTO `tbl_items` VALUES (1,'Chair','Upuan',37,23),(2,'Mic Stand','kurtina',2,0),(3,'Table','lamesa',10,1),(4,'Speaker','speaker',3,1),(5,'Microphone','Microphone',4,0);
/*!40000 ALTER TABLE `tbl_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_members`
--

DROP TABLE IF EXISTS `tbl_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_members` (
  `int_membersID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `int_ministryID` int(11) NOT NULL,
  `var_position` varchar(45) NOT NULL,
  PRIMARY KEY (`int_membersID`),
  KEY `tbl_ibfk_1_idx` (`int_userID`),
  KEY `tbl_ibfk_w_idx` (`int_ministryID`),
  CONSTRAINT `tbl_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_ibfk_w` FOREIGN KEY (`int_ministryID`) REFERENCES `tbl_ministry` (`int_ministryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_members`
--

LOCK TABLES `tbl_members` WRITE;
/*!40000 ALTER TABLE `tbl_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_message`
--

DROP TABLE IF EXISTS `tbl_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_message` (
  `int_messageID` int(10) NOT NULL AUTO_INCREMENT,
  `int_senderID` int(10) NOT NULL,
  `int_receiverID` int(10) NOT NULL,
  `var_subject` varchar(100) NOT NULL,
  `text_message` text NOT NULL,
  `datetime_sent` datetime NOT NULL,
  `datetime_seen` datetime DEFAULT NULL,
  PRIMARY KEY (`int_messageID`),
  KEY `int_senderID` (`int_senderID`),
  KEY `int_receiverID` (`int_receiverID`),
  CONSTRAINT `tbl_message_ibfk_1` FOREIGN KEY (`int_senderID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_message_ibfk_2` FOREIGN KEY (`int_receiverID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_message`
--

LOCK TABLES `tbl_message` WRITE;
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
INSERT INTO `tbl_message` VALUES (1,6,11,'Disapproval of requirement(s)','','2018-10-04 16:07:04',NULL),(2,6,11,'Disapproval of requirement(s)','adsf','2018-10-04 17:34:36',NULL),(3,6,11,'Disapproval of requirement(s)','asdf','2018-10-04 17:35:18',NULL),(4,6,11,'Disapproval of requirement(s)','sdf','2018-10-04 17:35:55',NULL),(5,6,11,'Disapproval of requirement(s)','gjh','2018-10-04 17:37:42',NULL);
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ministry`
--

DROP TABLE IF EXISTS `tbl_ministry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_ministry` (
  `int_ministryID` int(11) NOT NULL AUTO_INCREMENT,
  `var_ministryname` varchar(45) NOT NULL,
  `var_ministrydesc` varchar(45) NOT NULL,
  PRIMARY KEY (`int_ministryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ministry`
--

LOCK TABLES `tbl_ministry` WRITE;
/*!40000 ALTER TABLE `tbl_ministry` DISABLE KEYS */;
INSERT INTO `tbl_ministry` VALUES (1,'Music Ministry','Music ministry'),(2,'Liturgical Ministry','liturgy');
/*!40000 ALTER TABLE `tbl_ministry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_notification`
--

DROP TABLE IF EXISTS `tbl_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_notification` (
  `int_notifID` int(10) NOT NULL AUTO_INCREMENT,
  `int_userID` int(10) NOT NULL,
  `var_notifdesc` varchar(55) DEFAULT NULL,
  `datetime_seen` datetime DEFAULT NULL,
  `int_eventinfoID` int(11) DEFAULT NULL,
  `datetime_received` datetime NOT NULL,
  PRIMARY KEY (`int_notifID`),
  KEY `int_userID` (`int_userID`),
  KEY `tbl_notification_ibfk_2_idx` (`int_eventinfoID`),
  CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_notification_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notification`
--

LOCK TABLES `tbl_notification` WRITE;
/*!40000 ALTER TABLE `tbl_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_payment`
--

DROP TABLE IF EXISTS `tbl_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_payment` (
  `int_paymentID` int(10) NOT NULL AUTO_INCREMENT,
  `dbl_amount` double NOT NULL,
  `datetime_paymentreceived` datetime DEFAULT NULL,
  `char_paymentstatus` char(10) NOT NULL,
  PRIMARY KEY (`int_paymentID`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment`
--

LOCK TABLES `tbl_payment` WRITE;
/*!40000 ALTER TABLE `tbl_payment` DISABLE KEYS */;
INSERT INTO `tbl_payment` VALUES (18,300,NULL,'Paid'),(19,300,NULL,'Unpaid'),(20,300,'2018-10-04 16:06:00','Paid'),(21,1000,NULL,'Unpaid'),(22,300,NULL,'Paid'),(23,300,'2018-10-04 15:58:56','Paid'),(24,300,NULL,'Paid'),(25,300,NULL,'Paid'),(26,300,NULL,'Paid'),(27,300,NULL,'Paid'),(28,300,NULL,'Unpaid'),(29,300,NULL,'Paid'),(30,300,NULL,'Paid'),(31,300,NULL,'Paid'),(32,300,NULL,'Unpaid'),(33,300,NULL,'Paid'),(34,300,NULL,'Paid'),(35,300,NULL,'Paid'),(36,300,NULL,'Paid'),(37,300,NULL,'Paid'),(38,300,NULL,'Unpaid'),(39,300,NULL,'Unpaid'),(40,300,NULL,'Unpaid'),(41,300,'2018-10-04 21:23:02','Paid'),(42,300,NULL,'Paid'),(43,300,'2018-10-04 16:55:00','Paid'),(44,300,NULL,'Paid'),(45,300,NULL,'Unpaid'),(46,300,NULL,'Paid'),(47,300,NULL,'Paid'),(48,300,NULL,'Unpaid'),(49,300,NULL,'Unpaid'),(50,300,NULL,'Unpaid'),(51,300,NULL,'Unpaid'),(52,300,NULL,'Paid'),(53,50,NULL,'Unpaid'),(54,50,NULL,'Unpaid'),(55,300,NULL,'Unpaid'),(56,300,NULL,'Unpaid'),(57,300,NULL,'Unpaid'),(58,300,NULL,'Paid'),(59,300,NULL,'Unpaid'),(60,300,NULL,'Paid'),(61,300,NULL,'Unpaid'),(62,300,NULL,'Unpaid'),(63,300,NULL,'Unpaid'),(64,300,NULL,'Unpaid'),(65,300,NULL,'Unpaid'),(66,300,NULL,'Unpaid'),(67,300,NULL,'Unpaid'),(68,300,NULL,'Unpaid'),(69,300,NULL,'Unpaid'),(70,300,NULL,'Unpaid'),(71,300,NULL,'Paid'),(72,300,NULL,'Paid'),(73,300,NULL,'Unpaid'),(74,300,NULL,'Unpaid'),(75,300,NULL,'Unpaid'),(76,300,NULL,'Unpaid'),(77,300,NULL,'Unpaid'),(78,300,NULL,'Unpaid'),(79,300,NULL,'Unpaid'),(80,300,NULL,'Unpaid'),(81,300,NULL,'Unpaid'),(82,300,NULL,'Unpaid'),(83,300,NULL,'Unpaid'),(84,300,NULL,'Unpaid'),(85,300,NULL,'Paid'),(86,300,NULL,'Paid'),(87,1000,NULL,'Unpaid'),(88,1000,NULL,'Unpaid'),(89,1000,NULL,'Unpaid'),(90,1000,NULL,'Unpaid'),(91,1000,NULL,'Unpaid'),(92,1000,NULL,'Unpaid'),(93,1000,NULL,'Unpaid'),(94,1000,NULL,'Unpaid'),(95,1000,NULL,'Unpaid'),(96,300,NULL,'Unpaid'),(97,1000,NULL,'Unpaid'),(98,1000,NULL,'Unpaid'),(99,1000,NULL,'Unpaid'),(100,1000,NULL,'Unpaid'),(101,1000,NULL,'Unpaid'),(102,1000,NULL,'Unpaid'),(103,1000,NULL,'Unpaid'),(104,1000,NULL,'Unpaid'),(105,1000,NULL,'Unpaid'),(106,1000,NULL,'Unpaid'),(107,300,NULL,'Unpaid'),(108,0,NULL,'Unpaid'),(109,0,NULL,'Unpaid'),(110,0,NULL,'Unpaid'),(111,0,NULL,'Unpaid'),(112,0,NULL,'Unpaid'),(113,0,NULL,'Unpaid'),(114,0,NULL,'Unpaid'),(115,0,NULL,'Paid'),(116,0,NULL,'Paid');
/*!40000 ALTER TABLE `tbl_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_priestschedule`
--

DROP TABLE IF EXISTS `tbl_priestschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_priestschedule` (
  `int_scheduleID` int(10) NOT NULL AUTO_INCREMENT,
  `int_userID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `text_schedulenote` text NOT NULL,
  `var_venue` varchar(100) NOT NULL,
  `time_schedstart` time NOT NULL,
  `time_schedend` time NOT NULL,
  `date_sched` date NOT NULL,
  PRIMARY KEY (`int_scheduleID`),
  KEY `int_userID` (`int_userID`),
  KEY `int_eventID` (`int_eventinfoID`),
  CONSTRAINT `tbl_priestschedule_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_priestschedule_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_priestschedule`
--

LOCK TABLES `tbl_priestschedule` WRITE;
/*!40000 ALTER TABLE `tbl_priestschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_priestschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_quality`
--

DROP TABLE IF EXISTS `tbl_quality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_quality` (
  `int_qualityID` int(11) NOT NULL AUTO_INCREMENT,
  `var_qualityname` varchar(45) NOT NULL,
  PRIMARY KEY (`int_qualityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_quality`
--

LOCK TABLES `tbl_quality` WRITE;
/*!40000 ALTER TABLE `tbl_quality` DISABLE KEYS */;
INSERT INTO `tbl_quality` VALUES (1,'Good'),(2,'Damaged');
/*!40000 ALTER TABLE `tbl_quality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_relation`
--

DROP TABLE IF EXISTS `tbl_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_relation` (
  `int_relationID` int(10) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(10) NOT NULL,
  `var_relation` varchar(20) DEFAULT NULL,
  `var_lname` varchar(50) NOT NULL,
  `var_fname` varchar(50) NOT NULL,
  `var_mname` varchar(50) DEFAULT NULL,
  `char_gender` varchar(10) NOT NULL,
  `var_address` varchar(100) NOT NULL,
  `date_birthday` date NOT NULL,
  `var_birthplace` varchar(100) NOT NULL,
  PRIMARY KEY (`int_relationID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_relation_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_relation`
--

LOCK TABLES `tbl_relation` WRITE;
/*!40000 ALTER TABLE `tbl_relation` DISABLE KEYS */;
INSERT INTO `tbl_relation` VALUES (29,35,'Aunt/Uncle','asd','we','asdzx','Male','wead','1998-01-01','caloocan city'),(30,36,'Aunt/Uncle','yeah','qweqweqwe','wqeqwewqe','Male','asdqwdasd','1998-01-01','zczfas'),(31,37,'Aunt/Uncle','macaya','joshua rae','','Male','Caloocan City','1998-12-22','Caloocan City'),(32,38,'Parent','asd','asd','qwe','Male','sdasdasd','1998-01-01','asdqwd'),(33,39,'Parent','asd','asd','qwe','Male','sdasdasd','1998-01-01','asdqwd'),(34,40,'Aunt/Uncle','macaya','joshua rae','','Male','Caloocan City','1998-12-01','Caloocan City'),(35,41,'Parent','asd','qwe','asd','Male','asdasd','1198-01-01','wdasdw'),(36,42,'Aunt/Uncle','qwe','asdqwd','qd','Male','asdasd','2017-01-01','qwdwd'),(37,43,'Parent','asd','asd','asd','Male','dasddas','2018-01-01','123123'),(38,44,'Aunt/Uncle','shit','shit','shit','Male','asd','2018-01-01','asdasd'),(39,45,'Parent','asd','asdasdasd','asda','Male','asd','2018-01-01','sdasd'),(40,46,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(41,47,'Parent','asd','asd','asd','Male','asd','1998-01-01','asd'),(42,48,'Grandparent','as','dqwe','asd','Male','asd','2018-01-01','asd'),(43,49,'Parent','qwe','asdwd','asdqwd','Male','asd','2018-01-01','asd'),(44,50,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(45,51,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(46,52,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(47,53,'Aunt/Uncle','as','xcas','dasdas','Male','dasd','2018-01-01','asdasd'),(48,54,'Aunt/Uncle','asd','qwea','sd','Male','dasdasd','2018-01-01','asdasd'),(49,55,'Aunt/Uncle','asd','asd','asd','Male','asdasd','2018-01-01','asdasd'),(50,56,'Parent','Lacsina','Gramar','Desuyo','Female','Sta. Ana Manila','2017-11-12','Sta. Ana Manila'),(51,57,'Parent','Lacsina','Gramar','Desuyo','Female','Sta. Ana Manila','2017-11-12','Sta. Ana Manila'),(52,58,'Aunt/Uncle','yeah','yeah','yeah','Male','asdasd','2018-01-01','asdw'),(53,59,'Grandparent','shit','shit','shit','Male','asd','1998-01-01','asdas'),(54,60,'Aunt/Uncle','a','sdasd','asd','Male','asd','2018-01-01','asd'),(55,61,'Aunt/Uncle','a','sdasd','asd','Male','asd','2018-01-01','asd'),(56,62,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(57,63,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(58,64,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(59,65,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(60,66,'Parent','wqe','we','qwe','Male','asd','2017-01-01','asd'),(61,67,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(62,68,'Parent','Mackaia','Joshua Rae','Contreras','Male','Marcela, Calocohan City','2017-12-22','Calocohan City'),(63,69,'Parent','Mackaia','Joshua Rae','Contreras','Male','Marcela, Calocohan City','2017-12-22','Calocohan City'),(64,70,'Parent','shit','shit','shit','Female','asd','2018-01-01','Payatas'),(65,71,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(66,72,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(67,73,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(68,74,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(69,75,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(70,76,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(71,77,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(72,78,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(73,79,'null','asd','asd','asd','Male','asd','2018-01-01','asd'),(74,80,'null','asd','asd','asd','Male','asd','2018-01-01','asd'),(75,81,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(76,82,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(77,83,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(78,84,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(79,85,'Grandparent','asd','asd','asd','Male','asd','2018-01-01','asd'),(80,86,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(81,87,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(82,88,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(83,89,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(84,90,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(85,91,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(86,92,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(87,93,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(88,94,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(89,95,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(90,96,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(91,97,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(92,98,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(93,99,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(94,100,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(95,101,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(96,102,'Aunt/Uncle','asd','asd','asd','Male','asd','2017-01-01','asd'),(97,103,'Parent','macaya','jasper','','Male','asd','2017-12-22','caloocan city'),(98,104,'Parent','mackaia','khelle','contreras','Female','Caloocan City','2017-08-16','Caloocan City'),(99,105,'Sibling','macaya','joshua rae','asd','Male','caloocan city','2017-12-22','caloocan city'),(100,106,'Parent','Styles','Harry ','Edward','Male','United Kingdom','2017-02-01','United Kingdom'),(101,107,'Parent','Styles','Harry','Edward','Male','United Kingdom','2017-02-01','United Kingdom'),(102,108,'Parent','styles','harry','edward','Male','caloocan city','2017-01-01','caloocan city'),(103,109,'Parent','as','dasd','asd','Male','asd','2017-01-01','asd'),(104,110,'Parent','asd','asda','sd','Male','asd','2017-01-01','asd'),(105,111,'Parent','asd','asd','asd','Male','asd','2017-01-01','asd'),(106,112,'Aunt/Uncle','asd','asd','asd','Male','asd','2017-01-01','asd'),(107,113,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(108,114,'Aunt/Uncle','as','asd','asd','Male','asd','2018-01-01','asd'),(109,115,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(110,116,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(111,117,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(112,118,'Aunt/Uncle','asd','asd','asd','Male','as','2018-01-01','asd'),(113,119,'Grandparent','asd','asd','asd','Male','asd','2018-01-01','asd'),(114,120,'Grandparent','asd','as','asd','Male','asd','2018-01-01','asd'),(115,121,'Aunt/Uncle','asd','asd','','Male','asd','2018-01-01','asd'),(116,122,'Child','asd','asd','asd','Male','asd','1998-01-01','asd'),(117,123,'Friend','asd','asd','asd','Male','asd','2018-01-01','asd'),(118,124,'Child','asd','asd','asd','Male','asd','1998-01-01','asd'),(119,125,'Aunt/Uncle','asd','asd','asd','Male','asd','1998-01-01','asd'),(120,126,'Parent','asd','asd','asd','Male','asd','1998-01-01','asd'),(121,127,'Parent','asd','asd','asd','Male','asd','1998-01-01','asd'),(122,128,'Nephew/Niece','asd','asd','asd','Male','asd','2018-01-01','asd'),(123,130,'Child','asd','asd','asd','Male','asd','2018-01-01','asd'),(124,131,'Sibling','asd','asd','asd','Male','asd','2018-01-01','asd'),(125,132,'null','asd','asd','asd','Male','asd','1998-01-01','asd'),(126,133,'Parent','asd','asd','asd','Male','asd','1998-01-01','asd'),(127,134,'Grandparent','asd','asd','asd','Male','asd','1998-01-01','asd'),(128,135,'Aunt/Uncle','asd','asd','asd','Male','asd','1998-01-01','asd');
/*!40000 ALTER TABLE `tbl_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirements`
--

DROP TABLE IF EXISTS `tbl_requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirements` (
  `int_requirementID` int(10) NOT NULL AUTO_INCREMENT,
  `int_reqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(300) DEFAULT NULL,
  `var_reqloc` varchar(100) DEFAULT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `var_reqstatus` varchar(45) NOT NULL,
  PRIMARY KEY (`int_requirementID`),
  KEY `int_reqtypeID` (`int_reqtypeID`),
  CONSTRAINT `tbl_requirements_ibfk_2` FOREIGN KEY (`int_reqtypeID`) REFERENCES `tbl_requirementtype` (`int_reqtypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirements`
--

LOCK TABLES `tbl_requirements` WRITE;
/*!40000 ALTER TABLE `tbl_requirements` DISABLE KEYS */;
INSERT INTO `tbl_requirements` VALUES (48,1,'/img/req/image-1537860970370.jpg',NULL,'2018-09-25 15:36:11','Disapproved'),(49,1,'/img/req/image-1537861277781.jpg',NULL,'2018-09-25 15:41:18','Submitted'),(50,1,'/img/req/image-1537863334197.jpg',NULL,'2018-09-25 16:15:35','Submitted'),(51,2,'/img/req/image-1537885104504.jpg',NULL,'2018-09-25 22:18:28','Submitted'),(52,1,'/img/req/image-1537885104504.jpg',NULL,'2018-09-25 22:18:28','Approved'),(53,1,'/img/req/image-1537888238044.jpg',NULL,'2018-09-25 23:10:38','Disapproved'),(54,1,'/img/req/image-1537891486886.jpg',NULL,'2018-09-26 00:04:47','Approved'),(55,1,'/img/req/image-1537891816662.jpg',NULL,'2018-09-26 00:10:17','Approved'),(56,1,'/img/req/image-1537892512549.jpg',NULL,'2018-09-26 00:21:53','Approved'),(57,1,'/img/req/image-1537893206062.jpg',NULL,'2018-09-26 00:33:26','Approved'),(58,1,'/img/req/image-1537893416838.jpg',NULL,'2018-09-26 00:36:57','Submitted'),(59,1,'/img/req/image-1537893589713.jpg',NULL,'2018-09-26 00:39:50','Approved'),(60,1,'/img/req/image-1537893754969.jpg',NULL,'2018-09-26 00:42:35','Approved'),(61,1,'/img/req/image-1537894106310.jpg',NULL,'2018-09-26 00:48:27','Approved'),(62,1,'/img/req/image-1537894293293.jpg',NULL,'2018-09-26 00:51:34','Submitted'),(63,1,'/img/req/image-1537894485260.jpg',NULL,'2018-09-26 00:54:46','Approved'),(64,1,'/img/req/image-1537894771672.jpg',NULL,'2018-09-26 00:59:32','Approved'),(65,1,'/img/req/image-1537894938942.jpg',NULL,'2018-09-26 01:02:19','Approved'),(66,1,'/img/req/image-1537895076959.jpg',NULL,'2018-09-26 01:04:37','Submitted'),(67,1,'/img/req/image-1537895152673.jpg',NULL,'2018-09-26 01:05:53','Approved'),(68,1,'/img/req/image-1537895704422.jpg',NULL,'2018-09-26 01:15:05','Submitted'),(69,1,'/img/req/image-1537895853741.jpg',NULL,'2018-09-26 01:17:34','Submitted'),(70,1,'/img/req/image-1537895960355.jpg',NULL,'2018-09-26 01:19:21','Submitted'),(71,1,'/img/req/image-1537900617560.jpg',NULL,'2018-09-26 02:36:58','Approved'),(72,1,'/img/req/image-1537900718585.jpg',NULL,'2018-09-26 02:38:39','Approved'),(73,1,'/img/req/image-1537900850734.jpg',NULL,'2018-09-26 02:40:51','Disapproved'),(74,1,'/img/req/image-1537901215951.jpg',NULL,'2018-09-26 02:46:56','Approved'),(75,1,'/img/req/image-1537901487488.jpg',NULL,'2018-09-26 02:51:28','Submitted'),(76,1,'/img/req/image-1537901542936.jpg',NULL,'2018-09-26 02:52:23','Approved'),(77,1,'/img/req/image-1537901598930.jpg',NULL,'2018-09-26 02:53:19','Approved'),(78,1,'/img/req/image-1537901684261.jpg',NULL,'2018-09-26 02:54:45','Submitted'),(79,1,'/img/req/image-1537902849715.jpg',NULL,'2018-09-26 03:14:10','Submitted'),(80,1,'/img/req/image-1537903779211.jpg',NULL,'2018-09-26 03:29:39','Submitted'),(81,1,'/img/req/image-1537942442161.jpg',NULL,'2018-09-26 14:14:02','Submitted'),(82,1,'/img/req/image-1537942616919.jpg',NULL,'2018-09-26 14:16:57','Approved'),(83,1,'/img/req/image-1538172006329.jpg',NULL,'2018-09-29 06:00:07','Submitted'),(84,1,'/img/req/image-1538211900633.jpg',NULL,'2018-09-29 17:05:01','Submitted'),(85,1,'/img/req/image-1538213479479.jpg',NULL,'2018-09-29 17:31:20','Submitted'),(86,1,'/img/req/image-1538213581876.jpg',NULL,'2018-09-29 17:33:02','Approved'),(87,1,'/img/req/image-1538213710087.jpg',NULL,'2018-09-29 17:35:10','Submitted'),(88,1,'/img/req/image-1538213816515.jpg',NULL,'2018-09-29 17:36:57','Approved'),(89,1,'/img/req/image-1538214041396.jpg',NULL,'2018-09-29 17:40:42','Submitted'),(90,1,'/img/req/image-1538214411768.jpg',NULL,'2018-09-29 17:46:52','Submitted'),(91,1,'/img/req/image-1538214502485.jpg',NULL,'2018-09-29 17:48:23','Submitted'),(92,1,'/img/req/image-1538214667153.jpg',NULL,'2018-09-29 17:51:07','Submitted'),(93,1,'/img/req/image-1538215263153.jpg',NULL,'2018-09-29 18:01:03','Submitted'),(94,1,'/img/req/image-1538215369040.jpg',NULL,'2018-09-29 18:02:49','Submitted'),(95,1,'/img/req/image-1538215681019.jpg',NULL,'2018-09-29 18:08:01','Submitted'),(96,1,'/img/req/image-1538215745523.jpg',NULL,'2018-09-29 18:09:06','Submitted'),(97,1,'/img/req/image-1538215827234.jpg',NULL,'2018-09-29 18:10:28','Submitted'),(98,1,'/img/req/image-1538215988607.jpg',NULL,'2018-09-29 18:13:09','Submitted'),(99,1,'/img/req/image-1538216146283.jpg',NULL,'2018-09-29 18:15:47','Approved'),(100,1,'/img/req/image-1538216297246.jpg',NULL,'2018-09-29 18:18:17','Approved'),(101,1,'/img/req/image-1538216403670.jpg',NULL,'2018-09-29 18:20:04','Submitted'),(102,1,'/img/req/image-1538216555128.jpg',NULL,'2018-09-29 18:22:36','Submitted'),(103,1,'/img/req/image-1538216646873.jpg',NULL,'2018-09-29 18:24:07','Submitted'),(104,1,'/img/req/image-1538216769784.jpg',NULL,'2018-09-29 18:26:10','Submitted'),(105,1,'/img/req/image-1538216898646.jpg',NULL,'2018-09-29 18:28:19','Submitted'),(106,1,'/img/req/image-1538216959146.jpg',NULL,'2018-09-29 18:29:19','Submitted'),(107,1,'/img/req/image-1538217030098.jpg',NULL,'2018-09-29 18:30:30','Submitted'),(108,1,'/img/req/image-1538217092426.jpg',NULL,'2018-09-29 18:31:33','Submitted'),(109,1,'/img/req/image-1538217139666.jpg',NULL,'2018-09-29 18:32:20','Submitted'),(110,1,'/img/req/image-1538217192499.jpg',NULL,'2018-09-29 18:33:13','Submitted'),(111,1,'/img/req/image-1538217426850.jpg',NULL,'2018-09-29 18:37:07','Submitted'),(112,1,'/img/req/image-1538233639382.jpg',NULL,'2018-09-29 23:07:20','Submitted'),(113,1,'/img/req/image-1538326863619.jpg',NULL,'2018-10-01 01:01:04','Approved'),(114,1,'/img/req/image-1538338454038.jpg',NULL,'2018-10-01 04:14:14','Approved'),(115,2,'/img/req/image-1538557549948.jpg',NULL,'2018-10-03 17:05:50','Submitted'),(116,2,'/img/req/image-1538580030393.jpg',NULL,'2018-10-03 23:20:31','Submitted'),(117,2,'/img/req/image-1538685226351.jpg',NULL,'2018-10-05 04:33:47','Submitted'),(118,2,'/img/req/image-1538686354056.jpg',NULL,'2018-10-05 04:52:34','Submitted'),(119,2,'/img/req/image-1538686983212.jpg',NULL,'2018-10-05 05:03:04','Submitted'),(120,2,'/img/req/image-1538687109007.jpg',NULL,'2018-10-05 05:05:09','Submitted'),(121,2,'/img/req/image-1538745258905.jpg',NULL,'2018-10-05 21:14:19','Submitted'),(122,2,'/img/req/image-1538746731083.jpg',NULL,'2018-10-05 21:38:51','Submitted'),(123,1,'/img/req/image-1538746800181.jpg',NULL,'2018-10-05 21:40:01','Submitted'),(124,2,'/img/req/image-1538746928920.jpg',NULL,'2018-10-05 21:42:09','Submitted'),(125,2,'/img/req/image-1538747034086.jpg',NULL,'2018-10-05 21:43:54','Submitted'),(126,2,'/img/req/image-1538748116792.jpg',NULL,'2018-10-05 22:01:57','Submitted'),(127,2,'/img/req/image-1538748213348.jpg',NULL,'2018-10-05 22:03:33','Submitted'),(128,2,'/img/req/image-1538748420895.jpg',NULL,'2018-10-05 22:07:01','Submitted'),(129,2,'/img/req/image-1538748562898.jpg',NULL,'2018-10-05 22:09:23','Submitted'),(130,2,'/img/req/image-1538748681654.jpg',NULL,'2018-10-05 22:11:22','Submitted'),(131,2,'/img/req/image-1538748989577.jpg',NULL,'2018-10-05 22:16:30','Submitted'),(132,2,'/img/req/image-1538750426313.jpg',NULL,'2018-10-05 22:40:27','Submitted'),(133,2,'/img/req/image-1538759247925.jpg',NULL,'2018-10-06 01:07:28','Submitted'),(134,1,'/img/req/image-1538759474270.jpg',NULL,'2018-10-06 01:11:15','Submitted'),(135,44,'/img/req/image-1538766405780.jpg',NULL,'2018-10-06 03:06:47','Submitted'),(136,44,'/img/req/image-1538766551076.jpg',NULL,'2018-10-06 03:09:11','Submitted'),(137,44,'/img/req/image-1538766642713.jpg',NULL,'2018-10-06 03:10:43','Submitted'),(138,44,'/img/req/image-1538767049186.jpg',NULL,'2018-10-06 03:17:29','Submitted'),(139,44,'/img/req/image-1538767408345.jpg',NULL,'2018-10-06 03:23:29','Submitted'),(140,44,'/img/req/image-1538767408214.jpg',NULL,'2018-10-06 03:23:29','Submitted'),(141,44,'/img/req/image-1538768287902.jpg',NULL,'2018-10-06 03:38:08','Submitted'),(142,44,'/img/req/image-1538768476876.jpg',NULL,'2018-10-06 03:41:17','Submitted'),(143,44,'/img/req/image-1538769245616.jpg',NULL,'2018-10-06 03:54:05','Submitted'),(144,44,'/img/req/image-1538769411610.jpg',NULL,'2018-10-06 03:56:51','Submitted'),(145,44,'/img/req/image-1538769492244.jpg',NULL,'2018-10-06 03:58:12','Submitted'),(146,44,'/img/req/image-1538769779616.jpg',NULL,'2018-10-06 04:03:00','Submitted'),(147,44,'/img/req/image-1538771346582.jpg',NULL,'2018-10-06 04:29:06','Submitted');
/*!40000 ALTER TABLE `tbl_requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementsdocument`
--

DROP TABLE IF EXISTS `tbl_requirementsdocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementsdocument` (
  `int_requirementsdocumentID` int(11) NOT NULL AUTO_INCREMENT,
  `int_requestID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(200) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `char_reqstatus` char(15) NOT NULL,
  PRIMARY KEY (`int_requirementsdocumentID`),
  KEY `int_requestID` (`int_requestID`),
  KEY `tbl_requirementsdocument_ibfk_1_idx` (`int_servicereqtypeID`),
  CONSTRAINT `tbl_requirementsdocument_ibfk_1` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`),
  CONSTRAINT `tbl_requirementsdocument_ibfk_2` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsdocument`
--

LOCK TABLES `tbl_requirementsdocument` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsdocument` DISABLE KEYS */;
INSERT INTO `tbl_requirementsdocument` VALUES (1,2,2,'/img/req/image-1538170346230.jpg','2018-09-29 00:00:00','Pending');
/*!40000 ALTER TABLE `tbl_requirementsdocument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementsfacility`
--

DROP TABLE IF EXISTS `tbl_requirementsfacility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementsfacility` (
  `int_requirementsfacilityID` int(11) NOT NULL AUTO_INCREMENT,
  `int_reservationID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(80) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `bool_reqstatus` tinyint(4) NOT NULL,
  PRIMARY KEY (`int_requirementsfacilityID`),
  KEY `int_reservationID_idx` (`int_reservationID`),
  KEY `int_servicereqtypeID` (`int_servicereqtypeID`),
  CONSTRAINT `int_reservationID` FOREIGN KEY (`int_reservationID`) REFERENCES `tbl_facilityreservation` (`int_reservationID`),
  CONSTRAINT `tbl_requirementsfacility_ibfk_1` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsfacility`
--

LOCK TABLES `tbl_requirementsfacility` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsfacility` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_requirementsfacility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementshouse`
--

DROP TABLE IF EXISTS `tbl_requirementshouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementshouse` (
  `int_requirementhouseIDs` int(11) NOT NULL AUTO_INCREMENT,
  `int_houseblessID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(200) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `char_reqstatus` char(15) NOT NULL,
  PRIMARY KEY (`int_requirementhouseIDs`),
  KEY `int_servicereqtypeID` (`int_servicereqtypeID`),
  KEY `int_houseblessID` (`int_houseblessID`),
  CONSTRAINT `tbl_requirementshouse_ibfk_2` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`),
  CONSTRAINT `tbl_requirementshouse_ibfk_3` FOREIGN KEY (`int_houseblessID`) REFERENCES `tbl_houseblessing` (`int_houseblessID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementshouse`
--

LOCK TABLES `tbl_requirementshouse` WRITE;
/*!40000 ALTER TABLE `tbl_requirementshouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_requirementshouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementsinevents`
--

DROP TABLE IF EXISTS `tbl_requirementsinevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementsinevents` (
  `int_requirementsineventsID` int(11) NOT NULL AUTO_INCREMENT,
  `int_requirementID` int(11) NOT NULL,
  `int_eventinfoID` int(11) NOT NULL,
  PRIMARY KEY (`int_requirementsineventsID`),
  KEY `tbl_event_idx` (`int_eventinfoID`),
  CONSTRAINT `tbl_event` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsinevents`
--

LOCK TABLES `tbl_requirementsinevents` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsinevents` DISABLE KEYS */;
INSERT INTO `tbl_requirementsinevents` VALUES (47,48,35),(48,49,36),(49,50,37),(50,52,38),(51,51,39),(52,53,40),(53,54,41),(54,55,42),(55,56,43),(56,57,44),(57,58,45),(58,59,46),(59,60,47),(60,61,48),(61,62,49),(62,63,50),(63,64,51),(64,65,52),(65,66,53),(66,67,54),(67,68,55),(68,69,56),(69,70,57),(70,71,58),(71,72,59),(72,73,60),(73,74,61),(74,75,62),(75,76,63),(76,77,64),(77,78,65),(78,79,66),(79,80,67),(80,81,68),(81,82,69),(82,83,70),(83,84,71),(84,85,72),(85,86,73),(86,87,74),(87,88,75),(88,89,76),(89,90,77),(90,91,78),(91,92,79),(92,93,80),(93,94,81),(94,95,82),(95,96,83),(96,97,84),(97,98,85),(98,99,86),(99,100,87),(100,101,88),(101,102,89),(102,103,90),(103,104,91),(104,105,92),(105,106,93),(106,107,94),(107,108,95),(108,109,96),(109,110,97),(110,111,98),(111,112,99),(112,113,100),(113,114,101),(114,115,102),(115,116,103),(116,117,104),(117,118,105),(118,119,106),(119,120,107),(120,121,108),(121,122,109),(122,123,110),(123,124,111),(124,125,112),(125,126,113),(126,127,114),(127,128,115),(128,129,116),(129,130,117),(130,131,118),(131,132,119),(132,133,120),(133,134,121),(134,135,122),(135,136,123),(136,137,124),(137,138,125),(138,140,126),(139,139,127),(140,141,128),(141,142,130),(142,143,131),(143,144,132),(144,145,133),(145,146,134),(146,147,135);
/*!40000 ALTER TABLE `tbl_requirementsinevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementtype`
--

DROP TABLE IF EXISTS `tbl_requirementtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementtype` (
  `int_reqtypeID` int(11) NOT NULL AUTO_INCREMENT,
  `int_eventID` int(11) NOT NULL,
  `var_reqname` varchar(100) NOT NULL,
  `var_reqdesc` varchar(100) NOT NULL,
  `char_reqmode` char(25) NOT NULL,
  `char_reqtype` varchar(25) NOT NULL,
  PRIMARY KEY (`int_reqtypeID`),
  KEY `int_eventID` (`int_eventID`),
  CONSTRAINT `tbl_requirementtype_ibfk_1` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementtype`
--

LOCK TABLES `tbl_requirementtype` WRITE;
/*!40000 ALTER TABLE `tbl_requirementtype` DISABLE KEYS */;
INSERT INTO `tbl_requirementtype` VALUES (1,3,'Birth Certificate','Birth Certificate','Copy or Original','Civil '),(2,9,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(3,2,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(4,2,' Baptismal Certificate','Baptismal Certificate','Copy or Original','Church'),(6,6,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(7,7,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(8,7,'Death Certificate','Death Certificate','Copy','Civil'),(9,11,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(10,11,'Baptismal Certificate','Baptismal Certificate','Copy or Original','Church'),(13,5,'Birth Certificate of the Groom','Birth Certificate of the Groom','Original','Default'),(14,5,'Birth Certificate of the Bride','Birth Certificate of the Bride','Original','Default'),(15,5,'Baptismal Certificate of the Groom','Baptismal Certificate of the groom with FOR MARRIAGE PUSPOSES ONLY annoitation','Original','Default'),(16,5,'Confirmation Certificate of the Groom','Confirmation Certificate of the groom with FOR MARRIAGE PURPOSES ONLY annoitatio','Original','Default'),(17,5,'Baptismal Certificate of the Bride','Baptismal Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ','Original','Default'),(18,5,'Confirmation Certificate of the Bride','Confirmation Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ','Original','Default'),(23,5,'Marriage License','License','Original','Default'),(24,5,'Marriage Contract','contract','Original','Civil'),(25,5,'NSO CENOMAR','NSO Certification of No Marriage','Original','Default'),(26,5,'Clearance from Chancery Office','Clearance (form 3)','Original','Chancery'),(27,5,'Certification of Freedom to Marry from Embassy','Certification for foreigner','Original','Civil'),(28,5,'Certification of Freedom to Marry from Chancery','certification, for different cases','Copy or Original','Chancery'),(29,5,'Permission for Mixed Marriage from Chancery','Permission for non-catholic','Original','Chancery'),(30,5,'Affidavit or Co-habitation','for couple living in for more than 5 months','Original','Civil'),(31,5,'Affidavit by the applicant with 2 witnesses','for no religion','Original','Civil'),(32,5,'Dispensation from Chancery','Dispensation from Chancery for different cases','Original','Chancery'),(33,5,'Decree of Divorced','for divorced','Original','Civil'),(34,5,'Civil Annulment Decision with Certification of Finality','for divorced','Original','Civil'),(35,5,'Declaration of Nullity by Catholic Matrimonial Tribunal','for divorced','Original','Civil'),(36,5,'Copy of marriage cert','for divorced','Copy or Original','Civil'),(37,5,'New copy of Marriage Contract','for renewal','Original','Civil'),(38,5,'Copy of Death Certificate','for widow/widower','Original','Civil'),(39,5,'Copy of Marriage Contract','for widow/widower','Copy or Original','Civil'),(40,5,'Military Clearance from Immediate Commanding Office','for military ','Original','Civil'),(44,1,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(45,5,'Valid ID of the Bride','Valid id','Copy','Default'),(46,5,'Valid ID of the Groom','Valid ID','Copy','Default'),(47,4,'Birth Certificate','Birthcertificate','Copy','Original');
/*!40000 ALTER TABLE `tbl_requirementtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_school`
--

DROP TABLE IF EXISTS `tbl_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_school` (
  `int_schoolID` int(11) NOT NULL AUTO_INCREMENT,
  `var_schoolname` varchar(45) NOT NULL,
  `date_batchyearstart` year(4) NOT NULL,
  `date_batchyearend` year(4) NOT NULL,
  PRIMARY KEY (`int_schoolID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_school`
--

LOCK TABLES `tbl_school` WRITE;
/*!40000 ALTER TABLE `tbl_school` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_section`
--

DROP TABLE IF EXISTS `tbl_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_section` (
  `int_sectionID` int(11) NOT NULL AUTO_INCREMENT,
  `var_sectionname` varchar(45) NOT NULL,
  `int_schoolID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  PRIMARY KEY (`int_sectionID`),
  KEY `int_schoolID_idx` (`int_schoolID`),
  KEY `int_userID_idx` (`int_userID`),
  CONSTRAINT `int_schoolID` FOREIGN KEY (`int_schoolID`) REFERENCES `tbl_school` (`int_schoolID`),
  CONSTRAINT `int_userID` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_section`
--

LOCK TABLES `tbl_section` WRITE;
/*!40000 ALTER TABLE `tbl_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_servicereqtype`
--

DROP TABLE IF EXISTS `tbl_servicereqtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_servicereqtype` (
  `int_servicereqtypeID` int(11) NOT NULL AUTO_INCREMENT,
  `int_serviceutilitiesID` int(11) NOT NULL,
  `var_reqname` varchar(45) NOT NULL,
  `var_reqdesc` text NOT NULL,
  PRIMARY KEY (`int_servicereqtypeID`),
  KEY `int_serviceutilitiesID` (`int_serviceutilitiesID`),
  CONSTRAINT `tbl_servicereqtype_ibfk_1` FOREIGN KEY (`int_serviceutilitiesID`) REFERENCES `tbl_serviceutilities` (`int_serviceutilitiesID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_servicereqtype`
--

LOCK TABLES `tbl_servicereqtype` WRITE;
/*!40000 ALTER TABLE `tbl_servicereqtype` DISABLE KEYS */;
INSERT INTO `tbl_servicereqtype` VALUES (2,1,'Valid ID','valid ID of the person in the certificate'),(3,2,'Valid ID','Valid ID of the person reserving the facility'),(4,3,'Valid ID','Valid ID of the owner');
/*!40000 ALTER TABLE `tbl_servicereqtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_services`
--

DROP TABLE IF EXISTS `tbl_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_services` (
  `int_eventID` int(10) NOT NULL AUTO_INCREMENT,
  `var_eventname` varchar(50) NOT NULL,
  `var_eventdesc` text NOT NULL,
  `char_type` char(15) NOT NULL,
  `var_servicepicpath` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_services`
--

LOCK TABLES `tbl_services` WRITE;
/*!40000 ALTER TABLE `tbl_services` DISABLE KEYS */;
INSERT INTO `tbl_services` VALUES (1,'Anointing of the sick','The anointing of the sick is administered to bring spiritual and even physical strength during an illness, especially near the time of death. It is most likely one of the last sacraments one will receive. A sacrament is an outward sign established by Jesus Christ to confer inward grace. In more basic terms, it is a rite that is performed to convey God’s grace to the recipient, through the power of the Holy Spirit.','Blessing',NULL),(2,'Confirmation','The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confir- mation is the sacrament of maturity and coming of age. The real confession of Christ consist in this \'that the whole man submits himself to Truth, in the judgment of his understanding, in the submission of his will and in the consecration of his whole power of love . . . To do this, poor-spirited man is only able when he has been confirmed by God\'s grace\'\r\n\r\nThis confirmation in the power of the Holy Spirit leading to a firm profession of faith has always been the particular effect which Catholic tradition has ascribed to the sacrament. It is effect which complements and completes that of baptism.\r\n','Baptism',NULL),(3,'Baptism','The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead. We come into the world with only the natural endowments of human nature. The supernatural life which is the result of God’s personal and intimate indwelling, is absent from the soul.\r\n','Baptism',NULL),(4,'Funeral Service','The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n','Blessing',NULL),(5,'Marriage','When the Catholic Church teaches that marriage between two baptized persons is a sacrament, it is saying that the couple’s relationship expresses in a unique way the unbreakable bond of love between Christ and his people. Like the other six sacraments of the Church, marriage is a sign or symbol which reveals the Lord Jesus and through which his divine life and love are communicated. All seven sacraments were instituted by Christ and were entrusted to the Church to be celebrated in faith within and for the community of believers. The rituals and prayers by which a sacrament is celebrated serve to express visibly what God is doing invisibly.\r\n','Marriage',NULL),(6,'First Communion','first communion','Communion',NULL),(7,'Funeral Mass','The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n','Blessing',NULL),(9,'Special Baptism','It includes adult baptism and special baptism.\r\ntuesday-sat','Baptism',NULL),(11,'Special Confirmation','espesyal na konpirmasyon','Baptism',NULL);
/*!40000 ALTER TABLE `tbl_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_serviceutilities`
--

DROP TABLE IF EXISTS `tbl_serviceutilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_serviceutilities` (
  `int_serviceutilitiesID` int(11) NOT NULL AUTO_INCREMENT,
  `var_servicename` varchar(45) NOT NULL,
  `char_status` char(10) NOT NULL,
  `var_servicedesc` text NOT NULL,
  PRIMARY KEY (`int_serviceutilitiesID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_serviceutilities`
--

LOCK TABLES `tbl_serviceutilities` WRITE;
/*!40000 ALTER TABLE `tbl_serviceutilities` DISABLE KEYS */;
INSERT INTO `tbl_serviceutilities` VALUES (1,'Document Request','Enabled','Request Document '),(2,'Facility Reservation','Enabled','facility reservationnnn'),(3,'House/Business Blessing','Enabled','house blessing or business blessing or establishment blessing');
/*!40000 ALTER TABLE `tbl_serviceutilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_specialevent`
--

DROP TABLE IF EXISTS `tbl_specialevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_specialevent` (
  `int_specialeventID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `var_spceventname` varchar(50) NOT NULL,
  `text_eventdesc` text NOT NULL,
  `time_eventstart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `time_eventend` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `var_eventvenue` varchar(200) NOT NULL,
  `char_eventtype` char(25) NOT NULL,
  `var_approvalstatus` varchar(25) NOT NULL,
  `var_eventpicpath` varchar(200) NOT NULL,
  PRIMARY KEY (`int_specialeventID`),
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_specialevent_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_specialevent`
--

LOCK TABLES `tbl_specialevent` WRITE;
/*!40000 ALTER TABLE `tbl_specialevent` DISABLE KEYS */;
INSERT INTO `tbl_specialevent` VALUES (6,5,'Mass wedding','Kasalang bayan','2018-07-28 02:44:00','2018-07-28 02:44:00','bro roqueto','Open for everyone','Approved','');
/*!40000 ALTER TABLE `tbl_specialevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_sponsors`
--

DROP TABLE IF EXISTS `tbl_sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_sponsors` (
  `int_sponsorID` int(10) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(10) NOT NULL,
  `var_sponsorname` varchar(50) NOT NULL,
  PRIMARY KEY (`int_sponsorID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_sponsors_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_sponsors`
--

LOCK TABLES `tbl_sponsors` WRITE;
/*!40000 ALTER TABLE `tbl_sponsors` DISABLE KEYS */;
INSERT INTO `tbl_sponsors` VALUES (12,36,'iansdasd'),(13,36,'joshua rae'),(14,37,'caleb'),(15,37,'david'),(16,38,'asdasd'),(17,39,'asdasd'),(18,38,'asdasd'),(19,39,'asdasd'),(20,40,'Gramar Lacsina'),(21,40,'Crisaldo Santos'),(22,42,'asdas'),(23,42,'dasdasd'),(24,43,'asd'),(25,43,'asdasd'),(26,44,'asdasda'),(27,44,'sdasdasdasdas'),(28,45,'asd'),(29,45,'asd'),(30,46,'asd'),(31,46,'asd'),(32,47,'asd'),(33,47,'asd'),(34,48,'asd'),(35,48,'asd'),(36,49,'asd'),(37,49,'asd'),(38,50,'asd'),(39,50,'asd'),(40,51,'asd'),(41,51,'asd'),(42,52,'asd'),(43,52,'asd'),(44,53,'asd'),(45,53,'asd'),(46,54,'asdasd'),(47,54,'asdasd'),(48,55,'asd'),(49,55,'qwe'),(50,56,'Joshua Rae Macaya'),(51,56,'Crsaldo Santos'),(52,57,'Joshua Rae Macaya'),(53,57,'shit'),(54,58,'asdas'),(55,58,'dasdasd'),(56,59,'asd'),(57,59,'asd'),(58,60,'asd'),(59,60,'qwe'),(60,61,'asd'),(61,61,'qwe'),(62,62,'asd'),(63,62,'asd'),(64,63,'asd'),(65,63,'asd'),(66,64,'asd'),(67,64,'asd'),(68,65,'asd'),(69,65,'asd'),(70,66,'asd'),(71,66,'asd'),(72,67,'zxcsd'),(73,67,'asdasd'),(74,68,'Sponsor 1'),(75,68,'Sponsor 2'),(76,69,'Sponsor 1'),(77,69,'Sponsor 2'),(78,70,'asd'),(79,70,'asd'),(80,71,'asd'),(81,71,'asdasd'),(82,72,'asd'),(83,72,'asd'),(84,73,'asd'),(85,73,'asd'),(86,74,'asd'),(87,74,'asd'),(88,75,'asd'),(89,75,'asd'),(90,76,'asd'),(91,76,'asd'),(92,77,'asd'),(93,77,'asd'),(94,78,'asd'),(95,78,'asd'),(96,79,'asd'),(97,79,'asd'),(98,80,'asd'),(99,80,'asd'),(100,81,'asd'),(101,81,'asd'),(102,82,'asd'),(103,82,'asd'),(104,83,'asd'),(105,83,'asd'),(106,84,'asd'),(107,84,'asd'),(108,85,'asd'),(109,85,'asd'),(110,86,'asd'),(111,86,'asd'),(112,87,'asd'),(113,87,'asd'),(114,88,'asd'),(115,88,'asd'),(116,89,'asd'),(117,89,'asd'),(118,90,'asd'),(119,90,'asd'),(120,91,'asd'),(121,91,'asd'),(122,92,'asd'),(123,92,'asd'),(124,93,'asd'),(125,93,'asd'),(126,94,'asd'),(127,94,'asd'),(128,95,'asd'),(129,95,'asd'),(130,96,'asd'),(131,96,'asd'),(132,97,'asd'),(133,97,'asd'),(134,98,'asd'),(135,98,'asd'),(136,99,'asd'),(137,99,'asd'),(138,100,'as'),(139,100,'dasd'),(140,101,'asd'),(141,101,'asd'),(142,102,'asd'),(143,102,'asd'),(144,103,'asd'),(145,103,'asd'),(146,104,'Dolly macaya'),(147,104,'Dolly macaya'),(148,104,'rosalie macaya'),(149,104,'rosalie macaya'),(150,104,'Dolly macaya'),(151,104,'rosalie macaya'),(152,105,'dolly macaya'),(153,105,'rosalie macaya'),(154,106,'Zayn Malik'),(155,106,'Louis Tomlinson'),(156,107,'Zayn Malik'),(157,107,'Niall Horan'),(158,108,'louis tomlinson'),(159,108,'zayn malik'),(160,109,'asd'),(161,109,'asd'),(162,110,'ssss'),(163,110,'sss'),(164,111,'asd'),(165,111,'asd'),(166,112,'asd'),(167,112,'asd'),(168,113,'sdsds'),(169,113,'asds'),(170,114,'asd'),(171,114,'asd'),(172,115,'asd'),(173,115,'asd'),(174,116,'asd'),(175,116,'asd'),(176,117,'asd'),(177,117,'asd'),(178,118,'asd'),(179,118,'asd'),(180,119,'asd'),(181,119,'asd'),(182,120,'asd'),(183,120,'asd'),(184,121,'asd'),(185,121,'asd');
/*!40000 ALTER TABLE `tbl_sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `int_userID` int(10) NOT NULL AUTO_INCREMENT,
  `var_userlname` varchar(55) NOT NULL,
  `var_userfname` varchar(55) NOT NULL,
  `var_usermname` varchar(55) NOT NULL,
  `char_usergender` char(10) NOT NULL,
  `var_useraddress` varchar(100) NOT NULL,
  `var_usercontactnum` varchar(13) NOT NULL,
  `var_username` varchar(55) NOT NULL,
  `var_useremail` varchar(55) NOT NULL,
  `var_password` varchar(80) NOT NULL,
  `char_usertype` char(20) NOT NULL,
  `var_userpicpath` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (5,'Admin','admin','admin','Female','Anywhere','09123456789','admin','admin@gmail.com','admin','Admin',NULL),(6,'Secretariat','Secretariat','Secretariat','Female','Anywhere','09999999999','secretariat','secretariat@gmail.com','secretariat','Secretariat',NULL),(7,'Coordinator','Coordinator','Coordinator','Male','Anywhere','09999999999','coordinator','coordinator@gmail.com','coordinator','Coordinator',NULL),(8,'Catechist','Catechist','Catechist','Female','Anywhere','0999999999','catechist','catechist','catechist','Catechist',NULL),(10,'Priest','Priest','Priest','Male','Anyhwere','09123456789','priest','priest@gmail.com','priest','Priest',NULL),(11,'Ebrada','Jonalyn Fe','Desalisa','Female','Payatas B Quezon City','09277475753','jonalynfe11','jonalynfeebrada11@gmail.com','123jona','Guest',NULL),(12,'Macaya','Joshua Rae','','Male','Caloocan CIty','09277475711','joshuarae','joshuarae@gmail.com','123rae','Guest',NULL),(13,'Del Rosario','Eldrin Rei','Pablo','Male','Valenzuela City','09277475742','eldrinrei','asdfwe','123eldrin','Guest',NULL),(14,'Peñaverde','Norme Ann Joyce','Tonzon','Female','Infanta Quezon','09277475733','normeann','normeann','123norme','Guest',NULL),(15,'Flores','Rachel Maiden','Cabuso','Female','Tondo, Manila','09999999999','rachel','rachel@gmail.com','123rachel','Guest',NULL),(16,'Lacsina','Gramar ','Desuyp','Male','Sta. ana','09205516439','priest2','priest@gmail.com','priest2','Priest',NULL),(17,'Aydalla','Sherwin','Galang','Male','Taguig City','09999999998','priest3','priest@gmail.com','priest3','Priest',NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_utilities`
--

DROP TABLE IF EXISTS `tbl_utilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_utilities` (
  `int_utilitiesID` int(11) NOT NULL AUTO_INCREMENT,
  `int_eventID` int(11) DEFAULT NULL,
  `int_serviceutilitiesID` int(11) DEFAULT NULL,
  `int_reservationmindays` int(11) NOT NULL,
  `int_reservationmaxdays` int(11) NOT NULL,
  `int_requirementsdays` int(11) NOT NULL,
  `time_duration` time DEFAULT NULL,
  `time_defaulttime` time DEFAULT NULL,
  `var_availabledays` varchar(15) DEFAULT NULL,
  `time_availablestart` time DEFAULT NULL,
  `time_availableend` time DEFAULT NULL,
  `bool_withpayment` tinyint(1) NOT NULL,
  `double_fee` double DEFAULT NULL,
  `double_addrate` double DEFAULT NULL,
  `int_downpaymentdays` int(11) DEFAULT NULL,
  `int_fullpaymentdays` int(11) DEFAULT NULL,
  `bool_refundable` tinyint(1) DEFAULT NULL,
  `int_refunddays` int(11) DEFAULT NULL,
  `int_refundpercent` int(11) DEFAULT NULL,
  `bool_withageconstraints` tinyint(1) NOT NULL,
  `int_agemin` int(11) DEFAULT NULL,
  `int_agemax` int(11) DEFAULT NULL,
  `char_servicestatus` char(15) NOT NULL,
  `int_maxcount` int(11) NOT NULL,
  PRIMARY KEY (`int_utilitiesID`),
  KEY `tbl_ibfk1_idx` (`int_eventID`),
  KEY `int_serviceutilitiesID` (`int_serviceutilitiesID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_utilities`
--

LOCK TABLES `tbl_utilities` WRITE;
/*!40000 ALTER TABLE `tbl_utilities` DISABLE KEYS */;
INSERT INTO `tbl_utilities` VALUES (1,1,NULL,1,30,0,'01:00:00','00:00:00','2,3,4,5,6','08:00:00','05:00:00',0,0,0,0,0,0,NULL,0,0,0,0,'Enabled',0),(2,2,NULL,14,90,0,'01:00:00','11:00:00','0','12:00:00','12:00:00',1,300,50,0,10,0,NULL,0,1,11,0,'Enabled',0),(3,3,NULL,14,90,0,'01:00:00','11:00:00','0','12:00:00','12:00:00',1,300,50,0,7,0,NULL,0,1,0,11,'Enabled',30),(4,4,NULL,3,7,0,'01:00:00','00:00:00','2,3,4,5,6','09:00:00','17:00:00',0,NULL,NULL,NULL,NULL,0,NULL,NULL,0,NULL,NULL,'Enabled',0),(5,5,NULL,120,365,60,'01:30:00','00:00:00','2,3,4,5,6','08:00:00','15:00:00',1,7000,50,15,60,1,30,50,1,18,0,'Enabled',2),(7,7,NULL,3,7,0,'01:00:00','00:00:00','2,3,4,5,6','09:00:00','15:00:00',1,300,0,NULL,2,0,NULL,NULL,0,NULL,NULL,'Enabled',0),(9,9,NULL,14,90,0,'01:00:00','00:00:00','2,3,4,5,6','08:00:00','16:00:00',1,1000,50,NULL,10,0,NULL,NULL,0,NULL,NULL,'Enabled',5),(11,11,NULL,14,90,0,'01:00:00','00:00:00','2,3,4,5,6','08:00:00','16:00:00',1,1000,50,NULL,10,0,NULL,NULL,1,11,0,'Enabled',5),(13,NULL,1,0,0,0,'12:00:00',NULL,'0,1,2,3,4,5,6','12:00:00','12:00:00',1,100,0,0,0,0,NULL,0,0,0,0,'Enabled',0),(14,NULL,2,0,0,0,NULL,NULL,'0','00:00:00','00:00:00',1,0,0,0,0,1,NULL,NULL,0,NULL,NULL,'Enabled',0),(15,NULL,3,7,30,0,'01:00:00',NULL,'2,3,4,5,6','09:00:00','03:00:00',0,0,0,0,0,0,NULL,0,0,0,0,'Enabled',0);
/*!40000 ALTER TABLE `tbl_utilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_utilities_client`
--

DROP TABLE IF EXISTS `tbl_utilities_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_utilities_client` (
  `int_clientID` int(11) NOT NULL AUTO_INCREMENT,
  `var_clientname` varchar(100) NOT NULL,
  `var_clientabbv` varchar(10) DEFAULT NULL,
  `var_clientlocation` varchar(300) NOT NULL,
  `int_clientzipcode` int(11) NOT NULL,
  `var_clienttelephone` varchar(15) NOT NULL,
  `var_clientmobile` varchar(13) NOT NULL,
  `var_clientemail` varchar(100) NOT NULL,
  `var_clientparishpriest` varchar(200) NOT NULL,
  `time_officeopen` time NOT NULL,
  `time_officeclose` time NOT NULL,
  PRIMARY KEY (`int_clientID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_utilities_client`
--

LOCK TABLES `tbl_utilities_client` WRITE;
/*!40000 ALTER TABLE `tbl_utilities_client` DISABLE KEYS */;
INSERT INTO `tbl_utilities_client` VALUES (1,'Ina ng Lupang Pangako Parish','INLPP','Phase 1 Lupang Pangako Payatas B Quezon City',1119,'(02) 500-0239','09999999999','INLPP@yahoo.com','Fr. Mike Sandaga','08:00:00','17:00:00');
/*!40000 ALTER TABLE `tbl_utilities_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_utlities_availabledays`
--

DROP TABLE IF EXISTS `tbl_utlities_availabledays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_utlities_availabledays` (
  `int_availday` int(11) NOT NULL AUTO_INCREMENT,
  `var_reservationtype` varchar(11) NOT NULL,
  `int_day` int(11) NOT NULL,
  `var_dayname` varchar(11) NOT NULL,
  PRIMARY KEY (`int_availday`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_utlities_availabledays`
--

LOCK TABLES `tbl_utlities_availabledays` WRITE;
/*!40000 ALTER TABLE `tbl_utlities_availabledays` DISABLE KEYS */;
INSERT INTO `tbl_utlities_availabledays` VALUES (1,'Special',1,'Tuesday'),(2,'Special',2,'Wednesday'),(3,'Special',3,'Thursday'),(4,'Special',4,'Friday'),(5,'Special',5,'Saturday'),(6,'Regular',6,'Sunday'),(7,'Vacant',0,'Monday');
/*!40000 ALTER TABLE `tbl_utlities_availabledays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_voucher`
--

DROP TABLE IF EXISTS `tbl_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_voucher` (
  `int_voucherID` int(11) NOT NULL AUTO_INCREMENT,
  `int_notifID` int(11) NOT NULL,
  `int_requestID` int(11) NOT NULL,
  `date_issued` date NOT NULL,
  `date_due` date NOT NULL,
  PRIMARY KEY (`int_voucherID`),
  KEY `int_notifID_idx` (`int_notifID`),
  KEY `int_requestID_idx` (`int_requestID`),
  CONSTRAINT `int_notifID` FOREIGN KEY (`int_notifID`) REFERENCES `tbl_notification` (`int_notifID`),
  CONSTRAINT `int_requestID` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_voucher`
--

LOCK TABLES `tbl_voucher` WRITE;
/*!40000 ALTER TABLE `tbl_voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_voucherevents`
--

DROP TABLE IF EXISTS `tbl_voucherevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_voucherevents` (
  `int_voucherID` int(11) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(11) NOT NULL,
  `date_issued` date NOT NULL,
  `date_due` date NOT NULL,
  `int_userID` int(11) NOT NULL,
  `var_vouchercode` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`int_voucherID`),
  UNIQUE KEY `var_vouchercode_UNIQUE` (`var_vouchercode`),
  KEY `int_eventinfoID_idx` (`int_eventinfoID`),
  KEY `tbl_ibfk2_idx` (`int_userID`),
  CONSTRAINT `int_eventinfoID` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tbl_ibfk3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_voucherevents`
--

LOCK TABLES `tbl_voucherevents` WRITE;
/*!40000 ALTER TABLE `tbl_voucherevents` DISABLE KEYS */;
INSERT INTO `tbl_voucherevents` VALUES (1,36,'2018-09-25','2018-10-02',11,NULL),(2,37,'2018-09-25','2018-10-02',11,NULL),(3,38,'2018-09-25','2018-10-02',11,NULL),(4,39,'2018-09-25','2018-10-02',11,NULL),(5,40,'2018-09-25','2018-10-02',11,NULL),(6,42,'2018-09-26','2018-10-03',11,NULL),(7,43,'2018-09-26','2018-10-03',11,NULL),(8,44,'2018-09-26','2018-10-03',11,NULL),(9,45,'2018-09-26','2018-10-03',11,NULL),(10,46,'2018-09-26','2018-10-03',11,NULL),(11,47,'2018-09-26','2018-10-03',11,NULL),(12,48,'2018-09-26','2018-10-03',11,NULL),(13,49,'2018-09-26','2018-10-03',11,NULL),(14,50,'2018-09-26','2018-10-03',11,NULL),(15,51,'2018-09-26','2018-10-03',11,NULL),(16,52,'2018-09-26','2018-10-03',11,NULL),(17,53,'2018-09-26','2018-10-03',11,NULL),(18,54,'2018-09-26','2018-10-03',11,NULL),(19,55,'2018-09-26','2018-10-03',11,NULL),(20,56,'2018-09-26','2018-10-03',11,NULL),(21,57,'2018-09-26','2018-10-03',11,NULL),(22,58,'2018-09-26','2018-10-03',11,NULL),(23,59,'2018-09-26','2018-10-03',11,NULL),(24,60,'2018-09-26','2018-10-03',11,NULL),(25,61,'2018-09-26','2018-10-03',11,NULL),(26,62,'2018-09-26','2018-10-03',11,NULL),(27,63,'2018-09-26','2018-10-03',11,NULL),(28,64,'2018-09-26','2018-10-03',11,NULL),(29,65,'2018-09-26','2018-10-03',11,NULL),(30,66,'2018-09-26','2018-10-03',11,NULL),(31,67,'2018-09-26','2018-10-03',11,NULL),(32,68,'2018-09-26','2018-10-03',11,NULL),(33,69,'2018-09-26','2018-10-03',11,NULL),(34,70,'2018-09-29','2018-10-06',11,NULL),(35,71,'2018-09-29','2018-10-06',11,NULL),(36,72,'2018-09-29','2018-10-06',11,NULL),(37,73,'2018-09-29','2018-10-06',11,NULL),(38,74,'2018-09-29','2018-10-06',11,NULL),(39,75,'2018-09-29','2018-10-06',11,NULL),(40,76,'2018-09-29','2018-10-06',11,NULL),(41,77,'2018-09-29','2018-10-06',11,NULL),(42,78,'2018-09-29','2018-10-06',11,NULL),(43,79,'2018-09-29','2018-10-06',11,NULL),(44,80,'2018-09-29','2018-10-06',11,NULL),(45,81,'2018-09-29','2018-10-06',11,NULL),(46,82,'2018-09-29','2018-10-06',11,NULL),(47,83,'2018-09-29','2018-10-06',11,NULL),(48,84,'2018-09-29','2018-10-06',11,NULL),(49,85,'2018-09-29','2018-10-06',11,NULL),(50,86,'2018-09-29','2018-10-06',11,NULL),(51,87,'2018-09-29','2018-10-06',11,NULL),(52,88,'2018-09-29','2018-10-06',11,NULL),(53,89,'2018-09-29','2018-10-06',11,NULL),(54,90,'2018-09-29','2018-10-06',11,NULL),(55,91,'2018-09-29','2018-10-06',11,NULL),(56,92,'2018-09-29','2018-10-06',11,NULL),(57,93,'2018-09-29','2018-10-06',11,NULL),(58,94,'2018-09-29','2018-10-06',11,NULL),(59,95,'2018-09-29','2018-10-06',11,NULL),(60,96,'2018-09-29','2018-10-06',11,NULL),(61,97,'2018-09-29','2018-10-06',11,NULL),(62,98,'2018-09-29','2018-10-06',11,NULL),(63,99,'2018-09-29','2018-10-06',11,NULL),(64,100,'2018-10-01','2018-10-08',11,NULL),(65,101,'2018-10-01','2018-10-08',11,NULL),(66,102,'2018-10-03','2018-10-10',11,NULL),(67,103,'2018-10-03','2018-10-10',11,NULL),(68,104,'2018-10-05','2018-10-12',11,'E'),(69,104,'2018-10-05','2018-10-12',11,'EE'),(70,104,'2018-10-05','2018-10-12',11,'EEH'),(71,104,'2018-10-05','2018-10-12',11,'EEHFE'),(72,104,'2018-10-05','2018-10-12',11,'EEHFEg'),(73,104,'2018-10-05','2018-10-12',11,'EEHF'),(74,104,'2018-10-05','2018-10-12',11,'EEHFEgCq'),(75,104,'2018-10-05','2018-10-12',11,'EEHFEgC'),(76,105,'2018-10-05','2018-10-12',11,'YgYB1wUb'),(77,106,'2018-10-05','2018-10-12',11,'7AJxn3ce'),(78,107,'2018-10-05','2018-10-12',11,'n6zLhwE2'),(79,108,'2018-10-05','2018-10-12',11,'fzQz5BED'),(80,109,'2018-10-05','2018-10-12',11,'85qhqKJc'),(81,110,'2018-10-05','2018-10-12',11,'e5HImt5P'),(82,111,'2018-10-05','2018-10-12',11,'D4iC99f9'),(83,112,'2018-10-05','2018-10-12',11,'1aUNKJow'),(84,113,'2018-10-05','2018-10-12',11,'UUatgaDF'),(85,114,'2018-10-05','2018-10-12',11,'3K4Jc7Av'),(86,115,'2018-10-05','2018-10-12',11,'zM9u7gR9'),(87,116,'2018-10-05','2018-10-12',11,'EDrV7ba4'),(88,117,'2018-10-05','2018-10-12',11,'sCTxyD2T'),(89,118,'2018-10-05','2018-10-12',11,'bXcRdYM7'),(90,119,'2018-10-05','2018-10-12',11,'fRdwwQ94'),(91,120,'2018-10-06','2018-10-13',11,'9zEDTaqy'),(92,121,'2018-10-06','2018-10-13',11,'KWkdtnzp'),(93,124,'2018-10-06','2018-10-13',11,'HXOcpJNj'),(94,125,'2018-10-06','2018-10-13',11,'BCxQs2g8'),(95,126,'2018-10-06','2018-10-13',11,'kq75FUzx'),(96,127,'2018-10-06','2018-10-13',11,'mmWw9tuS'),(97,128,'2018-10-06','2018-10-13',11,'UnaBEFh9'),(98,130,'2018-10-06','2018-10-13',11,'bCJYvWjk'),(99,131,'2018-10-06','2018-10-13',11,'sCNFFX64'),(100,132,'2018-10-06','2018-10-13',11,'cTNbwk8m'),(101,133,'2018-10-06','2018-10-13',11,'Avzc4L2R'),(102,134,'2018-10-06','2018-10-13',11,'zD9buN3c'),(103,135,'2018-10-06','2018-10-13',11,'nkDXEVJF');
/*!40000 ALTER TABLE `tbl_voucherevents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-11 12:01:41
