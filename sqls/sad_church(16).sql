-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sad_church
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_appointment` (
  `char_appointstatus` char(20) NOT NULL,
  `int_userID` int(10) NOT NULL,
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_appointment_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_baptism` (
  `int_eventinfoID` int(10) NOT NULL,
  `var_parentmarriageadd` varchar(100) NOT NULL,
  `var_fatherbplace` varchar(100) NOT NULL,
  `var_motherbplace` varchar(100) NOT NULL,
  `var_fathername` varchar(100) NOT NULL,
  `var_mothername` varchar(100) NOT NULL,
  `var_contactnum` varchar(13) NOT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time DEFAULT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  CONSTRAINT `tbl_baptism_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_baptism`
--

LOCK TABLES `tbl_baptism` WRITE;
/*!40000 ALTER TABLE `tbl_baptism` DISABLE KEYS */;
INSERT INTO `tbl_baptism` VALUES (50,'QC','Sorsogon','Sorsogon','Fidel','Josephine','09999999999','2018-09-09','01:00:00'),(53,'Valenzuela','Valenzuela','Valenzuela','Barek','Barek','0999999999','2018-08-05','11:00:00');
/*!40000 ALTER TABLE `tbl_baptism` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_blessing`
--

DROP TABLE IF EXISTS `tbl_blessing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_blessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_blessingvenue` varchar(100) NOT NULL,
  `var_blessingdetails` varchar(100) NOT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_blessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
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
-- Table structure for table `tbl_document`
--

DROP TABLE IF EXISTS `tbl_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_document` (
  `int_documentID` int(11) NOT NULL AUTO_INCREMENT,
  `var_documenttype` varchar(50) NOT NULL,
  `var_doctemplatepath` varchar(45) NOT NULL,
  `dbl_docuprice` double NOT NULL,
  PRIMARY KEY (`int_documentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_document`
--

LOCK TABLES `tbl_document` WRITE;
/*!40000 ALTER TABLE `tbl_document` DISABLE KEYS */;
INSERT INTO `tbl_document` VALUES (1,'Baptismal Certificate','/img/document/facility-permit.png',50),(2,'Confirmation Certificate','/img/document/facility-permit.png',50),(3,'First Communion Certificate','/img/document/facility-permit.png',50),(4,'Facility Permit','/img/document/facility-permit.png',50),(5,'Voucher','/img/document/facility-permit.png',0);
/*!40000 ALTER TABLE `tbl_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_documentrequest`
--

DROP TABLE IF EXISTS `tbl_documentrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_documentrequest` (
  `int_requestID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `int_documentID` int(11) NOT NULL,
  `int_eventinfoID` int(11) DEFAULT NULL,
  `var_doclastname` varchar(50) NOT NULL,
  `var_docfirstname` varchar(50) NOT NULL,
  `text_purpose` text NOT NULL,
  `date_docurequested` date NOT NULL,
  `date_docureleased` date DEFAULT NULL,
  `date_docureceived` int(11) DEFAULT NULL,
  `char_docustatus` char(20) NOT NULL,
  `date_doceventdate` date NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_requestID`),
  KEY `int_documentID` (`int_documentID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentid`),
  CONSTRAINT `tbl_documentrequest_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`),
  CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_documentrequest`
--

LOCK TABLES `tbl_documentrequest` WRITE;
/*!40000 ALTER TABLE `tbl_documentrequest` DISABLE KEYS */;
INSERT INTO `tbl_documentrequest` VALUES (9,11,1,NULL,'Ebrada','Jodel Ann','Marriage','2018-08-03',NULL,NULL,'Requested','2018-01-01',1),(10,11,1,NULL,'Eldrin','Eldrin','Marriage','2018-08-04',NULL,NULL,'Requested','1998-07-31',3),(11,11,1,NULL,'Eldrin','Eldrin','Marriage','2018-08-04',NULL,NULL,'Requested','1998-07-31',4),(12,11,1,NULL,'Eldrin','Eldrin','Marriage','2018-08-04',NULL,NULL,'Requested','2018-07-31',5),(13,11,1,NULL,'Eldrin','Eldrin','ye','2018-08-04',NULL,NULL,'Requested','1998-07-31',6),(14,11,1,NULL,'Eldrin','Eldrin','Marriage','2018-08-04',NULL,NULL,'Requested','2018-02-02',7),(15,11,1,NULL,'Ebrada','Jodel Ann','Confirmation','2018-08-04',NULL,NULL,'Requested','2018-01-01',8),(16,11,1,NULL,'asd','ads','asd','2018-08-04',NULL,NULL,'Requested','2018-01-01',9),(17,11,1,NULL,'Ebrada','Jodel Ann','Marriage','2018-08-04',NULL,NULL,'Requested','2018-01-01',10),(18,11,1,NULL,'Ebrada','Jodel Ann','swswsw','2018-08-04',NULL,NULL,'Requested','2018-01-01',11),(19,11,1,NULL,'Ebrada','Jodel Ann','swswswsw','2018-08-04',NULL,NULL,'Requested','2018-01-01',12),(20,11,1,NULL,'Ebrada','Jodel Ann','swswsws','2018-08-04',NULL,NULL,'Requested','2018-01-01',13),(21,11,1,NULL,'Ebrada','Jodel Ann','swswsws','2018-08-04',NULL,NULL,'Requested','2018-01-01',14),(22,11,1,NULL,'Ebrada','Jodel Ann','asdasd','2018-08-04',NULL,NULL,'Requested','2018-01-01',15),(23,11,1,NULL,'Ebrada','Jodel Ann','swswswsw','2018-08-04',NULL,NULL,'Requested','2018-01-01',16);
/*!40000 ALTER TABLE `tbl_documentrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_documentsevents`
--

DROP TABLE IF EXISTS `tbl_documentsevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_documentsevents` (
  `int_docu_eventID` int(11) NOT NULL AUTO_INCREMENT,
  `int_eventID` int(11) NOT NULL,
  `int_documentID` int(11) NOT NULL,
  PRIMARY KEY (`int_docu_eventID`),
  KEY `tbl_id_event_idx` (`int_eventID`),
  KEY `tbl_id_docu_idx` (`int_documentID`),
  CONSTRAINT `tbl_id_docu` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentid`),
  CONSTRAINT `tbl_id_event` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`)
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
-- Table structure for table `tbl_event`
--

DROP TABLE IF EXISTS `tbl_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_event` (
  `int_eventID` int(10) NOT NULL AUTO_INCREMENT,
  `var_eventname` varchar(50) NOT NULL,
  `var_eventdesc` text NOT NULL,
  `char_type` varchar(20) NOT NULL,
  PRIMARY KEY (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_event`
--

LOCK TABLES `tbl_event` WRITE;
/*!40000 ALTER TABLE `tbl_event` DISABLE KEYS */;
INSERT INTO `tbl_event` VALUES (1,'Anointing of the sick','The anointing of the sick is administered to bring spiritual and even physical strength during an illness, especially near the time of death. It is most likely one of the last sacraments one will receive. A sacrament is an outward sign established by Jesus Christ to confer inward grace. In more basic terms, it is a rite that is performed to convey God’s grace to the recipient, through the power of the Holy Spirit.','Sacrament'),(2,'Confirmation','The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confir- mation is the sacrament of maturity and coming of age. The real confession of Christ consist in this \'that the whole man submits himself to Truth, in the judgment of his understanding, in the submission of his will and in the consecration of his whole power of love . . . To do this, poor-spirited man is only able when he has been confirmed by God\'s grace\'','Sacrament'),(3,'Baptism','The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead. We come into the world with only the natural endowments of human nature. The supernatural life which is the result of God’s personal and intimate indwelling, is absent from the soul.','Sacrament'),(4,'Funeral Service','The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.','Sacrament'),(5,'Marriage','When the Catholic Church teaches that marriage between two baptized persons is a sacrament, it is saying that the couple’s relationship expresses in a unique way the unbreakable bond of love between Christ and his people. Like the other six sacraments of the Church, marriage is a sign or symbol which reveals the Lord Jesus and through which his divine life and love are communicated. All seven sacraments were instituted by Christ and were entrusted to the Church to be celebrated in faith within and for the community of believers. The rituals and prayers by which a sacrament is celebrated serve to express visibly what God is doing invisibly.','Sacrament'),(6,'Eucharist','first communion','Sacrament'),(7,'Funeral Mass','wala malagay si jonaaa','Sacrament'),(8,'RCIA','Rite of Christian Initiation for Adults','Special Service'),(9,'Special Baptism','It includes adult baptism and special baptism.','Special Service'),(10,'Establishment Blessing','House blessing belongs to the special services that our parish offers. ','Special Service'),(11,'SHIT','SHIT','Sacrament');
/*!40000 ALTER TABLE `tbl_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_eventapplication`
--

DROP TABLE IF EXISTS `tbl_eventapplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_eventapplication` (
  `int_eventapplicationID` int(10) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(10) NOT NULL,
  `char_approvalstatus` char(20) NOT NULL,
  `char_feestatus` char(15) NOT NULL,
  `char_reqstatus` char(15) NOT NULL,
  `var_remarks` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`int_eventapplicationID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_eventapplication_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_eventapplication`
--

LOCK TABLES `tbl_eventapplication` WRITE;
/*!40000 ALTER TABLE `tbl_eventapplication` DISABLE KEYS */;
INSERT INTO `tbl_eventapplication` VALUES (50,50,'Pending','Unpaid','Incomplete',NULL),(51,51,'Pending','Unpaid','Incomplete',NULL),(52,52,'Pending','Unpaid','Incomplete',NULL),(53,53,'Pending','Unpaid','Incomplete',NULL);
/*!40000 ALTER TABLE `tbl_eventapplication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_eventinfo`
--

DROP TABLE IF EXISTS `tbl_eventinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_eventinfo` (
  `int_eventinfoID` int(10) NOT NULL AUTO_INCREMENT,
  `int_userID` int(10) NOT NULL,
  `int_eventID` int(10) NOT NULL,
  `date_approveddate` date DEFAULT NULL,
  `time_approvedstart` time DEFAULT NULL,
  `time_approvedend` time DEFAULT NULL,
  PRIMARY KEY (`int_eventinfoID`),
  KEY `int_userID` (`int_userID`),
  KEY `int_eventID` (`int_eventID`),
  CONSTRAINT `tbl_eventinfo_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  CONSTRAINT `tbl_eventinfo_ibfk_2` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_eventinfo`
--

LOCK TABLES `tbl_eventinfo` WRITE;
/*!40000 ALTER TABLE `tbl_eventinfo` DISABLE KEYS */;
INSERT INTO `tbl_eventinfo` VALUES (50,11,3,'2018-01-01',NULL,NULL),(51,11,3,NULL,NULL,NULL),(52,11,9,NULL,NULL,NULL),(53,11,3,'2018-07-31',NULL,NULL);
/*!40000 ALTER TABLE `tbl_eventinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_facility`
--

DROP TABLE IF EXISTS `tbl_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_facility` (
  `int_facilityID` int(11) NOT NULL AUTO_INCREMENT,
  `var_facilityname` varchar(50) NOT NULL,
  `var_facilitydesc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`int_facilityID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_facility`
--

LOCK TABLES `tbl_facility` WRITE;
/*!40000 ALTER TABLE `tbl_facility` DISABLE KEYS */;
INSERT INTO `tbl_facility` VALUES (1,'Bro. Roqueto 2nd floor','wut'),(2,'Bro. Roqueto 3rd floor','shittt this\n');
/*!40000 ALTER TABLE `tbl_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_facilityreservation`
--

DROP TABLE IF EXISTS `tbl_facilityreservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `tbl_facilityreservation_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  CONSTRAINT `tbl_facilityreservation_ibfk_2` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_grd3students` (
  `int_studentID` int(10) NOT NULL AUTO_INCREMENT,
  `int_relationID` int(10) NOT NULL,
  `var_school` varchar(100) NOT NULL,
  `var_batch` varchar(20) NOT NULL,
  `var_section` varchar(20) NOT NULL,
  PRIMARY KEY (`int_studentID`),
  KEY `int_relationID` (`int_relationID`),
  CONSTRAINT `tbl_grd3students_ibfk_1` FOREIGN KEY (`int_relationID`) REFERENCES `tbl_relation` (`int_relationid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_houseblessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_owner` varchar(100) NOT NULL,
  `var_estloc` varchar(100) NOT NULL,
  `var_ownercontactnum` varchar(13) NOT NULL,
  `var_owneremailadd` varchar(50) NOT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_houseblessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
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
-- Table structure for table `tbl_members`
--

DROP TABLE IF EXISTS `tbl_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_members` (
  `int_membersID` int(11) NOT NULL AUTO_INCREMENT,
  `int_userID` int(11) NOT NULL,
  `int_ministryID` int(11) NOT NULL,
  `var_position` varchar(45) NOT NULL,
  PRIMARY KEY (`int_membersID`),
  KEY `tbl_ibfk_1_idx` (`int_userID`),
  KEY `tbl_ibfk_w_idx` (`int_ministryID`),
  CONSTRAINT `tbl_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  CONSTRAINT `tbl_ibfk_w` FOREIGN KEY (`int_ministryID`) REFERENCES `tbl_ministry` (`int_ministryid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_message` (
  `int_messageID` int(10) NOT NULL AUTO_INCREMENT,
  `int_senderID` int(10) NOT NULL,
  `int_receiverID` int(10) NOT NULL,
  `text_message` text NOT NULL,
  PRIMARY KEY (`int_messageID`),
  KEY `int_senderID` (`int_senderID`),
  KEY `int_receiverID` (`int_receiverID`),
  CONSTRAINT `tbl_message_ibfk_1` FOREIGN KEY (`int_senderID`) REFERENCES `tbl_user` (`int_userid`),
  CONSTRAINT `tbl_message_ibfk_2` FOREIGN KEY (`int_receiverID`) REFERENCES `tbl_user` (`int_userid`)
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
 SET character_set_client = utf8mb4 ;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_notification` (
  `int_notifID` int(10) NOT NULL AUTO_INCREMENT,
  `int_userID` int(10) NOT NULL,
  `var_notifdesc` varchar(55) NOT NULL,
  PRIMARY KEY (`int_notifID`),
  KEY `int_userID` (`int_userID`),
  CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_payment` (
  `int_paymentID` int(10) NOT NULL AUTO_INCREMENT,
  `dbl_amount` double NOT NULL,
  `char_paymentstatus` char(10) NOT NULL,
  PRIMARY KEY (`int_paymentID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment`
--

LOCK TABLES `tbl_payment` WRITE;
/*!40000 ALTER TABLE `tbl_payment` DISABLE KEYS */;
INSERT INTO `tbl_payment` VALUES (1,300,'Unpaid'),(2,50,'Unpaid'),(3,50,'Unpaid'),(4,50,'Unpaid'),(5,50,'Unpaid'),(6,50,'Unpaid'),(7,50,'Unpaid'),(8,50,'Unpaid'),(9,50,'Unpaid'),(10,50,'Unpaid'),(11,50,'Unpaid'),(12,50,'Unpaid'),(13,50,'Unpaid'),(14,50,'Unpaid'),(15,50,'Unpaid'),(16,50,'Unpaid');
/*!40000 ALTER TABLE `tbl_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_relation`
--

DROP TABLE IF EXISTS `tbl_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `tbl_relation_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_relation`
--

LOCK TABLES `tbl_relation` WRITE;
/*!40000 ALTER TABLE `tbl_relation` DISABLE KEYS */;
INSERT INTO `tbl_relation` VALUES (50,50,'Parent','Ebrada','Jodel Ann','Desalisa','Female','Payatas B Quezon City','2001-03-11','QC'),(51,51,'Parent','Jona','Jona','Jona','Female','here','1998-11-11','there'),(52,52,'Parent','Norme','Norme','Norme','Female','Manila','2018-06-07','Sampaloc Manila'),(53,53,'Parent','Eldrin','Eldrin','Eldrin','Male','Valenzuela','2018-07-06','Valenzuela');
/*!40000 ALTER TABLE `tbl_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirements`
--

DROP TABLE IF EXISTS `tbl_requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_requirements` (
  `int_requirementID` int(10) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(10) DEFAULT NULL,
  `var_reqpath` varchar(300) DEFAULT NULL,
  `var_reqloc` varchar(100) DEFAULT NULL,
  `date_reqreceived` date NOT NULL,
  `int_reqtypeID` int(11) DEFAULT NULL,
  `int_reservationID` int(11) DEFAULT NULL,
  `int_requestID` int(11) DEFAULT NULL,
  `var_reqstatus` varchar(45) NOT NULL,
  PRIMARY KEY (`int_requirementID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  KEY `int_reqtypeID` (`int_reqtypeID`),
  KEY `int_reservationID` (`int_reservationID`),
  KEY `int_requestID` (`int_requestID`),
  CONSTRAINT `tbl_requirements_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`),
  CONSTRAINT `tbl_requirements_ibfk_2` FOREIGN KEY (`int_reqtypeID`) REFERENCES `tbl_requirementtype` (`int_reqtypeid`),
  CONSTRAINT `tbl_requirements_ibfk_3` FOREIGN KEY (`int_reservationID`) REFERENCES `tbl_facilityreservation` (`int_reservationid`),
  CONSTRAINT `tbl_requirements_ibfk_4` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestid`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirements`
--

LOCK TABLES `tbl_requirements` WRITE;
/*!40000 ALTER TABLE `tbl_requirements` DISABLE KEYS */;
INSERT INTO `tbl_requirements` VALUES (43,51,'/img/req/image-1532995342633.jpg',NULL,'2018-07-31',1,NULL,NULL,'For Approval'),(44,52,'/img/req/image-1532999926239.jpg',NULL,'2018-07-31',1,NULL,NULL,'Pending'),(45,53,'/img/req/image-1533000312209.jpg',NULL,'2018-07-31',1,NULL,NULL,'Pending'),(46,NULL,'/img/req/image-1533241831836.jpg',NULL,'2018-08-03',5,NULL,9,'Pending'),(47,NULL,'/img/req/image-1533331899737.jpg',NULL,'2018-08-04',5,NULL,11,'Pending'),(48,NULL,'/img/req/image-1533332030001.jpg',NULL,'2018-08-04',5,NULL,12,'Pending'),(49,NULL,'/img/req/image-1533332151142.jpg',NULL,'2018-08-04',5,NULL,13,'Pending'),(50,NULL,'/img/req/image-1533332418637.jpg',NULL,'2018-08-04',5,NULL,14,'Pending'),(51,NULL,'/img/req/image-1533333231785.jpg',NULL,'2018-08-04',5,NULL,15,'Pending'),(52,NULL,'/img/req/image-1533333254138.jpg',NULL,'2018-08-04',5,NULL,16,'Pending'),(53,NULL,'/img/req/image-1533333710778.jpg',NULL,'2018-08-04',5,NULL,17,'Pending'),(54,NULL,'/img/req/image-1533339110769.jpg',NULL,'2018-08-04',5,NULL,18,'Pending'),(55,NULL,'/img/req/image-1533339897206.jpg',NULL,'2018-08-04',5,NULL,19,'Pending'),(56,NULL,'/img/req/image-1533340188377.jpg',NULL,'2018-08-04',5,NULL,20,'Pending'),(57,NULL,'/img/req/image-1533344827120.jpg',NULL,'2018-08-04',5,NULL,21,'Pending'),(58,NULL,'/img/req/image-1533345683772.jpg',NULL,'2018-08-04',5,NULL,22,'Pending');
/*!40000 ALTER TABLE `tbl_requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_requirementtype`
--

DROP TABLE IF EXISTS `tbl_requirementtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_requirementtype` (
  `int_reqtypeID` int(11) NOT NULL AUTO_INCREMENT,
  `int_eventID` int(11) NOT NULL,
  `var_reqname` varchar(100) NOT NULL,
  `var_reqdesc` varchar(100) NOT NULL,
  `char_reqmode` char(25) NOT NULL,
  `char_reqtype` varchar(25) NOT NULL,
  `int_wedcaseID` int(11) DEFAULT NULL,
  PRIMARY KEY (`int_reqtypeID`),
  KEY `int_eventID` (`int_eventID`),
  KEY `tbl_id_idx` (`int_wedcaseID`),
  CONSTRAINT `tbl_id` FOREIGN KEY (`int_wedcaseID`) REFERENCES `tbl_weddingcases` (`int_weddingcaseid`),
  CONSTRAINT `tbl_requirementtype_ibfk_1` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_requirementtype`
--

LOCK TABLES `tbl_requirementtype` WRITE;
/*!40000 ALTER TABLE `tbl_requirementtype` DISABLE KEYS */;
INSERT INTO `tbl_requirementtype` VALUES (1,3,'Birth Certificate','Birth Certificate','Copy or Original','Civil ',NULL),(2,9,'Birth Certificate','Birth Certificate','Copy or Original','Civil',NULL),(3,2,'Birth Certificate','Birth Certificate','Copy or Original','Civil',NULL),(4,2,' Baptismal Certificate','Baptismal Certificate','Copy or Original','Church',NULL),(5,10,'Valid ID  ','Valid ID of the owner','Copy','Civil',NULL),(6,6,'Birth Certificate','Birth Certificate','Copy or Original','Civil',NULL),(7,7,'Birth Certificate','Birth Certificate','Copy or Original','Civil',NULL),(8,7,'Death Certificate','Death Certificate','Copy','Civil',NULL),(9,11,'Birth Certificate','Birth Certificate','Copy or Original','Civil',NULL),(10,11,'Baptismal Certificate','Baptismal Certificate','Copy or Original','Church',NULL),(11,14,'Valid ID','Valid ID of the person in the certificate','Copy','Civil',NULL),(12,13,'Valid ID','Valid ID of the person reserving the facility','Copy','Civil',NULL),(13,5,'Birth Certificate of the Groom','Birth Certificate of the Groom','Original','Civil',NULL),(14,5,'Birth Certificate of the Bride','Birth Certificate of the Bride','Original','Civil',NULL),(15,5,'Baptismal Certificate of the Groom','Baptismal Certificate of the groom with FOR MARRIAGE PUSPOSES ONLY annoitation','Original','Church',NULL),(16,5,'Confirmation Certificate of the Groom','Confirmation Certificate of the groom with FOR MARRIAGE PURPOSES ONLY annoitatio','Original','Church',NULL),(17,5,'Baptismal Certificate of the Bride','Baptismal Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ','Original','Church',NULL),(18,5,'Confirmation Certificate of the Bride','Confirmation Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ','Original','Church',NULL),(19,5,'Canonical Interview','Interview with the priest','Interview','Church',NULL),(20,5,'Pre-Cana Seminar','Pre-wedding seminar','Seminar','Church',NULL),(21,5,'Marriage Banns','Banns','Banns','Church',NULL),(22,5,'Permission from Bride\'s Parish','Permission/ Letter from the bride\'s parish','Letter','Church',NULL),(23,5,'Marriage License','License','Original','Church',NULL),(24,5,'Marriage Contract','contract','Original','Civil',NULL),(25,5,'NSO CENOMAR','NSO Certification of No Marriage','Original','Civil',NULL),(26,5,'Clearance from Chancery Office','Clearance (form 3)','Clearance','Chancery',NULL),(27,5,'Certification of Freedom to Marry from Embassy','Certification for foreigner','Original','Civil',NULL),(28,5,'Certification of Freedom to Marry from Chancery','certification, for different cases','Certification','Chancery',NULL),(29,5,'Permission for Mixed Marriage from Chancery','Permission for non-catholic','Original','Chancery',NULL),(30,5,'Affidavit or Co-habitation','for couple living in for more than 5 months','Original','Civil',NULL),(31,5,'Affidavit by the applicant with 2 witnesses','for no religion','Original','Civil',NULL),(32,5,'Dispensation from Chancery','Dispensation from Chancery for different cases','Original','Chancery',NULL),(33,5,'Decree of Divorced','for divorced','Original','Civil',NULL),(34,5,'Civil Annulment Decision with Certification of Finality','for divorced','Original','Civil',NULL),(35,5,'Declaration of Nullity by Catholic Matrimonial Tribunal','for divorced','Original','Civil',NULL),(36,5,'Copy of marriage cert','for divorced','Copy or Original','Civil',NULL),(37,5,'New copy of Marriage Contract','for renewal','Original','Civil',NULL),(38,5,'Copy of Death Certificate','for widow/widower','Original','Civil',NULL),(39,5,'Copy of Marriage Contract','for widow/widower','Copy or Original','Civil',NULL),(40,5,'Military Clearance from Immediate Commanding Office','for military ','Original','Civil',NULL),(44,1,'Birth Certificate','Birth Certificate','Copy or Original','Civil',NULL);
/*!40000 ALTER TABLE `tbl_requirementtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_schedule`
--

DROP TABLE IF EXISTS `tbl_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `tbl_schedule_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  CONSTRAINT `tbl_schedule_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
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
-- Table structure for table `tbl_services`
--

DROP TABLE IF EXISTS `tbl_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_services` (
  `int_eventID` int(10) NOT NULL AUTO_INCREMENT,
  `var_eventname` varchar(50) NOT NULL,
  `var_eventdesc` text NOT NULL,
  `char_type` char(15) NOT NULL,
  `char_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`int_eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_services`
--

LOCK TABLES `tbl_services` WRITE;
/*!40000 ALTER TABLE `tbl_services` DISABLE KEYS */;
INSERT INTO `tbl_services` VALUES (1,'Anointing of the sick','The anointing of the sick is administered to bring spiritual and even physical strength during an illness, especially near the time of death. It is most likely one of the last sacraments one will receive. A sacrament is an outward sign established by Jesus Christ to confer inward grace. In more basic terms, it is a rite that is performed to convey God’s grace to the recipient, through the power of the Holy Spirit.','Sacrament','Enabled'),(2,'Confirmation','The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confir- mation is the sacrament of maturity and coming of age. The real confession of Christ consist in this \'that the whole man submits himself to Truth, in the judgment of his understanding, in the submission of his will and in the consecration of his whole power of love . . . To do this, poor-spirited man is only able when he has been confirmed by God\'s grace\'\r\n\r\nThis confirmation in the power of the Holy Spirit leading to a firm profession of faith has always been the particular effect which Catholic tradition has ascribed to the sacrament. It is effect which complements and completes that of baptism.\r\n\r\nTHE CHURCH TEACHES\r\nConfirmation is a true sacrament instituted by Christ and different from baptism. It is administered by laying-on of hands and anointing with chrism accompanied by prayer. The chrism is blessed by the bishop and the bishop administers the sacrament. All baptized persons can and should be confirmed. The effect of the sacrament of confirmation is to give strength in faith and for the confession of faith and to impress an indelible character.','Sacrament','Enabled'),(3,'Baptism','The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead. We come into the world with only the natural endowments of human nature. The supernatural life which is the result of God’s personal and intimate indwelling, is absent from the soul.\r\n\r\nOriginal sin is not, in the strict sense, a “blot” upon the soul. Indeed, original sin is not a “something” at all. It is the absence of something that should be there. It is a darkness where there ought to be light.\r\n\r\nJesus instituted the sacrament of Baptism to apply to each individual soul the atonement which He made on the Cross for original sin.\r\n\r\nJesus will not force His gift upon us, the gift of supernatural life for which He paid. He holds the gift out to us hopefully, but each of us must freely accept it. We make that acceptance by receiving the sacrament of Baptism.\r\n\r\nWhen the sacrament of Baptism is administered, the spiritual vacuum which we call original sin disappears as God becomes present in the soul, and the soul is caught up into that sharing of God’s own life which we call sanctifying grace.\r\n\r\n(c) http://www.beginningcatholic.com/baptism','Sacrament','Enabled'),(4,'Funeral Service','The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n\r\n(c) http://www.ibreviary.com/m/preghiere.php?tipo=Rito&id=417','Special Service','Enabled'),(5,'Marriage','When the Catholic Church teaches that marriage between two baptized persons is a sacrament, it is saying that the couple’s relationship expresses in a unique way the unbreakable bond of love between Christ and his people. Like the other six sacraments of the Church, marriage is a sign or symbol which reveals the Lord Jesus and through which his divine life and love are communicated. All seven sacraments were instituted by Christ and were entrusted to the Church to be celebrated in faith within and for the community of believers. The rituals and prayers by which a sacrament is celebrated serve to express visibly what God is doing invisibly.\r\n\r\nIn a sacramental marriage, God’s love becomes present to the spouses in their total union and also flows through them to their family and community. By their permanent, faithful and exclusive giving to each other, symbolized in sexual intercourse, the couple reveals something of God’s unconditional love. The sacrament of Christian marriage involves their entire life as they journey together through the ups and downs of marriage and become more able to give to and receive from each other. Their life becomes sacramental to the extent that the couple cooperates with God’s action in their life and sees themselves as living “in Christ” and Christ living and acting in their relationship, attitudes and actions.\r\n\r\nCatholic teaching holds that sacraments bring grace to those who receive them with the proper disposition. Grace is a way of describing how God shares the divine life with us and gives us the help we need to live as followers of Christ. In marriage, the grace of this sacrament brings to the spouses the particular help they need to be faithful and to be good parents. It also helps a couple to serve others beyond their immediate family and to show the community that a loving and lasting marriage is both desirable and possible.\r\n\r\n(C) http://www.foryourmarriage.org/marriage-as-sacrament/','Sacrament','Enabled'),(6,'First Communion','first communion','Sacrament','Enabled'),(7,'Funeral Mass','wala malagay si jonaaa','Sacrament','Enabled'),(9,'Special Baptism','It includes adult baptism and special baptism.\r\ntuesday-sat','Special Service','Enabled'),(10,'Establishment Blessing','House blessing belongs to the special services that our parish offers. ','Special Service','Enabled'),(11,'Special Confirmation','espesyal na konpirmasyon','Special Service','Enabled'),(13,'Facility Reservation','facility reservation','Special Service','Enabled'),(14,'Document Request','Document Request','Special Service','Enabled');
/*!40000 ALTER TABLE `tbl_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_specialevent`
--

DROP TABLE IF EXISTS `tbl_specialevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `tbl_specialevent_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_specialevent`
--

LOCK TABLES `tbl_specialevent` WRITE;
/*!40000 ALTER TABLE `tbl_specialevent` DISABLE KEYS */;
INSERT INTO `tbl_specialevent` VALUES (6,5,'yieeeut','jaijasidjas','2018-07-28 02:44:00','2018-07-28 02:44:00','bro roqueto','Open for everyone','Approved');
/*!40000 ALTER TABLE `tbl_specialevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_sponsors`
--

DROP TABLE IF EXISTS `tbl_sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_sponsors` (
  `int_sponsorID` int(10) NOT NULL AUTO_INCREMENT,
  `int_eventinfoID` int(10) NOT NULL,
  `var_sponsorname` varchar(50) NOT NULL,
  PRIMARY KEY (`int_sponsorID`),
  KEY `int_eventinfoID` (`int_eventinfoID`),
  CONSTRAINT `tbl_sponsors_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_sponsors`
--

LOCK TABLES `tbl_sponsors` WRITE;
/*!40000 ALTER TABLE `tbl_sponsors` DISABLE KEYS */;
INSERT INTO `tbl_sponsors` VALUES (50,50,'Yes 50'),(51,53,'wala'),(52,53,'wala talaga'),(53,53,'wala nga'),(54,53,'walang may gusto');
/*!40000 ALTER TABLE `tbl_sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_user` (
  `int_userID` int(10) NOT NULL AUTO_INCREMENT,
  `var_userlname` varchar(55) NOT NULL,
  `var_userfname` varchar(55) NOT NULL,
  `var_usermname` varchar(55) NOT NULL,
  `char_usergender` char(10) NOT NULL,
  `date_userbirthday` date NOT NULL,
  `var_useraddress` varchar(100) NOT NULL,
  `var_usercontactnum` varchar(13) NOT NULL,
  `var_username` varchar(55) NOT NULL,
  `var_useremail` varchar(55) NOT NULL,
  `var_password` varchar(80) NOT NULL,
  `char_usertype` char(20) NOT NULL,
  PRIMARY KEY (`int_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (5,'Admin','admin','admin','Female','1980-01-01','Anywhere','09123456789','admin','admin@gmail.com','admin','Admin'),(6,'Secretariat','Secretariat','Secretariat','Female','1980-04-01','Anywhere','09999999999','secretariat','secretariat@gmail.com','secretariat','Secretariat'),(7,'Coordinator','Coordinator','Coordinator','Male','1990-04-02','Anywhere','09999999999','coordinator','coordinator@gmail.com','coordinator','Coordinator'),(8,'Catechist','Catechist','Catechist','Female','1970-04-03','Anywhere','0999999999','catechist','catechist','catechist','Catechist'),(10,'Priest','Priest','Priest','Male','1970-04-04','Anyhwere','09123456789','priest','priest@gmail.com','priest','Priest'),(11,'Ebrada','Jonalyn Fe','Desalisa','Female','1998-11-11','Payatas B Quezon City','09277475753','jonalynfe11','jonalynfeebrada11@gmail.com','123jona','Guest'),(12,'Macaya','Joshua Rae','','Male','1998-12-22','Caloocan CIty','09277475711','joshuarae','joshuarae@gmail.com','123rae','Guest'),(13,'Del Rosario','Eldrin Rei','Dikolam','Male','1998-01-01','Valenzuela City','09277475742','eldrinrei','asdfwe','123eldrin','Guest'),(14,'Peñaverde','Norme Ann Joyce','dunno','Female','1999-07-06','Infanta Quezon','09277475733','normeann','normeann','123norme','Guest');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_utilities`
--

DROP TABLE IF EXISTS `tbl_utilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
INSERT INTO `tbl_utilities` VALUES (1,3,14,90,10,NULL,7,0,NULL,NULL,0,11,300,'01:00:00',50),(2,9,14,90,10,NULL,7,0,NULL,NULL,0,NULL,1000,'01:00:00',50),(3,2,14,90,10,NULL,7,0,NULL,NULL,11,NULL,300,'01:00:00',50),(4,11,14,90,10,NULL,7,0,NULL,NULL,11,NULL,1000,'01:00:00',50),(5,4,3,7,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(6,7,3,7,2,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(7,10,7,30,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(8,10,7,30,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'01:00:00',0),(9,5,120,365,15,60,60,1,30,50,18,NULL,7000,'01:30:00',50),(10,14,0,0,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,100,'00:00:00',0),(11,13,7,90,NULL,3,0,1,75,50,NULL,NULL,1200,'00:00:00',300);
/*!40000 ALTER TABLE `tbl_utilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wedbride`
--

DROP TABLE IF EXISTS `tbl_wedbride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `tbl_wedbride_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_wedcouple` (
  `int_eventinfoID` int(20) NOT NULL,
  `bool_livingin` tinyint(1) NOT NULL,
  `bool_married` tinyint(1) NOT NULL,
  `date_cprevweddate` date DEFAULT NULL,
  `var_cprevwedplace` varchar(100) DEFAULT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  `char_weddingtype` char(15) NOT NULL,
  UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  CONSTRAINT `tbl_wedcouple_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_weddingcases` (
  `int_weddingcaseID` int(11) NOT NULL AUTO_INCREMENT,
  `var_casename` varchar(45) NOT NULL,
  `var_casedesc` varchar(100) NOT NULL,
  PRIMARY KEY (`int_weddingcaseID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_weddingcases`
--

LOCK TABLES `tbl_weddingcases` WRITE;
/*!40000 ALTER TABLE `tbl_weddingcases` DISABLE KEYS */;
INSERT INTO `tbl_weddingcases` VALUES (1,'Ordinary','Ordinary caseeee'),(2,'Foreigner','case for foreigner'),(3,'Non-Catholic','for non-catholic'),(4,'No Religion','for no religion'),(5,'Living in','for couple living in the same house'),(6,'Divorced','for divorced'),(7,'Renewal of Vows','for couple getting married again'),(8,'Widow/Widower','for widows/widowers getting married again'),(9,'Military','for military'),(10,'Pregnant','for 5 months or above pregnant'),(11,'Minor','20 and below');
/*!40000 ALTER TABLE `tbl_weddingcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wedgroom`
--

DROP TABLE IF EXISTS `tbl_wedgroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `tbl_wedgroom_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`)
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbl_wedsteps` (
  `int_wedstepID` int(11) NOT NULL AUTO_INCREMENT,
  `var_wedstepname` varchar(45) NOT NULL,
  `int_websteporder` int(11) DEFAULT NULL,
  `var_stepguidelines` varchar(1000) DEFAULT NULL,
  `var_wedtype` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`int_wedstepID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wedsteps`
--

LOCK TABLES `tbl_wedsteps` WRITE;
/*!40000 ALTER TABLE `tbl_wedsteps` DISABLE KEYS */;
INSERT INTO `tbl_wedsteps` VALUES (1,'Reservation',1,'Reserve desired date and time of wedding','Default'),(2,'Application Request',2,'Fill out application form','Default'),(3,'Payment',3,'Paymentyey','Default'),(4,'Canonical Interview',4,'interview with the priest','Default'),(5,'Submission of Requirements ',5,'submit all needed requirements','Default'),(6,'Issue Marriage Banns',6,'marriage banns and permit from bride\'s parish\r\n','Default'),(7,'Pre-Cana Seminar',6,'schedule of pre-cana seminar. RCIA and confirmation also if they are not yet baptized or confirmed.','Default'),(8,'Congrats <3',7,'kasalan naaaa','Default');
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

-- Dump completed on 2018-08-04 14:18:39
