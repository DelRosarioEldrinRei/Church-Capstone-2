-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: capstone_church(2)
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
INSERT INTO `tbl_baptism` VALUES (121,' tandang sora','tandang sora','tandang sora','raph sotelo','ram sotelo','09205516439'),(122,' united kingdom','united kingdom','united kingdom','desmond styles','anne cox','09205516439'),(123,' pakistan','pakistan','pakistan','papa malik','mama malik','09205516439'),(124,' united kingdom','united kingdom','united kingdom','desmond styles','anne cox','09205516439'),(125,' asd','asd','asd','asd','asd','09205516439'),(126,' asd','asd','asd','asd','asd','09205516439'),(127,' asd','asd','asd','asd','asd','09205516439'),(128,' asd','das','das','as','dasd','asd'),(129,' asd','asd','asd','asd','asd','09205516439'),(130,' asd','asd','asd','asd','asd','09205516439'),(131,' asd','asd','asd','asd','asd','09205516439'),(132,' asd','asd','asd','asd','asd','09205516439'),(133,' asd','asd','asd','asd','asd','09205516439'),(134,' asd','asd','asd','asd','asd','09205516439'),(135,' asd','asd','asd','asd','asd','09205516439'),(136,' asd','asd','asd','asd','asd','09205516439'),(137,' asd','asd','asd','asd','asd','09205516439'),(138,' asd','asd','asd','asd','asd','asd'),(139,' asd','asd','asd','asd','asd','09205516439'),(140,' as','asd','asd','asd','asdasd','asd'),(141,' asd','asd','asd','asd','asd','09205516439'),(146,' caloocan city','caloocan city','caloocan city','jay ignacio','raquel macaya','09205516439'),(147,' asdasd','asdasd','asdasda','adasdasd','asdasd','09999999999'),(150,' Valenzuela City','Valenzuela City','Valenzuela City','enrique del rosario','narcitas del rosario','09205516439'),(151,' asd','asd','asd','asd','asd','09205516439');
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
INSERT INTO `tbl_blessing` VALUES (115,'Payatas B Quezon City','caloocan city'),(116,'Payatas B Quezon City','caloocan city'),(117,'Payatas B Quezon City','caloocan city'),(118,'Payatas B Quezon City','caloocan city'),(119,'Payatas B Quezon City','caloocan city'),(120,'Payatas B Quezon City','caloocan city'),(142,'Payatas B Quezon City','asd'),(143,'Payatas B Quezon City','asd'),(144,'Payatas B Quezon City','asd'),(145,'Payatas B Quezon City','asd');
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
  `int_paymentID` int(11) DEFAULT NULL,
  `datetime_signed` datetime DEFAULT NULL,
  PRIMARY KEY (`int_requestID`),
  KEY `int_documentID` (`int_documentID`),
  KEY `int_userID` (`int_userID`),
  KEY `tbl_documentrequest_ibfk_4_idx` (`int_paymentID`),
  CONSTRAINT `payment` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`),
  CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_documentrequest`
--

LOCK TABLES `tbl_documentrequest` WRITE;
/*!40000 ALTER TABLE `tbl_documentrequest` DISABLE KEYS */;
INSERT INTO `tbl_documentrequest` VALUES (3,11,1,'asd','asd','marriage','2018-10-06',NULL,NULL,'To be Released',127,NULL),(4,11,1,'asd','asd','marriage','2018-10-12',NULL,NULL,'Pending',134,NULL);
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
  `char_requirements` varchar(25) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_eventinfo`
--

LOCK TABLES `tbl_eventinfo` WRITE;
/*!40000 ALTER TABLE `tbl_eventinfo` DISABLE KEYS */;
INSERT INTO `tbl_eventinfo` VALUES (115,11,1,'2018-10-07','10:00:00','Pending',96,NULL,NULL),(116,11,1,'2018-10-07','10:00:00','Pending',97,NULL,NULL),(117,11,1,'2018-10-07','10:00:00','Pending',98,NULL,NULL),(118,11,1,'2018-10-10','10:00:00','Pending',99,NULL,NULL),(119,11,1,'2018-10-10','10:00:00','Pending',100,NULL,NULL),(120,11,1,'2018-10-07','10:00:00','Pending',101,NULL,NULL),(121,11,9,'2018-10-22','09:00:00','Pending',102,NULL,NULL),(122,11,9,'2018-10-22','09:00:00','Pending',103,NULL,NULL),(123,11,9,'2018-10-22','09:00:00','Pending',104,NULL,NULL),(124,11,9,'2018-10-23','10:00:00','Pending',105,NULL,NULL),(125,11,9,'2018-10-22','12:00:00','Pending',106,NULL,NULL),(126,11,9,'2018-10-22','10:00:00','Pending',107,NULL,NULL),(127,11,9,'2018-10-22','11:00:00','Pending',108,NULL,NULL),(128,11,9,'2018-10-22','12:00:00','Pending',109,NULL,NULL),(129,11,9,'2018-10-22','09:00:00','Pending',110,NULL,NULL),(130,11,9,'2018-10-22','09:00:00','Pending',111,NULL,NULL),(131,11,9,'2018-10-22','10:00:00','Pending',112,NULL,NULL),(132,11,9,'2018-10-22','11:00:00','Pending',113,NULL,NULL),(133,11,9,'2018-10-22','11:00:00','Pending',114,NULL,NULL),(134,11,9,'2018-10-22','10:00:00','Pending',115,NULL,NULL),(135,11,3,'2018-10-14','10:00:00','Approved',116,10,NULL),(136,11,3,'2018-10-14','10:00:00','Pending',117,10,NULL),(137,11,3,'2018-10-14','10:00:00','Pending',118,10,NULL),(138,11,9,'2018-10-22','12:00:00','Pending',119,NULL,NULL),(139,11,3,'2018-10-14','10:00:00','Pending',120,10,NULL),(140,11,3,'2018-10-21','10:00:00','Pending',121,NULL,NULL),(141,11,3,'2018-10-21','10:00:00','Pending',122,NULL,NULL),(142,11,1,'2018-10-09','11:00:00','Pending',123,NULL,NULL),(143,11,1,'2018-10-10','10:00:00','Pending',124,NULL,NULL),(144,11,1,'2018-10-10','10:00:00','Pending',125,NULL,NULL),(145,11,1,'2018-10-10','10:00:00','Pending',126,NULL,NULL),(146,11,3,'2018-10-21','10:00:00','Pending',128,NULL,NULL),(147,11,3,'2018-10-28','10:00:00','Pending',129,NULL,NULL),(148,11,5,'2018-10-28','10:00:00','Pending',130,NULL,'Incomplete'),(149,11,9,'2018-10-26','09:00:00','Pending',131,NULL,NULL),(150,11,3,'2018-10-28','10:00:00','Pending',132,NULL,NULL),(151,11,3,'2018-10-14','10:00:00','Pending',135,10,NULL);
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
  `var_facilitypicpath` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`int_facilityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facility`
--

LOCK TABLES `tbl_facility` WRITE;
/*!40000 ALTER TABLE `tbl_facility` DISABLE KEYS */;
INSERT INTO `tbl_facility` VALUES (1,'Bro. Roqueto 2nd floor','Meetings, training, seminars, workshops','/img/facility/facility_1.jpg'),(2,'Bro. Roqueto 3rd floor','Meetings, training, seminars, workshops, holiday parties, banquets, receptions, class reunions, anniversary parties, birthday parties, baby showers','/img/facility/facility_2.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facilityreservation`
--

LOCK TABLES `tbl_facilityreservation` WRITE;
/*!40000 ALTER TABLE `tbl_facilityreservation` DISABLE KEYS */;
INSERT INTO `tbl_facilityreservation` VALUES (16,11,1,'Seminar','Birthday',50,'2018-10-10 15:00:00','2018-10-10 11:00:00','Pending',NULL),(17,11,1,'Seminar','Birthday',50,'2018-10-10 15:00:00','2018-10-10 11:00:00','Pending',NULL),(18,11,1,'Seminar','Birthday',50,'2018-10-10 15:00:00','2018-10-10 11:00:00','Pending',NULL);
/*!40000 ALTER TABLE `tbl_facilityreservation` ENABLE KEYS */;
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
INSERT INTO `tbl_items` VALUES (1,'Chair','Upuan',39,23),(2,'Mic Stand','kurtina',2,0),(3,'Table','lamesa',10,1),(4,'Speaker','speaker',3,1),(5,'Microphone','Microphone',4,0);
/*!40000 ALTER TABLE `tbl_items` ENABLE KEYS */;
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
  `var_messagestatus` varchar(45) NOT NULL DEFAULT 'Delivered',
  PRIMARY KEY (`int_messageID`),
  KEY `int_senderID` (`int_senderID`),
  KEY `int_receiverID` (`int_receiverID`),
  CONSTRAINT `tbl_message_ibfk_1` FOREIGN KEY (`int_senderID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_message_ibfk_2` FOREIGN KEY (`int_receiverID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_message`
--

LOCK TABLES `tbl_message` WRITE;
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notification`
--

LOCK TABLES `tbl_notification` WRITE;
/*!40000 ALTER TABLE `tbl_notification` DISABLE KEYS */;
INSERT INTO `tbl_notification` VALUES (7,10,NULL,NULL,130,'2018-10-06 08:07:38'),(10,10,NULL,NULL,129,'2018-10-06 08:07:38'),(14,6,'Your Document Request is to ready to release',NULL,NULL,'2018-10-06 14:41:36'),(15,11,'Your Document Request is to ready to release',NULL,NULL,'2018-10-06 14:55:15'),(16,11,'Your Document Request is to ready to release',NULL,NULL,'2018-10-06 14:56:44'),(17,11,'Your Document Request is to ready to release',NULL,NULL,'2018-10-06 14:59:56'),(42,16,NULL,NULL,122,'2018-10-13 03:26:28'),(43,17,NULL,NULL,122,'2018-10-13 03:26:28');
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
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment`
--

LOCK TABLES `tbl_payment` WRITE;
/*!40000 ALTER TABLE `tbl_payment` DISABLE KEYS */;
INSERT INTO `tbl_payment` VALUES (95,0,NULL,'Unpaid'),(96,0,NULL,'Unpaid'),(97,0,NULL,'Unpaid'),(98,0,NULL,'Unpaid'),(99,0,NULL,'Unpaid'),(100,0,NULL,'Unpaid'),(101,0,NULL,'Unpaid'),(102,1000,NULL,'Unpaid'),(103,1000,NULL,'Unpaid'),(104,1000,NULL,'Unpaid'),(105,1000,NULL,'Unpaid'),(106,1000,NULL,'Unpaid'),(107,1000,NULL,'Unpaid'),(108,1000,NULL,'Unpaid'),(109,1000,NULL,'Unpaid'),(110,1000,NULL,'Unpaid'),(111,1000,NULL,'Unpaid'),(112,1000,'2018-10-06 09:33:28','Unpaid'),(113,1000,'2018-10-06 08:45:42','Unpaid'),(114,1000,'2018-10-06 08:06:09','Unpaid'),(115,1000,'2018-10-06 07:54:06','Unpaid'),(116,300,'2018-10-06 06:53:13','Paid'),(117,300,'2018-10-06 07:03:07','Paid'),(118,300,'2018-10-06 07:17:51','Unpaid'),(119,1000,'2018-10-06 08:01:56','Unpaid'),(120,300,'2018-10-06 07:25:13','Unpaid'),(121,300,'2018-10-06 07:33:34','Unpaid'),(122,300,'2018-10-06 07:37:03','Unpaid'),(123,0,NULL,'Unpaid'),(124,0,NULL,'Unpaid'),(125,0,NULL,'Unpaid'),(126,0,NULL,'Unpaid'),(127,50,NULL,'Unpaid'),(128,300,'2018-10-06 15:33:25','Unpaid'),(129,300,NULL,'Unpaid'),(130,7000,NULL,'Unpaid'),(131,1000,NULL,'Unpaid'),(132,300,NULL,'Unpaid'),(133,50,NULL,'Unpaid'),(134,50,NULL,'Unpaid'),(135,300,NULL,'Unpaid');
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_relation`
--

LOCK TABLES `tbl_relation` WRITE;
/*!40000 ALTER TABLE `tbl_relation` DISABLE KEYS */;
INSERT INTO `tbl_relation` VALUES (109,115,'Aunt/Uncle','Macaya','Joshua Rae','','Male','caloocan city','2018-01-01','caloocan city'),(110,116,'Aunt/Uncle','Macaya','Joshua Rae','','Male','caloocan city','2018-01-01','caloocan city'),(111,117,'Aunt/Uncle','Macaya','Joshua Rae','','Male','caloocan city','2018-01-01','caloocan city'),(112,118,'Aunt/Uncle','macaya','joshua rae','','Male','caloocan city','1998-01-01','caloocan city'),(113,119,'Aunt/Uncle','macaya','joshua rae','','Male','caloocan city','1998-01-01','caloocan city'),(114,120,'Parent','macaya','joshua rae','','Male','caloocan city','2018-01-01','caloocan city'),(115,121,'Sibling','sotelo','ralf milan','','Male','tandang sora','2017-01-01','tandang sora'),(116,122,'Aunt/Uncle','styles','harry edward','','Male','united kingdom','2018-02-01','united kingdom'),(117,123,'Parent','malik','zayn','','Male','pakistan','2018-01-01','pakistan'),(118,124,'Parent','styles','edward harry','','Male','united kingdom','2018-01-01','united kingdom'),(119,125,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(120,126,'null','asd','asd','asd','Male','asd','2018-01-01','asd'),(121,127,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(122,128,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(123,129,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(124,130,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(125,131,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(126,132,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(127,133,'null','asd','asd','asd','Male','asd','2018-01-01','asd'),(128,134,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(129,135,'Parent','asd','asd','asd','Male','asd','2018-01-30','asd'),(130,136,'Parent','asd','asd','asd','Male','asd','2018-01-30','asd'),(131,137,'Parent','asd','asd','asd','Male','asd','2018-01-30','asd'),(132,138,'Parent','asd','asd','asd','Male','asd','2018-01-01','asd'),(133,139,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(134,140,'Aunt/Uncle','asd','asd','asd','Male','dasd','2018-01-01','asd'),(135,141,'Aunt/Uncle','asd','asd','asd','Male','asd','2018-01-01','asd'),(136,142,'Aunt/Uncle','asd','asd','asd','Male','asd','2016-05-27','asd'),(137,143,'BF/GF','asd','asd','','Male','asd','2018-01-01','asd'),(138,144,'BF/GF','asd','asd','','Male','asd','2018-01-01','asd'),(139,145,'BF/GF','asd','asd','','Male','asd','2018-01-01','asd'),(140,146,'Aunt/Uncle','macaya','joshua rae','','Male','caloocan city','2017-01-01','caloocan city'),(141,147,'Parent','asdasd','asdasd','asdasdasd','Male','sdasd','2013-01-28','asdasd'),(142,148,NULL,'asdasda','sdasda','sdasdasd','Male','asdasdasd','2017-08-30','asdasd'),(143,149,'Parent','Santos','Crisaldo','Ibay','Male','Sta. Ana Paco Manila','2017-01-22','Sta. Ana Paco Manila'),(144,150,'Parent','del rosario','eldrin','pablo','Male','Valenzuela City','2017-11-22','Valenzuela City'),(145,151,'Parent','asd','asd','asd','Male','asd','2017-01-01','asd');
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
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirements`
--

LOCK TABLES `tbl_requirements` WRITE;
/*!40000 ALTER TABLE `tbl_requirements` DISABLE KEYS */;
INSERT INTO `tbl_requirements` VALUES (140,44,'/img/req/image-1538774509327.jpg',NULL,'2018-10-06 05:21:49','Submitted'),(141,44,'/img/req/image-1538774534388.jpg',NULL,'2018-10-06 05:22:15','Submitted'),(142,44,'/img/req/image-1538774546823.jpg',NULL,'2018-10-06 05:22:27','Submitted'),(143,44,'/img/req/image-1538774644620.jpg',NULL,'2018-10-06 05:24:05','Submitted'),(144,44,'/img/req/image-1538774764632.jpg',NULL,'2018-10-06 05:26:05','Submitted'),(145,44,'/img/req/image-1538774907272.jpg',NULL,'2018-10-06 05:28:27','Submitted'),(146,2,'/img/req/image-1538775092114.jpg',NULL,'2018-10-06 05:31:32','Submitted'),(147,2,'/img/req/image-1538775539583.jpg',NULL,'2018-10-06 05:39:00','Submitted'),(148,2,'/img/req/image-1538775818579.jpg',NULL,'2018-10-06 05:43:39','Submitted'),(149,2,'/img/req/image-1538776077931.jpg',NULL,'2018-10-06 05:47:58','Submitted'),(150,2,'/img/req/image-1538776313183.jpg',NULL,'2018-10-06 05:51:54','Submitted'),(151,2,'/img/req/image-1538776418179.jpg',NULL,'2018-10-06 05:53:39','Submitted'),(152,2,'/img/req/image-1538776528877.jpg',NULL,'2018-10-06 05:55:29','Submitted'),(153,2,'/img/req/image-1538776978543.jpg',NULL,'2018-10-06 06:02:59','Submitted'),(154,2,'/img/req/image-1538777068822.jpg',NULL,'2018-10-06 06:04:29','Submitted'),(155,2,'/img/req/image-1538777355908.jpg',NULL,'2018-10-06 06:09:16','Submitted'),(156,2,'/img/req/image-1538777675301.jpg',NULL,'2018-10-06 06:14:36','Submitted'),(157,2,'/img/req/image-1538777899246.jpg',NULL,'2018-10-06 06:18:19','Submitted'),(158,2,'/img/req/image-1538778087679.jpg',NULL,'2018-10-06 06:21:28','Submitted'),(159,2,'/img/req/image-1538778167605.jpg',NULL,'2018-10-06 06:22:48','Submitted'),(160,1,'/img/req/image-1538778245734.jpg',NULL,'2018-10-06 06:24:06','Approved'),(161,1,'/img/req/image-1538778257041.jpg',NULL,'2018-10-06 06:24:17','Submitted'),(162,1,'/img/req/image-1538778260309.jpg',NULL,'2018-10-06 06:24:20','Submitted'),(163,2,'/img/req/image-1538778561245.jpg',NULL,'2018-10-06 06:29:22','Submitted'),(164,1,'/img/req/image-1538779462551.jpg',NULL,'2018-10-06 06:44:23','Submitted'),(165,1,'/img/req/image-1538782368102.jpg',NULL,'2018-10-06 07:32:48','Submitted'),(166,1,'/img/req/image-1538782586016.jpg',NULL,'2018-10-06 07:36:26','Submitted'),(167,44,'/img/req/image-1538796823216.jpg',NULL,'2018-10-06 11:33:44','Submitted'),(168,44,'/img/req/image-1538806631559.jpg',NULL,'2018-10-06 14:17:13','Submitted'),(169,44,'/img/req/image-1538806634636.jpg',NULL,'2018-10-06 14:17:15','Submitted'),(170,44,'/img/req/image-1538806634904.jpg',NULL,'2018-10-06 14:17:16','Submitted'),(171,1,'/img/req/image-1538810829754.jpg',NULL,'2018-10-06 15:27:10','Submitted'),(172,1,'/img/req/image-1539232336904.jpg',NULL,'2018-10-11 12:32:18','Submitted'),(173,13,'/img/req/birthCertGroom-1539244695177.jpg',NULL,'2018-10-11 15:58:17','Submitted'),(174,47,'/img/req/validIDGroom-1539244695176.jpg',NULL,'2018-10-11 15:58:17','Submitted'),(175,47,'/img/req/validIDBride-1539244695192.jpg',NULL,'2018-10-11 15:58:17','Submitted'),(176,14,'/img/req/birthCertBride-1539244695195.jpg',NULL,'2018-10-11 15:58:17','Submitted'),(177,2,'/img/req/image-1539325458536.jpg',NULL,'2018-10-12 14:24:20','Submitted'),(178,1,'/img/req/image-1539343033452.jpg',NULL,'2018-10-12 19:17:14','Submitted'),(179,1,'/img/req/image-1539371092884.jpg',NULL,'2018-10-13 03:04:54','Submitted'),(180,46,'/img/req/image-1539371092884.jpg',NULL,'2018-10-13 03:04:54','Submitted');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsdocument`
--

LOCK TABLES `tbl_requirementsdocument` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsdocument` DISABLE KEYS */;
INSERT INTO `tbl_requirementsdocument` VALUES (2,3,2,'/img/req/image-1538807382690.jpg','2018-10-06 14:29:43','Pending'),(3,4,2,'/img/req/image-1539351852631.jpg','2018-10-12 21:44:13','Pending');
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
  `char_reqstatus` char(15) NOT NULL,
  PRIMARY KEY (`int_requirementsfacilityID`),
  KEY `int_reservationID_idx` (`int_reservationID`),
  KEY `int_servicereqtypeID` (`int_servicereqtypeID`),
  CONSTRAINT `int_reservationID` FOREIGN KEY (`int_reservationID`) REFERENCES `tbl_facilityreservation` (`int_reservationID`),
  CONSTRAINT `tbl_requirementsfacility_ibfk_1` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsfacility`
--

LOCK TABLES `tbl_requirementsfacility` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsfacility` DISABLE KEYS */;
INSERT INTO `tbl_requirementsfacility` VALUES (9,18,4,'/img/req/image-1538811853653.jpg','2018-10-06 15:44:13','Submitted');
/*!40000 ALTER TABLE `tbl_requirementsfacility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementshouse`
--

DROP TABLE IF EXISTS `tbl_requirementshouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementshouse` (
  `int_requirementhouseID` int(11) NOT NULL AUTO_INCREMENT,
  `int_houseblessID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(200) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `var_reqstatus` char(15) NOT NULL,
  PRIMARY KEY (`int_requirementhouseID`),
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
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsinevents`
--

LOCK TABLES `tbl_requirementsinevents` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsinevents` DISABLE KEYS */;
INSERT INTO `tbl_requirementsinevents` VALUES (138,140,115),(139,141,116),(140,142,117),(141,143,118),(142,144,119),(143,145,120),(144,146,121),(145,147,122),(146,148,123),(147,149,124),(148,150,125),(149,151,126),(150,152,127),(151,153,128),(152,154,129),(153,155,130),(154,156,131),(155,157,132),(156,158,133),(157,159,134),(158,160,135),(159,161,136),(160,162,137),(161,163,138),(162,164,139),(163,165,140),(164,166,141),(165,167,142),(166,168,143),(167,169,144),(168,170,145),(169,171,146),(170,172,147),(171,177,149),(172,178,150),(173,179,151),(174,180,150);
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
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_sponsors`
--

LOCK TABLES `tbl_sponsors` WRITE;
/*!40000 ALTER TABLE `tbl_sponsors` DISABLE KEYS */;
INSERT INTO `tbl_sponsors` VALUES (154,121,'crisaldo santos'),(155,121,'joshua rae macaya'),(156,122,'louis tomlinson'),(157,122,'zayn malik'),(158,123,'niall horan'),(159,123,'harry styles'),(160,124,'zayn malik'),(161,124,'niall horan'),(162,125,'asd'),(163,125,'dsa'),(164,126,'qwe'),(165,126,'zxc'),(166,127,'asd'),(167,127,'asd'),(168,128,'asd'),(169,128,'asd'),(170,129,'asd'),(171,129,'asd'),(172,130,'asd'),(173,130,'asd'),(174,131,'asd'),(175,131,'asd'),(176,132,'asd'),(177,132,'asd'),(178,133,'asd'),(179,133,'asd'),(180,134,'asd'),(181,134,'asd'),(182,135,'asd'),(183,135,'asd'),(184,136,'asd'),(185,136,'asd'),(186,137,'asd'),(187,137,'asd'),(188,138,'asd'),(189,138,'asd'),(190,139,'asd'),(191,139,'asd'),(192,140,'asd'),(193,140,'asd'),(194,141,'asd'),(195,141,'asd'),(196,146,'jona'),(197,146,'norme '),(198,147,'asdasd'),(199,147,'asdasd'),(200,148,'zxczxc'),(201,148,'zxczxczxc'),(202,149,'Gramar Lacsina'),(203,149,'Joshua Rae Macaya'),(204,150,'joshua rae macaya'),(205,150,'jonalyn fe ebrada'),(206,151,'as'),(207,151,'dasd');
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
  `var_userstatus` varchar(25) NOT NULL,
  PRIMARY KEY (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (5,'Admin','admin','admin','Female','Anywhere','09123456789','admin','admin@gmail.com','admin','Admin','Active'),(6,'Secretariat','Secretariat','Secretariat','Female','Anywhere','09999999999','secretariat','secretariat@gmail.com','secretariat','Secretariat','Active'),(7,'Coordinator','Coordinator','Coordinator','Male','Anywhere','09999999999','coordinator','coordinator@gmail.com','coordinator','Coordinator','Active'),(8,'Catechist','Catechist','Catechist','Female','Anywhere','0999999999','catechist','catechist','catechist','Catechist','Active'),(10,'Priest','Priest','Priest','Male','Anyhwere','09123456789','priest','priest@gmail.com','priest','Priest','Active'),(11,'Ebrada','Jonalyn Fe','Desalisa','Female','Payatas B Quezon City','09277475753','jonalynfe11','jonalynfeebrada11@gmail.com','123jona','Guest','Active'),(12,'Macaya','Joshua Rae','','Male','Caloocan CIty','09277475711','joshuarae','joshuarae@gmail.com','123rae','Guest','Active'),(13,'Del Rosario','Eldrin Rei','Pablo','Male','Valenzuela City','09277475742','eldrinrei','asdfwe','123eldrin','Guest','Active'),(14,'Peñaverde','Norme Ann Joyce','Tonzon','Female','Infanta Quezon','09277475733','normeann','normeann','123norme','Guest','Active'),(15,'Flores','Rachel Maiden','Cabuso','Female','Tondo, Manila','09999999999','rachel','rachel@gmail.com','123rachel','Guest','Active'),(16,'Lacsina','Gramar ','Desuyp','Male','Sta. ana','09205516439','priest2','priest@gmail.com','priest2','Priest','Active'),(17,'Aydalla','Sherwin','Galang','Male','Taguig City','09999999998','priest3','priest@gmail.com','priest3','Priest','Active');
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
-- Table structure for table `tbl_utilities_facility`
--

DROP TABLE IF EXISTS `tbl_utilities_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_utilities_facility` (
  `int_utilitiesfacilityID` int(11) NOT NULL AUTO_INCREMENT,
  `int_facilityID` int(11) NOT NULL,
  `int_maxpax` int(11) NOT NULL,
  `var_facilitysize` varchar(35) NOT NULL,
  `int_reservationmindays` int(11) NOT NULL,
  `int_reservationmaxdays` int(11) NOT NULL,
  `int_requirementsdays` int(11) NOT NULL,
  `var_availabledays` varchar(25) NOT NULL,
  `time_availablestart` time NOT NULL,
  `time_availableend` time NOT NULL,
  `bool_withpayment` int(11) NOT NULL,
  `double_fee` double DEFAULT NULL,
  `time_feeper` time DEFAULT NULL,
  `double_addrate` double DEFAULT NULL,
  `time_addper` time DEFAULT NULL,
  `int_downpaymentdays` int(11) DEFAULT NULL,
  `int_fullpaymentdays` int(11) DEFAULT NULL,
  `bool_refundable` tinyint(1) NOT NULL,
  `int_refunddays` int(11) DEFAULT NULL,
  `int_refundpercent` int(11) DEFAULT NULL,
  `char_facilitystatus` char(25) NOT NULL,
  PRIMARY KEY (`int_utilitiesfacilityID`),
  KEY `int_facilityID` (`int_facilityID`),
  CONSTRAINT `tbl_utilities_facility_ibfk_1` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_utilities_facility`
--

LOCK TABLES `tbl_utilities_facility` WRITE;
/*!40000 ALTER TABLE `tbl_utilities_facility` DISABLE KEYS */;
INSERT INTO `tbl_utilities_facility` VALUES (1,1,100,' 4.9m x 11.5m (16ft x 37f)',14,60,0,'0,1,2,3,4,5,6','06:00:00','20:00:00',1,1200,'00:02:40',300,'00:00:00',7,14,1,3,50,'Can be reserved'),(2,2,200,' 4.9m x 11.5m (16ft x 37f',14,60,0,'0,1,2,3,4,5,6','06:00:00','20:00:00',1,1200,'00:02:40',300,'00:00:00',7,10,1,3,50,'Can be reserved');
/*!40000 ALTER TABLE `tbl_utilities_facility` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_voucher`
--

LOCK TABLES `tbl_voucher` WRITE;
/*!40000 ALTER TABLE `tbl_voucher` DISABLE KEYS */;
INSERT INTO `tbl_voucher` VALUES (1,14,3,'2018-10-06','2018-10-13'),(2,15,3,'2018-10-06','2018-10-13'),(3,16,3,'2018-10-06','2018-10-13'),(4,17,3,'2018-10-06','2018-10-13');
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
  `var_vouchercode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`int_voucherID`),
  UNIQUE KEY `var_vouchercode_UNIQUE` (`var_vouchercode`),
  KEY `int_eventinfoID_idx` (`int_eventinfoID`),
  KEY `tbl_ibfk2_idx` (`int_userID`),
  CONSTRAINT `int_eventinfoID` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tbl_ibfk3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_voucherevents`
--

LOCK TABLES `tbl_voucherevents` WRITE;
/*!40000 ALTER TABLE `tbl_voucherevents` DISABLE KEYS */;
INSERT INTO `tbl_voucherevents` VALUES (69,122,'2018-10-06','2018-10-13',11,'ogzC96zf'),(70,123,'2018-10-06','2018-10-13',11,'Cxs9gb1e'),(71,124,'2018-10-06','2018-10-13',11,'xvY999gb'),(72,125,'2018-10-06','2018-10-13',11,'hnf8vuS6'),(73,126,'2018-10-06','2018-10-13',11,'296TEb4M'),(74,127,'2018-10-06','2018-10-13',11,'BIOGPncx'),(75,128,'2018-10-06','2018-10-13',11,'62zujscq'),(76,129,'2018-10-06','2018-10-13',11,'2RcD8fdz'),(77,130,'2018-10-06','2018-10-13',11,'GJdxP9tW'),(78,131,'2018-10-06','2018-10-13',11,'IgTHO1de'),(79,132,'2018-10-06','2018-10-13',11,'M6cTG4EZ'),(80,133,'2018-10-06','2018-10-13',11,'yoHt5ByW'),(81,134,'2018-10-06','2018-10-13',11,'jcy069uB'),(82,135,'2018-10-06','2018-10-13',11,'cS7znl9R'),(83,136,'2018-10-06','2018-10-13',11,'QrSPx6tp'),(84,137,'2018-10-06','2018-10-13',11,'ezYHkYaL'),(85,138,'2018-10-06','2018-10-13',11,'T55JdDX3'),(86,139,'2018-10-06','2018-10-13',11,'CYLMrZSv'),(87,140,'2018-10-06','2018-10-13',11,'4qTaYGCZ'),(88,141,'2018-10-06','2018-10-13',11,'OyWEz390'),(89,142,'2018-10-06','2018-10-13',11,'bX9dA99s'),(90,143,'2018-10-06','2018-10-13',11,'UzVbKsL0'),(91,144,'2018-10-06','2018-10-13',11,'ZsilO7sH'),(92,145,'2018-10-06','2018-10-13',11,'MTJg7aiL'),(93,146,'2018-10-06','2018-10-13',11,'hKZBvP3E'),(94,147,'2018-10-11','2018-10-18',11,'2P73pkJC'),(95,149,'2018-10-12','2018-10-19',11,'3g49SVFR'),(96,150,'2018-10-12','2018-10-19',11,'mENAYX39'),(97,151,'2018-10-13','2018-10-20',11,'W9iOniy0');
/*!40000 ALTER TABLE `tbl_voucherevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wedbride`
--

DROP TABLE IF EXISTS `tbl_wedbride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_wedbride` (
  `int_eventinfoID` int(10) NOT NULL,
  `var_blname` varchar(30) NOT NULL,
  `var_bfname` varchar(30) NOT NULL,
  `var_bmname` varchar(30) DEFAULT NULL,
  `char_bgender` char(10) NOT NULL,
  `var_baddress` varchar(100) NOT NULL,
  `date_bbirthday` date NOT NULL,
  `var_bbirthplace` varchar(100) NOT NULL,
  `var_bnationality` varchar(20) NOT NULL,
  `var_bcivilstatus` varchar(50) NOT NULL,
  `var_breligion` varchar(20) NOT NULL,
  `var_boccupation` varchar(50) NOT NULL,
  `bool_bpregnant` tinyint(1) NOT NULL,
  `var_bfathername` varchar(100) NOT NULL,
  `var_bfatherbplace` varchar(100) NOT NULL,
  `var_bfatherreligion` varchar(20) NOT NULL,
  `var_bmothername` varchar(100) NOT NULL,
  `var_bmotherbplace` varchar(100) NOT NULL,
  `var_bmotherreligion` varchar(20) NOT NULL,
  `var_bcurrparish` varchar(100) DEFAULT NULL,
  `bool_bbaptized` tinyint(1) DEFAULT NULL,
  `date_bbapdate` date DEFAULT NULL,
  `var_bbapplace` varchar(100) DEFAULT NULL,
  `bool_bconfirmed` tinyint(1) DEFAULT NULL,
  `date_bcondate` date DEFAULT NULL,
  `var_bconplace` varchar(100) DEFAULT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedbride`
--

LOCK TABLES `tbl_wedbride` WRITE;
/*!40000 ALTER TABLE `tbl_wedbride` DISABLE KEYS */;
INSERT INTO `tbl_wedbride` VALUES (148,'xczczxc','xzczxcz','xczxczxczx','Female','zxczxczxc','2018-10-03','zxcxzczxc','Filipino','Single','Catholic','zxczxczxc',1,'zxcxzc','Catholic','xzcxzczxc','xzczx','Catholic','czxczxczx','zzxczxczxc',0,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `tbl_wedbride` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wedcouple`
--

DROP TABLE IF EXISTS `tbl_wedcouple`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_wedcouple` (
  `int_eventinfoID` int(20) NOT NULL,
  `bool_livingin` tinyint(1) NOT NULL,
  `bool_married` tinyint(1) NOT NULL,
  `date_cprevweddate` date DEFAULT NULL,
  `var_cprevwedplace` varchar(100) DEFAULT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedcouple`
--

LOCK TABLES `tbl_wedcouple` WRITE;
/*!40000 ALTER TABLE `tbl_wedcouple` DISABLE KEYS */;
INSERT INTO `tbl_wedcouple` VALUES (148,1,0,NULL,NULL);
/*!40000 ALTER TABLE `tbl_wedcouple` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wedgroom`
--

DROP TABLE IF EXISTS `tbl_wedgroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_wedgroom` (
  `int_eventinfoID` int(10) NOT NULL,
  `var_gnationality` varchar(20) NOT NULL,
  `var_gcivilstatus` varchar(50) NOT NULL,
  `var_greligion` varchar(20) NOT NULL,
  `var_goccupation` varchar(50) NOT NULL,
  `var_gfathername` varchar(100) NOT NULL,
  `var_gfatherreligion` varchar(20) NOT NULL,
  `var_gfatherbplace` varchar(100) NOT NULL,
  `var_gmothername` varchar(100) NOT NULL,
  `var_gmotherreligion` varchar(20) NOT NULL,
  `var_gmotherbplace` varchar(100) NOT NULL,
  `var_gcurrparish` varchar(100) DEFAULT NULL,
  `bool_gbaptized` tinyint(1) DEFAULT NULL,
  `date_gbapdate` date DEFAULT NULL,
  `var_gbapplace` varchar(100) DEFAULT NULL,
  `bool_gconfirmed` tinyint(1) DEFAULT NULL,
  `date_gcondate` date DEFAULT NULL,
  `var_gconplace` varchar(100) DEFAULT NULL,
  UNIQUE KEY `int_eventinfoID_2` (`int_eventinfoID`),
  KEY `int_eventinfoID` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedgroom`
--

LOCK TABLES `tbl_wedgroom` WRITE;
/*!40000 ALTER TABLE `tbl_wedgroom` DISABLE KEYS */;
INSERT INTO `tbl_wedgroom` VALUES (148,'Filipino','Single','Catholic','dasdasdasd','adasdasdas','Catholic','asdasd','dasdad','Catholic','asdasd','asdasdas',0,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `tbl_wedgroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wedsteps`
--

DROP TABLE IF EXISTS `tbl_wedsteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_wedsteps` (
  `int_weddingsteps` int(11) NOT NULL AUTO_INCREMENT,
  `var_weddingstepname` varchar(45) NOT NULL,
  `var_wedstepdesc` varchar(500) NOT NULL,
  PRIMARY KEY (`int_weddingsteps`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedsteps`
--

LOCK TABLES `tbl_wedsteps` WRITE;
/*!40000 ALTER TABLE `tbl_wedsteps` DISABLE KEYS */;
INSERT INTO `tbl_wedsteps` VALUES (1,'Reservation','Reserving your desired wedding date '),(2,'Application Request','This is when you answer the application forms about the bride, groom, and the couple.'),(3,'Payment','Modes of payment: Half or Full Payment.\r\nYou will be given voucher which you will present on the cashier once you pay. The voucher has expiration date so remember to pay before the deadline. If you haven\'t pay before the deadline, your application will be considered as cancelled.'),(4,'Canonical Interview','This is the part where the couple is interviewed by the priest individually. Canonical interviews are commonly held during Tuesdays, so please spare the date and attend. \r\n	'),(5,'Submission of Requirements','The wedding date won\'t be settled until you have submitted all  requirements'),(6,'Issue Marriage Banns','The Marriage Banns is a public announcement that the parish church is impending between two specified people. The banns must return to the parish after 3 consecutive Sundays, otherwise the marriage is considered cancelled'),(7,'Pre-Cana Seminar','This is a seminar the couple must attend before they get married. They could attend.');
/*!40000 ALTER TABLE `tbl_wedsteps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-13  6:59:47
