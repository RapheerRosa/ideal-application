use ideal;

DROP TABLE IF EXISTS `city_group`;
CREATE TABLE `city_group` (
  `city_group_id` tinyint(4) NOT NULL,
  `city_group_name` varchar(30) NOT NULL,
  `deleted` bit NOT NULL DEFAULT 0,
  PRIMARY KEY (`city_group_id`)
);

LOCK TABLES `city_group` WRITE;
INSERT INTO `city_group` VALUES (1,'Grande Vitória',0),(2,'Grande Curitiba',0),(3,'Grande Porto Alegre',0),(4,'Baixada Santista',0),(5,'Vale do Paraíba',0),(6,'Grande Campinas',0),(7,'Grande Rio',0),(8,'Grande Belo Horizonte',0),(9,'Grande ABC',0),(10,'Grande São Paulo',0);
UNLOCK TABLES;
