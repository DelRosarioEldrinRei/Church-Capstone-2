-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2019 at 12:05 PM
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
  `var_contactnum` varchar(13) NOT NULL,
  `var_priestname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `date_refunddue` date DEFAULT NULL,
  `var_vouchercode` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 10, 5, 1, 'Nope'),
(2, 16, 5, 2, 'Nope'),
(4, 17, 5, 3, 'Nope'),
(5, 18, 5, 4, 'Next');

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirements`
--

CREATE TABLE `tbl_requirements` (
  `int_requirementID` int(10) NOT NULL,
  `int_reqtypeID` int(11) NOT NULL,
  `var_reqpath` varchar(300) DEFAULT NULL,
  `datetime_reqreceived` datetime DEFAULT NULL,
  `var_reqstatus` varchar(45) NOT NULL,
  `datetime_requirementapproval` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sponsors`
--

CREATE TABLE `tbl_sponsors` (
  `int_sponsorID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `var_sponsorname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tempuser`
--

CREATE TABLE `tbl_tempuser` (
  `int_tempuserID` int(11) NOT NULL,
  `var_userlname` varchar(100) NOT NULL,
  `var_userfname` varchar(100) NOT NULL,
  `var_useraddress` varchar(500) NOT NULL,
  `var_usercontactnum` varchar(15) NOT NULL,
  `var_useremail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(2, 2, NULL, 14, 90, 0, '01:00:00', '11:00:00', '0', '12:00:00', '12:00:00', 1, 300, 50, NULL, 0, 10, NULL, 0, NULL, 0, 1, 11, 0, 'Enabled', 0),
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
  MODIFY `int_eventinfoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

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
  MODIFY `int_folderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `int_fileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  MODIFY `int_houseblessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_mass`
--
ALTER TABLE `tbl_mass`
  MODIFY `int_massID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_message`
--
ALTER TABLE `tbl_message`
  MODIFY `int_messageID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `int_paymentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `tbl_paymenthistory`
--
ALTER TABLE `tbl_paymenthistory`
  MODIFY `int_ORnumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_priestsequence`
--
ALTER TABLE `tbl_priestsequence`
  MODIFY `int_sequenceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  MODIFY `int_relationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  MODIFY `int_requirementID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=428;

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
  MODIFY `int_requirementsineventsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=427;

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
  MODIFY `int_sponsorID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `tbl_tempuser`
--
ALTER TABLE `tbl_tempuser`
  MODIFY `int_tempuserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

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
  MODIFY `int_voucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

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
  ADD CONSTRAINT `tbl_eventinfo_ibfk_3` FOREIGN KEY (`int_userpriestID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_eventinfo_ibfk_4` FOREIGN KEY (`int_tempuserID`) REFERENCES `tbl_tempuser` (`int_tempuserID`);

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
