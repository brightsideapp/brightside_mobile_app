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
INSERT INTO `hours` VALUES (62,'Friday','09:00:00','16:00:00'),(62,'Monday','09:00:00','16:00:00'),(62,'Saturday','09:00:00','16:00:00'),(62,'Sunday','09:00:00','16:00:00'),(62,'Thursday','09:00:00','16:00:00'),(62,'Tuesday','09:00:00','16:00:00'),(62,'Wednesday','09:00:00','16:00:00'),(63,'Friday','00:00:00','23:59:00'),(63,'Monday','00:00:00','23:59:00'),(63,'Saturday','00:00:00','23:59:00'),(63,'Sunday','00:00:00','23:59:00'),(63,'Thursday','00:00:00','23:59:00'),(63,'Tuesday','00:00:00','23:59:00'),(63,'Wednesday','00:00:00','23:59:00'),(64,'Friday','08:00:00','20:00:00'),(64,'Monday','08:00:00','20:00:00'),(64,'Saturday','08:00:00','20:00:00'),(64,'Sunday','08:00:00','20:00:00'),(64,'Thursday','08:00:00','20:00:00'),(64,'Tuesday','08:00:00','20:00:00'),(64,'Wednesday','08:00:00','20:00:00'),(65,'Friday','09:00:00','14:00:00'),(65,'Monday','09:00:00','18:00:00'),(65,'Saturday','09:00:00','16:00:00'),(65,'Sunday','10:00:00','15:00:00'),(65,'Thursday','09:00:00','18:00:00'),(65,'Tuesday','09:00:00','18:00:00'),(65,'Wednesday','09:00:00','18:00:00'),(66,'Friday','09:00:00','17:00:00'),(66,'Monday','09:00:00','17:00:00'),(66,'Saturday','00:00:00','00:00:00'),(66,'Sunday','00:00:00','00:00:00'),(66,'Thursday','09:00:00','17:00:00'),(66,'Tuesday','09:00:00','17:00:00'),(66,'Wednesday','09:00:00','17:00:00'),(67,'Friday','08:30:00','17:30:00'),(67,'Monday','08:30:00','17:30:00'),(67,'Saturday','00:00:00','00:00:00'),(67,'Sunday','00:00:00','00:00:00'),(67,'Thursday','08:30:00','17:30:00'),(67,'Tuesday','08:30:00','17:30:00'),(67,'Wednesday','08:30:00','17:30:00'),(68,'Friday','09:00:00','16:30:00'),(68,'Monday','09:00:00','16:30:00'),(68,'Saturday','00:00:00','00:00:00'),(68,'Sunday','00:00:00','00:00:00'),(68,'Thursday','09:00:00','16:30:00'),(68,'Tuesday','09:00:00','16:30:00'),(68,'Wednesday','09:00:00','16:30:00'),(69,'Friday','09:00:00','17:00:00'),(69,'Monday','09:00:00','19:00:00'),(69,'Saturday','00:00:00','00:00:00'),(69,'Sunday','00:00:00','00:00:00'),(69,'Thursday','09:00:00','19:00:00'),(69,'Tuesday','09:00:00','19:00:00'),(69,'Wednesday','09:00:00','19:00:00'),(70,'Friday','09:00:00','21:00:00'),(70,'Monday','09:00:00','18:00:00'),(70,'Saturday','09:00:00','17:00:00'),(70,'Sunday','00:00:00','00:00:00'),(70,'Thursday','09:00:00','21:00:00'),(70,'Tuesday','09:00:00','19:00:00'),(70,'Wednesday','09:00:00','18:00:00'),(71,'Friday','08:00:00','21:00:00'),(71,'Monday','08:00:00','21:00:00'),(71,'Saturday','06:30:00','20:00:00'),(71,'Sunday','10:00:00','20:00:00'),(71,'Thursday','08:00:00','21:00:00'),(71,'Tuesday','08:00:00','21:00:00'),(71,'Wednesday','08:00:00','21:00:00'),(72,'Friday','00:00:00','23:59:00'),(72,'Monday','00:00:00','23:59:00'),(72,'Saturday','00:00:00','23:59:00'),(72,'Sunday','00:00:00','23:59:00'),(72,'Thursday','00:00:00','23:59:00'),(72,'Tuesday','00:00:00','23:59:00'),(72,'Wednesday','00:00:00','23:59:00'),(73,'Friday','00:00:00','23:59:00'),(73,'Monday','00:00:00','23:59:00'),(73,'Saturday','00:00:00','23:59:00'),(73,'Sunday','00:00:00','23:59:00'),(73,'Thursday','00:00:00','23:59:00'),(73,'Tuesday','00:00:00','23:59:00'),(73,'Wednesday','00:00:00','23:59:00'),(74,'Friday','08:00:00','18:00:00'),(74,'Monday','08:00:00','18:00:00'),(74,'Saturday','08:30:00','16:30:00'),(74,'Sunday','08:30:00','16:30:00'),(74,'Thursday','08:00:00','18:00:00'),(74,'Tuesday','08:00:00','18:00:00'),(74,'Wednesday','08:00:00','18:00:00'),(75,'Friday','08:00:00','23:00:00'),(75,'Monday','08:00:00','23:00:00'),(75,'Saturday','08:00:00','23:00:00'),(75,'Sunday','08:00:00','23:00:00'),(75,'Thursday','08:00:00','23:00:00'),(75,'Tuesday','08:00:00','23:00:00'),(75,'Wednesday','08:00:00','23:00:00'),(76,'Friday','09:00:00','16:00:00'),(76,'Monday','09:00:00','16:00:00'),(76,'Saturday','00:00:00','00:00:00'),(76,'Sunday','00:00:00','00:00:00'),(76,'Thursday','09:00:00','16:00:00'),(76,'Tuesday','09:00:00','16:00:00'),(76,'Wednesday','09:00:00','16:00:00'),(77,'Friday',NULL,NULL),(77,'Monday',NULL,NULL),(77,'Saturday',NULL,NULL),(77,'Sunday',NULL,NULL),(77,'Thursday',NULL,NULL),(77,'Tuesday',NULL,NULL),(77,'Wednesday',NULL,NULL),(79,'Friday',NULL,NULL),(79,'Monday',NULL,NULL),(79,'Saturday',NULL,NULL),(79,'Sunday',NULL,NULL),(79,'Thursday',NULL,NULL),(79,'Tuesday',NULL,NULL),(79,'Wednesday',NULL,NULL),(80,'Friday','09:00:00','17:00:00'),(80,'Monday','09:00:00','17:00:00'),(80,'Saturday','00:00:00','00:00:00'),(80,'Sunday','00:00:00','00:00:00'),(80,'Thursday','09:00:00','17:00:00'),(80,'Tuesday','09:00:00','17:00:00'),(80,'Wednesday','09:00:00','17:00:00'),(81,'Friday',NULL,NULL),(81,'Monday',NULL,NULL),(81,'Saturday',NULL,NULL),(81,'Sunday',NULL,NULL),(81,'Thursday',NULL,NULL),(81,'Tuesday',NULL,NULL),(81,'Wednesday',NULL,NULL),(82,'Friday','00:00:00','23:59:00'),(82,'Monday','00:00:00','23:59:00'),(82,'Saturday','00:00:00','23:59:00'),(82,'Sunday','00:00:00','23:59:00'),(82,'Thursday','00:00:00','23:59:00'),(82,'Tuesday','00:00:00','23:59:00'),(82,'Wednesday','00:00:00','23:59:00'),(83,'Friday','00:00:00','23:59:00'),(83,'Monday','00:00:00','23:59:00'),(83,'Saturday','00:00:00','23:59:00'),(83,'Sunday','00:00:00','23:59:00'),(83,'Thursday','00:00:00','23:59:00'),(83,'Tuesday','00:00:00','23:59:00'),(83,'Wednesday','00:00:00','23:59:00'),(84,'Friday','08:00:00','17:00:00'),(84,'Monday','08:00:00','17:00:00'),(84,'Saturday','00:00:00','00:00:00'),(84,'Sunday','00:00:00','00:00:00'),(84,'Thursday','08:00:00','17:15:00'),(84,'Tuesday','08:00:00','17:15:00'),(84,'Wednesday','08:00:00','19:00:00'),(85,'Friday','09:00:00','16:45:00'),(85,'Monday','09:00:00','16:45:00'),(85,'Saturday','09:00:00','16:45:00'),(85,'Sunday','09:00:00','16:45:00'),(85,'Thursday','09:00:00','16:45:00'),(85,'Tuesday','09:00:00','16:45:00'),(85,'Wednesday','09:00:00','16:45:00'),(86,'Friday','09:00:00','16:00:00'),(86,'Monday','09:00:00','16:00:00'),(86,'Saturday','00:00:00','00:00:00'),(86,'Sunday','00:00:00','00:00:00'),(86,'Thursday','09:00:00','16:00:00'),(86,'Tuesday','09:00:00','16:00:00'),(86,'Wednesday','09:00:00','16:00:00'),(87,'Friday','09:00:00','17:00:00'),(87,'Monday','09:00:00','17:00:00'),(87,'Saturday','00:00:00','00:00:00'),(87,'Sunday','00:00:00','00:00:00'),(87,'Thursday','09:00:00','17:00:00'),(87,'Tuesday','09:00:00','17:00:00'),(87,'Wednesday','09:00:00','17:00:00'),(88,'Friday','00:00:00','23:59:00'),(88,'Monday','00:00:00','23:59:00'),(88,'Saturday','00:00:00','23:59:00'),(88,'Sunday','00:00:00','23:59:00'),(88,'Thursday','00:00:00','23:59:00'),(88,'Tuesday','00:00:00','23:59:00'),(88,'Wednesday','00:00:00','23:59:00'),(89,'Friday','00:00:00','23:59:00'),(89,'Monday','00:00:00','23:59:00'),(89,'Saturday','00:00:00','23:59:00'),(89,'Sunday','00:00:00','23:59:00'),(89,'Thursday','00:00:00','23:59:00'),(89,'Tuesday','00:00:00','23:59:00'),(89,'Wednesday','00:00:00','23:59:00'),(90,'Friday','09:00:00','17:00:00'),(90,'Monday','09:00:00','17:00:00'),(90,'Saturday','00:00:00','00:00:00'),(90,'Sunday','00:00:00','00:00:00'),(90,'Thursday','09:00:00','17:00:00'),(90,'Tuesday','09:00:00','17:00:00'),(90,'Wednesday','09:00:00','17:00:00'),(91,'Friday','08:30:00','16:30:00'),(91,'Monday','08:30:00','16:30:00'),(91,'Saturday','00:00:00','00:00:00'),(91,'Sunday','00:00:00','00:00:00'),(91,'Thursday','08:30:00','16:30:00'),(91,'Tuesday','08:30:00','16:30:00'),(91,'Wednesday','08:30:00','16:30:00'),(92,'Friday',NULL,NULL),(92,'Monday',NULL,NULL),(92,'Saturday',NULL,NULL),(92,'Sunday',NULL,NULL),(92,'Thursday',NULL,NULL),(92,'Tuesday',NULL,NULL),(92,'Wednesday',NULL,NULL),(93,'Friday','08:30:00','18:30:00'),(93,'Monday','08:30:00','18:30:00'),(93,'Saturday','00:00:00','00:00:00'),(93,'Sunday','00:00:00','00:00:00'),(93,'Thursday','08:30:00','18:30:00'),(93,'Tuesday','08:30:00','18:30:00'),(93,'Wednesday','08:30:00','18:30:00'),(94,'Friday','00:00:00','23:59:00'),(94,'Monday','00:00:00','23:59:00'),(94,'Saturday','00:00:00','23:59:00'),(94,'Sunday','00:00:00','23:59:00'),(94,'Thursday','00:00:00','23:59:00'),(94,'Tuesday','00:00:00','23:59:00'),(94,'Wednesday','00:00:00','23:59:00'),(95,'Friday','07:00:00','22:00:00'),(95,'Monday','07:00:00','22:00:00'),(95,'Saturday','07:00:00','22:00:00'),(95,'Sunday','07:00:00','22:00:00'),(95,'Thursday','07:00:00','22:00:00'),(95,'Tuesday','07:00:00','22:00:00'),(95,'Wednesday','07:00:00','22:00:00'),(96,'Friday','00:00:00','23:59:00'),(96,'Monday','00:00:00','23:59:00'),(96,'Saturday','00:00:00','23:59:00'),(96,'Sunday','00:00:00','23:59:00'),(96,'Thursday','00:00:00','23:59:00'),(96,'Tuesday','00:00:00','23:59:00'),(96,'Wednesday','00:00:00','23:59:00'),(97,'Friday',NULL,NULL),(97,'Monday',NULL,NULL),(97,'Saturday',NULL,NULL),(97,'Sunday',NULL,NULL),(97,'Thursday',NULL,NULL),(97,'Tuesday',NULL,NULL),(97,'Wednesday',NULL,NULL),(98,'Friday','00:00:00','23:59:00'),(98,'Monday','00:00:00','23:59:00'),(98,'Saturday','00:00:00','23:59:00'),(98,'Sunday','00:00:00','23:59:00'),(98,'Thursday','00:00:00','23:59:00'),(98,'Tuesday','00:00:00','23:59:00'),(98,'Wednesday','00:00:00','23:59:00'),(99,'Friday','08:30:00','16:30:00'),(99,'Monday','08:30:00','16:30:00'),(99,'Saturday','00:00:00','00:00:00'),(99,'Sunday','00:00:00','00:00:00'),(99,'Thursday','08:30:00','16:30:00'),(99,'Tuesday','08:30:00','16:30:00'),(99,'Wednesday','08:30:00','12:30:00'),(100,'Friday','00:00:00','23:59:00'),(100,'Monday','00:00:00','23:59:00'),(100,'Saturday','00:00:00','23:59:00'),(100,'Sunday','00:00:00','23:59:00'),(100,'Thursday','00:00:00','23:59:00'),(100,'Tuesday','00:00:00','23:59:00'),(100,'Wednesday','00:00:00','23:59:00'),(101,'Friday','08:30:00','15:30:00'),(101,'Monday','08:30:00','15:30:00'),(101,'Saturday','00:00:00','00:00:00'),(101,'Sunday','00:00:00','00:00:00'),(101,'Thursday','08:30:00','15:30:00'),(101,'Tuesday','08:30:00','15:30:00'),(101,'Wednesday','08:30:00','15:30:00'),(102,'Friday',NULL,NULL),(102,'Monday',NULL,NULL),(102,'Saturday',NULL,NULL),(102,'Sunday',NULL,NULL),(102,'Thursday',NULL,NULL),(102,'Tuesday',NULL,NULL),(102,'Wednesday',NULL,NULL),(103,'Friday','05:30:00','22:30:00'),(103,'Monday','05:30:00','22:30:00'),(103,'Saturday','07:00:00','21:00:00'),(103,'Sunday','07:00:00','21:00:00'),(103,'Thursday','05:30:00','22:30:00'),(103,'Tuesday','05:30:00','22:30:00'),(103,'Wednesday','05:30:00','22:30:00'),(104,'Friday','05:30:00','22:30:00'),(104,'Monday','05:30:00','22:30:00'),(104,'Saturday','07:00:00','21:00:00'),(104,'Sunday','07:00:00','21:00:00'),(104,'Thursday','05:30:00','22:30:00'),(104,'Tuesday','05:30:00','22:30:00'),(104,'Wednesday','05:30:00','22:30:00');
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
  `keywordType` varchar(255) NOT NULL,
  PRIMARY KEY (`keywordTypeId`),
  UNIQUE KEY `keywordType` (`keywordType`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywordType`
--

LOCK TABLES `keywordType` WRITE;
/*!40000 ALTER TABLE `keywordType` DISABLE KEYS */;
INSERT INTO `keywordType` VALUES (21,'abuse'),(26,'activity'),(27,'addiction'),(13,'advocacy'),(20,'clean'),(29,'disability'),(28,'education'),(23,'food'),(19,'health'),(17,'immigrant'),(14,'legal'),(22,'local'),(15,'money'),(25,'police'),(24,'senior'),(18,'support'),(16,'transportation'),(30,'volunteer');
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
INSERT INTO `keywordTypeKeyword` VALUES (13,'advocacy'),(13,'advocate'),(13,'lawyer'),(14,'estate'),(14,'judge'),(14,'justice'),(14,'law'),(14,'lawyer'),(14,'legal'),(14,'victim'),(14,'will'),(15,'accountant'),(15,'debt'),(15,'finance'),(15,'income'),(15,'income tax'),(15,'money'),(16,'bus'),(16,'cab'),(16,'taxi'),(16,'train'),(16,'transit'),(16,'transportation'),(17,'esl'),(17,'immigrant'),(17,'immigration'),(17,'interpreter'),(17,'newcomer'),(17,'refugee'),(17,'translation'),(18,'anxiety'),(18,'bereavement'),(18,'counselling'),(18,'depressed'),(18,'despair'),(18,'distress'),(18,'divorce'),(18,'emotion'),(18,'emotional'),(18,'grief'),(18,'helpless'),(18,'hopeless'),(18,'lonely'),(18,'loss'),(18,'sad'),(18,'suicide'),(18,'support'),(18,'talk'),(19,'anxiety'),(19,'counselling'),(19,'depression'),(19,'doctor'),(19,'health'),(19,'healthcare'),(19,'mental'),(19,'mental health'),(19,'nurse'),(19,'psychiatrist'),(19,'talk'),(20,'clean'),(20,'cleaner'),(20,'cleaning'),(20,'maid'),(20,'tidy'),(21,'abandon'),(21,'abuse'),(21,'hurt'),(21,'neglect'),(22,'community'),(22,'local'),(22,'neighbor'),(22,'neighborhood'),(22,'neighbour'),(22,'next door'),(23,'food'),(23,'food bank'),(23,'food security'),(23,'food services'),(23,'low-cost'),(23,'nutrition'),(23,'pantry'),(24,'senior'),(25,'complaint'),(25,'cops'),(25,'crime'),(25,'noise'),(25,'police'),(25,'report'),(25,'vandalism'),(26,'activities'),(26,'activity'),(26,'event'),(26,'exercise'),(26,'program'),(26,'social'),(27,'addiction'),(27,'drug'),(27,'gambling'),(28,'education'),(28,'school'),(29,'disability'),(30,'volunteer');
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
  PRIMARY KEY (`perkId`),
  UNIQUE KEY `perk` (`perk`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perk`
--

LOCK TABLES `perk` WRITE;
/*!40000 ALTER TABLE `perk` DISABLE KEYS */;
INSERT INTO `perk` VALUES (33,'55+ only'),(28,'Accessible'),(37,'Confidential'),(39,'Emergency'),(27,'Fee for service'),(34,'Free'),(29,'Immigrant services'),(35,'Low-cost'),(31,'Multi-lingual'),(32,'Non-emergency police'),(30,'Phone'),(38,'Reduced-cost'),(36,'West end residents only');
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
  `organization` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(10) DEFAULT NULL,
  `tollFree` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`resourceId`),
  UNIQUE KEY `organization` (`organization`),
  UNIQUE KEY `organization_2` (`organization`),
  UNIQUE KEY `organization_3` (`organization`),
  UNIQUE KEY `organization_4` (`organization`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource`
--

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
INSERT INTO `resource` VALUES (62,'Seniors First BC',NULL,'Advocacy and support for older adults including: law clinic, legal advocacy program, victim services program','www.seniorsfirstbc.ca','6044371940',NULL),(63,'Senior Distress Line',NULL,'The Distress Phone Service provides confidential, non-judgemental, free emotional support, 24 hours a day, 7 days a week for people experiencing feelings of distress, despair, worry, or just want to talk to someone.','www.crisiscentre.bc.ca/distress-services/','6048721234',NULL),(64,'Seniors Abuse and Information Line (SAIL)',NULL,'Safe place for older adults and those who care about them to talk about situations where they feel they are being mistreated, or receive information on elder abuse and prevention','www.seniorsfirstbc.ca','6044371940','18664371940'),(65,'Gordon Neighborhood House','1019 Broughton St, Vancouver, BC V6G 2A7','Community hub in the West End of Vancouver providing programs, volunteering, and events for everyone. Includes a thrift store and food initiatives such as; community lunches, produce marks, etc.','www.gordonhouse.org/','6046832554',NULL),(66,'Frog Hollow Neightborhood House','2131 Renfrew St, Vancouver, BC V5M 4M5','Community hub in the East End of Vancouver providing programs and services for families, seniors and youth. Includes computer labs, childcare, activity programs, social events','http://www.froghollow.bc.ca','6042511225',NULL),(67,'Mount Pleasant Neighborhood House','800 East Broadway Vancouver, BC V5T 1Y1','Community hub in Mount Pleasant area of Vancouver providing programs and services including community lunches, exercise programs, childcare and employment services, plus Better-at-Home program which helps seniors with non-medical care to keep living independently.','http://mpnh.org/','6048798208',NULL),(68,'Little Mountain Neighborhood House','3981 Main St. Vancouver BC V5V 3P3','Community hub in Mount Pleasant area of Vancouver providing programs and multi-lingual services including settlement services, seniors social and excies activities, and food supports.','https://web2.lmnhs.bc.ca/','6048797104',NULL),(69,'Kitsilano Neighbourhood House','2305 West 7th Ave Vancouver, BC  V6K 1Y4','Community hub in the Kitsilano area of Vancouver providing programs and services including child care, income tax clinic, social activities and senior peer supports.','http://www.kitshouse.org/','6047363588',NULL),(70,'South Vancouver Neighborhood House','6470 Victoria Drive Vancouver, BC V5P 3X7','Community hub in South Vancouver providing programs and services including child care, seniors services, and programs for children and youth.','http://www.southvan.org/','6043246212',NULL),(71,'Collingwood Neighborhood House','5288 Joyce St, Vancouver, BC V5R 6C9','Community hub in the Renfrew-Collingwood area of Vancouver providing programs and services including community lunches, seniors services, and programs for children and youth.','http://www.cnh.bc.ca/','6044350323',NULL),(72,'Vancouver Taxi',NULL,'Fee for service taxi cab. Please call to book a trip.',NULL,'6048711111',NULL),(73,'Yellow Cab',NULL,'Fee for service taxi cab. Please call to book a trip.',NULL,'6046811111',NULL),(74,'Handy Dart (Translink)','Vancouver','Door-to-door, shared ride service for passengers with physical or cognitive disabilities who are unable to use conventional public transit without assistance. The driver comes to your door to help you on board and make sure you arrive safely. Are you eligible? Please contact 604-953-3680 to have an application form sent to you.','www.translink.ca/','6045756600','18444756600'),(75,'BC 211','Vancouver','Free information and referral regarding community, government, and social services in BC. Help line includes 211 (general), Alcohol and Drug Information and Referral Service, Problem Gambling Help Line, VictimLink BC, and Youth Against Violence Line.','www.bc211.ca','211',NULL),(76,'411 Seniors Center Society','704-333 Terminal Avenue, Vancouver','Seniors Centre for advocacy, education, and social programs. Includes services such as; information & referral,drop-in centre, income tax clinic, thrift store, resources','www.411seniors.bc.ca/','6046848171',NULL),(77,'Quest Food Exchange','2020 Dundas St. Vancouver','Quest helps to provide food assistance to individuals and families through the non-profit grocery market that offers food at a reduced price. Please contact Brightside for a Referral.','www.questoutreach.org','6046020186',NULL),(79,'Vancouver Cheap Cleaners','Vancouver','Affordable cleaning and de-cluttering services. There is a 3-hour minimum per visit. Please contact to set-up an appointment.','www.vancouvercheapcleaners.com','6042592448',NULL),(80,'BC Bereavement Helpline','Vancouver','Volunteers and staff provide compassionate listening to callers and refer them to bereavement support.',NULL,'6047389950',NULL),(81,'Community Counselling Centre (Gordon Neighbourhood House)','West End 1019 Broughton St.','Provides free counselling services by university interns under the supervision of a registered clinical counsellor to help people cope with loneliness and stress caused by different life circumstances. Concerns addressed include; relationships, divorce, anxiety, stress, depression, grief, loss, health, gender, and others.','www.gordonhouse.org','6046832554',NULL),(82,'Vancouver Crisis Centre','Vancouver','Crisis lines for 24-hour emotional support.',NULL,'6048723311',NULL),(83,'Mental Health Support','BC','This number will connect you to your local BC crisis line without a wait or busy signal. Crisis line workers are trained to help provide emotional support as well as mental health information and resources.','https://cmha.bc.ca/mental-health/find-help/','3106789',NULL),(84,'The Vancouver Justice Access Centre','290-800 Hornby Street, Vancouver','Offers information and referrals for a wide range of legal issues including wills and estates. Staff are available one-on-one to assess client needs and provide referrals to services offered at the center as well as in the community. The Self-Help Room offers a resource library, booklets, and brochures to take home, computers for doing research and word processing, printers to print forms and other materials, as well as access to a photocopier, fax, and phones. Please call if you need to schedule an appointment.','https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/jac','6046602084',NULL),(85,'Coast Mental Health Resource Centre','1225 Seymour Street, Vancouver','In addition to offering low-cost breakfast, lunch and snacks, it\'s home to some of Coast\'s most popular and successful support programs, such as the member-run art room, community health nurses, community garden, peer support worker program and the homeless outreach program. Other regular programs include running groups, yoga, music classes, and music and games afternoons','https://www.coastmentalhealth.com/','6046833787',NULL),(86,'South Granville Seniors Centre','1420 W 12th Ave, Vancouver','Community hub for seniors with events and programs including; educational, exercise, food, self-care, social, spanish services, estate planning, information and referral','www.southgranvilleseniors.ca','6047320812',NULL),(87,'West End Seniors Network (WESN)  - Kay\'s Place','110-1030 Denman Street, Vancouver','Community hub for seniors 55+ living in the West End. Drop-by their information and referral clinic or thirft shop for information on unlimited services including but not limited to; peer support, social, educational, and recreational activities, etc. Call to register.','www.wesn.ca','6046695051',NULL),(88,'Translink Transit','Vancouver','Receive detailed route, fare and schedule information.','www.translink.ca/tripplanner','6049533333',NULL),(89,'HealthLink BC','BC','To access non-emergency health information and services in BC related to healthy living including a dietitian and pharmacist.','www.healthlinkbc.ca/','811',NULL),(90,'The Bloom Group','Metro Vancouver 391 Powell St.','Provides the Adult Guardianship program that manages the income of low-income individuals who are no longer able to care for their own financial needs. Please contact for referral or more information.','www.thebloomgroup.org/our-work/adult-guardianship/','6046060335',NULL),(91,'Public Guardian Trustee of BC','Vancouver 808 West Hastings St.','The Public Guardian and Trustee (PGT) is a corporation sole established under the Public Guardian and Trustee Act with a unique statutory role to protect the interests of British Columbians who lack legal capacity to protect their own interests.','www.trustee.bc.ca/','6047751001',NULL),(92,'Nidus','1440 West 12th','Nidus provides public legal education on personal planning and related matters, training for volunteers and groups, problem solving and coaching in support of best practices for attorneys, representatives, and monitors. Please call to arrange an appointment.','www.nidus.ca','6044087414',NULL),(93,'Consolidated Credit Counselling Services of Canda',NULL,'Helps people resolve their debt and make financial plans.','https://www.consolidatedcredit.ca/vancouver-debt-consolidation-credit-counselling/',NULL,'18006564120'),(94,'Vancouver Coastal Health (VCH) Access and Assessment Centre (AAC)',NULL,'This is a direct line to social workers and professionals who can assess and evaluate clients for various issues including mental health and guide callers in how to seek appropriate help.','http://www.vch.ca/locations-services/result?res_id=1186','6042637377',NULL),(95,'The City of Vancouver',NULL,'Access information about parks, city property, holiday closures, etc.','https://vancouver.ca/default.aspx','311',NULL),(96,'Distress Line',NULL,'Distress Line is a confidential phone line which can be used to call regarding many issues, from loneliness to mental health concerns, suicidal thoughts, depression, anxiety or to get information or a referral.','https://crisiscentre.bc.ca/','3106789',NULL),(97,'MOSAIC','Headquarters: 5575 Boundary Rd. Vancouver, B.C.  V5R 2P9','Mosaic provides immigrant, newcomer and refugee services including interpretation, employment and family services. Services for individuals are free and multilingual, including classes and workshops','https://www.mosaicbc.org/','6042549626',NULL),(98,'Non-Emergency Police','Vancouver','This is a direct line to report non-emergency situations to Vancouver Police Dept, can be used for noise complaints, vandalism, or if there has been a time delay between crime and reporting. IF THIS IS AN EMERGENCY CALL 9-1-1','https://vancouver.ca/police/contact/index.html','6047173321',NULL),(99,'Legal Services Society','510 Burrard St, Suite 400, Vancouver BC, V6C 3A8','Meet with legal information outreach workers who can provide you with legal information and referral servicesc by phone or in-person',NULL,'6044082172',NULL),(100,'VictimLink BC',NULL,'Multilingual service for the victims of crime, includes crisis support services, information and referral services in areas of social, health, justice and government, completely confidential','www2.gov.bc.ca/gov/content/justice/criminal-justice/victims-of-crime/victimlinkbc',NULL,'18005630808'),(101,'Greater Vancouver Food Bank','1150 Raymur Ave, Vancouver, BC V6A 3T2','The Greater Vancouver Food Bank provides a 2-3 day food supplement to thousands of people each week by way of locations throughout the Greater Vancouver area. Registration needed to access service.','https://foodbank.bc.ca/','6048763601',NULL),(102,'Grandview Woodland Food Connection','1661 Napier St Vancouver, BC  V5L 4X4','Offers many food programs out of Britannia Community Centre including community lunches, a low-cost, bulk buying program for affordable fresh food and a food cupboard.','https://gwfoodconnection.com/community-food-programs/','6047185895',NULL),(103,'Robert Lee YMCA','955 Burrard Street Vancouver, BC V6Z 1Y2','Offers fitness and exercise programs, child care services, education and workshop opportunities and employment services. Membership required.','https://gv.ymca.ca','6046899622',NULL),(104,'Langara Family YMCA','282 West 49th Avenue Vancouver, BC V5Y 2Z5','Offers fitness and exercise programs, child care services, education and workshop opportunities and employment services. Membership required.','https://gv.ymca.ca/Locations/Area-One/Langara/Langara-Family-YMCA','6043249622',NULL);
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
INSERT INTO `resourceKeyword` VALUES (62,13),(91,13),(92,13),(62,14),(75,14),(84,14),(86,14),(90,14),(91,14),(92,14),(93,14),(99,14),(100,14),(76,15),(90,15),(93,15),(72,16),(73,16),(74,16),(88,16),(95,16),(68,17),(97,17),(62,18),(63,18),(64,18),(80,18),(81,18),(82,18),(83,18),(85,18),(87,18),(93,18),(94,18),(96,18),(63,19),(76,19),(80,19),(81,19),(82,19),(83,19),(85,19),(89,19),(94,19),(96,19),(103,19),(104,19),(79,20),(64,21),(62,22),(65,22),(66,22),(67,22),(68,22),(69,22),(70,22),(71,22),(95,22),(103,22),(104,22),(65,23),(66,23),(67,23),(68,23),(69,23),(70,23),(71,23),(77,23),(86,23),(101,23),(102,23),(62,24),(63,24),(64,24),(67,24),(68,24),(71,24),(98,25),(100,25),(65,26),(66,26),(67,26),(68,26),(69,26),(70,26),(71,26),(76,26),(86,26),(87,26),(95,26),(103,26),(104,26),(75,27),(86,28),(87,28),(103,28),(104,28),(74,29),(90,29),(91,29),(65,30),(66,30),(67,30),(68,30),(69,30),(70,30),(71,30),(76,30),(86,30);
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
INSERT INTO `resourcePerk` VALUES (72,27),(73,27),(74,28),(97,29),(80,30),(62,31),(63,31),(64,31),(75,31),(89,31),(98,32),(76,33),(86,33),(87,33),(62,34),(63,34),(64,34),(65,34),(66,34),(67,34),(68,34),(69,34),(70,34),(71,34),(75,34),(76,34),(80,34),(81,34),(82,34),(83,34),(84,34),(85,34),(86,34),(87,34),(88,34),(89,34),(91,34),(92,34),(93,34),(94,34),(95,34),(96,34),(97,34),(99,34),(100,34),(101,34),(65,35),(66,35),(67,35),(68,35),(69,35),(70,35),(71,35),(74,35),(77,35),(85,35),(90,35),(102,35),(103,35),(104,35),(87,36),(96,37),(100,37),(79,38);
/*!40000 ALTER TABLE `resourcePerk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resourceType`
--

DROP TABLE IF EXISTS `resourceType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resourceType` (
  `typeId` int(11) NOT NULL,
  `resourceId` int(11) NOT NULL,
  PRIMARY KEY (`typeId`,`resourceId`),
  KEY `resourceId` (`resourceId`),
  CONSTRAINT `resourceType_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `type` (`typeid`),
  CONSTRAINT `resourceType_ibfk_2` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`resourceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resourceType`
--

LOCK TABLES `resourceType` WRITE;
/*!40000 ALTER TABLE `resourceType` DISABLE KEYS */;
INSERT INTO `resourceType` VALUES (1,62),(10,63),(11,63),(1,64),(2,65),(2,66),(2,67),(2,68),(2,69),(2,70),(2,71),(3,72),(3,73),(3,74),(7,75),(7,76),(4,77),(9,79),(10,80),(10,81),(6,82),(6,83),(1,84),(11,85),(2,86),(7,86),(2,87),(7,87),(3,88),(11,89),(8,90),(1,91),(1,92),(8,93),(11,94),(7,95),(10,96),(11,96),(2,97),(6,98),(1,99),(10,100),(4,101),(4,102),(2,103),(2,104);
/*!40000 ALTER TABLE `resourceType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `type` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `imageFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`typeId`),
  UNIQUE KEY `type_unique` (`type`),
  UNIQUE KEY `imageFile` (`imageFile`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Legal and Advocacy','legal.png'),(2,'Community Hub','community.png'),(3,'Transportation','transportation.png'),(4,'Food and Basic Goods','food.png'),(6,'Emergency and Crisis','emergency.png'),(7,'Information & Referral','info.png'),(8,'Financial Services','financial.png'),(9,'Housing Services','housing.png'),(10,'Counselling','counselling.png'),(11,'Health','health.png'),(12,'Events','events.png');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','Brightside1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-28  0:43:11
