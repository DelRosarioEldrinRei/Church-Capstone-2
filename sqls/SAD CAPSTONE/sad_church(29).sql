-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_church
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
-- Table structure for table `tbl_appointment`
--

DROP TABLE IF EXISTS `tbl_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_appointment` (
  `char_appointstatus` char(20) NOT NULL,
  `int_userID` int(10) NOT NULL,
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_appointment_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_appointment`
--

LOCK TABLES `tbl_appointment` WRITE;
/*!40000 ALTER TABLE `tbl_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_appointment` ENABLE KEYS */;
UNLOCK TABLES;

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
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  CONSTRAINT `tbl_baptism_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_baptism`
--

LOCK TABLES `tbl_baptism` WRITE;
/*!40000 ALTER TABLE `tbl_baptism` DISABLE KEYS */;
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
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_blessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_blessing`
--

LOCK TABLES `tbl_blessing` WRITE;
/*!40000 ALTER TABLE `tbl_blessing` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_blessing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_defaulttime`
--

DROP TABLE IF EXISTS `tbl_defaulttime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_defaulttime` (
  `int_defaulttimeID` int(11) NOT NULL AUTO_INCREMENT,
  `time_defaulttime` time NOT NULL,
  `int_eventID` int(11) NOT NULL,
  PRIMARY KEY (`int_defaulttimeID`),
  KEY `tbl_ibfk_1_idx` (`int_eventID`),
  CONSTRAINT `tbl_ibfk` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_defaulttime`
--

LOCK TABLES `tbl_defaulttime` WRITE;
/*!40000 ALTER TABLE `tbl_defaulttime` DISABLE KEYS */;
INSERT INTO `tbl_defaulttime` VALUES (1,'11:00:00',3),(2,'11:00:00',2);
/*!40000 ALTER TABLE `tbl_defaulttime` ENABLE KEYS */;
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
  PRIMARY KEY (`int_requestID`),
  KEY `int_documentID` (`int_documentID`),
  KEY `int_userID` (`int_userID`),
  KEY `tbl_documentrequest_ibfk_4_idx` (`int_paymentID`),
  CONSTRAINT `payment` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_documentrequest`
--

LOCK TABLES `tbl_documentrequest` WRITE;
/*!40000 ALTER TABLE `tbl_documentrequest` DISABLE KEYS */;
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
  CONSTRAINT `tbl_id_docu` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tbl_id_event` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `tbl_docureqtype`
--

DROP TABLE IF EXISTS `tbl_docureqtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_docureqtype` (
  `int_docureqtypeID` int(11) NOT NULL AUTO_INCREMENT,
  `var_reqname` varchar(45) NOT NULL,
  `var_reqdesc` varchar(100) NOT NULL,
  PRIMARY KEY (`int_docureqtypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_docureqtype`
--

LOCK TABLES `tbl_docureqtype` WRITE;
/*!40000 ALTER TABLE `tbl_docureqtype` DISABLE KEYS */;
INSERT INTO `tbl_docureqtype` VALUES (1,'Valid ID','Identity of the applicant');
/*!40000 ALTER TABLE `tbl_docureqtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_eventapplication`
--

DROP TABLE IF EXISTS `tbl_eventapplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_eventapplication` (
  `int_eventapplicationID` int(10) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(10) NOT NULL,
  `char_approvalstatus` char(20) NOT NULL,
  `var_remarks` varchar(20) DEFAULT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_eventapplicationID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  KEY `tbl_eventapplication_ibfk_1_idx` (`int_paymentID`),
  CONSTRAINT `tbl_eventapplication_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_eventapplication`
--

LOCK TABLES `tbl_eventapplication` WRITE;
/*!40000 ALTER TABLE `tbl_eventapplication` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_eventapplication` ENABLE KEYS */;
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
  `date_approveddate` date DEFAULT NULL,
  `time_approvedstart` time DEFAULT NULL,
  `time_approvedend` time DEFAULT NULL,
  PRIMARY KEY (`int_eventinfoID`),
  KEY `int_userID` (`int_userID`),
  KEY `tbl_eventinfo_ibfk_2_idx` (`int_eventID`),
  CONSTRAINT `tbl_eventinfo_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_eventinfo_ibfk_2` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_eventinfo`
--

LOCK TABLES `tbl_eventinfo` WRITE;
/*!40000 ALTER TABLE `tbl_eventinfo` DISABLE KEYS */;
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
  PRIMARY KEY (`int_facilityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facility`
--

LOCK TABLES `tbl_facility` WRITE;
/*!40000 ALTER TABLE `tbl_facility` DISABLE KEYS */;
INSERT INTO `tbl_facility` VALUES (1,'Bro. Roqueto 2nd floor','wut',100),(2,'Bro. Roqueto 3rd floor','shittt this\n',100);
/*!40000 ALTER TABLE `tbl_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_facilityreqtype`
--

DROP TABLE IF EXISTS `tbl_facilityreqtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_facilityreqtype` (
  `int_facilityreqtypeID` int(11) NOT NULL AUTO_INCREMENT,
  `var_reqname` varchar(45) NOT NULL,
  `var_reqdesc` text NOT NULL,
  PRIMARY KEY (`int_facilityreqtypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facilityreqtype`
--

LOCK TABLES `tbl_facilityreqtype` WRITE;
/*!40000 ALTER TABLE `tbl_facilityreqtype` DISABLE KEYS */;
INSERT INTO `tbl_facilityreqtype` VALUES (1,'Valid ID','Proof of Identity of the customer who rent the facility');
/*!40000 ALTER TABLE `tbl_facilityreqtype` ENABLE KEYS */;
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
  `date_reservedate` date NOT NULL,
  `time_reservestart` time NOT NULL,
  `time_reserveend` time NOT NULL,
  `char_reservestatus` char(50) NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  `var_requirementID` varchar(50) DEFAULT NULL,
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
  CONSTRAINT `int_sectionID` FOREIGN KEY (`int_sectionID`) REFERENCES `tbl_section` (`int_sectionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `int_eventinfoID` int(11) NOT NULL,
  `var_owner` varchar(100) NOT NULL,
  `var_estloc` varchar(100) NOT NULL,
  `var_ownercontactnum` varchar(13) NOT NULL,
  `var_owneremailadd` varchar(50) NOT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_houseblessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
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
  CONSTRAINT `int_itemID` FOREIGN KEY (`int_itemID`) REFERENCES `tbl_items` (`int_itemID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `int_qualityID` FOREIGN KEY (`int_qualityID`) REFERENCES `tbl_quality` (`int_qualityID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `var_itemdesc` varchar(45) NOT NULL,
  `var_itemname` varchar(45) NOT NULL,
  `int_goodquantity` int(11) NOT NULL,
  `int_damagedquantity` int(11) NOT NULL,
  PRIMARY KEY (`int_itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_items`
--

LOCK TABLES `tbl_items` WRITE;
/*!40000 ALTER TABLE `tbl_items` DISABLE KEYS */;
INSERT INTO `tbl_items` VALUES (1,'For audience\'s sit','Chair',37,23),(2,'kurtina','curtains',0,11);
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
  CONSTRAINT `tbl_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tbl_ibfk_w` FOREIGN KEY (`int_ministryID`) REFERENCES `tbl_ministry` (`int_ministryID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `text_message` text NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ministry`
--

LOCK TABLES `tbl_ministry` WRITE;
/*!40000 ALTER TABLE `tbl_ministry` DISABLE KEYS */;
INSERT INTO `tbl_ministry` VALUES (1,'Music Ministry','Music ministry'),(2,'Liturgical Ministry','liturgy'),(3,'asd','ajsidjasid'),(4,'Lekaskjdf','walaaa'),(5,'I\'ve got a girl crush','I hate to admit it but');
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
  `var_notifdesc` varchar(55) NOT NULL,
  PRIMARY KEY (`int_notifID`),
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notification`
--

LOCK TABLES `tbl_notification` WRITE;
/*!40000 ALTER TABLE `tbl_notification` DISABLE KEYS */;
INSERT INTO `tbl_notification` VALUES (10,11,'Your Document Request is to ready to release'),(11,11,'Your Document Request is to ready to release'),(12,11,'Your Document Request is to ready to release');
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
  `char_paymentstatus` char(10) NOT NULL,
  PRIMARY KEY (`int_paymentID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment`
--

LOCK TABLES `tbl_payment` WRITE;
/*!40000 ALTER TABLE `tbl_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_payment` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_relation`
--

LOCK TABLES `tbl_relation` WRITE;
/*!40000 ALTER TABLE `tbl_relation` DISABLE KEYS */;
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
  `var_reqpath` varchar(300) DEFAULT NULL,
  `var_reqloc` varchar(100) DEFAULT NULL,
  `date_reqreceived` date NOT NULL,
  `int_reqtypeID` int(11) NOT NULL,
  `var_reqstatus` varchar(45) NOT NULL,
  PRIMARY KEY (`int_requirementID`),
  KEY `int_reqtypeID` (`int_reqtypeID`),
  CONSTRAINT `tbl_requirements_ibfk_2` FOREIGN KEY (`int_reqtypeID`) REFERENCES `tbl_requirementtype` (`int_reqtypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirements`
--

LOCK TABLES `tbl_requirements` WRITE;
/*!40000 ALTER TABLE `tbl_requirements` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementsdocument`
--

DROP TABLE IF EXISTS `tbl_requirementsdocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_requirementsdocument` (
  `int_requirementdocumentID` int(11) NOT NULL AUTO_INCREMENT,
  `var_reqpath` varchar(45) NOT NULL,
  `date_reqreceived` date NOT NULL,
  `bool_reqstatus` char(10) NOT NULL,
  `int_requestID` int(11) NOT NULL,
  `int_docureqtypeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_requirementdocumentID`),
  KEY `tbl_fk_2_idx` (`int_requestID`),
  KEY `tbl_fk_3_idx` (`int_docureqtypeID`),
  CONSTRAINT `tbl_fk_2` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tbl_fk_3` FOREIGN KEY (`int_docureqtypeID`) REFERENCES `tbl_docureqtype` (`int_docureqtypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsdocument`
--

LOCK TABLES `tbl_requirementsdocument` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsdocument` DISABLE KEYS */;
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
  `var_reqpath` varchar(80) NOT NULL,
  `date_reqreceived` date NOT NULL,
  `bool_reqstatus` tinyint(4) NOT NULL,
  `int_reservationID` int(11) NOT NULL,
  `int_facilityreqtype` int(11) NOT NULL,
  PRIMARY KEY (`int_requirementsfacilityID`),
  KEY `int_reservationID_idx` (`int_reservationID`),
  KEY `int_facilityreqtypeID_idx` (`int_facilityreqtype`),
  CONSTRAINT `int_facilityreqtypeID` FOREIGN KEY (`int_facilityreqtype`) REFERENCES `tbl_facilityreqtype` (`int_facilityreqtypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `int_reservationID` FOREIGN KEY (`int_reservationID`) REFERENCES `tbl_facilityreservation` (`int_reservationID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  CONSTRAINT `tbl_event` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementsinevents`
--

LOCK TABLES `tbl_requirementsinevents` WRITE;
/*!40000 ALTER TABLE `tbl_requirementsinevents` DISABLE KEYS */;
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
INSERT INTO `tbl_requirementtype` VALUES (1,3,'Birth Certificate','Birth Certificate','Copy or Original','Civil '),(2,9,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(3,2,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(4,2,' Baptismal Certificate','Baptismal Certificate','Copy or Original','Church'),(5,10,'Valid ID  ','Valid ID of the owner','Copy','Civil'),(6,6,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(7,7,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(8,7,'Death Certificate','Death Certificate','Copy','Civil'),(9,11,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(10,11,'Baptismal Certificate','Baptismal Certificate','Copy or Original','Church'),(13,5,'Birth Certificate of the Groom','Birth Certificate of the Groom','Original','Default'),(14,5,'Birth Certificate of the Bride','Birth Certificate of the Bride','Original','Default'),(15,5,'Baptismal Certificate of the Groom','Baptismal Certificate of the groom with FOR MARRIAGE PUSPOSES ONLY annoitation','Original','Default'),(16,5,'Confirmation Certificate of the Groom','Confirmation Certificate of the groom with FOR MARRIAGE PURPOSES ONLY annoitatio','Original','Default'),(17,5,'Baptismal Certificate of the Bride','Baptismal Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ','Original','Default'),(18,5,'Confirmation Certificate of the Bride','Confirmation Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ','Original','Default'),(23,5,'Marriage License','License','Original','Default'),(24,5,'Marriage Contract','contract','Original','Civil'),(25,5,'NSO CENOMAR','NSO Certification of No Marriage','Original','Default'),(26,5,'Clearance from Chancery Office','Clearance (form 3)','Original','Chancery'),(27,5,'Certification of Freedom to Marry from Embassy','Certification for foreigner','Original','Civil'),(28,5,'Certification of Freedom to Marry from Chancery','certification, for different cases','Copy or Original','Chancery'),(29,5,'Permission for Mixed Marriage from Chancery','Permission for non-catholic','Original','Chancery'),(30,5,'Affidavit or Co-habitation','for couple living in for more than 5 months','Original','Civil'),(31,5,'Affidavit by the applicant with 2 witnesses','for no religion','Original','Civil'),(32,5,'Dispensation from Chancery','Dispensation from Chancery for different cases','Original','Chancery'),(33,5,'Decree of Divorced','for divorced','Original','Civil'),(34,5,'Civil Annulment Decision with Certification of Finality','for divorced','Original','Civil'),(35,5,'Declaration of Nullity by Catholic Matrimonial Tribunal','for divorced','Original','Civil'),(36,5,'Copy of marriage cert','for divorced','Copy or Original','Civil'),(37,5,'New copy of Marriage Contract','for renewal','Original','Civil'),(38,5,'Copy of Death Certificate','for widow/widower','Original','Civil'),(39,5,'Copy of Marriage Contract','for widow/widower','Copy or Original','Civil'),(40,5,'Military Clearance from Immediate Commanding Office','for military ','Original','Civil'),(44,1,'Birth Certificate','Birth Certificate','Copy or Original','Civil'),(45,5,'Valid ID of the Bride','Valid id','Copy','Default'),(46,5,'Valid ID of the Groom','Valid ID','Copy','Default'),(47,4,'Birth Certificate','Birthcertificate','Copy','Original');
/*!40000 ALTER TABLE `tbl_requirementtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_schedule`
--

DROP TABLE IF EXISTS `tbl_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_schedule` (
  `int_scheduleID` int(10) NOT NULL AUTO_INCREMENT,
  `int_userID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `text_schedulenote` text NOT NULL,
  `var_venue` varchar(100) NOT NULL,
  `time_schedstart` time NOT NULL,
  `time_schedend` time NOT NULL,
  `date_schedule` date NOT NULL,
  PRIMARY KEY (`int_scheduleID`),
  KEY `int_userID` (`int_userID`),
  KEY `int_eventID` (`int_eventinfoID`),
  CONSTRAINT `tbl_schedule_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  CONSTRAINT `tbl_schedule_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_schedule`
--

LOCK TABLES `tbl_schedule` WRITE;
/*!40000 ALTER TABLE `tbl_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_schedule` ENABLE KEYS */;
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
  CONSTRAINT `int_schoolID` FOREIGN KEY (`int_schoolID`) REFERENCES `tbl_school` (`int_schoolID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `int_userID` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `char_status` varchar(45) NOT NULL,
  PRIMARY KEY (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_services`
--

LOCK TABLES `tbl_services` WRITE;
/*!40000 ALTER TABLE `tbl_services` DISABLE KEYS */;
INSERT INTO `tbl_services` VALUES (1,'Anointing of the sick','The anointing of the sick is administered to bring spiritual and even physical strength during an illness, especially near the time of death. It is most likely one of the last sacraments one will receive. A sacrament is an outward sign established by Jesus Christ to confer inward grace. In more basic terms, it is a rite that is performed to convey God’s grace to the recipient, through the power of the Holy Spirit.','Sacrament','Enabled'),(2,'Confirmation','The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confir- mation is the sacrament of maturity and coming of age. The real confession of Christ consist in this \'that the whole man submits himself to Truth, in the judgment of his understanding, in the submission of his will and in the consecration of his whole power of love . . . To do this, poor-spirited man is only able when he has been confirmed by God\'s grace\'\r\n\r\nThis confirmation in the power of the Holy Spirit leading to a firm profession of faith has always been the particular effect which Catholic tradition has ascribed to the sacrament. It is effect which complements and completes that of baptism.\r\n','Sacrament','Enabled'),(3,'Baptism','The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead. We come into the world with only the natural endowments of human nature. The supernatural life which is the result of God’s personal and intimate indwelling, is absent from the soul.\r\n','Sacrament','Enabled'),(4,'Funeral Service','The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n','Special Service','Enabled'),(5,'Marriage','When the Catholic Church teaches that marriage between two baptized persons is a sacrament, it is saying that the couple’s relationship expresses in a unique way the unbreakable bond of love between Christ and his people. Like the other six sacraments of the Church, marriage is a sign or symbol which reveals the Lord Jesus and through which his divine life and love are communicated. All seven sacraments were instituted by Christ and were entrusted to the Church to be celebrated in faith within and for the community of believers. The rituals and prayers by which a sacrament is celebrated serve to express visibly what God is doing invisibly.\r\n','Sacrament','Enabled'),(6,'First Communion','first communion','Sacrament','Enabled'),(7,'Funeral Mass','The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n','Sacrament','Enabled'),(9,'Special Baptism','It includes adult baptism and special baptism.\r\ntuesday-sat','Special Service','Enabled'),(10,'Establishment Blessing','House blessing belongs to the special services that our parish offers. ','Special Service','Enabled'),(11,'Special Confirmation','espesyal na konpirmasyon','Special Service','Enabled'),(14,'Document Request','Request Documents for Requirements','Null','Enabled');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_serviceutilities`
--

LOCK TABLES `tbl_serviceutilities` WRITE;
/*!40000 ALTER TABLE `tbl_serviceutilities` DISABLE KEYS */;
INSERT INTO `tbl_serviceutilities` VALUES (1,'Document Request','Enabled','Request Document ');
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
  `time_eventstart` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `time_eventend` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `var_eventvenue` varchar(200) NOT NULL,
  `char_eventtype` char(25) NOT NULL,
  `var_approvalstatus` varchar(25) NOT NULL,
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
INSERT INTO `tbl_specialevent` VALUES (6,5,'Mass wedding','Kasalang bayan','2018-07-27 18:44:00','2018-07-27 18:44:00','bro roqueto','Open for everyone','Approved');
/*!40000 ALTER TABLE `tbl_specialevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_specialevents`
--

DROP TABLE IF EXISTS `tbl_specialevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_specialevents` (
  `int_specialeventID` int(11) NOT NULL AUTO_INCREMENT,
  `var_eventname` varchar(45) NOT NULL,
  `text_eventdesc` text NOT NULL,
  `time_eventstart` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time_eventend` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `int_facilityID` int(11) NOT NULL,
  `char_eventtype` char(10) NOT NULL,
  `char_approvalstatus` char(10) NOT NULL,
  PRIMARY KEY (`int_specialeventID`),
  KEY `int_facilityID_idx` (`int_facilityID`),
  CONSTRAINT `int_facilityID` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_specialevents`
--

LOCK TABLES `tbl_specialevents` WRITE;
/*!40000 ALTER TABLE `tbl_specialevents` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_specialevents` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_sponsors`
--

LOCK TABLES `tbl_sponsors` WRITE;
/*!40000 ALTER TABLE `tbl_sponsors` DISABLE KEYS */;
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
  PRIMARY KEY (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (5,'Admin','admin','admin','Female','Anywhere','09123456789','admin','admin@gmail.com','admin','Admin'),(6,'Secretariat','Secretariat','Secretariat','Female','Anywhere','09999999999','secretariat','secretariat@gmail.com','secretariat','Secretariat'),(7,'Coordinator','Coordinator','Coordinator','Male','Anywhere','09999999999','coordinator','coordinator@gmail.com','coordinator','Coordinator'),(8,'Catechist','Catechist','Catechist','Female','Anywhere','0999999999','catechist','catechist','catechist','Catechist'),(10,'Priest','Priest','Priest','Male','Anyhwere','09123456789','priest','priest@gmail.com','priest','Priest'),(11,'Ebrada','Jonalyn Fe','Desalisa','Female','Payatas B Quezon City','09277475753','jonalynfe11','jonalynfeebrada11@gmail.com','123jona','Guest'),(12,'Macaya','Joshua Rae','','Male','Caloocan CIty','09277475711','joshuarae','joshuarae@gmail.com','123rae','Guest'),(13,'Del Rosario','Eldrin Rei','Pablo','Male','Valenzuela City','09277475742','eldrinrei','asdfwe','123eldrin','Guest'),(14,'Peñaverde','Norme Ann Joyce','Tonzon','Female','Infanta Quezon','09277475733','normeann','normeann','123norme','Guest'),(15,'Flores','Rachel Maiden','Cabuso','Female','Tondo, Manila','09999999999','rachel','rachel@gmail.com','123rachel','Guest');
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
  `int_eventID` int(11) NOT NULL,
  `int_reservationmindays` int(11) NOT NULL,
  `int_reservationmaxdays` int(11) NOT NULL,
  `int_downpaymentdays` int(11) DEFAULT NULL,
  `int_fullpaymentdays` int(11) DEFAULT NULL,
  `int_requirementsdays` int(11) NOT NULL,
  `bool_refundable` tinyint(1) DEFAULT NULL,
  `int_refundpercentdays` int(11) DEFAULT NULL,
  `double_refundpercent` double DEFAULT NULL,
  `int_agemin` int(11) DEFAULT NULL,
  `int_agemax` int(11) DEFAULT NULL,
  `double_fee` double DEFAULT NULL,
  `time_duration` time NOT NULL,
  `double_addrate` double NOT NULL,
  PRIMARY KEY (`int_utilitiesID`),
  KEY `tbl_ibfk1_idx` (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_utilities`
--

LOCK TABLES `tbl_utilities` WRITE;
/*!40000 ALTER TABLE `tbl_utilities` DISABLE KEYS */;
INSERT INTO `tbl_utilities` VALUES (1,3,14,90,10,NULL,7,0,NULL,NULL,0,11,300,'01:00:00',50),(2,9,14,90,10,NULL,7,0,NULL,NULL,0,NULL,1000,'01:00:00',50),(3,2,14,90,10,NULL,7,0,NULL,NULL,11,NULL,300,'01:00:00',50),(4,11,14,90,10,NULL,7,0,NULL,NULL,11,NULL,1000,'01:00:00',50),(5,4,3,7,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(6,7,3,7,2,NULL,0,0,NULL,NULL,NULL,NULL,300,'01:00:00',0),(7,10,7,30,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(8,10,7,30,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(9,5,120,365,15,60,60,1,30,50,18,NULL,7000,'01:30:00',50),(10,14,0,0,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,100,'00:00:00',0),(11,13,7,90,NULL,3,0,1,75,50,NULL,NULL,1200,'00:00:00',300);
/*!40000 ALTER TABLE `tbl_utilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_utilities_availabletime`
--

DROP TABLE IF EXISTS `tbl_utilities_availabletime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_utilities_availabletime` (
  `int_utilitiesavailabletimeID` int(11) NOT NULL AUTO_INCREMENT,
  `time_availabletime` time NOT NULL,
  `int_serviceID` int(11) NOT NULL,
  PRIMARY KEY (`int_utilitiesavailabletimeID`),
  KEY `tbl_ibfk_service_idx` (`int_serviceID`),
  CONSTRAINT `tbl_ibfk_service` FOREIGN KEY (`int_serviceID`) REFERENCES `tbl_services` (`int_eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_utilities_availabletime`
--

LOCK TABLES `tbl_utilities_availabletime` WRITE;
/*!40000 ALTER TABLE `tbl_utilities_availabletime` DISABLE KEYS */;
INSERT INTO `tbl_utilities_availabletime` VALUES (1,'10:00:00',3),(2,'11:00:00',3),(3,'13:00:00',3),(4,'14:00:00',3);
/*!40000 ALTER TABLE `tbl_utilities_availabletime` ENABLE KEYS */;
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
  CONSTRAINT `int_notifID` FOREIGN KEY (`int_notifID`) REFERENCES `tbl_notification` (`int_notifID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `int_requestID` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `var_bcurrparish` varchar(100) NOT NULL,
  `bool_bbaptized` tinyint(1) NOT NULL,
  `date_bbapdate` date DEFAULT NULL,
  `var_bbapplace` varchar(100) DEFAULT NULL,
  `bool_bconfirmed` tinyint(1) NOT NULL,
  `date_bcondate` date DEFAULT NULL,
  `var_bconplace` varchar(100) DEFAULT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  CONSTRAINT `tbl_wedbride_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedbride`
--

LOCK TABLES `tbl_wedbride` WRITE;
/*!40000 ALTER TABLE `tbl_wedbride` DISABLE KEYS */;
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
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  CONSTRAINT `tbl_wedcouple_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedcouple`
--

LOCK TABLES `tbl_wedcouple` WRITE;
/*!40000 ALTER TABLE `tbl_wedcouple` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_wedcouple` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_weddingcases`
--

DROP TABLE IF EXISTS `tbl_weddingcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_weddingcases` (
  `int_weddingcaseID` int(11) NOT NULL AUTO_INCREMENT,
  `var_casename` varchar(45) NOT NULL,
  `var_casedesc` varchar(100) NOT NULL,
  `var_caseprocess` varchar(100) NOT NULL,
  PRIMARY KEY (`int_weddingcaseID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_weddingcases`
--

LOCK TABLES `tbl_weddingcases` WRITE;
/*!40000 ALTER TABLE `tbl_weddingcases` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_weddingcases` ENABLE KEYS */;
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
  `var_gcurrparish` varchar(100) NOT NULL,
  `bool_gbaptized` tinyint(1) NOT NULL,
  `date_gbapdate` date DEFAULT NULL,
  `var_gbapplace` varchar(100) DEFAULT NULL,
  `bool_gconfirmed` tinyint(1) NOT NULL,
  `date_gcondate` date DEFAULT NULL,
  `var_gconplace` varchar(100) DEFAULT NULL,
  UNIQUE KEY `int_eventinfoID_2` (`int_eventinfoID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_wedgroom_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedgroom`
--

LOCK TABLES `tbl_wedgroom` WRITE;
/*!40000 ALTER TABLE `tbl_wedgroom` DISABLE KEYS */;
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

-- Dump completed on 2018-09-05 23:47:36
