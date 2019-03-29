-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2019 at 12:43 AM
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
-- Database: `db_capstonenew`
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
  `var_contactnum` varchar(13) NOT NULL,
  `var_priestname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_baptism`
--

INSERT INTO `tbl_baptism` (`int_eventinfoID`, `var_parentmarriageadd`, `var_fatherbplace`, `var_motherbplace`, `var_fathername`, `var_mothername`, `var_contactnum`, `var_priestname`) VALUES
(279, 'asdfasdf', 'asdf', '', 'asdfsdf', 'asdfasdf', '09277475753', 'Pabustan, Rafhael'),
(280, 'fasdfasdf', 'asdfas', 'asdfa', 'sdfasdf', 'dfasdf', '09277475753', NULL),
(281, 'asdfasdfasdf', 'asdfasdf', 'asdfasdf', 'asdfasdf', 'sdfasdfadf', '09277475753', 'Sandaga, Mike'),
(282, 'ffasdfasdf', 'fasdf', 'as', 'asdfasd', 'asdfasdf', '09277475753', NULL),
(283, 'sdfasdasdf', 'asdfasdf', 'adsfas', 'asdfasdf', 'dfasdfasd', '09277475753', 'Sandaga, Mike'),
(284, 'asdfasdfasdf', 'asdfa', 'asdfas', 'sdfasdf', 'dfasdfasdf', '09277475753', NULL),
(310, 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', NULL),
(311, 'asdfasdf', 'asdf', 'asdf', 'asdfasdf', 'asdfasdf', '09999999999', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blessing`
--

CREATE TABLE `tbl_blessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_blessingvenue` varchar(100) NOT NULL,
  `var_blessingdetails` varchar(100) NOT NULL,
  `var_priestname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_blessing`
--

INSERT INTO `tbl_blessing` (`int_eventinfoID`, `var_blessingvenue`, `var_blessingdetails`, `var_priestname`) VALUES
(273, 'asdf', 'asdf', 'Pabustan, Rafhael'),
(274, 'asdf', 'asdf', 'Sandaga, Mike'),
(276, 'Ina ng Lupang Pangako Parish', 'asdf', 'Pabustan, Rafhael'),
(277, 'asdf', 'asdf', 'Sandaga, Mike'),
(278, 'asdf', 'asdf', 'Lacsina, Gramar '),
(285, 'sdfasdfasdf', 'asdasdffa', 'Pabustan, Rafhael'),
(286, 'sdffasdf', 'asdfasd', NULL),
(287, 'asdfasasdf', 'dfasdf', 'Lacsina, Gramar '),
(288, 'fasdfasdf', 'asdfasdf', NULL),
(289, 'Ina ng Lupang Pangako', 'asdfasdf', NULL),
(290, 'Ina ng Lupang Pangako', 'sdfadsf', NULL),
(291, 'Ina ng Lupang Pangako', 'adsfasdfasdf', 'Lacsina, Gramar '),
(292, 'Ina ng Lupang Pangako', 'asdfasdfasdf', NULL),
(293, 'Ina ng Lupang Pangako', 'asdfasdfasdf', 'Sandaga, Mike'),
(294, 'Ina ng Lupang Pangako', 'asdfasdf', NULL),
(295, 'Ina ng Lupang Pangako', 'asdfasdf', NULL),
(296, 'Ina ng Lupang Pangako', 'asdfasdfasdf', NULL),
(297, 'Ina ng Lupang Pangako', 'asdfasdfasdf', 'Pabustan, Rafhael'),
(298, 'Ina ng Lupang Pangako', 'asdfasdfasdf', 'Sandaga, Mike'),
(299, 'Ina ng Lupang Pangako', 'asdfadfasdf', 'Lacsina, Gramar '),
(300, 'Ina ng Lupang Pangako', 'asdfasdfasdf', 'Pabustan, Rafhael'),
(301, 'dfasdfasdf', 'sdfasasdf', 'Sandaga, Mike'),
(302, 'fasdfasdf', 'asdfasdf', NULL),
(303, 'asdfasdf', 'asdfasdf', NULL),
(305, 'Ina ng Lupang Pangako', 'asdfasdfasdf', NULL),
(309, 'Ina ng Lupang Pangako', 'asdffsdf', NULL);

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
  `int_userID` int(11) DEFAULT NULL,
  `int_tempuserID` int(11) DEFAULT NULL,
  `int_serviceutilitiesID` int(11) DEFAULT '1',
  `int_documentID` int(11) NOT NULL,
  `int_eventinfoID` int(11) DEFAULT NULL,
  `var_doclastname` varchar(50) NOT NULL,
  `var_docfirstname` varchar(50) NOT NULL,
  `date_docbirthday` date NOT NULL,
  `text_purpose` text NOT NULL,
  `date_docurequested` date NOT NULL,
  `date_docureleased` date DEFAULT NULL,
  `date_docureceived` int(11) DEFAULT NULL,
  `char_docustatus` varchar(20) NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  `datetime_signed` datetime DEFAULT NULL,
  `var_requesttype` varchar(15) NOT NULL DEFAULT 'Online'
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

--
-- Dumping data for table `tbl_documentsevents`
--

INSERT INTO `tbl_documentsevents` (`int_docu_eventID`, `int_eventID`, `int_documentID`) VALUES
(1, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_eventinfo`
--

CREATE TABLE `tbl_eventinfo` (
  `int_eventinfoID` int(10) NOT NULL,
  `int_userID` int(10) DEFAULT NULL,
  `int_tempuserID` int(11) DEFAULT NULL,
  `int_eventID` int(10) NOT NULL,
  `date_eventdate` date DEFAULT NULL,
  `time_eventstart` time DEFAULT NULL,
  `time_eventend` time NOT NULL,
  `var_eventstatus` varchar(25) DEFAULT 'In Coming',
  `char_approvalstatus` char(20) NOT NULL DEFAULT 'Pending',
  `int_paymentID` int(11) DEFAULT NULL,
  `int_userpriestID` int(11) DEFAULT NULL,
  `bool_priestrequested` tinyint(4) DEFAULT NULL,
  `char_requirements` varchar(25) DEFAULT NULL,
  `date_approval` date DEFAULT NULL,
  `date_applied` date NOT NULL,
  `var_applicationtype` varchar(25) NOT NULL DEFAULT 'Online',
  `bool_priestapproval` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_eventinfo`
--

INSERT INTO `tbl_eventinfo` (`int_eventinfoID`, `int_userID`, `int_tempuserID`, `int_eventID`, `date_eventdate`, `time_eventstart`, `time_eventend`, `var_eventstatus`, `char_approvalstatus`, `int_paymentID`, `int_userpriestID`, `bool_priestrequested`, `char_requirements`, `date_approval`, `date_applied`, `var_applicationtype`, `bool_priestapproval`) VALUES
(273, NULL, 102, 4, '2019-03-15', '11:00:00', '12:00:00', 'In Coming', 'Approved', NULL, 17, NULL, 'Complete', NULL, '2019-03-19', 'Walk-in', 0),
(274, NULL, 103, 4, '2019-03-19', '10:30:00', '11:30:00', 'In Coming', 'Approved', NULL, 10, NULL, 'Complete', NULL, '2019-03-19', 'Walk-in', 0),
(275, NULL, 104, 12, '0000-00-00', '00:00:00', '00:00:00', 'In Coming', 'Approved', NULL, 16, NULL, 'Complete', NULL, '2019-03-19', 'Walk-in', 0),
(276, NULL, 105, 7, '0000-00-00', '00:00:00', '00:00:00', 'In Coming', 'Approved', 172, 17, NULL, 'Complete', NULL, '2019-03-19', 'Walk-in', 0),
(277, NULL, 106, 4, '2019-03-19', '16:00:00', '17:00:00', 'In Coming', 'Approved', NULL, 10, NULL, 'Complete', NULL, '2019-03-19', 'Walk-in', 0),
(278, NULL, 107, 4, '2019-03-19', '16:30:00', '17:30:00', 'In Coming', 'Approved', NULL, 16, NULL, 'Complete', NULL, '2019-03-19', 'Walk-in', 0),
(279, 11, NULL, 3, '2019-04-28', '12:00:00', '13:00:00', 'In Coming', 'Approved', 173, 17, NULL, 'Complete', NULL, '2019-03-24', 'Online', 0),
(280, 11, NULL, 3, '2019-04-28', '12:00:00', '13:00:00', 'In Coming', 'Pending', 174, NULL, NULL, 'Pending', NULL, '2019-03-24', 'Online', 0),
(281, 11, NULL, 3, '2019-04-28', '12:00:00', '13:00:00', 'Cancelled', 'Cancelled', 175, 10, NULL, 'Complete', '2019-03-30', '2019-03-24', 'Online', 0),
(282, 11, NULL, 9, '2019-04-22', '14:00:00', '15:00:00', 'Cancelled', 'Cancelled', 176, NULL, NULL, 'Pending', '2019-03-30', '2019-03-24', 'Online', 0),
(283, 11, NULL, 9, '2019-04-08', '11:00:00', '12:00:00', 'Cancelled', 'Cancelled', 177, 10, NULL, 'Complete', '2019-03-30', '2019-03-24', 'Online', 0),
(284, 11, NULL, 9, '2019-04-17', '14:30:00', '15:30:00', 'In Coming', 'Pending', 178, NULL, NULL, 'Pending', NULL, '2019-03-24', 'Online', 0),
(285, NULL, 108, 1, '2019-03-26', '14:00:00', '15:00:00', 'In Coming', 'Approved', NULL, 17, NULL, 'Complete', NULL, '2019-03-24', 'No account', 0),
(286, 11, NULL, 1, '2019-04-02', '15:30:00', '16:30:00', 'In Coming', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(287, 11, NULL, 1, '2019-03-26', '15:00:00', '16:00:00', 'In Coming', 'Approved', NULL, 16, NULL, 'Complete', NULL, '2019-03-24', 'Online', 0),
(288, 11, NULL, 1, '2019-03-31', '10:00:00', '11:00:00', 'In Coming', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(289, 11, NULL, 7, '2019-04-03', '16:30:00', '17:30:00', 'In Coming', 'Pending', 179, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(290, 11, NULL, 7, '2019-03-27', '15:30:00', '16:30:00', 'In Coming', 'Pending', 180, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(291, 11, NULL, 7, '2019-03-27', '15:30:00', '16:30:00', 'Cancelled', 'Approved', 181, 16, NULL, 'Complete', '2019-03-30', '2019-03-24', 'Online', 0),
(292, 11, NULL, 7, '2019-04-04', '16:00:00', '17:00:00', 'In Coming', 'Pending', 182, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(293, 11, NULL, 7, '2019-03-27', '11:30:00', '12:30:00', 'In Coming', 'Approved', 183, 10, NULL, 'Complete', '2019-03-30', '2019-03-24', 'Online', 0),
(294, 11, NULL, 7, '2019-04-04', '16:00:00', '17:00:00', 'In Coming', 'Pending', 184, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(295, 11, NULL, 7, '2019-04-03', '15:00:00', '16:00:00', 'In Coming', 'Pending', 185, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(296, 11, NULL, 7, '2019-04-02', '15:30:00', '16:30:00', 'In Coming', 'Pending', 186, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(297, 11, NULL, 7, '2019-03-28', '12:00:00', '13:00:00', 'Cancelled', 'Approved', 187, 17, NULL, 'Complete', '2019-03-30', '2019-03-24', 'Online', 0),
(298, 11, NULL, 4, '2019-04-03', '13:00:00', '14:00:00', 'In Coming', 'Approved', NULL, 10, NULL, 'Complete', NULL, '2019-03-24', 'Online', 0),
(299, 11, NULL, 4, '2019-04-03', '15:00:00', '16:00:00', 'In Coming', 'Approved', NULL, 16, NULL, 'Complete', NULL, '2019-03-24', 'Online', 0),
(300, 11, NULL, 4, '2019-03-28', '13:00:00', '14:00:00', 'In Coming', 'Approved', NULL, 17, NULL, 'Complete', NULL, '2019-03-24', 'Online', 0),
(301, NULL, 109, 1, '2019-03-26', '14:30:00', '15:30:00', 'In Coming', 'Approved', NULL, 10, NULL, 'Complete', NULL, '2019-03-24', 'No account', 0),
(302, NULL, 110, 4, '2019-03-28', '14:30:00', '15:30:00', 'In Coming', 'Approved', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'No account', 0),
(303, NULL, 111, 4, '2019-04-04', '16:30:00', '17:30:00', 'In Coming', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'No account', 0),
(305, NULL, 115, 4, '2019-03-27', '12:00:00', '13:00:00', 'In Coming', 'Pending', NULL, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(307, NULL, 117, 7, '2019-04-05', '13:30:00', '14:30:00', 'In Coming', 'Pending', 189, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(308, NULL, 117, 7, '2019-03-30', '15:00:00', '16:00:00', 'In Coming', 'Pending', 190, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(309, NULL, 118, 7, '2019-03-29', '11:00:00', '12:00:00', 'In Coming', 'Pending', 191, NULL, NULL, 'Submitted', NULL, '2019-03-24', 'Online', 0),
(310, NULL, 119, 9, '0000-00-00', '00:00:00', '00:00:00', 'In Coming', 'Approved', 192, NULL, NULL, 'Complete', NULL, '2019-03-25', 'Walk-in', 0),
(311, 11, NULL, 9, '2019-04-24', '14:30:00', '15:30:00', 'In Coming', 'Pending', 193, NULL, NULL, 'Pending', NULL, '2019-03-25', 'Online', 0);

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
  `int_foldernumber` int(11) NOT NULL DEFAULT '1',
  `var_foldername` varchar(50) NOT NULL DEFAULT 'Random- Don''t delete'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_filefolders`
--

INSERT INTO `tbl_filefolders` (`int_folderID`, `int_eventinfoID`, `int_cabinetID`, `int_divisionID`, `int_foldernumber`, `var_foldername`) VALUES
(9, NULL, 1, 1, 1, 'All types'),
(10, NULL, 1, 2, 1, 'All types'),
(11, NULL, 1, 3, 1, 'All types'),
(12, NULL, 1, 4, 1, 'All types'),
(13, NULL, 2, 5, 1, 'All types'),
(14, NULL, 2, 6, 1, 'All types'),
(15, NULL, 2, 7, 1, 'All types'),
(16, NULL, 2, 8, 1, 'All types');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_files`
--

CREATE TABLE `tbl_files` (
  `int_fileID` int(11) NOT NULL,
  `var_fileloc` varchar(50) NOT NULL,
  `int_requirementID` int(11) DEFAULT NULL,
  `int_folderID` int(11) DEFAULT '1',
  `int_divisionID` int(11) DEFAULT NULL,
  `int_cabinetID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_files`
--

INSERT INTO `tbl_files` (`int_fileID`, `var_fileloc`, `int_requirementID`, `int_folderID`, `int_divisionID`, `int_cabinetID`) VALUES
(38, 'A-2Q', 566, 1, 2, 1),
(39, 'A-2Q', 566, 1, 2, 1),
(40, 'A-4Q', 566, 1, 4, 1),
(41, 'A-4Q', 566, 1, 4, 1),
(42, 'A-2Q', 566, 1, 2, 1),
(43, 'B-2Q', 566, 1, 6, 2),
(44, 'A-2Q', 566, 1, 2, 1),
(45, 'A-4Q', 566, 1, 4, 1),
(46, 'B-2Q', 568, 1, 6, 2),
(47, 'B-1Q', 569, 1, 5, 2),
(48, 'A-2Q', 566, 1, 2, 1),
(49, 'B-1Q', 566, 1, 5, 2),
(50, 'A-3Q', 570, 1, 3, 1),
(51, 'A-2Q', 570, 1, 2, 1),
(52, 'A-3Q', 570, 1, 3, 1),
(53, 'A-3Q', 570, 1, 3, 1),
(54, 'B-1Q', 593, 1, 5, 2);

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
  `var_owneremailadd` varchar(50) NOT NULL,
  `var_priestname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_houseblessing`
--

INSERT INTO `tbl_houseblessing` (`int_houseblessID`, `int_eventinfoID`, `var_owner`, `var_estloc`, `var_ownercontactnum`, `var_owneremailadd`, `var_priestname`) VALUES
(6, 275, 'asdf', 'asdf', 'asdf', 'asdf', 'Lacsina, Gramar ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mass`
--

CREATE TABLE `tbl_mass` (
  `int_massID` int(11) NOT NULL,
  `int_priestID` int(11) DEFAULT NULL,
  `time_massstart` time NOT NULL,
  `date_massdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_mass`
--

INSERT INTO `tbl_mass` (`int_massID`, `int_priestID`, `time_massstart`, `date_massdate`) VALUES
(2721, 17, '07:00:00', '2019-04-07'),
(2722, 17, '07:00:00', '2019-04-14'),
(2723, 17, '07:00:00', '2019-04-21'),
(2724, 17, '07:00:00', '2019-04-28'),
(2725, 10, '09:30:00', '2019-04-07'),
(2726, 10, '09:30:00', '2019-04-21'),
(2727, 10, '09:30:00', '2019-04-14'),
(2728, 10, '09:30:00', '2019-04-28'),
(2729, 16, '21:00:00', '2019-04-14'),
(2730, 16, '21:00:00', '2019-04-07'),
(2731, 16, '21:00:00', '2019-04-28'),
(2732, 16, '21:00:00', '2019-04-21');

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
(1, 11, 6, 'Cancellation', 'asdf', '2019-03-29 17:22:15', '2019-03-29 18:05:37', 'Seen', NULL),
(2, 11, 6, 'Cancellation', 'asdfadf', '2019-03-29 17:34:12', '2019-03-29 18:05:38', 'Seen', NULL),
(3, 11, 6, 'Cancellation', 'asdf', '2019-03-29 17:34:26', '2019-03-29 18:05:39', 'Seen', NULL),
(4, 11, 6, 'Cancellation', 'asdf', '2019-03-30 00:42:20', NULL, 'Delivered', NULL),
(5, 11, 6, 'Cancellation', 'asdf', '2019-03-30 00:45:05', NULL, 'Delivered', NULL),
(6, 11, 6, 'Cancellation', 'asdf', '2019-03-30 00:45:51', NULL, 'Delivered', NULL),
(7, 11, 6, 'Cancellation', 'adsf', '2019-03-30 00:48:53', NULL, 'Delivered', NULL),
(8, 11, 6, 'Cancellation', 'adf', '2019-03-30 00:49:27', NULL, 'Delivered', NULL),
(9, 11, 6, 'Cancellation', 'ad', '2019-03-30 00:53:49', NULL, 'Delivered', NULL),
(10, 11, 6, 'Cancellation', 'adsf', '2019-03-30 00:55:14', NULL, 'Delivered', NULL),
(11, 11, 6, 'Cancellation', 'asdf', '2019-03-30 00:57:58', NULL, 'Delivered', NULL),
(12, 11, 6, 'Cancellation', 'asdf', '2019-03-30 01:00:41', NULL, 'Delivered', NULL),
(13, 11, 6, 'Cancellation', 'asdf', '2019-03-30 01:01:20', NULL, 'Delivered', NULL),
(14, 11, 6, 'Cancellation', 'adf', '2019-03-30 01:02:23', NULL, 'Delivered', NULL),
(15, 11, 6, 'Cancellation', 'asdf', '2019-03-30 01:03:26', NULL, 'Delivered', NULL),
(16, 11, 6, 'Cancellation', 'asdf', '2019-03-30 01:05:50', NULL, 'Delivered', NULL),
(17, 11, 6, 'Cancellation', 'adf', '2019-03-30 01:06:00', NULL, 'Delivered', NULL);

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
(186, 17, 'You have been assigned to an event (Funeral Blessing)', NULL, 273, '2019-03-19 00:59:46'),
(187, 10, 'You have been assigned to an event (Funeral Blessing)', NULL, 274, '2019-03-19 01:09:20'),
(188, 16, 'You have been assigned to an event (HOuse Blessing)', NULL, 275, '2019-03-19 01:17:23'),
(189, 17, 'You have been assigned to an event (Funeral Blessing)', NULL, 276, '2019-03-19 01:18:08'),
(190, 10, 'You have been assigned to an event (Funeral Blessing)', NULL, 277, '2019-03-19 01:21:58'),
(191, 16, 'You have been assigned to an event (Funeral Blessing)', NULL, 278, '2019-03-19 01:22:35'),
(192, 11, 'You have completed the payment required for the event you applied to', NULL, 279, '2019-03-25 00:00:23'),
(193, 11, 'Your application is approved', NULL, 279, '2019-03-25 00:00:34'),
(194, 17, 'You have been assigned to an event (Baptism)', NULL, 279, '2019-03-25 00:00:34'),
(195, 11, 'You have completed the payment required for the event you applied to', NULL, 281, '2019-03-25 00:00:44'),
(196, 11, 'Your application is approved', NULL, 281, '2019-03-25 00:01:50'),
(197, 10, 'You have been assigned to an event (Baptism)', NULL, 281, '2019-03-25 00:01:50'),
(198, 11, 'Your payment has been received. Your remaining balance is: 700', NULL, 283, '2019-03-25 00:04:21'),
(199, 11, 'You have completed the payment required for the event you applied to', NULL, 283, '2019-03-25 00:04:35'),
(200, 11, 'Your application is approved', NULL, 283, '2019-03-25 00:04:45'),
(201, 10, 'You have been assigned to an event (Baptism)', NULL, 283, '2019-03-25 00:05:12'),
(202, 17, 'You have been assigned to an event (Anointing of the sick)', NULL, 285, '2019-03-25 00:06:31'),
(203, 10, 'You have been assigned to an event (Anointing of the sick)', NULL, 301, '2019-03-25 00:06:40'),
(204, 11, 'Your application is approved', NULL, 287, '2019-03-25 00:06:47'),
(205, 16, 'You have been assigned to an event (Anointing of the sick)', NULL, 287, '2019-03-25 00:06:47'),
(206, 11, 'Your application is approved', NULL, 300, '2019-03-25 00:08:29'),
(207, 17, 'You have been assigned to an event (Anointing of the sick)', NULL, 300, '2019-03-25 00:08:29'),
(208, 11, 'Your application is approved', NULL, 298, '2019-03-25 00:08:39'),
(209, 10, 'You have been assigned to an event (Anointing of the sick)', NULL, 298, '2019-03-25 00:08:39'),
(210, 11, 'Your application is approved', NULL, 299, '2019-03-25 00:08:48'),
(211, 16, 'You have been assigned to an event (Anointing of the sick)', NULL, 299, '2019-03-25 00:08:48'),
(212, 11, 'Your application is approved', NULL, 297, '2019-03-25 00:09:26'),
(213, 17, 'You have been assigned to an event (Anointing of the sick)', NULL, 297, '2019-03-25 00:09:26'),
(214, 11, 'Your application is approved', NULL, 293, '2019-03-25 00:09:51'),
(215, 10, 'You have been assigned to an event (Anointing of the sick)', NULL, 293, '2019-03-25 00:09:51'),
(216, 11, 'Your application is approved', NULL, 291, '2019-03-25 00:09:58'),
(217, 16, 'You have been assigned to an event (Anointing of the sick)', NULL, 291, '2019-03-25 00:09:58'),
(218, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 281, '2019-03-29 17:22:16'),
(219, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 282, '2019-03-29 17:34:12'),
(220, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 283, '2019-03-29 17:34:26'),
(221, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 293, '2019-03-30 00:45:51'),
(222, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 297, '2019-03-30 00:48:53'),
(223, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 281, '2019-03-30 00:49:27'),
(224, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 293, '2019-03-30 00:53:49'),
(225, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 297, '2019-03-30 00:55:14'),
(226, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 282, '2019-03-30 00:57:58'),
(227, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 297, '2019-03-30 01:00:41'),
(228, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 283, '2019-03-30 01:01:20'),
(229, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 291, '2019-03-30 01:02:23'),
(230, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 282, '2019-03-30 01:03:26'),
(231, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 281, '2019-03-30 01:05:50'),
(232, 6, 'A parishioner has cancelled his/her application/request. See the \"Cancelled Transactions\" to view the details.', NULL, 283, '2019-03-30 01:06:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `int_paymentID` int(10) NOT NULL,
  `dbl_amount` double NOT NULL,
  `dbl_balance` double NOT NULL,
  `dbl_downpaymentamount` double DEFAULT NULL,
  `dbl_refundamount` double NOT NULL DEFAULT '0',
  `dbl_refundedamount` double NOT NULL DEFAULT '0',
  `bool_refunded` tinyint(4) NOT NULL DEFAULT '0',
  `char_paymentstatus` char(10) NOT NULL,
  `datetime_paymentreceived` datetime DEFAULT NULL,
  `date_downpaymentdeadline` date NOT NULL,
  `date_fullpaymentdeadline` date NOT NULL,
  `date_refundissued` date DEFAULT NULL,
  `date_refunddue` date DEFAULT NULL,
  `var_vouchercode` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`int_paymentID`, `dbl_amount`, `dbl_balance`, `dbl_downpaymentamount`, `dbl_refundamount`, `dbl_refundedamount`, `bool_refunded`, `char_paymentstatus`, `datetime_paymentreceived`, `date_downpaymentdeadline`, `date_fullpaymentdeadline`, `date_refundissued`, `date_refunddue`, `var_vouchercode`) VALUES
(172, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-19', '2019-03-21', NULL, NULL, NULL),
(173, 300, 0, NULL, 0, 0, 0, 'Paid', '2019-03-25 00:00:23', '2019-03-24', '2019-03-31', NULL, NULL, NULL),
(174, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-31', NULL, NULL, NULL),
(175, 300, 0, NULL, 0, 0, 1, 'Paid', '2019-03-25 00:00:44', '2019-03-24', '2019-03-31', NULL, NULL, NULL),
(176, 1000, 1000, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-04-03', NULL, NULL, NULL),
(177, 1000, 0, NULL, 500, 500, 1, 'Paid', '2019-03-25 00:04:35', '2019-03-24', '2019-04-03', NULL, NULL, NULL),
(178, 1000, 1000, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-04-03', NULL, NULL, NULL),
(179, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(180, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(181, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(182, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(183, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(184, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(185, 300, 0, NULL, 0, 0, 0, 'Paid', '2019-03-29 14:06:48', '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(186, 300, 0, NULL, 0, 0, 0, 'Paid', '2019-03-29 14:04:26', '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(187, 300, 0, NULL, 150, 0, 0, 'Paid', '2019-03-25 00:09:41', '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(188, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(189, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(190, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(191, 300, 300, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-24', '2019-03-26', NULL, NULL, NULL),
(192, 1150, 1150, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-04-04', '2019-04-04', NULL, NULL, NULL),
(193, 1000, 1000, NULL, 0, 0, 0, 'Unpaid', NULL, '2019-03-25', '2019-04-04', NULL, NULL, NULL);

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

--
-- Dumping data for table `tbl_paymenthistory`
--

INSERT INTO `tbl_paymenthistory` (`int_ORnumber`, `int_paymentID`, `date_paymentdate`, `var_paidby`, `dbl_paymentamount`, `dbl_remainingbalance`) VALUES
(1, 173, '2019-03-25', 'asdf', 300, 0),
(2, 175, '2019-03-25', 'asdf', 300, 0),
(3, 177, '2019-03-25', 'sdsss', 300, 700),
(4, 177, '2019-03-25', 'saa', 700, 0),
(5, 187, '2019-03-25', 'adsf', 300, 0),
(6, 186, '2019-03-29', 'asdf', 300, 0),
(7, 185, '2019-03-29', 'asdf', 300, 0);

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
(1, 10, 5, 1, 'Nope'),
(2, 16, 5, 2, 'Nope'),
(4, 17, 5, 3, 'Next');

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
(224, 273, NULL, 'asdf', 'asdf', 'asdf', 'Male', 'asdf', '2019-03-19', 'asdf'),
(225, 274, NULL, 'asdfasdf', 'asdf', 'asdf', 'Male', 'asdf', '2019-03-19', 'asdf'),
(226, 276, NULL, 'asdf', 'asdf', 'asdf', 'Male', 'asdf', '2019-03-19', 'adsf'),
(227, 277, NULL, 'asdf', 'asdf', 'asdf', 'Male', 'asdf', '2019-03-19', 'asdf'),
(228, 278, NULL, 'sdf', 'asdf', 'asdf', 'Male', 'asdf', '2019-03-19', 'sdf'),
(229, 279, 'Aunt/Uncle', 'asdf', 'asdf', 'asda', 'Male', 'asdfasdasdf', '2018-11-11', 'asdf'),
(230, 280, 'Grandparent', 'asdfasdf', 'asdfasdf', 'asdfasdf', 'Male', 'asdfasdasdf', '2018-11-11', 'asdfas'),
(231, 281, 'Grandparent', 'asdf', 'asdfasd', 'fasdf', 'Male', 'asdfasdfa', '2018-11-11', 'asdfa'),
(232, 282, 'Sibling', 'asdf', 'asdfas', 'dfasdf', 'Male', 'asdfasdsdf', '1998-11-11', 'asdf'),
(233, 283, 'Parent', 'asdf', 'asdfa', 'sdf', 'Male', 'fasdfafasdf', '1998-11-11', 'asdfas'),
(234, 284, 'Parent', 'asdf', 'asdfas', 'dfasdf', 'Male', 'asdfasdf', '1998-11-11', 'asdfasd'),
(235, 285, 'Child', 'asdf', 'asdf', 'asdf', 'Male', 'sdfasdfasdf', '1998-11-11', 'asdf'),
(236, 286, 'Aunt/Uncle', 'asdfasd', 'fas', 'fasdf', 'Male', 'sdffasdf', '1998-11-11', 'adfa'),
(237, 287, 'Child', 'asdfasdf', 'asdf', 'asdfasdf', 'Male', 'asdfasasdf', '1998-11-11', 'asdf'),
(238, 288, 'BF/GF', 'asdfasd', 'fasdfa', 'sdfasdf', 'Male', 'fasdfasdf', '1998-11-11', 'asdfasd'),
(239, 289, 'Nephew/Niece', 'asdfasdf', 'asdfas', 'dfasdf', 'Male', 'asdfasdf', '1998-11-11', 'adfasdf'),
(240, 290, 'Grandparent', 'asdf', 'asdfasd', 'fasdf', 'Male', 'dfasdfaadf', '1998-11-11', 'adsfasdfas'),
(241, 291, 'Parent', 'adfasdf', 'asdfas', 'dfasdf', 'Male', 'sdfasdfasdf', '1998-11-11', 'asdfa'),
(242, 292, 'Parent', 'asdf', 'asdfasd', 'fasdf', 'Male', 'asdfasdf', '1998-11-11', 'asdfasdf'),
(243, 293, 'Grandparent', 'asdf', 'asdfas', 'dfasdf', 'Male', 'asdfasdf', '1998-11-11', 'asdfasdf'),
(244, 294, 'Child', 'asdfasdf', 'asdfas', 'df', 'Male', 'asdfadfasdf', '1998-11-11', 'asdf'),
(245, 295, 'Nephew/Niece', 'adf', 'asdfa', 'sdfasdf', 'Male', 'fasdfadf', '1998-11-11', 'asdfasd'),
(246, 296, 'Parent', 'asdfas', 'dfasdf', 'asdfasd', 'Male', 'fasdfadf', '1998-11-11', 'asdfasd'),
(247, 297, 'Parent', 'asdfas', 'dfasdf', 'asdf', 'Male', 'sdfasdfasdf', '1998-11-11', 'asdfa'),
(248, 298, 'Grandparent', 'asdf', 'asdfasd', 'fasdf', 'Male', 'dfasdfas', '1998-11-11', 'asdfasd'),
(249, 299, 'Friend', 'asdfasdf', 'asdfasd', 'fasdf', 'Male', 'asdfasdf', '1998-11-11', 'asdfasdf'),
(250, 300, 'BF/GF', 'adsf', 'asdfasdf', 'asdf', 'Male', 'asdfasdf', '1998-11-11', 'asdf'),
(251, 301, 'Child', 'asdf', 'asdfa', 'sdf', 'Male', 'dfasdfasdf', '1998-11-11', 'asdfa'),
(252, 302, 'Aunt/Uncle', 'asdf', 'asdf', 'asdf', 'Male', 'fasdfasdf', '1998-11-11', 'asdfasd'),
(253, 303, 'Aunt/Uncle', 'asdfa', 'sdf', 'asdf', 'Male', 'asdfasdf', '1998-11-11', 'asdf'),
(254, 305, 'Friend', 'asdf', 'asdf', 'adsf', 'Male', 'asdfasdf', '1998-11-11', 'asdfasdf'),
(255, 309, 'Child', 'asdfasd', 'fasdf', 'asdf', 'Male', 'asdfasdf', '1998-11-11', 'fasdf'),
(256, 310, NULL, 'asdfa', 'sdf', 'asdf', 'Male', 'asdf', '2019-03-25', 'asdf'),
(257, 311, 'Aunt/Uncle', 'asdf', 'asdf', 'asdf', 'Male', 'asdfasdfasdf', '1998-11-11', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirements`
--

CREATE TABLE `tbl_requirements` (
  `int_requirementID` int(10) NOT NULL,
  `int_reqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(300) DEFAULT NULL,
  `var_reqlocation` varchar(100) DEFAULT NULL,
  `datetime_reqreceived` datetime DEFAULT NULL,
  `var_reqstatus` varchar(45) NOT NULL,
  `datetime_requirementapproval` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requirements`
--

INSERT INTO `tbl_requirements` (`int_requirementID`, `int_reqtypeID`, `var_reqpath`, `var_reqlocation`, `datetime_reqreceived`, `var_reqstatus`, `datetime_requirementapproval`) VALUES
(566, 1, NULL, 'B-1Q', '2019-03-19 00:59:46', 'Approved', NULL),
(568, 48, NULL, 'B-2Q', '2019-03-19 01:17:23', 'Approved', NULL),
(569, 7, NULL, 'B-1Q', '2019-03-19 01:18:08', 'Approved', NULL),
(570, 1, NULL, 'A-3Q', '2019-03-19 01:21:58', 'Approved', NULL),
(571, 1, NULL, NULL, '2019-03-19 01:22:35', 'To be submitted', NULL),
(572, 1, '/img/req/image-1553433388831.jpg', NULL, '2019-03-24 21:16:28', 'Approved', '2019-03-25 00:00:33'),
(573, 1, '/img/req/image-1553433435728.jpg', NULL, '2019-03-24 21:17:16', 'Submitted', NULL),
(574, 1, '/img/req/image-1553433477876.jpg', NULL, '2019-03-24 21:17:57', 'Approved', '2019-03-25 00:01:50'),
(575, 2, '/img/req/image-1553433519989.jpg', NULL, '2019-03-24 21:18:40', 'Submitted', NULL),
(576, 2, '/img/req/image-1553433560246.jpg', NULL, '2019-03-24 21:19:20', 'Approved', '2019-03-25 00:04:44'),
(577, 2, '/img/req/image-1553433599404.jpg', NULL, '2019-03-24 21:19:59', 'Submitted', NULL),
(578, 44, '/img/req/image-1553434111842.jpg', NULL, '2019-03-24 21:28:32', 'Approved', '2019-03-25 00:06:31'),
(579, 44, '/img/req/image-1553434182912.jpg', NULL, '2019-03-24 21:29:43', 'Submitted', NULL),
(580, 44, '/img/req/image-1553434213381.jpg', NULL, '2019-03-24 21:30:13', 'Approved', '2019-03-25 00:06:46'),
(581, 44, '/img/req/image-1553434245461.jpg', NULL, '2019-03-24 21:30:45', 'Submitted', NULL),
(582, 7, '/img/req/image-1553434337694.jpg', NULL, '2019-03-24 21:32:17', 'Submitted', NULL),
(583, 7, '/img/req/image-1553434374374.jpg', NULL, '2019-03-24 21:32:54', 'Submitted', NULL),
(584, 7, '/img/req/image-1553434406407.jpg', NULL, '2019-03-24 21:33:26', 'Approved', '2019-03-25 00:09:57'),
(585, 7, '/img/req/image-1553434448641.jpg', NULL, '2019-03-24 21:34:08', 'Submitted', NULL),
(586, 7, '/img/req/image-1553434736849.jpg', NULL, '2019-03-24 21:38:57', 'Approved', '2019-03-25 00:09:51'),
(587, 7, '/img/req/image-1553435183535.jpg', NULL, '2019-03-24 21:46:23', 'Submitted', NULL),
(588, 7, '/img/req/image-1553435294820.jpg', NULL, '2019-03-24 21:48:15', 'Submitted', NULL),
(589, 7, '/img/req/image-1553435486975.jpg', NULL, '2019-03-24 21:51:27', 'Submitted', NULL),
(590, 7, '/img/req/image-1553435584356.jpg', NULL, '2019-03-24 21:53:04', 'Approved', '2019-03-25 00:09:26'),
(591, 47, '/img/req/image-1553435624371.jpg', NULL, '2019-03-24 21:53:44', 'Approved', '2019-03-25 00:08:39'),
(592, 47, '/img/req/image-1553436075945.jpg', NULL, '2019-03-24 22:01:16', 'Approved', '2019-03-25 00:08:48'),
(593, 47, '/img/req/image-1553436119747.jpg', 'B-1Q', '2019-03-24 22:01:59', 'Approved', '2019-03-25 00:08:29'),
(594, 44, '/img/req/image-1553436197354.jpg', NULL, '2019-03-24 22:03:17', 'Approved', '2019-03-25 00:06:40'),
(595, 47, '/img/req/image-1553436266611.jpg', NULL, '2019-03-24 22:04:26', 'Submitted', NULL),
(596, 47, '/img/req/image-1553436317618.jpg', NULL, '2019-03-24 22:05:17', 'Submitted', NULL),
(597, 47, '/img/req/image-1553437632506.jpg', NULL, '2019-03-24 22:27:12', 'Submitted', NULL),
(598, 7, '/img/req/image-1553443172111.jpg', NULL, '2019-03-24 23:59:32', 'Submitted', NULL),
(599, 2, NULL, NULL, '2019-03-25 00:11:12', 'To be submitted', NULL),
(600, 2, '/img/req/image-1553444104295.jpg', NULL, '2019-03-25 00:15:04', 'Submitted', NULL);

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
(565, 566, 273),
(566, 567, 274),
(567, 568, 275),
(568, 569, 276),
(569, 570, 277),
(570, 571, 278),
(571, 572, 279),
(572, 573, 280),
(573, 574, 281),
(574, 575, 282),
(575, 576, 283),
(576, 577, 284),
(577, 578, 285),
(578, 579, 286),
(579, 580, 287),
(580, 581, 288),
(581, 582, 289),
(582, 583, 290),
(583, 584, 291),
(584, 585, 292),
(585, 586, 293),
(586, 587, 294),
(587, 588, 295),
(588, 589, 296),
(589, 590, 297),
(590, 591, 298),
(591, 592, 299),
(592, 593, 300),
(593, 594, 301),
(594, 595, 302),
(595, 596, 303),
(596, 597, 305),
(597, 598, 309),
(598, 599, 310),
(599, 600, 311);

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
(49, 5, 'RCIA Certificate of the groom', 'RCIA Certificate of the groom', 'Original', 'Additional'),
(50, 5, 'RCIA Certificate of the bride', 'RCIA Certificate of the bride', 'Original', 'Additional'),
(51, 5, 'nbi', 'asdf', 'Copy', 'Civil');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedule`
--

CREATE TABLE `tbl_schedule` (
  `int_scheduleID` int(10) NOT NULL,
  `int_userID` int(10) DEFAULT NULL,
  `int_eventinfoID` int(10) DEFAULT NULL,
  `var_schedulename` varchar(100) DEFAULT NULL,
  `date_sched` date DEFAULT NULL,
  `time_schedstart` time DEFAULT NULL,
  `time_schedend` time DEFAULT NULL,
  `var_venue` varchar(100) NOT NULL,
  `text_schedulenote` text,
  `var_schedstatus` varchar(25) NOT NULL DEFAULT 'Unconfirmed',
  `var_scheduletype` varchar(25) NOT NULL DEFAULT 'Service',
  `var_schedupdate` varchar(25) NOT NULL DEFAULT 'In Coming'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_schedule`
--

INSERT INTO `tbl_schedule` (`int_scheduleID`, `int_userID`, `int_eventinfoID`, `var_schedulename`, `date_sched`, `time_schedstart`, `time_schedend`, `var_venue`, `text_schedulenote`, `var_schedstatus`, `var_scheduletype`, `var_schedupdate`) VALUES
(111, 17, 273, 'Funeral Blessing asdf, asdf', '0000-00-00', '00:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(112, 10, 274, 'Funeral Blessing asdfasdf, asdf', '2019-03-19', '10:30:00', '11:30:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(113, 16, 275, 'Funeral Blessing undefined, undefined', '0000-00-00', '00:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(114, 17, 276, 'Funeral Blessing asdf, asdf', '0000-00-00', '00:00:00', '00:00:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(115, 10, 277, 'Funeral Blessing asdf, asdf', '2019-03-19', '16:00:00', '17:00:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(116, 16, 278, 'Funeral Blessing sdf, asdf', '2019-03-19', '16:30:00', '17:30:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(117, 17, 279, 'Baptism of asdf, asdf', '2019-04-28', '12:00:00', '13:00:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(118, 10, 281, 'Baptism of asdf, asdfasd', '2019-04-28', '12:00:00', '13:00:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(119, 10, 283, 'Baptism of asdf, asdfa', '2019-04-08', '11:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(120, 17, 285, 'Anointing of asdf, asdf', '2019-03-26', '14:00:00', '15:00:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(121, 10, 301, 'Anointing of asdf, asdfa', '2019-03-26', '14:30:00', '15:30:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(122, 16, 287, 'Anointing of asdfasdf, asdf', '2019-03-26', '15:00:00', '16:00:00', 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(123, 17, 300, 'Funeral of adsf, asdfasdf', '2019-03-28', '13:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(124, 10, 298, 'Funeral of asdf, asdfasd', '2019-04-03', '13:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(125, 16, 299, 'Funeral of asdfasdf, asdfasd', '2019-04-03', '15:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(126, 17, 297, 'Funeral of asdfas, dfasdf', '2019-03-28', '12:00:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(127, 10, 293, 'Funeral of asdf, asdfas', '2019-03-27', '11:30:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming'),
(128, 16, 291, 'Funeral of adfasdf, asdfas', '2019-03-27', '15:30:00', NULL, 'INLPP', NULL, 'Unconfirmed', 'Service', 'In Coming');

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
(2, 'Facility Reservation', 'Disabled', 'facility reservationnnn'),
(3, 'House/Business Blessing', 'Disabled', 'house blessing or business blessing or establishment blessing');

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

--
-- Dumping data for table `tbl_specialevent`
--

INSERT INTO `tbl_specialevent` (`int_specialeventID`, `int_userID`, `var_spceventname`, `text_eventdesc`, `time_eventstart`, `time_eventend`, `var_eventvenue`, `char_eventtype`, `var_approvalstatus`, `var_eventpicpath`) VALUES
(1, 6, 'Pre-Cana Seminar', 'Seminar before you get married', '2019-03-26 12:00:00', '2019-03-26 01:00:00', 'INLPP', 'Open for everyone', 'Approved', NULL),
(2, 6, 'Pre-Cana Seminar', 'Seminar before you get married', '2019-04-03 12:00:00', '2019-04-02 13:00:00', 'INLPP', 'Open for everyone', 'Approved', NULL),
(3, 6, 'Pre-Cana Seminar', 'Seminar before you get married', '2019-04-09 12:00:00', '2019-04-09 13:00:00', 'INLPP', 'Open for everyone', 'Approved', NULL),
(4, 6, 'Fiest', 'Fiest', '2019-11-24 12:00:00', '2019-11-24 13:00:00', 'INLPP', 'Open for everyone', 'Approved', NULL);

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
(1, 279, 'asdfaasdf'),
(2, 279, 'sdfasdf'),
(3, 280, 'asdfafasdf'),
(4, 280, 'sdfasd'),
(5, 281, 'asdfasdf'),
(6, 281, 'asdfasdfa'),
(7, 282, 'asdfasd'),
(8, 282, 'fasdfasdf'),
(9, 283, 'asdfasdf'),
(10, 283, 'asdfasdfasdf'),
(11, 284, 'asdfas'),
(12, 284, 'dfasdfasdf'),
(13, 310, 'asdf'),
(14, 310, 'asdf'),
(15, 311, 'asdfasdf'),
(16, 311, 'asdffasdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tempuser`
--

CREATE TABLE `tbl_tempuser` (
  `int_tempuserID` int(11) NOT NULL,
  `var_userlname` varchar(100) NOT NULL,
  `var_userfname` varchar(100) NOT NULL,
  `var_useraddress` varchar(500) DEFAULT NULL,
  `var_usercontactnum` varchar(15) NOT NULL,
  `var_useremail` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_tempuser`
--

INSERT INTO `tbl_tempuser` (`int_tempuserID`, `var_userlname`, `var_userfname`, `var_useraddress`, `var_usercontactnum`, `var_useremail`) VALUES
(102, 'asd', 'asdf', 'asdf', 'asdf', 'adf'),
(103, 'asdf', 'asdfad', 'adfasdf', 'adsf', ''),
(104, 'asdf', 'asdf', 'asdf', 'asdf', 'adsf'),
(105, 'asdf', 'asdf', 'asdf', 'asdf', 'sdf'),
(106, 'asdf', 'asdf', 'asdf', 'asdf', 'asdf'),
(107, 'asdf', 'asdf', 'asdf', 'adsf', 'asfd'),
(108, 'asdf', 'asdf', 'asdfadfasdf', '09277475753', 'asdf@gmail.com'),
(109, 'asfas', 'dfasdf', 'asdfasdf', '09277475753', 'aasdf@gmail.com'),
(110, 'asdf', 'asdfasd', 'fasdfasdf', '09525555555', 'asd@gmaik.com'),
(111, 'asdf', 'asdf', 'asdfaasdf', '09555555555', 'asd@gakadf.com'),
(112, 'asdfa', 'sdfasd', 'fasdfasdf', '09555555555', 'asdasdf@ga.com'),
(113, 'asdf', 'asdf', 'aasdfasdf', '09555555555', 'asdf@ga.xom'),
(114, 'asdf', 'asdf', 'asdfasdf', '09555555555', 'asd@gmail.cim'),
(115, 'asdfa', 'sdf', 'asdfasdf', '09555555555', 'asdf@gmai.ciom'),
(116, 'adfa', 'sdf', 'asdfasdf', '09999999999', 'asfd@fg.com'),
(117, 'adsf', 'adsf', 'asdfadfasdf', '09888888888', 'asdfasdf@gm.com'),
(118, 'asdf', 'asdf', 'asdfdfasdf', '09999999999', 'asd@gmail.com'),
(119, 'asdf', 'asdf', 'asdf', '095555555555', 'asdf@gmailc.om');

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
(17, 'Pabustan', 'Rafhael', 'Dunno', 'Male', 'Antipolo', '09277475753', 'rafh', 'rafh@gmail.com', 'priest', 'Priest', 'Active'),
(18, 'Bunque', 'Loven', 'Dunno', 'Male', 'Marikina ', '09277475753', 'loven', 'loven@gmail.com', 'priest', 'Priest', 'Active');

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
(2, 2, NULL, 14, 90, 0, '01:00:00', '11:00:00', '0,2', '12:00:00', '12:00:00', 1, 300, 50, NULL, 0, 10, NULL, 0, NULL, 0, 1, 11, 0, 'Enabled', 0),
(3, 3, NULL, 14, 90, 0, '01:00:00', '11:00:00', '0', '12:00:00', '12:00:00', 1, 300, 50, NULL, 0, 7, NULL, 0, NULL, 0, 1, 0, 11, 'Enabled', 30),
(4, 4, NULL, 3, 7, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '09:00:00', '17:00:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 'Enabled', 0),
(5, 5, NULL, 180, 730, 30, '01:30:00', '00:00:00', '2,3,4,5,6', '08:00:00', '15:00:00', 1, 7000, 50, 500, 30, 90, 50, 1, 30, 50, 1, 18, 0, 'Enabled', 2),
(7, 7, NULL, 3, 7, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '09:00:00', '15:00:00', 1, 300, 0, NULL, NULL, 2, NULL, 0, NULL, NULL, 0, NULL, NULL, 'Enabled', 0),
(9, 9, NULL, 14, 90, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '08:00:00', '16:00:00', 1, 1000, 50, 500, NULL, 10, 50, 0, NULL, 50, 0, 18, NULL, 'Enabled', 5),
(11, 11, NULL, 14, 90, 0, '01:00:00', '00:00:00', '2,3,4,5,6', '08:00:00', '16:00:00', 1, 1000, 50, NULL, NULL, 10, NULL, 0, NULL, NULL, 1, 11, 0, 'Enabled', 5),
(13, NULL, 1, 0, 0, 0, '12:00:00', NULL, '0,1,2,3,4,5,6', '12:00:00', '12:00:00', 1, 100, 0, NULL, 0, 0, NULL, 0, NULL, 0, 0, 0, 0, 'Enabled', 0),
(14, NULL, 2, 0, 0, 0, NULL, NULL, '0', '00:00:00', '00:00:00', 1, 0, 0, NULL, 0, 0, NULL, 1, NULL, NULL, 0, NULL, NULL, 'Disabled', 0),
(15, 12, NULL, 7, 30, 0, '01:00:00', NULL, '2,3,4,5,6', '09:00:00', '03:00:00', 0, 0, 0, NULL, 0, 0, NULL, 0, NULL, 0, 0, 0, 0, 'Enabled', 0),
(16, NULL, 3, 7, 30, 0, '01:00:00', NULL, '2,3,4,5,6', '09:00:00', '03:00:00', 0, 0, 0, NULL, 0, 0, NULL, 0, NULL, 0, 0, 0, 0, 'Disabled', 0);

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
  `int_eventinfoID` int(11) DEFAULT NULL,
  `int_requestID` int(11) DEFAULT NULL,
  `int_userID` int(11) DEFAULT NULL,
  `int_tempuserID` int(11) DEFAULT NULL,
  `date_issued` date NOT NULL,
  `date_due` date NOT NULL,
  `var_vouchercode` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_voucherevents`
--

INSERT INTO `tbl_voucherevents` (`int_voucherID`, `int_eventinfoID`, `int_requestID`, `int_userID`, `int_tempuserID`, `date_issued`, `date_due`, `var_vouchercode`) VALUES
(116, 276, NULL, 6, NULL, '2019-03-21', '2019-03-19', 'hpfe3y60'),
(117, 279, NULL, 11, NULL, '2019-03-31', '2019-03-24', '1wYdRnqk'),
(118, 280, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'dUO6J0lD'),
(119, 281, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'zXfATwlQ'),
(120, 282, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'GFqPwhkX'),
(121, 283, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'K8DWrt72'),
(122, 284, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'DUgs61Y9'),
(123, 289, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'dXvvhGJ3'),
(124, 290, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'VSuAfqfg'),
(125, 291, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'ecvCzTeP'),
(126, 292, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'rttUKOAn'),
(127, 293, NULL, 11, NULL, '2019-03-31', '2019-03-24', '3ArZYteK'),
(128, 294, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'wKK3eKtc'),
(129, 295, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'Ibo8gjtx'),
(130, 296, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'PNiPOAjd'),
(131, 297, NULL, 11, NULL, '2019-03-31', '2019-03-24', 'oI45HB03'),
(133, 309, NULL, NULL, 118, '2019-03-31', '2019-03-24', 'ndCKTGdu'),
(134, 310, NULL, 6, NULL, '2019-04-04', '2019-03-25', 'UN1tMk9t'),
(135, 311, NULL, 11, NULL, '2019-04-01', '2019-03-25', '0yxC4ZG3');

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
(7, 'Dry-run', 'Practice of the wedding ceremony'),
(8, 'Finalization ', '');

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
  ADD KEY `tbl_eventinfo_ibfk_3_idx` (`int_userpriestID`),
  ADD KEY `int_tempuserID` (`int_tempuserID`);

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
  ADD PRIMARY KEY (`int_fileID`);

--
-- Indexes for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  ADD PRIMARY KEY (`int_houseblessID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_mass`
--
ALTER TABLE `tbl_mass`
  ADD PRIMARY KEY (`int_massID`),
  ADD UNIQUE KEY `UNIQUE` (`time_massstart`,`date_massdate`);

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
-- Indexes for table `tbl_tempuser`
--
ALTER TABLE `tbl_tempuser`
  ADD PRIMARY KEY (`int_tempuserID`);

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
  MODIFY `int_docu_eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  MODIFY `int_eventinfoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=312;

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
  MODIFY `int_folderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `int_fileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  MODIFY `int_houseblessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_mass`
--
ALTER TABLE `tbl_mass`
  MODIFY `int_massID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2733;

--
-- AUTO_INCREMENT for table `tbl_message`
--
ALTER TABLE `tbl_message`
  MODIFY `int_messageID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `int_paymentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `tbl_paymenthistory`
--
ALTER TABLE `tbl_paymenthistory`
  MODIFY `int_ORnumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_priestsequence`
--
ALTER TABLE `tbl_priestsequence`
  MODIFY `int_sequenceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  MODIFY `int_relationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  MODIFY `int_requirementID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=601;

--
-- AUTO_INCREMENT for table `tbl_requirementsdocument`
--
ALTER TABLE `tbl_requirementsdocument`
  MODIFY `int_requirementsdocumentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_requirementshouse`
--
ALTER TABLE `tbl_requirementshouse`
  MODIFY `int_requirementhouseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_requirementsinevents`
--
ALTER TABLE `tbl_requirementsinevents`
  MODIFY `int_requirementsineventsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=600;

--
-- AUTO_INCREMENT for table `tbl_requirementtype`
--
ALTER TABLE `tbl_requirementtype`
  MODIFY `int_reqtypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  MODIFY `int_scheduleID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

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
  MODIFY `int_specialeventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_sponsors`
--
ALTER TABLE `tbl_sponsors`
  MODIFY `int_sponsorID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_tempuser`
--
ALTER TABLE `tbl_tempuser`
  MODIFY `int_tempuserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_utilities`
--
ALTER TABLE `tbl_utilities`
  MODIFY `int_utilitiesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_utilities_client`
--
ALTER TABLE `tbl_utilities_client`
  MODIFY `int_clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `int_voucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

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
  MODIFY `int_weddingsteps` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_baptism`
--
ALTER TABLE `tbl_baptism`
  ADD CONSTRAINT `tbl_baptism_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`);

--
-- Constraints for table `tbl_blessing`
--
ALTER TABLE `tbl_blessing`
  ADD CONSTRAINT `tbl_blessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoid`);

--
-- Constraints for table `tbl_documentrequest`
--
ALTER TABLE `tbl_documentrequest`
  ADD CONSTRAINT `payment` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentid`),
  ADD CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  ADD CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`);

--
-- Constraints for table `tbl_documentsevents`
--
ALTER TABLE `tbl_documentsevents`
  ADD CONSTRAINT `tbl_id_docu` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  ADD CONSTRAINT `tbl_id_event` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`);

--
-- Constraints for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  ADD CONSTRAINT `int_paymentID` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentid`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_2` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_3` FOREIGN KEY (`int_userpriestID`) REFERENCES `tbl_user` (`int_userid`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_4` FOREIGN KEY (`int_tempuserID`) REFERENCES `tbl_tempuser` (`int_tempuserid`);

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
-- Constraints for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD CONSTRAINT `tbl_message_ibfk_1` FOREIGN KEY (`int_senderID`) REFERENCES `tbl_user` (`int_userid`),
  ADD CONSTRAINT `tbl_message_ibfk_2` FOREIGN KEY (`int_receiverID`) REFERENCES `tbl_user` (`int_userid`),
  ADD CONSTRAINT `tbl_message_ibfk_3` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  ADD CONSTRAINT `tbl_notification_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_priestsequence`
--
ALTER TABLE `tbl_priestsequence`
  ADD CONSTRAINT `tbl_priestsequence_ibfk_1` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`);

--
-- Constraints for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  ADD CONSTRAINT `tbl_relation_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  ADD CONSTRAINT `tbl_requirements_ibfk_2` FOREIGN KEY (`int_reqtypeID`) REFERENCES `tbl_requirementtype` (`int_reqtypeid`);

--
-- Constraints for table `tbl_requirementsdocument`
--
ALTER TABLE `tbl_requirementsdocument`
  ADD CONSTRAINT `tbl_requirementsdocument_ibfk_1` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeid`),
  ADD CONSTRAINT `tbl_requirementsdocument_ibfk_2` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`);

--
-- Constraints for table `tbl_requirementshouse`
--
ALTER TABLE `tbl_requirementshouse`
  ADD CONSTRAINT `tbl_requirementshouse_ibfk_2` FOREIGN KEY (`int_servicereqtypeID`) REFERENCES `tbl_servicereqtype` (`int_servicereqtypeid`),
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
  ADD CONSTRAINT `tbl_requirementtype_ibfk_1` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventid`);

--
-- Constraints for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  ADD CONSTRAINT `tbl_schedule_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`),
  ADD CONSTRAINT `tbl_schedule_ibfk_2` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_servicereqtype`
--
ALTER TABLE `tbl_servicereqtype`
  ADD CONSTRAINT `tbl_servicereqtype_ibfk_1` FOREIGN KEY (`int_serviceutilitiesID`) REFERENCES `tbl_serviceutilities` (`int_serviceutilitiesid`);

--
-- Constraints for table `tbl_specialevent`
--
ALTER TABLE `tbl_specialevent`
  ADD CONSTRAINT `tbl_specialevent_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userid`);

--
-- Constraints for table `tbl_sponsors`
--
ALTER TABLE `tbl_sponsors`
  ADD CONSTRAINT `tbl_sponsors_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

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
  ADD CONSTRAINT `int_eventinfoID` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`),
  ADD CONSTRAINT `tbl_ibfk3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`);

--
-- Constraints for table `tbl_wedcouple`
--
ALTER TABLE `tbl_wedcouple`
  ADD CONSTRAINT `int_weddingstep` FOREIGN KEY (`int_weddingsteps`) REFERENCES `tbl_wedsteps` (`int_weddingsteps`);

--
-- Constraints for table `tbl_wedschedule`
--
ALTER TABLE `tbl_wedschedule`
  ADD CONSTRAINT `tbl_wedschedule_ibfk_1` FOREIGN KEY (`int_scheduleID`) REFERENCES `tbl_schedule` (`int_scheduleID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
