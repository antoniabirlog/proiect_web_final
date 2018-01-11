SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE `contactmanager` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `contactmanager`;



CREATE TABLE IF NOT EXISTS `departments` (
`id` smallint(3) unsigned NOT NULL AUTO_INCREMENT,
`depName` varchar(20) DEFAULT  NULL,
`createdAt` timestamp,
`updatedAt` timestamp,
PRIMARY KEY (`id`),
KEY `id`(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=100;

CREATE TABLE IF NOT EXISTS `positions` (

`id` smallint(3) unsigned NOT NULL AUTO_INCREMENT,
`posName` varchar(20) DEFAULT  NULL,
`depId` smallint(3) unsigned,
`createdAt` timestamp,
`updatedAt` timestamp,
PRIMARY KEY (`id`),
KEY `id`(`id`),
FOREIGN KEY (`depId`) REFERENCES departments(`id`)
ON UPDATE CASCADE
ON DELETE CASCADE
) ENGINE = MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `contacts` (
`id` smallint(4) unsigned NOT NULL AUTO_INCREMENT,
`firstName` varchar(30) DEFAULT NULL,
`lastName` varchar(30) DEFAULT NULL,
`phoneNumber` varchar(15) DEFAULT NULL,
`posId` smallint(3) unsigned,
 `createdAt` timestamp,
 `updatedAt` timestamp,
 PRIMARY KEY(`id`),
 FOREIGN KEY (`posId`) REFERENCES positions(`id`),
 KEY `id`(`id`)
 ) ENGINE = MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;