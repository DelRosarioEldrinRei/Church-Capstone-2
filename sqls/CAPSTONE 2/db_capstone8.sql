-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2019 at 03:53 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_baptism`
--

CREATE TABLE `tbl_baptism` (
  `int_eventinfoID` int(10) NOT NULL,
  `var_parentmarriageadd` varchar(100) NOT NULL,
  `var_fatherbplace` varchar(100) NOT NULL,
  `var_motherbplace` varchar(100) NOT NULL,
  `var_fathername` varchar(100) NOT NULL,
  `var_mothername` varchar(100) NOT NULL,
  `var_contactnum` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blessing`
--

CREATE TABLE `tbl_blessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_blessingvenue` varchar(100) NOT NULL,
  `var_blessingdetails` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_blessing`
--

INSERT INTO `tbl_blessing` (`int_eventinfoID`, `var_blessingvenue`, `var_blessingdetails`) VALUES
(41, 'Payatas B Quezon City', 'asdf'),
(44, 'asdf', 'adsf'),
(45, 'Ina ng Lupang Pangako', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document`
--

CREATE TABLE `tbl_document` (
  `int_documentID` int(11) NOT NULL,
  `var_documenttype` varchar(50) NOT NULL,
  `var_doctemplatepath` varchar(45) NOT NULL,
  `dbl_docuprice` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_document`
--

INSERT INTO `tbl_document` (`int_documentID`, `var_documenttype`, `var_doctemplatepath`, `dbl_docuprice`) VALUES
(1, 'Baptismal Certificate', '/img/document/facility-permit.png', 50),
(2, 'Confirmation Certificate', '/img/document/facility-permit.png', 50),
(3, 'First Communion Certificate', '/img/document/facility-permit.png', 50);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_documentrequest`
--

CREATE TABLE `tbl_documentrequest` (
  `int_requestID` int(11) NOT NULL,
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
  `datetime_signed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_documentsevents`
--

CREATE TABLE `tbl_documentsevents` (
  `int_docu_eventID` int(11) NOT NULL,
  `int_eventID` int(11) NOT NULL,
  `int_documentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_eventinfo`
--

CREATE TABLE `tbl_eventinfo` (
  `int_eventinfoID` int(10) NOT NULL,
  `int_userID` int(10) NOT NULL,
  `int_eventID` int(10) NOT NULL,
  `date_eventdate` date DEFAULT NULL,
  `time_eventstart` time DEFAULT NULL,
  `time_eventend` time NOT NULL,
  `var_eventstatus` varchar(25) DEFAULT 'Pending',
  `char_approvalstatus` char(20) NOT NULL DEFAULT 'Pending',
  `int_paymentID` int(11) DEFAULT NULL,
  `int_userpriestID` int(11) DEFAULT NULL,
  `bool_priestrequested` tinyint(4) DEFAULT NULL,
  `char_requirements` varchar(25) DEFAULT NULL,
  `date_approval` date DEFAULT NULL,
  `date_applied` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_eventinfo`
--

INSERT INTO `tbl_eventinfo` (`int_eventinfoID`, `int_userID`, `int_eventID`, `date_eventdate`, `time_eventstart`, `time_eventend`, `var_eventstatus`, `char_approvalstatus`, `int_paymentID`, `int_userpriestID`, `bool_priestrequested`, `char_requirements`, `date_approval`, `date_applied`) VALUES
(41, 11, 1, '2019-03-01', '10:30:00', '12:30:00', 'Pending', 'Pending', NULL, NULL, NULL, 'Submitted', '2019-03-01', '2019-03-01'),
(42, 11, 12, '2019-03-26', '11:30:00', '12:30:00', 'Pending', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-01'),
(43, 11, 12, '2019-03-28', '11:30:00', '12:30:00', 'Pending', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-01'),
(44, 11, 4, '2019-03-12', '12:30:00', '13:30:00', 'Pending', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-01'),
(45, 11, 7, '2019-03-05', '13:30:00', '14:30:00', 'Cancelled', 'Cancelled', 14, NULL, NULL, 'Submitted', '2019-03-01', '2019-03-01'),
(47, 11, 5, '2019-03-01', '16:00:00', '19:00:00', 'Cancelled', 'Cancelled', 16, NULL, NULL, 'Incomplete', '2019-03-01', '2019-03-01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facility`
--

CREATE TABLE `tbl_facility` (
  `int_facilityID` int(11) NOT NULL,
  `var_facilityname` varchar(50) NOT NULL,
  `var_facilitydesc` varchar(200) DEFAULT NULL,
  `var_facilitypicpath` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_facility`
--

INSERT INTO `tbl_facility` (`int_facilityID`, `var_facilityname`, `var_facilitydesc`, `var_facilitypicpath`) VALUES
(1, 'Bro. Roqueto 2nd floor', 'Meetings, training, seminars, workshops', '/img/facility/facility_1.jpg'),
(2, 'Bro. Roqueto 3rd floor', 'Meetings, training, seminars, workshops, holiday parties, banquets, receptions, class reunions, anniversary parties, birthday parties, baby showers', '/img/facility/facility_2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facilityreservation`
--

CREATE TABLE `tbl_facilityreservation` (
  `int_reservationID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `int_facilityID` int(11) NOT NULL,
  `var_event` varchar(100) NOT NULL,
  `var_eventdesc` varchar(300) NOT NULL,
  `int_attendees` int(11) NOT NULL,
  `datetime_reservestart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `datetime_reserveend` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `char_reservestatus` char(50) NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_filecabinets`
--

CREATE TABLE `tbl_filecabinets` (
  `int_cabinetID` int(11) NOT NULL,
  `var_cabinetname` varchar(10) NOT NULL,
  `var_cabinetpurpose` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_filecabinets`
--

INSERT INTO `tbl_filecabinets` (`int_cabinetID`, `var_cabinetname`, `var_cabinetpurpose`) VALUES
(1, 'A', 'Marriage Documents'),
(2, 'B', 'Baptism Documents');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_filedivisions`
--

CREATE TABLE `tbl_filedivisions` (
  `int_divisionID` int(11) NOT NULL,
  `int_cabinetID` int(11) NOT NULL,
  `var_divisionname` varchar(10) NOT NULL,
  `var_divisionpurpose` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_filedivisions`
--

INSERT INTO `tbl_filedivisions` (`int_divisionID`, `int_cabinetID`, `var_divisionname`, `var_divisionpurpose`) VALUES
(1, 1, '1Q', 'First quarter of the year'),
(2, 1, '2Q', 'Second quarter of the year'),
(3, 1, '3Q', 'Third quarter of the year'),
(4, 1, '4Q', 'Fourth quarter of the year'),
(5, 2, '1Q', 'First quarter of the year'),
(6, 2, '2Q', 'Second quarter of the year'),
(7, 2, '3Q', 'Third quarter of the year'),
(8, 2, '4Q', 'Fourth quarter of the year');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_filefolders`
--

CREATE TABLE `tbl_filefolders` (
  `int_folderID` int(11) NOT NULL,
  `int_eventinfoID` int(11) DEFAULT NULL,
  `int_cabinetID` int(11) NOT NULL,
  `int_divisionID` int(11) NOT NULL,
  `int_foldernumber` int(11) NOT NULL,
  `var_foldername` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_files`
--

CREATE TABLE `tbl_files` (
  `int_fileID` int(11) NOT NULL,
  `var_fileloc` varchar(50) NOT NULL,
  `int_requirementID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_houseblessing`
--

CREATE TABLE `tbl_houseblessing` (
  `int_houseblessID` int(11) NOT NULL,
  `int_eventinfoID` int(11) NOT NULL,
  `var_owner` varchar(100) NOT NULL,
  `var_estloc` varchar(100) NOT NULL,
  `var_ownercontactnum` varchar(13) NOT NULL,
  `var_owneremailadd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_houseblessing`
--

INSERT INTO `tbl_houseblessing` (`int_houseblessID`, `int_eventinfoID`, `var_owner`, `var_estloc`, `var_ownercontactnum`, `var_owneremailadd`) VALUES
(11, 42, 'Ebrada, Jonalyn Fe', 'Payatas B Quezon City', '09277475753', 'jonalynfeebrada11@gmail.com'),
(12, 43, 'asdf', 'asdf', '09277475753', 'adsf@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_itemdetails`
--

CREATE TABLE `tbl_itemdetails` (
  `int_itemdetailsID` int(11) NOT NULL,
  `int_itemID` int(11) NOT NULL,
  `int_qualityID` int(11) NOT NULL,
  `int_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_itemdetails`
--

INSERT INTO `tbl_itemdetails` (`int_itemdetailsID`, `int_itemID`, `int_qualityID`, `int_quantity`) VALUES
(1, 1, 1, 25),
(2, 1, 2, 25);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_items`
--

CREATE TABLE `tbl_items` (
  `int_itemID` int(11) NOT NULL,
  `var_itemname` varchar(45) NOT NULL,
  `var_itemdesc` varchar(45) NOT NULL,
  `int_goodquantity` int(11) NOT NULL,
  `int_damagedquantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_items`
--

INSERT INTO `tbl_items` (`int_itemID`, `var_itemname`, `var_itemdesc`, `int_goodquantity`, `int_damagedquantity`) VALUES
(1, 'Chair', 'Upuan', 39, 23),
(2, 'Mic Stand', 'kurtina', 2, 0),
(3, 'Table', 'lamesa', 10, 1),
(4, 'Speaker', 'speaker', 3, 1),
(5, 'Microphone', 'Microphone', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mass`
--

CREATE TABLE `tbl_mass` (
  `int_massID` int(11) NOT NULL,
  `int_priestID` int(11) DEFAULT NULL,
  `int_massday` int(11) DEFAULT NULL,
  `time_massstart` time NOT NULL,
  `date_massdate` date DEFAULT NULL,
  `time_massduration` time NOT NULL,
  `var_massvenue` text NOT NULL,
  `char_masstype` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_mass`
--

INSERT INTO `tbl_mass` (`int_massID`, `int_priestID`, `int_massday`, `time_massstart`, `date_massdate`, `time_massduration`, `var_massvenue`, `char_masstype`) VALUES
(1, NULL, 0, '07:30:00', NULL, '01:00:00', 'asdf', 'Regular');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_message`
--

CREATE TABLE `tbl_message` (
  `int_messageID` int(10) NOT NULL,
  `int_senderID` int(10) NOT NULL,
  `int_receiverID` int(10) NOT NULL,
  `var_subject` varchar(100) NOT NULL,
  `text_message` text NOT NULL,
  `datetime_sent` datetime NOT NULL,
  `datetime_seen` datetime DEFAULT NULL,
  `var_messagestatus` varchar(45) NOT NULL DEFAULT 'Delivered',
  `int_eventinfoID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_message`
--

INSERT INTO `tbl_message` (`int_messageID`, `int_senderID`, `int_receiverID`, `var_subject`, `text_message`, `datetime_sent`, `datetime_seen`, `var_messagestatus`, `int_eventinfoID`) VALUES
(2, 6, 11, '', 'asdf', '2019-03-01 20:05:36', NULL, 'Delivered', NULL),
(3, 6, 11, '', 'asdfasdf', '2019-03-01 20:06:43', NULL, 'Delivered', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `int_notifID` int(10) NOT NULL,
  `int_userID` int(10) NOT NULL,
  `var_notifdesc` varchar(500) DEFAULT NULL,
  `datetime_seen` datetime DEFAULT NULL,
  `int_eventinfoID` int(11) DEFAULT NULL,
  `datetime_received` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`int_notifID`, `int_userID`, `var_notifdesc`, `datetime_seen`, `int_eventinfoID`, `datetime_received`) VALUES
(3, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:38:16'),
(4, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:04'),
(5, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:12'),
(6, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:15'),
(7, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:15'),
(8, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:17'),
(9, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:18'),
(10, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:19'),
(11, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:39:19'),
(12, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:41:19'),
(13, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:55:36'),
(14, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:56:06'),
(15, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:57:28'),
(16, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:57:50'),
(17, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:58:14'),
(18, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 20:58:56'),
(19, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 21:00:32'),
(20, 6, 'An event was automatcally cancelled by the system.', NULL, 47, '2019-03-01 21:02:48'),
(21, 11, 'Your application was automatically cancelled because you did not meet the payment deadline. If you have any concerns, you may send us a message or go directly to the office. Thank you.', NULL, 45, '2019-03-01 21:21:35'),
(22, 11, 'Your application was automatically cancelled because you did not meet the payment deadline. If you have any concerns, you may send us a message or go directly to the office. Thank you.', NULL, 45, '2019-03-01 21:21:35');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `int_paymentID` int(10) NOT NULL,
  `dbl_amount` double NOT NULL,
  `dbl_balance` double NOT NULL,
  `dbl_downpaymentamount` double DEFAULT NULL,
  `char_paymentstatus` char(10) NOT NULL,
  `datetime_paymentreceived` datetime DEFAULT NULL,
  `date_downpaymentdeadline` date NOT NULL,
  `date_fullpaymentdeadline` date NOT NULL,
  `date_refundissued` date DEFAULT NULL,
  `date_refunddue` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`int_paymentID`, `dbl_amount`, `dbl_balance`, `dbl_downpaymentamount`, `char_paymentstatus`, `datetime_paymentreceived`, `date_downpaymentdeadline`, `date_fullpaymentdeadline`, `date_refundissued`, `date_refunddue`) VALUES
(14, 300, 300, NULL, 'Unpaid', NULL, '2019-03-01', '2019-03-01', NULL, NULL),
(16, 7050, 7050, 3525, 'Unpaid', NULL, '2019-03-31', '2019-05-30', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_paymenthistory`
--

CREATE TABLE `tbl_paymenthistory` (
  `int_ORnumber` int(11) NOT NULL,
  `int_paymentID` int(11) NOT NULL,
  `date_paymentdate` date NOT NULL,
  `var_paidby` varchar(100) NOT NULL,
  `dbl_paymentamount` double NOT NULL,
  `dbl_remainingbalance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_priestsequence`
--

CREATE TABLE `tbl_priestsequence` (
  `int_sequenceID` int(11) NOT NULL,
  `int_priestID` int(11) NOT NULL,
  `int_eventID` int(11) NOT NULL,
  `int_seqnumber` int(11) NOT NULL,
  `char_seqstatus` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_priestsequence`
--

INSERT INTO `tbl_priestsequence` (`int_sequenceID`, `int_priestID`, `int_eventID`, `int_seqnumber`, `char_seqstatus`) VALUES
(1, 10, 5, 1, 'Next'),
(2, 16, 5, 2, 'Nope'),
(3, 17, 5, 3, 'Nope');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quality`
--

CREATE TABLE `tbl_quality` (
  `int_qualityID` int(11) NOT NULL,
  `var_qualityname` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_quality`
--

INSERT INTO `tbl_quality` (`int_qualityID`, `var_qualityname`) VALUES
(1, 'Good'),
(2, 'Damaged');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_relation`
--

CREATE TABLE `tbl_relation` (
  `int_relationID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `var_relation` varchar(20) DEFAULT NULL,
  `var_lname` varchar(50) NOT NULL,
  `var_fname` varchar(50) NOT NULL,
  `var_mname` varchar(50) DEFAULT NULL,
  `char_gender` varchar(10) NOT NULL,
  `var_address` varchar(100) NOT NULL,
  `date_birthday` date NOT NULL,
  `var_birthplace` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_relation`
--

INSERT INTO `tbl_relation` (`int_relationID`, `int_eventinfoID`, `var_relation`, `var_lname`, `var_fname`, `var_mname`, `char_gender`, `var_address`, `date_birthday`, `var_birthplace`) VALUES
(25, 41, 'BF/GF', 'asdf', 'asdf', 'sdfa', 'Male', 'asdf', '1998-11-11', 'asdf'),
(26, 44, 'null', 'asdf', 'asdf', 'adsf', 'Male', 'asdf', '1998-11-11', 'asdfa'),
(27, 45, 'null', 'asd', 'fasdf', 'asdf', 'Male', 'asdf', '1998-11-11', 'asdf'),
(29, 47, NULL, 'asdf', 'asdf', 'asdf', 'Male', 'asdf', '1998-11-11', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirements`
--

CREATE TABLE `tbl_requirements` (
  `int_requirementID` int(10) NOT NULL,
  `int_reqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(300) DEFAULT NULL,
  `datetime_reqreceived` datetime DEFAULT NULL,
  `var_reqstatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requirements`
--

INSERT INTO `tbl_requirements` (`int_requirementID`, `int_reqtypeID`, `var_reqpath`, `datetime_reqreceived`, `var_reqstatus`) VALUES
(71, 44, '/img/req/image-1551373279979.jpg', '2019-03-01 01:01:20', 'Submitted'),
(72, 48, '/img/req/image-1551373583375.jpg', '2019-03-01 01:06:23', 'Submitted'),
(73, 47, '/img/req/image-1551373850386.jpg', '2019-03-01 01:10:50', 'Submitted'),
(74, 7, '/img/req/image-1551373881600.jpg', '2019-03-01 01:11:21', 'Submitted'),
(85, 13, '/img/req/birthCertGroom-1551374680605.jpg', '2019-03-01 01:24:41', 'Submitted'),
(86, 49, NULL, NULL, 'To be submitted'),
(87, 50, NULL, NULL, 'To be submitted'),
(88, 23, NULL, NULL, 'To be submitted'),
(89, 46, '/img/req/validIDGroom-1551374680604.jpg', '2019-03-01 01:24:41', 'Submitted'),
(90, 24, NULL, NULL, 'To be submitted'),
(91, 45, '/img/req/validIDBride-1551374680609.jpg', '2019-03-01 01:24:41', 'Submitted'),
(92, 14, '/img/req/birthCertBride-1551374680610.jpg', '2019-03-01 01:24:41', 'Submitted'),
(93, 25, NULL, NULL, 'To be submitted'),
(94, 26, NULL, '2019-03-01 01:24:42', 'To be submitted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementsdocument`
--

CREATE TABLE `tbl_requirementsdocument` (
  `int_requirementsdocumentID` int(11) NOT NULL,
  `int_requestID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(200) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `char_reqstatus` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementsfacility`
--

CREATE TABLE `tbl_requirementsfacility` (
  `int_requirementsfacilityID` int(11) NOT NULL,
  `int_reservationID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(80) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `char_reqstatus` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementshouse`
--

CREATE TABLE `tbl_requirementshouse` (
  `int_requirementhouseID` int(11) NOT NULL,
  `int_eventinfoID` int(11) NOT NULL,
  `int_servicereqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(200) NOT NULL,
  `datetime_reqreceived` datetime NOT NULL,
  `var_reqstatus` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementsinevents`
--

CREATE TABLE `tbl_requirementsinevents` (
  `int_requirementsineventsID` int(11) NOT NULL,
  `int_requirementID` int(11) NOT NULL,
  `int_eventinfoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requirementsinevents`
--

INSERT INTO `tbl_requirementsinevents` (`int_requirementsineventsID`, `int_requirementID`, `int_eventinfoID`) VALUES
(70, 71, 41),
(71, 72, 43),
(72, 73, 44),
(73, 74, 45),
(84, 88, 47),
(85, 86, 47),
(86, 87, 47),
(87, 90, 47),
(88, 85, 47),
(89, 93, 47),
(90, 89, 47),
(91, 91, 47),
(92, 94, 47),
(93, 92, 47);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementtype`
--

CREATE TABLE `tbl_requirementtype` (
  `int_reqtypeID` int(11) NOT NULL,
  `int_eventID` int(11) NOT NULL,
  `var_reqname` varchar(100) NOT NULL,
  `var_reqdesc` varchar(100) NOT NULL,
  `char_reqmode` char(25) NOT NULL,
  `char_reqtype` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requirementtype`
--

INSERT INTO `tbl_requirementtype` (`int_reqtypeID`, `int_eventID`, `var_reqname`, `var_reqdesc`, `char_reqmode`, `char_reqtype`) VALUES
(1, 3, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil '),
(2, 9, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(3, 2, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(4, 2, ' Baptismal Certificate', 'Baptismal Certificate', 'Copy or Original', 'Church'),
(6, 6, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(7, 7, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(8, 7, 'Death Certificate', 'Death Certificate', 'Copy', 'Civil'),
(9, 11, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(10, 11, 'Baptismal Certificate', 'Baptismal Certificate', 'Copy or Original', 'Church'),
(13, 5, 'Birth Certificate of the Groom', 'Birth Certificate of the Groom', 'Original', 'Default'),
(14, 5, 'Birth Certificate of the Bride', 'Birth Certificate of the Bride', 'Original', 'Default'),
(15, 5, 'Baptismal Certificate of the Groom', 'Baptismal Certificate of the groom with FOR MARRIAGE PUSPOSES ONLY annoitation', 'Original', 'Default'),
(16, 5, 'Confirmation Certificate of the Groom', 'Confirmation Certificate of the groom with FOR MARRIAGE PURPOSES ONLY annoitatio', 'Original', 'Default'),
(17, 5, 'Baptismal Certificate of the Bride', 'Baptismal Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ', 'Original', 'Default'),
(18, 5, 'Confirmation Certificate of the Bride', 'Confirmation Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ', 'Original', 'Default'),
(23, 5, 'Marriage License', 'License', 'Original', 'Default'),
(24, 5, 'Marriage Contract', 'contract', 'Original', 'Default'),
(25, 5, 'NSO CENOMAR', 'NSO Certification of No Marriage', 'Original', 'Default'),
(26, 5, 'Clearance from Chancery Office', 'Clearance (form 3)', 'Original', 'Additional'),
(27, 5, 'Certification of Freedom to Marry from Embassy', 'Certification for foreigner', 'Original', 'Additional'),
(28, 5, 'Certification of Freedom to Marry from Chancery', 'certification, for different cases', 'Copy or Original', 'Additional'),
(29, 5, 'Permission for Mixed Marriage from Chancery', 'Permission for non-catholic', 'Original', 'Additional'),
(30, 5, 'Affidavit or Co-habitation', 'for couple living in for more than 5 months', 'Original', 'Additional'),
(31, 5, 'Affidavit by the applicant with 2 witnesses', 'for no religion', 'Original', 'Additional'),
(32, 5, 'Dispensation from Chancery', 'Dispensation from Chancery for different cases', 'Original', 'Additional'),
(33, 5, 'Decree of Divorced', 'for divorced', 'Original', 'Civil'),
(34, 5, 'Civil Annulment Decision with Certification of Finality', 'for divorced', 'Original', 'Additional'),
(35, 5, 'Declaration of Nullity by Catholic Matrimonial Tribunal', 'for divorced', 'Original', 'Additional'),
(36, 5, 'Copy of marriage cert', 'for divorced', 'Copy or Original', 'Additional'),
(37, 5, 'New copy of Marriage Contract', 'for renewal', 'Original', 'Additional'),
(38, 5, 'Copy of Death Certificate', 'for widow/widower', 'Original', 'Additional'),
(39, 5, 'Copy of Marriage Contract', 'for widow/widower', 'Copy or Original', 'Civil'),
(40, 5, 'Military Clearance from Immediate Commanding Office', 'for military ', 'Original', 'Civil'),
(44, 1, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(45, 5, 'Valid ID of the Bride', 'Valid id', 'Copy', 'Default'),
(46, 5, 'Valid ID of the Groom', 'Valid ID', 'Copy', 'Default'),
(47, 4, 'Birth Certificate', 'Birthcertificate', 'Copy', 'Original'),
(48, 12, 'Valid ID of the owner', 'Valid ID of the owner', 'Copy', 'Civil'),
(49, 5, 'RCIA Certificate of the groom', 'RCIA Certificate of the groom', 'Original', 'Church'),
(50, 5, 'RCIA Certificate of the bride', 'RCIA Certificate of the bride', 'Original', 'Additional');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedule`
--

CREATE TABLE `tbl_schedule` (
  `int_scheduleID` int(10) NOT NULL,
  `int_userID` int(10) DEFAULT NULL,
  `int_eventinfoID` int(10) DEFAULT NULL,
  `var_schedulename` varchar(100) DEFAULT NULL,
  `date_sched` date NOT NULL,
  `time_schedstart` time NOT NULL,
  `time_schedend` time DEFAULT NULL,
  `var_venue` varchar(100) NOT NULL,
  `text_schedulenote` text,
  `var_schedstatus` varchar(25) NOT NULL DEFAULT 'Unconfirmed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_servicereqtype`
--

CREATE TABLE `tbl_servicereqtype` (
  `int_servicereqtypeID` int(11) NOT NULL,
  `int_serviceutilitiesID` int(11) NOT NULL,
  `var_reqname` varchar(45) NOT NULL,
  `var_reqdesc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_servicereqtype`
--

INSERT INTO `tbl_servicereqtype` (`int_servicereqtypeID`, `int_serviceutilitiesID`, `var_reqname`, `var_reqdesc`) VALUES
(2, 1, 'Valid ID', 'valid ID of the person in the certificate'),
(3, 2, 'Valid ID', 'Valid ID of the person reserving the facility'),
(4, 3, 'Valid ID', 'Valid ID of the owner');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `int_eventID` int(10) NOT NULL,
  `var_eventname` varchar(50) NOT NULL,
  `var_eventdesc` text NOT NULL,
  `char_type` char(15) NOT NULL,
  `var_servicepicpath` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`int_eventID`, `var_eventname`, `var_eventdesc`, `char_type`, `var_servicepicpath`) VALUES
(1, 'Anointing of the sick', 'The anointing of the sick is administered to bring spiritual and even physical strength during an illness, especially near the time of death. It is most likely one of the last sacraments one will receive. A sacrament is an outward sign established by Jesus Christ to confer inward grace. In more basic terms, it is a rite that is performed to convey God’s grace to the recipient, through the power of the Holy Spirit.', 'Blessing', NULL),
(2, 'Confirmation', 'The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confir- mation is the sacrament of maturity and coming of age. The real confession of Christ consist in this \'that the whole man submits himself to Truth, in the judgment of his understanding, in the submission of his will and in the consecration of his whole power of love . . . To do this, poor-spirited man is only able when he has been confirmed by God\'s grace\'\r\n\r\nThis confirmation in the power of the Holy Spirit leading to a firm profession of faith has always been the particular effect which Catholic tradition has ascribed to the sacrament. It is effect which complements and completes that of baptism.\r\n', 'Baptism', NULL),
(3, 'Baptism', 'The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead. We come into the world with only the natural endowments of human nature. The supernatural life which is the result of God’s personal and intimate indwelling, is absent from the soul.\r\n', 'Baptism', NULL),
(4, 'Funeral Service', 'The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n', 'Blessing', NULL),
(5, 'Marriage', 'When the Catholic Church teaches that marriage between two baptized persons is a sacrament, it is saying that the couple’s relationship expresses in a unique way the unbreakable bond of love between Christ and his people. Like the other six sacraments of the Church, marriage is a sign or symbol which reveals the Lord Jesus and through which his divine life and love are communicated. All seven sacraments were instituted by Christ and were entrusted to the Church to be celebrated in faith within and for the community of believers. The rituals and prayers by which a sacrament is celebrated serve to express visibly what God is doing invisibly.\r\n', 'Marriage', NULL),
(6, 'First Communion', 'first communion', 'Communion', NULL),
(7, 'Funeral Mass', 'The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. Whenever possible, the rite of committal is to be celebrated at the site of committal, that is, beside the open grave or place of internment, rather than at a cemetery chapel.\r\n', 'Blessing', NULL),
(9, 'Special Baptism', 'It includes adult baptism and special baptism.\r\ntuesday-sat', 'Baptism', NULL),
(11, 'Special Confirmation', 'espesyal na konpirmasyon', 'Baptism', NULL),
(12, 'House Blessing', 'house blessing', 'Blessing', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_serviceutilities`
--

CREATE TABLE `tbl_serviceutilities` (
  `int_serviceutilitiesID` int(11) NOT NULL,
  `var_servicename` varchar(45) NOT NULL,
  `char_status` char(10) NOT NULL,
  `var_servicedesc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_serviceutilities`
--

INSERT INTO `tbl_serviceutilities` (`int_serviceutilitiesID`, `var_servicename`, `char_status`, `var_servicedesc`) VALUES
(1, 'Document Request', 'Enabled', 'Request Document '),
(2, 'Facility Reservation', 'Enabled', 'facility reservationnnn'),
(3, 'House/Business Blessing', 'Enabled', 'house blessing or business blessing or establishment blessing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_specialevent`
--

CREATE TABLE `tbl_specialevent` (
  `int_specialeventID` int(11) NOT NULL,
  `int_userID` int(11) DEFAULT NULL,
  `var_spceventname` varchar(50) NOT NULL,
  `text_eventdesc` text NOT NULL,
  `time_eventstart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `time_eventend` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `var_eventvenue` varchar(200) NOT NULL,
  `char_eventtype` char(25) NOT NULL,
  `var_approvalstatus` varchar(25) DEFAULT NULL,
  `var_eventpicpath` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sponsors`
--

CREATE TABLE `tbl_sponsors` (
  `int_sponsorID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `var_sponsorname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_sponsors`
--

INSERT INTO `tbl_sponsors` (`int_sponsorID`, `int_eventinfoID`, `var_sponsorname`) VALUES
(33, 47, 'asdf'),
(34, 47, 'asdf'),
(35, 47, 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(10) NOT NULL,
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
  `var_userstatus` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `var_userlname`, `var_userfname`, `var_usermname`, `char_usergender`, `var_useraddress`, `var_usercontactnum`, `var_username`, `var_useremail`, `var_password`, `char_usertype`, `var_userstatus`) VALUES
(5, 'Admin', 'admin', 'admin', 'Female', 'Anywhere', '09123456789', 'admin', 'admin@gmail.com', 'admin', 'Admin', 'Active'),
(6, 'Secretariat', 'Secretariat', 'Secretariat', 'Female', 'Anywhere', '09999999999', 'secretariat', 'secretariat@gmail.com', 'secretariat', 'Secretariat', 'Active'),
(7, 'Coordinator', 'Coordinator', 'Coordinator', 'Male', 'Anywhere', '09999999999', 'coordinator', 'coordinator@gmail.com', 'coordinator', 'Coordinator', 'Active'),
(8, 'Catechist', 'Catechist', 'Catechist', 'Female', 'Anywhere', '0999999999', 'catechist', 'catechist', 'catechist', 'Catechist', 'Active'),
(10, 'Sandaga', 'Mike', 'Priest', 'Male', 'Anywhere', '09123456789', 'priest', 'priest@gmail.com', 'priest', 'Parish Priest', 'Active'),
(11, 'Ebrada', 'Jonalyn Fe', 'Desalisa', 'Female', 'Payatas B Quezon City', '09277475753', 'jonalynfe11', 'jonalynfeebrada11@gmail.com', '123jona', 'Guest', 'Active'),
(12, 'Macaya', 'Joshua Rae', '', 'Male', 'Caloocan CIty', '09277475711', 'joshuarae', 'joshuarae@gmail.com', '123rae', 'Guest', 'Active'),
(13, 'Del Rosario', 'Eldrin Rei', 'Pablo', 'Male', 'Valenzuela City', '09277475742', 'eldrinrei', 'asdfwe', '123eldrin', 'Guest', 'Active'),
(14, 'Peñaverde', 'Norme Ann Joyce', 'Tonzon', 'Female', 'Infanta Quezon', '09277475733', 'normeann', 'normeann', '123norme', 'Guest', 'Active'),
(15, 'Flores', 'Rachel Maiden', 'Cabuso', 'Female', 'Tondo, Manila', '09999999999', 'rachel', 'rachel@gmail.com', '123rachel', 'Guest', 'Active'),
(16, 'Lacsina', 'Gramar ', 'Desuyp', 'Male', 'Sta. ana', '09205516439', 'priest2', 'priest@gmail.com', 'priest2', 'Priest', 'Active'),
(17, 'Aydalla', 'Sherwin', 'Galang', 'Male', 'Taguig City', '09999999998', 'priest3', 'priest@gmail.com', 'priest3', 'Priest', 'Active'),
(18, 'Test', 'Test', 'Test', 'Female', 'ASDFASDF', '09277475753', 'jonalynfe11', 'ASDF', '1234', 'Guest', 'Active'),
(19, 'Test2', 'asdf', 'asdf', 'Male', 'adf', '09277475753', 'jonalynfe11', 'jodelannebrada@gmail.com', '1234', 'Guest', 'Active'),
(20, 'Ebrada', 'asdf', 'asdf', 'Male', 'sdfg', '09277475753', 'jonalynfe11', 'jodelannebrada@gmail.com', '123', 'Guest', 'Active'),
(21, 'Ebrada', 'asdf', 'asdf', 'Male', 'sdfg', '09277475753', 'jonalynfe11', 'jodelannebrada@gmail.com', '123', 'Guest', 'Active'),
(22, 'Ebrada', 'asdf', 'asdf', 'Male', 'sdfg', '09277475753', 'jonalynfe11', 'jodelannebrada@gmail.com', '123', 'Guest', 'Active'),
(23, 'Test2', 'asdf', 'adsf', 'Male', 'adf', '09277475753', 'jonalynfe11', 'jonalynfeebrada11@gmail.com', '1234', 'Guest', 'Active'),
(24, 'Test21', 'adsf', 'asd', 'Male', 'adf', '09277475753', 'jonalynfe11', 'asdf', '123', 'Guest', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_utilities`
--

CREATE TABLE `tbl_utilities` (
  `int_utilitiesID` int(11) NOT NULL,
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
  `double_priestaddrate` double DEFAULT NULL,
  `int_downpaymentdays` int(11) DEFAULT NULL,
  `int_fullpaymentdays` int(11) DEFAULT NULL,
  `int_downpaymentpercent` int(11) DEFAULT NULL,
  `bool_refundable` tinyint(1) DEFAULT NULL,
  `int_refunddays` int(11) DEFAULT NULL,
  `int_refundpercent` int(11) DEFAULT NULL,
  `bool_withageconstraints` tinyint(1) NOT NULL,
  `int_agemin` int(11) DEFAULT NULL,
  `int_agemax` int(11) DEFAULT NULL,
  `char_servicestatus` char(15) NOT NULL,
  `int_maxcount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_utilities`
--

INSERT INTO `tbl_utilities` (`int_utilitiesID`, `int_eventID`, `int_serviceutilitiesID`, `int_reservationmindays`, `int_reservationmaxdays`, `int_requirementsdays`, `time_duration`, `time_defaulttime`, `var_availabledays`, `time_availablestart`, `time_availableend`, `bool_withpayment`, `double_fee`, `double_addrate`, `double_priestaddrate`, `int_downpaymentdays`, `int_fullpaymentdays`, `int_downpaymentpercent`, `bool_refundable`, `int_refunddays`, `int_refundpercent`, `bool_withageconstraints`, `int_agemin`, `int_agemax`, `char_servicestatus`, `int_maxcount`) VALUES
(1, 1, NULL, 1, 30, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '08:00:00', '17:00:00', 0, 0, 0, NULL, 0, 0, NULL, 0, NULL, 0, 0, 0, 0, 'Enabled', 0),
(2, 2, NULL, 14, 90, 0, '01:00:00', '11:00:00', '0', '12:00:00', '12:00:00', 1, 300, 50, NULL, 0, 10, NULL, 0, NULL, 0, 1, 11, 0, 'Enabled', 0),
(3, 3, NULL, 14, 90, 0, '01:00:00', '11:00:00', '0', '12:00:00', '12:00:00', 1, 300, 50, NULL, 0, 7, NULL, 0, NULL, 0, 1, 0, 11, 'Enabled', 30),
(4, 4, NULL, 3, 7, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '09:00:00', '17:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 'Enabled', 0),
(5, 5, NULL, 180, 730, 30, '01:30:00', '00:00:00', '2,3,4,5,6', '08:00:00', '15:00:00', 1, 7000, 50, 500, 30, 90, 50, 1, 30, 50, 1, 18, 0, 'Enabled', 2),
(7, 7, NULL, 3, 7, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '09:00:00', '15:00:00', 1, 300, 0, NULL, NULL, 2, NULL, 0, NULL, NULL, 0, NULL, NULL, 'Enabled', 0),
(9, 9, NULL, 14, 90, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '08:00:00', '16:00:00', 1, 1000, 50, NULL, NULL, 10, 50, 0, NULL, 50, 0, 18, NULL, 'Enabled', 5),
(11, 11, NULL, 14, 90, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '08:00:00', '16:00:00', 1, 1000, 50, NULL, NULL, 10, NULL, 0, NULL, NULL, 1, 11, 0, 'Enabled', 5),
(13, NULL, 1, 0, 0, 0, '12:00:00', NULL, '0,1,2,3,4,5,6', '12:00:00', '12:00:00', 1, 100, 0, NULL, 0, 0, NULL, 0, NULL, 0, 0, 0, 0, 'Enabled', 0),
(14, NULL, 2, 0, 0, 0, NULL, NULL, '0', '00:00:00', '00:00:00', 1, 0, 0, NULL, 0, 0, NULL, 1, NULL, NULL, 0, NULL, NULL, 'Enabled', 0),
(15, 12, 3, 7, 30, 0, '01:00:00', NULL, '2,3,4,5,6', '09:00:00', '03:00:00', 0, 0, 0, NULL, 0, 0, NULL, 0, NULL, 0, 0, 0, 0, 'Enabled', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_utilities_client`
--

CREATE TABLE `tbl_utilities_client` (
  `int_clientID` int(11) NOT NULL,
  `var_clientname` varchar(100) NOT NULL,
  `var_clientabbv` varchar(10) DEFAULT NULL,
  `var_clientlocation` varchar(300) NOT NULL,
  `int_clientzipcode` int(11) NOT NULL,
  `var_clienttelephone` varchar(15) NOT NULL,
  `var_clientmobile` varchar(13) NOT NULL,
  `var_clientemail` varchar(100) NOT NULL,
  `var_clientparishpriest` varchar(200) NOT NULL,
  `time_officeopen` time NOT NULL,
  `time_officeclose` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_utilities_client`
--

INSERT INTO `tbl_utilities_client` (`int_clientID`, `var_clientname`, `var_clientabbv`, `var_clientlocation`, `int_clientzipcode`, `var_clienttelephone`, `var_clientmobile`, `var_clientemail`, `var_clientparishpriest`, `time_officeopen`, `time_officeclose`) VALUES
(1, 'Ina ng Lupang Pangako Parish', 'INLPP', 'Phase 1 Lupang Pangako Payatas B Quezon City', 1119, '(02) 500-0239', '09999999999', 'INLPP@yahoo.com', 'Fr. Mike Sandaga', '08:00:00', '17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_utilities_facility`
--

CREATE TABLE `tbl_utilities_facility` (
  `int_utilitiesfacilityID` int(11) NOT NULL,
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
  `char_facilitystatus` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_utilities_facility`
--

INSERT INTO `tbl_utilities_facility` (`int_utilitiesfacilityID`, `int_facilityID`, `int_maxpax`, `var_facilitysize`, `int_reservationmindays`, `int_reservationmaxdays`, `int_requirementsdays`, `var_availabledays`, `time_availablestart`, `time_availableend`, `bool_withpayment`, `double_fee`, `time_feeper`, `double_addrate`, `time_addper`, `int_downpaymentdays`, `int_fullpaymentdays`, `bool_refundable`, `int_refunddays`, `int_refundpercent`, `char_facilitystatus`) VALUES
(1, 1, 100, ' 4.9m x 11.5m (16ft x 37f)', 14, 60, 0, '0,1,2,3,4,5,6', '06:00:00', '20:00:00', 1, 1200, '00:02:40', 300, '00:00:00', 7, 14, 1, 3, 50, 'Can be reserved'),
(2, 2, 200, ' 4.9m x 11.5m (16ft x 37f', 14, 60, 0, '0,1,2,3,4,5,6', '06:00:00', '20:00:00', 1, 1200, '00:02:40', 300, '00:00:00', 7, 10, 1, 3, 50, 'Can be reserved');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_utlities_availabledays`
--

CREATE TABLE `tbl_utlities_availabledays` (
  `int_availday` int(11) NOT NULL,
  `var_reservationtype` varchar(11) NOT NULL,
  `int_day` int(11) NOT NULL,
  `var_dayname` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_utlities_availabledays`
--

INSERT INTO `tbl_utlities_availabledays` (`int_availday`, `var_reservationtype`, `int_day`, `var_dayname`) VALUES
(1, 'Special', 1, 'Tuesday'),
(2, 'Special', 2, 'Wednesday'),
(3, 'Special', 3, 'Thursday'),
(4, 'Special', 4, 'Friday'),
(5, 'Special', 5, 'Saturday'),
(6, 'Regular', 6, 'Sunday'),
(7, 'Vacant', 0, 'Monday');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_voucher`
--

CREATE TABLE `tbl_voucher` (
  `int_voucherID` int(11) NOT NULL,
  `int_notifID` int(11) NOT NULL,
  `int_requestID` int(11) NOT NULL,
  `date_issued` date NOT NULL,
  `date_due` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_voucherevents`
--

CREATE TABLE `tbl_voucherevents` (
  `int_voucherID` int(11) NOT NULL,
  `int_eventinfoID` int(11) NOT NULL,
  `date_issued` date NOT NULL,
  `date_due` date NOT NULL,
  `int_userID` int(11) NOT NULL,
  `var_vouchercode` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_voucherevents`
--

INSERT INTO `tbl_voucherevents` (`int_voucherID`, `int_eventinfoID`, `date_issued`, `date_due`, `int_userID`, `var_vouchercode`) VALUES
(14, 45, '2019-03-08', '2019-03-01', 11, 'gGrwDAxz'),
(16, 47, '2019-05-30', '2019-03-01', 11, 'e6Lm59em');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedbride`
--

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
  `var_bconplace` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_wedbride`
--

INSERT INTO `tbl_wedbride` (`int_eventinfoID`, `var_blname`, `var_bfname`, `var_bmname`, `char_bgender`, `var_baddress`, `date_bbirthday`, `var_bbirthplace`, `var_bnationality`, `var_bcivilstatus`, `var_breligion`, `var_boccupation`, `bool_bpregnant`, `var_bfathername`, `var_bfatherbplace`, `var_bfatherreligion`, `var_bmothername`, `var_bmotherbplace`, `var_bmotherreligion`, `var_bcurrparish`, `bool_bbaptized`, `date_bbapdate`, `var_bbapplace`, `bool_bconfirmed`, `date_bcondate`, `var_bconplace`) VALUES
(47, 'asdf', 'asdf', '', 'Female', 'adsf', '1998-11-11', 'asdf', 'Filipino', 'Single', 'Catholic', 'asdf', 0, 'asdf', 'Catholic', 'adsf', 'asdf', 'Catholic', 'a', NULL, 0, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedcases`
--

CREATE TABLE `tbl_wedcases` (
  `int_wedcaseID` int(11) NOT NULL,
  `var_casedesc` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_wedcases`
--

INSERT INTO `tbl_wedcases` (`int_wedcaseID`, `var_casedesc`) VALUES
(1, 'Renewal of vows'),
(2, 'Pregnant bride'),
(3, 'Non-catholic '),
(4, 'Foreigner'),
(5, 'No religion '),
(6, 'Divorced'),
(7, 'Widow/widower'),
(8, 'Living-in '),
(9, 'Military'),
(10, 'Minor ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedcouple`
--

CREATE TABLE `tbl_wedcouple` (
  `int_eventinfoID` int(20) NOT NULL,
  `bool_livingin` tinyint(1) NOT NULL,
  `bool_married` tinyint(1) NOT NULL,
  `date_cprevweddate` date DEFAULT NULL,
  `var_cprevwedplace` varchar(100) DEFAULT NULL,
  `int_weddingsteps` int(11) DEFAULT NULL,
  `var_wedcase` varchar(15) DEFAULT NULL,
  `var_folderloc` varchar(15) DEFAULT NULL,
  `var_priestname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_wedcouple`
--

INSERT INTO `tbl_wedcouple` (`int_eventinfoID`, `bool_livingin`, `bool_married`, `date_cprevweddate`, `var_cprevwedplace`, `int_weddingsteps`, `var_wedcase`, `var_folderloc`, `var_priestname`) VALUES
(47, 0, 0, NULL, NULL, 3, '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedgroom`
--

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
  `var_gconplace` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_wedgroom`
--

INSERT INTO `tbl_wedgroom` (`int_eventinfoID`, `var_gnationality`, `var_gcivilstatus`, `var_greligion`, `var_goccupation`, `var_gfathername`, `var_gfatherreligion`, `var_gfatherbplace`, `var_gmothername`, `var_gmotherreligion`, `var_gmotherbplace`, `var_gcurrparish`, `bool_gbaptized`, `date_gbapdate`, `var_gbapplace`, `bool_gconfirmed`, `date_gcondate`, `var_gconplace`) VALUES
(47, 'Filipino', 'Single', 'Catholic', 'adsf', 'asdf', 'Catholic', 'asdf', 'asdf', 'Catholic', 'adsf', 'Ina ng Lupang Pangako Parish', 0, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedschedule`
--

CREATE TABLE `tbl_wedschedule` (
  `int_wedschedID` int(11) NOT NULL,
  `int_scheduleID` int(11) NOT NULL,
  `int_weddingsteps` int(11) NOT NULL,
  `bool_conpriest` tinyint(4) NOT NULL,
  `bool_conguest` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedsteps`
--

CREATE TABLE `tbl_wedsteps` (
  `int_weddingsteps` int(11) NOT NULL,
  `var_weddingstepname` varchar(45) NOT NULL,
  `var_wedstepdesc` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_wedsteps`
--

INSERT INTO `tbl_wedsteps` (`int_weddingsteps`, `var_weddingstepname`, `var_wedstepdesc`) VALUES
(1, 'Reservation', 'Reservation'),
(2, 'Initial Pre-Nuptial Investigation', 'Application'),
(3, 'Payment', 'Payment'),
(4, 'Canonical interview', 'Canonical interview'),
(5, 'Completion of Requirements ', 'Completion of Requirements, issue of marriage banns'),
(6, 'Pre-Cana Seminar/Confirmation/RCIA', 'Pre-Cana Seminar, includes the scheduling of the RCIA/confirmation'),
(7, 'Finalization ', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_baptism`
--
ALTER TABLE `tbl_baptism`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE;

--
-- Indexes for table `tbl_blessing`
--
ALTER TABLE `tbl_blessing`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_document`
--
ALTER TABLE `tbl_document`
  ADD PRIMARY KEY (`int_documentID`);

--
-- Indexes for table `tbl_documentrequest`
--
ALTER TABLE `tbl_documentrequest`
  ADD PRIMARY KEY (`int_requestID`),
  ADD KEY `int_documentID` (`int_documentID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `tbl_documentrequest_ibfk_4_idx` (`int_paymentID`);

--
-- Indexes for table `tbl_documentsevents`
--
ALTER TABLE `tbl_documentsevents`
  ADD PRIMARY KEY (`int_docu_eventID`),
  ADD KEY `tbl_id_event_idx` (`int_eventID`),
  ADD KEY `tbl_id_docu_idx` (`int_documentID`);

--
-- Indexes for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  ADD PRIMARY KEY (`int_eventinfoID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `tbl_eventinfo_ibfk_2_idx` (`int_eventID`),
  ADD KEY `int_paymentID_idx` (`int_paymentID`),
  ADD KEY `tbl_eventinfo_ibfk_3` (`int_userID`),
  ADD KEY `tbl_eventinfo_ibfk_3_idx` (`int_userpriestID`);

--
-- Indexes for table `tbl_facility`
--
ALTER TABLE `tbl_facility`
  ADD PRIMARY KEY (`int_facilityID`);

--
-- Indexes for table `tbl_facilityreservation`
--
ALTER TABLE `tbl_facilityreservation`
  ADD PRIMARY KEY (`int_reservationID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `int_facilityID` (`int_facilityID`);

--
-- Indexes for table `tbl_filecabinets`
--
ALTER TABLE `tbl_filecabinets`
  ADD PRIMARY KEY (`int_cabinetID`);

--
-- Indexes for table `tbl_filedivisions`
--
ALTER TABLE `tbl_filedivisions`
  ADD PRIMARY KEY (`int_divisionID`),
  ADD KEY `int_cabinetID` (`int_cabinetID`);

--
-- Indexes for table `tbl_filefolders`
--
ALTER TABLE `tbl_filefolders`
  ADD PRIMARY KEY (`int_folderID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`),
  ADD KEY `int_divisionID` (`int_divisionID`),
  ADD KEY `int_cabinetID` (`int_cabinetID`);

--
-- Indexes for table `tbl_files`
--
ALTER TABLE `tbl_files`
  ADD PRIMARY KEY (`int_fileID`),
  ADD KEY `int_requirementID` (`int_requirementID`);

--
-- Indexes for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  ADD PRIMARY KEY (`int_houseblessID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_itemdetails`
--
ALTER TABLE `tbl_itemdetails`
  ADD PRIMARY KEY (`int_itemdetailsID`),
  ADD KEY `TBL_IBFK_1_idx` (`int_itemID`),
  ADD KEY `TBL_FK_1_idx` (`int_itemID`),
  ADD KEY `int_itemdID` (`int_itemID`),
  ADD KEY `int_qualityID_idx` (`int_qualityID`);

--
-- Indexes for table `tbl_items`
--
ALTER TABLE `tbl_items`
  ADD PRIMARY KEY (`int_itemID`);

--
-- Indexes for table `tbl_mass`
--
ALTER TABLE `tbl_mass`
  ADD PRIMARY KEY (`int_massID`);

--
-- Indexes for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD PRIMARY KEY (`int_messageID`),
  ADD KEY `int_senderID` (`int_senderID`),
  ADD KEY `int_receiverID` (`int_receiverID`),
  ADD KEY `tbl_message_ibfk_3_idx` (`int_eventinfoID`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`int_notifID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `tbl_notification_ibfk_2_idx` (`int_eventinfoID`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`int_paymentID`);

--
-- Indexes for table `tbl_paymenthistory`
--
ALTER TABLE `tbl_paymenthistory`
  ADD PRIMARY KEY (`int_ORnumber`);

--
-- Indexes for table `tbl_priestsequence`
--
ALTER TABLE `tbl_priestsequence`
  ADD PRIMARY KEY (`int_sequenceID`),
  ADD KEY `int_eventID` (`int_eventID`);

--
-- Indexes for table `tbl_quality`
--
ALTER TABLE `tbl_quality`
  ADD PRIMARY KEY (`int_qualityID`);

--
-- Indexes for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  ADD PRIMARY KEY (`int_relationID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  ADD PRIMARY KEY (`int_requirementID`),
  ADD KEY `int_reqtypeID` (`int_reqtypeID`);

--
-- Indexes for table `tbl_requirementsdocument`
--
ALTER TABLE `tbl_requirementsdocument`
  ADD PRIMARY KEY (`int_requirementsdocumentID`),
  ADD KEY `int_requestID` (`int_requestID`),
  ADD KEY `tbl_requirementsdocument_ibfk_1_idx` (`int_servicereqtypeID`);

--
-- Indexes for table `tbl_requirementsfacility`
--
ALTER TABLE `tbl_requirementsfacility`
  ADD PRIMARY KEY (`int_requirementsfacilityID`),
  ADD KEY `int_reservationID_idx` (`int_reservationID`),
  ADD KEY `int_servicereqtypeID` (`int_servicereqtypeID`);

--
-- Indexes for table `tbl_requirementshouse`
--
ALTER TABLE `tbl_requirementshouse`
  ADD PRIMARY KEY (`int_requirementhouseID`),
  ADD KEY `int_servicereqtypeID` (`int_servicereqtypeID`),
  ADD KEY `int_houseblessID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_requirementsinevents`
--
ALTER TABLE `tbl_requirementsinevents`
  ADD PRIMARY KEY (`int_requirementsineventsID`),
  ADD KEY `tbl_event_idx` (`int_eventinfoID`);

--
-- Indexes for table `tbl_requirementtype`
--
ALTER TABLE `tbl_requirementtype`
  ADD PRIMARY KEY (`int_reqtypeID`),
  ADD KEY `int_eventID` (`int_eventID`);

--
-- Indexes for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  ADD PRIMARY KEY (`int_scheduleID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `int_eventID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_servicereqtype`
--
ALTER TABLE `tbl_servicereqtype`
  ADD PRIMARY KEY (`int_servicereqtypeID`),
  ADD KEY `int_serviceutilitiesID` (`int_serviceutilitiesID`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`int_eventID`);

--
-- Indexes for table `tbl_serviceutilities`
--
ALTER TABLE `tbl_serviceutilities`
  ADD PRIMARY KEY (`int_serviceutilitiesID`);

--
-- Indexes for table `tbl_specialevent`
--
ALTER TABLE `tbl_specialevent`
  ADD PRIMARY KEY (`int_specialeventID`),
  ADD KEY `int_userID` (`int_userID`);

--
-- Indexes for table `tbl_sponsors`
--
ALTER TABLE `tbl_sponsors`
  ADD PRIMARY KEY (`int_sponsorID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`int_userID`);

--
-- Indexes for table `tbl_utilities`
--
ALTER TABLE `tbl_utilities`
  ADD PRIMARY KEY (`int_utilitiesID`),
  ADD KEY `tbl_ibfk1_idx` (`int_eventID`),
  ADD KEY `int_serviceutilitiesID` (`int_serviceutilitiesID`);

--
-- Indexes for table `tbl_utilities_client`
--
ALTER TABLE `tbl_utilities_client`
  ADD PRIMARY KEY (`int_clientID`);

--
-- Indexes for table `tbl_utilities_facility`
--
ALTER TABLE `tbl_utilities_facility`
  ADD PRIMARY KEY (`int_utilitiesfacilityID`),
  ADD KEY `int_facilityID` (`int_facilityID`);

--
-- Indexes for table `tbl_utlities_availabledays`
--
ALTER TABLE `tbl_utlities_availabledays`
  ADD PRIMARY KEY (`int_availday`);

--
-- Indexes for table `tbl_voucher`
--
ALTER TABLE `tbl_voucher`
  ADD PRIMARY KEY (`int_voucherID`),
  ADD KEY `int_notifID_idx` (`int_notifID`),
  ADD KEY `int_requestID_idx` (`int_requestID`);

--
-- Indexes for table `tbl_voucherevents`
--
ALTER TABLE `tbl_voucherevents`
  ADD PRIMARY KEY (`int_voucherID`),
  ADD UNIQUE KEY `var_vouchercode_UNIQUE` (`var_vouchercode`),
  ADD KEY `int_eventinfoID_idx` (`int_eventinfoID`),
  ADD KEY `tbl_ibfk2_idx` (`int_userID`);

--
-- Indexes for table `tbl_wedbride`
--
ALTER TABLE `tbl_wedbride`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE;

--
-- Indexes for table `tbl_wedcases`
--
ALTER TABLE `tbl_wedcases`
  ADD PRIMARY KEY (`int_wedcaseID`);

--
-- Indexes for table `tbl_wedcouple`
--
ALTER TABLE `tbl_wedcouple`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  ADD KEY `int_weddingstep_idx` (`int_weddingsteps`);

--
-- Indexes for table `tbl_wedgroom`
--
ALTER TABLE `tbl_wedgroom`
  ADD UNIQUE KEY `int_eventinfoID_2` (`int_eventinfoID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_wedschedule`
--
ALTER TABLE `tbl_wedschedule`
  ADD PRIMARY KEY (`int_wedschedID`) USING BTREE,
  ADD KEY `int_scheduleID` (`int_scheduleID`);

--
-- Indexes for table `tbl_wedsteps`
--
ALTER TABLE `tbl_wedsteps`
  ADD PRIMARY KEY (`int_weddingsteps`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_document`
--
ALTER TABLE `tbl_document`
  MODIFY `int_documentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_documentrequest`
--
ALTER TABLE `tbl_documentrequest`
  MODIFY `int_requestID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_documentsevents`
--
ALTER TABLE `tbl_documentsevents`
  MODIFY `int_docu_eventID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  MODIFY `int_eventinfoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `tbl_facility`
--
ALTER TABLE `tbl_facility`
  MODIFY `int_facilityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_facilityreservation`
--
ALTER TABLE `tbl_facilityreservation`
  MODIFY `int_reservationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_filecabinets`
--
ALTER TABLE `tbl_filecabinets`
  MODIFY `int_cabinetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_filedivisions`
--
ALTER TABLE `tbl_filedivisions`
  MODIFY `int_divisionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_filefolders`
--
ALTER TABLE `tbl_filefolders`
  MODIFY `int_folderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `int_fileID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  MODIFY `int_houseblessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_itemdetails`
--
ALTER TABLE `tbl_itemdetails`
  MODIFY `int_itemdetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_items`
--
ALTER TABLE `tbl_items`
  MODIFY `int_itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_mass`
--
ALTER TABLE `tbl_mass`
  MODIFY `int_massID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_message`
--
ALTER TABLE `tbl_message`
  MODIFY `int_messageID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `int_paymentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_paymenthistory`
--
ALTER TABLE `tbl_paymenthistory`
  MODIFY `int_ORnumber` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_priestsequence`
--
ALTER TABLE `tbl_priestsequence`
  MODIFY `int_sequenceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_quality`
--
ALTER TABLE `tbl_quality`
  MODIFY `int_qualityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  MODIFY `int_relationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  MODIFY `int_requirementID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `tbl_requirementsdocument`
--
ALTER TABLE `tbl_requirementsdocument`
  MODIFY `int_requirementsdocumentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_requirementsfacility`
--
ALTER TABLE `tbl_requirementsfacility`
  MODIFY `int_requirementsfacilityID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_requirementshouse`
--
ALTER TABLE `tbl_requirementshouse`
  MODIFY `int_requirementhouseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_requirementsinevents`
--
ALTER TABLE `tbl_requirementsinevents`
  MODIFY `int_requirementsineventsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `tbl_requirementtype`
--
ALTER TABLE `tbl_requirementtype`
  MODIFY `int_reqtypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  MODIFY `int_scheduleID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_servicereqtype`
--
ALTER TABLE `tbl_servicereqtype`
  MODIFY `int_servicereqtypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `int_eventID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_serviceutilities`
--
ALTER TABLE `tbl_serviceutilities`
  MODIFY `int_serviceutilitiesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_specialevent`
--
ALTER TABLE `tbl_specialevent`
  MODIFY `int_specialeventID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_sponsors`
--
ALTER TABLE `tbl_sponsors`
  MODIFY `int_sponsorID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_utilities`
--
ALTER TABLE `tbl_utilities`
  MODIFY `int_utilitiesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_utilities_client`
--
ALTER TABLE `tbl_utilities_client`
  MODIFY `int_clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_utilities_facility`
--
ALTER TABLE `tbl_utilities_facility`
  MODIFY `int_utilitiesfacilityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_utlities_availabledays`
--
ALTER TABLE `tbl_utlities_availabledays`
  MODIFY `int_availday` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_voucher`
--
ALTER TABLE `tbl_voucher`
  MODIFY `int_voucherID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_voucherevents`
--
ALTER TABLE `tbl_voucherevents`
  MODIFY `int_voucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_wedcases`
--
ALTER TABLE `tbl_wedcases`
  MODIFY `int_wedcaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_wedschedule`
--
ALTER TABLE `tbl_wedschedule`
  MODIFY `int_wedschedID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_wedsteps`
--
ALTER TABLE `tbl_wedsteps`
  MODIFY `int_weddingsteps` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_baptism`
--
ALTER TABLE `tbl_baptism`
  ADD CONSTRAINT `tbl_baptism_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_blessing`
--
ALTER TABLE `tbl_blessing`
  ADD CONSTRAINT `tbl_blessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_documentrequest`
--
ALTER TABLE `tbl_documentrequest`
  ADD CONSTRAINT `payment` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`),
  ADD CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  ADD CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`);

--
-- Constraints for table `tbl_documentsevents`
--
ALTER TABLE `tbl_documentsevents`
  ADD CONSTRAINT `tbl_id_docu` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  ADD CONSTRAINT `tbl_id_event` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`);

--
-- Constraints for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  ADD CONSTRAINT `int_paymentID` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_2` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_3` FOREIGN KEY (`int_userpriestID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_facilityreservation`
--
ALTER TABLE `tbl_facilityreservation`
  ADD CONSTRAINT `tbl_facilityreservation_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_facilityreservation_ibfk_2` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityID`);

--
-- Constraints for table `tbl_filedivisions`
--
ALTER TABLE `tbl_filedivisions`
  ADD CONSTRAINT `tbl_filedivisions_ibfk_1` FOREIGN KEY (`int_cabinetID`) REFERENCES `tbl_filecabinets` (`int_cabinetID`);

--
-- Constraints for table `tbl_filefolders`
--
ALTER TABLE `tbl_filefolders`
  ADD CONSTRAINT `tbl_filefolders_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`),
  ADD CONSTRAINT `tbl_filefolders_ibfk_2` FOREIGN KEY (`int_divisionID`) REFERENCES `tbl_filedivisions` (`int_divisionID`),
  ADD CONSTRAINT `tbl_filefolders_ibfk_3` FOREIGN KEY (`int_cabinetID`) REFERENCES `tbl_filecabinets` (`int_cabinetID`);

--
-- Constraints for table `tbl_files`
--
ALTER TABLE `tbl_files`
  ADD CONSTRAINT `tbl_files_ibfk_1` FOREIGN KEY (`int_requirementID`) REFERENCES `tbl_requirements` (`int_requirementID`);

--
-- Constraints for table `tbl_itemdetails`
--
ALTER TABLE `tbl_itemdetails`
  ADD CONSTRAINT `int_itemID` FOREIGN KEY (`int_itemID`) REFERENCES `tbl_items` (`int_itemID`),
  ADD CONSTRAINT `int_qualityID` FOREIGN KEY (`int_qualityID`) REFERENCES `tbl_quality` (`int_qualityID`);

--
-- Constraints for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD CONSTRAINT `tbl_message_ibfk_1` FOREIGN KEY (`int_senderID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_message_ibfk_2` FOREIGN KEY (`int_receiverID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_message_ibfk_3` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_notification_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_priestsequence`
--
ALTER TABLE `tbl_priestsequence`
  ADD CONSTRAINT `tbl_priestsequence_ibfk_1` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`);

--
-- Constraints for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  ADD CONSTRAINT `tbl_relation_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  ADD CONSTRAINT `tbl_requirements_ibfk_2` FOREIGN KEY (`int_reqtypeID`) REFERENCES `tbl_requirementtype` (`int_reqtypeID`);

--
-- Constraints for table `tbl_requirementsdocument`
--
ALTER TABLE `tbl_requirementsdocument`
  ADD CONSTRAINT `tbl_requirementsdocument_ibfk_1` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`),
  ADD CONSTRAINT `tbl_requirementsdocument_ibfk_2` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`);

--
-- Constraints for table `tbl_requirementsfacility`
--
ALTER TABLE `tbl_requirementsfacility`
  ADD CONSTRAINT `int_reservationID` FOREIGN KEY (`int_reservationID`) REFERENCES `tbl_facilityreservation` (`int_reservationID`),
  ADD CONSTRAINT `tbl_requirementsfacility_ibfk_1` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`);

--
-- Constraints for table `tbl_requirementshouse`
--
ALTER TABLE `tbl_requirementshouse`
  ADD CONSTRAINT `tbl_requirementshouse_ibfk_2` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeID`),
  ADD CONSTRAINT `tbl_requirementshouse_ibfk_3` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_requirementsinevents`
--
ALTER TABLE `tbl_requirementsinevents`
  ADD CONSTRAINT `tbl_event` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_requirementtype`
--
ALTER TABLE `tbl_requirementtype`
  ADD CONSTRAINT `tbl_requirementtype_ibfk_1` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`);

--
-- Constraints for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  ADD CONSTRAINT `tbl_schedule_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_schedule_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_servicereqtype`
--
ALTER TABLE `tbl_servicereqtype`
  ADD CONSTRAINT `tbl_servicereqtype_ibfk_1` FOREIGN KEY (`int_serviceutilitiesID`) REFERENCES `tbl_serviceutilities` (`int_serviceutilitiesID`);

--
-- Constraints for table `tbl_specialevent`
--
ALTER TABLE `tbl_specialevent`
  ADD CONSTRAINT `tbl_specialevent_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`);

--
-- Constraints for table `tbl_sponsors`
--
ALTER TABLE `tbl_sponsors`
  ADD CONSTRAINT `tbl_sponsors_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_utilities_facility`
--
ALTER TABLE `tbl_utilities_facility`
  ADD CONSTRAINT `tbl_utilities_facility_ibfk_1` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityID`);

--
-- Constraints for table `tbl_voucher`
--
ALTER TABLE `tbl_voucher`
  ADD CONSTRAINT `int_notifID` FOREIGN KEY (`int_notifID`) REFERENCES `tbl_notification` (`int_notifID`),
  ADD CONSTRAINT `int_requestID` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`);

--
-- Constraints for table `tbl_voucherevents`
--
ALTER TABLE `tbl_voucherevents`
  ADD CONSTRAINT `int_eventinfoID` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_ibfk3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_wedcouple`
--
ALTER TABLE `tbl_wedcouple`
  ADD CONSTRAINT `int_weddingstep` FOREIGN KEY (`int_weddingsteps`) REFERENCES `tbl_wedsteps` (`int_weddingsteps`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_wedschedule`
--
ALTER TABLE `tbl_wedschedule`
  ADD CONSTRAINT `tbl_wedschedule_ibfk_1` FOREIGN KEY (`int_scheduleID`) REFERENCES `tbl_schedule` (`int_scheduleID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
