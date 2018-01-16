SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema vacapp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `vacapp` ;

-- -----------------------------------------------------
-- Schema vacapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vacapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `vacapp` ;

-- -----------------------------------------------------
-- Table `vacapp`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`department` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`department` (
  `id` INT UNSIGNED NOT NULL COMMENT 'Department ID',
  `name` VARCHAR(255) NOT NULL COMMENT 'Department name',
  PRIMARY KEY (`id`),
  UNIQUE KEY department_uidx_name (name)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Department';


-- -----------------------------------------------------
-- Table `vacapp`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`company` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`company` (
  `id` INT UNSIGNED NOT NULL COMMENT 'Company ID',
  `name` VARCHAR(255) NOT NULL COMMENT 'Company name',
  PRIMARY KEY (`id`),
  UNIQUE KEY company_uidx_name (name)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Company';


-- -----------------------------------------------------
-- Table `vacapp`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`user` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `password` CHAR(56) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `start_work` DATE DEFAULT NULL,
  `end_work` DATE DEFAULT NULL,
  -- `obligation` FLOAT NOT NULL,
  `superior_id` INT UNSIGNED NULL COMMENT 'User ID, users authorizing officer, if is NULL then auto approval',
  `active` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'User is staff', 
  `admin` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'User is admin',
  `department_id` INT UNSIGNED NOT NULL COMMENT 'Department ID',
  `company_id` INT UNSIGNED NOT NULL COMMENT 'Company ID',
  `comment` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY user_uidx_email (email),
  UNIQUE KEY user_uidx_companyiddepartmentid (company_id, department_id),
  CONSTRAINT `user_fk_superiorid` FOREIGN KEY (`superior_id`) REFERENCES `vacapp`.`user` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `user_fk_departmentid` FOREIGN KEY (`department_id`) REFERENCES `vacapp`.`department` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `user_fk_companyid` FOREIGN KEY (`company_id`) REFERENCES `vacapp`.`company` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Users';


-- -----------------------------------------------------
-- Table `vacapp`.`user_vacation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`user_vacation` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`user_vacation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'User Vacation ID',
  `user_id` INT UNSIGNED NOT NULL COMMENT 'User ID',
  `year` INT NOT NULL COMMENT 'Actual year',
  `vacation_claim` INT NULL DEFAULT 20 COMMENT 'Vacation claim in actual year',
  `vacation_paid` INT NULL COMMENT 'Vacation paid in actual year',
  `vacation_selected` INT NULL COMMENT 'Vacation selected in actual year',
  `benefit_day` INT NOT NULL DEFAULT 0 COMMENT 'Benefit day in actual year',
  `benefit_day_selected` INT NULL COMMENT 'Benefit day selected in actual year',
  `sick_day` INT NOT NULL DEFAULT 0 COMMENT 'Sick day in actual year',
  `sick_day_selected` INT NULL COMMENT 'Sick day selected in actual year',
  PRIMARY KEY (`id`),
  CONSTRAINT `user_vacation_fk_userid` FOREIGN KEY (`user_id`) REFERENCES `vacapp`.`user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Users Vacation detail';


-- -----------------------------------------------------
-- Table `vacapp`.`user_obligation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`user_obligation` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`user_obligation` (
  `id` INT UNSIGNED NOT NULL COMMENT 'User obligation ID',
  `user_id` INT UNSIGNED NOT NULL COMMENT 'User ID',
  `divisor` INT NOT NULL DEFAULT 40 COMMENT 'Divisor',
  `dividend` INT NOT NULL COMMENT 'Dividend (Dividend / Divisor = Obligation)',
  PRIMARY KEY (`id`),
  CONSTRAINT `user_obligation_fk_userid` FOREIGN KEY (`user_id`) REFERENCES `vacapp`.`user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'User obligation';


-- -----------------------------------------------------
-- Table `vacapp`.`entry_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`entry_status` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`entry_status` (
  `id` INT UNSIGNED NOT NULL COMMENT 'Status ID',
  `name` VARCHAR(255) NULL COMMENT 'Status name',
  PRIMARY KEY (`id`)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Entry status';


INSERT INTO entry_status (id, name) VALUES 
(1, 'waiting'), 
(2, 'acceptable'), 
(3, 'unacceptable');


-- -----------------------------------------------------
-- Table `vacapp`.`entry_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`entry_type` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`entry_type` (
  `id` INT UNSIGNED NOT NULL COMMENT 'Type ID',
  `name` VARCHAR(255) NOT NULL COMMENT 'Type name',
  `is_vacation` TINYINT(1) NOT NULL COMMENT 'Is Vacation, Vacation Claim minus Count days',
  `is_work` TINYINT(1) NOT NULL COMMENT 'Is Work, User is working in entry',
  PRIMARY KEY (`id`),
  UNIQUE KEY type_uidx_name (name)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Entry type';


INSERT INTO entry_type (id, name, is_vacation, is_work) VALUES 
(1, 'Vacation', 1, 0), 
(2, 'Doctor', 0, 1),
(3, 'Home Office', 0, 1),
(4, 'Sickness', 0, 0),
(5, 'Sick Day', 0, 0),
(6, 'Benefit Day', 0, 0),
(7, 'Paid Vacation', 0, 1),
(8, 'Unpaid Vacation', 0, 0);


-- -----------------------------------------------------
-- Table `vacapp`.`entry`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vacapp`.`entry` ;

CREATE TABLE IF NOT EXISTS `vacapp`.`entry` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Entry ID',
  `from` DATE NOT NULL COMMENT 'Date Entry From',
  `to` DATE NOT NULL COMMENT 'Date Entry to',
  `half_day` TINYINT(1) DEFAULT NULL COMMENT 'Is half day',
  `n_half_days` INT NOT NULL COMMENT 'Count of entry half days',
  `user_id` INT UNSIGNED NOT NULL COMMENT 'User ID',
  `entry_status_id` INT UNSIGNED NOT NULL COMMENT 'Entry status ID',
  `entry_type_id` INT UNSIGNED NOT NULL COMMENT 'Entry type ID',
  PRIMARY KEY (`id`),
  KEY activity_idx_fromto (`from`, `to`),
  CONSTRAINT `entry_fk_userid` FOREIGN KEY (`user_id`) REFERENCES `vacapp`.`user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `entry_fk_statusid` FOREIGN KEY (`entry_status_id`) REFERENCES `vacapp`.`entry_status` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `entry_fk_typeid` FOREIGN KEY (`entry_type_id`) REFERENCES `vacapp`.`entry_type` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci COMMENT = 'Entry';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
