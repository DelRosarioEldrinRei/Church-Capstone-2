-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2018 at 08:28 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sad_church`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_appointment`
--

CREATE TABLE `tbl_appointment` (
  `char_appointstatus` char(20) NOT NULL,
  `int_userID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blessing`
--

CREATE TABLE `tbl_blessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_blessingvenue` varchar(100) NOT NULL,
  `var_blessingdetails` varchar(100) NOT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_defaulttime`
--

CREATE TABLE `tbl_defaulttime` (
  `int_defaulttimeID` int(11) NOT NULL,
  `time_defaulttime` time NOT NULL,
  `int_eventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_defaulttime`
--

INSERT INTO `tbl_defaulttime` (`int_defaulttimeID`, `time_defaulttime`, `int_eventID`) VALUES
(1, '11:00:00', 3),
(2, '11:00:00', 2);

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
  `char_docustatus` char(20) NOT NULL,
  `date_doceventdate` date NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL
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
(1, 3, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_docureqtype`
--

CREATE TABLE `tbl_docureqtype` (
  `int_docureqtypeID` int(11) NOT NULL,
  `var_reqname` varchar(45) NOT NULL,
  `var_reqdesc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_docureqtype`
--

INSERT INTO `tbl_docureqtype` (`int_docureqtypeID`, `var_reqname`, `var_reqdesc`) VALUES
(1, 'Valid ID', 'Identity of the applicant');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_eventapplication`
--

CREATE TABLE `tbl_eventapplication` (
  `int_eventapplicationID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `char_approvalstatus` char(20) NOT NULL,
  `var_remarks` varchar(20) DEFAULT NULL,
  `int_paymentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_eventinfo`
--

CREATE TABLE `tbl_eventinfo` (
  `int_eventinfoID` int(10) NOT NULL,
  `int_userID` int(10) NOT NULL,
  `int_eventID` int(10) NOT NULL,
  `date_approveddate` date DEFAULT NULL,
  `time_approvedstart` time DEFAULT NULL,
  `time_approvedend` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facility`
--

CREATE TABLE `tbl_facility` (
  `int_facilityID` int(11) NOT NULL,
  `var_facilityname` varchar(50) NOT NULL,
  `var_facilitydesc` varchar(200) DEFAULT NULL,
  `int_maxpax` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_facility`
--

INSERT INTO `tbl_facility` (`int_facilityID`, `var_facilityname`, `var_facilitydesc`, `int_maxpax`) VALUES
(1, 'Bro. Roqueto 2nd floor', 'wut', 100),
(2, 'Bro. Roqueto 3rd floor', 'shittt this\n', 100);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facilityreqtype`
--

CREATE TABLE `tbl_facilityreqtype` (
  `int_facilityreqtypeID` int(11) NOT NULL,
  `var_reqname` varchar(45) NOT NULL,
  `var_reqdesc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_facilityreqtype`
--

INSERT INTO `tbl_facilityreqtype` (`int_facilityreqtypeID`, `var_reqname`, `var_reqdesc`) VALUES
(1, 'Valid ID', 'Proof of Identity of the customer who rent the facility');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facilityreservation`
--

CREATE TABLE `tbl_facilityreservation` (
  `int_reservationID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `int_facilityID` int(11) NOT NULL,
  `var_event` varchar(100) NOT NULL,
  `date_reservedate` date NOT NULL,
  `time_reservestart` time NOT NULL,
  `time_reserveend` time NOT NULL,
  `char_reservestatus` char(50) NOT NULL,
  `int_paymentID` int(11) DEFAULT NULL,
  `var_requirementID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grd3students`
--

CREATE TABLE `tbl_grd3students` (
  `int_studentID` int(10) NOT NULL,
  `int_relationID` int(10) NOT NULL,
  `var_school` varchar(100) NOT NULL,
  `var_batch` varchar(20) NOT NULL,
  `var_section` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_houseblessing`
--

CREATE TABLE `tbl_houseblessing` (
  `int_eventinfoID` int(11) NOT NULL,
  `var_owner` varchar(100) NOT NULL,
  `var_estloc` varchar(100) NOT NULL,
  `var_ownercontactnum` varchar(13) NOT NULL,
  `var_owneremailadd` varchar(50) NOT NULL,
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `var_itemdesc` varchar(45) NOT NULL,
  `var_itemname` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_items`
--

INSERT INTO `tbl_items` (`int_itemID`, `var_itemdesc`, `var_itemname`) VALUES
(1, 'For audience''s sit', 'Chair');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_members`
--

CREATE TABLE `tbl_members` (
  `int_membersID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `int_ministryID` int(11) NOT NULL,
  `var_position` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_message`
--

CREATE TABLE `tbl_message` (
  `int_messageID` int(10) NOT NULL,
  `int_senderID` int(10) NOT NULL,
  `int_receiverID` int(10) NOT NULL,
  `text_message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ministry`
--

CREATE TABLE `tbl_ministry` (
  `int_ministryID` int(11) NOT NULL,
  `var_ministryname` varchar(45) NOT NULL,
  `var_ministrydesc` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ministry`
--

INSERT INTO `tbl_ministry` (`int_ministryID`, `var_ministryname`, `var_ministrydesc`) VALUES
(1, 'Music Ministry', 'Music ministry'),
(2, 'Liturgical Ministry', 'liturgy'),
(3, 'asd', 'ajsidjasid'),
(4, 'Lekaskjdf', 'walaaa'),
(5, 'I''ve got a girl crush', 'I hate to admit it but');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `int_notifID` int(10) NOT NULL,
  `int_userID` int(10) NOT NULL,
  `var_notifdesc` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `int_paymentID` int(10) NOT NULL,
  `dbl_amount` double NOT NULL,
  `char_paymentstatus` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirements`
--

CREATE TABLE `tbl_requirements` (
  `int_requirementID` int(10) NOT NULL,
  `var_reqpath` varchar(300) DEFAULT NULL,
  `var_reqloc` varchar(100) DEFAULT NULL,
  `date_reqreceived` date DEFAULT NULL,
  `int_reqtypeID` int(11) NOT NULL,
  `var_reqstatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementsdocument`
--

CREATE TABLE `tbl_requirementsdocument` (
  `int_requirementdocumentID` int(11) NOT NULL,
  `var_reqpath` varchar(45) NOT NULL,
  `date_reqreceived` date NOT NULL,
  `bool_reqstatus` tinyint(4) NOT NULL,
  `int_requestID` int(11) NOT NULL,
  `int_docureqtypeID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requirementsfacility`
--

CREATE TABLE `tbl_requirementsfacility` (
  `int_requirementsfacilityID` int(11) NOT NULL,
  `var_reqpath` varchar(80) NOT NULL,
  `date_reqreceived` date NOT NULL,
  `bool_reqstatus` tinyint(4) NOT NULL,
  `int_reservationID` int(11) NOT NULL,
  `int_facilityreqtype` int(11) NOT NULL
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
(13, 5, 'Birth Certificate of the Groom', 'Birth Certificate of the Groom', 'Original', 'Civil'),
(14, 5, 'Birth Certificate of the Bride', 'Birth Certificate of the Bride', 'Original', 'Civil'),
(15, 5, 'Baptismal Certificate of the Groom', 'Baptismal Certificate of the groom with FOR MARRIAGE PUSPOSES ONLY annoitation', 'Original', 'Church'),
(16, 5, 'Confirmation Certificate of the Groom', 'Confirmation Certificate of the groom with FOR MARRIAGE PURPOSES ONLY annoitatio', 'Original', 'Church'),
(17, 5, 'Baptismal Certificate of the Bride', 'Baptismal Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ', 'Original', 'Church'),
(18, 5, 'Confirmation Certificate of the Bride', 'Confirmation Certificate of the bride with FOR MARRIAGE PURPOSES ONLY ', 'Original', 'Church'),
(23, 5, 'Marriage License', 'License', 'Original', 'Church'),
(24, 5, 'Marriage Contract', 'contract', 'Original', 'Civil'),
(25, 5, 'NSO CENOMAR', 'NSO Certification of No Marriage', 'Original', 'Civil'),
(26, 5, 'Clearance from Chancery Office', 'Clearance (form 3)', 'Original', 'Chancery'),
(27, 5, 'Certification of Freedom to Marry from Embassy', 'Certification for foreigner', 'Original', 'Civil'),
(28, 5, 'Certification of Freedom to Marry from Chancery', 'certification, for different cases', 'Copy or Original', 'Chancery'),
(29, 5, 'Permission for Mixed Marriage from Chancery', 'Permission for non-catholic', 'Original', 'Chancery'),
(30, 5, 'Affidavit or Co-habitation', 'for couple living in for more than 5 months', 'Original', 'Civil'),
(31, 5, 'Affidavit by the applicant with 2 witnesses', 'for no religion', 'Original', 'Civil'),
(32, 5, 'Dispensation from Chancery', 'Dispensation from Chancery for different cases', 'Original', 'Chancery'),
(33, 5, 'Decree of Divorced', 'for divorced', 'Original', 'Civil'),
(34, 5, 'Civil Annulment Decision with Certification of Finality', 'for divorced', 'Original', 'Civil'),
(35, 5, 'Declaration of Nullity by Catholic Matrimonial Tribunal', 'for divorced', 'Original', 'Civil'),
(36, 5, 'Copy of marriage cert', 'for divorced', 'Copy or Original', 'Civil'),
(37, 5, 'New copy of Marriage Contract', 'for renewal', 'Original', 'Civil'),
(38, 5, 'Copy of Death Certificate', 'for widow/widower', 'Original', 'Civil'),
(39, 5, 'Copy of Marriage Contract', 'for widow/widower', 'Copy or Original', 'Civil'),
(40, 5, 'Military Clearance from Immediate Commanding Office', 'for military ', 'Original', 'Civil'),
(44, 1, 'Birth Certificate', 'Birth Certificate', 'Copy or Original', 'Civil'),
(45, 10, 'Valid ID', 'Valid id', 'Copy', 'Civil'),
(47, 5, 'Valid ID of the Groom', 'Valid ID', 'Copy', 'Civil'),
(48, 5, 'Valid ID of the Bride', 'Valid ID', 'Copy', 'Civil');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedule`
--

CREATE TABLE `tbl_schedule` (
  `int_scheduleID` int(10) NOT NULL,
  `int_userID` int(10) NOT NULL,
  `int_eventinfoID` int(10) NOT NULL,
  `text_schedulenote` text NOT NULL,
  `var_venue` varchar(100) NOT NULL,
  `time_schedstart` time NOT NULL,
  `time_schedend` time NOT NULL,
  `date_schedule` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `int_eventID` int(10) NOT NULL,
  `var_eventname` varchar(50) NOT NULL,
  `var_eventdesc` text NOT NULL,
  `char_type` char(15) NOT NULL,
  `char_status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`int_eventID`, `var_eventname`, `var_eventdesc`, `char_type`, `char_status`) VALUES
(1, 'Anointing of the sick', 'The anointing of the sick is administered to bring spiritual and even physical strength during an illness, especially near the time of death.', 'Sacrament', 'Enabled'),
(2, 'Confirmation', 'The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confirmation is the sacrament of maturity and coming of age. The real confession of Christ consist in this ''that the whole man submits himself to Truth, in the judgment of his understanding, in the submission of his will and in the consecration of his whole power of love.', 'Sacrament', 'Enabled'),
(3, 'Baptism', 'The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead.\r\nWhen the sacrament of Baptism is administered, the spiritual vacuum which we call original sin disappears as God becomes present in the soul, and the soul is caught up into that sharing of God’s own life which we call sanctifying grace.\r\n', 'Sacrament', 'Enabled'),
(4, 'Funeral Service', 'The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. ', 'Special Service', 'Enabled'),
(5, 'Marriage', 'When the Catholic Church teaches that marriage between two baptized persons is a sacrament, it is saying that the couple’s relationship expresses in a unique way the unbreakable bond of love between Christ and his people. Like the other six sacraments of the Church, marriage is a sign or symbol which reveals the Lord Jesus and through which his divine life and love are communicated. \r\nIn a sacramental marriage, God’s love becomes present to the spouses in their total union and also flows through them to their family and community. By their permanent, faithful and exclusive giving to each other, symbolized in sexual intercourse, the couple reveals something of God’s unconditional love. ', 'Sacrament', 'Enabled'),
(6, 'First Communion', 'first communion', 'Sacrament', 'Enabled'),
(7, 'Funeral Mass', 'The rite of committal, the conclusion of the funeral rites, is the final act of the community of faith in caring for the body of its deceased member. It may be celebrated at the grave, tomb, or crematorium and may be used for burial at sea. ', 'Sacrament', 'Enabled'),
(9, 'Special Baptism', 'The sacrament of Baptism is the beginning of life—supernatural life. Because of original sin, we come into the world with a soul which is supernaturally dead.\r\nWhen the sacrament of Baptism is administered, the spiritual vacuum which we call original sin disappears as God becomes present in the soul, and the soul is caught up into that sharing of God’s own life which we call sanctifying grace.\r\n', 'Special Service', 'Enabled'),
(10, 'Establishment Blessing', 'House blessing belongs to the special services that our parish offers. ', 'Special Service', 'Enabled'),
(11, 'Special Confirmation', 'The sacrament of confirmation completes the sacrament of baptism. If baptism is the sacrament of re-birth to a new and supernatural life, confirmation is the sacrament of maturity and coming of age. The real confession of Christ consist in this ''that the whole man submits himself to Truth, in the judgment of his ', 'Special Service', 'Enabled'),
(12, 'Document Request', 'Document request', 'Special Service', 'Enabled');

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
(1, 'Document Request', 'Enabled', 'Request Document ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_specialevent`
--

CREATE TABLE `tbl_specialevent` (
  `int_specialeventID` int(11) NOT NULL,
  `int_userID` int(11) NOT NULL,
  `var_spceventname` varchar(50) NOT NULL,
  `text_eventdesc` text NOT NULL,
  `time_eventstart` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `time_eventend` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `var_eventvenue` varchar(200) NOT NULL,
  `char_eventtype` char(25) NOT NULL,
  `var_approvalstatus` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_specialevent`
--

INSERT INTO `tbl_specialevent` (`int_specialeventID`, `int_userID`, `var_spceventname`, `text_eventdesc`, `time_eventstart`, `time_eventend`, `var_eventvenue`, `char_eventtype`, `var_approvalstatus`) VALUES
(6, 5, 'yieeeut', 'jaijasidjas', '2018-07-28 02:44:00', '2018-07-28 02:44:00', 'bro roqueto', 'Open for everyone', 'Approved'),
(7, 5, 'mass wedding', 'mass wedding', '2018-08-22 04:32:00', '2018-08-22 04:32:00', 'INLPP', 'Open for everyone', 'Approved');

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
  `char_usertype` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `var_userlname`, `var_userfname`, `var_usermname`, `char_usergender`, `var_useraddress`, `var_usercontactnum`, `var_username`, `var_useremail`, `var_password`, `char_usertype`) VALUES
(5, 'Admin', 'admin', 'admin', 'Female', 'Anywhere', '09123456789', 'admin', 'admin@gmail.com', 'admin', 'Admin'),
(6, 'Secretariat', 'Secretariat', 'Secretariat', 'Female', 'Anywhere', '09999999999', 'secretariat', 'secretariat@gmail.com', 'secretariat', 'Secretariat'),
(7, 'Coordinator', 'Coordinator', 'Coordinator', 'Male', 'Anywhere', '09999999999', 'coordinator', 'coordinator@gmail.com', 'coordinator', 'Coordinator'),
(8, 'Catechist', 'Catechist', 'Catechist', 'Female', 'Anywhere', '0999999999', 'catechist', 'catechist', 'catechist', 'Catechist'),
(10, 'Priest', 'Priest', 'Priest', 'Male', 'Anyhwere', '09123456789', 'priest', 'priest@gmail.com', 'priest', 'Priest'),
(11, 'Ebrada', 'Jonalyn Fe', 'Desalisa', 'Female', 'Payatas B Quezon City', '09277475753', 'jonalynfe11', 'jonalynfeebrada11@gmail.com', '123jona', 'Guest'),
(12, 'Macaya', 'Joshua Rae', '', 'Male', 'Caloocan CIty', '09277475711', 'joshuarae', 'joshuarae@gmail.com', '123rae', 'Guest'),
(13, 'Del Rosario', 'Eldrin Rei', 'Dikolam', 'Male', 'Valenzuela City', '09277475742', 'eldrinrei', 'asdfwe', '123eldrin', 'Guest'),
(14, 'Peñaverde', 'Norme Ann Joyce', 'dunno', 'Female', 'Infanta Quezon', '09277475733', 'normeann', 'normeann', '123norme', 'Guest'),
(15, 'Flores', 'Rachel Maiden', 'Laa', 'Female', 'Tondo, Manila', '09999999999', 'rachel', 'rachel@gmail.com', '123rachel', 'Guest');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_utilities`
--

CREATE TABLE `tbl_utilities` (
  `int_utilitiesID` int(11) NOT NULL,
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
  `double_addrate` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_utilities`
--

INSERT INTO `tbl_utilities` (`int_utilitiesID`, `int_eventID`, `int_reservationmindays`, `int_reservationmaxdays`, `int_downpaymentdays`, `int_fullpaymentdays`, `int_requirementsdays`, `bool_refundable`, `int_refundpercentdays`, `double_refundpercent`, `int_agemin`, `int_agemax`, `double_fee`, `time_duration`, `double_addrate`) VALUES
(1, 3, 14, 90, 10, NULL, 7, 0, NULL, NULL, 0, 11, 300, '01:00:00', 50),
(2, 9, 14, 90, 10, NULL, 7, 0, NULL, NULL, 0, NULL, 1000, '01:00:00', 50),
(3, 2, 14, 90, 10, NULL, 7, 0, NULL, NULL, 11, NULL, 300, '01:00:00', 50),
(4, 11, 14, 90, 10, NULL, 7, 0, NULL, NULL, 11, NULL, 1000, '01:00:00', 50),
(5, 4, 3, 7, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '01:00:00', 0),
(6, 7, 3, 7, 2, NULL, 0, 0, NULL, NULL, NULL, NULL, 500, '01:00:00', 0),
(7, 10, 7, 30, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '01:00:00', 0),
(8, 10, 7, 30, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '01:00:00', 0),
(9, 5, 120, 365, 15, 60, 60, 1, 30, 50, 18, NULL, 7000, '01:30:00', 50),
(10, 14, 0, 0, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 100, '00:00:00', 0),
(11, 13, 7, 90, NULL, 3, 0, 1, 75, 50, NULL, NULL, 1200, '00:00:00', 300);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_utilities_availabletime`
--

CREATE TABLE `tbl_utilities_availabletime` (
  `int_utilitiesavailabletimeID` int(11) NOT NULL,
  `time_availabletime` time NOT NULL,
  `int_serviceID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_utilities_availabletime`
--

INSERT INTO `tbl_utilities_availabletime` (`int_utilitiesavailabletimeID`, `time_availabletime`, `int_serviceID`) VALUES
(1, '10:00:00', 3),
(2, '11:00:00', 3),
(3, '13:00:00', 3),
(4, '14:00:00', 3);

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
  `var_bcurrparish` varchar(100) NOT NULL,
  `bool_bbaptized` tinyint(1) NOT NULL,
  `date_bbapdate` date DEFAULT NULL,
  `var_bbapplace` varchar(100) DEFAULT NULL,
  `bool_bconfirmed` tinyint(1) NOT NULL,
  `date_bcondate` date DEFAULT NULL,
  `var_bconplace` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `date_desireddate` date NOT NULL,
  `time_desiredtime` time NOT NULL,
  `int_weddingstepID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_weddingcases`
--

CREATE TABLE `tbl_weddingcases` (
  `int_weddingcaseID` int(11) NOT NULL,
  `var_casename` varchar(45) NOT NULL,
  `var_casedesc` varchar(100) NOT NULL,
  `var_caseprocess` varchar(100) NOT NULL
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
  `var_gcurrparish` varchar(100) NOT NULL,
  `bool_gbaptized` tinyint(1) NOT NULL,
  `date_gbapdate` date DEFAULT NULL,
  `var_gbapplace` varchar(100) DEFAULT NULL,
  `bool_gconfirmed` tinyint(1) NOT NULL,
  `date_gcondate` date DEFAULT NULL,
  `var_gconplace` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wedsteps`
--

CREATE TABLE `tbl_wedsteps` (
  `int_weddingstepID` int(11) NOT NULL,
  `var_weddingstepname` varchar(45) NOT NULL,
  `var_wedstepdesc` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_wedsteps`
--

INSERT INTO `tbl_wedsteps` (`int_weddingstepID`, `var_weddingstepname`, `var_wedstepdesc`) VALUES
(1, 'Reservation', 'Reserving your desired date'),
(2, 'Application Request', 'Filling out forms about the bride and the groom'),
(3, 'Payment', 'Modes of payment: Half or Full Payment.\r\n\r\nYou will be given voucher which you will present on the cashier once you pay. The voucher has expiration date so remember to pay before the deadline. If you haven''t pay before the deadline, your application will be considered as cancelled.'),
(4, 'Canonical Interview', 'This is the part where the couple is interviewed by the priest individually. Canonical interviews are commonly held during Tuesdays, so please spare the date and attend. '),
(5, 'Submission of Requirements', 'The wedding date won''t be settled until you completed the requirements. \r\n\r\nThese are the requirements you need to submit:'),
(6, 'Issue Marriage Banns', 'The Marriage Banns is a public announcement that the parish church is impending between two specified people. The banns must return to the parish after 3 consecutive Sundays, otherwise the marriage is considered cancelled'),
(7, 'Pre-Cana Seminar', 'This is a seminar the couple must attend before they get married. They could attend.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_appointment`
--
ALTER TABLE `tbl_appointment`
  ADD KEY `int_userID` (`int_userID`);

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
-- Indexes for table `tbl_defaulttime`
--
ALTER TABLE `tbl_defaulttime`
  ADD PRIMARY KEY (`int_defaulttimeID`),
  ADD KEY `tbl_ibfk_1_idx` (`int_eventID`);

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
-- Indexes for table `tbl_docureqtype`
--
ALTER TABLE `tbl_docureqtype`
  ADD PRIMARY KEY (`int_docureqtypeID`);

--
-- Indexes for table `tbl_eventapplication`
--
ALTER TABLE `tbl_eventapplication`
  ADD PRIMARY KEY (`int_eventapplicationID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`),
  ADD KEY `tbl_eventapplication_ibfk_1_idx` (`int_paymentID`);

--
-- Indexes for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  ADD PRIMARY KEY (`int_eventinfoID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `tbl_eventinfo_ibfk_2_idx` (`int_eventID`);

--
-- Indexes for table `tbl_facility`
--
ALTER TABLE `tbl_facility`
  ADD PRIMARY KEY (`int_facilityID`);

--
-- Indexes for table `tbl_facilityreqtype`
--
ALTER TABLE `tbl_facilityreqtype`
  ADD PRIMARY KEY (`int_facilityreqtypeID`);

--
-- Indexes for table `tbl_facilityreservation`
--
ALTER TABLE `tbl_facilityreservation`
  ADD PRIMARY KEY (`int_reservationID`),
  ADD KEY `int_userID` (`int_userID`),
  ADD KEY `int_facilityID` (`int_facilityID`);

--
-- Indexes for table `tbl_grd3students`
--
ALTER TABLE `tbl_grd3students`
  ADD PRIMARY KEY (`int_studentID`),
  ADD KEY `int_relationID` (`int_relationID`);

--
-- Indexes for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`);

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
-- Indexes for table `tbl_members`
--
ALTER TABLE `tbl_members`
  ADD PRIMARY KEY (`int_membersID`),
  ADD KEY `tbl_ibfk_1_idx` (`int_userID`),
  ADD KEY `tbl_ibfk_w_idx` (`int_ministryID`);

--
-- Indexes for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD PRIMARY KEY (`int_messageID`),
  ADD KEY `int_senderID` (`int_senderID`),
  ADD KEY `int_receiverID` (`int_receiverID`);

--
-- Indexes for table `tbl_ministry`
--
ALTER TABLE `tbl_ministry`
  ADD PRIMARY KEY (`int_ministryID`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`int_notifID`),
  ADD KEY `int_userID` (`int_userID`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`int_paymentID`);

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
  ADD PRIMARY KEY (`int_requirementdocumentID`),
  ADD KEY `tbl_fk_2_idx` (`int_requestID`),
  ADD KEY `tbl_fk_3_idx` (`int_docureqtypeID`);

--
-- Indexes for table `tbl_requirementsfacility`
--
ALTER TABLE `tbl_requirementsfacility`
  ADD PRIMARY KEY (`int_requirementsfacilityID`),
  ADD KEY `int_reservationID_idx` (`int_reservationID`),
  ADD KEY `int_facilityreqtypeID_idx` (`int_facilityreqtype`);

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
  ADD KEY `tbl_ibfk1_idx` (`int_eventID`);

--
-- Indexes for table `tbl_utilities_availabletime`
--
ALTER TABLE `tbl_utilities_availabletime`
  ADD PRIMARY KEY (`int_utilitiesavailabletimeID`),
  ADD KEY `tbl_ibfk_service_idx` (`int_serviceID`);

--
-- Indexes for table `tbl_wedbride`
--
ALTER TABLE `tbl_wedbride`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE;

--
-- Indexes for table `tbl_wedcouple`
--
ALTER TABLE `tbl_wedcouple`
  ADD UNIQUE KEY `int_eventinfoID` (`int_eventinfoID`) USING BTREE,
  ADD KEY `int_wedstepID` (`int_weddingstepID`);

--
-- Indexes for table `tbl_weddingcases`
--
ALTER TABLE `tbl_weddingcases`
  ADD PRIMARY KEY (`int_weddingcaseID`);

--
-- Indexes for table `tbl_wedgroom`
--
ALTER TABLE `tbl_wedgroom`
  ADD UNIQUE KEY `int_eventinfoID_2` (`int_eventinfoID`),
  ADD KEY `int_eventinfoID` (`int_eventinfoID`);

--
-- Indexes for table `tbl_wedsteps`
--
ALTER TABLE `tbl_wedsteps`
  ADD PRIMARY KEY (`int_weddingstepID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_defaulttime`
--
ALTER TABLE `tbl_defaulttime`
  MODIFY `int_defaulttimeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `int_docu_eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_docureqtype`
--
ALTER TABLE `tbl_docureqtype`
  MODIFY `int_docureqtypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_eventapplication`
--
ALTER TABLE `tbl_eventapplication`
  MODIFY `int_eventapplicationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;
--
-- AUTO_INCREMENT for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  MODIFY `int_eventinfoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;
--
-- AUTO_INCREMENT for table `tbl_facility`
--
ALTER TABLE `tbl_facility`
  MODIFY `int_facilityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_facilityreqtype`
--
ALTER TABLE `tbl_facilityreqtype`
  MODIFY `int_facilityreqtypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_facilityreservation`
--
ALTER TABLE `tbl_facilityreservation`
  MODIFY `int_reservationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_grd3students`
--
ALTER TABLE `tbl_grd3students`
  MODIFY `int_studentID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_itemdetails`
--
ALTER TABLE `tbl_itemdetails`
  MODIFY `int_itemdetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_items`
--
ALTER TABLE `tbl_items`
  MODIFY `int_itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_members`
--
ALTER TABLE `tbl_members`
  MODIFY `int_membersID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_message`
--
ALTER TABLE `tbl_message`
  MODIFY `int_messageID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ministry`
--
ALTER TABLE `tbl_ministry`
  MODIFY `int_ministryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `int_notifID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `int_paymentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `tbl_quality`
--
ALTER TABLE `tbl_quality`
  MODIFY `int_qualityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_relation`
--
ALTER TABLE `tbl_relation`
  MODIFY `int_relationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT for table `tbl_requirements`
--
ALTER TABLE `tbl_requirements`
  MODIFY `int_requirementID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `tbl_requirementsdocument`
--
ALTER TABLE `tbl_requirementsdocument`
  MODIFY `int_requirementdocumentID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_requirementsfacility`
--
ALTER TABLE `tbl_requirementsfacility`
  MODIFY `int_requirementsfacilityID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_requirementsinevents`
--
ALTER TABLE `tbl_requirementsinevents`
  MODIFY `int_requirementsineventsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `tbl_requirementtype`
--
ALTER TABLE `tbl_requirementtype`
  MODIFY `int_reqtypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  MODIFY `int_scheduleID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `int_eventID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_serviceutilities`
--
ALTER TABLE `tbl_serviceutilities`
  MODIFY `int_serviceutilitiesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_specialevent`
--
ALTER TABLE `tbl_specialevent`
  MODIFY `int_specialeventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_sponsors`
--
ALTER TABLE `tbl_sponsors`
  MODIFY `int_sponsorID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_utilities`
--
ALTER TABLE `tbl_utilities`
  MODIFY `int_utilitiesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbl_utilities_availabletime`
--
ALTER TABLE `tbl_utilities_availabletime`
  MODIFY `int_utilitiesavailabletimeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_weddingcases`
--
ALTER TABLE `tbl_weddingcases`
  MODIFY `int_weddingcaseID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_wedsteps`
--
ALTER TABLE `tbl_wedsteps`
  MODIFY `int_weddingstepID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_appointment`
--
ALTER TABLE `tbl_appointment`
  ADD CONSTRAINT `tbl_appointment_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`);

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
-- Constraints for table `tbl_defaulttime`
--
ALTER TABLE `tbl_defaulttime`
  ADD CONSTRAINT `tbl_ibfk` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_documentrequest`
--
ALTER TABLE `tbl_documentrequest`
  ADD CONSTRAINT `payment` FOREIGN KEY (`int_paymentID`) REFERENCES `tbl_payment` (`int_paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_documentrequest_ibfk_1` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`),
  ADD CONSTRAINT `tbl_documentrequest_ibfk_3` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`);

--
-- Constraints for table `tbl_documentsevents`
--
ALTER TABLE `tbl_documentsevents`
  ADD CONSTRAINT `tbl_id_docu` FOREIGN KEY (`int_documentID`) REFERENCES `tbl_document` (`int_documentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_id_event` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_eventapplication`
--
ALTER TABLE `tbl_eventapplication`
  ADD CONSTRAINT `tbl_eventapplication_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_eventinfo`
--
ALTER TABLE `tbl_eventinfo`
  ADD CONSTRAINT `tbl_eventinfo_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_eventinfo_ibfk_2` FOREIGN KEY (`int_eventID`) REFERENCES `tbl_services` (`int_eventID`) ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_facilityreservation`
--
ALTER TABLE `tbl_facilityreservation`
  ADD CONSTRAINT `tbl_facilityreservation_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_facilityreservation_ibfk_2` FOREIGN KEY (`int_facilityID`) REFERENCES `tbl_facility` (`int_facilityID`);

--
-- Constraints for table `tbl_grd3students`
--
ALTER TABLE `tbl_grd3students`
  ADD CONSTRAINT `tbl_grd3students_ibfk_1` FOREIGN KEY (`int_relationID`) REFERENCES `tbl_relation` (`int_relationID`);

--
-- Constraints for table `tbl_houseblessing`
--
ALTER TABLE `tbl_houseblessing`
  ADD CONSTRAINT `tbl_houseblessing_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_itemdetails`
--
ALTER TABLE `tbl_itemdetails`
  ADD CONSTRAINT `int_itemID` FOREIGN KEY (`int_itemID`) REFERENCES `tbl_items` (`int_itemID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `int_qualityID` FOREIGN KEY (`int_qualityID`) REFERENCES `tbl_quality` (`int_qualityID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_members`
--
ALTER TABLE `tbl_members`
  ADD CONSTRAINT `tbl_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_ibfk_w` FOREIGN KEY (`int_ministryID`) REFERENCES `tbl_ministry` (`int_ministryID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD CONSTRAINT `tbl_message_ibfk_1` FOREIGN KEY (`int_senderID`) REFERENCES `tbl_user` (`int_userID`),
  ADD CONSTRAINT `tbl_message_ibfk_2` FOREIGN KEY (`int_receiverID`) REFERENCES `tbl_user` (`int_userID`);

--
-- Constraints for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`int_userID`) REFERENCES `tbl_user` (`int_userID`);

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
  ADD CONSTRAINT `tbl_fk_2` FOREIGN KEY (`int_requestID`) REFERENCES `tbl_documentrequest` (`int_requestID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_fk_3` FOREIGN KEY (`int_docureqtypeID`) REFERENCES `tbl_docureqtype` (`int_docureqtypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_requirementsfacility`
--
ALTER TABLE `tbl_requirementsfacility`
  ADD CONSTRAINT `int_facilityreqtypeID` FOREIGN KEY (`int_facilityreqtype`) REFERENCES `tbl_facilityreqtype` (`int_facilityreqtypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `int_reservationID` FOREIGN KEY (`int_reservationID`) REFERENCES `tbl_facilityreservation` (`int_reservationID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_requirementsinevents`
--
ALTER TABLE `tbl_requirementsinevents`
  ADD CONSTRAINT `tbl_event` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
-- Constraints for table `tbl_utilities_availabletime`
--
ALTER TABLE `tbl_utilities_availabletime`
  ADD CONSTRAINT `tbl_ibfk_service` FOREIGN KEY (`int_serviceID`) REFERENCES `tbl_services` (`int_eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_wedbride`
--
ALTER TABLE `tbl_wedbride`
  ADD CONSTRAINT `tbl_wedbride_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

--
-- Constraints for table `tbl_wedcouple`
--
ALTER TABLE `tbl_wedcouple`
  ADD CONSTRAINT `tbl_wedcouple_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`),
  ADD CONSTRAINT `tbl_wedcouple_ibfk_2` FOREIGN KEY (`int_weddingstepID`) REFERENCES `tbl_wedsteps` (`int_weddingstepID`);

--
-- Constraints for table `tbl_wedgroom`
--
ALTER TABLE `tbl_wedgroom`
  ADD CONSTRAINT `tbl_wedgroom_ibfk_1` FOREIGN KEY (`int_eventinfoID`) REFERENCES `tbl_eventinfo` (`int_eventinfoID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
