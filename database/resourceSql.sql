-- MySQL dump 10.13  Distrib 8.0.13, for Linux (x86_64)
--
-- Host: localhost    Database: resource
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hours`
--

DROP TABLE IF EXISTS `hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hours` (
  `resourceId` int(11) NOT NULL,
  `weekday` varchar(9) NOT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  PRIMARY KEY (`resourceId`,`weekday`),
  CONSTRAINT `hours_ibfk_1` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`resourceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hours`
--

LOCK TABLES `hours` WRITE;
/*!40000 ALTER TABLE `hours` DISABLE KEYS */;
/*!40000 ALTER TABLE `hours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywordType`
--

DROP TABLE IF EXISTS `keywordType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `keywordType` (
  `keywordTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `keywordType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`keywordTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywordType`
--

LOCK TABLES `keywordType` WRITE;
/*!40000 ALTER TABLE `keywordType` DISABLE KEYS */;
/*!40000 ALTER TABLE `keywordType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywordTypeKeyword`
--

DROP TABLE IF EXISTS `keywordTypeKeyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `keywordTypeKeyword` (
  `keywordTypeId` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`keywordTypeId`,`keyword`),
  CONSTRAINT `keywordTypeKeyword_ibfk_1` FOREIGN KEY (`keywordTypeId`) REFERENCES `keywordType` (`keywordtypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywordTypeKeyword`
--

LOCK TABLES `keywordTypeKeyword` WRITE;
/*!40000 ALTER TABLE `keywordTypeKeyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `keywordTypeKeyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perk`
--

DROP TABLE IF EXISTS `perk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `perk` (
  `perkId` int(11) NOT NULL AUTO_INCREMENT,
  `perk` varchar(255) NOT NULL,
  PRIMARY KEY (`perkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perk`
--

LOCK TABLES `perk` WRITE;
/*!40000 ALTER TABLE `perk` DISABLE KEYS */;
/*!40000 ALTER TABLE `perk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource`
--

DROP TABLE IF EXISTS `resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resource` (
  `resourceId` int(11) NOT NULL AUTO_INCREMENT,
  `organization` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `phoneNumber` varchar(10) DEFAULT NULL,
  `tollFree` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`resourceId`),
  UNIQUE KEY `organization` (`organization`),
  KEY `resourceType_frn_typeId` (`typeId`),
  CONSTRAINT `resourceType_frn_typeId` FOREIGN KEY (`typeId`) REFERENCES `resourceType` (`typeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource`
--

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resourceKeyword`
--

DROP TABLE IF EXISTS `resourceKeyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resourceKeyword` (
  `resourceId` int(11) NOT NULL,
  `keywordTypeId` int(11) NOT NULL,
  PRIMARY KEY (`resourceId`,`keywordTypeId`),
  KEY `keywordTypeId` (`keywordTypeId`),
  CONSTRAINT `resourceKeyword_ibfk_1` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`resourceid`),
  CONSTRAINT `resourceKeyword_ibfk_2` FOREIGN KEY (`keywordTypeId`) REFERENCES `keywordType` (`keywordtypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resourceKeyword`
--

LOCK TABLES `resourceKeyword` WRITE;
/*!40000 ALTER TABLE `resourceKeyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `resourceKeyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resourcePerk`
--

DROP TABLE IF EXISTS `resourcePerk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resourcePerk` (
  `resourceId` int(11) NOT NULL,
  `perkId` int(11) NOT NULL,
  PRIMARY KEY (`resourceId`,`perkId`),
  KEY `perkId` (`perkId`),
  CONSTRAINT `resourcePerk_ibfk_1` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`resourceid`),
  CONSTRAINT `resourcePerk_ibfk_2` FOREIGN KEY (`perkId`) REFERENCES `perk` (`perkid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resourcePerk`
--

LOCK TABLES `resourcePerk` WRITE;
/*!40000 ALTER TABLE `resourcePerk` DISABLE KEYS */;
/*!40000 ALTER TABLE `resourcePerk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resourceType`
--

DROP TABLE IF EXISTS `resourceType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resourceType` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resourceType`
--

LOCK TABLES `resourceType` WRITE;
/*!40000 ALTER TABLE `resourceType` DISABLE KEYS */;
/*!40000 ALTER TABLE `resourceType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-14 19:44:30
