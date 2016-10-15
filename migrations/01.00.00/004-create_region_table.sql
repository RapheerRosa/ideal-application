DROP TABLE IF EXISTS `region`;
CREATE TABLE `region` (
  `region_id` smallint(6) NOT NULL,
  `country_id` smallint(6) NOT NULL,
  `region_name` varchar(30) NOT NULL,
  `deleted` bit NOT NULL DEFAULT 0,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`region_id`),
  UNIQUE KEY `country_region_name1_idx` (`country_id`,`region_name`),
  KEY `fk_regiao_country1_idx` (`country_id`),
  CONSTRAINT `fk_regiao_country1` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `region` WRITE;
INSERT INTO `region` VALUES (1,31,'Norte',0,'2016-03-11 16:21:56'),(2,31,'Nordeste',0,'2016-03-11 16:21:56'),(3,31,'Sudeste',0,'2016-03-11 16:21:56'),(4,31,'Sul',0,'2016-03-11 16:21:56'),(5,31,'Centro-Oeste',0,'2016-03-11 16:21:56');
UNLOCK TABLES;
